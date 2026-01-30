import { NextRequest, NextResponse } from "next/server";
import { generateInterviewQuestions } from "@/lib/openai";
import {
  JobDescriptionSchema,
  CandidateProfileSchema,
  GenerateQuestionsRequest,
  QuestionCategory,
  InterviewQuestion,
} from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateQuestionsRequest = await req.json();

    // Validate input
    const jobValidation = JobDescriptionSchema.safeParse(body.job);
    if (!jobValidation.success) {
      return NextResponse.json(
        { error: "Invalid job description", details: jobValidation.error.errors },
        { status: 400 }
      );
    }

    const candidateValidation = CandidateProfileSchema.safeParse(body.candidate);
    if (!candidateValidation.success) {
      return NextResponse.json(
        { error: "Invalid candidate profile", details: candidateValidation.error.errors },
        { status: 400 }
      );
    }

    // Generate questions
    const questionSet = await generateInterviewQuestions(
      jobValidation.data,
      candidateValidation.data
    );

    // Group questions by category
    const groupedByCategory = questionSet.questions.reduce(
      (acc, question) => {
        const category = question.category as QuestionCategory;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(question);
        return acc;
      },
      {} as Record<QuestionCategory, InterviewQuestion[]>
    );

    // Calculate total estimated time
    const totalEstimatedTime = questionSet.questions.reduce(
      (sum, q) => sum + q.estimatedTime,
      0
    );

    return NextResponse.json({
      ...questionSet,
      totalEstimatedTime,
      groupedByCategory,
    });
  } catch (error) {
    console.error("Error generating questions:", error);

    if (error instanceof Error) {
      // Handle specific OpenAI errors
      if (error.message.includes("API key")) {
        return NextResponse.json(
          { error: "OpenAI API key not configured" },
          { status: 500 }
        );
      }
      if (error.message.includes("rate limit")) {
        return NextResponse.json(
          { error: "OpenAI rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

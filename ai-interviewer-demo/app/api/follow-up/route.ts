import { NextRequest, NextResponse } from "next/server";
import { generateFollowUpQuestion } from "@/lib/openai";
import { FollowUpRequest, InterviewQuestionSchema, JobDescriptionSchema } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body: FollowUpRequest = await req.json();
    const { originalQuestion, candidateAnswer, jobDescription } = body;

    // Validate inputs
    if (!candidateAnswer || candidateAnswer.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a more detailed candidate answer (at least 10 characters)" },
        { status: 400 }
      );
    }

    const questionValidation = InterviewQuestionSchema.safeParse(originalQuestion);
    if (!questionValidation.success) {
      return NextResponse.json(
        { error: "Invalid question format", details: questionValidation.error.errors },
        { status: 400 }
      );
    }

    const jobValidation = JobDescriptionSchema.safeParse(jobDescription);
    if (!jobValidation.success) {
      return NextResponse.json(
        { error: "Invalid job description", details: jobValidation.error.errors },
        { status: 400 }
      );
    }

    // Generate follow-up question
    const followUp = await generateFollowUpQuestion(
      questionValidation.data,
      candidateAnswer.trim(),
      jobValidation.data
    );

    return NextResponse.json(followUp);
  } catch (error) {
    console.error("Error generating follow-up:", error);

    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return NextResponse.json(
          { error: "OpenAI API key not configured" },
          { status: 500 }
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

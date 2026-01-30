import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import {
  JobDescription,
  CandidateProfile,
  QuestionSetSchema,
  QuestionSet,
  FollowUpResponseSchema,
  FollowUpResponse,
  InterviewQuestion,
} from "./types";

// Lazy initialization to avoid build-time errors
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY environment variable is not set");
    }
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

const SYSTEM_PROMPT = `You are an expert technical recruiter and interviewer with 15+ years of experience at FAANG companies.

Your task is to generate highly targeted, personalized interview questions that:
1. Match the job requirements exactly
2. Leverage the candidate's specific background (projects, skills, experience)
3. Test both technical depth and behavioral fit
4. Progress from warm-up to challenging questions
5. Include clear, actionable scoring rubrics

CRITICAL RULES:
- Generate EXACTLY 8-10 questions total
- Questions must reference specific details from the candidate's profile
- Each question must have a multi-dimensional scoring rubric
- Balance technical (60%) and behavioral (40%) questions
- Difficulty should ladder: 2-3 easy, 4-5 medium, 2-3 hard
- Every question must have clear "excellent/good/needs work" criteria

QUESTION CATEGORIES:
- technical: Coding challenges, algorithm design, language-specific questions
- behavioral: Leadership, teamwork, conflict resolution, past experiences
- system-design: Architecture decisions, scalability, trade-offs
- problem-solving: Debugging scenarios, optimization challenges

OUTPUT FORMAT:
- Use structured JSON matching the schema
- Group questions logically by category
- Provide context explaining WHY each question matters for THIS candidate`;

function buildUserPrompt(job: JobDescription, candidate: CandidateProfile): string {
  // Calculate matching and missing skills
  const candidateSkillsLower = candidate.skills.map((s) => s.toLowerCase());
  const matchingSkills = job.requiredSkills.filter((skill) =>
    candidateSkillsLower.includes(skill.toLowerCase())
  );
  const skillGaps = job.requiredSkills.filter(
    (skill) => !candidateSkillsLower.includes(skill.toLowerCase())
  );

  // Format projects for the prompt
  const projectsText = candidate.projects
    ? candidate.projects
        .slice(0, 5)
        .map(
          (p) =>
            `- ${p.name} (${p.language}, ${p.stars} stars): ${p.description || "No description"}`
        )
        .join("\n")
    : "No public projects available";

  return `JOB DETAILS:
- Title: ${job.title}
- Level: ${job.level}
- Required Skills: ${job.requiredSkills.join(", ")}
- Nice-to-Have: ${job.niceToHave.join(", ") || "None specified"}
- Description: ${job.description}

CANDIDATE PROFILE:
- Name: ${candidate.name}
- Source: ${candidate.source}
- Bio: ${candidate.bio || "Not provided"}
- Skills: ${candidate.skills.join(", ")}
- Experience: 
${candidate.experience.map((e) => `  - ${e}`).join("\n")}
- Notable Projects:
${projectsText}

ANALYSIS:
- Matching Skills: ${matchingSkills.length > 0 ? matchingSkills.join(", ") : "None directly matching"}
- Skill Gaps to Probe: ${skillGaps.length > 0 ? skillGaps.join(", ") : "All required skills present"}

INSTRUCTIONS:
Generate 8-10 interview questions that:
1. Start with 2-3 warm-up questions about their specific projects/experience
2. Include 3-4 deep technical questions on required skills
3. Add 2-3 behavioral questions relevant to ${job.level} level
4. End with 1-2 challenging questions testing system thinking

For each question:
- Reference specific details from their profile
- Explain why this question matters for the role
- Provide a 3-tier scoring rubric with concrete examples
- Assign realistic time estimates (5-15 minutes per question)`;
}

export async function generateInterviewQuestions(
  job: JobDescription,
  candidate: CandidateProfile
): Promise<QuestionSet> {
  const openai = getOpenAIClient();
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(job, candidate) },
    ],
    response_format: zodResponseFormat(QuestionSetSchema, "interview_questions"),
    temperature: 0.7,
  });

  const questionSet = completion.choices[0].message.parsed;

  if (!questionSet) {
    throw new Error("Failed to generate questions: No response from OpenAI");
  }

  return questionSet;
}

const FOLLOW_UP_SYSTEM_PROMPT = `You are conducting a technical interview. Your role is to generate intelligent follow-up questions that probe deeper into the candidate's understanding.

Generate follow-up questions that:
1. Probe deeper into a specific aspect they mentioned
2. Test understanding beyond surface-level knowledge
3. Reveal how they think through edge cases or trade-offs
4. Are natural and conversational (not confrontational)`;

export async function generateFollowUpQuestion(
  originalQuestion: InterviewQuestion,
  candidateAnswer: string,
  job: JobDescription
): Promise<FollowUpResponse> {
  const openai = getOpenAIClient();
  const userPrompt = `ORIGINAL QUESTION: ${originalQuestion.question}

CANDIDATE'S ANSWER: ${candidateAnswer}

JOB CONTEXT: 
- Title: ${job.title}
- Level: ${job.level}
- Key Requirements: ${job.requiredSkills.slice(0, 5).join(", ")}

Based on the candidate's answer, generate ONE intelligent follow-up question that probes deeper into their understanding or reveals how they handle edge cases.`;

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
      { role: "system", content: FOLLOW_UP_SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    response_format: zodResponseFormat(FollowUpResponseSchema, "follow_up"),
    temperature: 0.7,
  });

  const followUp = completion.choices[0].message.parsed;

  if (!followUp) {
    throw new Error("Failed to generate follow-up question");
  }

  return followUp;
}

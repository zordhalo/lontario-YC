import { z } from "zod";

// Job Description Types
export interface JobDescription {
  title: string;
  level: "junior" | "mid" | "senior" | "staff";
  description: string;
  requiredSkills: string[];
  niceToHave: string[];
}

export const JobDescriptionSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  level: z.enum(["junior", "mid", "senior", "staff"]),
  description: z.string().min(100, "Description should be at least 100 characters"),
  requiredSkills: z.array(z.string()).min(1, "At least one required skill is needed"),
  niceToHave: z.array(z.string()),
});

// Candidate Profile Types
export interface CandidateProject {
  name: string;
  description: string;
  language: string;
  stars: number;
}

export interface CandidateProfile {
  source: "github" | "linkedin" | "manual";
  url?: string;
  name: string;
  bio?: string;
  skills: string[];
  experience: string[];
  projects?: CandidateProject[];
  languages?: Record<string, number>;
}

export const CandidateProfileSchema = z.object({
  source: z.enum(["github", "linkedin", "manual"]),
  url: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional(),
  skills: z.array(z.string()),
  experience: z.array(z.string()),
  projects: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
        language: z.string(),
        stars: z.number(),
      })
    )
    .optional(),
  languages: z.record(z.string(), z.number()).optional(),
});

// Scoring Criteria Types
export interface ScoringCriteria {
  aspect: string;
  weight: number;
  excellent: string;
  good: string;
  needsWork: string;
}

export const ScoringCriteriaSchema = z.object({
  aspect: z.string().describe("What is being evaluated (e.g., Code Quality, Communication)"),
  weight: z.number().min(1).max(5).describe("Importance score 1-5"),
  excellent: z.string().describe("What an excellent answer looks like"),
  good: z.string().describe("What a good answer looks like"),
  needsWork: z.string().describe("What indicates the candidate needs improvement"),
});

// Interview Question Types
export type QuestionCategory = "technical" | "behavioral" | "system-design" | "problem-solving";
export type QuestionDifficulty = "easy" | "medium" | "hard";

export interface InterviewQuestion {
  id: string;
  category: QuestionCategory;
  difficulty: QuestionDifficulty;
  question: string;
  context: string;
  scoringRubric: ScoringCriteria[];
  estimatedTime: number;
}

export const InterviewQuestionSchema = z.object({
  id: z.string(),
  category: z.enum(["technical", "behavioral", "system-design", "problem-solving"]),
  difficulty: z.enum(["easy", "medium", "hard"]),
  question: z.string(),
  context: z.string().describe("Why this question is relevant for THIS candidate"),
  scoringRubric: z.array(ScoringCriteriaSchema),
  estimatedTime: z.number().describe("Minutes expected for answer"),
});

// Question Set Types
export interface QuestionSet {
  jobTitle: string;
  candidateName: string;
  questions: InterviewQuestion[];
  totalEstimatedTime: number;
  groupedByCategory?: Record<QuestionCategory, InterviewQuestion[]>;
}

export const QuestionSetSchema = z.object({
  jobTitle: z.string(),
  candidateName: z.string(),
  questions: z.array(InterviewQuestionSchema).min(8).max(10),
  totalEstimatedTime: z.number(),
});

// Follow-up Question Types
export interface FollowUpResponse {
  followUp: string;
  rationale: string;
}

export const FollowUpResponseSchema = z.object({
  followUp: z.string().describe("The follow-up question"),
  rationale: z.string().describe("Why this follow-up reveals important information"),
});

// API Request/Response Types
export interface GenerateQuestionsRequest {
  job: JobDescription;
  candidate: CandidateProfile;
}

export interface GenerateQuestionsResponse extends QuestionSet {
  groupedByCategory: Record<QuestionCategory, InterviewQuestion[]>;
}

export interface ScrapeProfileRequest {
  url: string;
  source: "github" | "linkedin";
}

export interface FollowUpRequest {
  originalQuestion: InterviewQuestion;
  candidateAnswer: string;
  jobDescription: JobDescription;
}

// UI State Types
export type AppStep = "job" | "profile" | "questions";

export interface AppState {
  currentStep: AppStep;
  job: JobDescription | null;
  candidate: CandidateProfile | null;
  questions: QuestionSet | null;
  isLoading: boolean;
  error: string | null;
}

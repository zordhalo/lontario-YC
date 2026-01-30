import { z } from "zod";

// ============================================================
// DATABASE TYPES (Matches Supabase schema)
// ============================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Enums
export type CandidateStage =
  | "applied"
  | "screening"
  | "ai_interview"
  | "phone_screen"
  | "technical"
  | "onsite"
  | "offer"
  | "hired"
  | "rejected";

export type JobStatus = "draft" | "active" | "paused" | "closed";
export type JobLevel = "junior" | "mid" | "senior" | "staff" | "principal";
export type LocationType = "remote" | "onsite" | "hybrid";
export type EmploymentType = "full-time" | "part-time" | "contract" | "internship";

export type InterviewStatus =
  | "pending"
  | "scheduled"
  | "ready"
  | "sent"
  | "in_progress"
  | "completed"
  | "expired"
  | "abandoned"
  | "missed"
  | "cancelled";

export type InterviewRecommendation =
  | "strong_yes"
  | "yes"
  | "maybe"
  | "no"
  | "strong_no";

export type QuestionCategory =
  | "technical"
  | "behavioral"
  | "system-design"
  | "problem-solving"
  | "culture-fit";

export type QuestionDifficulty = "easy" | "medium" | "hard";

// ============================================================
// CORE ENTITY TYPES
// ============================================================

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  company_name: string | null;
  role: "recruiter" | "admin" | "member";
  avatar_url: string | null;
  timezone: string;
  notification_preferences: Json;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  created_by: string;
  title: string;
  slug: string | null;
  level: JobLevel | null;
  department: string | null;
  location: string | null;
  location_type: LocationType | null;
  employment_type: EmploymentType | null;
  description: string;
  responsibilities: string[] | null;
  required_skills: string[];
  nice_to_have_skills: string[];
  ai_generated_description: boolean;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string;
  show_salary: boolean;
  status: JobStatus;
  is_featured: boolean;
  application_deadline: string | null;
  screening_questions: Json;
  require_cover_letter: boolean;
  require_linkedin: boolean;
  require_github: boolean;
  total_applicants: number;
  active_candidates: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  closed_at: string | null;
}

export interface Candidate {
  id: string;
  job_id: string;
  email: string;
  full_name: string;
  phone: string | null;
  location: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  resume_url: string | null;
  resume_filename: string | null;
  resume_text: string | null;
  cover_letter: string | null;
  screening_answers: Json;
  ai_score: number | null;
  ai_score_breakdown: Json;
  ai_summary: string | null;
  ai_strengths: string[] | null;
  ai_concerns: string[] | null;
  extracted_skills: string[] | null;
  years_of_experience: number | null;
  education_level: string | null;
  stage: CandidateStage;
  rejection_reason: string | null;
  rejection_feedback: string | null;
  source: string;
  referrer_id: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  last_activity_at: string;
  is_starred: boolean;
  is_archived: boolean;
  applied_at: string;
  created_at: string;
  updated_at: string;
}

export interface AIInterview {
  id: string;
  candidate_id: string;
  job_id: string;
  model_used: string;
  total_questions: number;
  status: InterviewStatus;
  questions_answered: number;
  access_token: string;
  expires_at: string;
  overall_score: number | null;
  ai_summary: string | null;
  strengths: string[] | null;
  concerns: string[] | null;
  recommendation: InterviewRecommendation | null;
  sent_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  // Scheduling fields
  scheduled_at: string | null;
  reminder_sent_at: string | null;
  interview_link: string | null;
  interview_duration_minutes: number;
  candidate_timezone: string | null;
  custom_message: string | null;
}

export interface InterviewQuestion {
  id: string;
  interview_id: string;
  question_text: string;
  question_context: string | null;
  category: QuestionCategory | null;
  difficulty: QuestionDifficulty | null;
  question_order: number;
  estimated_time_minutes: number;
  scoring_rubric: Json;
  candidate_answer: string | null;
  answered_at: string | null;
  time_spent_seconds: number | null;
  ai_score: number | null;
  ai_feedback: string | null;
  ai_evaluation_breakdown: Json;
  created_at: string;
}

export interface CandidateActivity {
  id: string;
  candidate_id: string;
  performed_by: string | null;
  activity_type: string;
  metadata: Json;
  old_value: string | null;
  new_value: string | null;
  notes: string | null;
  is_internal: boolean;
  created_at: string;
}

export interface CandidateComment {
  id: string;
  candidate_id: string;
  author_id: string;
  content: string;
  mentioned_users: string[];
  is_edited: boolean;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string | null;
  link_type: string | null;
  link_id: string | null;
  read: boolean;
  read_at: string | null;
  created_at: string;
}

// ============================================================
// AI TYPES (from ai-interviewer-demo)
// ============================================================

export interface JobDescription {
  title: string;
  level: JobLevel;
  description: string;
  requiredSkills: string[];
  niceToHave: string[];
}

export const JobDescriptionSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  level: z.enum(["junior", "mid", "senior", "staff", "principal"]),
  description: z.string().min(50, "Description should be at least 50 characters"),
  requiredSkills: z.array(z.string()).min(1, "At least one required skill is needed"),
  niceToHave: z.array(z.string()),
});

export interface CandidateProject {
  name: string;
  description: string;
  language: string;
  stars: number;
}

export interface CandidateProfile {
  source: "github" | "linkedin" | "manual" | "resume";
  url?: string;
  name: string;
  bio?: string;
  skills: string[];
  experience: string[];
  projects?: CandidateProject[];
  languages?: Record<string, number>;
}

export const CandidateProfileSchema = z.object({
  source: z.enum(["github", "linkedin", "manual", "resume"]),
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

export interface ScoringCriteria {
  aspect: string;
  weight: number;
  excellent: string;
  good: string;
  needsWork: string;
}

export const ScoringCriteriaSchema = z.object({
  aspect: z.string().describe("What is being evaluated"),
  weight: z.number().min(1).max(5).describe("Importance score 1-5"),
  excellent: z.string().describe("What an excellent answer looks like"),
  good: z.string().describe("What a good answer looks like"),
  needsWork: z.string().describe("What indicates needs improvement"),
});

export interface GeneratedQuestion {
  id: string;
  category: QuestionCategory;
  difficulty: QuestionDifficulty;
  question: string;
  context: string;
  scoringRubric: ScoringCriteria[];
  estimatedTime: number;
}

export const GeneratedQuestionSchema = z.object({
  id: z.string(),
  category: z.enum(["technical", "behavioral", "system-design", "problem-solving", "culture-fit"]),
  difficulty: z.enum(["easy", "medium", "hard"]),
  question: z.string(),
  context: z.string().describe("Why this question is relevant for THIS candidate"),
  scoringRubric: z.array(ScoringCriteriaSchema),
  estimatedTime: z.number().describe("Minutes expected for answer"),
});

export interface QuestionSet {
  jobTitle: string;
  candidateName: string;
  questions: GeneratedQuestion[];
  totalEstimatedTime: number;
  groupedByCategory?: Record<QuestionCategory, GeneratedQuestion[]>;
}

export const QuestionSetSchema = z.object({
  jobTitle: z.string(),
  candidateName: z.string(),
  questions: z.array(GeneratedQuestionSchema).min(6).max(10),
  totalEstimatedTime: z.number(),
});

export interface FollowUpResponse {
  followUp: string;
  rationale: string;
}

export const FollowUpResponseSchema = z.object({
  followUp: z.string().describe("The follow-up question"),
  rationale: z.string().describe("Why this follow-up reveals important information"),
});

// ============================================================
// AI SCORING TYPES
// ============================================================

export interface MatchScore {
  overall_score: number;
  breakdown: {
    skills_match: number;
    experience_match: number;
    education_match: number;
    keywords_match: number;
  };
  skills_analysis: {
    matched: string[];
    missing: string[];
    bonus: string[];
  };
  summary: string;
  strengths: string[];
  concerns: string[];
  recommendation: InterviewRecommendation;
  reasoning: string;
}

export const MatchScoreSchema = z.object({
  overall_score: z.number().min(0).max(100),
  breakdown: z.object({
    skills_match: z.number().min(0).max(100),
    experience_match: z.number().min(0).max(100),
    education_match: z.number().min(0).max(100),
    keywords_match: z.number().min(0).max(100),
  }),
  skills_analysis: z.object({
    matched: z.array(z.string()),
    missing: z.array(z.string()),
    bonus: z.array(z.string()).describe("Nice-to-have skills present"),
  }),
  summary: z.string().max(500),
  strengths: z.array(z.string()).max(5),
  concerns: z.array(z.string()).max(5),
  recommendation: z.enum(["strong_yes", "yes", "maybe", "no", "strong_no"]),
  reasoning: z.string().describe("Detailed reasoning for the recommendation"),
});

export interface ParsedResume {
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin_url?: string;
  github_url?: string;
  summary: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    start_date: string;
    end_date?: string;
    description: string;
    highlights: string[];
  }[];
  education: {
    degree: string;
    field?: string;
    institution: string;
    graduation_year?: number;
  }[];
  certifications?: string[];
  years_of_experience: number;
  education_level: "high_school" | "associate" | "bachelor" | "master" | "phd" | "other";
}

export const ParsedResumeSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin_url: z.string().url().optional(),
  github_url: z.string().url().optional(),
  summary: z.string(),
  skills: z.array(z.string()),
  experience: z.array(
    z.object({
      title: z.string(),
      company: z.string(),
      start_date: z.string(),
      end_date: z.string().optional(),
      description: z.string(),
      highlights: z.array(z.string()),
    })
  ),
  education: z.array(
    z.object({
      degree: z.string(),
      field: z.string().optional(),
      institution: z.string(),
      graduation_year: z.number().optional(),
    })
  ),
  certifications: z.array(z.string()).optional(),
  years_of_experience: z.number(),
  education_level: z.enum(["high_school", "associate", "bachelor", "master", "phd", "other"]),
});

export interface AnswerEvaluation {
  score: number;
  feedback: string;
  breakdown: {
    aspect: string;
    score: number;
    notes: string;
  }[];
  follow_up_suggestion?: string;
}

export const AnswerEvaluationSchema = z.object({
  score: z.number().min(0).max(10),
  feedback: z.string(),
  breakdown: z.array(
    z.object({
      aspect: z.string(),
      score: z.number().min(0).max(10),
      notes: z.string(),
    })
  ),
  follow_up_suggestion: z.string().optional(),
});

// ============================================================
// API TYPES
// ============================================================

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ApiError {
  error: string;
  code: string;
  details?: unknown;
}

// Jobs API
export interface CreateJobRequest {
  title: string;
  level?: JobLevel;
  department?: string;
  location?: string;
  location_type?: LocationType;
  employment_type?: EmploymentType;
  description: string;
  required_skills: string[];
  nice_to_have_skills?: string[];
  salary_min?: number;
  salary_max?: number;
  use_ai_description?: boolean;
  status?: "draft" | "active";
}

export interface ListJobsQuery {
  status?: JobStatus;
  page?: number;
  limit?: number;
  sort?: "created_at" | "updated_at" | "title";
  order?: "asc" | "desc";
}

export interface ListJobsResponse {
  jobs: Job[];
  pagination: Pagination;
}

// Candidates API
export interface ListCandidatesQuery {
  job_id: string;
  stage?: CandidateStage;
  min_score?: number;
  starred?: boolean;
  search?: string;
  sort?: "ai_score" | "applied_at" | "last_activity_at";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface ListCandidatesResponse {
  candidates: Candidate[];
  pagination: Pagination;
  aggregations: {
    by_stage: Record<CandidateStage, number>;
    score_distribution: { range: string; count: number }[];
  };
}

export interface MoveCandidateRequest {
  stage: CandidateStage;
  rejection_reason?: string;
  rejection_feedback?: string;
  notes?: string;
}

// AI API
export interface GenerateQuestionsRequest {
  job: JobDescription;
  candidate: CandidateProfile;
  question_count?: number;
}

export interface ScoreCandidateRequest {
  candidate: {
    skills: string[];
    experience: string[];
    resume_text: string;
  };
  job: {
    title: string;
    level: string;
    required_skills: string[];
    nice_to_have_skills: string[];
    description: string;
  };
}

export interface EvaluateAnswerRequest {
  question: {
    text: string;
    category: QuestionCategory;
    scoring_rubric: ScoringCriteria[];
  };
  answer: string;
  job_context: string;
  candidate_background: string;
}

// Interview Scheduling API
export interface ScheduleInterviewRequest {
  candidate_id: string;
  job_id: string;
  scheduled_at: string;
  duration_minutes?: number;
  send_immediate_invite?: boolean;
  custom_message?: string;
  candidate_timezone?: string;
}

export const ScheduleInterviewRequestSchema = z.object({
  candidate_id: z.string().uuid("Invalid candidate ID"),
  job_id: z.string().uuid("Invalid job ID"),
  scheduled_at: z.string().datetime("Invalid datetime format"),
  duration_minutes: z.number().min(15).max(120).optional().default(30),
  send_immediate_invite: z.boolean().optional().default(true),
  custom_message: z.string().max(1000).optional(),
  candidate_timezone: z.string().optional(),
});

export interface ScheduleInterviewResponse {
  interview: AIInterview;
  interview_link: string;
  questions_generated: number;
}

export interface RescheduleInterviewRequest {
  scheduled_at: string;
  send_notification?: boolean;
  reschedule_reason?: string;
}

export const RescheduleInterviewRequestSchema = z.object({
  scheduled_at: z.string().datetime("Invalid datetime format"),
  send_notification: z.boolean().optional().default(true),
  reschedule_reason: z.string().max(500).optional(),
});

export interface StartInterviewRequest {
  token: string;
}

export interface StartInterviewResponse {
  interview_id: string;
  questions: InterviewQuestion[];
  total_duration_minutes: number;
  expires_at: string;
}

export interface SubmitAnswerRequest {
  question_id: string;
  answer: string;
  time_spent_seconds: number;
}

export interface SubmitInterviewRequest {
  answers: SubmitAnswerRequest[];
}

export interface SubmitInterviewResponse {
  interview_id: string;
  status: InterviewStatus;
  overall_score: number | null;
  summary: string | null;
}

// Scheduled interview with related data for display
export interface ScheduledInterviewWithDetails extends AIInterview {
  candidate?: Pick<Candidate, "id" | "full_name" | "email">;
  job?: Pick<Job, "id" | "title" | "department">;
}

// ============================================================
// UI TYPES
// ============================================================

export type AppStep = "job" | "profile" | "questions";

export interface UIState {
  sidebarOpen: boolean;
  selectedCandidateId: string | null;
  viewMode: "kanban" | "list" | "grid";
  filters: {
    status?: JobStatus;
    stage?: CandidateStage;
    search?: string;
    minScore?: number;
  };
}

// ============================================================
// PIPELINE STAGES CONFIG
// ============================================================

export const PIPELINE_STAGES: {
  id: CandidateStage;
  label: string;
  color: string;
  description: string;
}[] = [
  { id: "applied", label: "Applied", color: "bg-gray-500", description: "New applications" },
  { id: "screening", label: "Screening", color: "bg-blue-500", description: "AI screening in progress" },
  { id: "ai_interview", label: "AI Interview", color: "bg-purple-500", description: "Text-based AI interview" },
  { id: "phone_screen", label: "Phone Screen", color: "bg-indigo-500", description: "Human phone screen" },
  { id: "technical", label: "Technical", color: "bg-cyan-500", description: "Technical interview" },
  { id: "onsite", label: "Onsite", color: "bg-teal-500", description: "Onsite/final round" },
  { id: "offer", label: "Offer", color: "bg-amber-500", description: "Offer extended" },
  { id: "hired", label: "Hired", color: "bg-green-500", description: "Accepted offer" },
];

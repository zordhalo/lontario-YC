// Types for API data normalization
// These provide compatibility between API responses (snake_case) and UI components (camelCase)

// Valid candidate stages matching the database schema
export type CandidateStatus = 
  | "applied" 
  | "screening"
  | "ai_interview"
  | "phone_screen"
  | "technical"
  | "onsite"
  | "offer" 
  | "hired" 
  | "rejected"

export interface Candidate {
  id: string
  name: string
  full_name?: string  // Database field name
  email: string
  avatar?: string
  avatar_url?: string  // GitHub profile picture URL
  aiScore: number
  ai_score?: number   // Database field name
  experience: string
  years_of_experience?: number
  skills: string[]
  extracted_skills?: string[]
  status: CandidateStatus
  stage?: CandidateStatus  // Database field name
  appliedAt: string
  applied_at?: string     // Database field name
  jobId: string
  job_id?: string         // Database field name
  summary?: string
  ai_summary?: string
  strengths?: string[]
  ai_strengths?: string[]
  concerns?: string[]
  ai_concerns?: string[]
  linkedIn?: string
  linkedin_url?: string
  github?: string
  github_url?: string
  portfolio?: string
  portfolio_url?: string
  is_starred?: boolean
}

// Input type for normalizeCandidate - accepts both API (null) and frontend (undefined) values
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CandidateInput = Record<string, any>

// Input type for normalizeJob - accepts both API (null) and frontend (undefined) values  
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JobInput = Record<string, any>

// Stage counts for pipeline progress calculation
export type StageCounts = Partial<Record<CandidateStatus, number>>

export interface Job {
  id: string
  title: string
  department: string | null
  level: string | null
  status: "active" | "draft" | "closed" | "paused"
  location: string | null
  location_type?: "remote" | "onsite" | "hybrid" | null
  type: "full-time" | "part-time" | "contract" | "internship"
  employment_type?: "full-time" | "part-time" | "contract" | "internship"
  applicants: number
  total_applicants?: number
  topMatches: number
  active_candidates?: number
  isArchived: boolean
  is_archived?: boolean
  createdAt: string
  created_at?: string
  description?: string
  requirements?: string[]
  required_skills?: string[]
  nice_to_have_skills?: string[]
  slug?: string
  // Pipeline progress data
  stageCounts?: StageCounts
  stage_counts?: StageCounts
}

// Helper to normalize candidate data from API to component format
// Accepts any object shape to handle both API (null values) and frontend (undefined values)
export function normalizeCandidate(data: CandidateInput): Candidate {
  return {
    id: data.id || "",
    name: data.name || data.full_name || "",
    full_name: data.full_name || data.name,
    email: data.email || "",
    avatar: data.avatar || data.avatar_url || undefined,
    avatar_url: data.avatar_url || data.avatar || undefined,
    aiScore: data.aiScore ?? data.ai_score ?? 0,
    ai_score: data.ai_score ?? data.aiScore,
    experience: data.experience || `${data.years_of_experience || 0} years`,
    years_of_experience: data.years_of_experience ?? undefined,
    skills: data.skills || data.extracted_skills || [],
    extracted_skills: data.extracted_skills || data.skills,
    status: data.status || data.stage || "applied",
    stage: data.stage || data.status,
    appliedAt: data.appliedAt || data.applied_at || new Date().toISOString(),
    applied_at: data.applied_at || data.appliedAt,
    jobId: data.jobId || data.job_id || "",
    job_id: data.job_id || data.jobId,
    summary: data.summary || data.ai_summary || undefined,
    ai_summary: data.ai_summary || data.summary || undefined,
    strengths: data.strengths || data.ai_strengths || undefined,
    ai_strengths: data.ai_strengths || data.strengths || undefined,
    concerns: data.concerns || data.ai_concerns || undefined,
    ai_concerns: data.ai_concerns || data.concerns || undefined,
    linkedIn: data.linkedIn || data.linkedin_url || undefined,
    linkedin_url: data.linkedin_url || data.linkedIn || undefined,
    github: data.github || data.github_url || undefined,
    github_url: data.github_url || data.github || undefined,
    portfolio: data.portfolio || data.portfolio_url || undefined,
    portfolio_url: data.portfolio_url || data.portfolio || undefined,
    is_starred: data.is_starred ?? undefined,
  }
}

// Helper to normalize job data from API to component format
// Accepts any object shape to handle both API (null values) and frontend (undefined values)
export function normalizeJob(data: JobInput): Job {
  return {
    id: data.id || "",
    title: data.title || "",
    department: data.department || null,
    level: data.level || null,
    status: data.status || "draft",
    location: data.location || null,
    location_type: data.location_type ?? undefined,
    type: data.type || data.employment_type || "full-time",
    employment_type: data.employment_type || data.type || undefined,
    applicants: data.applicants ?? data.total_applicants ?? 0,
    total_applicants: data.total_applicants ?? data.applicants ?? undefined,
    topMatches: data.topMatches ?? data.active_candidates ?? 0,
    active_candidates: data.active_candidates ?? data.topMatches ?? undefined,
    isArchived: data.isArchived ?? data.is_archived ?? false,
    is_archived: data.is_archived ?? data.isArchived ?? undefined,
    createdAt: data.createdAt || data.created_at || new Date().toISOString(),
    created_at: data.created_at || data.createdAt || undefined,
    description: data.description ?? undefined,
    requirements: data.requirements || data.required_skills || undefined,
    required_skills: data.required_skills || data.requirements || undefined,
    nice_to_have_skills: data.nice_to_have_skills ?? undefined,
    slug: data.slug ?? undefined,
    stageCounts: data.stageCounts || data.stage_counts || undefined,
    stage_counts: data.stage_counts || data.stageCounts || undefined,
  }
}

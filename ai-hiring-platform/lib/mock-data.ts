// Legacy types for mock data compatibility
// These mirror the database types for seamless transition

export type CandidateStatus = 
  | "applied" 
  | "screened" 
  | "screening"
  | "interview" 
  | "ai_interview"
  | "phone_screen"
  | "technical"
  | "offer" 
  | "hired" 
  | "rejected"

export interface Candidate {
  id: string
  name: string
  full_name?: string  // Database field name
  email: string
  avatar?: string
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
  createdAt: string
  created_at?: string
  description?: string
  requirements?: string[]
  required_skills?: string[]
  nice_to_have_skills?: string[]
  slug?: string
}

// Helper to normalize candidate data from API to mock format
export function normalizeCandidate(data: Partial<Candidate>): Candidate {
  return {
    id: data.id || "",
    name: data.name || data.full_name || "",
    full_name: data.full_name || data.name,
    email: data.email || "",
    avatar: data.avatar,
    aiScore: data.aiScore ?? data.ai_score ?? 0,
    ai_score: data.ai_score ?? data.aiScore,
    experience: data.experience || `${data.years_of_experience || 0} years`,
    years_of_experience: data.years_of_experience,
    skills: data.skills || data.extracted_skills || [],
    extracted_skills: data.extracted_skills || data.skills,
    status: data.status || data.stage || "applied",
    stage: data.stage || data.status,
    appliedAt: data.appliedAt || data.applied_at || new Date().toISOString(),
    applied_at: data.applied_at || data.appliedAt,
    jobId: data.jobId || data.job_id || "",
    job_id: data.job_id || data.jobId,
    summary: data.summary || data.ai_summary,
    ai_summary: data.ai_summary || data.summary,
    strengths: data.strengths || data.ai_strengths,
    ai_strengths: data.ai_strengths || data.strengths,
    concerns: data.concerns || data.ai_concerns,
    ai_concerns: data.ai_concerns || data.concerns,
    linkedIn: data.linkedIn || data.linkedin_url,
    linkedin_url: data.linkedin_url || data.linkedIn,
    github: data.github || data.github_url,
    github_url: data.github_url || data.github,
    portfolio: data.portfolio || data.portfolio_url,
    portfolio_url: data.portfolio_url || data.portfolio,
    is_starred: data.is_starred,
  }
}

// Helper to normalize job data from API to mock format
export function normalizeJob(data: Partial<Job>): Job {
  return {
    id: data.id || "",
    title: data.title || "",
    department: data.department || null,
    level: data.level || null,
    status: data.status || "draft",
    location: data.location || null,
    location_type: data.location_type,
    type: data.type || data.employment_type || "full-time",
    employment_type: data.employment_type || data.type,
    applicants: data.applicants ?? data.total_applicants ?? 0,
    total_applicants: data.total_applicants ?? data.applicants,
    topMatches: data.topMatches ?? data.active_candidates ?? 0,
    active_candidates: data.active_candidates ?? data.topMatches,
    createdAt: data.createdAt || data.created_at || new Date().toISOString(),
    created_at: data.created_at || data.createdAt,
    description: data.description,
    requirements: data.requirements || data.required_skills,
    required_skills: data.required_skills || data.requirements,
    nice_to_have_skills: data.nice_to_have_skills,
    slug: data.slug,
  }
}

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Backend Engineer",
    department: "Engineering",
    level: "Senior",
    status: "active",
    location: "Remote",
    type: "full-time",
    applicants: 37,
    topMatches: 8,
    createdAt: "2026-01-15",
    description:
      "We're looking for a Senior Backend Engineer to build scalable distributed systems.",
    requirements: [
      "5+ years of backend development",
      "Experience with Python or Go",
      "Strong system design skills",
      "Kubernetes experience preferred",
    ],
  },
  {
    id: "2",
    title: "Frontend Developer",
    department: "Engineering",
    level: "Mid-level",
    status: "active",
    location: "Hybrid - NYC",
    type: "full-time",
    applicants: 24,
    topMatches: 5,
    createdAt: "2026-01-18",
    description:
      "Join our frontend team to build beautiful, performant user interfaces.",
    requirements: [
      "3+ years of React experience",
      "TypeScript proficiency",
      "Strong CSS/Tailwind skills",
      "Accessibility knowledge",
    ],
  },
  {
    id: "3",
    title: "Product Manager",
    department: "Product",
    level: "Senior",
    status: "draft",
    location: "San Francisco",
    type: "full-time",
    applicants: 0,
    topMatches: 0,
    createdAt: "2026-01-25",
    description:
      "Lead product strategy and execution for our core platform features.",
    requirements: [
      "5+ years of product management",
      "B2B SaaS experience",
      "Strong analytical skills",
      "Technical background preferred",
    ],
  },
  {
    id: "4",
    title: "DevOps Engineer",
    department: "Engineering",
    level: "Mid-level",
    status: "active",
    location: "Remote",
    type: "full-time",
    applicants: 18,
    topMatches: 4,
    createdAt: "2026-01-20",
    description: "Help us build and maintain our cloud infrastructure.",
    requirements: [
      "3+ years of DevOps experience",
      "AWS or GCP expertise",
      "Terraform/Infrastructure as Code",
      "CI/CD pipeline experience",
    ],
  },
  {
    id: "5",
    title: "UX Designer",
    department: "Design",
    level: "Senior",
    status: "closed",
    location: "Remote",
    type: "full-time",
    applicants: 42,
    topMatches: 10,
    createdAt: "2025-12-10",
    description: "Create exceptional user experiences for our platform.",
    requirements: [
      "5+ years of UX design",
      "Figma expertise",
      "User research skills",
      "Design system experience",
    ],
  },
]

export const mockCandidates: Candidate[] = [
  {
    id: "c1",
    name: "John Doe",
    email: "john.doe@email.com",
    aiScore: 95,
    experience: "5 years",
    skills: ["Python", "System Design", "AWS", "Kubernetes"],
    status: "applied",
    appliedAt: "2026-01-28",
    jobId: "1",
    summary:
      "Experienced backend engineer with strong distributed systems background. Built payment processing system handling 10M requests/day.",
    strengths: [
      "10 years of Python experience",
      "Led team of 5 engineers at TechCorp",
      "Strong system design portfolio on GitHub",
    ],
    concerns: ["Limited Kubernetes experience mentioned in resume"],
    linkedIn: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
  },
  {
    id: "c2",
    name: "Sarah Lee",
    email: "sarah.lee@email.com",
    aiScore: 92,
    experience: "8 years",
    skills: ["Go", "Kubernetes", "Leadership", "Microservices"],
    status: "interview",
    appliedAt: "2026-01-25",
    jobId: "1",
    summary:
      "Senior engineer with leadership experience. Expert in Go and cloud-native architecture.",
    strengths: [
      "8 years backend experience",
      "Strong Kubernetes expertise",
      "Technical leadership background",
    ],
    concerns: ["Python listed as secondary skill"],
    linkedIn: "https://linkedin.com/in/sarahlee",
  },
  {
    id: "c3",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    aiScore: 88,
    experience: "4 years",
    skills: ["Python", "Django", "PostgreSQL", "APIs"],
    status: "screened",
    appliedAt: "2026-01-26",
    jobId: "1",
    summary:
      "Solid backend developer with API development expertise. Growing into senior role.",
    strengths: [
      "Strong Python/Django background",
      "Good communication skills",
      "Rapid growth trajectory",
    ],
    concerns: [
      "Less experience than required",
      "Limited distributed systems work",
    ],
    linkedIn: "https://linkedin.com/in/mariasantos",
    portfolio: "https://mariasantos.dev",
  },
  {
    id: "c4",
    name: "Alex Kim",
    email: "alex.kim@email.com",
    aiScore: 85,
    experience: "3 years",
    skills: ["Python", "FastAPI", "Docker", "SQL"],
    status: "applied",
    appliedAt: "2026-01-27",
    jobId: "1",
    summary: "Promising engineer with strong fundamentals and growth potential.",
    strengths: [
      "Clean code practices",
      "Fast learner",
      "Good testing habits",
    ],
    concerns: ["Below required experience level", "No cloud platform experience"],
    github: "https://github.com/alexkim",
  },
  {
    id: "c5",
    name: "Emily Chen",
    email: "emily.chen@email.com",
    aiScore: 78,
    experience: "2 years",
    skills: ["Node.js", "TypeScript", "MongoDB"],
    status: "applied",
    appliedAt: "2026-01-28",
    jobId: "1",
    summary: "Junior developer looking to transition to backend role.",
    strengths: ["TypeScript expertise", "Eager to learn"],
    concerns: [
      "No Python experience",
      "Significantly below experience requirement",
    ],
  },
  {
    id: "c6",
    name: "Michael Brown",
    email: "michael.brown@email.com",
    aiScore: 91,
    experience: "4 years",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    status: "applied",
    appliedAt: "2026-01-27",
    jobId: "2",
    summary:
      "Strong frontend developer with modern React stack experience.",
    strengths: [
      "4 years React experience",
      "Open source contributor",
      "Strong accessibility knowledge",
    ],
    concerns: [],
    github: "https://github.com/michaelbrown",
    portfolio: "https://michaelbrown.dev",
  },
  {
    id: "c7",
    name: "Lisa Wang",
    email: "lisa.wang@email.com",
    aiScore: 87,
    experience: "3 years",
    skills: ["React", "Vue.js", "CSS", "Figma"],
    status: "screened",
    appliedAt: "2026-01-24",
    jobId: "2",
    summary: "Creative frontend developer with design sensibility.",
    strengths: [
      "Strong CSS skills",
      "Can work with design tools",
      "Good eye for UI details",
    ],
    concerns: ["TypeScript listed as learning"],
    linkedIn: "https://linkedin.com/in/lisawang",
  },
  {
    id: "c8",
    name: "David Park",
    email: "david.park@email.com",
    aiScore: 94,
    experience: "5 years",
    skills: ["AWS", "Terraform", "Kubernetes", "CI/CD"],
    status: "interview",
    appliedAt: "2026-01-22",
    jobId: "4",
    summary:
      "Experienced DevOps engineer with strong cloud infrastructure background.",
    strengths: [
      "AWS certified",
      "Strong Terraform experience",
      "Built CI/CD for 50+ services",
    ],
    concerns: [],
    linkedIn: "https://linkedin.com/in/davidpark",
  },
]

export const mockActivity = [
  {
    id: "a1",
    type: "application",
    message: "John Doe applied for Senior Backend Engineer",
    timestamp: "3 minutes ago",
    candidateId: "c1",
  },
  {
    id: "a2",
    type: "ai_score",
    message: "AI scored Sarah Lee 92% match",
    timestamp: "15 minutes ago",
    candidateId: "c2",
  },
  {
    id: "a3",
    type: "interview",
    message: "Interview scheduled with David Park",
    timestamp: "1 hour ago",
    candidateId: "c8",
  },
  {
    id: "a4",
    type: "stage_change",
    message: "Maria Santos moved to Screened",
    timestamp: "2 hours ago",
    candidateId: "c3",
  },
  {
    id: "a5",
    type: "application",
    message: "Michael Brown applied for Frontend Developer",
    timestamp: "3 hours ago",
    candidateId: "c6",
  },
]

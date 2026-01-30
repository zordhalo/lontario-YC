export interface Candidate {
  id: string
  name: string
  email: string
  avatar?: string
  aiScore: number
  experience: string
  skills: string[]
  status: "applied" | "screened" | "interview" | "offer" | "hired" | "rejected"
  appliedAt: string
  jobId: string
  summary?: string
  strengths?: string[]
  concerns?: string[]
  linkedIn?: string
  github?: string
  portfolio?: string
}

export interface Job {
  id: string
  title: string
  department: string
  level: string
  status: "active" | "draft" | "closed"
  location: string
  type: "full-time" | "part-time" | "contract"
  applicants: number
  topMatches: number
  createdAt: string
  description?: string
  requirements?: string[]
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

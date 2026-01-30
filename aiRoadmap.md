<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# how would i go about building an ai powered hiring platform as fast as possible to working mvp find the best features to speedrun

Based on my research, here's your comprehensive speedrun guide to building an AI-powered hiring platform MVP:

## 🚀 Speed-First Tech Stack (Launch in 2-4 Weeks)

### Frontend

- **Next.js 14+** with TypeScript - Fast, SEO-friendly, handles auth easily
- **Tailwind CSS** - Rapid styling without custom CSS
- **shadcn/ui** - Pre-built, accessible components


### Backend

- **Supabase** or **Firebase** - Instant backend with auth, database, and storage
- **Vercel** - One-click deployment with Next.js


### AI Layer (The Secret Sauce)

**Use APIs instead of building from scratch:**

- **OpenAI GPT-4** - Resume parsing, job description generation, candidate matching
- **Anthropic Claude** - AI interviews, candidate evaluation
- **HuggingFace** - Skill extraction and classification


### Resume Parsing \& Screening

- **Affinda API** - 95% accuracy resume parsing[^1_1]
- **Sovren/Textkernel** - Enterprise-grade semantic matching[^1_1]

***

## 🎯 Essential MVP Features (Priority Ranked)

### **Tier 1: Must-Have (Week 1-2)**

1. **AI-Powered Job Description Generator**
    - Input: Role title, key requirements
    - Output: Optimized, inclusive job description
    - *Why*: Reduces setup friction, instant value
2. **Smart Resume Screening**
    - Upload resumes (PDF, DOCX)
    - AI extracts skills, experience, education
    - Auto-ranking against job requirements
    - *Impact*: 83% reduction in review time[^1_2]
3. **Basic Applicant Dashboard**
    - View all candidates
    - Filter by AI score, skills, experience
    - Accept/reject with one click
4. **Simple Job Posting**
    - Create job listings
    - Generate shareable links
    - Basic application form

### **Tier 2: High-Value Differentiators (Week 3)**

5. **AI-Driven Text Interviews** (Game-changer)
    - Automated initial screening questions
    - AI evaluates responses for relevance, communication skills
    - Generates candidate summaries
    - *Why*: Scales screening without human hours[^1_3]
6. **Skills-Based Matching Algorithm**
    - NLP to understand job requirements
    - Match candidates based on skills, not just keywords
    - Show match percentage with explanation
    - *Impact*: 49% improvement in candidate fit[^1_2]
7. **Candidate Ranking Dashboard**
    - Visual scorecards
    - Transparent scoring (avoid black box AI)
    - Side-by-side comparison view

### **Tier 3: Nice-to-Have (Post-MVP)**

8. **Video Interview Analysis** - Add later (complex, expensive)
9. **Gamified Assessments** - Consider after validation
10. **Advanced Analytics** - Build once you have data

***

## ⚡ AI Development Tools to 10x Speed

### Code Generation (Critical for Solo Founders)

- **Cursor** or **Windsurf** - AI-powered IDE with codebase awareness[^1_4]
- **GitHub Copilot** - Inline code suggestions
- **v0.dev** - Generate React components from text descriptions


### No-Code Accelerators (If non-technical)

- **Bubble** + **OpenAI plugin** - Full-stack without code
- **Softr** or **Glide** - Quick prototypes[^1_5]


### Design

- **Figma** + **Figma AI** - Rapid wireframing
- **v0.dev** - Turn designs into code instantly

***

## 🏗️ 2-Week Build Timeline

### **Week 1: Core Infrastructure**

- **Day 1-2**: Setup Next.js + Supabase, authentication, database schema
- **Day 3-4**: Job posting CRUD, resume upload system
- **Day 5-7**: Integrate OpenAI for resume parsing and job description generation


### **Week 2: AI Features \& Polish**

- **Day 8-10**: Build candidate ranking algorithm, matching logic
- **Day 11-12**: AI interview questions generator, response evaluation
- **Day 13-14**: Dashboard UI, testing, deploy to Vercel

***

## 💡 Speed Hacks from the Trenches

1. **Use Pretrained Models** - Don't train custom ML models. OpenAI/Claude APIs give you 90% of value in 10% of time[^1_6]
2. **Start with Text, Add Video Later** - Text-based AI interviews are easier to build and still provide massive value[^1_3]
3. **Postgres + pgvector for Semantic Search** - Store resume embeddings, use vector similarity for matching instead of complex algorithms
4. **Steal UI Patterns** - Study HackerRank, Wellfound, Greenhouse for proven UX[^1_2]
5. **API-First Architecture** - Makes pivoting easier, enables mobile later
6. **Single-Tenant First** - Don't build multi-tenancy yet. One company, multiple jobs is enough for MVP

***

## 🎓 Sample Workflow (Your Competitive Advantage)

```
Recruiter Posts Job → AI generates optimized description
↓
Candidates Apply → AI parses resumes instantly
↓
AI Ranks Candidates → Shows top 10% with transparent scoring
↓
AI Conducts Text Interview → Asks role-specific questions
↓
Recruiter Reviews Top 3 → Makes final decision in 5 minutes
```

**Time saved per hire: 4+ hours**[^1_2]

***

## 🚨 Common Pitfalls to Avoid

❌ **Building custom ML models** - Use APIs, validate demand first
❌ **Over-engineering AI** - Simple keyword + embedding matching beats complex systems
❌ **Video interviews first** - Text is faster to build and test
❌ **Multi-tenant architecture** - Add complexity later
❌ **Perfect bias mitigation** - Start with transparency, improve iteratively
❌ **ATS integrations** - Wait until customers demand it

***

## 📊 Success Metrics to Track

- **Time-to-shortlist** (target: <5 minutes per job)
- **Candidate match accuracy** (recruiter approval rate)
- **Application completion rate**
- **Recruiter time saved per hire**

***

## 🛠️ Starter Code Architecture

```
/app
  /api
    /jobs - CRUD endpoints
    /candidates - Upload, parse, rank
    /ai - OpenAI integration layer
  /dashboard - Recruiter interface
  /apply/[jobId] - Candidate application
/lib
  /ai - Resume parser, matcher, interview generator
  /db - Supabase client
/components - Reusable UI
```


***

## 💰 Cost Estimate (First 100 Users)

- **Supabase**: \$0-25/month
- **Vercel**: \$0-20/month
- **OpenAI API**: ~\$50-200/month (depending on volume)
- **Domain**: \$12/year

**Total: ~\$100-250/month**

***

## 🎯 Your Next Steps (Today)

1. **Clone a Next.js + Supabase starter** (skip boilerplate)
2. **Get OpenAI API key** and test resume parsing with GPT-4
3. **Build job posting page** (2 hours)
4. **Build resume upload + parsing** (4 hours)
5. **Test with 5 real resumes** - Validate the AI actually works

***

Want me to create a working prototype of any specific feature? I can build you a functional resume parser, AI interview generator, or candidate ranking dashboard right now.
<span style="display:none">[^1_10][^1_11][^1_12][^1_13][^1_14][^1_15][^1_7][^1_8][^1_9]</span>

<div align="center">⁂</div>

[^1_1]: https://sintra.ai/blog/best-ai-resume-screening-tools

[^1_2]: https://recruiter.daily.dev/resources/developer-hiring-platforms-recruiters-use/

[^1_3]: https://thetalentgames.com/5-features-every-ai-hiring-platform-should-have/

[^1_4]: https://mvp-development.io/blog/building-2-day-mvp-ai-engineering

[^1_5]: https://www.reddit.com/r/startups/comments/1li4z8s/what_is_the_best_ai_tool_to_ship_an_mvp_i_will/

[^1_6]: https://www.zabrizon.com/blog/how-to-build-an-ai-mvp-fast

[^1_7]: https://beyondlabs.io/blogs/top-10-ai-tools-to-build-your-mvp-90-faster-and-80

[^1_8]: https://www.youtube.com/watch?v=LIVdmlK5dOI

[^1_9]: https://dev.to/sk_tbak/7-ways-to-use-ai-to-build-a-minimum-viable-product-mvp-fast-ji0

[^1_10]: https://patternica.com/blog/using-ai-to-build-an-mvp

[^1_11]: https://wearepresta.com/from-idea-to-mvp-the-strategic-2026-guide-for-startup-founders/

[^1_12]: https://www.peoplescout.com/insights/recruitment-technology-build-ultimate-tech-stack/

[^1_13]: https://peoplemanagingpeople.com/tools/best-ai-resume-screening-software/

[^1_14]: https://altar.io/ai-platforms-to-supercharge-mvp-development/

[^1_15]: https://recruiterflow.com/blog/recruitment-tech-stack/


---

# 🎯 Detailed Technical Plan: AI-Powered Interviewer Demo

## Executive Summary

**Goal**: Build a production-quality demo that generates targeted interview questions from job descriptions + candidate profiles (GitHub/LinkedIn), with intelligent follow-up question generation.

**Timeline**: 3-4 days for full MVP
**Tech Stack**: Next.js 14, TypeScript, OpenAI GPT-4o, Tailwind CSS, shadcn/ui
**Deployment**: Vercel (one-click)

***

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                      │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  Job Input  │  │Profile Input │  │  Results View    │   │
│  │    Form     │  │   (URL/Text) │  │  (Questions +    │   │
│  │             │  │              │  │   Scoring)       │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Routes (/api/*)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ /generate    │  │ /scrape      │  │ /follow-up       │  │
│  │ -questions   │  │ -profile     │  │                  │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
          ┌─────────────────┼─────────────────┐
          ▼                 ▼                 ▼
┌──────────────────┐  ┌──────────────┐  ┌──────────────┐
│  GitHub REST API │  │ LinkedIn API │  │ OpenAI API   │
│  (Public)        │  │ (Proxycurl)  │  │ GPT-4o       │
└──────────────────┘  └──────────────┘  └──────────────┘
```


***

## 📋 Phase 1: Project Setup \& Infrastructure (Day 1 Morning)

### 1.1 Initialize Next.js Project

```bash
npx create-next-app@latest ai-interviewer-demo \
  --typescript \
  --tailwind \
  --app \
  --use-npm

cd ai-interviewer-demo
```


### 1.2 Install Core Dependencies

```bash
# UI Components
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input textarea card badge tabs select

# API & Data Fetching
npm install openai zod
npm install axios cheerio # For web scraping fallback

# Utilities
npm install clsx tailwind-merge
npm install lucide-react # Icons
npm install react-markdown # Display formatted content
```


### 1.3 Environment Variables Setup

Create `.env.local`:

```env
# OpenAI
OPENAI_API_KEY=sk-...

# GitHub (optional, increases rate limit)
GITHUB_TOKEN=ghp_...

# LinkedIn API (Proxycurl - recommended)
PROXYCURL_API_KEY=...

# Alternative: Bright Data Scraper API
BRIGHTDATA_API_KEY=...
```


### 1.4 Project Structure

```
ai-interviewer-demo/
├── app/
│   ├── api/
│   │   ├── generate-questions/
│   │   │   └── route.ts          # Main question generation
│   │   ├── scrape-profile/
│   │   │   └── route.ts          # Profile data extraction
│   │   └── follow-up/
│   │       └── route.ts          # Dynamic follow-up questions
│   ├── page.tsx                  # Main demo interface
│   └── layout.tsx
├── components/
│   ├── JobDescriptionInput.tsx   # Job details form
│   ├── ProfileInput.tsx          # GitHub/LinkedIn URL input
│   ├── QuestionDisplay.tsx       # Grouped questions display
│   ├── FollowUpGenerator.tsx     # Interactive follow-up
│   └── ScoringRubric.tsx         # Visual rubric component
├── lib/
│   ├── openai.ts                 # OpenAI client & prompts
│   ├── github.ts                 # GitHub API integration
│   ├── linkedin.ts               # LinkedIn scraping
│   ├── types.ts                  # TypeScript interfaces
│   └── utils.ts                  # Helper functions
└── prompts/
    ├── question-generator.ts     # System prompts
    └── follow-up-generator.ts
```


***

## 📊 Phase 2: Data Models \& Types (Day 1 Afternoon)

### 2.1 Core TypeScript Interfaces

**File: `lib/types.ts`**

```typescript
import { z } from 'zod';

// Input Types
export interface JobDescription {
  title: string;
  level: 'junior' | 'mid' | 'senior' | 'staff';
  requiredSkills: string[];
  niceToHave: string[];
  description: string;
}

export interface CandidateProfile {
  source: 'github' | 'linkedin';
  url: string;
  name?: string;
  skills: string[];
  experience: string[];
  projects?: GitHubProject[];
  bio?: string;
  languages?: { [key: string]: number }; // GitHub language stats
}

export interface GitHubProject {
  name: string;
  description: string;
  language: string;
  stars: number;
  topics: string[];
}

// Output Types
export interface InterviewQuestion {
  id: string;
  category: 'technical' | 'behavioral' | 'system-design' | 'problem-solving';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  context: string; // Why this question for THIS candidate
  scoringRubric: ScoringCriteria[];
  estimatedTime: number; // minutes
}

export interface ScoringCriteria {
  aspect: string; // e.g., "Code quality", "Communication"
  weight: number; // 1-5
  excellent: string; // What excellent looks like
  good: string;
  needsWork: string;
}

export interface QuestionSet {
  jobTitle: string;
  candidateName: string;
  questions: InterviewQuestion[];
  groupedByCategory: { [key: string]: InterviewQuestion[] };
  totalEstimatedTime: number;
}

export interface FollowUpQuestion {
  originalQuestion: string;
  candidateAnswer: string;
  followUp: string;
  rationale: string; // Why this follow-up
}

// Zod Schemas for OpenAI Structured Outputs
export const InterviewQuestionSchema = z.object({
  id: z.string(),
  category: z.enum(['technical', 'behavioral', 'system-design', 'problem-solving']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  question: z.string(),
  context: z.string(),
  scoringRubric: z.array(
    z.object({
      aspect: z.string(),
      weight: z.number().min(1).max(5),
      excellent: z.string(),
      good: z.string(),
      needsWork: z.string(),
    })
  ),
  estimatedTime: z.number(),
});

export const QuestionSetSchema = z.object({
  jobTitle: z.string(),
  candidateName: z.string(),
  questions: z.array(InterviewQuestionSchema),
  totalEstimatedTime: z.number(),
});
```


***

## 🔌 Phase 3: External API Integrations (Day 1 Evening)

### 3.1 GitHub API Integration

**File: `lib/github.ts`**

```typescript
import axios from 'axios';
import { CandidateProfile, GitHubProject } from './types';

const GITHUB_API = 'https://api.github.com';

export async function fetchGitHubProfile(username: string): Promise<CandidateProfile> {
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    ...(process.env.GITHUB_TOKEN && {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    }),
  };

  try {
    // Fetch user profile
    const userResponse = await axios.get(`${GITHUB_API}/users/${username}`, { headers });
    const user = userResponse.data;

    // Fetch repositories (top 10 by stars)
    const reposResponse = await axios.get(
      `${GITHUB_API}/users/${username}/repos?sort=stars&per_page=10`,
      { headers }
    );
    const repos = reposResponse.data;

    // Fetch languages across repos
    const languageStats: { [key: string]: number } = {};
    for (const repo of repos.slice(0, 5)) {
      const langResponse = await axios.get(repo.languages_url, { headers });
      const languages = langResponse.data;
      Object.entries(languages).forEach(([lang, bytes]) => {
        languageStats[lang] = (languageStats[lang] || 0) + (bytes as number);
      });
    }

    // Parse projects
    const projects: GitHubProject[] = repos.map((repo: any) => ({
      name: repo.name,
      description: repo.description || '',
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count,
      topics: repo.topics || [],
    }));

    // Extract skills from languages and topics
    const skills = [
      ...Object.keys(languageStats),
      ...repos.flatMap((r: any) => r.topics || []),
    ].filter((v, i, a) => a.indexOf(v) === i); // Unique

    return {
      source: 'github',
      url: `https://github.com/${username}`,
      name: user.name || username,
      bio: user.bio || '',
      skills,
      experience: projects.map(p => 
        `${p.name}: ${p.description} (${p.stars} stars)`
      ),
      projects,
      languages: languageStats,
    };
  } catch (error: any) {
    throw new Error(`GitHub API error: ${error.response?.data?.message || error.message}`);
  }
}

export function extractGitHubUsername(url: string): string {
  const match = url.match(/github\.com\/([^\/]+)/);
  if (!match) throw new Error('Invalid GitHub URL');
  return match[^2_1];
}
```


### 3.2 LinkedIn API Integration (Using Proxycurl)

**File: `lib/linkedin.ts`**

```typescript
import axios from 'axios';
import { CandidateProfile } from './types';

const PROXYCURL_API = 'https://nubela.co/proxycurl/api/v2/linkedin';

export async function fetchLinkedInProfile(profileUrl: string): Promise<CandidateProfile> {
  if (!process.env.PROXYCURL_API_KEY) {
    throw new Error('PROXYCURL_API_KEY not configured. Using GitHub only for now.');
  }

  try {
    const response = await axios.get(PROXYCURL_API, {
      headers: {
        Authorization: `Bearer ${process.env.PROXYCURL_API_KEY}`,
      },
      params: {
        url: profileUrl,
        skills: 'include',
      },
    });

    const data = response.data;

    // Extract skills from various fields
    const skills = [
      ...(data.skills || []),
      ...(data.experiences || []).flatMap((exp: any) => 
        exp.title?.split(/[,\/]/).map((s: string) => s.trim()) || []
      ),
    ].filter((v, i, a) => a.indexOf(v) === i);

    // Format experience
    const experience = (data.experiences || []).map((exp: any) => 
      `${exp.title} at ${exp.company} (${exp.starts_at?.year || 'N/A'} - ${exp.ends_at?.year || 'Present'})`
    );

    return {
      source: 'linkedin',
      url: profileUrl,
      name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
      bio: data.summary || '',
      skills,
      experience,
    };
  } catch (error: any) {
    throw new Error(`LinkedIn API error: ${error.response?.data?.message || error.message}`);
  }
}

// Fallback: Parse LinkedIn URL to extract basic info
export function parseLinkedInUrl(url: string): { username: string } {
  const match = url.match(/linkedin\.com\/in\/([^\/]+)/);
  if (!match) throw new Error('Invalid LinkedIn URL');
  return { username: match[^2_1] };
}
```


***

## 🤖 Phase 4: OpenAI Integration \& Prompt Engineering (Day 2 Morning)

### 4.1 OpenAI Client Setup

**File: `lib/openai.ts`**

```typescript
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { QuestionSetSchema } from './types';
import type { JobDescription, CandidateProfile, QuestionSet } from './types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateInterviewQuestions(
  job: JobDescription,
  candidate: CandidateProfile
): Promise<QuestionSet> {
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(job, candidate);

  const completion = await openai.beta.chat.completions.parse({
    model: 'gpt-4o-2024-08-06',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    response_format: zodResponseFormat(QuestionSetSchema, 'interview_questions'),
    temperature: 0.7,
  });

  const questionSet = completion.choices[^2_0].message.parsed!;

  // Group questions by category
  const groupedByCategory: { [key: string]: any[] } = {};
  questionSet.questions.forEach(q => {
    if (!groupedByCategory[q.category]) {
      groupedByCategory[q.category] = [];
    }
    groupedByCategory[q.category].push(q);
  });

  return {
    ...questionSet,
    groupedByCategory,
  };
}

function buildSystemPrompt(): string {
  return `You are an expert technical recruiter and interviewer with 15+ years of experience at FAANG companies.

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

OUTPUT FORMAT:
- Use structured JSON matching the schema
- Group questions logically by category
- Provide context explaining WHY each question matters for THIS candidate`;
}

function buildUserPrompt(job: JobDescription, candidate: CandidateProfile): string {
  const skillsMatch = job.requiredSkills.filter(skill => 
    candidate.skills.some(cs => cs.toLowerCase().includes(skill.toLowerCase()))
  );

  const skillsGap = job.requiredSkills.filter(skill => 
    !candidate.skills.some(cs => cs.toLowerCase().includes(skill.toLowerCase()))
  );

  return `
JOB DETAILS:
- Title: ${job.title}
- Level: ${job.level}
- Required Skills: ${job.requiredSkills.join(', ')}
- Nice-to-Have: ${job.niceToHave.join(', ')}
- Description: ${job.description}

CANDIDATE PROFILE:
- Name: ${candidate.name || 'Candidate'}
- Source: ${candidate.source}
- Bio: ${candidate.bio || 'N/A'}
- Skills: ${candidate.skills.join(', ')}
- Experience: 
${candidate.experience.map(exp => `  - ${exp}`).join('\n')}
${candidate.projects ? `\nNotable Projects:\n${candidate.projects.map(p => 
  `  - ${p.name}: ${p.description} (${p.language}, ${p.stars} stars)`
).join('\n')}` : ''}

ANALYSIS:
- Matching Skills: ${skillsMatch.join(', ') || 'None detected'}
- Skill Gaps to Probe: ${skillsGap.join(', ') || 'None'}

INSTRUCTIONS:
Generate 8-10 interview questions that:
1. Start with 2-3 warm-up questions about their specific projects/experience
2. Include 3-4 deep technical questions on required skills (especially ${job.requiredSkills.slice(0, 3).join(', ')})
3. Add 2-3 behavioral questions relevant to ${job.level} level
4. End with 1-2 challenging questions testing system thinking or problem-solving

For each question:
- Reference specific details from their profile
- Explain why this question matters for the role
- Provide a 3-tier scoring rubric (excellent/good/needs work) with concrete examples
- Assign realistic time estimates (5-15 min per question)
`;
}
```


### 4.2 Follow-Up Question Generator

**File: `lib/follow-up.ts`**

```typescript
import OpenAI from 'openai';
import type { FollowUpQuestion } from './types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateFollowUp(
  originalQuestion: string,
  candidateAnswer: string,
  jobContext: string
): Promise<FollowUpQuestion> {
  const prompt = `You are conducting a technical interview.

ORIGINAL QUESTION: ${originalQuestion}

CANDIDATE'S ANSWER: ${candidateAnswer}

JOB CONTEXT: ${jobContext}

Based on the candidate's answer, generate ONE intelligent follow-up question that:
1. Probes deeper into a specific aspect they mentioned
2. Tests understanding beyond surface-level knowledge
3. Reveals how they think through edge cases or trade-offs
4. Is natural and conversational (not confrontational)

Respond in JSON format:
{
  "followUp": "Your follow-up question here",
  "rationale": "Why this follow-up reveals important information"
}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.8,
  });

  const result = JSON.parse(completion.choices[^2_0].message.content!);

  return {
    originalQuestion,
    candidateAnswer,
    followUp: result.followUp,
    rationale: result.rationale,
  };
}
```


***

## 🎨 Phase 5: Frontend Components (Day 2 Afternoon - Day 3 Morning)

### 5.1 Main Page Layout

**File: `app/page.tsx`**

```typescript
'use client';

import { useState } from 'react';
import { JobDescriptionInput } from '@/components/JobDescriptionInput';
import { ProfileInput } from '@/components/ProfileInput';
import { QuestionDisplay } from '@/components/QuestionDisplay';
import { FollowUpGenerator } from '@/components/FollowUpGenerator';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import type { JobDescription, CandidateProfile, QuestionSet } from '@/lib/types';

export default function Home() {
  const [step, setStep] = useState<'input' | 'results'>('input');
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState<JobDescription | null>(null);
  const [profileData, setProfileData] = useState<CandidateProfile | null>(null);
  const [questions, setQuestions] = useState<QuestionSet | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!jobData || !profileData) {
      setError('Please complete all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job: jobData, candidate: profileData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate questions');
      }

      const result = await response.json();
      setQuestions(result);
      setStep('results');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">AI Interview Question Generator</h1>
        <p className="text-muted-foreground">
          Generate personalized interview questions from job descriptions + candidate profiles
        </p>
      </div>

      {step === 'input' && (
        <div className="space-y-6">
          <JobDescriptionInput onChange={setJobData} />
          <ProfileInput onChange={setProfileData} />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={loading || !jobData || !profileData}
            size="lg"
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Questions...
              </>
            ) : (
              'Generate Interview Questions'
            )}
          </Button>
        </div>
      )}

      {step === 'results' && questions && (
        <div className="space-y-6">
          <Button variant="outline" onClick={() => setStep('input')}>
            ← Start Over
          </Button>

          <QuestionDisplay questions={questions} />
          <FollowUpGenerator jobContext={jobData?.description || ''} />
        </div>
      )}
    </main>
  );
}
```


### 5.2 Job Description Input Component

**File: `components/JobDescriptionInput.tsx`**

```typescript
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import type { JobDescription } from '@/lib/types';

interface Props {
  onChange: (data: JobDescription) => void;
}

export function JobDescriptionInput({ onChange }: Props) {
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState<'junior' | 'mid' | 'senior' | 'staff'>('mid');
  const [description, setDescription] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [niceToHave, setNiceToHave] = useState<string[]>([]);

  const updateParent = (updates: Partial<JobDescription>) => {
    onChange({
      title,
      level,
      description,
      requiredSkills,
      niceToHave,
      ...updates,
    });
  };

  const addSkill = (type: 'required' | 'nice') => {
    if (!skillInput.trim()) return;
    
    if (type === 'required') {
      const updated = [...requiredSkills, skillInput.trim()];
      setRequiredSkills(updated);
      updateParent({ requiredSkills: updated });
    } else {
      const updated = [...niceToHave, skillInput.trim()];
      setNiceToHave(updated);
      updateParent({ niceToHave: updated });
    }
    setSkillInput('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Description</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Job Title</label>
          <Input
            placeholder="e.g., Senior Backend Engineer"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              updateParent({ title: e.target.value });
            }}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Level</label>
          <Select value={level} onValueChange={(v: any) => {
            setLevel(v);
            updateParent({ level: v });
          }}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="junior">Junior</SelectItem>
              <SelectItem value="mid">Mid-Level</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
              <SelectItem value="staff">Staff/Principal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            placeholder="Paste job description or key responsibilities..."
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              updateParent({ description: e.target.value });
            }}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Required Skills</label>
          <div className="flex gap-2">
            <Input
              placeholder="Add skill (e.g., Python)"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill('required')}
            />
            <Button type="button" onClick={() => addSkill('required')}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {requiredSkills.map((skill, i) => (
              <Badge key={i} variant="default">
                {skill}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => {
                    const updated = requiredSkills.filter((_, idx) => idx !== i);
                    setRequiredSkills(updated);
                    updateParent({ requiredSkills: updated });
                  }}
                />
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```


### 5.3 Question Display Component

**File: `components/QuestionDisplay.tsx`**

```typescript
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScoringRubric } from './ScoringRubric';
import type { QuestionSet } from '@/lib/types';
import { Clock, Lightbulb } from 'lucide-react';

interface Props {
  questions: QuestionSet;
}

export function QuestionDisplay({ questions }: Props) {
  const categories = Object.keys(questions.groupedByCategory);

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Interview Questions for {questions.candidateName} — {questions.jobTitle}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {questions.questions.length} questions • Estimated time: {questions.totalEstimatedTime} minutes
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue={categories[^2_0]}>
        <TabsList>
          {categories.map(cat => (
            <TabsTrigger key={cat} value={cat} className="capitalize">
              {cat.replace('-', ' ')} ({questions.groupedByCategory[cat].length})
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category} value={category} className="space-y-4">
            {questions.groupedByCategory[category].map((q, idx) => (
              <Card key={q.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={difficultyColors[q.difficulty]}>
                          {q.difficulty}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {q.estimatedTime} min
                        </span>
                      </div>
                      <CardTitle className="text-lg">
                        Q{idx + 1}: {q.question}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                    <div className="flex items-start">
                      <Lightbulb className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Why this question?</p>
                        <p className="text-sm text-blue-800 mt-1">{q.context}</p>
                      </div>
                    </div>
                  </div>

                  <ScoringRubric criteria={q.scoringRubric} />
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
```


***

## 🚀 Phase 6: API Routes (Day 3 Afternoon)

### 6.1 Main Question Generation Endpoint

**File: `app/api/generate-questions/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { generateInterviewQuestions } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const { job, candidate } = await req.json();

    if (!job || !candidate) {
      return NextResponse.json(
        { error: 'Missing job or candidate data' },
        { status: 400 }
      );
    }

    const questions = await generateInterviewQuestions(job, candidate);

    return NextResponse.json(questions);
  } catch (error: any) {
    console.error('Question generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate questions' },
      { status: 500 }
    );
  }
}
```


### 6.2 Profile Scraping Endpoint

**File: `app/api/scrape-profile/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { fetchGitHubProfile, extractGitHubUsername } from '@/lib/github';
import { fetchLinkedInProfile } from '@/lib/linkedin';

export async function POST(req: NextRequest) {
  try {
    const { url, source } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL required' }, { status: 400 });
    }

    let profile;

    if (source === 'github' || url.includes('github.com')) {
      const username = extractGitHubUsername(url);
      profile = await fetchGitHubProfile(username);
    } else if (source === 'linkedin' || url.includes('linkedin.com')) {
      profile = await fetchLinkedInProfile(url);
    } else {
      return NextResponse.json({ error: 'Invalid profile URL' }, { status: 400 });
    }

    return NextResponse.json(profile);
  } catch (error: any) {
    console.error('Profile scraping error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
```


***

## 🎯 Phase 7: Polish \& Deployment (Day 4)

### 7.1 Add Loading States \& Error Handling

- Skeleton loaders during API calls
- Toast notifications for errors
- Retry mechanisms


### 7.2 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```


### 7.3 Environment Variables (Vercel Dashboard)

- Add all API keys in Vercel project settings
- Enable Edge Functions for faster responses

***

## 📊 Success Metrics \& Demo Script

### Demo Flow (2 minutes)

1. **Input**: Paste job description for "Senior Full-Stack Engineer"
2. **Profile**: Enter GitHub URL (e.g., `github.com/torvalds`)
3. **Generate**: Click button → show loading state
4. **Results**: Display 8-10 personalized questions grouped by category
5. **Highlight**: Click on a question to show scoring rubric
6. **Bonus**: Enter mock candidate answer → generate follow-up

### Key Differentiators to Emphasize

✅ Questions reference candidate's actual projects
✅ Multi-dimensional scoring rubrics (not just pass/fail)
✅ Intelligent follow-ups based on answers
✅ Time estimates for interview planning
✅ Difficulty progression (warm-up → challenging)

***

## 💰 Cost Estimate

- **OpenAI API**: ~\$0.10-0.30 per question set (GPT-4o)
- **Proxycurl**: ~\$0.03 per LinkedIn profile
- **GitHub API**: Free (60 req/hour without token, 5000 with)
- **Vercel Hosting**: Free tier sufficient for demo

**Total per demo run**: ~\$0.15-0.35

***

## 🚨 Common Pitfalls \& Solutions

| Issue | Solution |
| :-- | :-- |
| GitHub rate limiting | Add `GITHUB_TOKEN` to env |
| LinkedIn scraping fails | Fall back to manual profile input |
| OpenAI timeouts | Increase timeout, use streaming |
| Questions too generic | Improve prompt with more candidate context |
| Scoring rubrics vague | Add examples in system prompt |


***

Would you like me to generate any specific component code, or shall I create a working prototype of the entire demo now?
<span style="display:none">[^2_10][^2_11][^2_12][^2_13][^2_14][^2_15][^2_2][^2_3][^2_4][^2_5][^2_6][^2_7][^2_8][^2_9]</span>

<div align="center">⁂</div>

[^2_1]: https://docs.github.com/en/rest/users/users

[^2_2]: https://docs.github.com/en/rest/users

[^2_3]: https://github.blog/changelog/2026-01-12-deprecation-of-user-to-organization-account-transformation/

[^2_4]: https://stackoverflow.com/questions/49944728/how-do-i-get-the-github-user-info-to-show-up-using-github-api-in-react

[^2_5]: https://dev.to/falanatolu/using-github-api-to-fetch-and-display-a-github-user-profile-26g6

[^2_6]: https://brightdata.com/blog/web-data/best-linkedin-scraping-tools

[^2_7]: https://www.systemdesignhandbook.com/guides/openai-system-design-interview/

[^2_8]: https://docs.github.com/en/rest/metrics/statistics

[^2_9]: https://www.lindy.ai/blog/linkedin-scraper

[^2_10]: https://www.designgurus.io/blog/openai-system-design-interview-questions

[^2_11]: https://github.com/orgs/community/discussions/62646

[^2_12]: https://www.lobstr.io/blog/best-linkedin-profile-scrapers

[^2_13]: https://platform.openai.com/docs/guides/structured-outputs

[^2_14]: https://github.com/topics/github-user-info

[^2_15]: https://www.vayne.io/en/blog/best-linkedin-scrapers-2026


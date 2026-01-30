# AI Interview Question Generator - Complete Implementation Documentation

## Table of Contents
1. [Overview](#1-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Architecture](#3-project-architecture)
4. [Type System & Data Models](#4-type-system--data-models)
5. [API Routes](#5-api-routes)
6. [Library Modules](#6-library-modules)
7. [Frontend Components](#7-frontend-components)
8. [UI Component Library](#8-ui-component-library)
9. [Styling System](#9-styling-system)
10. [Configuration Files](#10-configuration-files)
11. [Application Flow](#11-application-flow)
12. [Environment Variables](#12-environment-variables)
13. [External API Integrations](#13-external-api-integrations)

---

## 1. Overview

The **AI Interview Question Generator** is a Next.js 16 application that generates personalized, AI-powered interview questions based on job descriptions and candidate profiles. It leverages OpenAI's GPT-4o model with structured outputs to create targeted questions with detailed scoring rubrics.

### Key Features
- **Personalized Questions**: References candidate's actual projects, skills, and experience
- **Detailed Scoring Rubrics**: 3-tier evaluation (Excellent/Good/Needs Work) for each question
- **Smart Profile Fetching**: Auto-fetch profiles from GitHub or LinkedIn
- **Follow-Up Generation**: Intelligent follow-up questions based on candidate answers
- **Modern UI**: Responsive design with Tailwind CSS and shadcn/ui components

---

## 2. Technology Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.6 | React framework with App Router |
| React | 19.0.0 | UI library |
| TypeScript | 5.7.3 | Type safety |

### AI & APIs
| Technology | Version | Purpose |
|------------|---------|---------|
| OpenAI | 4.77.0 | GPT-4o for question generation |
| Axios | 1.7.9 | HTTP client for API calls |
| Zod | 3.24.1 | Schema validation |

### UI & Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 3.4.17 | Utility-first CSS |
| Radix UI | Various | Accessible component primitives |
| Lucide React | 0.469.0 | Icon library |
| class-variance-authority | 0.7.1 | Component variant management |
| tailwind-merge | 2.6.0 | Class merging utility |
| tailwindcss-animate | 1.0.7 | Animation utilities |

### Radix UI Components Used
- `@radix-ui/react-collapsible` (1.1.2) - Collapsible sections
- `@radix-ui/react-select` (2.1.4) - Select dropdowns
- `@radix-ui/react-slot` (1.1.1) - Slot pattern for composition
- `@radix-ui/react-tabs` (1.1.2) - Tabbed interfaces

---

## 3. Project Architecture

```
ai-interviewer-demo/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes (Server-side)
│   │   ├── follow-up/route.ts    # Follow-up question generation
│   │   ├── generate-questions/route.ts  # Main question generation
│   │   └── scrape-profile/route.ts      # Profile fetching
│   ├── globals.css               # Global styles & CSS variables
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Main application page
├── components/                   # React Components
│   ├── ui/                       # Reusable UI primitives (shadcn/ui)
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── collapsible.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   └── textarea.tsx
│   ├── FollowUpGenerator.tsx     # Follow-up question UI
│   ├── JobDescriptionInput.tsx   # Job details form
│   ├── ProfileInput.tsx          # Candidate profile input
│   ├── QuestionDisplay.tsx       # Questions view with categories
│   └── ScoringRubric.tsx         # Scoring rubric display
├── lib/                          # Shared utilities & integrations
│   ├── github.ts                 # GitHub API integration
│   ├── linkedin.ts               # LinkedIn/Proxycurl integration
│   ├── openai.ts                 # OpenAI integration
│   ├── types.ts                  # TypeScript types & Zod schemas
│   └── utils.ts                  # Utility functions
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies & scripts
└── .env.example                  # Environment variable template
```

---

## 4. Type System & Data Models

### Location: `lib/types.ts`

The application uses Zod for runtime validation alongside TypeScript interfaces.

### Job Description Types

```typescript
interface JobDescription {
  title: string;                    // Job title (e.g., "Senior Frontend Engineer")
  level: "junior" | "mid" | "senior" | "staff";  // Experience level
  description: string;              // Full job description (min 100 chars)
  requiredSkills: string[];         // Must-have skills (min 1)
  niceToHave: string[];            // Optional skills
}
```

**Zod Schema Validation:**
- `title`: Non-empty string
- `level`: Enum with 4 options
- `description`: Minimum 100 characters
- `requiredSkills`: Array with at least 1 element

### Candidate Profile Types

```typescript
interface CandidateProject {
  name: string;
  description: string;
  language: string;
  stars: number;
}

interface CandidateProfile {
  source: "github" | "linkedin" | "manual";
  url?: string;
  name: string;
  bio?: string;
  skills: string[];
  experience: string[];
  projects?: CandidateProject[];    // GitHub only
  languages?: Record<string, number>; // Language byte counts
}
```

### Scoring Criteria Types

```typescript
interface ScoringCriteria {
  aspect: string;      // What's being evaluated (e.g., "Code Quality")
  weight: number;      // Importance 1-5
  excellent: string;   // Description of excellent response
  good: string;        // Description of good response
  needsWork: string;   // Description of poor response
}
```

### Interview Question Types

```typescript
type QuestionCategory = "technical" | "behavioral" | "system-design" | "problem-solving";
type QuestionDifficulty = "easy" | "medium" | "hard";

interface InterviewQuestion {
  id: string;
  category: QuestionCategory;
  difficulty: QuestionDifficulty;
  question: string;
  context: string;                    // Why this question matters
  scoringRubric: ScoringCriteria[];  // Multiple evaluation aspects
  estimatedTime: number;              // Minutes expected
}
```

### Question Set Types

```typescript
interface QuestionSet {
  jobTitle: string;
  candidateName: string;
  questions: InterviewQuestion[];     // 8-10 questions
  totalEstimatedTime: number;
  groupedByCategory?: Record<QuestionCategory, InterviewQuestion[]>;
}
```

### Follow-Up Types

```typescript
interface FollowUpResponse {
  followUp: string;    // The follow-up question
  rationale: string;   // Why this follow-up reveals important information
}
```

### API Request/Response Types

```typescript
interface GenerateQuestionsRequest {
  job: JobDescription;
  candidate: CandidateProfile;
}

interface ScrapeProfileRequest {
  url: string;
  source: "github" | "linkedin";
}

interface FollowUpRequest {
  originalQuestion: InterviewQuestion;
  candidateAnswer: string;
  jobDescription: JobDescription;
}
```

### UI State Types

```typescript
type AppStep = "job" | "profile" | "questions";

interface AppState {
  currentStep: AppStep;
  job: JobDescription | null;
  candidate: CandidateProfile | null;
  questions: QuestionSet | null;
  isLoading: boolean;
  error: string | null;
}
```

---

## 5. API Routes

### 5.1 Generate Questions API

**Endpoint:** `POST /api/generate-questions`

**Location:** `app/api/generate-questions/route.ts`

**Purpose:** Main endpoint that generates personalized interview questions using OpenAI GPT-4o.

**Request Body:**
```json
{
  "job": {
    "title": "Senior Frontend Engineer",
    "level": "senior",
    "description": "...",
    "requiredSkills": ["React", "TypeScript"],
    "niceToHave": ["GraphQL"]
  },
  "candidate": {
    "source": "github",
    "name": "John Doe",
    "skills": ["JavaScript", "React"],
    "experience": ["..."],
    "projects": [...]
  }
}
```

**Response:**
```json
{
  "jobTitle": "Senior Frontend Engineer",
  "candidateName": "John Doe",
  "questions": [...],
  "totalEstimatedTime": 75,
  "groupedByCategory": {
    "technical": [...],
    "behavioral": [...]
  }
}
```

**Implementation Details:**
1. Validates input using Zod schemas (`JobDescriptionSchema`, `CandidateProfileSchema`)
2. Calls `generateInterviewQuestions()` from OpenAI module
3. Groups questions by category
4. Calculates total estimated time
5. Returns enriched response

**Error Handling:**
- 400: Invalid job description or candidate profile
- 429: OpenAI rate limit exceeded
- 500: API key not configured or unexpected errors

---

### 5.2 Scrape Profile API

**Endpoint:** `POST /api/scrape-profile`

**Location:** `app/api/scrape-profile/route.ts`

**Purpose:** Fetches candidate profiles from GitHub or LinkedIn.

**Request Body:**
```json
{
  "url": "https://github.com/username",
  "source": "github"
}
```

**Response:** Returns a `CandidateProfile` object.

**Additional GET Endpoint:**
```
GET /api/scrape-profile?url=github.com/username
```
Returns detected source:
```json
{ "source": "github" }
```

**Implementation Details:**
1. Validates URL format based on source
2. For GitHub: Extracts username and calls `fetchGitHubProfile()`
3. For LinkedIn: Normalizes URL and calls `fetchLinkedInProfile()`
4. Returns structured profile data

---

### 5.3 Follow-Up API

**Endpoint:** `POST /api/follow-up`

**Location:** `app/api/follow-up/route.ts`

**Purpose:** Generates intelligent follow-up questions based on candidate answers.

**Request Body:**
```json
{
  "originalQuestion": {...},
  "candidateAnswer": "The candidate's response...",
  "jobDescription": {...}
}
```

**Response:**
```json
{
  "followUp": "Can you elaborate on...",
  "rationale": "This probes deeper into..."
}
```

**Validation:**
- Candidate answer must be at least 10 characters
- Original question must match `InterviewQuestionSchema`
- Job description must match `JobDescriptionSchema`

---

## 6. Library Modules

### 6.1 OpenAI Integration

**Location:** `lib/openai.ts`

**Key Functions:**

#### `generateInterviewQuestions(job, candidate)`

Generates 8-10 personalized interview questions using GPT-4o with structured outputs.

**System Prompt Key Instructions:**
- Generate EXACTLY 8-10 questions
- Reference specific details from candidate's profile
- Balance: 60% technical, 40% behavioral
- Difficulty ladder: 2-3 easy, 4-5 medium, 2-3 hard
- Include multi-dimensional scoring rubrics

**User Prompt Construction:**
- Formats job details (title, level, required skills, description)
- Formats candidate profile (name, bio, skills, experience, projects)
- Calculates matching skills and skill gaps
- Provides specific instructions for question generation

**Technical Implementation:**
```typescript
const completion = await openai.beta.chat.completions.parse({
  model: "gpt-4o-2024-08-06",
  messages: [...],
  response_format: zodResponseFormat(QuestionSetSchema, "interview_questions"),
  temperature: 0.7,
});
```

#### `generateFollowUpQuestion(originalQuestion, candidateAnswer, job)`

Generates a single follow-up question that:
- Probes deeper into specific aspects mentioned
- Tests understanding beyond surface-level
- Reveals edge case handling
- Remains natural and conversational

---

### 6.2 GitHub Integration

**Location:** `lib/github.ts`

**Key Functions:**

#### `fetchGitHubProfile(username)`

Fetches comprehensive profile data from GitHub API.

**API Calls (Parallelized):**
1. `GET /users/{username}` - Basic profile info
2. `GET /users/{username}/repos?sort=stars&per_page=10` - Top repositories
3. `GET {repo.languages_url}` - Language breakdown (top 5 repos)

**Data Extraction:**
- **User Info:** name, bio, avatar
- **Skills:** Aggregated from languages + repo topics
- **Experience:** Formatted from repo descriptions
- **Projects:** Structured project objects with name, description, language, stars
- **Languages:** Byte counts sorted by usage

**Error Handling:**
- 404: User not found
- 403: Rate limit exceeded (suggests adding `GITHUB_TOKEN`)
- Other Axios errors

#### `extractGitHubUsername(input)`

Parses GitHub username from various input formats:
- Full URL: `github.com/username`
- Plain username: `username`

Uses regex pattern: `/github\.com\/([a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38})/i`

---

### 6.3 LinkedIn Integration

**Location:** `lib/linkedin.ts`

**Key Functions:**

#### `fetchLinkedInProfile(profileUrl)`

Fetches profile data via Proxycurl API (paid service).

**API Call:**
```
GET https://nubela.co/proxycurl/api/v2/linkedin
  ?url={profileUrl}&skills=include
```

**Data Extraction:**
- Name from `first_name` + `last_name`
- Bio from `summary` or `headline`
- Skills from explicit skills array
- Experience formatted as: `{title} at {company} ({startYear} - {endYear})`
- Additional skills extracted from experience descriptions (keyword matching)

**Keyword Extraction List:**
JavaScript, TypeScript, Python, Java, React, Node.js, AWS, Docker, Kubernetes, SQL, MongoDB, GraphQL, REST, API, Agile, Scrum

#### `extractLinkedInUrl(input)` / `isLinkedInUrl(input)`

Validates and normalizes LinkedIn URLs:
- Handles `/in/` and `/pub/` formats
- Adds `https://www.` prefix if missing

---

### 6.4 Utility Functions

**Location:** `lib/utils.ts`

#### `cn(...inputs)`
Merges Tailwind CSS classes using `clsx` + `tailwind-merge`:
```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

#### `formatDuration(minutes)`
Formats time display:
- `45` → `"45 min"`
- `60` → `"1h"`
- `75` → `"1h 15m"`

#### `getDifficultyColor(difficulty)`
Returns Tailwind classes for difficulty badges:
- `easy`: green-100/800/200
- `medium`: yellow-100/800/200
- `hard`: red-100/800/200

#### `getCategoryIcon(category)`
Maps categories to icon names:
- `technical` → "code"
- `behavioral` → "users"
- `system-design` → "layout"
- `problem-solving` → "lightbulb"

---

## 7. Frontend Components

### 7.1 Main Page Component

**Location:** `app/page.tsx`

**State Management:**
```typescript
const [currentStep, setCurrentStep] = useState<AppStep>("job");
const [job, setJob] = useState<JobDescription | null>(null);
const [candidate, setCandidate] = useState<CandidateProfile | null>(null);
const [questions, setQuestions] = useState<QuestionSet | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

**Step Configuration:**
```typescript
const steps = [
  { id: "job", label: "Job Details", icon: Briefcase },
  { id: "profile", label: "Candidate", icon: User },
  { id: "questions", label: "Questions", icon: FileText },
];
```

**Key Functions:**
- `handleJobSubmit(jobData)` - Saves job, advances to profile step
- `handleProfileSubmit(profileData)` - Triggers question generation
- `goBack()` - Navigation between steps
- `startOver()` - Resets all state

**UI Sections:**
1. **Header:** Sticky header with app title and "Start Over" button
2. **Progress Steps:** Visual step indicator with completion states
3. **Error Display:** Red alert box with dismiss button
4. **Loading Overlay:** Full-screen overlay during generation
5. **Main Content:** Conditional rendering based on current step
6. **Footer:** Attribution text

---

### 7.2 JobDescriptionInput Component

**Location:** `components/JobDescriptionInput.tsx`

**Props:**
```typescript
interface JobDescriptionInputProps {
  onSubmit: (job: JobDescription) => void;
  initialData?: JobDescription | null;
}
```

**Form Fields:**
1. **Job Title** (required) - Text input
2. **Experience Level** (required) - Select dropdown (junior/mid/senior/staff)
3. **Job Description** (required) - Textarea with character counter (min 100)
4. **Required Skills** (required) - Dynamic tag input with add/remove
5. **Nice-to-Have Skills** (optional) - Dynamic tag input

**Validation Logic:**
```typescript
const validate = (): boolean => {
  const newErrors: Record<string, string> = {};
  if (!title.trim()) newErrors.title = "Job title is required";
  if (description.length < 100) newErrors.description = "...";
  if (requiredSkills.length === 0) newErrors.requiredSkills = "...";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

**Features:**
- Enter key adds skills
- Visual error states on inputs
- Character count display
- Skill badges with remove buttons

---

### 7.3 ProfileInput Component

**Location:** `components/ProfileInput.tsx`

**Props:**
```typescript
interface ProfileInputProps {
  onSubmit: (profile: CandidateProfile) => void;
  isLoading?: boolean;
}
```

**Two Input Modes (Tabs):**

#### URL Mode
- URL/username input field
- Auto-detects GitHub vs LinkedIn
- Fetches profile from API
- Shows preview with:
  - Name and source
  - Bio
  - Skills (max 15 shown)
  - Top 3 projects (GitHub only)
- "Refresh" button to re-fetch

#### Manual Mode
- Name (required)
- Bio/Summary (optional)
- Skills (required, dynamic tags)
- Experience (textarea, one per line)

**Source Detection:**
```typescript
const detectSource = (inputUrl: string): "github" | "linkedin" | null => {
  if (inputUrl.includes("github.com") || /^[a-zA-Z0-9-]+$/.test(inputUrl.trim())) {
    return "github";
  }
  if (inputUrl.includes("linkedin.com")) {
    return "linkedin";
  }
  return null;
};
```

---

### 7.4 QuestionDisplay Component

**Location:** `components/QuestionDisplay.tsx`

**Props:**
```typescript
interface QuestionDisplayProps {
  questionSet: QuestionSet;
}
```

**Layout Sections:**

#### Summary Card
- Candidate name
- Position
- Total question count
- Estimated duration
- Difficulty breakdown (Easy/Medium/Hard badges)

#### Category Tabs
Each tab shows questions for one category with count badge:
- Technical (Code icon)
- Behavioral (Users icon)
- System Design (Layout icon)
- Problem Solving (Lightbulb icon)

#### Question Cards
Each question card contains:
- Question number
- Difficulty badge (color-coded)
- Time estimate
- Question text
- "Why this question?" collapsible context
- Scoring rubric (nested component)

**Category Configuration:**
```typescript
const categoryConfig: Record<QuestionCategory, { label: string; icon: Component }> = {
  technical: { label: "Technical", icon: Code },
  behavioral: { label: "Behavioral", icon: Users },
  "system-design": { label: "System Design", icon: Layout },
  "problem-solving": { label: "Problem Solving", icon: Lightbulb },
};
```

---

### 7.5 ScoringRubric Component

**Location:** `components/ScoringRubric.tsx`

**Props:**
```typescript
interface ScoringRubricProps {
  rubric: ScoringCriteria[];
  defaultOpen?: boolean;
}
```

**Display Structure:**
For each scoring criteria:
1. **Header:** Aspect name + Weight (visual dots 1-5)
2. **Three Tiers:**
   - Excellent (green background, CheckCircle icon)
   - Good (yellow background, AlertTriangle icon)
   - Needs Work (red background, XCircle icon)

**Weight Visualization:**
```typescript
const renderWeightDots = (weight: number) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className={cn(
          "w-2 h-2 rounded-full",
          i <= weight ? "bg-primary" : "bg-muted"
        )}
      />
    ))}
  </div>
);
```

---

### 7.6 FollowUpGenerator Component

**Location:** `components/FollowUpGenerator.tsx`

**Props:**
```typescript
interface FollowUpGeneratorProps {
  questions: InterviewQuestion[];
  jobDescription: JobDescription;
}
```

**State:**
```typescript
const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");
const [candidateAnswer, setCandidateAnswer] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [followUp, setFollowUp] = useState<FollowUpResponse | null>(null);
```

**UI Elements:**
1. Question selector dropdown
2. Selected question preview
3. Candidate answer textarea (min 10 chars)
4. Generate button
5. Result display with follow-up question and rationale
6. "Generate Another" reset button

---

## 8. UI Component Library

All UI components follow the shadcn/ui pattern with Radix UI primitives and Tailwind styling.

### 8.1 Button Component

**Location:** `components/ui/button.tsx`

**Variants:**
- `default`: Primary blue background
- `destructive`: Red background
- `outline`: Border with transparent background
- `secondary`: Gray background
- `ghost`: Transparent, hover effect only
- `link`: Underlined text

**Sizes:**
- `default`: h-10 px-4
- `sm`: h-9 px-3
- `lg`: h-11 px-8
- `icon`: h-10 w-10 (square)

**Features:**
- Uses `@radix-ui/react-slot` for `asChild` pattern
- Focus ring styling
- Disabled state handling
- SVG icon sizing built-in

---

### 8.2 Card Component

**Location:** `components/ui/card.tsx`

**Exports:**
- `Card` - Container with border, shadow, rounded corners
- `CardHeader` - Top section with padding
- `CardTitle` - Large semibold text
- `CardDescription` - Muted smaller text
- `CardContent` - Main content area (no top padding)
- `CardFooter` - Bottom section with flex layout

---

### 8.3 Badge Component

**Location:** `components/ui/badge.tsx`

**Variants:**
- `default`: Primary color
- `secondary`: Gray
- `destructive`: Red
- `outline`: Border only
- `success`: Green (custom)
- `warning`: Yellow (custom)
- `error`: Red (custom)

**Style:** Rounded-full, small text, inline-flex

---

### 8.4 Input Component

**Location:** `components/ui/input.tsx`

Standard text input with:
- Full width
- Border and focus ring
- Placeholder styling
- Disabled state
- File input support

---

### 8.5 Textarea Component

**Location:** `components/ui/textarea.tsx`

Multi-line input with:
- Minimum height (80px)
- Same styling as Input
- Resizable

---

### 8.6 Select Component

**Location:** `components/ui/select.tsx`

Built on `@radix-ui/react-select`:
- `Select` - Root context
- `SelectTrigger` - Button that opens dropdown
- `SelectContent` - Dropdown container with animations
- `SelectItem` - Individual option with checkmark
- `SelectValue` - Displayed selected value
- `SelectGroup` / `SelectLabel` - Grouping support
- `SelectSeparator` - Divider line
- Scroll buttons for long lists

---

### 8.7 Tabs Component

**Location:** `components/ui/tabs.tsx`

Built on `@radix-ui/react-tabs`:
- `Tabs` - Root context
- `TabsList` - Container for triggers
- `TabsTrigger` - Individual tab button
- `TabsContent` - Content panel

**Styling:** Muted background, active state shadow

---

### 8.8 Collapsible Component

**Location:** `components/ui/collapsible.tsx`

Direct re-export of `@radix-ui/react-collapsible`:
- `Collapsible` - Root
- `CollapsibleTrigger` - Toggle button
- `CollapsibleContent` - Hidden content

---

## 9. Styling System

### 9.1 Global CSS

**Location:** `app/globals.css`

**CSS Custom Properties (Light Mode):**
```css
:root {
  --background: 0 0% 100%;           /* White */
  --foreground: 222.2 84% 4.9%;      /* Near black */
  --primary: 221.2 83.2% 53.3%;      /* Blue */
  --secondary: 210 40% 96.1%;        /* Light gray */
  --muted: 210 40% 96.1%;            /* Light gray */
  --accent: 210 40% 96.1%;           /* Light gray */
  --destructive: 0 84.2% 60.2%;      /* Red */
  --border: 214.3 31.8% 91.4%;       /* Light border */
  --ring: 221.2 83.2% 53.3%;         /* Blue focus ring */
  --radius: 0.5rem;                  /* Border radius */
}
```

**Dark Mode Variables:**
Inverted color scheme with darker backgrounds and adjusted primary colors.

**Base Layer:**
```css
@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground; }
}
```

---

### 9.2 Tailwind Configuration

**Location:** `tailwind.config.ts`

**Dark Mode:** Class-based (`darkMode: ["class"]`)

**Content Paths:**
- `./pages/**/*.{js,ts,jsx,tsx,mdx}`
- `./components/**/*.{js,ts,jsx,tsx,mdx}`
- `./app/**/*.{js,ts,jsx,tsx,mdx}`

**Extended Theme:**
- All CSS variable colors mapped to `hsl(var(--name))`
- Border radius using CSS variable
- Semantic color names (card, popover, muted, etc.)

**Plugins:** `tailwindcss-animate` for animation utilities

---

## 10. Configuration Files

### 10.1 Next.js Configuration

**Location:** `next.config.ts`

```typescript
const nextConfig: NextConfig = {
  /* config options here */
};
```

Currently uses default configuration.

---

### 10.2 TypeScript Configuration

**Location:** `tsconfig.json`

**Key Settings:**
- `strict: true` - Full type checking
- `jsx: "react-jsx"` - React 17+ JSX transform
- `moduleResolution: "bundler"` - Modern resolution
- `incremental: true` - Faster builds
- Path alias: `@/*` maps to root

**Target:** ES2017

---

### 10.3 Package Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## 11. Application Flow

### Step 1: Job Description Input
1. User fills out job title, level, description
2. User adds required skills (at least 1)
3. User optionally adds nice-to-have skills
4. Form validates on submit
5. State updates: `job` set, `currentStep` → "profile"

### Step 2: Candidate Profile Input
1. User chooses URL or Manual mode
2. **URL Mode:**
   - Enters GitHub/LinkedIn URL
   - Clicks "Fetch"
   - Profile preview displays
   - Clicks "Generate Interview Questions"
3. **Manual Mode:**
   - Fills name, bio, skills, experience
   - Clicks "Generate Interview Questions"
4. `handleProfileSubmit` triggers API call

### Step 3: Question Generation
1. Loading overlay appears
2. `POST /api/generate-questions` called
3. Backend validates inputs with Zod
4. OpenAI generates structured response
5. Questions grouped by category
6. Total time calculated
7. `currentStep` → "questions"

### Step 4: Question Display
1. Summary card shows stats
2. Category tabs filter questions
3. Each question expandable for context/rubric
4. Follow-up generator available below questions

### Step 5: Follow-Up Generation (Optional)
1. Select original question from dropdown
2. Enter candidate's answer
3. Click "Generate Follow-Up Question"
4. API returns follow-up with rationale

---

## 12. Environment Variables

**Location:** `.env.local` (not committed)

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | OpenAI API key for GPT-4o access |
| `GITHUB_TOKEN` | No | GitHub Personal Access Token (5000 req/hr vs 60) |
| `PROXYCURL_API_KEY` | No | Proxycurl API key for LinkedIn scraping |
| `NEXT_PUBLIC_APP_URL` | No | Public app URL (auto-set by Vercel) |

---

## 13. External API Integrations

### 13.1 OpenAI API

**Model:** `gpt-4o-2024-08-06`

**Features Used:**
- Structured Outputs via `zodResponseFormat`
- `beta.chat.completions.parse` for typed responses
- Temperature: 0.7 (moderate creativity)

**Estimated Costs:**
- ~$0.10-0.30 per question set (varies by profile complexity)

---

### 13.2 GitHub REST API

**Endpoints Used:**
- `GET /users/{username}` - Profile info
- `GET /users/{username}/repos` - Repository list
- `GET {repo.languages_url}` - Language stats

**Rate Limits:**
- Without token: 60 requests/hour
- With token: 5,000 requests/hour

---

### 13.3 Proxycurl API (LinkedIn)

**Base URL:** `https://nubela.co/proxycurl/api/v2/linkedin`

**Cost:** ~$0.03 per profile lookup

**Data Retrieved:**
- Name, headline, summary
- Skills array
- Work experience history

---

## Conclusion

This documentation covers every aspect of the AI Interview Question Generator implementation. The application follows modern React patterns with Next.js App Router, uses type-safe APIs with Zod validation, and provides a polished user experience through carefully crafted UI components.

The architecture is modular, maintainable, and scalable, with clear separation between API routes, business logic, and UI components. All external integrations are abstracted into dedicated library modules, making it easy to swap implementations or add new data sources in the future.

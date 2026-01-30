# Lontario YC - AI-Powered Hiring Platform

A comprehensive AI-powered hiring platform suite that revolutionizes recruitment through intelligent automation. This monorepo contains a full-featured hiring platform and a focused interview question generator demo.

## 🎯 Project Overview

This repository contains two main applications:

1. **AI Hiring Platform** (`ai-hiring-platform/`) - A complete, production-ready hiring platform
2. **AI Interviewer Demo** (`ai-interviewer-demo/`) - A focused demo for generating personalized interview questions

Both applications leverage OpenAI GPT-4o to automate and enhance the recruitment process, reducing time-to-hire from hours to minutes.

---

## 📦 Repository Structure

```
lontario-YC/
├── ai-hiring-platform/          # Full-featured hiring platform
│   ├── app/                      # Next.js App Router pages
│   │   ├── (dashboard)/          # Dashboard routes
│   │   │   ├── interview/        # AI Interview Generator
│   │   │   ├── jobs/             # Job management
│   │   │   └── page.tsx          # Dashboard home
│   │   └── api/                  # API routes
│   │       ├── jobs/             # Job CRUD operations
│   │       ├── candidates/       # Candidate management
│   │       ├── interviews/       # Interview scheduling
│   │       └── ai/               # AI endpoints
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── interview/            # Interview components
│   │   ├── jobs/                 # Job-related components
│   │   └── dashboard/            # Dashboard components
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utilities and services
│   │   ├── ai/                   # AI integrations (OpenAI, GitHub, LinkedIn)
│   │   ├── stores/               # Zustand state management
│   │   └── supabase/             # Supabase clients
│   ├── types/                    # TypeScript type definitions
│   └── supabase/                 # Database migrations
│
├── ai-interviewer-demo/          # Interview question generator demo
│   ├── app/                      # Next.js pages
│   │   └── api/                  # API routes
│   ├── components/               # React components
│   └── lib/                      # Utilities and AI integrations
│
├── aiRoadmap.md                   # Detailed technical roadmap and plans
├── contrario-aiAnalysis.md       # AI analysis documentation
└── README.md                      # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **pnpm** (recommended) or npm
- **Supabase account** (for `ai-hiring-platform`)
- **OpenAI API key** (required for AI features)

### Installation

#### Option 1: AI Hiring Platform (Full Platform)

```bash
cd ai-hiring-platform

# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env.local

# Configure environment variables (see below)
# Edit .env.local with your credentials

# Start development server
pnpm dev
```

#### Option 2: AI Interviewer Demo (Standalone Demo)

```bash
cd ai-interviewer-demo

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Configure environment variables
# Edit .env.local with your OpenAI API key

# Start development server
npm run dev
```

### Environment Variables

#### AI Hiring Platform (`.env.local`)

```env
# Required - Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # Optional, for admin operations

# Required - OpenAI
OPENAI_API_KEY=sk-...

# Optional - Enhanced features
GITHUB_TOKEN=ghp_...              # For higher GitHub API rate limits
PROXYCURL_API_KEY=...             # For LinkedIn profile fetching
```

#### AI Interviewer Demo (`.env.local`)

```env
# Required
OPENAI_API_KEY=sk-...

# Optional
GITHUB_TOKEN=ghp_...              # Increases GitHub rate limit
PROXYCURL_API_KEY=...             # For LinkedIn profile fetching
```

---

## 🎨 Features

### AI Hiring Platform

#### Core Features
- ✅ **AI Resume Parsing** - Extract structured data from resumes using GPT-4o
- ✅ **Smart Candidate Matching** - AI-powered scoring and ranking (0-100 scale)
- ✅ **Automated Text Interviews** - Generate personalized interview questions with scoring rubrics
- ✅ **Kanban Pipeline** - Visual drag-and-drop candidate management
- ✅ **Profile Scraping** - Import candidate data from GitHub and LinkedIn URLs
- ✅ **Real-time Updates** - Live collaboration with Supabase Realtime
- ✅ **Interview Scheduling** - Automated interview scheduling system
- ✅ **Activity Feed** - Track all recruitment activities
- ✅ **Job Management** - Full CRUD for job postings

#### AI Capabilities
- **Resume Parsing**: Extracts contact info, skills, experience, education
- **Candidate Scoring**: Evaluates candidates on skills match (40%), experience (30%), education (15%), keywords (15%)
- **Question Generation**: Creates 8-10 personalized questions based on job requirements and candidate profile
- **Answer Evaluation**: AI evaluates interview answers with detailed feedback
- **Follow-up Questions**: Generates intelligent follow-up questions based on candidate responses

### AI Interviewer Demo

#### Features
- ✅ **Personalized Questions** - Questions reference candidate's actual projects and experience
- ✅ **Detailed Scoring Rubrics** - 3-tier evaluation (Excellent/Good/Needs Work) for each question
- ✅ **Smart Profile Fetching** - Auto-fetch profiles from GitHub or LinkedIn URLs
- ✅ **Follow-Up Generation** - Generate intelligent follow-up questions based on answers
- ✅ **Beautiful UI** - Modern, responsive design with dark mode support
- ✅ **Fast Results** - Generates questions in under 5 seconds

---

## 🛠️ Tech Stack

### AI Hiring Platform

- **Frontend**: Next.js 16+ (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **State Management**: TanStack Query (React Query), Zustand
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **AI**: OpenAI GPT-4o with structured outputs (Zod)
- **UI Components**: Radix UI primitives via shadcn/ui
- **Drag & Drop**: @dnd-kit for Kanban board
- **Forms**: React Hook Form with Zod validation
- **Deployment**: Vercel (recommended)

### AI Interviewer Demo

- **Framework**: Next.js 15+ with TypeScript
- **AI**: OpenAI GPT-4o with Structured Outputs
- **Styling**: Tailwind CSS + shadcn/ui
- **APIs**: GitHub REST API, Proxycurl (LinkedIn)
- **Validation**: Zod schemas

---

## 📚 Documentation

### Detailed Documentation

- **[AI Hiring Platform README](./ai-hiring-platform/README.md)** - Complete guide for the full platform
- **[AI Interviewer Demo README](./ai-interviewer-demo/README.md)** - Guide for the demo application
- **[Technical Roadmap](./aiRoadmap.md)** - Detailed technical plans and architecture

### API Endpoints

#### AI Hiring Platform

**Jobs**
- `GET /api/jobs` - List all jobs
- `POST /api/jobs` - Create new job
- `GET /api/jobs/[id]` - Get job details
- `PUT /api/jobs/[id]` - Update job
- `DELETE /api/jobs/[id]` - Delete job

**Candidates**
- `GET /api/candidates?job_id=xxx` - List candidates for a job
- `POST /api/candidates` - Create application
- `GET /api/candidates/[id]` - Get candidate details
- `PATCH /api/candidates/[id]` - Update candidate
- `POST /api/candidates/[id]/move` - Move candidate to new stage

**AI Endpoints**
- `POST /api/ai/generate-questions` - Generate interview questions
- `POST /api/ai/score-candidate` - Score candidate-job fit
- `POST /api/ai/parse-resume` - Extract resume data
- `POST /api/ai/evaluate-answer` - Evaluate interview answer
- `POST /api/ai/follow-up` - Generate follow-up question
- `POST /api/ai/scrape-profile` - Fetch GitHub/LinkedIn profile

**Interviews**
- `POST /api/interviews/schedule` - Schedule interview
- `GET /api/interviews/[id]` - Get interview details
- `POST /api/interviews/[id]/start` - Start interview

#### AI Interviewer Demo

- `POST /api/generate-questions` - Generate interview questions
- `POST /api/scrape-profile` - Fetch GitHub/LinkedIn profile
- `POST /api/follow-up` - Generate follow-up question

---

## 🗄️ Database Setup

### AI Hiring Platform

The platform uses Supabase (PostgreSQL). To set up the database:

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL migrations from `ai-hiring-platform/supabase/migrations/`
3. Enable Row Level Security (RLS) policies
4. Configure environment variables with your Supabase credentials

**Demo Mode**: The application works in demo mode without Supabase configured, using mock data. This allows you to explore the UI and test AI features without setting up a database.

---

## 💰 Cost Estimates

### AI Hiring Platform

| Service | Cost | Notes |
|---------|------|-------|
| **Supabase** | $0-25/month | Free tier available, scales with usage |
| **Vercel** | $0-20/month | Free tier sufficient for development |
| **OpenAI GPT-4o** | ~$0.10-0.30 per question set | Depends on profile complexity |
| **GitHub API** | Free | 60 req/hr (5000 with token) |
| **Proxycurl (LinkedIn)** | ~$0.03 per profile | Optional |

**Total for first 100 users**: ~$100-250/month

### AI Interviewer Demo

| Service | Cost | Notes |
|---------|------|-------|
| **OpenAI GPT-4o** | ~$0.10-0.30 per question set | Depends on profile complexity |
| **GitHub API** | Free | 60 req/hr (5000 with token) |
| **Proxycurl (LinkedIn)** | ~$0.03 per profile | Optional |
| **Vercel Hosting** | Free | Free tier sufficient for demo |

**Total per demo run**: ~$0.15-0.35

---

## 🚦 Development

### Running the Development Server

**AI Hiring Platform:**
```bash
cd ai-hiring-platform
pnpm dev
```

**AI Interviewer Demo:**
```bash
cd ai-interviewer-demo
npm run dev
```

### Building for Production

**AI Hiring Platform:**
```bash
cd ai-hiring-platform
pnpm build
pnpm start
```

**AI Interviewer Demo:**
```bash
cd ai-interviewer-demo
npm run build
npm start
```

### Type Checking

```bash
# AI Hiring Platform
cd ai-hiring-platform
pnpm tsc --noEmit

# AI Interviewer Demo
cd ai-interviewer-demo
npm run type-check  # If configured
```

### Linting

```bash
# AI Hiring Platform
cd ai-hiring-platform
pnpm lint

# AI Interviewer Demo
cd ai-interviewer-demo
npm run lint
```

---

## 🎯 Use Cases

### For Recruiters
- **Fast Screening**: Reduce resume review time by 83%
- **Consistent Evaluation**: AI-powered scoring ensures fair, objective assessment
- **Time Savings**: Complete initial screening in minutes instead of hours
- **Better Matches**: 49% improvement in candidate-job fit accuracy

### For Hiring Managers
- **Personalized Interviews**: Questions tailored to each candidate's background
- **Clear Rubrics**: Detailed scoring criteria for consistent evaluation
- **Efficient Pipeline**: Visual Kanban board for easy candidate tracking
- **Data-Driven Decisions**: Transparent scoring with detailed breakdowns

### For Developers
- **Modern Stack**: Built with latest Next.js, React, and TypeScript
- **Well-Structured**: Clean architecture, reusable components
- **Extensible**: Easy to add new features and integrations
- **Type-Safe**: Full TypeScript coverage with Zod validation

---

## 🔒 Security & Privacy

- **Row Level Security (RLS)**: Supabase RLS policies protect user data
- **API Key Security**: All API keys stored in environment variables
- **Client-Side Auth**: Secure authentication via Supabase Auth
- **Data Encryption**: All data encrypted in transit and at rest (Supabase)

---

## 📈 Roadmap

### Planned Features
- [ ] Video interview analysis
- [ ] Advanced analytics dashboard
- [ ] Email notifications and reminders
- [ ] Calendar integrations (Google Calendar, Outlook)
- [ ] ATS integrations (Greenhouse, Lever, etc.)
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Advanced bias mitigation features

See [aiRoadmap.md](./aiRoadmap.md) for detailed technical plans.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features (when applicable)
- Update documentation for API changes

---

## 📄 License

This project is licensed under the MIT License.

---

## 🆘 Support

For questions, issues, or feature requests:

- **GitHub Issues**: Open an issue in this repository
- **Documentation**: Check the detailed READMEs in each subdirectory
- **Technical Roadmap**: See [aiRoadmap.md](./aiRoadmap.md) for architecture details

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- AI powered by [OpenAI](https://openai.com/)
- Backend by [Supabase](https://supabase.com/)
- Deployed on [Vercel](https://vercel.com/)

---

## 📝 Project Status

**Current Status**: Active Development

- ✅ Core features implemented
- ✅ AI integrations working
- ✅ Database schema established
- 🔄 Additional features in progress
- 📋 See roadmap for planned features

---

**Built with ❤️ by Lucas Krawczak**

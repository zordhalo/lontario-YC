# AI Interview Question Generator

Generate personalized, AI-powered interview questions from job descriptions and candidate profiles.

## Features

- **Personalized Questions**: Questions reference candidate's actual projects, skills, and experience
- **Detailed Scoring Rubrics**: 3-tier evaluation (Excellent/Good/Needs Work) for each question
- **Smart Profile Fetching**: Auto-fetch profiles from GitHub or LinkedIn
- **Follow-Up Generation**: Generate intelligent follow-up questions based on candidate answers
- **Beautiful UI**: Modern, responsive design with dark mode support
- **Fast**: Results in under 5 seconds

## Demo

![AI Interview Generator](./demo-screenshot.png)

## Tech Stack

- **Framework**: Next.js 15 + TypeScript
- **AI**: OpenAI GPT-4o with Structured Outputs
- **Styling**: Tailwind CSS + shadcn/ui
- **APIs**: GitHub REST API, Proxycurl (LinkedIn)
- **Validation**: Zod schemas

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ai-interviewer-demo.git
cd ai-interviewer-demo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file:

```env
# Required - OpenAI API Key
OPENAI_API_KEY=sk-proj-...

# Optional - GitHub token (increases rate limit from 60 to 5000 requests/hour)
GITHUB_TOKEN=ghp_...

# Optional - LinkedIn API via Proxycurl (~$0.03 per profile)
PROXYCURL_API_KEY=...
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Enter Job Details**
   - Job title and experience level
   - Full job description
   - Required and nice-to-have skills

2. **Add Candidate Profile**
   - Paste GitHub or LinkedIn URL for auto-fetch
   - Or enter details manually

3. **Generate Questions**
   - Get 8-10 personalized interview questions
   - Questions are categorized: Technical, Behavioral, System Design, Problem Solving
   - Each question includes detailed scoring rubrics

4. **Generate Follow-Ups** (Bonus)
   - Enter candidate's answer to any question
   - Get intelligent follow-up questions

## Project Structure

```
ai-interviewer-demo/
├── app/
│   ├── api/
│   │   ├── generate-questions/route.ts  # Main question generation
│   │   ├── scrape-profile/route.ts      # GitHub/LinkedIn fetcher
│   │   └── follow-up/route.ts           # Follow-up generator
│   ├── layout.tsx
│   ├── page.tsx                         # Main app with step flow
│   └── globals.css
├── components/
│   ├── ui/                              # shadcn/ui components
│   ├── JobDescriptionInput.tsx
│   ├── ProfileInput.tsx
│   ├── QuestionDisplay.tsx
│   ├── ScoringRubric.tsx
│   └── FollowUpGenerator.tsx
├── lib/
│   ├── types.ts                         # TypeScript interfaces + Zod schemas
│   ├── openai.ts                        # OpenAI integration
│   ├── github.ts                        # GitHub API
│   ├── linkedin.ts                      # LinkedIn/Proxycurl API
│   └── utils.ts                         # Utility functions
└── ...
```

## API Costs

| Service | Cost | Notes |
|---------|------|-------|
| OpenAI GPT-4o | ~$0.10-0.30 per question set | Depends on profile complexity |
| GitHub API | Free | 60 req/hr (5000 with token) |
| Proxycurl (LinkedIn) | ~$0.03 per profile | Optional |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | OpenAI API key for GPT-4o |
| `GITHUB_TOKEN` | No | GitHub PAT for higher rate limits |
| `PROXYCURL_API_KEY` | No | Proxycurl API key for LinkedIn |

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Add environment variables in the Vercel dashboard under Project Settings > Environment Variables.

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Lint code
npm run lint
```

## Key Features Explained

### Personalized Questions

Questions are generated based on:
- Specific projects from the candidate's GitHub/LinkedIn
- Skills match between job requirements and candidate profile
- Experience level appropriate difficulty
- Role-specific scenarios

### Scoring Rubrics

Each question includes:
- Multiple evaluation aspects (e.g., Code Quality, Communication)
- Weighted importance (1-5 scale)
- Concrete examples for each tier:
  - **Excellent**: What a top candidate would say
  - **Good**: Acceptable response characteristics
  - **Needs Work**: Red flags to watch for

### Question Distribution

- **60% Technical**: Coding, algorithms, system design
- **40% Behavioral**: Leadership, teamwork, communication
- **Difficulty Ladder**: 2-3 Easy → 4-5 Medium → 2-3 Hard

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "OpenAI API key not configured" | Add `OPENAI_API_KEY` to `.env.local` |
| "GitHub rate limit exceeded" | Add `GITHUB_TOKEN` to `.env.local` |
| "LinkedIn API not configured" | Add `PROXYCURL_API_KEY` or use manual input |
| Questions too generic | Ensure candidate profile has enough detail |

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

Built with Next.js, OpenAI, and Tailwind CSS

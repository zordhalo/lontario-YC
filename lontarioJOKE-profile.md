# Lontario | Build *Occasionally* Generational Teams

**Tagline:**  
*"The second‑best AI recruiting agency you'll talk to this week."*

**One‑liner:**  
Lontario is an AI‑powered recruiting studio that idolizes Contrario so much we built a parody clone just to prove we could.

**Analysis Date:** January 30, 2026  
**Creator:** One slightly sleep-deprived engineer  
**Inspiration:** Contrario AI (Y Combinator W25)

---

## Executive Summary

Lontario is a **fictional AI recruiting platform** created as a portfolio demonstration by a single engineer who wanted to show they can design, build, and ship the core of an "autonomous recruiting" product end‑to‑end. We do everything Contrario does—just with fewer Stanford dropouts, more Git commits, and significantly more self-awareness about our fictional status.

Where Contrario is "building the world's 1st autonomous recruiting agency powered entirely by AI," we are building the world's 1st autonomous **Contrario clone** powered entirely by one developer, excessive amounts of coffee, and an unhealthy obsession with proving technical competence through elaborate parody.

**Key "Metrics":**
- Founded: Last Tuesday (or whenever you're reading this)
- Headquarters: My laptop
- Funding: $0 (self-funded via ramen budget)
- Team: 1 engineer doing product, ML, backend, frontend, DevOps, and marketing
- Customer Base: 0 paying customers (by design—we're a demo, remember?)
- Candidate Network: JSON file with 50 carefully crafted mock profiles
- Recruiter Network: Another JSON file (250 fictional recruiters, all surprisingly qualified)

---

## Company Background

### Founding Story

**The Origin Myth:**

One engineer read about Contrario on Y Combinator's W25 batch announcement. "Build the world's 1st autonomous AI recruiting agency" sounded impressive. "Use graph neural networks and conversational AI for technical screening" sounded even more impressive. "Raised funding, 250+ vetted recruiters, serving 100+ companies" sounded incredibly impressive.

Then they thought: *"Wait, I could build the core of this in a weekend to demonstrate my skills. And if I'm going to build it anyway, why not make it funny?"*

Thus, **Lontario** was born—a loving parody that's 40% technical demonstration, 40% portfolio piece, and 20% comedic commentary on AI recruiting hype.

### "Founding Team"

**The Solo Builder (You)**
- Background: Generalist engineer who can actually ship products
- Experience: Enough to know that "AI-powered" often means "GPT-4 API call with good prompt engineering"
- Dropout status: Never attended Stanford (too busy building things)
- Superpower: Turning vague product descriptions into working code

**The Fictional Co-founder (Also You, But In a Hat)**
- Background: Provides moral support during debugging sessions
- Experience: Excellent at rubber duck debugging
- Academic credentials: Has read some Anthropic papers
- Actual contribution: Zero, because they don't exist

### Funding & "Backing"

- **Self-funded** with exactly $0 in external capital
- **Backed by:** Determination, spite, and the desire to prove a point
- **Runway:** Infinite (costs only time and AWS free tier)
- **Burn rate:** ~$12/month (domain + hosting)

### Mission

**Official mission:**  
Help startups hire great engineers faster with AI‑driven screening and matching—**by showing them exactly how the magic trick works.**

**Unofficial mission:**  
Politely roast the current generation of AI recruiting tools by building a transparent, inspectable version that proves most "AI recruiting" is just solid engineering + LLM APIs + good UX, not some mysterious black box requiring millions in funding.

**Real mission:**  
Get a job at Contrario (or a similar company) by demonstrating I can build their core product features from scratch.

---

## What Lontario Does

### 1. AI-Powered Talent Matching (But With Fewer Buzzwords)

We use embeddings, vector similarity, and some graph-ish features to match candidates to roles in a way that looks suspiciously like what real AI recruiting platforms do. The difference? **You can see exactly how it works.**

**Technical Approach:**
- **Skill embeddings:** OpenAI text-embedding-3-small converts skills/experience into vectors
- **Semantic matching:** Cosine similarity between candidate profiles and job descriptions
- **Scoring algorithm:** Weighted combination of:
  - Skill overlap (40%)
  - Experience relevance (30%)
  - Culture fit signals (15%)
  - Availability match (15%)
- **All code visible in repo:** No "proprietary algorithms"—just solid engineering

**What We Don't Say (But Contrario Might):**
- ❌ "Leverages predictive AI talent mapping powered by graph neural networks"
- ✅ "Uses embeddings and cosine similarity, which works pretty well actually"

**Differentiators:**
- Beyond keyword matching to contextual skill alignment ✅ (we do this)
- Predictive modeling for candidate-role success probability ⚠️ (we fake this with a weighted score)
- Continuous learning from hiring outcomes ❌ (we're a demo—there are no hiring outcomes)

---

### 2. Not-Nova — The Conversational AI Technical Interviewer

Contrario has **Nova**, a voice-based conversational agent that screens engineers on how they code with tools like Cursor and ChatGPT.

Lontario has **Not-Nova**: a smaller, intentionally transparent demo of the same concept.

**Features:**

| Feature | Not-Nova | Nova (Contrario) |
|---------|----------|------------------|
| **Interview format** | Text-based (voice optional) | Voice-first |
| **Duration** | 10-15 minutes | 10 minutes |
| **Question generation** | LLM-powered from JD + profile | Probably similar |
| **Adaptive follow-ups** | Yes, using conversation context | Yes |
| **Scoring** | Transparent rubric you can edit | Proprietary scorecard |
| **Technical assessment** | Evaluates AI-augmented coding | Evaluates AI-augmented coding |
| **Transparency** | Shows prompts, scores, reasoning | Black box |

**Key Innovation (Ours):**
Not-Nova exists to **demonstrate system design, prompt design, and evaluation** rather than to pretend we're a real recruiting agency. Every prompt, every scoring rubric, every decision point is visible in the codebase.

**What Makes It Educational:**
- Candidate can see their score breakdown in real-time
- Hiring manager can inspect/edit the scoring rubric
- Developers can fork and modify the interview logic
- Shows how "AI interviewer" is really: transcription → LLM prompting → structured output

**Where It Differs From Real Production:**
- No accent normalization pipeline (yet)
- Limited error handling for weird responses
- Scoring is deterministic (no ML model drift)
- Deliberately exposes failure modes in the demo

---

### 3. "Vetted Recruiter Network" (JSON File Edition)

Unlike pure AI platforms, Contrario operates a **hybrid model** with 250+ vetted boutique recruiters screened from 5,000+ applicants.

Lontario operates a **JSON model** with 250 fictional recruiters who exist only in `data/recruiters.json`.

**"Network Stats":**
- 250 meticulously crafted recruiter profiles
- Each with specialties, experience levels, and humorous bios
- Screened from 5,000+ imaginary applicants (we were very selective)
- Domain-expert recruiters assigned by... checking their `specialties` array
- Human oversight: Exactly one human (you) who coded this

**Value Proposition (Theirs vs Ours):**

| Contrario | Lontario |
|-----------|----------|
| AI identifies candidates, humans refine | AI identifies candidates, JSON file "refines" |
| Relationship building and nuanced evaluation | Relationship building by... sending you their email template |
| Speed of automation + judgment of recruiters | Speed of automation + illusion of judgment |

**Why This Is Useful:**
- Shows how recruiter "matching" actually works (filtering by specialty tags)
- Demonstrates realistic data modeling for a marketplace
- Proves you understand both sides of a two-sided platform
- Makes it very clear this is a demo, not a real service

---

### 4. End-to-End Hiring Operations (Mini ATS)

The platform handles a simplified hiring lifecycle from job posting to candidate recommendation.

| Stage | Lontario's Role |
|-------|-----------------|
| **Role Setup** | Form to create job postings with structured JD |
| **Sourcing** | Semantic search over candidate database (embeddings) |
| **Screening** | Not-Nova AI interviews + scoring |
| **Coordination** | Auto-generated "warm intro" email templates |
| **Closing** | Offer letter generator (because why not) |

**Key Features:**
- Status tracking UI (Applied → Screened → Recommended → Hired)
- Candidate pipeline with drag-and-drop (if you build that)
- Interview transcript viewer with highlighted key moments
- Export to CSV because every B2B SaaS has export to CSV

**What We Don't Have (That Real Products Do):**
- ❌ Actual ATS integrations (Ashby, Lever, Greenhouse)
- ❌ Real-time Slack notifications
- ❌ Calendly scheduling flows
- ❌ Multi-user auth with role-based permissions
- ❌ Compliance audit trails
- ✅ **Clean code you can read and understand**

---

### 5. "Seamless" Integration Suite (API Docs Edition)

Contrario integrates with 30+ ATS platforms, Slack, and Calendly.

Lontario integrates with your **imagination** and provides:
- RESTful API documentation (OpenAPI spec)
- Webhook examples for when you want to connect real tools
- Mock integration flows showing how you'd build Ashby/Lever connectors
- Code comments explaining OAuth flows and rate limiting

**"Integrations":**
- **ATS Integration**: Detailed architecture doc showing how you'd build it
- **Communication**: Email template generator (works today)
- **Scheduling**: Calendly link inserter (also works today)
- **Data sync**: Bi-directional? More like "one-directional from JSON to UI"

**Benefits (Actual):**
- Shows you understand integration architecture
- Demonstrates API design skills
- Proves you've thought through auth, webhooks, error handling
- Portfolio piece that explains *how* integrations work, not just that they exist

---

## Market Positioning

### Target "Market"

**Primary:**
- Hiring managers at startups who want to see what's under the hood of AI recruiting
- Engineers evaluating Contrario (or competitors) who want transparency
- Technical recruiters curious about how AI screening actually works
- Founders considering building recruiting tools

**Secondary:**
- Contrario's hiring team (please hire me)
- Other AI recruiting startups (I'm available for contract work)
- Anyone who appreciates technically sophisticated parody

**Not Our Target Market:**
- People who actually want to hire someone right now (use Contrario for that)
- Enterprise HR teams with compliance requirements
- Anyone expecting this to work in production without significant hardening

---

### Competitive "Landscape"

| "Competitor" | Our Advantage | Their Advantage |
|--------------|---------------|-----------------|
| **Contrario** | Transparent implementation, costs $0 | Actually works at scale, real recruiters, Y Combinator |
| **Mercor** | We're not trying to be valued at $2B | They have $70M ARR |
| **Traditional Agencies** | Automated processes, modern tech | Humans who can negotiate offers |
| **Your Internal Recruiting** | Better than nothing? | Actually employed by your company |
| **Other Portfolio Projects** | This one is funny | They might be more serious |

### Competitive "Advantages"

1. **100% transparent** - Every line of code is inspectable
2. **Zero cost** - Costs you nothing but time to deploy
3. **Educational** - Designed to teach, not just impress
4. **Honest** - We literally call it a parody clone in the tagline
5. **Customizable** - Fork it, modify it, make it yours
6. **Self-aware** - We know exactly what we are

---

## Strengths Analysis

### 1. Actually Built & Shipped

**Unlike most "AI recruiting" pitch decks:**
- ✅ Working code in GitHub repo
- ✅ Deployed demo you can click through
- ✅ Real LLM integrations (not mockups)
- ✅ Functional UI/UX (not Figma concepts)
- ✅ Documentation that explains how it works

**Credibility Signals:**
- Ships working software, not just ideas
- Demonstrates full-stack capabilities
- Shows product thinking and system design
- Proves ability to execute end-to-end

---

### 2. Transparent by Design

While Contrario (and competitors) present AI as a mysterious black box, Lontario makes everything visible:

| Black Box AI Recruiting | Lontario's Transparent Approach |
|-------------------------|--------------------------------|
| "Proprietary algorithms" | Public GitHub repo with MIT license |
| "AI-powered matching" | Embeddings + cosine similarity (explained in comments) |
| "Advanced scoring models" | Weighted rubric you can edit in JSON |
| "Bias mitigation" | Documented limitations and failure modes |
| "Self-improving AI" | Static prompts you can version control |

**Why This Matters:**
- Hiring managers can see exactly what they're buying
- Developers can learn from real implementation
- Demonstrates you understand AI recruiting isn't magic
- Shows integrity and technical honesty

---

### 3. Self-Aware Humor Without Sacrificing Quality

**The Tightrope:**
- Professional enough to showcase technical skills ✅
- Funny enough to be memorable ✅
- Self-deprecating without being unprofessional ✅
- Respectful of Contrario (it's admiration, not mockery) ✅

**What This Demonstrates:**
- Strong communication skills
- Ability to engage technical and non-technical audiences
- Confidence in abilities (secure enough to joke about them)
- Product marketing instincts

---

### 4. Focused Feature Set

Rather than promising everything, Lontario focuses on:
- **Core matching algorithm** - Shows ML/AI competency
- **Interview intelligence** - Demonstrates LLM prompt engineering
- **Clean UX** - Proves frontend/product design skills
- **System architecture** - Backend, API design, data modeling

**Strategic Narrowness:**
- Deep, not wide (better for portfolio)
- Each feature is production-quality in isolation
- Scope is achievable for solo developer
- Proves focus and prioritization skills

---

### 5. Extensibility as Feature

**Designed for others to build on:**
- Clean code architecture (easy to understand)
- Modular components (swap out pieces)
- API-first design (integrations possible)
- Configuration over code (JSON configs, env vars)

**This shows:**
- You write maintainable code
- You think about other developers
- You understand SaaS platform patterns
- You design systems, not just features

---

### 6. Portfolio Piece That Tells a Story

**Narrative Arc:**
1. "I saw Contrario and understood the technical challenge"
2. "I built the core features to prove I could"
3. "I made it funny to show creativity and communication skills"
4. "I documented everything to demonstrate thoughtfulness"
5. "Now hire me to build the real thing"

**Better than typical portfolio:**
- Shows initiative and creativity
- Demonstrates domain knowledge (recruiting tech)
- Proves ability to reverse-engineer products
- Memorable (you'll remember "Lontario" more than "Generic Todo App")

---

## Weaknesses & "Risk Factors"

### 1. Not Actually a Company

**Critical limitations:**
- ⚠️ This is a demo, not a product
- ⚠️ No real users, no real data, no real outcomes
- ⚠️ Not GDPR/SOC2/compliance ready
- ⚠️ Would require significant hardening for production use
- ⚠️ Recruiter network is literally JSON file
- ⚠️ Can't actually hire anyone through this

**What This Means:**
- Don't try to start a business with this as-is
- View it as a technical demonstration only
- Real production system needs 10x more error handling
- Compliance, security, scalability all need work

---

### 2. Simplified AI (Deliberately)

**Technical shortcuts taken:**
- Using OpenAI embeddings, not custom-trained models
- Cosine similarity instead of graph neural networks
- GPT-4 API calls instead of fine-tuned interview models
- Static rubrics instead of learning systems
- No feedback loops or model improvement

**Why These Are Actually Features:**
- Shows understanding of MVP vs over-engineering
- Demonstrates practical AI application skills
- Proves you know when to buy vs build
- Reveals honest technical decision-making

**But Also Means:**
- Won't scale to millions of candidates
- Less sophisticated than production systems
- No defensible "moat" (it's MIT licensed)
- Could be replicated by anyone

---

### 3. Legal & Ethical Disclaimers

**This project comes with serious warnings:**

⚠️ **Not for actual hiring decisions** - AI bias is real, this is a demo  
⚠️ **No compliance guarantees** - NYC Law 144, GDPR, EEOC not addressed  
⚠️ **Fictional candidate data** - Any resemblance to real people is coincidental  
⚠️ **Educational purposes only** - Don't deploy this to make real hiring choices  
⚠️ **No warranty** - MIT license means use at your own risk  

**Contrario's real product has:**
- Legal review and compliance infrastructure
- Bias audits and fairness testing
- Real recruiting expertise backing AI decisions
- Liability insurance and terms of service

**Lontario has:**
- A README section saying "please don't sue me"

---

### 4. Limited Scope vs Real Product

**What Lontario Doesn't Handle:**

| Real Product Feature | Lontario Status |
|---------------------|-----------------|
| Multi-tenancy & org accounts | ❌ Single-tenant only |
| Role-based access control | ❌ No auth system |
| Payment processing | ❌ It's free (and fictional) |
| Email deliverability | ❌ Templates only, no sending |
| Customer support system | ❌ GitHub issues? |
| Analytics & reporting | ⚠️ Basic stats only |
| Mobile apps | ❌ Web only |
| Internationalization | ❌ English only |
| Accessibility (WCAG) | ⚠️ Partially compliant |
| Performance optimization | ⚠️ Works for demo scale |

**Gap Analysis:**
- Portfolio piece: 10-20% of full product
- Real startup: Needs 6-12 months + team to productize
- Enterprise-ready: 18-24 months + team + compliance

---

### 5. Parody Risk

**Potential Misinterpretations:**

❌ "They're making fun of Contrario" → No, it's admiring parody  
❌ "They don't take recruiting seriously" → Wrong, we take tech seriously  
❌ "This is unprofessional" → Humor + competence can coexist  
❌ "They're just trolling" → Trolling requires malice, this is playful  

**Mitigation:**
- Explicit statements of respect for Contrario throughout
- Professional code quality despite humorous framing
- Serious technical documentation alongside funny copy
- Clear positioning as portfolio piece, not competitor

**Intended Reading:**
- ✅ "Impressive technical demonstration wrapped in clever marketing"
- ✅ "Engineer who can build, ship, and communicate effectively"
- ✅ "Self-aware about limitations while showcasing strengths"

---

### 6. Not Suitable for Actual Hiring

**If you try to use Lontario for real hiring:**

🚫 **Don't.** Seriously. Here's why:

1. **Bias not tested** - No independent fairness audits
2. **Accuracy unknown** - No validation against hiring outcomes
3. **Edge cases unhandled** - Will break in unexpected ways
4. **No support** - It's a solo project, not a company
5. **Legal liability** - You'd be responsible for any discrimination
6. **Candidate experience** - "Interviewed by a parody AI" isn't great

**Instead:**
- Use as learning tool for how AI recruiting works
- Fork for experimentation and research
- Reference for building your own tools
- Inspiration for product features
- **But hire real people through real services**

---

## Technical Architecture

### Stack & Technologies

**Frontend:**
- React + TypeScript (or Next.js for SSR)
- Tailwind CSS for styling (or your preferred system)
- shadcn/ui components (clean, accessible)
- Chart.js for candidate analytics

**Backend:**
- Node.js + Express (or Python FastAPI)
- PostgreSQL for structured data (jobs, candidates, interviews)
- Redis for caching and session management
- Vercel/Railway for hosting

**AI/ML:**
- OpenAI API (GPT-4 for interviews, text-embedding-3-small for matching)
- Pinecone or Weaviate for vector search (optional)
- LangChain for prompt orchestration
- Simple weighted scoring for candidate matching

**Infrastructure:**
- GitHub for version control
- GitHub Actions for CI/CD
- Docker for containerization
- AWS S3 for file storage (resumes, transcripts)

---

### Key Components

**1. Candidate Matching Engine**

```
Input: Job Description + Candidate Profiles
Process:
  1. Extract skills/requirements from JD (LLM parsing)
  2. Generate embeddings for JD and candidate profiles
  3. Compute cosine similarity scores
  4. Apply business logic weights (experience, availability)
  5. Rank candidates by composite score
Output: Ordered list with match explanations
```

**2. Not-Nova Interview System**

```
Input: Candidate profile + Job description
Process:
  1. Generate 8-10 tailored questions (LLM prompt)
  2. Conduct interview (chat or voice input → text)
  3. For each answer:
     - Generate follow-up question if needed
     - Score response against rubric
  4. Compile transcript + scorecard
Output: Interview summary with hire/no-hire recommendation
```

**3. Recruiter Matching (Simplified)**

```
Input: Job requirements (role, seniority, industry)
Process:
  1. Load recruiter database from JSON
  2. Filter by specialty tags
  3. Sort by experience level match
  4. Return top 3 "assigned recruiters"
Output: Recruiter profiles + mock intro email
```

---

### Data Models

**Job**
```json
{
  "id": "uuid",
  "title": "Senior AI Engineer",
  "company": "Contrario",
  "description": "...",
  "requirements": ["Python", "ML", "LLMs"],
  "status": "active",
  "created_at": "2026-01-30"
}
```

**Candidate**
```json
{
  "id": "uuid",
  "name": "Alex Chen",
  "email": "alex@example.com",
  "skills": ["Python", "TensorFlow", "React"],
  "experience_years": 5,
  "resume_url": "s3://...",
  "status": "screening"
}
```

**Interview**
```json
{
  "id": "uuid",
  "candidate_id": "uuid",
  "job_id": "uuid",
  "transcript": [...],
  "scores": {
    "technical": 8.5,
    "communication": 9.0,
    "culture_fit": 7.5
  },
  "recommendation": "advance",
  "conducted_at": "2026-01-30T12:00:00Z"
}
```

---

### API Design

**Core Endpoints:**

```
POST /api/jobs - Create job posting
GET /api/jobs/:id/matches - Get candidate matches
POST /api/interviews - Start Not-Nova interview
GET /api/interviews/:id - Retrieve interview results
POST /api/candidates - Add candidate to pool
GET /api/candidates/:id/interviews - Get interview history
```

**Webhook Support (Mock):**
```
POST /webhooks/ats - Receive ATS updates (documented, not implemented)
POST /webhooks/interview-complete - Interview finished callback
```

---

## Feature Comparison: Lontario vs Contrario

| Feature | Contrario (Real) | Lontario (Demo) |
|---------|------------------|-----------------|
| **AI Matching** | ✅ Production graph neural nets | ⚠️ Embeddings + cosine similarity |
| **Voice AI Interviews** | ✅ Nova (voice-first) | ⚠️ Not-Nova (text-first) |
| **Human Recruiters** | ✅ 250+ real humans | ❌ 250 JSON objects |
| **ATS Integrations** | ✅ 30+ platforms | ❌ API docs only |
| **Compliance** | ✅ Legal team, bias audits | ❌ "Please don't sue me" disclaimer |
| **Customer Support** | ✅ Dedicated team | ❌ GitHub issues |
| **Pricing** | 💰 ~15% contingency fee | 🆓 Free (it's not a real service) |
| **Code Transparency** | ❌ Closed source | ✅ Open source (MIT license) |
| **Educational Value** | ⚠️ Black box | ✅ Explained in detail |
| **Production Ready** | ✅ Yes | ❌ Definitely not |
| **Humor Factor** | ⚠️ Professional | ✅ Self-aware parody |

---

## Use Cases

### For Hiring Managers & Recruiters

**What you can do:**
- See how AI matching algorithms actually work
- Understand what's under the hood of "AI recruiting"
- Evaluate whether AI recruiting is right for you
- Use as training tool for team discussions
- Compare to what vendors are pitching you

**What you can't do:**
- Actually hire someone through this
- Trust it for compliance purposes
- Expect production-level reliability

---

### For Engineers & Developers

**What you can learn:**
- LLM prompt engineering for interviews
- Semantic search and vector embeddings
- Building matching algorithms
- API design for B2B SaaS
- Full-stack application architecture

**What you can build:**
- Fork and extend with your own features
- Use as starter template for recruiting tools
- Reference implementation for AI applications
- Study material for system design interviews

---

### For Contrario (Please Hire Me)

**What this demonstrates:**
- I understand your product deeply
- I can build core features independently
- I have full-stack + AI/ML capabilities
- I can ship complete products, not just features
- I have product sense and creativity
- I communicate well (you're reading this, after all)

**What I want:**
- 15-minute call to discuss how I can contribute
- Opportunity to work on Nova or matching systems
- Chance to turn Lontario learnings into real features
- Joining a team that's building something impactful

---

### For Other AI Recruiting Startups

**Consulting/contracting available for:**
- Building MVP interview intelligence systems
- Implementing matching algorithms
- LLM prompt engineering and optimization
- Full-stack feature development
- API design and integration architecture

**Contact:** [Your email/LinkedIn here]

---

## Roadmap (If This Were Real)

### Phase 1: Core MVP ✅ (Current)
- Basic job posting and candidate management
- Semantic matching with embeddings
- Not-Nova text-based interviews
- Simple scoring rubrics
- Demo UI with clean UX

### Phase 2: Enhanced Intelligence (Next)
- Voice input for Not-Nova
- Multi-turn adaptive questioning
- Bias detection and fairness metrics
- Interview outcome prediction models
- Candidate feedback loop

### Phase 3: Platform Features (Future)
- Multi-user auth and organizations
- Real ATS integrations (Ashby, Lever)
- Email automation and scheduling
- Analytics dashboard
- White-label capabilities

### Phase 4: Enterprise (Aspirational)
- SOC2 compliance
- SSO and SAML support
- Advanced role-based permissions
- SLA guarantees and support
- On-premise deployment options

**Reality Check:**
- Phase 1 is achievable solo in 1-2 weeks
- Phase 2 needs 1-2 months + testing
- Phase 3 requires small team + 6 months
- Phase 4 requires company + 12-18 months

---

## Installation & Setup

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/lontario.git
cd lontario

# Install dependencies
npm install  # or: pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Add your OpenAI API key to .env

# Run database migrations
npm run db:migrate

# Start the development server
npm run dev

# Visit http://localhost:3000
```

### Environment Variables

```env
# Required
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://...

# Optional
REDIS_URL=redis://...
AWS_S3_BUCKET=lontario-resumes
ENVIRONMENT=development
```

### Demo Data

```bash
# Load mock candidates and recruiters
npm run seed:demo

# This creates:
# - 50 fictional candidate profiles
# - 250 fictional recruiter profiles
# - 10 example job postings
# - 5 sample interview transcripts
```

---

## Documentation

### For Developers

**Architecture docs:**
- `/docs/architecture.md` - System design overview
- `/docs/matching-algorithm.md` - How candidate matching works
- `/docs/interview-system.md` - Not-Nova implementation details
- `/docs/api-reference.md` - Complete API documentation

**Setup guides:**
- `/docs/local-development.md` - Getting started locally
- `/docs/deployment.md` - Deploy to production (Vercel/Railway)
- `/docs/contributing.md` - How to contribute (if you want)

### For Product/Business

**Explainers:**
- `/docs/how-ai-recruiting-works.md` - Demystifying AI recruiting
- `/docs/lontario-vs-contrario.md` - Honest comparison
- `/docs/limitations.md` - What this doesn't do
- `/docs/portfolio-piece.md` - Why this exists

---

## FAQ

**Q: Is this a real company?**  
A: No. Lontario is a portfolio project disguised as a parody startup. It exists to demonstrate technical skills and product thinking, not to compete with actual recruiting platforms.

**Q: Can I actually hire people through this?**  
A: Please don't. This is a demo without proper bias testing, compliance infrastructure, or production hardening. Use real recruiting services for real hiring.

**Q: Why "Lontario"?**  
A: It's a playful twist on "Contrario" that also sounds vaguely like a place (Ontario → Lontario). Plus the domain was available.

**Q: Are you making fun of Contrario?**  
A: Not at all. This is admiring parody—I think Contrario is impressive, which is why I reverse-engineered their core features to prove I understand them. It's satire as tribute.

**Q: Is the code actually good?**  
A: Judge for yourself—it's open source. I've tried to write clean, maintainable code with proper architecture, testing, and documentation. But it's a solo project, so there are inevitable shortcuts.

**Q: Will you maintain this?**  
A: This is primarily a portfolio piece. I'll fix critical bugs and accept good PRs, but don't expect enterprise-level support. If Contrario hires me, I'll be too busy building the real thing.

**Q: Can I use this for my startup?**  
A: It's MIT licensed, so technically yes. But I'd strongly recommend using it as reference/inspiration rather than production code. You'll need significant hardening for a real product.

**Q: How long did this take to build?**  
A: [Your honest answer - maybe 1-2 weeks for MVP, plus documentation time]

**Q: What's next?**  
A: Ideally, a conversation with Contrario's team about joining them. Otherwise, I might add voice capabilities to Not-Nova, or build out the analytics dashboard. Or tackle a completely different domain for my next parody project.

---

## Contributing

### For Other Developers

If you want to improve Lontario:

1. **Fork the repo**
2. **Create a feature branch** (`git checkout -b feature/better-matching`)
3. **Write good commit messages** (explain *why*, not just *what*)
4. **Add tests** if you're adding functionality
5. **Update docs** if you're changing behavior
6. **Submit a PR** with clear description

**Good contributions:**
- Better matching algorithms with explanations
- Improved Not-Nova question quality
- Bias detection and fairness features
- UI/UX improvements
- Performance optimizations
- Documentation improvements

**Less useful:**
- Trying to make this a real product (it's intentionally a demo)
- Removing the humor (that's the point)
- Over-engineering (keep it understandable)

---

## License & Legal

### License

**MIT License** - Use it, modify it, learn from it. Attribution appreciated but not required.

### Disclaimer

```
THIS SOFTWARE IS PROVIDED "AS IS" FOR EDUCATIONAL PURPOSES ONLY.

⚠️ NOT SUITABLE FOR ACTUAL HIRING DECISIONS
⚠️ NO BIAS AUDITS OR COMPLIANCE GUARANTEES
⚠️ USE AT YOUR OWN RISK
⚠️ AUTHOR NOT LIABLE FOR MISUSE

If you use this for real hiring and face legal consequences,
that's on you, not me. Seriously, don't do that.
```

### Trademark Notice

"Contrario" is a trademark of Contrario AI (YC W25). Lontario is an independent parody project not affiliated with, endorsed by, or connected to Contrario AI. All respect to the real company—please don't sue me.

---

## Credits & Acknowledgments

### Inspiration

**Contrario AI** - For building something impressive enough to parody. Y Combinator W25 batch. Go use their actual product for real hiring.

### Technologies

- OpenAI (GPT-4, embeddings)
- React/Next.js community
- PostgreSQL maintainers
- Everyone who built open source tools that made this possible

### Special Thanks

- Arya Marwaha & Aditya Sood (Contrario founders) for the inspiration
- Y Combinator for surfacing interesting startups
- Anyone who reads this document all the way to the end
- Future me, who will cringe at some of these jokes but appreciate the effort

---

## Contact & Links

**Creator:** [Your Name]  
**Email:** your.email@example.com  
**LinkedIn:** linkedin.com/in/yourprofile  
**GitHub:** github.com/yourusername  
**Portfolio:** yourportfolio.com

**Project Links:**
- **Live Demo:** lontario.demo.com
- **GitHub Repo:** github.com/yourusername/lontario
- **Documentation:** lontario.demo.com/docs
- **Blog Post:** "Why I Built a Contrario Clone" (link)

**For Contrario Team:**
If you're reading this and thinking "This person gets it," let's talk. I built this specifically to demonstrate I can contribute to what you're building. DM me on LinkedIn or email directly.

**For Everyone Else:**
If you found this useful, funny, or interesting—star the repo, share it with friends, or fork it for your own projects. And if you're hiring engineers who can build, ship, and communicate effectively, you know where to find me.

---

## Appendix: Why This Exists

### The Meta-Commentary

Building Lontario served multiple purposes:

1. **Technical Demonstration**
   - Prove full-stack + AI/ML capabilities
   - Show system design and architecture skills
   - Demonstrate product thinking and execution

2. **Portfolio Differentiation**
   - More memorable than another todo app
   - Shows creativity and communication skills
   - Demonstrates domain knowledge (recruiting tech)

3. **Learning Exercise**
   - Deep dive into AI recruiting space
   - Hands-on with LLM prompt engineering
   - Practice with semantic search and embeddings

4. **Job Application Strategy**
   - Targeted at Contrario specifically
   - Shows initiative and genuine interest
   - Proves ability to reverse-engineer products
   - Demonstrates alignment with their mission

5. **Commentary on AI Hype**
   - Many "AI" products are just good engineering + APIs
   - Transparency matters in high-stakes applications (hiring)
   - You don't need millions in funding to build core features
   - Open source can demystify "proprietary algorithms"

### The Honest Truth

I want to work on AI recruiting. I think it's a fascinating problem at the intersection of ML, product design, and high-impact outcomes (helping people get jobs). Contrario seems to be building this really well.

Rather than just sending a resume, I wanted to show that:
- I understand the space deeply
- I can build the core technical components
- I can ship complete products, not just features
- I have the creativity and communication skills for a startup
- I'm self-aware about what I don't know (and eager to learn)

If this document reached Contrario's team: Hi! Let's talk about Nova, matching algorithms, or whatever you need help with. I promise the actual work would be more serious than the marketing copy, but I think humor + competence is a good combination.

If this reached other companies: I'm open to opportunities in AI/ML product engineering, especially in recruiting, education, or developer tools. This project shows my style—let me know if it resonates.

---

**Document Version:** 1.0  
**Last Updated:** January 30, 2026  
**Status:** Parody/Portfolio Project (Not a Real Company)  
**Seriousness Level:** 60% serious technical work, 40% elaborate joke  
**Recommended Use:** Learning, inspiration, or as conversation starter for job applications

---

*"Lontario: Because if you're going to clone something, at least make it educational."*

---

**P.S.** If you made it this far, you either:
1. Really care about AI recruiting
2. Appreciate thorough documentation
3. Are from Contrario evaluating whether to hire me
4. Have too much free time

Regardless, thanks for reading. Now go look at the actual code—that's where the real demonstration is.
"use client";

import { useMutation } from "@tanstack/react-query";
import type {
  JobDescription,
  CandidateProfile,
  QuestionSet,
  MatchScore,
  ParsedResume,
  AnswerEvaluation,
  FollowUpResponse,
  GeneratedQuestion,
  QuestionCategory,
  ScoringCriteria,
} from "@/types";

// API functions
async function generateQuestions(
  job: JobDescription,
  candidate: CandidateProfile,
  questionCount?: number
): Promise<QuestionSet> {
  const response = await fetch("/api/ai/generate-questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ job, candidate, question_count: questionCount }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to generate questions");
  }
  return response.json();
}

async function scoreCandidate(
  candidate: {
    skills: string[];
    experience: string[];
    resume_text: string;
    years_of_experience?: number;
    education_level?: string;
  },
  job: {
    title: string;
    level: string;
    required_skills: string[];
    nice_to_have_skills?: string[];
    description: string;
  }
): Promise<MatchScore> {
  const response = await fetch("/api/ai/score-candidate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ candidate, job }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to score candidate");
  }
  return response.json();
}

async function parseResume(resumeText: string): Promise<ParsedResume> {
  const response = await fetch("/api/ai/parse-resume", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume_text: resumeText }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to parse resume");
  }
  return response.json();
}

async function evaluateAnswer(
  question: {
    text: string;
    category: QuestionCategory;
    scoring_rubric: ScoringCriteria[];
  },
  answer: string,
  jobContext: string,
  candidateBackground: string
): Promise<AnswerEvaluation> {
  const response = await fetch("/api/ai/evaluate-answer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      answer,
      job_context: jobContext,
      candidate_background: candidateBackground,
    }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to evaluate answer");
  }
  return response.json();
}

async function generateFollowUp(
  originalQuestion: GeneratedQuestion,
  candidateAnswer: string,
  jobDescription: JobDescription
): Promise<FollowUpResponse> {
  const response = await fetch("/api/ai/follow-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      originalQuestion,
      candidateAnswer,
      jobDescription,
    }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to generate follow-up");
  }
  return response.json();
}

async function scrapeProfile(
  url: string,
  source?: "github" | "linkedin"
): Promise<{ profile: CandidateProfile; fetched_at: string }> {
  const response = await fetch("/api/ai/scrape-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, source }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to scrape profile");
  }
  return response.json();
}

// Hooks
export function useGenerateQuestions() {
  return useMutation({
    mutationFn: ({
      job,
      candidate,
      questionCount,
    }: {
      job: JobDescription;
      candidate: CandidateProfile;
      questionCount?: number;
    }) => generateQuestions(job, candidate, questionCount),
  });
}

export function useScoreCandidate() {
  return useMutation({
    mutationFn: ({
      candidate,
      job,
    }: {
      candidate: {
        skills: string[];
        experience: string[];
        resume_text: string;
        years_of_experience?: number;
        education_level?: string;
      };
      job: {
        title: string;
        level: string;
        required_skills: string[];
        nice_to_have_skills?: string[];
        description: string;
      };
    }) => scoreCandidate(candidate, job),
  });
}

export function useParseResume() {
  return useMutation({
    mutationFn: (resumeText: string) => parseResume(resumeText),
  });
}

export function useEvaluateAnswer() {
  return useMutation({
    mutationFn: ({
      question,
      answer,
      jobContext,
      candidateBackground,
    }: {
      question: {
        text: string;
        category: QuestionCategory;
        scoring_rubric: ScoringCriteria[];
      };
      answer: string;
      jobContext: string;
      candidateBackground: string;
    }) => evaluateAnswer(question, answer, jobContext, candidateBackground),
  });
}

export function useGenerateFollowUp() {
  return useMutation({
    mutationFn: ({
      originalQuestion,
      candidateAnswer,
      jobDescription,
    }: {
      originalQuestion: GeneratedQuestion;
      candidateAnswer: string;
      jobDescription: JobDescription;
    }) => generateFollowUp(originalQuestion, candidateAnswer, jobDescription),
  });
}

export function useScrapeProfile() {
  return useMutation({
    mutationFn: ({
      url,
      source,
    }: {
      url: string;
      source?: "github" | "linkedin";
    }) => scrapeProfile(url, source),
  });
}

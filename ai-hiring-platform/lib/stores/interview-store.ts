"use client"

import { create } from "zustand"
import type {
  JobDescription,
  CandidateProfile,
  QuestionSet,
  AppStep,
} from "@/types"

interface InterviewState {
  // State
  currentStep: AppStep
  job: JobDescription | null
  candidate: CandidateProfile | null
  questions: QuestionSet | null
  isLoading: boolean
  error: string | null

  // Synchronous actions
  setCurrentStep: (step: AppStep) => void
  setJob: (job: JobDescription) => void
  setCandidate: (candidate: CandidateProfile) => void
  setQuestions: (questions: QuestionSet) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
  goBack: () => void

  // Async action for question generation
  generateQuestions: () => Promise<void>
}

const initialState = {
  currentStep: "job" as AppStep,
  job: null,
  candidate: null,
  questions: null,
  isLoading: false,
  error: null,
}

/**
 * Zustand store for managing interview generation state
 * Handles the 3-step wizard: Job Details → Candidate Profile → Questions
 */
export const useInterviewStore = create<InterviewState>((set, get) => ({
  // Initial state
  ...initialState,

  // Set current step
  setCurrentStep: (step) => set({ currentStep: step }),

  // Set job and advance to profile step
  setJob: (job) => set({ job, currentStep: "profile", error: null }),

  // Set candidate profile
  setCandidate: (candidate) => set({ candidate, error: null }),

  // Set generated questions and advance to questions step
  setQuestions: (questions) =>
    set({ questions, currentStep: "questions", isLoading: false }),

  // Set loading state
  setLoading: (loading) => set({ isLoading: loading }),

  // Set error state
  setError: (error) => set({ error, isLoading: false }),

  // Reset all state to initial values
  reset: () => set(initialState),

  // Navigate back one step
  goBack: () => {
    const { currentStep } = get()
    if (currentStep === "profile") {
      set({ currentStep: "job" })
    } else if (currentStep === "questions") {
      set({ currentStep: "profile", questions: null })
    }
  },

  // Generate questions using the API
  generateQuestions: async () => {
    const { job, candidate } = get()

    if (!job || !candidate) {
      set({ error: "Job description and candidate profile are required" })
      return
    }

    set({ isLoading: true, error: null })

    try {
      const response = await fetch("/api/ai/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job, candidate }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate questions")
      }

      const questions = await response.json()
      set({ questions, currentStep: "questions", isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      })
    }
  },
}))

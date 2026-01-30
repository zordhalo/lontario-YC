"use client";

import { useState } from "react";
import { JobDescriptionInput } from "@/components/JobDescriptionInput";
import { ProfileInput } from "@/components/ProfileInput";
import { QuestionDisplay } from "@/components/QuestionDisplay";
import { FollowUpGenerator } from "@/components/FollowUpGenerator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  User,
  FileText,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import {
  JobDescription,
  CandidateProfile,
  QuestionSet,
  AppStep,
  QuestionCategory,
  InterviewQuestion,
} from "@/lib/types";
import { cn } from "@/lib/utils";

const steps: { id: AppStep; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "job", label: "Job Details", icon: Briefcase },
  { id: "profile", label: "Candidate", icon: User },
  { id: "questions", label: "Questions", icon: FileText },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState<AppStep>("job");
  const [job, setJob] = useState<JobDescription | null>(null);
  const [candidate, setCandidate] = useState<CandidateProfile | null>(null);
  const [questions, setQuestions] = useState<QuestionSet | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJobSubmit = (jobData: JobDescription) => {
    setJob(jobData);
    setCurrentStep("profile");
    setError(null);
  };

  const handleProfileSubmit = async (profileData: CandidateProfile) => {
    if (!job) return;

    setCandidate(profileData);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job, candidate: profileData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate questions");
      }

      // Ensure groupedByCategory exists
      const groupedByCategory = data.groupedByCategory || 
        data.questions.reduce((acc: Record<QuestionCategory, InterviewQuestion[]>, q: InterviewQuestion) => {
          if (!acc[q.category]) acc[q.category] = [];
          acc[q.category].push(q);
          return acc;
        }, {} as Record<QuestionCategory, InterviewQuestion[]>);

      setQuestions({ ...data, groupedByCategory });
      setCurrentStep("questions");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate questions");
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (currentStep === "profile") {
      setCurrentStep("job");
    } else if (currentStep === "questions") {
      setCurrentStep("profile");
      setQuestions(null);
    }
    setError(null);
  };

  const startOver = () => {
    setCurrentStep("job");
    setJob(null);
    setCandidate(null);
    setQuestions(null);
    setError(null);
  };

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg">AI Interview Generator</h1>
                <p className="text-xs text-muted-foreground">
                  Personalized questions with scoring rubrics
                </p>
              </div>
            </div>
            {currentStep !== "job" && (
              <Button variant="outline" size="sm" onClick={startOver}>
                Start Over
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = index < currentStepIndex;

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full transition-colors",
                    isActive && "bg-primary text-primary-foreground",
                    isCompleted && "bg-primary/20 text-primary",
                    !isActive && !isCompleted && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium hidden sm:inline">
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-8 h-0.5 mx-2",
                      index < currentStepIndex ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Error Display */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setError(null)}
                className="text-red-700 hover:text-red-800 hover:bg-red-100"
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-card p-8 rounded-lg shadow-lg text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
              <div>
                <h3 className="font-semibold text-lg">Generating Questions</h3>
                <p className="text-sm text-muted-foreground">
                  Analyzing candidate profile and job requirements...
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary">Matching skills</Badge>
                <Badge variant="secondary">Creating rubrics</Badge>
                <Badge variant="secondary">Personalizing questions</Badge>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          {currentStep !== "job" && !isLoading && (
            <Button
              variant="ghost"
              size="sm"
              onClick={goBack}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}

          {/* Step Content */}
          {currentStep === "job" && (
            <JobDescriptionInput onSubmit={handleJobSubmit} initialData={job} />
          )}

          {currentStep === "profile" && (
            <ProfileInput onSubmit={handleProfileSubmit} isLoading={isLoading} />
          )}

          {currentStep === "questions" && questions && job && (
            <div className="space-y-8">
              <QuestionDisplay questionSet={questions} />
              <FollowUpGenerator questions={questions.questions} jobDescription={job} />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-auto py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            AI Interview Question Generator - Powered by OpenAI GPT-4o
          </p>
          <p className="mt-1">
            Generate personalized interview questions with detailed scoring rubrics
          </p>
        </div>
      </footer>
    </main>
  );
}

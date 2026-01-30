"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { InterviewQuestion, JobDescription, FollowUpResponse } from "@/lib/types";

interface FollowUpGeneratorProps {
  questions: InterviewQuestion[];
  jobDescription: JobDescription;
}

export function FollowUpGenerator({ questions, jobDescription }: FollowUpGeneratorProps) {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");
  const [candidateAnswer, setCandidateAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [followUp, setFollowUp] = useState<FollowUpResponse | null>(null);

  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId);

  const generateFollowUp = async () => {
    if (!selectedQuestion || !candidateAnswer.trim()) {
      setError("Please select a question and enter the candidate's answer");
      return;
    }

    setIsLoading(true);
    setError(null);
    setFollowUp(null);

    try {
      const response = await fetch("/api/follow-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalQuestion: selectedQuestion,
          candidateAnswer: candidateAnswer.trim(),
          jobDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate follow-up");
      }

      setFollowUp(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate follow-up");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedQuestionId("");
    setCandidateAnswer("");
    setFollowUp(null);
    setError(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Follow-Up Question Generator
        </CardTitle>
        <CardDescription>
          Enter the candidate&apos;s answer to generate an intelligent follow-up question
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Question Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Original Question</label>
          <Select value={selectedQuestionId} onValueChange={setSelectedQuestionId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a question..." />
            </SelectTrigger>
            <SelectContent>
              {questions.map((q, index) => (
                <SelectItem key={q.id} value={q.id}>
                  <span className="line-clamp-1">
                    Q{index + 1}: {q.question.slice(0, 60)}...
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selected Question Preview */}
        {selectedQuestion && (
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium mb-1">Selected Question:</p>
            <p className="text-sm text-muted-foreground">{selectedQuestion.question}</p>
          </div>
        )}

        {/* Candidate Answer Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Candidate&apos;s Answer</label>
          <Textarea
            placeholder="Enter or paste the candidate's response to the question..."
            value={candidateAnswer}
            onChange={(e) => setCandidateAnswer(e.target.value)}
            className="min-h-[120px]"
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground">
            {candidateAnswer.length} characters (minimum 10 required)
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-md">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Generate Button */}
        <Button
          onClick={generateFollowUp}
          disabled={isLoading || !selectedQuestionId || candidateAnswer.length < 10}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Follow-Up...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Follow-Up Question
            </>
          )}
        </Button>

        {/* Follow-Up Result */}
        {followUp && (
          <div className="space-y-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div>
              <h4 className="font-medium text-sm flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Follow-Up Question
              </h4>
              <p className="text-sm bg-background p-3 rounded-md border">
                {followUp.followUp}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Rationale</h4>
              <p className="text-sm text-muted-foreground">
                {followUp.rationale}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Generate Another
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

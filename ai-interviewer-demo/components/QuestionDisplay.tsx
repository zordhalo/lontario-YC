"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScoringRubric } from "./ScoringRubric";
import {
  Clock,
  Code,
  Users,
  Layout,
  Lightbulb,
  ChevronDown,
  FileText,
  User,
  Timer,
} from "lucide-react";
import { QuestionSet, QuestionCategory, InterviewQuestion } from "@/lib/types";
import { cn, formatDuration, getDifficultyColor } from "@/lib/utils";

interface QuestionDisplayProps {
  questionSet: QuestionSet;
}

const categoryConfig: Record<
  QuestionCategory,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  technical: { label: "Technical", icon: Code },
  behavioral: { label: "Behavioral", icon: Users },
  "system-design": { label: "System Design", icon: Layout },
  "problem-solving": { label: "Problem Solving", icon: Lightbulb },
};

function QuestionCard({ question, index }: { question: InterviewQuestion; index: number }) {
  const [contextOpen, setContextOpen] = useState(false);

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Q{index + 1}
              </span>
              <Badge className={cn("text-xs", getDifficultyColor(question.difficulty))}>
                {question.difficulty}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {question.estimatedTime} min
              </div>
            </div>
            <p className="font-medium leading-relaxed">{question.question}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Context Section */}
        <Collapsible open={contextOpen} onOpenChange={setContextOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 text-sm text-primary hover:underline">
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                contextOpen && "rotate-180"
              )}
            />
            Why this question?
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
              {question.context}
            </p>
          </CollapsibleContent>
        </Collapsible>

        {/* Scoring Rubric */}
        <ScoringRubric rubric={question.scoringRubric} />
      </CardContent>
    </Card>
  );
}

export function QuestionDisplay({ questionSet }: QuestionDisplayProps) {
  const categories = Object.keys(questionSet.groupedByCategory || {}) as QuestionCategory[];
  const defaultCategory = categories[0] || "technical";

  // Calculate stats
  const totalQuestions = questionSet.questions.length;
  const difficultyBreakdown = questionSet.questions.reduce(
    (acc, q) => {
      acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Candidate</p>
                <p className="font-medium text-sm">{questionSet.candidateName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Position</p>
                <p className="font-medium text-sm">{questionSet.jobTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Questions</p>
                <p className="font-medium text-sm">{totalQuestions} total</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Timer className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Est. Duration</p>
                <p className="font-medium text-sm">
                  {formatDuration(questionSet.totalEstimatedTime)}
                </p>
              </div>
            </div>
          </div>

          {/* Difficulty Breakdown */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t">
            <span className="text-sm text-muted-foreground">Difficulty:</span>
            <div className="flex gap-2">
              {difficultyBreakdown.easy && (
                <Badge className={getDifficultyColor("easy")}>
                  {difficultyBreakdown.easy} Easy
                </Badge>
              )}
              {difficultyBreakdown.medium && (
                <Badge className={getDifficultyColor("medium")}>
                  {difficultyBreakdown.medium} Medium
                </Badge>
              )}
              {difficultyBreakdown.hard && (
                <Badge className={getDifficultyColor("hard")}>
                  {difficultyBreakdown.hard} Hard
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions by Category */}
      <Tabs defaultValue={defaultCategory}>
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1">
          {categories.map((category) => {
            const config = categoryConfig[category];
            const Icon = config.icon;
            const count = questionSet.groupedByCategory?.[category]?.length || 0;

            return (
              <TabsTrigger
                key={category}
                value={category}
                className="flex items-center gap-2 data-[state=active]:bg-background"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{config.label}</span>
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                  {count}
                </Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-4">
            {questionSet.groupedByCategory?.[category]?.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                index={
                  questionSet.questions.findIndex((q) => q.id === question.id)
                }
              />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

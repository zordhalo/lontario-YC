"use client"

import { useState } from "react"
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Loader2,
  Mail,
  Trash2,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AIScoreBadge } from "@/components/ai-score-badge"
import { ScheduleDialog } from "@/components/interview"
import { useToast } from "@/hooks/use-toast"
import { useDeleteCandidate } from "@/hooks/use-candidates"
import type { Candidate } from "@/lib/mock-data"

interface CandidatePanelProps {
  candidate: Candidate
  jobId?: string
  jobTitle?: string
  onClose: () => void
  onStatusChange: (status: Candidate["status"]) => void
  onInterviewScheduled?: (interview: { id: string; scheduled_at: string; interview_link: string }) => void
}

const statusOptions: { value: Candidate["status"]; label: string }[] = [
  { value: "applied", label: "Applied" },
  { value: "screening", label: "Screening" },
  { value: "ai_interview", label: "AI Interview" },
  { value: "phone_screen", label: "Phone Screen" },
  { value: "technical", label: "Technical" },
  { value: "onsite", label: "Onsite" },
  { value: "offer", label: "Offer" },
  { value: "hired", label: "Hired" },
  { value: "rejected", label: "Rejected" },
]

export function CandidatePanel({
  candidate,
  jobId,
  jobTitle,
  onClose,
  onStatusChange,
  onInterviewScheduled,
}: CandidatePanelProps) {
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false)
  const { toast } = useToast()

  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  const handleInterviewScheduled = (interview: { id: string; scheduled_at: string; interview_link: string }) => {
    toast({
      title: "Interview Scheduled",
      description: `AI interview scheduled for ${new Date(interview.scheduled_at).toLocaleDateString()} at ${new Date(interview.scheduled_at).toLocaleTimeString()}`,
    })
    onInterviewScheduled?.(interview)
  }

  return (
    <div className="w-96 border-l border-border bg-card flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="text-lg bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-foreground">{candidate.name}</h2>
              <p className="text-sm text-muted-foreground">
                {candidate.experience} experience
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close panel</span>
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <AIScoreBadge
            score={candidate.aiScore}
            size="lg"
            showIcon
            explanation="AI match score based on skills, experience, and job requirements analysis."
          />
          <Select
            value={candidate.status}
            onValueChange={(value) =>
              onStatusChange(value as Candidate["status"])
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="summary" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-2">
          <TabsTrigger value="summary" className="flex-1">
            AI Summary
          </TabsTrigger>
          <TabsTrigger value="resume" className="flex-1">
            Resume
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex-1">
            Timeline
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="summary" className="m-0 p-4 space-y-6">
            {/* AI Match Breakdown */}
            <section>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="h-4 w-4 rounded bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xs">AI</span>
                </span>
                Match Breakdown
              </h3>
              <div className="space-y-2">
                {candidate.strengths?.map((strength, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm"
                  >
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span className="text-foreground">{strength}</span>
                  </div>
                ))}
                {candidate.concerns?.map((concern, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm"
                  >
                    <AlertCircle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                    <span className="text-foreground">{concern}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Why This Candidate */}
            {candidate.summary && (
              <section>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Why This Candidate
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {candidate.summary}
                </p>
              </section>
            )}

            {/* Skills */}
            <section>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-2.5 py-1 rounded-full bg-primary/10 text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Links */}
            <section>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Links
              </h3>
              <div className="flex flex-wrap gap-2">
                {candidate.linkedIn && (
                  <a
                    href={candidate.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md border border-border hover:bg-muted transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                )}
                {candidate.github && (
                  <a
                    href={candidate.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md border border-border hover:bg-muted transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                )}
                {candidate.portfolio && (
                  <a
                    href={candidate.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md border border-border hover:bg-muted transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                    Portfolio
                  </a>
                )}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="resume" className="m-0 p-4">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <ExternalLink className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-foreground mb-1">
                Resume Preview
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Full resume would be displayed here
              </p>
              <Button variant="outline" size="sm">
                Download Resume
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="m-0 p-4">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="w-px flex-1 bg-border" />
                </div>
                <div className="pb-4">
                  <p className="text-sm font-medium text-foreground">Applied</p>
                  <p className="text-xs text-muted-foreground">
                    {candidate.appliedAt}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <div className="w-px flex-1 bg-border" />
                </div>
                <div className="pb-4">
                  <p className="text-sm font-medium text-foreground">
                    AI Screening Complete
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Scored {candidate.aiScore}% match
                  </p>
                </div>
              </div>
              {candidate.status !== "applied" && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Moved to {candidate.status}
                    </p>
                    <p className="text-xs text-muted-foreground">By recruiter</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button 
          className="w-full"
          onClick={() => setScheduleDialogOpen(true)}
          disabled={!jobId}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Interview
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 bg-transparent">
            <Mail className="mr-2 h-4 w-4" />
            Message
          </Button>
          <Button variant="outline" className="flex-1 text-destructive hover:text-destructive bg-transparent">
            Reject
          </Button>
        </div>
      </div>

      {/* Schedule Interview Dialog */}
      {jobId && jobTitle && (
        <ScheduleDialog
          open={scheduleDialogOpen}
          onOpenChange={setScheduleDialogOpen}
          candidateId={candidate.id}
          candidateName={candidate.name}
          candidateEmail={candidate.email || ""}
          jobId={jobId}
          jobTitle={jobTitle}
          onScheduled={handleInterviewScheduled}
        />
      )}
    </div>
  )
}

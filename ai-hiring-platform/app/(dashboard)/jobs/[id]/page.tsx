"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Settings, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { KanbanBoard } from "@/components/jobs/kanban-board"
import { JobDetails } from "@/components/jobs/job-details"
import { CandidatePanel } from "@/components/jobs/candidate-panel"
import { useJob } from "@/hooks/use-jobs"
import { useCandidates, useMoveCandidate } from "@/hooks/use-candidates"
import { normalizeJob, normalizeCandidate, type Candidate, type CandidateStatus } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const statusColors = {
  active: "bg-success/10 text-success border-success/30",
  draft: "bg-warning/10 text-warning border-warning/30",
  closed: "bg-muted text-muted-foreground border-border",
  paused: "bg-warning/10 text-warning border-warning/30",
}

export default function JobDetailPage() {
  const params = useParams()
  const jobId = params.id as string

  // Fetch job and candidates from API
  const { data: jobData, isLoading: jobLoading, error: jobError } = useJob(jobId)
  const { data: candidatesData, isLoading: candidatesLoading } = useCandidates({ job_id: jobId })
  const moveCandidate = useMoveCandidate()

  // Normalize data
  const job = useMemo(() => {
    if (!jobData) return null
    return normalizeJob(jobData)
  }, [jobData])

  const candidates = useMemo(() => {
    if (!candidatesData?.candidates) return []
    return candidatesData.candidates.map(normalizeCandidate)
  }, [candidatesData?.candidates])

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  
  // Local state for optimistic updates on candidate statuses
  const [candidateStatuses, setCandidateStatuses] = useState<Record<string, CandidateStatus>>({})

  // Initialize candidate statuses when candidates load
  useEffect(() => {
    if (candidates.length > 0) {
      const initial: Record<string, CandidateStatus> = {}
      candidates.forEach((c) => {
        if (!candidateStatuses[c.id]) {
          initial[c.id] = c.status
        }
      })
      if (Object.keys(initial).length > 0) {
        setCandidateStatuses((prev) => ({ ...prev, ...initial }))
      }
    }
  }, [candidates])

  // Loading state
  if (jobLoading) {
    return (
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <header className="border-b border-border bg-card px-4 py-4">
          <div className="container max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  // Error or not found state
  if (jobError || !job) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Job not found
          </h1>
          <p className="text-muted-foreground mb-4">
            {jobError?.message || "The job you're looking for doesn't exist."}
          </p>
          <Link href="/jobs">
            <Button>Back to Jobs</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleStatusChange = async (
    candidateId: string,
    newStatus: CandidateStatus
  ) => {
    // Optimistic update
    setCandidateStatuses((prev) => ({
      ...prev,
      [candidateId]: newStatus,
    }))

    // Call API to persist the change
    try {
      await moveCandidate.mutateAsync({
        candidateId,
        stage: newStatus as "applied" | "screening" | "ai_interview" | "phone_screen" | "technical" | "onsite" | "offer" | "hired" | "rejected",
      })
    } catch (error) {
      // Revert on error
      const originalStatus = candidates.find((c) => c.id === candidateId)?.status
      if (originalStatus) {
        setCandidateStatuses((prev) => ({
          ...prev,
          [candidateId]: originalStatus,
        }))
      }
    }
  }

  const getCandidatesWithStatus = () => {
    return candidates.map((c) => ({
      ...c,
      status: candidateStatuses[c.id] || c.status,
    }))
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-4">
        <div className="container max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-3">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/jobs">Jobs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{job.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold text-foreground">
                    {job.title}
                  </h1>
                  <Badge
                    variant="outline"
                    className={cn("capitalize", statusColors[job.status])}
                  >
                    {job.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {job.department} &bull; {job.location} &bull; {job.type}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <Tabs defaultValue="candidates" className="flex-1 flex flex-col">
        <div className="border-b border-border bg-card">
          <div className="container max-w-7xl mx-auto px-4">
            <TabsList className="h-12 bg-transparent p-0 gap-6">
              <TabsTrigger
                value="candidates"
                className="h-12 px-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none"
              >
                Candidates {candidatesLoading ? "" : `(${candidates.length})`}
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="h-12 px-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none"
              >
                Job Details
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="candidates" className="flex-1 m-0">
          <div className="flex h-full">
            {/* Kanban Board */}
            <div
              className={cn(
                "flex-1 overflow-hidden transition-all",
                selectedCandidate ? "pr-0" : ""
              )}
            >
              {candidatesLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <KanbanBoard
                  candidates={getCandidatesWithStatus()}
                  onCandidateSelect={setSelectedCandidate}
                  onStatusChange={handleStatusChange}
                  selectedCandidateId={selectedCandidate?.id}
                />
              )}
            </div>

            {/* Candidate Side Panel */}
            {selectedCandidate && (
              <CandidatePanel
                candidate={{
                  ...selectedCandidate,
                  status:
                    candidateStatuses[selectedCandidate.id] ||
                    selectedCandidate.status,
                }}
                onClose={() => setSelectedCandidate(null)}
                onStatusChange={(status) =>
                  handleStatusChange(selectedCandidate.id, status)
                }
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="details" className="flex-1 m-0 overflow-auto">
          <JobDetails job={job} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Settings, Loader2, Archive, ArchiveRestore } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddCandidateDialog } from "@/components/jobs/add-candidate-dialog"
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { KanbanBoard } from "@/components/jobs/kanban-board"
import { JobDetails } from "@/components/jobs/job-details"
import { CandidatePanel } from "@/components/jobs/candidate-panel"
import { useJob, useArchiveJob, useUnarchiveJob } from "@/hooks/use-jobs"
import { useCandidates, useMoveCandidate } from "@/hooks/use-candidates"
import { useToast } from "@/hooks/use-toast"
import { normalizeJob, normalizeCandidate, type Candidate, type CandidateStatus } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const statusColors = {
  active: "bg-success/10 text-success border-success/30",
  draft: "bg-warning/10 text-warning border-warning/30",
  closed: "bg-muted text-muted-foreground border-border",
  paused: "bg-warning/10 text-warning border-warning/30",
}

interface JobDetailClientProps {
  jobId: string
}

export default function JobDetailClient({ jobId }: JobDetailClientProps) {
  // Fetch job and candidates from API
  const { data: jobData, isLoading: jobLoading, error: jobError } = useJob(jobId)
  const { data: candidatesData, isLoading: candidatesLoading } = useCandidates({ job_id: jobId })
  const moveCandidate = useMoveCandidate()
  const archiveJob = useArchiveJob()
  const unarchiveJob = useUnarchiveJob()
  const { toast } = useToast()
  const [showArchiveDialog, setShowArchiveDialog] = useState(false)

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

  const handleArchive = async () => {
    try {
      await archiveJob.mutateAsync(jobId)
      toast({
        title: "Job archived",
        description: `"${job.title}" has been archived and will no longer appear in the default job list.`,
      })
    } catch (error) {
      toast({
        title: "Failed to archive job",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      })
    }
    setShowArchiveDialog(false)
  }

  const handleUnarchive = async () => {
    try {
      await unarchiveJob.mutateAsync(jobId)
      toast({
        title: "Job restored",
        description: `"${job.title}" has been restored and is now visible in the job list.`,
      })
    } catch (error) {
      toast({
        title: "Failed to restore job",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      })
    }
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
                  {job.isArchived && (
                    <Badge variant="outline" className="bg-muted text-muted-foreground">
                      Archived
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {job.department} &bull; {job.location} &bull; {job.type}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <AddCandidateDialog 
                jobId={jobId} 
                onSuccess={() => {
                  // Data will be automatically refreshed via React Query
                }}
              />
              {job.isArchived ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleUnarchive}
                  disabled={unarchiveJob.isPending}
                >
                  <ArchiveRestore className="mr-2 h-4 w-4" />
                  {unarchiveJob.isPending ? "Restoring..." : "Restore"}
                </Button>
              ) : (
                <AlertDialog open={showArchiveDialog} onOpenChange={setShowArchiveDialog}>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Archive className="mr-2 h-4 w-4" />
                      Archive
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Archive this job?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Archiving &quot;{job.title}&quot; will hide it from the default job list. 
                        You can still view archived jobs by enabling the &quot;Show archived&quot; filter. 
                        This action can be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleArchive}
                        disabled={archiveJob.isPending}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {archiveJob.isPending ? "Archiving..." : "Archive"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
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
                jobId={jobId}
                jobTitle={job.title}
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

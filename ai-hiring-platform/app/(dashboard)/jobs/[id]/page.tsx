"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { KanbanBoard } from "@/components/jobs/kanban-board"
import { JobDetails } from "@/components/jobs/job-details"
import { CandidatePanel } from "@/components/jobs/candidate-panel"
import { mockJobs, mockCandidates, type Candidate } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const statusColors = {
  active: "bg-success/10 text-success border-success/30",
  draft: "bg-warning/10 text-warning border-warning/30",
  closed: "bg-muted text-muted-foreground border-border",
}

export default function JobDetailPage() {
  const params = useParams()
  const jobId = params.id as string
  const job = mockJobs.find((j) => j.id === jobId)
  const candidates = mockCandidates.filter((c) => c.jobId === jobId)

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  )
  const [candidateStatuses, setCandidateStatuses] = useState<
    Record<string, Candidate["status"]>
  >(() => {
    const initial: Record<string, Candidate["status"]> = {}
    candidates.forEach((c) => {
      initial[c.id] = c.status
    })
    return initial
  })

  if (!job) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Job not found
          </h1>
          <p className="text-muted-foreground mb-4">
            The job you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/jobs">
            <Button>Back to Jobs</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleStatusChange = (
    candidateId: string,
    newStatus: Candidate["status"]
  ) => {
    setCandidateStatuses((prev) => ({
      ...prev,
      [candidateId]: newStatus,
    }))
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/jobs">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to Jobs</span>
                </Button>
              </Link>
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
                Candidates
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
              <KanbanBoard
                candidates={getCandidatesWithStatus()}
                onCandidateSelect={setSelectedCandidate}
                onStatusChange={handleStatusChange}
                selectedCandidateId={selectedCandidate?.id}
              />
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

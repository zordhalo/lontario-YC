"use client"

import React from "react"

import { CandidateCard } from "@/components/jobs/candidate-card"
import type { Candidate } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface KanbanBoardProps {
  candidates: Candidate[]
  onCandidateSelect: (candidate: Candidate) => void
  onStatusChange: (candidateId: string, status: Candidate["status"]) => void
  selectedCandidateId?: string
  onApprove?: (candidate: Candidate) => void
  onReject?: (candidate: Candidate) => void
  onSchedule?: (candidate: Candidate) => void
}

const columns: { status: Candidate["status"]; label: string; variant?: "destructive" }[] = [
  { status: "applied", label: "Applied" },
  { status: "screening", label: "Screening" },
  { status: "ai_interview", label: "AI Interview" },
  { status: "phone_screen", label: "Phone Screen" },
  { status: "technical", label: "Technical" },
  { status: "onsite", label: "Onsite" },
  { status: "offer", label: "Offer" },
  { status: "hired", label: "Hired" },
  { status: "rejected", label: "Rejected", variant: "destructive" },
]

export function KanbanBoard({
  candidates,
  onCandidateSelect,
  onStatusChange,
  selectedCandidateId,
  onApprove,
  onReject,
  onSchedule,
}: KanbanBoardProps) {
  const getCandidatesByStatus = (status: Candidate["status"]) => {
    return candidates
      .filter((c) => c.status === status)
      .sort((a, b) => b.aiScore - a.aiScore)
  }

  const handleDragStart = (e: React.DragEvent, candidate: Candidate) => {
    e.dataTransfer.setData("candidateId", candidate.id)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, status: Candidate["status"]) => {
    e.preventDefault()
    const candidateId = e.dataTransfer.getData("candidateId")
    if (candidateId) {
      onStatusChange(candidateId, status)
    }
  }

  return (
    <div className="h-full overflow-x-auto p-4">
      <div className="flex gap-4 h-full min-w-max">
        {columns.map((column) => {
          const columnCandidates = getCandidatesByStatus(column.status)
          return (
            <div
              key={column.status}
              className="w-72 shrink-0 flex flex-col h-full"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.status)}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className={cn(
                  "font-medium",
                  column.variant === "destructive" ? "text-destructive" : "text-foreground"
                )}>
                  {column.label}
                </h3>
                <span className={cn(
                  "text-sm rounded-full px-2 py-0.5",
                  column.variant === "destructive" 
                    ? "text-destructive bg-destructive/10" 
                    : "text-muted-foreground bg-muted"
                )}>
                  {columnCandidates.length}
                </span>
              </div>

              {/* Column Content */}
              <div
                className={cn(
                  "flex-1 rounded-lg p-2 space-y-2 overflow-y-auto",
                  "border-2 border-dashed border-transparent transition-colors",
                  column.variant === "destructive" 
                    ? "bg-destructive/5 hover:border-destructive/20" 
                    : "bg-muted/30 hover:border-muted-foreground/20"
                )}
              >
                {columnCandidates.length === 0 ? (
                  <div className="flex items-center justify-center h-24 text-sm text-muted-foreground">
                    Drop candidates here
                  </div>
                ) : (
                  columnCandidates.map((candidate) => (
                    <CandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      onClick={() => onCandidateSelect(candidate)}
                      onDragStart={(e) => handleDragStart(e, candidate)}
                      isSelected={selectedCandidateId === candidate.id}
                      onApprove={onApprove}
                      onReject={onReject}
                      onSchedule={onSchedule}
                    />
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

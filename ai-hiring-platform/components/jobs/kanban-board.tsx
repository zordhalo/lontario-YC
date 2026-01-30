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
}

const columns: { status: Candidate["status"]; label: string }[] = [
  { status: "applied", label: "Applied" },
  { status: "screened", label: "Screened" },
  { status: "interview", label: "Interview" },
  { status: "offer", label: "Offer" },
  { status: "hired", label: "Hired" },
]

export function KanbanBoard({
  candidates,
  onCandidateSelect,
  onStatusChange,
  selectedCandidateId,
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
                <h3 className="font-medium text-foreground">{column.label}</h3>
                <span className="text-sm text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                  {columnCandidates.length}
                </span>
              </div>

              {/* Column Content */}
              <div
                className={cn(
                  "flex-1 rounded-lg bg-muted/30 p-2 space-y-2 overflow-y-auto",
                  "border-2 border-dashed border-transparent transition-colors",
                  "hover:border-muted-foreground/20"
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

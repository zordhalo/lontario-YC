"use client"

import React from "react"

import { Calendar, MoreHorizontal, ThumbsDown, ThumbsUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AIScoreBadge } from "@/components/ai-score-badge"
import type { Candidate } from "@/lib/mock-data"

interface CandidateCardProps {
  candidate: Candidate
  onClick: () => void
  onDragStart: (e: React.DragEvent) => void
  isSelected?: boolean
  onApprove?: (candidate: Candidate) => void
  onReject?: (candidate: Candidate) => void
  onSchedule?: (candidate: Candidate) => void
}

export function CandidateCard({
  candidate,
  onClick,
  onDragStart,
  isSelected,
  onApprove,
  onReject,
  onSchedule,
}: CandidateCardProps) {
  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        "border-2 border-transparent",
        isSelected && "border-primary ring-1 ring-primary/20"
      )}
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <Avatar className="h-8 w-8 shrink-0">
              {(candidate.avatar_url || candidate.avatar) ? (
                <AvatarImage 
                  src={candidate.avatar_url || candidate.avatar} 
                  alt={candidate.name}
                  className="object-cover"
                />
              ) : null}
              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-medium text-foreground text-sm truncate">
                {candidate.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {candidate.experience} exp
              </p>
            </div>
          </div>
          <AIScoreBadge
            score={candidate.aiScore}
            size="sm"
            explanation={`AI match score based on skills, experience, and job requirements.`}
          />
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-3">
          {candidate.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
            >
              {skill}
            </span>
          ))}
          {candidate.skills.length > 3 && (
            <span className="text-xs px-1.5 py-0.5 text-muted-foreground">
              +{candidate.skills.length - 3}
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-success"
                  onClick={(e) => {
                    e.stopPropagation()
                    onApprove?.(candidate)
                  }}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span className="sr-only">Move to next stage</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Move to next stage</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation()
                    onReject?.(candidate)
                  }}
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                  <span className="sr-only">Reject</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reject candidate</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-primary"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSchedule?.(candidate)
                  }}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="sr-only">Schedule Interview</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Schedule AI Interview</TooltipContent>
            </Tooltip>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
                <span className="sr-only">More actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Send Message</DropdownMenuItem>
              <DropdownMenuItem>Download Resume</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

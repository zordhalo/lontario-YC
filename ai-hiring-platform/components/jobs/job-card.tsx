"use client"

import Link from "next/link"
import {
  Archive,
  Edit,
  ExternalLink,
  MapPin,
  MoreHorizontal,
  Sparkles,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import type { Job } from "@/lib/mock-data"

interface JobCardProps {
  job: Job
  variant?: "grid" | "list"
}

const statusColors = {
  active: "bg-success/10 text-success border-success/30",
  draft: "bg-warning/10 text-warning border-warning/30",
  closed: "bg-muted text-muted-foreground border-border",
}

export function JobCard({ job, variant = "grid" }: JobCardProps) {
  const screened = Math.floor(job.applicants * 0.4)
  const interview = Math.floor(job.applicants * 0.15)
  const progress =
    job.applicants > 0
      ? Math.round(((screened + interview) / job.applicants) * 100)
      : 0

  if (variant === "list") {
    return (
      <Card className="group hover:border-primary/30 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <Link
                  href={`/jobs/${job.id}`}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors truncate"
                >
                  {job.title}
                </Link>
                <Badge
                  variant="outline"
                  className={cn("capitalize shrink-0", statusColors[job.status])}
                >
                  {job.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{job.department}</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {job.applicants} applicants
                </span>
                {job.topMatches > 0 && (
                  <span className="flex items-center gap-1 text-success">
                    <Sparkles className="h-3.5 w-3.5" />
                    {job.topMatches} top matches
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/jobs/${job.id}`}>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </Link>
              <JobActions job={job} />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group hover:border-primary/30 hover:shadow-md transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 min-w-0">
            <Link
              href={`/jobs/${job.id}`}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors line-clamp-1"
            >
              {job.title}
            </Link>
            <p className="text-sm text-muted-foreground">{job.department}</p>
          </div>
          <Badge
            variant="outline"
            className={cn("capitalize shrink-0", statusColors[job.status])}
          >
            {job.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {job.location}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-foreground">{job.applicants}</span>
            <span className="text-muted-foreground">applicants</span>
          </div>
          {job.topMatches > 0 && (
            <div className="flex items-center gap-1 text-success">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">{job.topMatches}</span>
              <span className="text-success/80">top matches</span>
            </div>
          )}
        </div>

        {job.status === "active" && job.applicants > 0 && (
          <div className="space-y-2">
            <Progress value={progress} className="h-1.5" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Pipeline progress</span>
              <span>{progress}%</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Link href={`/jobs/${job.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              View Candidates
            </Button>
          </Link>
          <JobActions job={job} />
        </div>
      </CardContent>
    </Card>
  )
}

function JobActions({ job }: { job: Job }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Edit Job
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ExternalLink className="mr-2 h-4 w-4" />
          Share Link
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">
          <Archive className="mr-2 h-4 w-4" />
          Archive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

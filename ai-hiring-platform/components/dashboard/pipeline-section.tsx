"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { mockJobs } from "@/lib/mock-data"

const activeJobs = mockJobs.filter((job) => job.status === "active").slice(0, 4)

export function PipelineSection() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg">Active Jobs Pipeline</CardTitle>
        <Link href="/jobs">
          <Button variant="ghost" size="sm" className="text-primary">
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeJobs.map((job) => {
          const screened = Math.floor(job.applicants * 0.4)
          const interview = Math.floor(job.applicants * 0.15)
          const progress =
            job.applicants > 0
              ? Math.round(((screened + interview) / job.applicants) * 100)
              : 0

          return (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="block group"
            >
              <div className="p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/30 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {job.applicants} applicants
                      {job.topMatches > 0 &&
                        ` • ${job.topMatches} top matches`}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Pipeline progress
                    </span>
                    <span className="font-medium text-foreground">
                      {progress}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Applied: {job.applicants}</span>
                    <span>Screened: {screened}</span>
                    <span>Interview: {interview}</span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}

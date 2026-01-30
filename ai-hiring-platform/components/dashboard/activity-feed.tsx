"use client"

import {
  ArrowRight,
  Calendar,
  FileCheck,
  Sparkles,
  UserPlus,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockActivity, mockCandidates } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const getActivityIcon = (type: string) => {
  switch (type) {
    case "application":
      return { icon: UserPlus, color: "text-primary", bg: "bg-primary/10" }
    case "ai_score":
      return { icon: Sparkles, color: "text-success", bg: "bg-success/10" }
    case "interview":
      return { icon: Calendar, color: "text-warning", bg: "bg-warning/10" }
    case "stage_change":
      return { icon: FileCheck, color: "text-info", bg: "bg-info/10" }
    default:
      return { icon: FileCheck, color: "text-muted-foreground", bg: "bg-muted" }
  }
}

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <Button variant="ghost" size="sm" className="text-primary">
          View all
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivity.map((activity) => {
            const candidate = mockCandidates.find(
              (c) => c.id === activity.candidateId
            )
            const activityStyle = getActivityIcon(activity.type)
            const initials = candidate?.name
              .split(" ")
              .map((n) => n[0])
              .join("")

            return (
              <div key={activity.id} className="flex items-start gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback
                    className={cn(
                      "text-xs font-medium",
                      activityStyle.bg,
                      activityStyle.color
                    )}
                  >
                    {initials || "??"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </p>
                </div>
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    activityStyle.bg
                  )}
                >
                  <activityStyle.icon
                    className={cn("h-4 w-4", activityStyle.color)}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

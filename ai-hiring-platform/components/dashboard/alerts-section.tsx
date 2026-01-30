import Link from "next/link"
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  FileText,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AlertsSectionProps {
  className?: string
}

const alerts = [
  {
    id: 1,
    icon: Sparkles,
    iconColor: "text-success",
    iconBg: "bg-success/10",
    title: "5 candidates scored 90%+ for Senior Backend Engineer",
    action: "Review now",
    href: "/jobs/1",
  },
  {
    id: 2,
    icon: Calendar,
    iconColor: "text-warning",
    iconBg: "bg-warning/10",
    title: "3 interviews pending schedule",
    action: "Schedule",
    href: "/jobs",
  },
  {
    id: 3,
    icon: FileText,
    iconColor: "text-info",
    iconBg: "bg-info/10",
    title: "2 AI interview summaries ready for review",
    action: "View summaries",
    href: "/jobs",
  },
]

export function AlertsSection({ className }: AlertsSectionProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Needs Your Attention</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg",
                  alert.iconBg
                )}
              >
                <alert.icon className={cn("h-4 w-4", alert.iconColor)} />
              </div>
              <span className="text-sm font-medium text-foreground">
                {alert.title}
              </span>
            </div>
            <Link href={alert.href}>
              <Button variant="ghost" size="sm" className="text-primary">
                {alert.action}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

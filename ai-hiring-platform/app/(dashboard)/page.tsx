import { Briefcase, CheckCircle, Sparkles, Users } from "lucide-react"
import { StatsCard } from "@/components/stats-card"
import { AlertsSection } from "@/components/dashboard/alerts-section"
import { PipelineSection } from "@/components/dashboard/pipeline-section"
import { ActivityFeed } from "@/components/dashboard/activity-feed"

export default function DashboardPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, Jane!
          </h1>
          <p className="text-muted-foreground">
            {"Here's what's happening with your recruiting pipeline."}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Active Jobs"
          value={12}
          icon={Briefcase}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="New Applications"
          value={37}
          icon={Users}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="AI Matches Today"
          value={8}
          icon={Sparkles}
          trend={{ value: 25, isPositive: true }}
        />
        <StatsCard
          title="Hired This Week"
          value={4}
          icon={CheckCircle}
          trend={{ value: 100, isPositive: true }}
        />
      </div>

      {/* Alerts Section */}
      <AlertsSection className="mb-8" />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PipelineSection />
        <ActivityFeed />
      </div>
    </div>
  )
}

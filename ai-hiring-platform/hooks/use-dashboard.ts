"use client";

import { useQuery } from "@tanstack/react-query";

// Types
export interface StatWithTrend {
  value: number;
  trend: number;
}

export interface DashboardStats {
  active_jobs: StatWithTrend;
  new_applications: StatWithTrend;
  ai_matches_today: StatWithTrend;
  hired_this_week: StatWithTrend;
}

export interface DashboardAlert {
  id: string;
  type: "high_score" | "pending_interview" | "review_ready";
  title: string;
  href: string;
  count: number;
}

export interface DashboardAlertsResponse {
  alerts: DashboardAlert[];
}

// Query keys
export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
  alerts: () => [...dashboardKeys.all, "alerts"] as const,
};

// API functions
async function fetchDashboardStats(): Promise<DashboardStats> {
  const response = await fetch("/api/dashboard/stats");
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch dashboard stats");
  }
  return response.json();
}

async function fetchDashboardAlerts(): Promise<DashboardAlertsResponse> {
  const response = await fetch("/api/dashboard/alerts");
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch dashboard alerts");
  }
  return response.json();
}

// Hooks
export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: fetchDashboardStats,
    staleTime: 60_000, // Consider data stale after 1 minute
    refetchInterval: 120_000, // Refetch every 2 minutes
  });
}

export function useDashboardAlerts() {
  return useQuery({
    queryKey: dashboardKeys.alerts(),
    queryFn: fetchDashboardAlerts,
    staleTime: 30_000, // Consider data stale after 30 seconds
    refetchInterval: 60_000, // Refetch every minute
  });
}

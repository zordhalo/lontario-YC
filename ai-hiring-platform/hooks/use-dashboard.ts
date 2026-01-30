/**
 * @fileoverview React Query hooks for dashboard data
 * 
 * This module provides hooks for fetching dashboard statistics and alerts:
 * - Active jobs count with trend
 * - New applications with trend
 * - AI matches today with trend
 * - Hires this week with trend
 * - High-priority alerts
 * 
 * Data auto-refreshes at configured intervals.
 * 
 * @module hooks/use-dashboard
 */

"use client";

import { useQuery } from "@tanstack/react-query";

// ============================================================
// TYPE DEFINITIONS
// ============================================================

/**
 * Statistic value with trend indicator
 * Trend is percentage change from previous period
 */
export interface StatWithTrend {
  /** Current value */
  value: number;
  /** Percentage change (positive = up, negative = down) */
  trend: number;
}

/**
 * Dashboard statistics overview
 */
export interface DashboardStats {
  active_jobs: StatWithTrend;
  new_applications: StatWithTrend;
  ai_matches_today: StatWithTrend;
  hired_this_week: StatWithTrend;
}

/**
 * Dashboard alert for action items
 */
export interface DashboardAlert {
  id: string;
  /** Alert category */
  type: "high_score" | "pending_interview" | "review_ready";
  /** Display title */
  title: string;
  /** Link to relevant page */
  href: string;
  /** Number of items */
  count: number;
}

/**
 * Response from alerts API
 */
export interface DashboardAlertsResponse {
  alerts: DashboardAlert[];
}

// ============================================================
// QUERY KEYS
// ============================================================

/**
 * Query key factory for dashboard queries
 */
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

// ============================================================
// REACT QUERY HOOKS
// ============================================================

/**
 * Hook for fetching dashboard statistics
 * Auto-refreshes every 2 minutes
 * 
 * @returns Query result with stats and trends
 * 
 * @example
 * const { data } = useDashboardStats();
 * // data.active_jobs.value, data.active_jobs.trend
 */
export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: fetchDashboardStats,
    staleTime: 60_000, // Consider data stale after 1 minute
    refetchInterval: 120_000, // Refetch every 2 minutes
  });
}

/**
 * Hook for fetching dashboard alerts
 * Auto-refreshes every minute for timely notifications
 * 
 * @returns Query result with alert items
 * 
 * @example
 * const { data } = useDashboardAlerts();
 * // data.alerts[0].type, data.alerts[0].title
 */
export function useDashboardAlerts() {
  return useQuery({
    queryKey: dashboardKeys.alerts(),
    queryFn: fetchDashboardAlerts,
    staleTime: 30_000, // Consider data stale after 30 seconds
    refetchInterval: 60_000, // Refetch every minute
  });
}

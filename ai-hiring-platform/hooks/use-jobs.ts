"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Job, ListJobsQuery, ListJobsResponse, CreateJobRequest } from "@/types";

// Query keys
export const jobKeys = {
  all: ["jobs"] as const,
  lists: () => [...jobKeys.all, "list"] as const,
  list: (filters: ListJobsQuery) => [...jobKeys.lists(), filters] as const,
  details: () => [...jobKeys.all, "detail"] as const,
  detail: (id: string) => [...jobKeys.details(), id] as const,
};

// API functions
async function fetchJobs(filters: ListJobsQuery = {}): Promise<ListJobsResponse> {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  });

  const response = await fetch(`/api/jobs?${params}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch jobs");
  }
  return response.json();
}

async function fetchJob(id: string): Promise<Job & { candidate_summary: unknown }> {
  const response = await fetch(`/api/jobs/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch job");
  }
  return response.json();
}

async function createJob(data: CreateJobRequest): Promise<Job> {
  const response = await fetch("/api/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create job");
  }
  return response.json();
}

async function updateJob(id: string, data: Partial<Job>): Promise<Job> {
  const response = await fetch(`/api/jobs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update job");
  }
  return response.json();
}

async function deleteJob(id: string): Promise<void> {
  const response = await fetch(`/api/jobs/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete job");
  }
}

// Hooks
export function useJobs(filters: ListJobsQuery = {}) {
  return useQuery({
    queryKey: jobKeys.list(filters),
    queryFn: () => fetchJobs(filters),
    staleTime: 60_000, // Consider data stale after 1 minute
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: jobKeys.detail(id),
    queryFn: () => fetchJob(id),
    enabled: !!id,
    staleTime: 30_000,
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJob,
    onSuccess: (newJob) => {
      // Invalidate job lists
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
      // Optionally set the new job in cache
      queryClient.setQueryData(jobKeys.detail(newJob.id), newJob);
    },
  });
}

export function useUpdateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Job> }) =>
      updateJob(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: jobKeys.detail(id) });

      // Snapshot previous value
      const previousJob = queryClient.getQueryData(jobKeys.detail(id));

      // Optimistically update
      queryClient.setQueryData(jobKeys.detail(id), (old: Job | undefined) =>
        old ? { ...old, ...data } : old
      );

      return { previousJob };
    },
    onError: (err, { id }, context) => {
      // Rollback on error
      if (context?.previousJob) {
        queryClient.setQueryData(jobKeys.detail(id), context.previousJob);
      }
    },
    onSettled: (data, error, { id }) => {
      // Always refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
    },
  });
}

export function useDeleteJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJob,
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: jobKeys.detail(id) });
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
    },
  });
}

export function usePublishJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => updateJob(id, { status: "active" }),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
    },
  });
}

export function useCloseJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => updateJob(id, { status: "closed" }),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
    },
  });
}

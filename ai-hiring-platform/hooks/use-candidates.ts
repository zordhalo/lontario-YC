"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  Candidate,
  CandidateStage,
  ListCandidatesQuery,
  ListCandidatesResponse,
  MoveCandidateRequest,
} from "@/types";

// Query keys
export const candidateKeys = {
  all: ["candidates"] as const,
  lists: () => [...candidateKeys.all, "list"] as const,
  list: (filters: ListCandidatesQuery) =>
    [...candidateKeys.lists(), filters] as const,
  details: () => [...candidateKeys.all, "detail"] as const,
  detail: (id: string) => [...candidateKeys.details(), id] as const,
};

// API functions
async function fetchCandidates(
  filters: ListCandidatesQuery
): Promise<ListCandidatesResponse> {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  });

  const response = await fetch(`/api/candidates?${params}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch candidates");
  }
  return response.json();
}

async function fetchCandidate(id: string): Promise<Candidate & {
  activities: unknown[];
  comments: unknown[];
  interview: unknown | null;
}> {
  const response = await fetch(`/api/candidates/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch candidate");
  }
  return response.json();
}

async function updateCandidate(
  id: string,
  data: Partial<Candidate>
): Promise<Candidate> {
  const response = await fetch(`/api/candidates/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update candidate");
  }
  return response.json();
}

async function moveCandidate(
  id: string,
  data: MoveCandidateRequest
): Promise<{ candidate: Candidate; activity: unknown }> {
  const response = await fetch(`/api/candidates/${id}/move`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to move candidate");
  }
  return response.json();
}

async function deleteCandidate(id: string): Promise<void> {
  const response = await fetch(`/api/candidates/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete candidate");
  }
}

interface CreateCandidateData {
  job_id: string;
  email: string;
  full_name: string;
  phone?: string;
  location?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  cover_letter?: string;
  source?: string;
}

async function createCandidate(data: CreateCandidateData): Promise<Candidate> {
  const response = await fetch("/api/candidates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create candidate");
  }
  return response.json();
}

// Hooks
export function useCandidates(filters: ListCandidatesQuery) {
  return useQuery({
    queryKey: candidateKeys.list(filters),
    queryFn: () => fetchCandidates(filters),
    enabled: !!filters.job_id,
    staleTime: 30_000,
  });
}

export function useCandidate(id: string) {
  return useQuery({
    queryKey: candidateKeys.detail(id),
    queryFn: () => fetchCandidate(id),
    enabled: !!id,
    staleTime: 30_000,
  });
}

export function useUpdateCandidate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Candidate> }) =>
      updateCandidate(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: candidateKeys.detail(id) });

      const previousCandidate = queryClient.getQueryData(
        candidateKeys.detail(id)
      );

      queryClient.setQueryData(
        candidateKeys.detail(id),
        (old: Candidate | undefined) => (old ? { ...old, ...data } : old)
      );

      return { previousCandidate };
    },
    onError: (err, { id }, context) => {
      if (context?.previousCandidate) {
        queryClient.setQueryData(
          candidateKeys.detail(id),
          context.previousCandidate
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: candidateKeys.all });
    },
  });
}

export function useMoveCandidate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      candidateId,
      ...data
    }: { candidateId: string } & MoveCandidateRequest) =>
      moveCandidate(candidateId, data),
    onMutate: async ({ candidateId, stage }) => {
      // Cancel queries for this candidate's list
      await queryClient.cancelQueries({ queryKey: candidateKeys.lists() });

      // Get all cached lists
      const queries = queryClient.getQueriesData<ListCandidatesResponse>({
        queryKey: candidateKeys.lists(),
      });

      // Optimistically update all lists containing this candidate
      queries.forEach(([queryKey, data]) => {
        if (data?.candidates) {
          queryClient.setQueryData(queryKey, {
            ...data,
            candidates: data.candidates.map((c) =>
              c.id === candidateId ? { ...c, stage } : c
            ),
          });
        }
      });

      return { queries };
    },
    onError: (err, variables, context) => {
      // Restore previous state
      context?.queries?.forEach(([queryKey, data]) => {
        if (data) {
          queryClient.setQueryData(queryKey, data);
        }
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: candidateKeys.all });
    },
  });
}

export function useStarCandidate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, starred }: { id: string; starred: boolean }) =>
      updateCandidate(id, { is_starred: starred }),
    onMutate: async ({ id, starred }) => {
      await queryClient.cancelQueries({ queryKey: candidateKeys.detail(id) });

      const previousCandidate = queryClient.getQueryData(
        candidateKeys.detail(id)
      );

      queryClient.setQueryData(
        candidateKeys.detail(id),
        (old: Candidate | undefined) =>
          old ? { ...old, is_starred: starred } : old
      );

      return { previousCandidate };
    },
    onError: (err, { id }, context) => {
      if (context?.previousCandidate) {
        queryClient.setQueryData(
          candidateKeys.detail(id),
          context.previousCandidate
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: candidateKeys.all });
    },
  });
}

export function useDeleteCandidate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCandidate,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: candidateKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: candidateKeys.lists() });
    },
  });
}

export function useBulkMoveCandiates() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      candidateIds,
      stage,
      rejection_reason,
    }: {
      candidateIds: string[];
      stage: CandidateStage;
      rejection_reason?: string;
    }) => {
      const results = await Promise.allSettled(
        candidateIds.map((id) =>
          moveCandidate(id, { stage, rejection_reason })
        )
      );

      const succeeded = results.filter((r) => r.status === "fulfilled").length;
      const failed = results.filter((r) => r.status === "rejected").length;

      return { succeeded, failed, total: candidateIds.length };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: candidateKeys.all });
    },
  });
}

export function useCreateCandidate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCandidate,
    onSuccess: () => {
      // Invalidate all candidate lists to refresh the data immediately
      queryClient.invalidateQueries({ queryKey: candidateKeys.lists() });
    },
  });
}

/**
 * Poll a candidate until AI scoring is complete
 * Returns when scoring is done or after max attempts
 */
export async function pollCandidateUntilScored(
  candidateId: string,
  options?: {
    maxAttempts?: number;
    intervalMs?: number;
    onProgress?: (attempt: number, candidate: Candidate | null) => void;
  }
): Promise<Candidate | null> {
  const maxAttempts = options?.maxAttempts ?? 10;
  const intervalMs = options?.intervalMs ?? 2000;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const candidate = await fetchCandidate(candidateId);
      options?.onProgress?.(attempt, candidate as Candidate);
      
      // Check if scoring is complete - candidate has ai_score > 0 OR has ai_summary
      // (ai_score of 0 with summary means insufficient data, which is also "complete")
      const hasScore = candidate.ai_score !== null && candidate.ai_score !== undefined;
      const hasSummary = !!candidate.ai_summary;
      const hasAvatar = !!candidate.avatar_url;
      
      if (hasScore || hasSummary || hasAvatar) {
        return candidate as Candidate;
      }
      
      // Wait before next attempt
      if (attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, intervalMs));
      }
    } catch (error) {
      console.error(`Polling attempt ${attempt} failed:`, error);
      // Continue polling even if one request fails
      if (attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, intervalMs));
      }
    }
  }
  
  return null;
}

/**
 * Hook to invalidate candidate queries - useful after polling completes
 */
export function useInvalidateCandidates() {
  const queryClient = useQueryClient();
  
  return {
    invalidateAll: () => queryClient.invalidateQueries({ queryKey: candidateKeys.all }),
    invalidateLists: () => queryClient.invalidateQueries({ queryKey: candidateKeys.lists() }),
    invalidateCandidate: (id: string) => queryClient.invalidateQueries({ queryKey: candidateKeys.detail(id) }),
  };
}

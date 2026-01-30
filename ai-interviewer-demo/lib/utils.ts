import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractGitHubUsername(url: string): string | null {
  const patterns = [
    /github\.com\/([^\/\?]+)/i,
    /^([a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38})$/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

export function extractLinkedInUrl(url: string): string | null {
  const pattern = /linkedin\.com\/in\/([^\/\?]+)/i;
  const match = url.match(pattern);
  if (match) {
    return url.includes("https://") ? url : `https://${url}`;
  }
  return null;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}m`;
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "easy":
      return "bg-green-100 text-green-800 border-green-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "hard":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export function getCategoryIcon(category: string): string {
  switch (category) {
    case "technical":
      return "code";
    case "behavioral":
      return "users";
    case "system-design":
      return "layout";
    case "problem-solving":
      return "lightbulb";
    default:
      return "help-circle";
  }
}

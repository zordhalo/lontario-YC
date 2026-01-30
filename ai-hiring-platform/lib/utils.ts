import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a duration in minutes to a human-readable string
 * @param minutes - Duration in minutes
 * @returns Formatted string (e.g., "45 min" or "1h 15m")
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) {
    return `${hours}h`
  }
  return `${hours}h ${remainingMinutes}m`
}

/**
 * Returns Tailwind CSS classes for difficulty badge styling
 * @param difficulty - Question difficulty level
 * @returns Tailwind class string
 */
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "easy":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800"
    case "hard":
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
  }
}

/**
 * Returns the Lucide icon name for a question category
 * @param category - Question category
 * @returns Icon name string
 */
export function getCategoryIcon(category: string): string {
  switch (category) {
    case "technical":
      return "code"
    case "behavioral":
      return "users"
    case "system-design":
      return "layout"
    case "problem-solving":
      return "lightbulb"
    case "culture-fit":
      return "heart"
    default:
      return "help-circle"
  }
}

/**
 * Returns a display label for a question category
 * @param category - Question category
 * @returns Human-readable category label
 */
export function getCategoryLabel(category: string): string {
  switch (category) {
    case "technical":
      return "Technical"
    case "behavioral":
      return "Behavioral"
    case "system-design":
      return "System Design"
    case "problem-solving":
      return "Problem Solving"
    case "culture-fit":
      return "Culture Fit"
    default:
      return category
  }
}

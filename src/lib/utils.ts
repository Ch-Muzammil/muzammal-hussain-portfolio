import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * USE CASE: Conditional Tailwind classes without style conflicts.
 *
 * HOW TO USE:
 *   cn("px-4 py-2", isActive && "bg-black text-white", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

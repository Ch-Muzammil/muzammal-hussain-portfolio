"use client";

import { useSyncExternalStore } from "react";

/**
 * USE CASE: Know when the component has mounted on the client.
 * Needed to avoid SSR/client mismatches (dates, window, localStorage).
 *
 * HOW TO USE:
 *   const mounted = useMounted()
 *   if (!mounted) return null
 *   return <span>{formatDate(iso)}</span>
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

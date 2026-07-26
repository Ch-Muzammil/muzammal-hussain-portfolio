"use client";

import { useEffect, useState } from "react";

/**
 * USE CASE: Debounce a changing value — wait until the user stops typing.
 *
 * HOW TO USE:
 *   const [query, setQuery] = useState("")
 *   const debouncedQuery = useDebouncedValue(query, 300)
 *
 *   useEffect(() => {
 *     if (!debouncedQuery) return
 *     searchApi(debouncedQuery)
 *   }, [debouncedQuery])
 *
 * Tip: for debouncing a function instead of a value, use useDebouncedCallback.
 */
export function useDebouncedValue<T>(value: T, waitMs = 300): T {
  const [debounced, setDebounced] = useState(value);
  const wait = Number.isFinite(waitMs) && waitMs > 0 ? waitMs : 0;

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), wait);
    return () => clearTimeout(timer);
  }, [value, wait]);

  return debounced;
}

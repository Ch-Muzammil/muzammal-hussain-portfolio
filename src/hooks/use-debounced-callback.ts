"use client";

import { useEffect, useMemo, useRef } from "react";
import { debounce, type DebouncedFn } from "@/lib/debounce";

/**
 * USE CASE: Debounce a callback — e.g. search-as-you-type handler.
 *
 * HOW TO USE:
 *   const onSearch = useDebouncedCallback((q: string) => {
 *     void fetchResults(q)
 *   }, 300)
 *
 *   <input onChange={(e) => onSearch(e.target.value)} />
 *
 *   onSearch.cancel() // cancel pending call
 *   onSearch.flush()  // run pending call now
 *
 * Tip: for debouncing a state value, use useDebouncedValue.
 */
export function useDebouncedCallback<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  waitMs = 300,
): DebouncedFn<TArgs> {
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  });

  const wait = Number.isFinite(waitMs) && waitMs > 0 ? waitMs : 0;

  const debounced = useMemo(
    () =>
      // Latest-ref: `fnRef.current` is only read when the delayed callback fires.
      // eslint-disable-next-line react-hooks/refs -- deferred read, not during render
      debounce((...args: TArgs) => {
        fnRef.current(...args);
      }, wait),
    [wait],
  );

  useEffect(() => () => debounced.cancel(), [debounced]);

  return debounced;
}

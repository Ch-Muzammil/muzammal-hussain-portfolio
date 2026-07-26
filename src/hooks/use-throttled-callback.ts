"use client";

import { useEffect, useMemo, useRef } from "react";
import { throttle, type ThrottledFn } from "@/lib/throttle";

/**
 * USE CASE: Throttle a callback — run at most once per interval
 * (scroll, resize, drag).
 *
 * HOW TO USE:
 *   const onScroll = useThrottledCallback(() => {
 *     updateScrollPosition()
 *   }, 100)
 *
 *   useEffect(() => {
 *     window.addEventListener("scroll", onScroll)
 *     return () => {
 *       onScroll.cancel()
 *       window.removeEventListener("scroll", onScroll)
 *     }
 *   }, [onScroll])
 */
export function useThrottledCallback<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  waitMs = 100,
): ThrottledFn<TArgs> {
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  });

  const wait = Number.isFinite(waitMs) && waitMs > 0 ? waitMs : 0;

  const throttled = useMemo(
    () =>
      // Latest-ref: `fnRef.current` is only read when the throttled callback fires.
      // eslint-disable-next-line react-hooks/refs -- deferred read, not during render
      throttle((...args: TArgs) => {
        fnRef.current(...args);
      }, wait),
    [wait],
  );

  useEffect(() => () => throttled.cancel(), [throttled]);

  return throttled;
}

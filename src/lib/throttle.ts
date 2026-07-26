export type ThrottledFn<TArgs extends unknown[]> = ((...args: TArgs) => void) & {
  /** Cancel a pending trailing call. */
  cancel: () => void;
};

/**
 * USE CASE: Limit how often a function runs (scroll, mousemove, resize).
 * First call runs immediately; later calls wait until the window opens again.
 *
 * HOW TO USE:
 *   const onScroll = throttle(() => updateHeader(), 100)
 *   window.addEventListener("scroll", onScroll)
 *   onScroll.cancel()
 *
 * Prefer in React:
 *   useThrottledCallback(() => updateHeader(), 100)
 */
export function throttle<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  waitMs: number,
): ThrottledFn<TArgs> {
  const wait = Number.isFinite(waitMs) && waitMs > 0 ? waitMs : 0;

  let lastRun = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: TArgs | undefined;

  const run = (args: TArgs) => {
    lastRun = Date.now();
    lastArgs = undefined;
    fn(...args);
  };

  const throttled = ((...args: TArgs) => {
    const now = Date.now();
    const remaining = wait - (now - lastRun);
    lastArgs = args;

    // Window open → run now
    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = undefined;
      }
      run(args);
      return;
    }

    // Window closed → schedule one trailing call with latest args
    if (!timer) {
      timer = setTimeout(() => {
        timer = undefined;
        if (lastArgs) run(lastArgs);
      }, remaining);
    }
  }) as ThrottledFn<TArgs>;

  throttled.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = undefined;
    lastArgs = undefined;
  };

  return throttled;
}

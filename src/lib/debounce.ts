export type DebouncedFn<TArgs extends unknown[]> = ((...args: TArgs) => void) & {
  /** Cancel a pending call (does not run fn). */
  cancel: () => void;
  /** Run the pending call immediately. */
  flush: () => void;
};

/**
 * USE CASE: Delay a function until the user stops calling it
 * (search typing, resize, autosave).
 *
 * HOW TO USE:
 *   const onSearch = debounce((q: string) => fetchResults(q), 300)
 *   onSearch("re")   // ignored if user keeps typing
 *   onSearch("react") // runs 300ms after last call
 *   onSearch.cancel() // cancel pending
 *   onSearch.flush()  // run now
 *
 * Prefer React hooks in components:
 *   useDebouncedValue / useDebouncedCallback
 */
export function debounce<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  waitMs: number,
): DebouncedFn<TArgs> {
  const wait = Number.isFinite(waitMs) && waitMs > 0 ? waitMs : 0;

  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: TArgs | undefined;

  const run = () => {
    timer = undefined;
    const args = lastArgs;
    lastArgs = undefined;
    if (args) fn(...args);
  };

  const debounced = ((...args: TArgs) => {
    lastArgs = args;
    if (timer) clearTimeout(timer);
    timer = setTimeout(run, wait);
  }) as DebouncedFn<TArgs>;

  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = undefined;
    lastArgs = undefined;
  };

  debounced.flush = () => {
    if (!timer) return;
    clearTimeout(timer);
    run();
  };

  return debounced;
}

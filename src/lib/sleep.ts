/**
 * USE CASE: Wait before continuing (retries, fake loading, animations).
 *
 * HOW TO USE:
 *   await sleep(500) // wait 500ms
 */
export function sleep(ms: number): Promise<void> {
  const delay = Number.isFinite(ms) && ms > 0 ? ms : 0;
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

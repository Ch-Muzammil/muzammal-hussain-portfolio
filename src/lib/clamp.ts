/**
 * USE CASE: Keep a number inside a min/max range (sliders, progress, pagination).
 *
 * HOW TO USE:
 *   clamp(150, 0, 100) // → 100
 *   clamp(-5, 0, 100)  // → 0
 *   clamp(42, 0, 100)  // → 42
 */
export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max)) {
    throw new RangeError("clamp: value, min, and max must be finite numbers");
  }
  if (min > max) {
    throw new RangeError(`clamp: min (${min}) cannot be greater than max (${max})`);
  }
  return Math.min(max, Math.max(min, value));
}

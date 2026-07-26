import type { Matcher } from "react-day-picker";

/**
 * Merge caller `disabledDays` with min/max bounds.
 * Bounds disable days (still visible) — they do NOT hide them.
 */
export function buildDisabledMatchers(
  disabledDays?: Matcher | Matcher[],
  fromDate?: Date,
  toDate?: Date,
): Matcher | Matcher[] | undefined {
  const parts: Matcher[] = [];

  if (disabledDays) {
    if (Array.isArray(disabledDays)) parts.push(...disabledDays);
    else parts.push(disabledDays);
  }
  if (fromDate) parts.push({ before: fromDate });
  if (toDate) parts.push({ after: toDate });

  if (parts.length === 0) return undefined;
  if (parts.length === 1) return parts[0];
  return parts;
}

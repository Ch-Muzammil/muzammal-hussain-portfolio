export type DateInput = Date | string | number;

/** "long" → 27 July, 2026 | "numeric" → 27-07-2026 */
export type DateDisplayFormat = "long" | "numeric";

/** 12 = am/pm, 24 = 24-hour clock */
export type HourCycle = 12 | 24;

/** Convert input to a valid Date, or null if invalid (safe for UI). */
function toValidDate(input: DateInput): Date | null {
  const date = input instanceof Date ? input : new Date(input);
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * USE CASE: Get the user's IANA timezone (e.g. "Asia/Karachi").
 *
 * HOW TO USE:
 *   getUserTimeZone() // → "Asia/Karachi"
 */
export function getUserTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * USE CASE: Show a date in the user's local timezone.
 *
 * HOW TO USE:
 *   formatDate("2026-07-27T15:45:00Z")
 *   // → "27 July, 2026"  (in Asia/Karachi etc.)
 *
 *   formatDate(date, { format: "numeric" })
 *   // → "27-07-2026"
 *
 *   formatDate(date, { timeZone: "UTC" }) // force a zone
 *
 * Invalid dates return "" (won't crash the UI).
 */
export function formatDate(
  input: DateInput,
  options: { format?: DateDisplayFormat; timeZone?: string } = {},
): string {
  const date = toValidDate(input);
  if (!date) return "";

  const format = options.format ?? "long";
  const timeZone = options.timeZone ?? getUserTimeZone();

  const parts = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: format === "long" ? "long" : "2-digit",
    year: "numeric",
    timeZone,
  }).formatToParts(date);

  const day = parts.find((p) => p.type === "day")?.value ?? "";
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const year = parts.find((p) => p.type === "year")?.value ?? "";

  if (format === "numeric") return `${day}-${month}-${year}`;

  // "27 July, 2026"
  return `${Number(day)} ${month}, ${year}`;
}

/**
 * USE CASE: Show a time in the user's local timezone (12h or 24h).
 *
 * HOW TO USE:
 *   formatTime(date, { hourCycle: 12 }) // → "8:45 pm"
 *   formatTime(date, { hourCycle: 24 }) // → "20:45"
 *   formatTime(date, { hourCycle: 24, withSeconds: true }) // → "20:45:00"
 */
export function formatTime(
  input: DateInput,
  options: {
    hourCycle?: HourCycle;
    timeZone?: string;
    withSeconds?: boolean;
  } = {},
): string {
  const date = toValidDate(input);
  if (!date) return "";

  const hourCycle = options.hourCycle ?? 12;
  const timeZone = options.timeZone ?? getUserTimeZone();

  return new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    second: options.withSeconds ? "2-digit" : undefined,
    hour12: hourCycle === 12,
    timeZone,
  }).format(date);
}

/**
 * USE CASE: Show date + time together.
 *
 * HOW TO USE:
 *   formatDateTime(date)
 *   // → "27 July, 2026 · 8:45 pm"
 *
 *   formatDateTime(date, { dateFormat: "numeric", hourCycle: 24 })
 *   // → "27-07-2026 · 20:45"
 */
export function formatDateTime(
  input: DateInput,
  options: {
    dateFormat?: DateDisplayFormat;
    hourCycle?: HourCycle;
    timeZone?: string;
    withSeconds?: boolean;
    separator?: string;
  } = {},
): string {
  const datePart = formatDate(input, {
    format: options.dateFormat,
    timeZone: options.timeZone,
  });
  const timePart = formatTime(input, {
    hourCycle: options.hourCycle,
    timeZone: options.timeZone,
    withSeconds: options.withSeconds,
  });

  if (!datePart || !timePart) return datePart || timePart || "";
  return `${datePart}${options.separator ?? " · "}${timePart}`;
}

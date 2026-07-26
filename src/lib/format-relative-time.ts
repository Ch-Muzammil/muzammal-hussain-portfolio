import type { DateInput } from "./format-date";

const UNITS: Array<{ max: number; name: Intl.RelativeTimeFormatUnit }> = [
  { max: 60, name: "seconds" },
  { max: 60, name: "minutes" },
  { max: 24, name: "hours" },
  { max: 7, name: "days" },
  { max: 4.34524, name: "weeks" },
  { max: 12, name: "months" },
  { max: Infinity, name: "years" },
];

function toValidDate(input: DateInput): Date | null {
  const date = input instanceof Date ? input : new Date(input);
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * USE CASE: "2 hours ago", "in 1 day", "yesterday" style labels.
 *
 * HOW TO USE:
 *   formatRelativeTime(createdAt)                          // → "2 hours ago"
 *   formatRelativeTime(createdAt, { numeric: "always" })   // → "1 day ago"
 *   formatRelativeTime(createdAt, { locale: "en" })
 *
 * Invalid dates return "".
 */
export function formatRelativeTime(
  input: DateInput,
  options: {
    now?: DateInput;
    locale?: string;
    /** "auto" → "yesterday" | "always" → "1 day ago" */
    numeric?: Intl.RelativeTimeFormatNumeric;
    style?: Intl.RelativeTimeFormatStyle;
  } = {},
): string {
  const target = toValidDate(input);
  const base = toValidDate(options.now ?? Date.now());
  if (!target || !base) return "";

  let seconds = (target.getTime() - base.getTime()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(options.locale, {
    numeric: options.numeric ?? "auto",
    style: options.style ?? "long",
  });

  for (const unit of UNITS) {
    if (Math.abs(seconds) < unit.max) {
      return rtf.format(Math.round(seconds), unit.name);
    }
    seconds /= unit.max;
  }

  return rtf.format(Math.round(seconds), "years");
}

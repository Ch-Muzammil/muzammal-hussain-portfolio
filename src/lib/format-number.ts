export type NumberInput = number | string | bigint;

export type FormatNumberOptions = {
  /** e.g. "en-US", "en-PK". Default = browser locale. */
  locale?: string;
  /** Fixed decimal places (sets min + max). */
  decimals?: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  /** 1500 → "1.5K" */
  compact?: boolean;
  style?: "decimal" | "percent";
  signDisplay?: Intl.NumberFormatOptions["signDisplay"];
};

function toValidNumber(input: NumberInput): number | null {
  if (typeof input === "bigint") {
    const n = Number(input);
    return Number.isFinite(n) ? n : null;
  }
  if (typeof input === "string") {
    const n = Number(input.replace(/,/g, "").trim());
    return Number.isFinite(n) ? n : null;
  }
  return typeof input === "number" && Number.isFinite(input) ? input : null;
}

/**
 * USE CASE: Show readable numbers with thousand separators.
 *
 * HOW TO USE:
 *   formatNumber(123454)                        // → "123,454"
 *   formatNumber(123454.5, { decimals: 2 })     // → "123,454.50"
 *   formatNumber(1500, { compact: true })       // → "1.5K"
 *
 * Invalid input returns "" (won't crash the UI).
 */
export function formatNumber(
  input: NumberInput,
  options: FormatNumberOptions = {},
): string {
  const value = toValidNumber(input);
  if (value === null) return "";

  const {
    locale,
    decimals,
    minimumFractionDigits = decimals,
    maximumFractionDigits = decimals,
    compact = false,
    style = "decimal",
    signDisplay,
  } = options;

  return new Intl.NumberFormat(locale, {
    style,
    notation: compact ? "compact" : "standard",
    compactDisplay: compact ? "short" : undefined,
    minimumFractionDigits,
    maximumFractionDigits,
    signDisplay,
  }).format(value);
}

/**
 * USE CASE: Show money amounts.
 *
 * HOW TO USE:
 *   formatCurrency(123454, "USD")                 // → "$123,454.00"
 *   formatCurrency(1500, "PKR", { decimals: 0 })  // → "Rs 1,500"
 */
export function formatCurrency(
  input: NumberInput,
  currency: string,
  options: Omit<FormatNumberOptions, "style" | "compact"> & {
    currencyDisplay?: Intl.NumberFormatOptions["currencyDisplay"];
  } = {},
): string {
  const value = toValidNumber(input);
  if (value === null || !currency) return "";

  const {
    locale,
    decimals = 2,
    minimumFractionDigits = decimals,
    maximumFractionDigits = decimals,
    signDisplay,
    currencyDisplay = "symbol",
  } = options;

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay,
      minimumFractionDigits,
      maximumFractionDigits,
      signDisplay,
    }).format(value);
  } catch {
    // Invalid currency code
    return "";
  }
}

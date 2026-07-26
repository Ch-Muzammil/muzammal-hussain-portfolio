import { describe, expect, it } from "vitest";
import { formatCurrency, formatNumber } from "@/lib/format-number";

describe("formatNumber", () => {
  it("adds thousand separators", () => {
    expect(formatNumber(123454, { locale: "en-US" })).toBe("123,454");
  });

  it("formats fixed decimals", () => {
    expect(formatNumber(123454.5, { locale: "en-US", decimals: 2 })).toBe(
      "123,454.50",
    );
  });

  it("returns empty string for invalid input", () => {
    expect(formatNumber(Number.NaN)).toBe("");
    expect(formatNumber("abc")).toBe("");
  });
});

describe("formatCurrency", () => {
  it("formats USD", () => {
    expect(formatCurrency(123454, "USD", { locale: "en-US" })).toBe(
      "$123,454.00",
    );
  });

  it("formats PKR amount", () => {
    const value = formatCurrency(1500, "PKR", { locale: "en-PK", decimals: 0 });
    expect(value.includes("1,500") || value.includes("1500")).toBe(true);
  });

  it("returns empty string for invalid currency", () => {
    expect(formatCurrency(10, "")).toBe("");
  });
});

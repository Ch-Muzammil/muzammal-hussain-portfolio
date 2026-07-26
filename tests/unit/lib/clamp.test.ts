import { describe, expect, it } from "vitest";
import { clamp } from "@/lib/clamp";

describe("clamp", () => {
  it("clamps above max", () => {
    expect(clamp(150, 0, 100)).toBe(100);
  });

  it("clamps below min", () => {
    expect(clamp(-5, 0, 100)).toBe(0);
  });

  it("passes through in range", () => {
    expect(clamp(42, 0, 100)).toBe(42);
  });

  it("throws when min > max", () => {
    expect(() => clamp(1, 10, 0)).toThrow(RangeError);
  });

  it("throws on non-finite numbers", () => {
    expect(() => clamp(Number.NaN, 0, 1)).toThrow(RangeError);
  });
});

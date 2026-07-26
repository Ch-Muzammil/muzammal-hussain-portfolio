import { describe, expect, it } from "vitest";
import {
  isPasswordValid,
  validatePassword,
} from "@/lib/password-validation";

describe("password-validation", () => {
  it("rejects empty and weak passwords", () => {
    expect(isPasswordValid("")).toBe(false);
    expect(isPasswordValid("short")).toBe(false);
    expect(isPasswordValid("alllowercase1!")).toBe(false);
    expect(isPasswordValid("ALLUPPERCASE1!")).toBe(false);
    expect(isPasswordValid("NoNumber!")).toBe(false);
    expect(isPasswordValid("NoSpecial1")).toBe(false);
  });

  it("accepts a strong password", () => {
    const value = "Str0ng!Pass";
    const result = validatePassword(value);
    expect(result.ok).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.checks.every((c) => c.passed)).toBe(true);
  });

  it("reports which checks failed", () => {
    const result = validatePassword("abc");
    expect(result.ok).toBe(false);
    expect(result.checks.some((c) => c.id === "minLength" && !c.passed)).toBe(
      true,
    );
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("allows disabling special-char rule", () => {
    expect(isPasswordValid("Str0ngPass", { requireSpecial: false })).toBe(true);
  });
});

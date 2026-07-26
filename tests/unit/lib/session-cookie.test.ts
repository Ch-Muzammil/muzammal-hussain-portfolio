import { afterEach, describe, expect, it, vi } from "vitest";
import {
  clearRoleCookie,
  ROLE_COOKIE,
  setRoleCookie,
} from "@/lib/auth/session-cookie";

describe("session-cookie", () => {
  afterEach(() => {
    document.cookie = `${ROLE_COOKIE}=; path=/; Max-Age=0`;
  });

  it("sets the role hint cookie", () => {
    setRoleCookie("admin");
    expect(document.cookie).toContain(`${ROLE_COOKIE}=admin`);
  });

  it("clears the role hint cookie", () => {
    setRoleCookie("freelancer");
    clearRoleCookie();
    expect(document.cookie).not.toContain(`${ROLE_COOKIE}=freelancer`);
  });

  it("no-ops when document is unavailable", () => {
    const original = globalThis.document;
    vi.stubGlobal("document", undefined);

    expect(() => setRoleCookie("client")).not.toThrow();
    expect(() => clearRoleCookie()).not.toThrow();

    vi.stubGlobal("document", original);
  });
});

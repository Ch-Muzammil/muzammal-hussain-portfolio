import { describe, expect, it } from "vitest";
import { PUBLIC_NAV, ROLE_NAV } from "@/config/nav";
import { ROLES } from "@/config/roles";

describe("nav config", () => {
  it("has nav for every role", () => {
    for (const role of ROLES) {
      expect(ROLE_NAV[role].length).toBeGreaterThan(0);
      for (const item of ROLE_NAV[role]) {
        expect(item.href.startsWith(`/${role}`)).toBe(true);
        expect(item.label.length).toBeGreaterThan(0);
      }
    }
  });

  it("exposes public nav links", () => {
    expect(PUBLIC_NAV.map((item) => item.href)).toEqual([
      "/#work",
      "/#about",
      "/#contact",
    ]);
  });
});

import { describe, expect, it } from "vitest";
import {
  getHomeRouteForRole,
  isUserRole,
  ROLE_HOME,
  ROLES,
} from "@/config/roles";

describe("roles config", () => {
  it("lists expected roles", () => {
    expect(ROLES).toEqual(["admin", "freelancer", "client"]);
  });

  it("maps each role to a home route", () => {
    for (const role of ROLES) {
      expect(getHomeRouteForRole(role)).toBe(ROLE_HOME[role]);
      expect(ROLE_HOME[role]).toMatch(new RegExp(`^/${role}/`));
    }
  });

  it("type-guards role strings", () => {
    expect(isUserRole("admin")).toBe(true);
    expect(isUserRole("client")).toBe(true);
    expect(isUserRole("guest")).toBe(false);
    expect(isUserRole(undefined)).toBe(false);
    expect(isUserRole(null)).toBe(false);
  });
});

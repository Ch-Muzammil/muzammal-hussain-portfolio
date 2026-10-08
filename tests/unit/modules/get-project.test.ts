import { describe, expect, it } from "vitest";
import {
  getCompactProjects,
  getFeaturedProjects,
  getProjectBySlug,
} from "@/modules/portfolio";

describe("get-project", () => {
  it("returns featured projects in list order", () => {
    expect(getFeaturedProjects().map((project) => project.slug)).toEqual([
      "sbre-connect",
      "soleya-beauty",
      "tripslice",
    ]);
  });

  it("returns the remaining projects in list order", () => {
    expect(getCompactProjects().map((project) => project.slug)).toEqual([
      "keychain",
      "mk-assist",
      "abshaar",
      "bronxton",
    ]);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProjectBySlug("missing-project")).toBeUndefined();
  });
});

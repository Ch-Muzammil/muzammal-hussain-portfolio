import { describe, expect, it } from "vitest";
import { ApiError } from "@/lib/api/api-error";

describe("ApiError", () => {
  it("stores status, code, and field errors", () => {
    const err = new ApiError("Invalid", 422, "VALIDATION", {
      email: ["Required"],
    });

    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe("ApiError");
    expect(err.message).toBe("Invalid");
    expect(err.status).toBe(422);
    expect(err.code).toBe("VALIDATION");
    expect(err.fieldErrors).toEqual({ email: ["Required"] });
  });

  it("defaults status to 500", () => {
    const err = new ApiError("Boom");
    expect(err.status).toBe(500);
    expect(err.code).toBeUndefined();
  });
});

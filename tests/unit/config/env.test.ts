import { describe, expect, it } from "vitest";
import { env } from "@/config/env";

describe("env", () => {
  it("exposes api and socket urls", () => {
    expect(typeof env.apiUrl).toBe("string");
    expect(typeof env.socketUrl).toBe("string");
    expect(typeof env.appEnv).toBe("string");
  });
});

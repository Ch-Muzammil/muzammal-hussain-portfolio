import { describe, expect, it } from "vitest";
import { formatDate, formatDateTime, formatTime } from "@/lib/format-date";
import { formatRelativeTime } from "@/lib/format-relative-time";

describe("formatDate / formatTime", () => {
  const iso = "2026-07-27T15:45:00.000Z";
  const zone = "Asia/Karachi";

  it("formats long date", () => {
    expect(formatDate(iso, { format: "long", timeZone: zone })).toBe(
      "27 July, 2026",
    );
  });

  it("formats numeric date", () => {
    expect(formatDate(iso, { format: "numeric", timeZone: zone })).toBe(
      "27-07-2026",
    );
  });

  it("formats 12h and 24h time", () => {
    expect(formatTime(iso, { hourCycle: 12, timeZone: zone })).toBe("8:45 pm");
    expect(formatTime(iso, { hourCycle: 24, timeZone: zone })).toBe("20:45");
  });

  it("formats date time together", () => {
    expect(
      formatDateTime(iso, { timeZone: zone, hourCycle: 24 }),
    ).toBe("27 July, 2026 · 20:45");
  });

  it("returns empty string for invalid date", () => {
    expect(formatDate("not-a-date")).toBe("");
    expect(formatTime("not-a-date")).toBe("");
  });
});

describe("formatRelativeTime", () => {
  const now = Date.parse("2026-07-27T12:00:00.000Z");

  it("formats hours ago", () => {
    expect(
      formatRelativeTime(now - 2 * 60 * 60 * 1000, {
        now,
        locale: "en",
        numeric: "always",
      }),
    ).toBe("2 hours ago");
  });

  it("formats future day", () => {
    expect(
      formatRelativeTime(now + 24 * 60 * 60 * 1000, {
        now,
        locale: "en",
        numeric: "always",
      }),
    ).toBe("in 1 day");
  });

  it("returns empty string for invalid date", () => {
    expect(formatRelativeTime("bad")).toBe("");
  });
});

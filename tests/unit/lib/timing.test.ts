import { afterEach, describe, expect, it, vi } from "vitest";
import { debounce } from "@/lib/debounce";
import { throttle } from "@/lib/throttle";
import { sleep } from "@/lib/sleep";
import { copyToClipboard } from "@/lib/copy-to-clipboard";

describe("debounce", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("runs only after wait, with latest args", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const d = debounce(fn, 300);

    d("a");
    d("b");
    d("c");
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("c");
  });

  it("cancel prevents run; flush runs immediately", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const d = debounce(fn, 300);

    d("x");
    d.cancel();
    vi.advanceTimersByTime(300);
    expect(fn).not.toHaveBeenCalled();

    d("y");
    d.flush();
    expect(fn).toHaveBeenCalledWith("y");
  });
});

describe("throttle", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("runs immediately then ignores until window opens", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const t = throttle(fn, 100);

    t(1);
    t(2);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(2);
  });
});

describe("sleep", () => {
  it("resolves after delay", async () => {
    vi.useFakeTimers();
    const p = sleep(50);
    vi.advanceTimersByTime(50);
    await expect(p).resolves.toBeUndefined();
    vi.useRealTimers();
  });
});

describe("copyToClipboard", () => {
  it("returns false when clipboard API is unavailable", async () => {
    const original = globalThis.navigator;
    Object.defineProperty(globalThis, "navigator", {
      value: {},
      configurable: true,
    });

    await expect(copyToClipboard("hello")).resolves.toBe(false);
    await expect(copyToClipboard("")).resolves.toBe(false);

    Object.defineProperty(globalThis, "navigator", {
      value: original,
      configurable: true,
    });
  });
});

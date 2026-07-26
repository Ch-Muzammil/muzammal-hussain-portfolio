"use client";

import {
  useCallback,
  useRef,
  useSyncExternalStore,
  type Dispatch,
  type SetStateAction,
} from "react";

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // private mode / quota exceeded — ignore
  }
}

function removeJson(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

/** Same-tab updates (storage event only fires across tabs). */
function notify(key: string) {
  window.dispatchEvent(new Event(`local-storage:${key}`));
}

/**
 * USE CASE: Remember UI prefs across reloads (theme, sidebar open, etc.).
 *
 * HOW TO USE:
 *   const [collapsed, setCollapsed, clear] = useLocalStorage(
 *     "sidebar:collapsed",
 *     false,
 *   )
 *
 * Never store access tokens or secrets here.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>, () => void] {
  // Cache snapshot so useSyncExternalStore gets a stable reference when unchanged.
  const cacheRef = useRef<{ key: string; raw: string | null; value: T } | null>(
    null,
  );

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const onStorage = (event: StorageEvent) => {
        if (event.storageArea !== window.localStorage) return;
        if (event.key !== key && event.key != null) return;
        onStoreChange();
      };
      const onLocal = () => onStoreChange();

      window.addEventListener("storage", onStorage);
      window.addEventListener(`local-storage:${key}`, onLocal);
      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(`local-storage:${key}`, onLocal);
      };
    },
    [key],
  );

  const getSnapshot = useCallback(() => {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(key);
    } catch {
      return initialValue;
    }

    const cached = cacheRef.current;
    if (cached && cached.key === key && cached.raw === raw) {
      return cached.value;
    }

    const value =
      raw == null ? initialValue : (() => {
        try {
          return JSON.parse(raw) as T;
        } catch {
          return initialValue;
        }
      })();

    cacheRef.current = { key, raw, value };
    return value;
  }, [key, initialValue]);

  const getServerSnapshot = useCallback(() => initialValue, [initialValue]);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback<Dispatch<SetStateAction<T>>>(
    (action) => {
      const prev = readJson(key, initialValue);
      const next =
        typeof action === "function"
          ? (action as (prevState: T) => T)(prev)
          : action;
      writeJson(key, next);
      cacheRef.current = null;
      notify(key);
    },
    [key, initialValue],
  );

  const clear = useCallback(() => {
    removeJson(key);
    cacheRef.current = null;
    notify(key);
  }, [key]);

  return [value, setValue, clear];
}

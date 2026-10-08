"use client";

import { useEffect } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { THEME_STORAGE_KEY } from "./theme-script";

type ThemeChoice = "dark" | "light";

/**
 * Switches the public site between espresso and cream.
 * The choice is a UI preference, not a secret.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<ThemeChoice>(
    THEME_STORAGE_KEY,
    "dark",
  );
  const isDark = theme !== "light";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex size-11 items-center justify-center rounded-md text-foreground transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

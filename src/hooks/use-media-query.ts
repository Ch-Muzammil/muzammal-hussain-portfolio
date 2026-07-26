"use client";

import { useEffect, useState } from "react";

/**
 * USE CASE: Respond to screen size / prefers-color-scheme in JS.
 *
 * HOW TO USE:
 *   const isDesktop = useMediaQuery("(min-width: 1024px)")
 *   const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")
 *
 *   {isDesktop ? <DesktopNav /> : <MobileNav />}
 *
 * Returns false during SSR / before mount (hydration-safe).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

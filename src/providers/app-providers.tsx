"use client";

import { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/Tooltip";
import { useAuthStore } from "@/store/auth-store";
import { refreshAccessToken } from "@/lib/auth/session";

/**
 * On app load, attempt silent session restore (access token is memory-only).
 * Refresh is stubbed until /auth/refresh is wired — then this becomes real.
 */
function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const setHasHydrated = useAuthStore((s) => s.setHasHydrated);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      try {
        const result = await refreshAccessToken();
        if (cancelled) return;

        if (result.status === "success" && result.tokens.accessToken) {
          setAccessToken(result.tokens.accessToken);
          // User profile should be loaded by modules/auth when refresh is real
        }
      } finally {
        if (!cancelled) setHasHydrated(true);
      }
    }

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, [setAccessToken, setHasHydrated]);

  return children;
}

/**
 * Root client providers. Add QueryClient / Theme here later if needed.
 *
 * HOW TO USE: wrap children in app/layout.tsx
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delay={200}>
      <AuthBootstrap>{children}</AuthBootstrap>
    </TooltipProvider>
  );
}

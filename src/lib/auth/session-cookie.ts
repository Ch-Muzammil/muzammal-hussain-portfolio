import type { UserRole } from "@/config/roles";

/** Cookie used only for proxy/route guards — never store the access JWT here. */
export const ROLE_COOKIE = "app_role";

/**
 * Set role hint cookie so `proxy.ts` can protect /admin|/freelancer|/client.
 * Call from the client after login (auth-store.setSession does this).
 */
export function setRoleCookie(role: UserRole): void {
  if (typeof document === "undefined") return;
  document.cookie = `${ROLE_COOKIE}=${role}; path=/; SameSite=Lax`;
}

export function clearRoleCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${ROLE_COOKIE}=; path=/; Max-Age=0; SameSite=Lax`;
}

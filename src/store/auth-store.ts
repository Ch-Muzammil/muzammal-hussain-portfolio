import { create } from "zustand";
import type { UserRole } from "@/config/roles";
import { clearRoleCookie, setRoleCookie } from "@/lib/auth/session-cookie";

/**
 * Auth session store (in-memory access token).
 *
 * HOW TO USE:
 *   const user = useAuthStore((s) => s.user)
 *   useAuthStore.getState().setSession({ accessToken, user })
 *   useAuthStore.getState().clearSession()
 *   useAuthStore.getState().getAccessToken()
 *
 * ⚠️ Do NOT persist the access token with Zustand persist.
 * A lightweight `app_role` cookie is set for proxy route guards only (not the JWT).
 */

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  /** True after first client bootstrap attempt finished */
  hasHydrated: boolean;

  getAccessToken: () => string | null;
  setSession: (payload: { accessToken: string; user: AuthUser }) => void;
  setAccessToken: (token: string | null) => void;
  clearSession: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,
  hasHydrated: false,

  getAccessToken: () => get().accessToken,

  setSession: ({ accessToken, user }) => {
    set({
      accessToken,
      user,
      isAuthenticated: true,
    });
    setRoleCookie(user.role);
  },

  setAccessToken: (accessToken) =>
    set({
      accessToken,
      isAuthenticated: Boolean(accessToken && get().user),
    }),

  clearSession: () => {
    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    });
    clearRoleCookie();
  },

  setHasHydrated: (hasHydrated) => set({ hasHydrated }),
}));

export type { UserRole };

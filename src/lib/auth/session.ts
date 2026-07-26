import { useAuthStore } from "@/store/auth-store";
import { disconnectSocket } from "@/lib/socket/socket-instance";

/**
 * Session helpers used by the axios interceptor.
 *
 * HOW TO USE (later, from modules/auth):
 *   // After login success:
 *   useAuthStore.getState().setSession({ accessToken, user })
 *   connectSocket()
 *
 *   // On logout:
 *   await logoutApi()
 *   handleSessionExpired()
 *
 * refreshAccessToken() is a STUB until the real /auth/refresh endpoint is wired.
 */

export type RefreshResult =
  | {
      status: "success";
      tokens: { accessToken: string };
    }
  | {
      status: "unauthorized";
      tokens: { accessToken: null };
    }
  | {
      status: "error";
      tokens: { accessToken: null };
    };

/**
 * Try to get a new access token (httpOnly refresh cookie path).
 * TODO: call POST /auth/refresh via a bare axios call (not apiClient) to avoid loops.
 */
export async function refreshAccessToken(): Promise<RefreshResult> {
  // Stub — no backend refresh yet. Interceptor will treat this as session expired.
  return {
    status: "unauthorized",
    tokens: { accessToken: null },
  };
}

/**
 * Clear client session + disconnect realtime. Call on logout or hard 401.
 */
export function handleSessionExpired(): void {
  useAuthStore.getState().clearSession();

  if (typeof window !== "undefined") {
    disconnectSocket();
  }
}

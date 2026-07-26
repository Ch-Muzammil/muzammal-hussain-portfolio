import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";
import { env } from "@/config/env";
import { useAuthStore } from "@/store/auth-store";
import {
  handleSessionExpired,
  refreshAccessToken,
} from "@/lib/auth/session";
import { reconnectSocket } from "@/lib/socket/socket-instance";

/**
 * USE CASE: Single Axios instance for all REST calls.
 *
 * HOW TO USE (from modules/<feature>/services):
 *   import { apiClient } from "@/lib/api/axios-instance"
 *
 *   export async function getProjects() {
 *     const { data } = await apiClient.get("/projects")
 *     return data
 *   }
 *
 * Features already wired:
 *   - baseURL from env.apiUrl
 *   - credentials (cookies) included
 *   - Bearer access token from auth store
 *   - silent refresh queue on 401 (stub until /auth/refresh exists)
 */

const apiClient: AxiosInstance = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  timeout: 50_000,
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (reason?: unknown) => void;
}> = [];

function processQueue(error: Error | null, token: string | null) {
  for (const entry of failedQueue) {
    if (error) entry.reject(error);
    else if (token) entry.resolve(token);
  }
  failedQueue = [];
}

const AUTH_SKIP_REFRESH_PATHS = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
  "/auth/logout",
  "/auth/forgot",
  "/auth/magic/",
];

function shouldSkipRefresh(url: string): boolean {
  return AUTH_SKIP_REFRESH_PATHS.some((path) => url.includes(path));
}

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    const method = (config.method ?? "GET").toUpperCase();
    const hasBody = !["GET", "HEAD", "DELETE"].includes(method);

    if (hasBody && !(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string }>) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    const { status } = error.response;
    const requestUrl = originalRequest.url ?? "";

    if (
      status === 401 &&
      !originalRequest._retry &&
      !shouldSkipRefresh(requestUrl)
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshed = await refreshAccessToken();

        if (refreshed.status === "success" && refreshed.tokens.accessToken) {
          useAuthStore.getState().setAccessToken(refreshed.tokens.accessToken);
          processQueue(null, refreshed.tokens.accessToken);
          reconnectSocket();
          originalRequest.headers.Authorization = `Bearer ${refreshed.tokens.accessToken}`;
          return apiClient(originalRequest);
        }

        processQueue(new Error("Refresh failed"), null);

        if (
          refreshed.status === "unauthorized" &&
          typeof window !== "undefined"
        ) {
          handleSessionExpired();
          toast.error("Your session expired. Please sign in again.");
        }

        return Promise.reject(error);
      } catch (refreshError) {
        processQueue(
          refreshError instanceof Error
            ? refreshError
            : new Error("Refresh failed"),
          null,
        );

        const refreshStatus = (refreshError as AxiosError)?.response?.status;
        if (
          (refreshStatus === 401 || refreshStatus === 403) &&
          typeof window !== "undefined"
        ) {
          handleSessionExpired();
          toast.error("Your session expired. Please sign in again.");
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export { apiClient };
export default apiClient;

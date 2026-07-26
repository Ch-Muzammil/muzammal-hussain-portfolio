/**
 * Read env vars here — never use process.env directly in the app.
 *
 * Local files (gitignored — copy from env.example):
 *   .env.development  → npm run dev
 *   .env.staging      → npm run dev:staging | build:staging | start:staging
 *   .env.production   → npm run build | start  (server default)
 */
export const env = {
  appEnv: process.env.NEXT_PUBLIC_APP_ENV ?? "development",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL ?? "",

  isDev: (process.env.NEXT_PUBLIC_APP_ENV ?? "development") === "development",
  isStaging: process.env.NEXT_PUBLIC_APP_ENV === "staging",
  isProd: process.env.NEXT_PUBLIC_APP_ENV === "production",
} as const;

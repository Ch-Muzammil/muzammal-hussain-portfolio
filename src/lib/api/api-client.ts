/**
 * Convenience re-export — prefer importing from here in module services.
 *
 * HOW TO USE:
 *   import { apiClient } from "@/lib/api/api-client"
 */
export { apiClient, default } from "./axios-instance";
export { ApiError } from "./api-error";

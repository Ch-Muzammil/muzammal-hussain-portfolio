/**
 * Role definitions + home routes.
 *
 * HOW TO USE:
 *   getHomeRouteForRole("admin") // → "/admin/dashboard"
 *   isUserRole(value)            // type guard
 *
 * Adding role #4 later:
 *   1. Extend UserRole + ROLES here
 *   2. Add home path + ROLE_PATH_PREFIX
 *   3. Add nav in config/nav.ts
 *   4. Add route group under app/
 */

export const ROLES = ["admin", "freelancer", "client"] as const;
export type UserRole = (typeof ROLES)[number];

export const ROLE_HOME: Record<UserRole, string> = {
  admin: "/admin/dashboard",
  freelancer: "/freelancer/dashboard",
  client: "/client/dashboard",
};

export const ROLE_LABEL: Record<UserRole, string> = {
  admin: "Admin",
  freelancer: "Freelancer",
  client: "Client",
};

export const ROLE_PATH_PREFIX: Record<UserRole, string> = {
  admin: "/admin",
  freelancer: "/freelancer",
  client: "/client",
};

export function getHomeRouteForRole(role: UserRole): string {
  return ROLE_HOME[role];
}

export function isUserRole(value: string | undefined | null): value is UserRole {
  return ROLES.includes(value as UserRole);
}

import type { UserRole } from "@/config/roles";

export type NavItem = {
  label: string;
  href: string;
};

/**
 * Per-role sidebar / nav links.
 *
 * HOW TO USE:
 *   import { ROLE_NAV } from "@/config/nav"
 *   const items = ROLE_NAV[user.role]
 */

export const ROLE_NAV: Record<UserRole, NavItem[]> = {
  admin: [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Users", href: "/admin/users" },
  ],
  freelancer: [
    { label: "Dashboard", href: "/freelancer/dashboard" },
    { label: "Projects", href: "/freelancer/projects" },
  ],
  client: [{ label: "Dashboard", href: "/client/dashboard" }],
};

export const PUBLIC_NAV: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

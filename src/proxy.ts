import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getHomeRouteForRole,
  isUserRole,
  ROLE_PATH_PREFIX,
  type UserRole,
} from "@/config/roles";
import { ROLE_COOKIE } from "@/lib/auth/session-cookie";

const AUTH_PATHS = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

function isAuthPath(pathname: string): boolean {
  return AUTH_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function roleForPath(pathname: string): UserRole | null {
  for (const role of Object.keys(ROLE_PATH_PREFIX) as UserRole[]) {
    const prefix = ROLE_PATH_PREFIX[role];
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return role;
    }
  }
  return null;
}

/**
 * Light route protection using the `app_role` cookie (not the JWT).
 * Access token stays in memory; this cookie is only a role hint for redirects.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const roleCookie = request.cookies.get(ROLE_COOKIE)?.value;
  const role = isUserRole(roleCookie) ? roleCookie : null;

  // Logged-in users shouldn't sit on login/signup
  if (role && isAuthPath(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = getHomeRouteForRole(role);
    return NextResponse.redirect(url);
  }

  const requiredRole = roleForPath(pathname);
  if (requiredRole) {
    if (!role) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    if (role !== requiredRole) {
      const url = request.nextUrl.clone();
      url.pathname = getHomeRouteForRole(role);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

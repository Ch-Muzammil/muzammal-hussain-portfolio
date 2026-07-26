"use client";

import Link from "next/link";
import { handleSessionExpired } from "@/lib/auth/session";

export function SignOutLink() {
  return (
    <Link
      href="/login"
      className="text-xs text-muted-foreground hover:text-foreground"
      onClick={() => {
        handleSessionExpired();
      }}
    >
      Sign out
    </Link>
  );
}

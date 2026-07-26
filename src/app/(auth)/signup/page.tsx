import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { SignupForm } from "@/modules/auth";
import { PageLoader } from "@/components/feedback/page-loader";

export const metadata: Metadata = { title: "Sign up" };

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Sign up</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Placeholder form — wires to auth API later.
        </p>
      </div>

      <Suspense fallback={<PageLoader label="Loading form" />}>
        <SignupForm />
      </Suspense>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-foreground underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ForgotPasswordForm } from "@/modules/auth";
import { PageLoader } from "@/components/feedback/page-loader";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Forgot password
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your email and we&apos;ll send a reset link (soon).
        </p>
      </div>

      <Suspense fallback={<PageLoader label="Loading form" />}>
        <ForgotPasswordForm />
      </Suspense>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-foreground underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}

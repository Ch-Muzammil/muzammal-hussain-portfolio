import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ResetPasswordForm } from "@/modules/auth";
import { PageLoader } from "@/components/feedback/page-loader";

export const metadata: Metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Enter code</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          OTP field demo — wire to your verify/reset API later.
        </p>
      </div>

      <Suspense fallback={<PageLoader label="Loading form" />}>
        <ResetPasswordForm />
      </Suspense>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-foreground underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}

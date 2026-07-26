"use client";

import { ErrorFallback } from "@/components/feedback/error-fallback";

type ErrorPageProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function Error({ error, unstable_retry }: ErrorPageProps) {
  return <ErrorFallback error={error} onRetry={unstable_retry} />;
}

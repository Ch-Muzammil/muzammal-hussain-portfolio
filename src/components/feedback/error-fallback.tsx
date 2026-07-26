"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorFallbackProps = {
  error: Error & { digest?: string };
  onRetry: () => void;
  title?: string;
  description?: string;
};

export function ErrorFallback({
  error,
  onRetry,
  title = "Something went wrong",
  description = "An unexpected error occurred. Our team has been notified, We are on it. Please try again later.",
}: ErrorFallbackProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <p className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
          Error
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
        {error.digest ? (
          <p className="mt-4 font-mono text-xs text-zinc-400 dark:text-zinc-500">
            Ref: {error.digest}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-200 px-5 text-sm font-medium text-foreground transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}

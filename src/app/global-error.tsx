"use client";

import { Inter, Geist_Mono } from "next/font/google";
import { ErrorFallback } from "@/components/feedback/error-fallback";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

type GlobalErrorProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function GlobalError({
  error,
  unstable_retry,
}: GlobalErrorProps) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", inter.variable, geistMono.variable)}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <ErrorFallback
          error={error}
          onRetry={unstable_retry}
          title="Application error"
          description="A critical error occurred. Please try again, or return home if the problem continues."
        />
      </body>
    </html>
  );
}

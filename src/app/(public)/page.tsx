import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Base App</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Multi-role Next.js starter — admin, freelancer, and client. Sign in with
        the demo form to explore role shells.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/login" className={cn(buttonVariants())}>
          Sign in
        </Link>
        <Link
          href="/pricing"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Pricing
        </Link>
      </div>
    </main>
  );
}

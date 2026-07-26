import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p className="mt-2 text-muted-foreground">
        Placeholder about page for the public marketing group.
      </p>
    </main>
  );
}

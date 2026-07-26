import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin dashboard" };

export default function AdminDashboardPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Admin dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Protected admin area. Replace this with real widgets.
      </p>
    </>
  );
}

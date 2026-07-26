import type { Metadata } from "next";

export const metadata: Metadata = { title: "Client dashboard" };

export default function ClientDashboardPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Client dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Protected client area. Replace this with real widgets.
      </p>
    </>
  );
}

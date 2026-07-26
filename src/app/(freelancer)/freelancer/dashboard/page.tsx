import type { Metadata } from "next";

export const metadata: Metadata = { title: "Freelancer dashboard" };

export default function FreelancerDashboardPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">
        Freelancer dashboard
      </h1>
      <p className="mt-2 text-muted-foreground">
        Protected freelancer area. Replace this with real widgets.
      </p>
    </>
  );
}

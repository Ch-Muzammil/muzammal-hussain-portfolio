import type { Metadata } from "next";

export const metadata: Metadata = { title: "Projects" };

export default function FreelancerProjectsPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-2 text-muted-foreground">
        Freelancer projects placeholder. Build the projects module next.
      </p>
    </>
  );
}

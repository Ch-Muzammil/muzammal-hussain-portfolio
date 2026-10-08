import type { Project } from "../types/project";
import { ProjectCard } from "./project-card";

type ProjectsSectionProps = {
  heading: string;
  intro: string;
  featured: Project[];
  compact: Project[];
};

export function ProjectsSection({
  heading,
  intro,
  featured,
  compact,
}: ProjectsSectionProps) {
  return (
    <section id="work" className="motion-reveal scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl tracking-tight text-balance sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {intro}
        </p>
        <ul className="mt-10 grid list-none gap-6 lg:grid-cols-3 lg:gap-8">
          {featured.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} size="featured" />
            </li>
          ))}
        </ul>
        <ul className="mt-6 grid list-none gap-6 sm:grid-cols-2 lg:mt-8">
          {compact.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} size="compact" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

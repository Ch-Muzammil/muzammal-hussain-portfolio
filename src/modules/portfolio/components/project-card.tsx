import Image from "next/image";
import Link from "next/link";
import type { Project } from "../types/project";
import { ProjectFrame } from "./project-frame";

type ProjectCardProps = {
  project: Project;
  size: "featured" | "compact";
};

export function ProjectCard({ project, size }: ProjectCardProps) {
  const image = project.images[0];
  const featured = size === "featured";

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card outline-none transition-colors duration-300 hover:border-primary/50 focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {featured ? <div className="h-px bg-primary" /> : null}
      <div
        className={
          featured
            ? "relative aspect-[16/10] overflow-hidden"
            : "relative aspect-[16/9] overflow-hidden"
        }
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            sizes={
              featured
                ? "(min-width: 1024px) 33vw, 100vw"
                : "(min-width: 640px) 50vw, 100vw"
            }
          />
        ) : (
          <ProjectFrame
            name={project.name}
            className="h-full transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className={featured ? "flex flex-1 flex-col p-6" : "flex flex-1 flex-col p-5"}>
        <h3
          className={
            featured
              ? "font-heading text-2xl tracking-tight transition-colors duration-200 group-hover:text-primary sm:text-3xl"
              : "font-heading text-xl tracking-tight transition-colors duration-200 group-hover:text-primary"
          }
        >
          {project.name}
        </h3>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        <p className="mt-4 font-mono text-xs tracking-wide text-muted-foreground uppercase">
          {project.role}
        </p>
        <p className="mt-2 font-mono text-xs tracking-wide text-foreground/80">
          {project.stack.join(" · ")}
        </p>
      </div>
    </Link>
  );
}

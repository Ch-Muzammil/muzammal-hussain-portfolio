import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Project } from "../types/project";
import { ProjectFrame } from "./project-frame";

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  const frames =
    project.images.length > 0 ? project.images : [null];

  return (
    <article className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Link
            href="/#work"
            className="inline-flex h-11 items-center text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Back to work
          </Link>
          <h1 className="mt-6 font-heading text-[2.5rem] leading-[1.15] tracking-tight text-balance sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {project.summary}
          </p>
          <p className="mt-6 font-mono text-xs tracking-wide text-muted-foreground uppercase">
            {project.role}
          </p>
          <p className="mt-2 font-mono text-xs tracking-wide text-foreground/80">
            {project.stack.join(" · ")}
          </p>
        </div>

        <div className="mt-10 max-w-2xl space-y-6">
          {frames.map((image, index) =>
            image ? (
              <div
                key={image.src}
                className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-border"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                  sizes="(min-width: 672px) 672px, 100vw"
                  priority={index === 0}
                />
              </div>
            ) : (
              <ProjectFrame
                key={project.slug}
                name={project.name}
                className="aspect-[16/10] rounded-xl border border-border transition-colors duration-300"
              />
            ),
          )}
        </div>

        <div className="mt-10 max-w-2xl space-y-8">
          <div>
            <h2 className="font-heading text-2xl tracking-tight sm:text-3xl">
              The product
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {project.description}
            </p>
          </div>
          <div>
            <h2 className="font-heading text-2xl tracking-tight sm:text-3xl">
              What I worked on
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {project.contribution}
            </p>
          </div>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              className={cn(buttonVariants(), "h-11 px-5")}
              target="_blank"
              rel="noreferrer"
            >
              View live site
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

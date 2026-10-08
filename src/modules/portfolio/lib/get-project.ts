import { projects } from "../data/projects";
import type { Project } from "../types/project";

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getCompactProjects(): Project[] {
  return projects.filter((project) => !project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

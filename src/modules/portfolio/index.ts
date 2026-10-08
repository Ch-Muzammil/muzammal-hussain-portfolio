export { AboutSection } from "./components/about-section";
export { ContactSection } from "./components/contact-section";
export { HeroSection } from "./components/hero-section";
export { ProjectDetail } from "./components/project-detail";
export { ProjectsSection } from "./components/projects-section";

export { about } from "./data/about";
export type { AboutContent } from "./data/about";
export { contact } from "./data/contact";
export type { ContactContent } from "./data/contact";
export { experience } from "./data/experience";
export type { ExperienceItem } from "./data/experience";
export { hero } from "./data/hero";
export type { HeroContent } from "./data/hero";
export { projects, workSection } from "./data/projects";
export { site } from "./data/site";

export {
  getCompactProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getProjectSlugs,
} from "./lib/get-project";

export type { Project, ProjectImage } from "./types/project";

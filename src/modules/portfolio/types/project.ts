export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  name: string;
  summary: string;
  role: string;
  stack: string[];
  featured: boolean;
  liveUrl?: string;
  description: string;
  contribution: string;
  images: ProjectImage[];
};

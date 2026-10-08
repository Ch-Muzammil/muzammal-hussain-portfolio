import type { Project } from "../types/project";

/** Edit this file to change the work section and every project. Screenshots go in public/images/projects/<slug>/. */
export const workSection = {
  heading: "Selected work",
  intro: "Three products up front, then the rest of the work.",
};

export const projects: Project[] = [
  {
    slug: "sbre-connect",
    name: "SBRE Connect",
    summary: "A full-stack product built with Next.js and Supabase.",
    role: "Full-stack",
    stack: ["Next.js", "Supabase"],
    featured: true,
    liveUrl: "https://sbreconnect.com/",
    description:
      "SBRE Connect is the product where the work went past the interface and into the backend.",
    contribution:
      "I built full-stack features with Next.js and Supabase, including the parts of the product that sit behind the screen.",
    images: [],
  },
  {
    slug: "soleya-beauty",
    name: "Soleya Beauty",
    summary: "A beauty marketplace, built on the frontend.",
    role: "Frontend",
    stack: [
      "Next.js",
      "shadcn/ui",
      "Zustand",
      "React Hook Form",
      "TanStack Query",
    ],
    featured: true,
    liveUrl: "https://app.soleyabeauty.ca/",
    description: "Soleya Beauty is a marketplace. I worked on the frontend.",
    contribution:
      "I built the interface with Next.js, including forms, client state, and the data fetching behind the screens.",
    images: [],
  },
  {
    slug: "tripslice",
    name: "TripSlice",
    summary: "A travel-planning product, built on the frontend.",
    role: "Frontend",
    stack: ["Next.js", "TanStack Query"],
    featured: true,
    liveUrl: "https://tripslice.app/",
    description:
      "TripSlice is a travel-planning product. I worked on the frontend.",
    contribution:
      "I built the interface with Next.js and TanStack Query.",
    images: [],
  },
  {
    slug: "keychain",
    name: "Keychain",
    summary: "A frontend product built with React.",
    role: "Frontend",
    stack: ["React", "Tailwind CSS", "Axios", "Zustand"],
    featured: false,
    liveUrl: "https://keychainn.com/",
    description: "Keychain is a product I worked on as a frontend engineer.",
    contribution:
      "I built the interface with React, Tailwind CSS, Axios, and Zustand.",
    images: [],
  },
  {
    slug: "mk-assist",
    name: "MK Assist",
    summary: "A frontend product built with Next.js.",
    role: "Frontend",
    stack: ["Next.js"],
    featured: false,
    liveUrl: "https://www.mkassist.co.za/",
    description: "MK Assist is a product I worked on as a frontend engineer.",
    contribution: "I built the frontend in Next.js.",
    images: [],
  },
  {
    slug: "abshaar",
    name: "Abshaar",
    summary: "A frontend product built with React.",
    role: "Frontend",
    stack: ["React", "Tailwind CSS"],
    featured: false,
    liveUrl: "https://app.abshaar.com/",
    description: "Abshaar is a product I worked on as a frontend engineer.",
    contribution: "I built the interface with React and Tailwind CSS.",
    images: [],
  },
  {
    slug: "bronxton",
    name: "Bronxton",
    summary: "A frontend product. The stack is still to confirm.",
    role: "Frontend",
    stack: ["Stack to confirm"],
    featured: false,
    liveUrl: "https://app.bronxton.com/",
    description: "Bronxton is a product I worked on as a frontend engineer.",
    contribution:
      "I worked on the frontend. The exact stack is still to confirm.",
    images: [],
  },
];

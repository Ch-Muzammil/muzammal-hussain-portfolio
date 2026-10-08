/**
 * Replace each entry with the real place, role, exact dates, and one line
 * about what shipped. The resume should keep the exact dates.
 */
export const experience = [
  {
    place: "Client and product work",
    role: "Frontend engineer",
    dates: "3 years",
    summary: "Production interfaces across the projects on this site.",
  },
  {
    place: "SBRE Connect",
    role: "Full-stack",
    dates: "About a year",
    summary: "Next.js and Supabase, from the interface through to the data.",
  },
];

export type ExperienceItem = (typeof experience)[number];

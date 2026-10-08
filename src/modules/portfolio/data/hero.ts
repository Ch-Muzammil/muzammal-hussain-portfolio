/** Edit this file to change the hero. Swap portrait.src to use another file in public/images/profile. */
export const hero = {
  eyebrow: "Frontend engineer",
  headline: "I build web products that are clear, fast, and easy to use.",
  support:
    "Three years on the frontend, and about a year of full-stack work with Next.js and Supabase.",
  portrait: {
    src: "/images/profile/muzammal-hussain-hero-cutout.png",
    alt: "Portrait of Muzammal Hussain",
  },
  stack: ["React", "TypeScript", "Next.js", "Supabase"],
  workLabel: "View work",
  workHref: "/#work",
  resumeLabel: "Resume",
};

export type HeroContent = typeof hero;

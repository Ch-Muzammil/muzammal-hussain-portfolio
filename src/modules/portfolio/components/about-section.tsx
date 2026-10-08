import type { AboutContent } from "../data/about";
import type { ExperienceItem } from "../data/experience";

type AboutSectionProps = {
  about: AboutContent;
  experience: ExperienceItem[];
};

export function AboutSection({ about, experience }: AboutSectionProps) {
  return (
    <section id="about" className="motion-reveal scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl tracking-tight text-balance sm:text-4xl">
          {about.heading}
        </h2>
        <div className="mt-6 max-w-2xl space-y-4">
          {about.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <ul className="mt-10 max-w-2xl list-none space-y-6 border-t border-border pt-8">
          {experience.map((item) => (
            <li key={`${item.place}-${item.role}`}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-heading text-xl tracking-tight">
                  {item.place}
                </p>
                <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                  {item.dates}
                </p>
              </div>
              <p className="mt-1 text-sm font-medium text-foreground">
                {item.role}
              </p>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {item.summary}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

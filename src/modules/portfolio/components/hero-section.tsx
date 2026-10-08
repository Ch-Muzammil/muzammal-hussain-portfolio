import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { ContactContent } from "../data/contact";
import type { HeroContent } from "../data/hero";

type HeroSectionProps = {
  hero: HeroContent;
  contact: ContactContent;
};

const textLinkClass =
  "inline-flex h-11 items-center text-sm font-medium text-foreground underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

export function HeroSection({ hero, contact }: HeroSectionProps) {
  const socials = [
    contact.githubUrl
      ? { href: contact.githubUrl, label: contact.githubLabel }
      : null,
    contact.linkedinUrl
      ? { href: contact.linkedinUrl, label: contact.linkedinLabel }
      : null,
  ].filter((item) => item !== null);

  return (
    <section className="py-16 sm:py-24">
      <div className="motion-enter mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
          {hero.eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl font-heading text-[2.5rem] leading-[1.15] tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {hero.support}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={hero.workHref}
            className={cn(buttonVariants(), "h-11 px-5")}
          >
            {hero.workLabel}
          </Link>
          {contact.resumeUrl ? (
            <a
              href={contact.resumeUrl}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-11 px-5",
              )}
            >
              {hero.resumeLabel}
            </a>
          ) : null}
        </div>
        {socials.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-x-5">
            {socials.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={textLinkClass}
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            ))}
          </div>
        ) : null}
        <p className="mt-8 font-mono text-xs tracking-wide text-muted-foreground uppercase">
          {hero.stack.join(" · ")}
        </p>
      </div>
    </section>
  );
}

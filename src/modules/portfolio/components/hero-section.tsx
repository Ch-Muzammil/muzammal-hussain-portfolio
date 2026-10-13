import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { ContactContent } from "../data/contact";
import type { HeroContent } from "../data/hero";
import { SocialMark } from "./social-mark";

type HeroSectionProps = {
  hero: HeroContent;
  contact: ContactContent;
};

const textLinkClass =
  "inline-flex h-11 items-center gap-2 text-sm font-medium text-foreground underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

export function HeroSection({ hero, contact }: HeroSectionProps) {
  const socials = [
    contact.githubUrl
      ? {
          href: contact.githubUrl,
          label: contact.githubLabel,
          kind: "github" as const,
        }
      : null,
    contact.linkedinUrl
      ? {
          href: contact.linkedinUrl,
          label: contact.linkedinLabel,
          kind: "linkedin" as const,
        }
      : null,
  ].filter((item) => item !== null);

  return (
    <section className="pt-12 sm:pt-16 lg:pt-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 sm:gap-10 sm:px-6 lg:px-8 xl:grid-cols-[auto_minmax(17rem,1fr)] xl:gap-16">
        <div className="motion-enter pb-12 sm:pb-14 xl:pb-8">
          <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
            {hero.eyebrow}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">{hero.availability}</p>
          <h1 className="mt-5 max-w-xl font-heading text-[2.5rem] leading-[1.1] tracking-tight text-balance sm:text-[2.75rem] xl:max-w-none xl:text-[3.375rem] xl:leading-[1.08]">
            <span className="xl:hidden">{hero.headline}</span>
            {hero.headlineLines.map((line) => (
              <span key={line} className="hidden whitespace-nowrap xl:block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            {hero.support}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={hero.workHref}
              className={cn(
                buttonVariants(),
                "h-12 px-5 hover:-translate-y-px",
              )}
            >
              {hero.workLabel}
            </Link>
            {contact.resumeUrl ? (
              <a
                href={contact.resumeUrl}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 px-5 hover:-translate-y-px",
                )}
              >
                {hero.resumeLabel}
              </a>
            ) : null}
          </div>
          {socials.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-x-5">
              {socials.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={textLinkClass}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialMark kind={item.kind} />
                  {item.label}
                </a>
              ))}
            </div>
          ) : null}
          <p className="mt-9 font-mono text-sm tracking-[0.12em] text-muted-foreground uppercase">
            {hero.stack.join(" · ")}
          </p>
        </div>
        {hero.portrait.src ? (
          <div className="relative mx-auto w-64 sm:w-80 xl:w-[28rem] xl:justify-self-end">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[-8%] top-[12%] -bottom-2 z-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--primary)_16%,transparent),transparent_68%)]"
            />
            <Image
              src={hero.portrait.src}
              alt={hero.portrait.alt}
              width={1122}
              height={1402}
              preload
              sizes="(min-width: 1280px) 448px, 320px"
              className="motion-enter-late relative z-10 block h-auto w-full object-contain"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

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
      <div className="mx-auto grid w-full max-w-6xl items-end gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[minmax(0,56fr)_minmax(16rem,44fr)] lg:gap-14 lg:px-8">
        <div className="motion-enter pb-12 sm:pb-14 lg:pb-16">
          <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl font-heading text-[2.5rem] leading-[1.12] tracking-tight text-balance sm:text-[2.75rem] lg:text-[3.5rem] xl:text-[3.75rem]">
            {hero.headline}
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
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
          <p className="mt-9 font-mono text-xs tracking-wide text-muted-foreground uppercase">
            {hero.stack.join(" · ")}
          </p>
        </div>
        {hero.portrait.src ? (
          <Image
            src={hero.portrait.src}
            alt={hero.portrait.alt}
            width={1122}
            height={1402}
            preload
            sizes="(min-width: 1024px) 40vw, 288px"
            className="motion-enter-late relative z-10 -mb-px block h-auto w-64 object-contain sm:w-72 lg:w-full"
          />
        ) : null}
      </div>
    </section>
  );
}

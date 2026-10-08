import type { ContactContent } from "../data/contact";
import { SocialMark } from "./social-mark";

type ContactSectionProps = {
  contact: ContactContent;
};

const linkClass =
  "inline-flex h-11 items-center gap-2 text-base text-primary underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

export function ContactSection({ contact }: ContactSectionProps) {
  const links = [
    contact.email
      ? {
          href: `mailto:${contact.email}`,
          label: contact.email,
          external: false,
          kind: null,
        }
      : null,
    contact.githubUrl
      ? {
          href: contact.githubUrl,
          label: contact.githubLabel,
          external: true,
          kind: "github" as const,
        }
      : null,
    contact.linkedinUrl
      ? {
          href: contact.linkedinUrl,
          label: contact.linkedinLabel,
          external: true,
          kind: "linkedin" as const,
        }
      : null,
    contact.resumeUrl
      ? {
          href: contact.resumeUrl,
          label: "Resume",
          external: false,
          kind: null,
        }
      : null,
  ].filter((item) => item !== null);

  return (
    <section id="contact" className="motion-reveal scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl tracking-tight text-balance sm:text-4xl">
          {contact.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {contact.intro}
        </p>
        {links.length > 0 ? (
          <ul className="mt-6 flex list-none flex-col">
            {links.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={linkClass}
                  {...(item.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {item.kind ? (
                    <SocialMark kind={item.kind} className="size-5" />
                  ) : null}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

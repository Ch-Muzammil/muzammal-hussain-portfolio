import Link from "next/link";
import { PUBLIC_NAV } from "@/config/nav";
import { contact, site } from "@/modules/portfolio";

const navLinkClass =
  "link-underline inline-flex h-11 items-center text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

const socials = [
  contact.githubUrl
    ? { href: contact.githubUrl, label: contact.githubLabel }
    : null,
  contact.linkedinUrl
    ? { href: contact.linkedinUrl, label: contact.linkedinLabel }
    : null,
].filter((item) => item !== null);

export function SiteFooter() {
  return (
    <footer className="border-t border-border transition-colors duration-300">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="font-heading text-lg tracking-tight">{site.name}</p>
        <nav className="flex flex-wrap gap-x-5" aria-label="Footer">
          {PUBLIC_NAV.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
          {socials.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={navLinkClass}
              target="_blank"
              rel="noreferrer"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

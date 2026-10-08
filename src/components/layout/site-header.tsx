import Link from "next/link";
import { PUBLIC_NAV } from "@/config/nav";
import { site } from "@/modules/portfolio";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

const navLinkClass =
  "link-underline inline-flex h-11 items-center px-3 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="truncate font-heading text-lg tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {site.name}
        </Link>
        <div className="flex items-center">
          <nav className="hidden items-center md:flex" aria-label="Primary">
            {PUBLIC_NAV.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass}>
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

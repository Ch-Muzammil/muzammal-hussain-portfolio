import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/**
 * Public portfolio chrome: sticky header, page, footer.
 */
export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col">{children}</div>
      <SiteFooter />
    </div>
  );
}

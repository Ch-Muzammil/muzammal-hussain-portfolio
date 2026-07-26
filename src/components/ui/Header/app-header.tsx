import { cn } from "@/lib/utils";

export type AppHeaderProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  leading?: React.ReactNode;
  actions?: React.ReactNode;
  sticky?: boolean;
  bordered?: boolean;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Page / app header — title, description, actions.
 * Also re-exported from Avatar helpers for convenience.
 */
export function AppHeader({
  title,
  description,
  leading,
  actions,
  sticky = false,
  bordered = true,
  className,
  children,
}: AppHeaderProps) {
  return (
    <header
      data-slot="app-header"
      className={cn(
        "flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between",
        bordered && "border-b border-border",
        sticky &&
          "sticky top-0 z-20 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80",
        className,
      )}
    >
      <div className="flex min-w-0 items-start gap-3">
        {leading}
        <div className="min-w-0">
          {title ? (
            <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
              {title}
            </h1>
          ) : null}
          {description ? (
            <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
          ) : null}
          {children}
        </div>
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </header>
  );
}

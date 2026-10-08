import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type NotFoundViewProps = {
  title?: string;
  description?: string;
};

export function NotFoundView({
  title = "Page not found",
  description = "The page you’re looking for doesn’t exist or may have been moved.",
}: NotFoundViewProps) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <p className="font-mono text-sm font-medium tracking-wide text-muted-foreground">
          404
        </p>
        <h1 className="mt-3 font-heading text-3xl tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className={cn(buttonVariants(), "h-11 px-5")}>
            Go home
          </Link>
          <Link
            href="/#work"
            className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5")}
          >
            View work
          </Link>
        </div>
      </div>
    </main>
  );
}

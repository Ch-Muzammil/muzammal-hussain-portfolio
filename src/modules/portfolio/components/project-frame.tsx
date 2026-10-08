import { cn } from "@/lib/utils";

type ProjectFrameProps = {
  name: string;
  className?: string;
};

/** Warm stand-in until a real screenshot is set on the project. */
export function ProjectFrame({ name, className }: ProjectFrameProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-end bg-muted p-5", className)}
    >
      <span className="font-heading text-2xl tracking-tight text-foreground">
        {name}
      </span>
    </div>
  );
}

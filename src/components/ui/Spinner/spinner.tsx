import { Loader2Icon } from "lucide-react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { spinnerVariants } from "./variants";

export type SpinnerProps = React.ComponentProps<"svg"> &
  VariantProps<typeof spinnerVariants> & {
    /** Accessible label. Default: "Loading" */
    label?: string;
  };

/**
 * Shadcn spinner (Loader2).
 *
 * HOW TO USE:
 *   <Spinner />
 *   <Spinner size="lg" className="text-primary" />
 */
function Spinner({
  className,
  size = "default",
  label = "Loading",
  ...props
}: SpinnerProps) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  );
}

export { Spinner, spinnerVariants };

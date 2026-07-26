import { cva } from "class-variance-authority";

/**
 * Visual styles for Input — text, email, password, etc. all share this.
 * Use type="password" | type="text" on <Input />, not separate components.
 */
export const inputVariants = cva(
  "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      size: {
        default: "h-9",
        sm: "h-8 text-sm",
        lg: "h-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

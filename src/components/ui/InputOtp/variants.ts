import { cva, type VariantProps } from "class-variance-authority";

export const inputOtpSlotVariants = cva(
  "relative flex items-center justify-center border-y border-r border-input text-base font-medium shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-3 data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40",
  {
    variants: {
      size: {
        default: "h-12 w-11 sm:w-12",
        sm: "h-9 w-9 text-sm",
        lg: "h-14 w-12 sm:w-14 text-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export type InputOtpSlotVariantProps = VariantProps<typeof inputOtpSlotVariants>;

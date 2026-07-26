import { cva, type VariantProps } from "class-variance-authority";

export const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      default: "size-5",
      lg: "size-8",
      xl: "size-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export type SpinnerSize = NonNullable<
  VariantProps<typeof spinnerVariants>["size"]
>;

import { cva, type VariantProps } from "class-variance-authority";

export const skeletonVariants = cva("animate-pulse bg-muted", {
  variants: {
    shape: {
      rect: "rounded-md",
      circle: "rounded-full",
      text: "rounded-md h-4",
    },
  },
  defaultVariants: {
    shape: "rect",
  },
});

export type SkeletonShape = NonNullable<
  VariantProps<typeof skeletonVariants>["shape"]
>;

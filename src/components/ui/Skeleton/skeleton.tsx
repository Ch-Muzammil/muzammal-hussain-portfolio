import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { skeletonVariants } from "./variants";

export type SkeletonProps = React.ComponentProps<"div"> &
  VariantProps<typeof skeletonVariants>;

/**
 * Base shadcn skeleton pulse block.
 *
 * HOW TO USE:
 *   <Skeleton className="h-4 w-32" />
 *   <Skeleton shape="circle" className="size-10" />
 */
function Skeleton({ className, shape = "rect", ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonVariants({ shape }), className)}
      {...props}
    />
  );
}

export type SkeletonGroupProps = {
  /** Number of skeleton items to render */
  count?: number;
  /** Shape per item */
  shape?: VariantProps<typeof skeletonVariants>["shape"];
  /** Classes applied to each skeleton */
  itemClassName?: string;
  /** Wrapper layout — default stacks vertically */
  className?: string;
  /** Optional fixed width (number = px) */
  width?: number | string;
  /** Optional fixed height (number = px) */
  height?: number | string;
  /** Gap between items */
  gap?: "sm" | "default" | "lg";
};

const GAP: Record<NonNullable<SkeletonGroupProps["gap"]>, string> = {
  sm: "gap-1.5",
  default: "gap-2",
  lg: "gap-3",
};

/**
 * Dynamic skeleton group — rows, circles, text lines, etc.
 *
 * HOW TO USE:
 *   <SkeletonGroup count={5} shape="text" itemClassName="w-full" />
 *   <SkeletonGroup count={3} shape="circle" itemClassName="size-10" className="flex-row" />
 *   <SkeletonGroup count={4} height={16} width="100%" />
 */
function SkeletonGroup({
  count = 3,
  shape = "rect",
  itemClassName,
  className,
  width,
  height,
  gap = "default",
}: SkeletonGroupProps) {
  const style: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <div
      data-slot="skeleton-group"
      className={cn("flex flex-col", GAP[gap], className)}
      aria-hidden
    >
      {Array.from({ length: Math.max(0, count) }).map((_, i) => (
        <Skeleton
          key={i}
          shape={shape}
          style={style}
          className={cn(
            shape === "text" && "w-full",
            shape === "circle" && !itemClassName && "size-10",
            !height && shape === "rect" && !itemClassName && "h-4 w-full",
            itemClassName,
          )}
        />
      ))}
    </div>
  );
}

export { Skeleton, SkeletonGroup, skeletonVariants };

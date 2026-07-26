"use client";

import { cn } from "@/lib/utils";
import { Spinner, type SpinnerProps } from "./spinner";
import {
  SkeletonGroup,
  type SkeletonGroupProps,
} from "@/components/ui/Skeleton";
import { ThreeDotsBounce } from "@/components/icons/three-bouncing-dots";

export type LoaderVariant = "spinner" | "skeleton" | "dots";

export type LoaderProps = {
  /** Which loader to show. Default: spinner */
  variant?: LoaderVariant;
  /** Center in a padded container */
  centered?: boolean;
  className?: string;
  /** Passed to Spinner when variant="spinner" */
  size?: SpinnerProps["size"];
  label?: string;
  /** Passed to SkeletonGroup when variant="skeleton" */
  skeleton?: SkeletonGroupProps;
};

/**
 * Unified loading indicator — three production options.
 *
 * HOW TO USE:
 *   <Loader />                          // shadcn Spinner
 *   <Loader variant="dots" />           // three bouncing dots
 *   <Loader variant="skeleton" skeleton={{ count: 4, shape: "text" }} />
 */
export function Loader({
  variant = "spinner",
  centered = false,
  className,
  size = "default",
  label,
  skeleton,
}: LoaderProps) {
  const content =
    variant === "dots" ? (
      <ThreeDotsBounce
        className={cn("size-6 text-muted-foreground", className)}
        aria-label={label ?? "Loading"}
        role="status"
      />
    ) : variant === "skeleton" ? (
      <SkeletonGroup {...skeleton} className={cn(skeleton?.className, className)} />
    ) : (
      <Spinner size={size} label={label} className={cn("text-muted-foreground", className)} />
    );

  if (!centered) return content;

  return (
    <div
      data-slot="loader"
      className="flex w-full items-center justify-center p-6"
    >
      {content}
    </div>
  );
}

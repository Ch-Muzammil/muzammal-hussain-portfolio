"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";
import { cn } from "@/lib/utils";

/**
 * App toast host (Sonner).
 *
 * HOW TO USE (root layout once):
 *   <Toaster />
 *
 * Call sites:
 *   toast.success("Saved")
 *   toast.error("Failed")
 *   toast.info("Heads up")
 */
function Toaster({ className, toastOptions, ...props }: ToasterProps) {
  const optionClassNames = toastOptions?.classNames;

  return (
    <Sonner
      className={cn("toaster group", className)}
      position="top-right"
      richColors
      closeButton
      duration={3000}
      toastOptions={{
        ...toastOptions,
        classNames: {
          ...optionClassNames,
          toast: cn(
            "group toast",
            "group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            optionClassNames?.toast,
          ),
          description: cn(
            "group-[.toast]:text-muted-foreground",
            optionClassNames?.description,
          ),
          actionButton: cn(
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            optionClassNames?.actionButton,
          ),
          cancelButton: cn(
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            optionClassNames?.cancelButton,
          ),
          closeButton: optionClassNames?.closeButton,
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
export type { ToasterProps };

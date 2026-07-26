"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { labelVariants } from "./variants";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(labelVariants(), className)}
      {...props}
    />
  );
}

export { Label, labelVariants };

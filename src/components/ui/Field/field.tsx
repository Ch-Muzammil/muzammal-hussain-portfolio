"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/Label";

export type FieldProps = {
  /** Associates the label with the control (`htmlFor` / control `id`) */
  id?: string;
  /** When set, renders a label above the control */
  label?: React.ReactNode;
  /** When set, renders an error message under the control */
  error?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

/**
 * Optional label + error chrome around a form control.
 * Pass nothing for label/error → children render unchanged (no extra wrapper).
 */
function Field({ id, label, error, className, children }: FieldProps) {
  const hasLabel = label != null && label !== "";
  const hasError =
    error != null && error !== false && error !== "";

  if (!hasLabel && !hasError) {
    return <>{children}</>;
  }

  const errorId = id ? `${id}-error` : undefined;

  return (
    <div data-slot="field" className={cn("grid w-full min-w-0 gap-2", className)}>
      {hasLabel ? <Label htmlFor={id}>{label}</Label> : null}
      {children}
      {hasError ? (
        <p
          id={errorId}
          data-slot="field-error"
          role="alert"
          className="text-sm text-destructive"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { Field };

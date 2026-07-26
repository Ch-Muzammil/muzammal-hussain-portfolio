"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Field } from "@/components/ui/Field";
import { textareaVariants } from "./variants";

export type TextareaProps = React.ComponentProps<"textarea"> & {
  /** Optional label above the textarea */
  label?: React.ReactNode;
  /** Optional error message below the textarea */
  error?: React.ReactNode;
  fieldClassName?: string;
};

/**
 * shadcn Textarea
 *
 * HOW TO USE:
 *   <Textarea placeholder="Write something…" rows={4} />
 *   <Textarea label="Bio" error={errors.bio?.message} {...register("bio")} />
 */
function Textarea({
  className,
  label,
  error,
  fieldClassName,
  id,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  ...props
}: TextareaProps) {
  const autoId = React.useId();
  const fieldId = id ?? (label != null && label !== "" ? autoId : undefined);
  const errorId =
    error != null && error !== "" && fieldId ? `${fieldId}-error` : undefined;

  return (
    <Field id={fieldId} label={label} error={error} className={fieldClassName}>
      <textarea
        id={fieldId}
        data-slot="textarea"
        aria-invalid={ariaInvalid ?? Boolean(error)}
        aria-describedby={cn(ariaDescribedBy, errorId) || undefined}
        className={cn(textareaVariants(), className)}
        {...props}
      />
    </Field>
  );
}

export { Textarea, textareaVariants };

"use client";

import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { type VariantProps } from "class-variance-authority";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Field } from "@/components/ui/Field";
import { inputVariants } from "./variants";

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  /**
   * Leading icon (start of the field) — Mail, Search, Lock, etc.
   * Sized automatically to 1rem.
   */
  icon?: React.ReactNode;
  /**
   * For `type="password"`, show the eye toggle. Default: true.
   */
  showPasswordToggle?: boolean;
  /** Optional label above the input */
  label?: React.ReactNode;
  /** Optional error message below the input */
  error?: React.ReactNode;
  /** Class on the outer field wrapper (when label/error is used) */
  fieldClassName?: string;
}

/**
 * shadcn Input — text/email/password/number in one component.
 *
 * HOW TO USE:
 *   <Input type="email" icon={<MailIcon />} />
 *   <Input label="Email" error={errors.email?.message} {...register("email")} />
 */
function Input({
  className,
  type = "text",
  size,
  icon,
  showPasswordToggle = true,
  disabled,
  label,
  error,
  fieldClassName,
  id,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  ...props
}: InputProps) {
  const autoId = React.useId();
  const fieldId = id ?? (label != null && label !== "" ? autoId : undefined);
  const errorId =
    error != null && error !== "" && fieldId ? `${fieldId}-error` : undefined;
  const [visible, setVisible] = React.useState(false);
  const isPassword = type === "password";
  const showToggle = isPassword && showPasswordToggle;
  const inputType = isPassword && visible ? "text" : type;
  const needsWrapper = Boolean(icon) || showToggle;

  const field = (
    <InputPrimitive
      id={fieldId}
      type={inputType}
      disabled={disabled}
      data-slot="input"
      aria-invalid={ariaInvalid ?? Boolean(error)}
      aria-describedby={cn(ariaDescribedBy, errorId) || undefined}
      className={cn(
        inputVariants({ size }),
        icon && "pl-9",
        showToggle && "pr-9",
        className,
      )}
      {...props}
    />
  );

  const control = needsWrapper ? (
    <div data-slot="input-wrap" className="relative w-full min-w-0">
      {icon ? (
        <span
          data-slot="input-icon"
          className="pointer-events-none absolute top-1/2 left-2.5 z-10 flex size-4 -translate-y-1/2 items-center justify-center text-muted-foreground [&_svg]:size-4"
          aria-hidden
        >
          {icon}
        </span>
      ) : null}

      {field}

      {showToggle ? (
        <button
          type="button"
          data-slot="input-password-toggle"
          className={cn(
            "absolute top-1/2 right-1 z-10 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md",
            "text-muted-foreground hover:text-foreground",
            "outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
            "disabled:pointer-events-none disabled:opacity-50",
          )}
          disabled={disabled}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
          tabIndex={-1}
        >
          {visible ? (
            <EyeOffIcon className="size-4" />
          ) : (
            <EyeIcon className="size-4" />
          )}
        </button>
      ) : null}
    </div>
  ) : (
    field
  );

  return (
    <Field id={fieldId} label={label} error={error} className={fieldClassName}>
      {control}
    </Field>
  );
}

export { Input, inputVariants };

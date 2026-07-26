"use client";

import * as React from "react";
import { CircleCheckIcon, CircleIcon, CircleXIcon, LockIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Field } from "@/components/ui/Field";
import {
  type PasswordRulesConfig,
  validatePassword,
} from "@/lib/password-validation";
import { Input, type InputProps } from "./input";

export type PasswordFieldProps = Omit<InputProps, "type" | "icon" | "label" | "error" | "fieldClassName"> & {
  /** Leading icon — defaults to Lock */
  icon?: React.ReactNode;
  /** Override shared password policy for this field only */
  rules?: Partial<PasswordRulesConfig>;
  /**
   * When to show the live checklist dropdown.
   * - `auto` (default): while focused
   * - `always`: always visible (still overlays, does not push layout)
   * - `never`: hide checklist (still validates via util on submit)
   */
  showRules?: "auto" | "always" | "never";
  /** Called whenever validity changes (useful to enable submit) */
  onValidityChange?: (ok: boolean) => void;
  /** Optional label above the field */
  label?: React.ReactNode;
  /** Optional error message below the field */
  error?: React.ReactNode;
  fieldClassName?: string;
};

/**
 * Password field for *setting* a password (signup / reset / change).
 * Login should keep plain `<Input type="password" />`.
 *
 * Rules appear in a floating dropdown under the field (no layout shift).
 */
function PasswordField({
  className,
  icon = <LockIcon />,
  rules,
  showRules = "auto",
  onValidityChange,
  value,
  defaultValue,
  onFocus,
  onBlur,
  onChange,
  label,
  error,
  fieldClassName,
  id,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  ...props
}: PasswordFieldProps) {
  const autoId = React.useId();
  const fieldId = id ?? (label != null && label !== "" ? autoId : undefined);
  const errorId =
    error != null && error !== "" && fieldId ? `${fieldId}-error` : undefined;
  const [focused, setFocused] = React.useState(false);
  const [uncontrolled, setUncontrolled] = React.useState(
    String(defaultValue ?? ""),
  );

  const isControlled = value !== undefined;
  const current = String(isControlled ? value : uncontrolled);
  const result = validatePassword(current, rules);
  const rulesId = `${fieldId ?? "password"}-rules`;

  const showChecklist =
    showRules === "always" || (showRules === "auto" && focused);

  const describedBy = cn(
    ariaDescribedBy,
    showChecklist ? rulesId : undefined,
    errorId,
  );

  return (
    <Field id={fieldId} label={label} error={error} className={fieldClassName}>
      <div data-slot="password-field" className="relative w-full min-w-0">
        <Input
          id={fieldId}
          type="password"
          icon={icon}
          className={className}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={ariaInvalid ?? Boolean(error)}
          aria-describedby={describedBy || undefined}
          aria-expanded={showChecklist}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          onChange={(e) => {
            const next = e.target.value;
            if (!isControlled) setUncontrolled(next);
            onChange?.(e);
            onValidityChange?.(validatePassword(next, rules).ok);
          }}
          {...props}
        />

        {showChecklist ? (
          <ul
            id={rulesId}
            data-slot="password-rules"
            role="status"
            aria-live="polite"
            className={cn(
              "absolute top-full left-0 z-50 mt-1 w-full min-w-[16rem]",
              "grid gap-1.5 rounded-md border border-border bg-popover p-2.5 text-xs text-popover-foreground",
              "shadow-md ring-1 ring-foreground/10",
              "animate-in fade-in-0 zoom-in-95 duration-100",
            )}
          >
            {result.checks.map((check) => (
              <li
                key={check.id}
                className={cn(
                  "flex items-center gap-2 transition-colors",
                  check.passed ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <span
                  className="flex size-4 shrink-0 items-center justify-center [&_svg]:size-4"
                  aria-hidden
                >
                  {check.passed ? (
                    <CircleCheckIcon className="fill-emerald-600 text-white dark:fill-emerald-500" />
                  ) : current.length === 0 ? (
                    <CircleIcon className="text-muted-foreground/55" />
                  ) : (
                    <CircleXIcon className="fill-destructive text-white" />
                  )}
                </span>
                <span>{check.label}</span>
                <span className="sr-only">
                  {check.passed ? "met" : "not met"}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Field>
  );
}

export { PasswordField };

"use client";

import * as React from "react";
import {
  OTPInput,
  OTPInputContext,
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "input-otp";
import { MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  inputOtpSlotVariants,
  type InputOtpSlotVariantProps,
} from "./variants";

export type OtpLength = 4 | 6;
export type OtpSlotSize = "default" | "sm" | "lg";
/** What each slot accepts */
export type OtpCharset = "numeric" | "alpha" | "mixed";

const OTP_CHARSET_CONFIG = {
  numeric: {
    pattern: REGEXP_ONLY_DIGITS,
    inputMode: "numeric" as const,
    autoComplete: "one-time-code" as const,
    filter: (value: string) => value.replace(/\D/g, ""),
  },
  alpha: {
    pattern: REGEXP_ONLY_CHARS,
    inputMode: "text" as const,
    autoComplete: "one-time-code" as const,
    filter: (value: string) => value.replace(/[^a-zA-Z]/g, ""),
  },
  mixed: {
    pattern: REGEXP_ONLY_DIGITS_AND_CHARS,
    inputMode: "text" as const,
    autoComplete: "one-time-code" as const,
    filter: (value: string) => value.replace(/[^a-zA-Z0-9]/g, ""),
  },
} as const;

/**
 * Low-level OTP input (pass your own groups/slots).
 *
 * Prefer `InputOTPField` when you just need 4 or 6 digits.
 */
function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "cn-input-otp flex w-full items-center justify-center has-disabled:opacity-50",
        containerClassName,
      )}
      spellCheck={false}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "flex items-center rounded-md has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
  size?: OtpSlotSize;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(inputOtpSlotVariants({ size }), className)}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className={cn(
        "flex items-center px-1 text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      role="separator"
      {...props}
    >
      <MinusIcon />
    </div>
  );
}

export type InputOTPFieldProps = Omit<
  React.ComponentProps<typeof OTPInput>,
  | "maxLength"
  | "children"
  | "render"
  | "size"
  | "pattern"
  | "inputMode"
  | "pasteTransformer"
> & {
  /** Digit/slot count — builds slots + middle separator automatically */
  length?: OtpLength;
  /**
   * Allowed characters:
   * - `numeric` — 0-9 only (default)
   * - `alpha` — A-Z / a-z only
   * - `mixed` — letters + numbers
   */
  charset?: OtpCharset;
  size?: OtpSlotSize;
  containerClassName?: string;
};

/**
 * Ready-made OTP field: length + charset via props.
 *
 * HOW TO USE:
 *   <InputOTPField length={6} charset="numeric" />
 *   <InputOTPField length={4} charset="alpha" />
 *   <InputOTPField length={6} charset="mixed" />
 */
function InputOTPField({
  length = 6,
  charset = "numeric",
  size = "default",
  className,
  containerClassName,
  ...props
}: InputOTPFieldProps) {
  const half = length / 2;
  const config = OTP_CHARSET_CONFIG[charset];

  return (
    <InputOTP
      maxLength={length}
      pattern={config.pattern}
      inputMode={config.inputMode}
      autoComplete={config.autoComplete}
      pasteTransformer={config.filter}
      containerClassName={containerClassName}
      className={className}
      {...props}
    >
      <InputOTPGroup>
        {Array.from({ length: half }, (_, i) => (
          <InputOTPSlot key={i} index={i} size={size} />
        ))}
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        {Array.from({ length: half }, (_, i) => (
          <InputOTPSlot key={i + half} index={i + half} size={size} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  InputOTPField,
  inputOtpSlotVariants,
  OTP_CHARSET_CONFIG,
};

export type { InputOtpSlotVariantProps };

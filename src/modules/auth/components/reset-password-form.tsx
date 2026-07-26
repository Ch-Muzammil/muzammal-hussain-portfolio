"use client";

import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import {
  InputOTPField,
  type OtpCharset,
  type OtpLength,
} from "@/components/ui/InputOtp";
import {
  createResetPasswordSchema,
  type ResetPasswordFormValues,
} from "../schemas/reset-password-schema";

export type ResetPasswordFormProps = {
  /** Slot count. Default: 6 */
  length?: OtpLength;
  /**
   * Allowed characters. Default: `numeric`
   * - `numeric` — digits only
   * - `alpha` — letters only
   * - `mixed` — letters + digits
   */
  charset?: OtpCharset;
};

/**
 * Reset / verify OTP — RHF + Zod. Page wraps in Suspense for a consistent auth shell.
 *
 * HOW TO USE:
 *   <ResetPasswordForm />
 *   <ResetPasswordForm length={4} charset="alpha" />
 *   <ResetPasswordForm length={6} charset="mixed" />
 */
export function ResetPasswordForm({
  length = 6,
  charset = "numeric",
}: ResetPasswordFormProps) {
  const schema = useMemo(
    () => createResetPasswordSchema(length, charset),
    [length, charset],
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { otp: "" },
  });

  function onSubmit() {
    toast.info("Verify API coming soon");
  }

  return (
    <form
      className="w-full space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Controller
        name="otp"
        control={control}
        render={({ field }) => (
          <Field
            id="otp"
            label="Verification code"
            error={errors.otp?.message}
            className="justify-items-center text-center **:data-[slot=label]:w-full **:data-[slot=field-error]:w-full"
          >
            <InputOTPField
              id="otp"
              length={length}
              charset={charset}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              aria-invalid={!!errors.otp}
            />
          </Field>
        )}
      />

      <Button
        type="submit"
        fullWidth
        loading={isSubmitting}
        disabled={!isValid || isSubmitting}
      >
        Verify (soon)
      </Button>
    </form>
  );
}

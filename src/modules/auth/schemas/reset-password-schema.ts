import { z } from "zod";
import type { OtpCharset, OtpLength } from "@/components/ui/InputOtp";

const CHARSET_PATTERN: Record<OtpCharset, RegExp> = {
  numeric: /^\d+$/,
  alpha: /^[a-zA-Z]+$/,
  mixed: /^[a-zA-Z0-9]+$/,
};

const CHARSET_LABEL: Record<OtpCharset, string> = {
  numeric: "digits",
  alpha: "letters",
  mixed: "letters or numbers",
};

export function createResetPasswordSchema(
  length: OtpLength = 6,
  charset: OtpCharset = "numeric",
) {
  const pattern = CHARSET_PATTERN[charset];
  const unit = CHARSET_LABEL[charset];

  return z.object({
    otp: z
      .string()
      .min(1, "Verification code is required")
      .length(length, `Enter the ${length}-character code`)
      .regex(pattern, `Code must contain ${unit} only`),
  });
}

/** Default 6-digit numeric schema */
export const resetPasswordSchema = createResetPasswordSchema(6, "numeric");

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

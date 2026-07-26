"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../schemas/forgot-password-schema";

/**
 * Forgot password — RHF + Zod. Page wraps in Suspense for a consistent auth shell.
 */
export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: { email: "" },
  });

  function onSubmit() {
    toast.info("Reset link coming soon");
  }

  return (
    <form
      className="w-full space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Input
        id="email"
        type="email"
        label="Email"
        icon={<MailIcon />}
        placeholder="john@example.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <Button
        type="submit"
        fullWidth
        loading={isSubmitting}
        disabled={!isValid || isSubmitting}
      >
        Send reset link (soon)
      </Button>
    </form>
  );
}

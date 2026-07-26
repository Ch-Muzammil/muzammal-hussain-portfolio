"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, startOfToday } from "date-fns";
import { MailIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, PasswordField } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { DatePicker, DateTimePicker } from "@/components/ui/DatePicker";
import {
  signupSchema,
  type SignupFormValues,
} from "../schemas/signup-schema";

/**
 * Signup form — RHF + Zod. Page wraps in Suspense for a consistent auth shell.
 */
export function SignupForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      bio: "",
      availableAt: undefined,
    },
  });

  function onSubmit() {
    // Placeholder — wire to auth API later.
  }

  return (
    <form
      className="w-full space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Input
        id="name"
        type="text"
        label="Name"
        icon={<UserIcon />}
        placeholder="Your name"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        id="email"
        type="email"
        label="Email"
        placeholder="john@example.com"
        icon={<MailIcon />}
        error={errors.email?.message}
        {...register("email")}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <PasswordField
            id="password"
            label="Password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            error={errors.password?.message}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
          />
        )}
      />

      <Controller
        name="dob"
        control={control}
        render={({ field }) => (
          <DatePicker
            id="dob"
            label="Date of birth"
            value={field.value}
            onChange={field.onChange}
            placeholder="Select your birthday"
            captionLayout="dropdown"
            fromDate={new Date(1950, 0, 1)}
            toDate={new Date()}
            fullWidth
            error={errors.dob?.message}
          />
        )}
      />

      <Controller
        name="availableAt"
        control={control}
        render={({ field }) => (
          <DateTimePicker
            id="available-at"
            label="Available from"
            value={field.value}
            onChange={field.onChange}
            hourCycle={12}
            minuteStep={15}
            fromDate={startOfToday()}
            toDate={addDays(startOfToday(), 60)}
            fullWidth
            error={errors.availableAt?.message}
          />
        )}
      />

      <Textarea
        id="bio"
        label="About you"
        placeholder="Short bio (textarea demo)"
        error={errors.bio?.message}
        {...register("bio")}
      />

      <Button
        type="submit"
        fullWidth
        loading={isSubmitting}
        disabled={!isValid || isSubmitting}
      >
        Create account (soon)
      </Button>
    </form>
  );
}

import { z } from "zod";
import { isPasswordValid } from "@/lib/password-validation";

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .pipe(z.email("Enter a valid email address")),
  password: z
    .string()
    .min(1, "Password is required")
    .refine((value) => isPasswordValid(value), {
      message: "Password does not meet the requirements",
    }),
  dob: z.date({
    error: "Date of birth is required",
  }),
  availableAt: z.date().optional(),
  bio: z
    .string()
    .trim()
    .max(500, "Bio must be at most 500 characters"),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

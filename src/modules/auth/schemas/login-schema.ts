import { z } from "zod";
import { ROLES } from "@/config/roles";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .pipe(z.email("Enter a valid email address")),
  password: z.string().min(1, "Password is required"),
  role: z.enum(ROLES, { error: "Select a role" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

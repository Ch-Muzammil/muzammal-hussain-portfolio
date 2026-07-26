/**
 * Public exports for the auth module.
 * Outside code must import from here — not deep paths.
 */
export { LoginForm } from "./components/login-form";
export { SignupForm } from "./components/signup-form";
export { ForgotPasswordForm } from "./components/forgot-password-form";
export { ResetPasswordForm } from "./components/reset-password-form";
export type { ResetPasswordFormProps } from "./components/reset-password-form";

export { loginRequest } from "./services/auth-service";
export type { LoginPayload, LoginResponse } from "./services/auth-service";

export { loginSchema, type LoginFormValues } from "./schemas/login-schema";
export { signupSchema, type SignupFormValues } from "./schemas/signup-schema";
export {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "./schemas/forgot-password-schema";
export {
  resetPasswordSchema,
  createResetPasswordSchema,
  type ResetPasswordFormValues,
} from "./schemas/reset-password-schema";

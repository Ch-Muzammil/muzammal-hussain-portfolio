"use client";

import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LockIcon, MailIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Field } from "@/components/ui/Field";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/Combobox";
import { useAuthStore, type AuthUser } from "@/store/auth-store";
import {
  getHomeRouteForRole,
  ROLE_LABEL,
  ROLES,
  type UserRole,
} from "@/config/roles";
import { connectSocket } from "@/lib/socket/socket-instance";
import { loginRequest } from "../services/auth-service";
import {
  loginSchema,
  type LoginFormValues,
} from "../schemas/login-schema";

type RoleOption = { label: string; value: UserRole };

/**
 * Demo login — RHF + Zod. Uses `useSearchParams` (page must wrap in Suspense).
 */
export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setSession = useAuthStore((s) => s.setSession);

  const roleOptions = useMemo<RoleOption[]>(
    () => ROLES.map((value) => ({ value, label: ROLE_LABEL[value] })),
    [],
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "demo@example.com",
      password: "password",
      role: ROLES[0],
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      const data = await loginRequest(values);

      const user: AuthUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      };

      setSession({
        accessToken: data.accessToken,
        user,
      });
      connectSocket();

      toast.success(`Signed in as ${user.role}`);

      const next = searchParams.get("next");
      router.replace(next || getHomeRouteForRole(user.role));
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Login failed. Try again.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-4"
      noValidate
    >
      <Input
        id="email"
        type="email"
        label="Email"
        icon={<MailIcon />}
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <div className="space-y-2">
        <Input
          id="password"
          type="password"
          label="Password"
          icon={<LockIcon />}
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <p className="text-right text-sm">
          <Link
            href="/forgot-password"
            className="font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Forgot password?
          </Link>
        </p>
      </div>

      <Controller
        name="role"
        control={control}
        render={({ field }) => {
          const selected =
            roleOptions.find((o) => o.value === field.value) ?? roleOptions[0];

          return (
            <Field id="role" label="Demo role" error={errors.role?.message}>
              <Combobox
                items={roleOptions}
                value={selected}
                onValueChange={(value) => {
                  if (value) field.onChange((value as RoleOption).value);
                }}
                itemToStringValue={(item) => item.label}
              >
                <ComboboxInput
                  id="role"
                  placeholder="Search role…"
                  className="w-full"
                />
                <ComboboxContent>
                  <ComboboxEmpty>No role found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item.value} value={item}>
                        {item.label}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <p className="text-xs text-muted-foreground">
                Searchable role picker (Combobox). Swap to real API later.
              </p>
            </Field>
          );
        }}
      />

      <Button
        type="submit"
        fullWidth
        loading={isSubmitting}
        loadingText="Signing in…"
        disabled={!isValid || isSubmitting}
      >
        Sign in
      </Button>
    </form>
  );
}

import type { UserRole } from "@/config/roles";

export type LoginPayload = {
  email: string;
  password: string;
  /** Demo only — real API returns role from the server */
  role: UserRole;
};

export type LoginResponse = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
};

/**
 * Auth API calls.
 *
 * HOW TO USE:
 *   const data = await loginRequest({ email, password, role })
 *
 * Today this is a mock. Replace the body with:
 *   const { data } = await apiClient.post("/auth/login", { email, password })
 *   return data
 */
export async function loginRequest(
  payload: LoginPayload,
): Promise<LoginResponse> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (!payload.email || !payload.password) {
    throw new Error("Email and password are required");
  }

  return {
    accessToken: `demo-token-${payload.role}`,
    user: {
      id: "demo-user",
      name: "Demo User",
      email: payload.email,
      role: payload.role,
    },
  };
}

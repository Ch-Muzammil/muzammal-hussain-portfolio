import { expect, test } from "@playwright/test";

test.describe("auth routes", () => {
  test("login page shows form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  });

  test("demo login reaches admin dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("demo@example.com");
    await page.getByLabel("Password").fill("password");
    await page.getByPlaceholder("Search role…").click();
    await page.getByRole("option", { name: "Admin" }).click();
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/\/admin\/dashboard/);
    await expect(
      page.getByRole("heading", { name: "Admin dashboard" }),
    ).toBeVisible();
  });

  test("protected admin redirects to login when logged out", async ({
    page,
  }) => {
    await page.goto("/admin/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });
});

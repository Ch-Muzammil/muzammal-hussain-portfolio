import { expect, test } from "@playwright/test";

test.describe("public routes", () => {
  test("home shows brand and sign in", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Base App" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign in" }).first()).toBeVisible();
  });

  test("404 page for unknown routes", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: /page not found/i }),
    ).toBeVisible();
  });
});

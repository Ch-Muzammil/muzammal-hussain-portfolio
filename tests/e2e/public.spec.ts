import { expect, test } from "@playwright/test";

test.describe("public routes", () => {
  test("home shows the portfolio headline", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        name: "I build web products that are clear, fast, and easy to use.",
      }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign in" })).toHaveCount(0);
  });

  test("404 page for unknown routes", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: /page not found/i }),
    ).toBeVisible();
  });
});

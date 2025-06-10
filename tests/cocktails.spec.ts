import { test, expect } from "@playwright/test";

test("initial page has list of cocktails test", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("text=LIST OF COCKTAILS")).toBeVisible();
});

test("ingredients page has list of ingredients test", async ({ page }) => {
  await page.goto("/");
  await page.locator("#ingredients-button").click();
  await expect(page.locator("text=LIST OF INGREDIENTS")).toBeVisible();
});

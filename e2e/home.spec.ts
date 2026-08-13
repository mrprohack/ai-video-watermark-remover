import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";

test.beforeAll(() => {
  mkdirSync("artifacts", { recursive: true });
});

test("desktop landing page exposes the core cleanup workflow", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Clean unwanted overlays from video." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /clean a video/i })).toBeVisible();

  await page.getByRole("link", { name: /clean a video/i }).click();
  await expect(page.getByText("Drop your video here")).toBeVisible();
  await expect(page.getByText(/Up to 100 MB/)).toBeVisible();

  await page.screenshot({
    path: "artifacts/home-desktop.png",
    fullPage: true,
  });
});

test("mobile layout keeps the uploader and primary action usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Clean unwanted overlays from video." }),
  ).toBeVisible();
  await page.getByRole("link", { name: /clean a video/i }).click();
  await expect(page.getByText("Drop your video here")).toBeVisible();

  await page.screenshot({
    path: "artifacts/home-mobile.png",
    fullPage: true,
  });
});

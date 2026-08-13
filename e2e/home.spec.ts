import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";

test.beforeAll(() => {
  mkdirSync("artifacts", { recursive: true });
});

test("desktop landing page exposes the core cleanup workflow", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  const response = await page.goto("/");

  expect(response).not.toBeNull();
  const headers = response!.headers();
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["content-security-policy"]).toContain("media-src 'self' blob:");

  await expect(
    page.getByRole("heading", { name: "Clean unwanted overlays from video." }),
  ).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "http://localhost:3000",
  );
  await expect(page.getByRole("link", { name: /clean a video/i })).toBeVisible();

  await page.getByRole("link", { name: /clean a video/i }).click();
  await expect(page.getByText("Drop your video here")).toBeVisible();
  await expect(page.getByText(/Up to 100 MB/)).toBeVisible();

  await page.screenshot({
    path: "artifacts/home-desktop.png",
    fullPage: true,
  });
});

test("studio quality controls expose their selected state", async ({ page }) => {
  await page.goto("/");
  await page.locator('input[type="file"]').setInputFiles({
    name: "accessibility-check.mp4",
    mimeType: "video/mp4",
    buffer: Buffer.from("demo-video-placeholder"),
  });

  const standard = page.getByRole("button", { name: "Standard" });
  const high = page.getByRole("button", { name: "High" });

  await expect(standard).toHaveAttribute("aria-pressed", "true");
  await expect(high).toHaveAttribute("aria-pressed", "false");

  await high.click();
  await expect(standard).toHaveAttribute("aria-pressed", "false");
  await expect(high).toHaveAttribute("aria-pressed", "true");
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

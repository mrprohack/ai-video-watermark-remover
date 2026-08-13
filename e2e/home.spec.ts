import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";

const SEO_PATHS = [
  "/video-watermark-remover",
  "/remove-logo-from-video",
  "/remove-text-from-video",
  "/remove-date-stamp-from-video",
];

test.beforeAll(() => {
  mkdirSync("artifacts", { recursive: true });
});

test("desktop landing page exposes the core cleanup workflow and SEO hub", async ({ page }) => {
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

  await expect(page).toHaveTitle(
    "AI Video Watermark Remover & Video Cleanup | ClearFrame",
  );
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "AI video watermark remover with a preview-first workflow.",
    }),
  ).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "http://localhost:3000",
  );
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  const jsonLd = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
  );
  expect(jsonLd["@type"]).toBe("WebApplication");
  expect(jsonLd.url).toBe("http://localhost:3000");

  for (const path of SEO_PATHS) {
    await expect(page.locator(`a[href="${path}"]`).first()).toBeVisible();
  }

  const studioLink = page.getByRole("link", { name: /open the cleanup studio/i }).first();
  await expect(studioLink).toBeVisible();
  await studioLink.click();
  await expect(page.getByText("Drop your video here")).toBeVisible();
  await expect(page.getByText(/Up to 100 MB/)).toBeVisible();

  await page.screenshot({
    path: "artifacts/home-desktop.png",
    fullPage: true,
  });
});

test("SEO discovery endpoints expose every indexable route", async ({ request }) => {
  const robotsResponse = await request.get("/robots.txt");
  expect(robotsResponse.status()).toBe(200);
  const robots = await robotsResponse.text();
  expect(robots).toContain("User-Agent: *");
  expect(robots).toContain("Allow: /");
  expect(robots).toContain("Sitemap: http://localhost:3000/sitemap.xml");

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.status()).toBe(200);
  const sitemap = await sitemapResponse.text();
  expect(sitemap).toContain("<loc>http://localhost:3000</loc>");
  for (const path of SEO_PATHS) {
    expect(sitemap).toContain(`<loc>http://localhost:3000${path}</loc>`);
  }
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

test("mobile homepage keeps the uploader and primary action usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "AI video watermark remover with a preview-first workflow.",
    }),
  ).toBeVisible();
  await page.getByRole("link", { name: /open the cleanup studio/i }).first().click();
  await expect(page.getByText("Drop your video here")).toBeVisible();

  const bodyWidth = await page.locator("body").evaluate((body) => body.scrollWidth);
  expect(bodyWidth).toBeLessThanOrEqual(390);

  await page.screenshot({
    path: "artifacts/home-mobile.png",
    fullPage: true,
  });
});

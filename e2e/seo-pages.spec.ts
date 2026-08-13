import { expect, test } from "@playwright/test";

const pages = [
  {
    path: "/video-watermark-remover",
    title: "AI Video Watermark Remover Online | ClearFrame",
    h1: "AI video watermark remover for clean, authorized edits.",
  },
  {
    path: "/remove-logo-from-video",
    title: "Remove Logo from Video with AI | ClearFrame",
    h1: "Remove a logo from video without cropping the frame.",
  },
  {
    path: "/remove-text-from-video",
    title: "Remove Text from Video with AI | ClearFrame",
    h1: "Remove unwanted text from video while keeping the scene.",
  },
  {
    path: "/remove-date-stamp-from-video",
    title: "Remove Date Stamp from Video with AI | ClearFrame",
    h1: "Remove date and time stamps from video cleanly.",
  },
];

for (const definition of pages) {
  test(`${definition.path} exposes unique crawlable SEO content`, async ({ page }) => {
    await page.setViewportSize({ width: 1365, height: 900 });
    const response = await page.goto(definition.path);

    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(definition.title);
    await expect(page.getByRole("heading", { level: 1, name: definition.h1 })).toBeVisible();
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.{110,}/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `http://localhost:3000${definition.path}`,
    );
    await expect(page.getByRole("link", { name: /open the cleanup studio/i })).toHaveAttribute(
      "href",
      "/#product",
    );
    await expect(page.getByText(/production AI rendering provider/i).first()).toBeVisible();

    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(2);
    const firstJsonLd = JSON.parse((await jsonLd.nth(0).textContent()) ?? "{}");
    expect(firstJsonLd["@type"]).toBe("WebApplication");
    expect(firstJsonLd.url).toBe(`http://localhost:3000${definition.path}`);

    await page.screenshot({
      path: `artifacts/seo-${definition.path.slice(1)}.png`,
      fullPage: true,
    });
  });
}

test("SEO tool page remains usable on a narrow mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/video-watermark-remover");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "AI video watermark remover for clean, authorized edits.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /open the cleanup studio/i })).toBeVisible();

  const bodyWidth = await page.locator("body").evaluate((body) => body.scrollWidth);
  expect(bodyWidth).toBeLessThanOrEqual(390);

  await page.screenshot({
    path: "artifacts/seo-mobile.png",
    fullPage: true,
  });
});

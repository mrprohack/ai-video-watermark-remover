import { describe, expect, it } from "vitest";
import { SEO_PAGES } from "@/lib/seo-pages";

const EXPECTED_PATHS = [
  "/video-watermark-remover",
  "/remove-logo-from-video",
  "/remove-text-from-video",
  "/remove-date-stamp-from-video",
];

describe("SEO landing page registry", () => {
  it("contains the focused launch cluster", () => {
    expect(SEO_PAGES.map((page) => page.path)).toEqual(EXPECTED_PATHS);
  });

  it("keeps titles, descriptions, H1s, summaries, and search intents unique", () => {
    const fields = ["title", "description", "h1", "summary", "searchIntent"] as const;

    for (const field of fields) {
      const values = SEO_PAGES.map((page) => page[field]);
      expect(new Set(values).size, `${field} must be unique`).toBe(values.length);
    }
  });

  it("uses indexable canonical paths and substantial people-first copy", () => {
    for (const page of SEO_PAGES) {
      expect(page.path).toMatch(/^\/[a-z0-9-]+$/);
      expect(page.title.length).toBeGreaterThanOrEqual(35);
      expect(page.title.length).toBeLessThanOrEqual(65);
      expect(page.description.length).toBeGreaterThanOrEqual(110);
      expect(page.description.length).toBeLessThanOrEqual(170);
      expect(page.h1.length).toBeGreaterThanOrEqual(18);
      expect(page.summary.length).toBeGreaterThanOrEqual(140);
      expect(page.steps).toHaveLength(3);
      expect(page.faqs.length).toBeGreaterThanOrEqual(3);
      expect(page.useCases.length).toBeGreaterThanOrEqual(3);
      expect(page.limitations.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("keeps responsible-use language present on every page", () => {
    for (const page of SEO_PAGES) {
      expect(page.responsibleUse.toLowerCase()).toMatch(/own|authorized|permission/);
      expect(page.responsibleUse.toLowerCase()).not.toMatch(/stock watermark|bypass copyright/);
    }
  });
});

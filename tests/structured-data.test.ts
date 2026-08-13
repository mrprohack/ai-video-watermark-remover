import { describe, expect, it } from "vitest";
import { seoPageByPath } from "@/lib/seo-pages";
import { breadcrumbJsonLd, webApplicationJsonLd } from "@/lib/structured-data";

describe("structured SEO data", () => {
  it("describes the current browser workflow without inventing a paid offer", () => {
    const data = webApplicationJsonLd(seoPageByPath("/video-watermark-remover"));

    expect(data["@type"]).toBe("WebApplication");
    expect(data.applicationCategory).toBe("MultimediaApplication");
    expect(data.featureList).toContain("Transparent usage estimate");
    expect(data).not.toHaveProperty("offers");
  });

  it("emits a two-level breadcrumb for focused landing pages", () => {
    const page = seoPageByPath("/remove-logo-from-video");
    const data = breadcrumbJsonLd(page);

    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement).toHaveLength(2);
    expect(data.itemListElement[1].name).toBe(page.h1);
    expect(data.itemListElement[1].item).toContain(page.path);
  });
});

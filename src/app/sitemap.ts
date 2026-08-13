import type { MetadataRoute } from "next";
import { SEO_PAGES } from "@/lib/seo-pages";
import { siteOrigin } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();

  return [
    {
      url: origin,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...SEO_PAGES.map((page) => ({
      url: `${origin}${page.path}`,
      changeFrequency: "monthly" as const,
      priority: page.path === "/video-watermark-remover" ? 0.9 : 0.8,
    })),
  ];
}

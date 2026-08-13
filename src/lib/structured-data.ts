import type { SeoPageDefinition } from "@/lib/seo-pages";
import { siteOrigin } from "@/lib/site-url";

export function webApplicationJsonLd(page?: SeoPageDefinition) {
  const origin = siteOrigin();
  const url = page ? `${origin}${page.path}` : origin;

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ClearFrame",
    url,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern browser with HTML5 video support",
    description:
      page?.description ??
      "A preview-first browser workflow for preparing authorized video cleanup jobs, validating files, and reviewing quality and usage choices.",
    featureList: [
      "MP4, MOV, and WebM file validation",
      "Preview-first video cleanup workflow",
      "Quality selection",
      "Transparent usage estimate",
      "Explicit processing job states",
      "Ownership and authorization confirmation",
    ],
    isAccessibleForFree: true,
    creator: {
      "@type": "Organization",
      name: "ClearFrame",
      url: origin,
    },
  };
}

export function breadcrumbJsonLd(page: SeoPageDefinition) {
  const origin = siteOrigin();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ClearFrame",
        item: origin,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.h1,
        item: `${origin}${page.path}`,
      },
    ],
  };
}

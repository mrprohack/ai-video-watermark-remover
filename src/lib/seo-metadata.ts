import type { Metadata } from "next";
import type { SeoPageDefinition } from "@/lib/seo-pages";

export function metadataForSeoPage(page: SeoPageDefinition): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.path,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      url: page.path,
      siteName: "ClearFrame",
    },
    twitter: {
      card: "summary",
      title: page.title,
      description: page.description,
    },
  };
}

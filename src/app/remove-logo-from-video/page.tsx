import { SeoToolPage } from "@/components/seo-tool-page";
import { metadataForSeoPage } from "@/lib/seo-metadata";
import { seoPageByPath } from "@/lib/seo-pages";

const page = seoPageByPath("/remove-logo-from-video");

export const metadata = metadataForSeoPage(page);

export default function RemoveLogoFromVideoPage() {
  return <SeoToolPage page={page} />;
}

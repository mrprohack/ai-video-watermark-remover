import { SeoToolPage } from "@/components/seo-tool-page";
import { metadataForSeoPage } from "@/lib/seo-metadata";
import { seoPageByPath } from "@/lib/seo-pages";

const page = seoPageByPath("/video-watermark-remover");

export const metadata = metadataForSeoPage(page);

export default function VideoWatermarkRemoverPage() {
  return <SeoToolPage page={page} />;
}

import type { Metadata } from "next";
import { resolveSiteUrl } from "@/lib/site-url";
import "./globals.css";
import "./seo-pages.css";
import "./home-seo.css";

const title = "AI Video Watermark Remover & Video Cleanup | ClearFrame";
const description =
  "Explore ClearFrame, a preview-first AI video cleanup workflow for authorized watermark, logo, text, and timestamp removal with transparent usage estimates.";

export const metadata: Metadata = {
  metadataBase: resolveSiteUrl(),
  applicationName: "ClearFrame",
  category: "video editing",
  title,
  description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    siteName: "ClearFrame",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

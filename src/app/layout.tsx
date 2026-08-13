import type { Metadata } from "next";
import { resolveSiteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: resolveSiteUrl(),
  title: "ClearFrame — AI Video Watermark Remover",
  description:
    "Remove unwanted logos, text, timestamps, and overlays from videos you own or are authorized to edit.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ClearFrame — AI Video Watermark Remover",
    description:
      "Clean unwanted overlays from your video without frame-by-frame editing.",
    type: "website",
    url: "/",
    siteName: "ClearFrame",
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

import type { Metadata } from "next";
import "./globals.css";

function getMetadataBase(): URL {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredUrl) return new URL(configuredUrl);

  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProductionUrl) return new URL(`https://${vercelProductionUrl}`);

  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
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

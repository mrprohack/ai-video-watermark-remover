import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClearFrame — AI Video Watermark Remover",
  description:
    "Remove unwanted logos, text, timestamps, and overlays from videos you own or are authorized to edit.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "ClearFrame — AI Video Watermark Remover",
    description:
      "Clean unwanted overlays from your video without frame-by-frame editing.",
    type: "website",
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

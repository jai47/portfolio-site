import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/constants";
import { ASSETS } from "@/constants/assets";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.about,
  icons: {
    icon: ASSETS.icons.logo,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-primary">{children}</body>
    </html>
  );
}

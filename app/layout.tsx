/**
 * app/layout.tsx
 * -------------------------------------------------------------------------
 * Root layout (Server Component).
 *  - Loads Geist Sans + Geist Mono via next/font and exposes them as CSS
 *    variables consumed by globals.css.
 *  - Declares SEO + social-share metadata sourced from lib/data.ts.
 *  - Declares the viewport / theme color separately (Next.js convention).
 *  - Renders the persistent <body> shell; pages slot into {children}.
 * -------------------------------------------------------------------------
 */

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteMeta } from "@/lib/data";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: siteMeta.title,
  description: siteMeta.description,
  keywords: [
    "Anubhuti Mishra",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "AI Engineering",
    "Portfolio",
  ],
  authors: [{ name: "Anubhuti Mishra" }],
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    url: siteMeta.url,
    siteName: siteMeta.title,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh bg-bg text-fg">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

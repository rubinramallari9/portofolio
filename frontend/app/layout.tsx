import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rubinramallari.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rubin Ramallari - Full Stack Developer & Software Engineer",
    template: "%s | Rubin Ramallari",
  },
  description:
    "Portfolio of Rubin Ramallari - A passionate full stack developer specializing in React, Next.js, TypeScript, and modern web technologies. View my projects and get in touch.",
  keywords: [
    "Rubin Ramallari",
    "Full Stack Developer",
    "Software Engineer",
    "Web Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Portfolio",
    "Albania",
  ],
  authors: [{ name: "Rubin Ramallari" }],
  creator: "Rubin Ramallari",
  publisher: "Rubin Ramallari",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Rubin Ramallari Portfolio",
    title: "Rubin Ramallari - Full Stack Developer & Software Engineer",
    description:
      "Portfolio of Rubin Ramallari - A passionate full stack developer specializing in React, Next.js, TypeScript, and modern web technologies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rubin Ramallari - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rubin Ramallari - Full Stack Developer & Software Engineer",
    description:
      "Portfolio of Rubin Ramallari - A passionate full stack developer specializing in React, Next.js, TypeScript, and modern web technologies.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

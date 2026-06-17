import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const BASE_URL = "https://pranitapanchal.dev";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Pranita Panchal — Software Engineer",
    template: "%s | Pranita Panchal",
  },
  description:
    "Software Engineer specializing in Node.js, TypeScript, PostgreSQL, Docker, CI/CD, and distributed systems. Backend, Full-Stack, and DevOps.",
  keywords: [
    "Software Engineer",
    "Backend Engineer",
    "Full Stack Engineer",
    "DevOps Engineer",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Docker",
    "Distributed Systems",
    "Pranita Panchal",
    "Pune",
  ],
  authors: [{ name: "Pranita Panchal", url: BASE_URL }],
  creator: "Pranita Panchal",
  publisher: "Pranita Panchal",

  // Canonical
  alternates: {
    canonical: BASE_URL,
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Pranita Panchal",
    title: "Pranita Panchal — Software Engineer",
    description:
      "I architect secure backends, optimize data pipelines, and ship production-grade applications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pranita Panchal — Software Engineer | Backend, Full-Stack & DevOps",
      },
    ],
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: "Pranita Panchal — Software Engineer",
    description:
      "I architect secure backends, optimize data pipelines, and ship production-grade applications.",
    images: ["/og-image.png"],
    creator: "@pranitap123",
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  // Web app manifest
  manifest: "/site.webmanifest",

  // Indexing
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-[#080808] text-white antialiased">{children}</body>
    </html>
  );
}
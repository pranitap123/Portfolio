import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
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
    "DevOps",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Docker",
    "Distributed Systems",
  ],
  authors: [{ name: "Pranita Panchal" }],
  creator: "Pranita Panchal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pranitapanchal.dev",
    siteName: "Pranita Panchal",
    title: "Pranita Panchal — Software Engineer",
    description:
      "I architect secure backends, optimize data pipelines, and ship production-grade applications.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranita Panchal — Software Engineer",
    description:
      "I architect secure backends, optimize data pipelines, and ship production-grade applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-[#080808] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
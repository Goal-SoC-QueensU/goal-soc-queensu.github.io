import type React from "react";
import type { Metadata } from "next";
import { Inter, Roboto_Serif } from "next/font/google";
import "./globals.css";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";               // ← NEW

/* ---------------------  fonts  --------------------- */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  variable: "--font-roboto-serif",
  display: "swap",
});

/* ------------------  metadata  --------------------- */
export const metadata: Metadata = {
  title: "GOAL Lab - Queen's University",
  description:
    "Global Optimization, Analytics, and Learning Lab at Queen's University. Shaping the future in resource allocation, healthcare, autonomous vehicles, and quantum algorithms.",
  keywords: ["optimization", "analytics", "machine learning", "research", "queens university"],
  authors: [{ name: "GOAL Lab" }],
  openGraph: {
    title: "GOAL Lab - Queen's University",
    description: "Global Optimization, Analytics, and Learning Lab at Queen's University",
    type: "website",
    locale: "en_US",
    siteName: "GOAL Lab",
  },
  twitter: {
    card: "summary_large_image",
    title: "GOAL Lab - Queen's University",
    description: "Global Optimization, Analytics, and Learning Lab at Queen's University",
  },
  generator: "v0.dev",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

/* -------------------  layout  ---------------------- */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoSerif.variable} font-sans antialiased dark`}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        {/* ----- Sonner toast portal (add only once) ----- */}
        <Toaster position="top-right" richColors expand />   {/* feel free to tweak props */}
      </body>
    </html>
  );
}

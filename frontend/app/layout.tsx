import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/layout/theme-provider"
import { AppProvider } from "@/contexts/app-context"
import { LayoutWrapper } from "@/components/layout/layout-wrapper"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Konya Genç - Bilgi Evreni",
    template: "%s | Konya Genç",
  },
  description: "Konya'daki üniversite öğrencilerinin bilgi paylaşım platformu. Akademik kaynaklar, barınma rehberleri, etkinlikler ve daha fazlası.",
  keywords: ["Konya", "üniversite", "öğrenci", "akademik", "barınma", "etkinlik", "KBB", "Konya Büyükşehir Belediyesi"],
  authors: [{ name: "Konya Genç" }],
  creator: "Konya Büyükşehir Belediyesi",
  publisher: "Konya Büyükşehir Belediyesi",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://konyagenç.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: "Konya Genç",
    title: "Konya Genç - Bilgi Evreni",
    description: "Konya'daki üniversite öğrencilerinin bilgi paylaşım platformu. Akademik kaynaklar, barınma rehberleri, etkinlikler ve daha fazlası.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Konya Genç - Bilgi Evreni",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Konya Genç - Bilgi Evreni",
    description: "Konya'daki üniversite öğrencilerinin bilgi paylaşım platformu",
    images: ["/og-image.jpg"],
  },
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AppProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

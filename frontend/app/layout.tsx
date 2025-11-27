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
  title: "Konya Genç - Bilgi Evreni",
  description: "Konya'daki üniversite öğrencilerinin bilgi paylaşım platformu",
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

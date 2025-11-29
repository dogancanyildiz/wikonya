import type { Metadata } from "next"
import { SocialPage as SocialPageContent } from "@/components/features/social/social-page"

export const metadata: Metadata = {
  title: "Sosyal Yaşam & Mekan Rehberi | Konya Genç",
  description: "Konya'nın en iyi kafelerini, çalışma alanlarını ve sosyal mekanlarını keşfet. Öğrenci dostu mekanlar ve etkinlikler.",
  openGraph: {
    title: "Sosyal Yaşam & Mekan Rehberi | Konya Genç",
    description: "Konya'nın en iyi kafelerini, çalışma alanlarını ve sosyal mekanlarını keşfet",
    type: "website",
    url: "/social",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sosyal Yaşam & Mekan Rehberi | Konya Genç",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sosyal Yaşam & Mekan Rehberi | Konya Genç",
    description: "Konya'nın en iyi kafelerini, çalışma alanlarını ve sosyal mekanlarını keşfet",
    images: ["/og-image.jpg"],
  },
}

export default function SocialPage() {
  return (
    <div className="min-h-screen bg-background">
      <SocialPageContent />
    </div>
  )
}


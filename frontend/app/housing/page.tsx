import type { Metadata } from "next"
import { HousingPage as HousingPageContent } from "@/components/features/housing/housing-page"

export const metadata: Metadata = {
  title: "Barınma & Yaşam | Konya Genç",
  description: "Konya'da konaklama seçenekleri, yurt rehberleri, mahalle analizleri ve yaşam rehberleri. Öğrenciler için barınma ve yaşam bilgileri.",
  openGraph: {
    title: "Barınma & Yaşam | Konya Genç",
    description: "Konya'da konaklama seçenekleri ve yaşam rehberleri",
    type: "website",
    url: "/housing",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Barınma & Yaşam | Konya Genç",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barınma & Yaşam | Konya Genç",
    description: "Konya'da konaklama seçenekleri ve yaşam rehberleri",
    images: ["/og-image.jpg"],
  },
}

export default function HousingPage() {
  return (
    <div className="min-h-screen bg-background">
      <HousingPageContent />
    </div>
  )
}


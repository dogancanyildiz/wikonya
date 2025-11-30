import type { Metadata } from "next"
import { HousingPage as HousingPageContent } from "@/components/features/housing/housing-page"

export const metadata: Metadata = {
  title: "Barınma | Konya Genç",
  description: "Konya'da konaklama seçenekleri, yurt rehberleri ve mahalle analizleri. Öğrenciler için barınma bilgileri.",
  openGraph: {
    title: "Barınma | Konya Genç",
    description: "Konya'da konaklama seçenekleri",
    type: "website",
    url: "/housing",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Barınma | Konya Genç",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barınma | Konya Genç",
    description: "Konya'da konaklama seçenekleri",
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


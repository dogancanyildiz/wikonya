import type { Metadata } from "next"
import { HousingPage as HousingPageContent } from "@/components/features/housing/housing-page"

export const metadata: Metadata = {
  title: "Barınma & Yaşam | Konya Genç",
  description: "Konya'da konaklama seçenekleri, yurt rehberleri, mahalle analizleri ve yaşam rehberleri. Öğrenciler için barınma ve yaşam bilgileri.",
  openGraph: {
    title: "Barınma & Yaşam | Konya Genç",
    description: "Konya'da konaklama seçenekleri ve yaşam rehberleri",
    type: "website",
  },
}

export default function HousingPage() {
  return (
    <div className="min-h-screen bg-[#f2f4f3] dark:bg-background">
      <HousingPageContent />
    </div>
  )
}


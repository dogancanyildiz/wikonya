import type { Metadata } from "next"
import { AcademicPage as AcademicPageContent } from "@/components/features/academic/academic-page"

export const metadata: Metadata = {
  title: "Akademik Destek | Konya Genç",
  description: "Bölüm ve ders bazlı başlıklar, ders notları, hoca rehberleri, geçmiş sınav soruları ve akademik kaynaklar. Konya'daki üniversiteler için akademik destek.",
  openGraph: {
    title: "Akademik Destek | Konya Genç",
    description: "Ders notları, hoca rehberleri ve akademik kaynaklar",
    type: "website",
  },
}

export default function AcademicPage() {
  return (
    <div className="min-h-screen bg-[#f2f4f3] dark:bg-background">
      <AcademicPageContent />
    </div>
  )
}


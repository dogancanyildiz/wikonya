import type { Metadata } from "next"
import { AcademicPage as AcademicPageContent } from "@/components/features/academic/academic-page"

export const metadata: Metadata = {
  title: "Akademik Destek | Konya Genç",
  description: "Bölüm ve ders bazlı başlıklar, ders notları, hoca rehberleri, geçmiş sınav soruları ve akademik kaynaklar. Konya'daki üniversiteler için akademik destek.",
  openGraph: {
    title: "Akademik Destek | Konya Genç",
    description: "Ders notları, hoca rehberleri ve akademik kaynaklar",
    type: "website",
    url: "/academic",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Akademik Destek | Konya Genç",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akademik Destek | Konya Genç",
    description: "Ders notları, hoca rehberleri ve akademik kaynaklar",
    images: ["/og-image.jpg"],
  },
}

export default function AcademicPage() {
  return (
    <div className="min-h-screen bg-background">
      <AcademicPageContent />
    </div>
  )
}


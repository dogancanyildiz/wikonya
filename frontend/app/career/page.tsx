import type { Metadata } from "next"
import { CareerPage as CareerPageContent } from "@/components/features/career/career-page"

export const metadata: Metadata = {
  title: "Kariyer & Gelişim | Konya Genç",
  description: "Konya'daki iş ve staj ilanları, burs fırsatları, workshop'lar ve kariyer gelişim kaynakları. Öğrenciler için kariyer fırsatları.",
  openGraph: {
    title: "Kariyer & Gelişim | Konya Genç",
    description: "Konya'daki iş ve staj ilanları, burs fırsatları ve kariyer gelişim kaynakları",
    type: "website",
    url: "/career",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kariyer & Gelişim | Konya Genç",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kariyer & Gelişim | Konya Genç",
    description: "Konya'daki iş ve staj ilanları, burs fırsatları ve kariyer gelişim kaynakları",
    images: ["/og-image.jpg"],
  },
}

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-background">
      <CareerPageContent />
    </div>
  )
}


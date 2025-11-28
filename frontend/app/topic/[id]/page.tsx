import type { Metadata } from "next"
import { TopicDetailPage as TopicDetailPageContent } from "@/components/topic/topic-detail-page"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: "Başlık Detayı | Konya Genç",
    description: "Konya Genç platformunda başlık detayı, wiki içeriği ve yorumlar.",
    openGraph: {
      title: "Başlık Detayı | Konya Genç",
      description: "Konya Genç platformunda başlık detayı",
      type: "article",
    },
  }
}

export default function TopicDetailPage() {
  return (
    <div className="min-h-screen bg-[#f2f4f3] dark:bg-background">
      <TopicDetailPageContent />
    </div>
  )
}


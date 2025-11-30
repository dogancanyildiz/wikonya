import type { Metadata } from "next"
import { TopicDetailPage as TopicDetailPageContent } from "@/components/features/topic/topic-detail-page"

export function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Başlık Detayı #${id} | Konya Genç`,
    description: "Konya Genç platformunda başlık detayı, wiki içeriği ve yorumlar.",
    openGraph: {
      title: `Başlık Detayı #${id} | Konya Genç`,
      description: "Konya Genç platformunda başlık detayı",
      type: "article",
    },
  }
}

export default async function TopicDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const topicId = parseInt(id, 10)
  
  return (
    <div className="min-h-screen bg-background">
      <TopicDetailPageContent topicId={topicId} />
    </div>
  )
}


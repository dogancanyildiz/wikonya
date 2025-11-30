import { KBBAnnouncementDetailPage } from "@/components/features/home/kbb-announcement-detail-page"

export function generateStaticParams() {
  return []
}

export default async function AnnouncementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="min-h-screen bg-background">
      <KBBAnnouncementDetailPage announcementId={parseInt(id)} />
    </div>
  )
}


import { KBBAnnouncementDetailPage } from "@/components/features/home/kbb-announcement-detail-page"

export default async function AnnouncementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="min-h-screen bg-[#f2f4f3] dark:bg-background">
      <KBBAnnouncementDetailPage announcementId={parseInt(id)} />
    </div>
  )
}


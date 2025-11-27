import { LifeGuideDetailPage } from "@/components/housing/life-guide-detail-page"

export default async function LifeGuideDetailPageRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="min-h-screen bg-[#f2f4f3] dark:bg-background">
      <LifeGuideDetailPage guideId={parseInt(id)} />
    </div>
  )
}


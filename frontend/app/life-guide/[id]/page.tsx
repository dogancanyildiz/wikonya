import { LifeGuideDetailPage } from "@/components/features/housing/life-guide-detail-page"

export function generateStaticParams() {
  return []
}

export default async function LifeGuideDetailPageRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="min-h-screen bg-background">
      <LifeGuideDetailPage guideId={parseInt(id)} />
    </div>
  )
}


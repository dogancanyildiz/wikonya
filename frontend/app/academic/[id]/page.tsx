import type { Metadata } from "next"
import { ResourceDetailPage } from "@/components/features/academic/resource-detail-page"

export const metadata: Metadata = {
  title: "Akademik Kaynak Detayı | Konya Genç",
  description: "Akademik kaynak detay sayfası",
}

export async function generateStaticParams() {
  return []
}

export default async function AcademicResourceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const resourceId = parseInt(id)
  return <ResourceDetailPage resourceId={resourceId} />
}

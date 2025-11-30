import type { Metadata } from "next"
import { ResourceDetailPage } from "@/components/features/academic/resource-detail-page"

export const metadata: Metadata = {
  title: "Akademik Kaynak Detayı | Konya Genç",
  description: "Akademik kaynak detay sayfası",
}

export default function AcademicResourceDetailPage({ params }: { params: { id: string } }) {
  const resourceId = parseInt(params.id)
  return <ResourceDetailPage resourceId={resourceId} />
}


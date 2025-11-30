import type { Metadata } from "next"
import { NewEventPage } from "@/components/features/events/new-event-page"

export const metadata: Metadata = {
  title: "Yeni Etkinlik Oluştur | Konya Genç",
  description: "Yeni etkinlik oluştur",
}

export default function NewEventPageRoute() {
  return <NewEventPage />
}


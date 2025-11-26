"use client"

import { ResourceCard } from "./resource-card"
import { Button } from "@/components/ui/button"

export function ResourceGrid() {
  const resources = [
    {
      id: 1,
      title: "Hukuk Başlangıcı Final Notları",
      fileType: "PDF",
      fileSize: "12 MB",
      uploadedBy: "Prof. Dr. Ahmet Yılmaz",
      uploaderInitials: "AY",
      uploadDate: "15 Kas 2024",
      downloads: 245,
      views: 1234,
    },
    {
      id: 2,
      title: "Anayasa Hukuku Ders Notları - Tam Set",
      fileType: "PDF",
      fileSize: "8.5 MB",
      uploadedBy: "Elif Demir",
      uploaderInitials: "ED",
      uploadDate: "12 Kas 2024",
      downloads: 189,
      views: 892,
    },
    {
      id: 3,
      title: "Medeni Hukuk Vize Sınav Soruları 2023",
      fileType: "PDF",
      fileSize: "3.2 MB",
      uploadedBy: "Mehmet Kaya",
      uploaderInitials: "MK",
      uploadDate: "10 Kas 2024",
      downloads: 312,
      views: 1567,
    },
    {
      id: 4,
      title: "Ceza Hukuku Genel Hükümler Özeti",
      fileType: "PDF",
      fileSize: "5.8 MB",
      uploadedBy: "Zeynep Arslan",
      uploaderInitials: "ZA",
      uploadDate: "8 Kas 2024",
      downloads: 156,
      views: 734,
    },
    {
      id: 5,
      title: "Ticaret Hukuku Ders İzlencesi",
      fileType: "PDF",
      fileSize: "4.1 MB",
      uploadedBy: "Can Özkan",
      uploaderInitials: "CÖ",
      uploadDate: "5 Kas 2024",
      downloads: 98,
      views: 456,
    },
    {
      id: 6,
      title: "İdare Hukuku Final Çalışma Kılavuzu",
      fileType: "PDF",
      fileSize: "6.7 MB",
      uploadedBy: "Ayşe Çelik",
      uploaderInitials: "AÇ",
      uploadDate: "3 Kas 2024",
      downloads: 203,
      views: 987,
    },
    {
      id: 7,
      title: "Borçlar Hukuku Vaka Analizleri",
      fileType: "PDF",
      fileSize: "9.3 MB",
      uploadedBy: "Burak Yıldız",
      uploaderInitials: "BY",
      uploadDate: "1 Kas 2024",
      downloads: 167,
      views: 823,
    },
    {
      id: 8,
      title: "Hukuk Felsefesi Ders Notları",
      fileType: "PDF",
      fileSize: "7.2 MB",
      uploadedBy: "Selin Aydın",
      uploaderInitials: "SA",
      uploadDate: "29 Eki 2024",
      downloads: 134,
      views: 612,
    },
    {
      id: 9,
      title: "Roma Hukuku Tarihi Özet",
      fileType: "PDF",
      fileSize: "4.9 MB",
      uploadedBy: "Emre Şahin",
      uploaderInitials: "EŞ",
      uploadDate: "27 Eki 2024",
      downloads: 89,
      views: 445,
    },
  ]

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-xl sm:text-2xl">
          Tüm Kaynaklar
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Button 
            className="px-3 sm:px-4 py-2 bg-[#03624c] text-white rounded-xl font-[Manrope] transition-colors hover:bg-[#03624c]/90 font-bold text-xs sm:text-sm"
          >
            En Yeni
          </Button>
          <Button 
            variant="outline"
            className="px-3 sm:px-4 py-2 bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground rounded-xl font-[Manrope] hover:bg-[#f2f4f3] dark:hover:bg-accent transition-colors font-bold text-xs sm:text-sm border border-border"
          >
            En Popüler
          </Button>
          <Button 
            variant="outline"
            className="px-3 sm:px-4 py-2 bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground rounded-xl font-[Manrope] hover:bg-[#f2f4f3] dark:hover:bg-accent transition-colors font-bold text-xs sm:text-sm border border-border"
          >
            En Çok İndirilen
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} {...resource} />
        ))}
      </div>
    </div>
  )
}


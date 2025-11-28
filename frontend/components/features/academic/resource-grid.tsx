"use client"

import { useState } from "react"
import { ResourceCard } from "./resource-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia, EmptyContent } from "@/components/ui/empty"
import { GraduationCap, ChevronDown, FileQuestion, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ResourceGrid() {
  const [selectedUniversity, setSelectedUniversity] = useState("all")
  const [selectedSort, setSelectedSort] = useState("newest")

  const universities = [
    { id: "all", name: "Hepsi", abbr: "Tümü" },
    { id: "selcuk", name: "Selçuk Üniversitesi", abbr: "SÜ" },
    { id: "neu", name: "Necmettin Erbakan Üniversitesi", abbr: "NEÜ" },
    { id: "kto", name: "KTO Karatay Üniversitesi", abbr: "KTO" },
    { id: "ktun", name: "Konya Teknik Üniversitesi", abbr: "KTÜN" },
    { id: "kgtu", name: "Konya Gıda ve Tarım Üniversitesi", abbr: "KGTÜ" },
  ]

  const selectedUni = universities.find(u => u.id === selectedUniversity) || universities[0]
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h2 className="font-[Manrope] text-foreground font-bold text-xl sm:text-2xl">
          Tüm Kaynaklar
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                className="px-3 sm:px-4 py-2 bg-card text-foreground rounded-xl font-[Manrope] hover:bg-accent dark:hover:bg-accent transition-colors font-bold text-xs sm:text-sm border border-border flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                {selectedUni.abbr}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {universities.map((university) => (
                <DropdownMenuItem
                  key={university.id}
                  onClick={() => setSelectedUniversity(university.id)}
                  className={`
                    font-[Manrope] cursor-pointer
                    ${selectedUniversity === university.id ? 'bg-primary text-white' : ''}
                  `}
                >
                  {university.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            onClick={() => setSelectedSort("newest")}
            className={`
              px-3 sm:px-4 py-2 rounded-xl font-[Manrope] transition-colors font-bold text-xs sm:text-sm
              ${selectedSort === "newest"
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'bg-card text-foreground hover:bg-accent dark:hover:bg-accent border border-border'
              }
            `}
          >
            En Yeni
          </Button>
          <Button 
            onClick={() => setSelectedSort("popular")}
            variant="outline"
            className={`
              px-3 sm:px-4 py-2 rounded-xl font-[Manrope] transition-colors font-bold text-xs sm:text-sm
              ${selectedSort === "popular"
                ? 'bg-primary text-white hover:bg-primary/90 border-primary' 
                : 'bg-card text-foreground hover:bg-accent dark:hover:bg-accent border border-border'
              }
            `}
          >
            En Popüler
          </Button>
          <Button 
            onClick={() => setSelectedSort("downloads")}
            variant="outline"
            className={`
              px-3 sm:px-4 py-2 rounded-xl font-[Manrope] transition-colors font-bold text-xs sm:text-sm
              ${selectedSort === "downloads"
                ? 'bg-primary text-white hover:bg-primary/90 border-primary' 
                : 'bg-card text-foreground hover:bg-accent dark:hover:bg-accent border border-border'
              }
            `}
          >
            En Çok İndirilen
          </Button>
          {(selectedUniversity !== "all" || selectedSort !== "newest") && (
            <>
              <Button
                onClick={() => {
                  setSelectedUniversity("all")
                  setSelectedSort("newest")
                }}
                variant="outline"
                size="sm"
                className="font-[Manrope] font-bold text-xs text-foreground/60 dark:text-muted-foreground hover:text-primary"
              >
                <X className="w-3 h-3 mr-1" />
                Temizle
              </Button>
              <Badge className="font-[Manrope] font-bold text-xs bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary">
                {[selectedUniversity !== "all" ? 1 : 0, selectedSort !== "newest" ? 1 : 0].reduce((a, b) => a + b, 0)} aktif filtre
              </Badge>
            </>
          )}
        </div>
      </div>

      {resources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} {...resource} />
          ))}
        </div>
      ) : (
        <Empty className="py-12 sm:py-16">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileQuestion className="w-12 h-12 text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle className="font-[Manrope] font-bold text-xl sm:text-2xl">
              Kaynak Bulunamadı
            </EmptyTitle>
            <EmptyDescription className="font-[Manrope] text-base">
              Seçilen üniversiteye ait kaynak bulunamadı. Filtreleri değiştirmeyi deneyin.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              onClick={() => setSelectedUniversity("all")}
              variant="outline"
              className="font-[Manrope] font-bold"
            >
              Tüm Kaynakları Göster
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  )
}


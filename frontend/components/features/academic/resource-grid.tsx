"use client"

import { useState, useMemo, useEffect } from "react"
import { ResourceCard } from "./resource-card"
import { Button } from "@/components/ui/button"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia, EmptyContent } from "@/components/ui/empty"
import { GraduationCap, ChevronDown, ChevronLeft, ChevronRight, FileQuestion, X, FileText, ClipboardList, MessageSquare, Calendar } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ITEMS_PER_PAGE = 18

interface Resource {
  id: number
  title: string
  fileType: string
  fileSize: string
  uploadedBy: string
  uploaderInitials: string
  uploadDate: string
  downloads: number
  views: number
  university: string
  department: string
  course: string
  type: "notes" | "exams" | "reviews" | "calendar"
  uploadTimestamp: number // For sorting by date
}

interface ResourceGridProps {
  searchQuery: string
}

export function ResourceGrid({ searchQuery }: ResourceGridProps) {
  const [selectedUniversity, setSelectedUniversity] = useState("all")
  const [selectedSort, setSelectedSort] = useState("newest")
  const [selectedType, setSelectedType] = useState("notes")
  const [currentPage, setCurrentPage] = useState(1)

  const universities = [
    { id: "all", name: "Hepsi", abbr: "Tümü" },
    { id: "selcuk", name: "Selçuk Üniversitesi", abbr: "SÜ" },
    { id: "neu", name: "Necmettin Erbakan Üniversitesi", abbr: "NEÜ" },
    { id: "kto", name: "KTO Karatay Üniversitesi", abbr: "KTO" },
    { id: "ktun", name: "Konya Teknik Üniversitesi", abbr: "KTÜN" },
    { id: "kgtu", name: "Konya Gıda ve Tarım Üniversitesi", abbr: "KGTÜ" },
  ]

  const resourceTypes = [
    { id: "notes", label: "Ders Notları", icon: FileText },
    { id: "exams", label: "Sınav Soruları", icon: ClipboardList },
    { id: "reviews", label: "Hoca Yorumları", icon: MessageSquare },
    { id: "calendar", label: "Akademik Takvim", icon: Calendar },
  ]

  const selectedUni = universities.find(u => u.id === selectedUniversity) || universities[0]
  
  // Helper function to parse date string to timestamp
  const parseDate = (dateStr: string): number => {
    const months: Record<string, number> = {
      "Oca": 0, "Şub": 1, "Mar": 2, "Nis": 3, "May": 4, "Haz": 5,
      "Tem": 6, "Ağu": 7, "Eyl": 8, "Eki": 9, "Kas": 10, "Ara": 11
    }
    const parts = dateStr.split(" ")
    if (parts.length === 3) {
      const day = parseInt(parts[0])
      const month = months[parts[1]] || 0
      const year = parseInt(parts[2])
      return new Date(year, month, day).getTime()
    }
    // Return a default timestamp if date parsing fails
    return 0
  }

  const allResources: Resource[] = [
    // Selçuk Üniversitesi - Hukuk
    { id: 1, title: "Hukuk Başlangıcı Final Notları", fileType: "PDF", fileSize: "12 MB", uploadedBy: "Prof. Dr. Ahmet Yılmaz", uploaderInitials: "AY", uploadDate: "15 Kas 2024", downloads: 245, views: 1234, university: "selcuk", department: "Hukuk Fakültesi", course: "Hukuk Başlangıcı", type: "notes", uploadTimestamp: parseDate("15 Kas 2024") },
    { id: 2, title: "Anayasa Hukuku Ders Notları - Tam Set", fileType: "PDF", fileSize: "8.5 MB", uploadedBy: "Elif Demir", uploaderInitials: "ED", uploadDate: "12 Kas 2024", downloads: 189, views: 892, university: "selcuk", department: "Hukuk Fakültesi", course: "Anayasa Hukuku", type: "notes", uploadTimestamp: parseDate("12 Kas 2024") },
    { id: 3, title: "Medeni Hukuk Vize Sınav Soruları 2023", fileType: "PDF", fileSize: "3.2 MB", uploadedBy: "Mehmet Kaya", uploaderInitials: "MK", uploadDate: "10 Kas 2024", downloads: 312, views: 1567, university: "selcuk", department: "Hukuk Fakültesi", course: "Medeni Hukuk", type: "exams", uploadTimestamp: parseDate("10 Kas 2024") },
    { id: 4, title: "Ceza Hukuku Genel Hükümler Özeti", fileType: "PDF", fileSize: "5.8 MB", uploadedBy: "Zeynep Arslan", uploaderInitials: "ZA", uploadDate: "8 Kas 2024", downloads: 156, views: 734, university: "selcuk", department: "Hukuk Fakültesi", course: "Ceza Hukuku", type: "notes", uploadTimestamp: parseDate("8 Kas 2024") },
    { id: 5, title: "Ticaret Hukuku Ders İzlencesi", fileType: "PDF", fileSize: "4.1 MB", uploadedBy: "Can Özkan", uploaderInitials: "CÖ", uploadDate: "5 Kas 2024", downloads: 98, views: 456, university: "selcuk", department: "Hukuk Fakültesi", course: "Ticaret Hukuku", type: "notes", uploadTimestamp: parseDate("5 Kas 2024") },
    { id: 6, title: "İdare Hukuku Final Çalışma Kılavuzu", fileType: "PDF", fileSize: "6.7 MB", uploadedBy: "Ayşe Çelik", uploaderInitials: "AÇ", uploadDate: "3 Kas 2024", downloads: 203, views: 987, university: "selcuk", department: "Hukuk Fakültesi", course: "İdare Hukuku", type: "notes", uploadTimestamp: parseDate("3 Kas 2024") },
    { id: 7, title: "Borçlar Hukuku Vaka Analizleri", fileType: "PDF", fileSize: "9.3 MB", uploadedBy: "Burak Yıldız", uploaderInitials: "BY", uploadDate: "1 Kas 2024", downloads: 167, views: 823, university: "selcuk", department: "Hukuk Fakültesi", course: "Borçlar Hukuku", type: "notes", uploadTimestamp: parseDate("1 Kas 2024") },
    { id: 8, title: "Hukuk Felsefesi Ders Notları", fileType: "PDF", fileSize: "7.2 MB", uploadedBy: "Selin Aydın", uploaderInitials: "SA", uploadDate: "29 Eki 2024", downloads: 134, views: 612, university: "selcuk", department: "Hukuk Fakültesi", course: "Hukuk Felsefesi", type: "notes", uploadTimestamp: parseDate("29 Eki 2024") },
    { id: 9, title: "Roma Hukuku Tarihi Özet", fileType: "PDF", fileSize: "4.9 MB", uploadedBy: "Emre Şahin", uploaderInitials: "EŞ", uploadDate: "27 Eki 2024", downloads: 89, views: 445, university: "selcuk", department: "Hukuk Fakültesi", course: "Roma Hukuku", type: "notes", uploadTimestamp: parseDate("27 Eki 2024") },
    
    // Selçuk Üniversitesi - Mühendislik
    { id: 10, title: "Matematik I Çözümlü Sorular", fileType: "PDF", fileSize: "15.2 MB", uploadedBy: "Dr. Fatma Korkmaz", uploaderInitials: "FK", uploadDate: "25 Eki 2024", downloads: 423, views: 2156, university: "selcuk", department: "Mühendislik Fakültesi", course: "Matematik I", type: "notes", uploadTimestamp: parseDate("25 Eki 2024") },
    { id: 11, title: "Fizik II Laboratuvar Raporları", fileType: "PDF", fileSize: "6.8 MB", uploadedBy: "Ali Yıldırım", uploaderInitials: "AY", uploadDate: "22 Eki 2024", downloads: 178, views: 890, university: "selcuk", department: "Mühendislik Fakültesi", course: "Fizik II", type: "notes", uploadTimestamp: parseDate("22 Eki 2024") },
    { id: 12, title: "Programlama Temelleri - Python", fileType: "PDF", fileSize: "11.4 MB", uploadedBy: "Doç. Dr. Murat Öz", uploaderInitials: "MÖ", uploadDate: "20 Eki 2024", downloads: 567, views: 3421, university: "selcuk", department: "Mühendislik Fakültesi", course: "Programlama Temelleri", type: "notes", uploadTimestamp: parseDate("20 Eki 2024") },
    { id: 18, title: "Makine Mühendisliği Statik Problemler", fileType: "PDF", fileSize: "14.2 MB", uploadedBy: "Prof. Dr. Osman Ata", uploaderInitials: "OA", uploadDate: "5 Eki 2024", downloads: 267, views: 1289, university: "selcuk", department: "Makine Mühendisliği", course: "Statik", type: "notes", uploadTimestamp: parseDate("5 Eki 2024") },
    { id: 19, title: "Elektrik Devre Analizi", fileType: "PDF", fileSize: "10.8 MB", uploadedBy: "Gökhan Yılmaz", uploaderInitials: "GY", uploadDate: "3 Eki 2024", downloads: 345, views: 1678, university: "selcuk", department: "Elektrik-Elektronik Mühendisliği", course: "Devre Analizi", type: "notes", uploadTimestamp: parseDate("3 Eki 2024") },
    
    // NEÜ - İktisat
    { id: 15, title: "İktisat Teorisi Ders Notları", fileType: "PDF", fileSize: "7.6 MB", uploadedBy: "Hakan Çetin", uploaderInitials: "HÇ", uploadDate: "12 Eki 2024", downloads: 198, views: 967, university: "neu", department: "İktisat Fakültesi", course: "İktisat Teorisi", type: "notes", uploadTimestamp: parseDate("12 Eki 2024") },
    { id: 16, title: "Muhasebe Genel İlkeler", fileType: "PDF", fileSize: "5.3 MB", uploadedBy: "Deniz Aksoy", uploaderInitials: "DA", uploadDate: "10 Eki 2024", downloads: 312, views: 1534, university: "neu", department: "İşletme Fakültesi", course: "Muhasebe", type: "notes", uploadTimestamp: parseDate("10 Eki 2024") },
    { id: 17, title: "İşletme Yönetimi Vaka Çalışmaları", fileType: "PDF", fileSize: "9.7 MB", uploadedBy: "Dr. Esin Kara", uploaderInitials: "EK", uploadDate: "8 Eki 2024", downloads: 156, views: 823, university: "neu", department: "İşletme Fakültesi", course: "İşletme Yönetimi", type: "notes", uploadTimestamp: parseDate("8 Eki 2024") },
    
    // KTO - Fen Edebiyat
    { id: 13, title: "İngilizce Akademik Yazım Teknikleri", fileType: "PDF", fileSize: "3.9 MB", uploadedBy: "Sevgi Demir", uploaderInitials: "SD", uploadDate: "18 Eki 2024", downloads: 234, views: 1123, university: "kto", department: "Fen Edebiyat Fakültesi", course: "İngilizce", type: "notes", uploadTimestamp: parseDate("18 Eki 2024") },
    { id: 14, title: "Kimya Organik Bileşikler Özet", fileType: "PDF", fileSize: "8.1 MB", uploadedBy: "Prof. Dr. Kemal Türk", uploaderInitials: "KT", uploadDate: "15 Eki 2024", downloads: 289, views: 1456, university: "kto", department: "Fen Edebiyat Fakültesi", course: "Organik Kimya", type: "notes", uploadTimestamp: parseDate("15 Eki 2024") },
    { id: 20, title: "Biyoloji Hücre Yapısı Notları", fileType: "PDF", fileSize: "6.4 MB", uploadedBy: "Dr. Pınar Su", uploaderInitials: "PS", uploadDate: "1 Eki 2024", downloads: 189, views: 945, university: "kto", department: "Fen Edebiyat Fakültesi", course: "Biyoloji", type: "notes", uploadTimestamp: parseDate("1 Eki 2024") },
    
    // KTÜN - Mühendislik
    { id: 21, title: "Psikolojiye Giriş Ders Özeti", fileType: "PDF", fileSize: "4.7 MB", uploadedBy: "Yasemin Kaya", uploaderInitials: "YK", uploadDate: "28 Eyl 2024", downloads: 423, views: 2134, university: "ktun", department: "Eğitim Fakültesi", course: "Psikoloji", type: "notes", uploadTimestamp: parseDate("28 Eyl 2024") },
    { id: 22, title: "Sosyoloji Temel Kavramlar", fileType: "PDF", fileSize: "5.1 MB", uploadedBy: "Dr. Uğur Şen", uploaderInitials: "UŞ", uploadDate: "25 Eyl 2024", downloads: 167, views: 834, university: "ktun", department: "Edebiyat Fakültesi", course: "Sosyoloji", type: "notes", uploadTimestamp: parseDate("25 Eyl 2024") },
    
    // KGTÜ - Tarım
    { id: 23, title: "Tarih Osmanlı Dönemi Notları", fileType: "PDF", fileSize: "8.9 MB", uploadedBy: "Prof. Dr. Ahmet Han", uploaderInitials: "AH", uploadDate: "22 Eyl 2024", downloads: 234, views: 1156, university: "kgtu", department: "Ziraat Fakültesi", course: "Tarih", type: "notes", uploadTimestamp: parseDate("22 Eyl 2024") },
    { id: 24, title: "Coğrafya İklim ve Bitki Örtüsü", fileType: "PDF", fileSize: "7.3 MB", uploadedBy: "Merve Toprak", uploaderInitials: "MT", uploadDate: "20 Eyl 2024", downloads: 145, views: 723, university: "kgtu", department: "Ziraat Fakültesi", course: "Coğrafya", type: "notes", uploadTimestamp: parseDate("20 Eyl 2024") },
    
    // Sınav Soruları
    { id: 25, title: "Hukuk Başlangıcı Final Sınav Soruları 2023", fileType: "PDF", fileSize: "2.8 MB", uploadedBy: "Mehmet Yıldız", uploaderInitials: "MY", uploadDate: "14 Kas 2024", downloads: 456, views: 2234, university: "selcuk", department: "Hukuk Fakültesi", course: "Hukuk Başlangıcı", type: "exams", uploadTimestamp: parseDate("14 Kas 2024") },
    { id: 26, title: "Anayasa Hukuku Vize Soruları 2024", fileType: "PDF", fileSize: "1.9 MB", uploadedBy: "Ayşe Kaya", uploaderInitials: "AK", uploadDate: "11 Kas 2024", downloads: 389, views: 1892, university: "selcuk", department: "Hukuk Fakültesi", course: "Anayasa Hukuku", type: "exams", uploadTimestamp: parseDate("11 Kas 2024") },
    { id: 27, title: "Matematik I Final Soruları 2023", fileType: "PDF", fileSize: "3.5 MB", uploadedBy: "Dr. Ali Demir", uploaderInitials: "AD", uploadDate: "24 Eki 2024", downloads: 523, views: 2456, university: "selcuk", department: "Mühendislik Fakültesi", course: "Matematik I", type: "exams", uploadTimestamp: parseDate("24 Eki 2024") },
    { id: 28, title: "Programlama Temelleri Vize Soruları", fileType: "PDF", fileSize: "2.1 MB", uploadedBy: "Doç. Dr. Murat Öz", uploaderInitials: "MÖ", uploadDate: "19 Eki 2024", downloads: 678, views: 3421, university: "selcuk", department: "Mühendislik Fakültesi", course: "Programlama Temelleri", type: "exams", uploadTimestamp: parseDate("19 Eki 2024") },
    { id: 29, title: "İktisat Teorisi Final Soruları 2023", fileType: "PDF", fileSize: "2.4 MB", uploadedBy: "Hakan Çetin", uploaderInitials: "HÇ", uploadDate: "11 Eki 2024", downloads: 298, views: 1456, university: "neu", department: "İktisat Fakültesi", course: "İktisat Teorisi", type: "exams", uploadTimestamp: parseDate("11 Eki 2024") },
    { id: 30, title: "Muhasebe Vize Soruları 2024", fileType: "PDF", fileSize: "1.7 MB", uploadedBy: "Deniz Aksoy", uploaderInitials: "DA", uploadDate: "9 Eki 2024", downloads: 412, views: 1987, university: "neu", department: "İşletme Fakültesi", course: "Muhasebe", type: "exams", uploadTimestamp: parseDate("9 Eki 2024") },
  ]

  // Filter and sort resources
  const filteredAndSortedResources = useMemo(() => {
    const filtered = allResources.filter(resource => {
      // Type filter
      if (resource.type !== selectedType) return false
      
      // University filter
      if (selectedUniversity !== "all" && resource.university !== selectedUniversity) return false
      
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = resource.title.toLowerCase().includes(query)
        const matchesCourse = resource.course.toLowerCase().includes(query)
        const matchesDepartment = resource.department.toLowerCase().includes(query)
        const matchesUploader = resource.uploadedBy.toLowerCase().includes(query)
        if (!matchesTitle && !matchesCourse && !matchesDepartment && !matchesUploader) return false
      }
      
      return true
    })

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (selectedSort) {
        case "newest":
          return b.uploadTimestamp - a.uploadTimestamp
        case "popular":
          return b.views - a.views
        case "downloads":
          return b.downloads - a.downloads
        default:
          return 0
      }
    })

    return sorted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUniversity, selectedSort, selectedType, searchQuery])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedUniversity, selectedSort, selectedType, searchQuery])

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedResources.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const resources = filteredAndSortedResources.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const hasActiveFilters = selectedUniversity !== "all" || selectedSort !== "newest" || searchQuery.trim() !== ""
  
  const clearFilters = () => {
    setSelectedUniversity("all")
    setSelectedSort("newest")
  }

  return (
    <div>
      {/* Kaynak Tipi Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-accent rounded-2xl w-fit mb-8 overflow-x-auto border border-border">
        {resourceTypes.map((type) => {
          const Icon = type.icon
          const isActive = selectedType === type.id
          return (
            <button
              key={type.id}
              onClick={() => {
                setSelectedType(type.id)
                setCurrentPage(1)
              }}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl font-[Manrope] font-bold text-sm whitespace-nowrap transition-all
                ${isActive 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-foreground/70 hover:text-foreground hover:bg-card/50'
                }
              `}
            >
              <Icon className={`w-4 h-4 ${isActive ? '' : 'opacity-70'}`} />
              <span className="hidden sm:inline">{type.label}</span>
            </button>
          )
        })}
      </div>

      {/* Filtre Satırı */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-2">
          {/* Üniversite */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                className={`h-9 px-3 rounded-lg font-[Manrope] transition-colors font-semibold text-xs border flex items-center gap-2
                  ${selectedUniversity !== "all" 
                    ? "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20" 
                    : "bg-card text-foreground border-border hover:bg-accent dark:hover:bg-accent"
                  }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span className="hidden sm:inline">{selectedUni.name === "Hepsi" ? "Üniversite" : selectedUni.name}</span>
                <span className="sm:hidden">{selectedUni.abbr}</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {universities.map((university) => (
                <DropdownMenuItem
                  key={university.id}
                  onClick={() => {
                    setSelectedUniversity(university.id)
                    setCurrentPage(1)
                  }}
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
          
          {hasActiveFilters && (
            <Button
              onClick={clearFilters}
              variant="ghost"
              size="sm"
              className="h-9 px-2 font-[Manrope] font-medium text-xs text-foreground/50 hover:text-primary hover:bg-transparent"
            >
              <X className="w-3 h-3 mr-1" />
              Temizle
            </Button>
          )}
        </div>

        {/* Sıralama Butonları */}
        <div className="flex items-center gap-1 bg-accent p-1 rounded-xl border border-border">
          <Button 
            onClick={() => {
              setSelectedSort("newest")
              setCurrentPage(1)
            }}
            variant="ghost"
            size="sm"
            className={`h-8 px-3 rounded-lg font-[Manrope] transition-colors font-bold text-xs
              ${selectedSort === "newest"
                ? 'bg-primary text-white shadow-sm hover:bg-primary/90' 
                : 'text-foreground/70 hover:text-foreground hover:bg-card/50'
              }
            `}
          >
            En Yeni
          </Button>
          <Button 
            onClick={() => {
              setSelectedSort("popular")
              setCurrentPage(1)
            }}
            variant="ghost"
            size="sm"
            className={`h-8 px-3 rounded-lg font-[Manrope] transition-colors font-bold text-xs
              ${selectedSort === "popular"
                ? 'bg-primary text-white shadow-sm hover:bg-primary/90' 
                : 'text-foreground/70 hover:text-foreground hover:bg-card/50'
              }
            `}
          >
            Popüler
          </Button>
          <Button 
            onClick={() => {
              setSelectedSort("downloads")
              setCurrentPage(1)
            }}
            variant="ghost"
            size="sm"
            className={`h-8 px-3 rounded-lg font-[Manrope] transition-colors font-bold text-xs
              ${selectedSort === "downloads"
                ? 'bg-primary text-white shadow-sm hover:bg-primary/90' 
                : 'text-foreground/70 hover:text-foreground hover:bg-card/50'
              }
            `}
          >
            İndirilen
          </Button>
        </div>
      </div>

      {resources.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} {...resource} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-9 px-3 rounded-lg font-[Manrope] font-semibold text-xs border border-border disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`h-9 w-9 rounded-lg font-[Manrope] font-bold text-sm
                      ${currentPage === page
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                      }
                    `}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-9 px-3 rounded-lg font-[Manrope] font-semibold text-xs border border-border disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
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
              {searchQuery.trim() 
                ? "Arama kriterlerinize uygun kaynak bulunamadı. Filtreleri değiştirmeyi deneyin."
                : "Seçilen filtreye uygun kaynak bulunamadı. Filtreleri değiştirmeyi deneyin."
              }
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              onClick={() => {
                setSelectedUniversity("all")
                setSelectedSort("newest")
                setCurrentPage(1)
              }}
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

"use client"

import { useState } from "react"
import { ScholarshipCard } from "./scholarship-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia, EmptyContent } from "@/components/ui/empty"
import { ChevronDown, GraduationCap, X, ChevronLeft, ChevronRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"

const ITEMS_PER_PAGE = 5

export function ScholarshipBoard() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSubCategory, setSelectedSubCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const categories = [
    {
      id: "all",
      name: "Tümü",
      subCategories: [],
    },
    {
      id: "government",
      name: "Devlet Bursları",
      subCategories: [
        { id: "kktc", name: "KKTC Bursları" },
        { id: "yurtdisi", name: "Yurtdışı Bursları" },
        { id: "yurt", name: "Yurt Bursları" },
        { id: "egitim", name: "Eğitim Bursları" },
      ],
    },
    {
      id: "university",
      name: "Üniversite Bursları",
      subCategories: [
        { id: "selcuk", name: "Selçuk Üniversitesi" },
        { id: "neu", name: "Necmettin Erbakan Üniversitesi" },
        { id: "kto", name: "KTO Karatay Üniversitesi" },
        { id: "ktun", name: "Konya Teknik Üniversitesi" },
      ],
    },
    {
      id: "private",
      name: "Özel Kurum Bursları",
      subCategories: [
        { id: "vakif", name: "Vakıf Bursları" },
        { id: "sirket", name: "Şirket Bursları" },
        { id: "dernek", name: "Dernek Bursları" },
      ],
    },
  ]

  const scholarships = [
    {
      id: 1,
      organization: "Konya Büyükşehir Belediyesi",
      organizationLogo: "KBB",
      title: "Konya Gençlik Burs Programı",
      amount: "2.500₺/Ay",
      location: "Konya",
      deadline: "15 Aralık 2024",
      deadlineDays: 12,
      type: "Government" as const,
      category: "government",
      subCategory: "egitim",
    },
    {
      id: 2,
      organization: "Selçuk Üniversitesi",
      organizationLogo: "SÜ",
      title: "Başarı Bursu - Mühendislik Fakültesi",
      amount: "1.500₺/Ay",
      location: "Selçuklu, Konya",
      deadline: "20 Aralık 2024",
      deadlineDays: 17,
      type: "Merit" as const,
      category: "university",
      subCategory: "selcuk",
    },
    {
      id: 3,
      organization: "KOMEK",
      organizationLogo: "KM",
      title: "Mesleki Eğitim Burs Programı",
      amount: "1.000₺/Ay",
      location: "Konya",
      deadline: "10 Aralık 2024",
      deadlineDays: 7,
      type: "Need-Based" as const,
      category: "government",
      subCategory: "egitim",
    },
    {
      id: 4,
      organization: "Necmettin Erbakan Üniversitesi",
      organizationLogo: "NEÜ",
      title: "Yüksek Lisans Burs Programı",
      amount: "3.000₺/Ay",
      location: "Meram, Konya",
      deadline: "25 Aralık 2024",
      deadlineDays: 22,
      type: "Merit" as const,
      category: "university",
      subCategory: "neu",
    },
    {
      id: 5,
      organization: "Konya Spor Kulübü",
      organizationLogo: "KSK",
      title: "Sporcu Burs Programı",
      amount: "2.000₺/Ay",
      location: "Konya",
      deadline: "18 Aralık 2024",
      deadlineDays: 15,
      type: "Athletic" as const,
      category: "private",
      subCategory: "dernek",
    },
    {
      id: 6,
      organization: "KTO Karatay Üniversitesi",
      organizationLogo: "KTO",
      title: "İhtiyaç Bursu - Tüm Fakülteler",
      amount: "1.200₺/Ay",
      location: "Karatay, Konya",
      deadline: "12 Aralık 2024",
      deadlineDays: 9,
      type: "Need-Based" as const,
      category: "university",
      subCategory: "kto",
    },
    {
      id: 7,
      organization: "Konya Teknik Üniversitesi",
      organizationLogo: "KTÜ",
      title: "Araştırma Bursu",
      amount: "2.200₺/Ay",
      location: "Selçuklu, Konya",
      deadline: "22 Aralık 2024",
      deadlineDays: 19,
      type: "Merit" as const,
      category: "university",
      subCategory: "ktun",
    },
    {
      id: 8,
      organization: "Konya Vakıflar Bölge Müdürlüğü",
      organizationLogo: "KV",
      title: "Vakıf Burs Programı",
      amount: "1.800₺/Ay",
      location: "Konya",
      deadline: "14 Aralık 2024",
      deadlineDays: 11,
      type: "Need-Based" as const,
      category: "private",
      subCategory: "vakif",
    },
    {
      id: 9,
      organization: "Konya Ticaret Odası",
      organizationLogo: "KTO",
      title: "İşletme Burs Programı",
      amount: "2.300₺/Ay",
      location: "Karatay, Konya",
      deadline: "16 Aralık 2024",
      deadlineDays: 13,
      type: "Merit" as const,
      category: "private",
      subCategory: "sirket",
    },
    {
      id: 10,
      organization: "Konya Gençlik ve Spor İl Müdürlüğü",
      organizationLogo: "KGS",
      title: "Sporcu Destek Bursu",
      amount: "1.500₺/Ay",
      location: "Konya",
      deadline: "19 Aralık 2024",
      deadlineDays: 16,
      type: "Athletic" as const,
      category: "government",
      subCategory: "egitim",
    },
  ]

  const selectedCategoryData = categories.find(c => c.id === selectedCategory)
  const filteredScholarships = scholarships.filter(scholarship => {
    const categoryMatch = selectedCategory === "all" || scholarship.category === selectedCategory
    const subCategoryMatch = selectedSubCategory === "all" || scholarship.subCategory === selectedSubCategory
    
    return categoryMatch && subCategoryMatch
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredScholarships.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedScholarships = filteredScholarships.slice(startIndex, endIndex)

  // Reset to page 1 when filter changes
  const handleFilterChange = (category: string, subCategory: string = "all") => {
    setSelectedCategory(category)
    setSelectedSubCategory(subCategory)
    setCurrentPage(1)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <h2 className="font-[Manrope] text-foreground font-extrabold text-xl sm:text-2xl lg:text-[28px]">
          Burs İlanları
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                className="px-3 sm:px-4 py-2 bg-card text-foreground rounded-xl font-[Manrope] hover:bg-accent dark:hover:bg-accent transition-colors shadow-sm font-bold text-xs sm:text-sm border border-border flex items-center gap-2"
              >
                {selectedCategoryData?.name || "Kategori"}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {categories.map((category) => (
                category.subCategories.length > 0 ? (
                  <DropdownMenuSub key={category.id}>
                    <DropdownMenuSubTrigger
                      onClick={() => handleFilterChange(category.id, "all")}
                      className={selectedCategory === category.id ? 'bg-primary text-white' : ''}
                    >
                      {category.name}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        onClick={() => handleFilterChange(category.id, "all")}
                        className={selectedSubCategory === "all" && selectedCategory === category.id ? 'bg-primary text-white' : ''}
                      >
                        Tümü
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {category.subCategories.map((sub) => (
                        <DropdownMenuItem
                          key={sub.id}
                          onClick={() => handleFilterChange(category.id, sub.id)}
                          className={selectedSubCategory === sub.id && selectedCategory === category.id ? 'bg-primary text-white' : ''}
                        >
                          {sub.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                ) : (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => handleFilterChange(category.id, "all")}
                    className={selectedCategory === category.id ? 'bg-primary text-white' : ''}
                  >
                    {category.name}
                  </DropdownMenuItem>
                )
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {(selectedCategory !== "all" || selectedSubCategory !== "all") && (
            <>
              <Button
                onClick={() => handleFilterChange("all", "all")}
                variant="outline"
                size="sm"
                className="font-[Manrope] font-bold text-xs text-foreground/60 dark:text-muted-foreground hover:text-primary"
              >
                <X className="w-3 h-3 mr-1" />
                Temizle
              </Button>
              <Badge className="font-[Manrope] font-bold text-xs bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary">
                {[selectedCategory !== "all" ? 1 : 0, selectedSubCategory !== "all" ? 1 : 0].reduce((a, b) => a + b, 0)} aktif filtre
              </Badge>
            </>
          )}
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {paginatedScholarships.length > 0 ? (
          paginatedScholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} {...scholarship} />
          ))
        ) : (
          <Empty className="py-12 sm:py-16">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <GraduationCap className="w-12 h-12 text-muted-foreground" />
              </EmptyMedia>
              <EmptyTitle className="font-[Manrope] font-bold text-xl sm:text-2xl">
                Burs Bulunamadı
              </EmptyTitle>
              <EmptyDescription className="font-[Manrope] text-base">
                Seçilen kriterlere uygun burs ilanı bulunamadı. Filtreleri değiştirmeyi deneyin.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                onClick={() => handleFilterChange("all", "all")}
                variant="outline"
                className="font-[Manrope] font-bold"
              >
                Tüm Bursları Göster
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
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
    </div>
  )
}

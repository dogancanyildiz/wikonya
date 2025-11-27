"use client"

import { useState } from "react"
import { ScholarshipCard } from "./scholarship-card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
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

export function ScholarshipBoard() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSubCategory, setSelectedSubCategory] = useState("all")

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
  ]

  const selectedCategoryData = categories.find(c => c.id === selectedCategory)
  const filteredScholarships = scholarships.filter(scholarship => {
    const categoryMatch = selectedCategory === "all" || scholarship.category === selectedCategory
    const subCategoryMatch = selectedSubCategory === "all" || scholarship.subCategory === selectedSubCategory
    
    return categoryMatch && subCategoryMatch
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <h2 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-extrabold text-xl sm:text-2xl lg:text-[28px]">
          Burs İlanları
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                className="px-3 sm:px-4 py-2 bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground rounded-xl font-[Manrope] hover:bg-[#f2f4f3] dark:hover:bg-accent transition-colors shadow-sm font-bold text-xs sm:text-sm border border-border flex items-center gap-2"
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
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setSelectedSubCategory("all")
                      }}
                      className={selectedCategory === category.id ? 'bg-[#03624c] text-white' : ''}
                    >
                      {category.name}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedCategory(category.id)
                          setSelectedSubCategory("all")
                        }}
                        className={selectedSubCategory === "all" && selectedCategory === category.id ? 'bg-[#03624c] text-white' : ''}
                      >
                        Tümü
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {category.subCategories.map((sub) => (
                        <DropdownMenuItem
                          key={sub.id}
                          onClick={() => {
                            setSelectedCategory(category.id)
                            setSelectedSubCategory(sub.id)
                          }}
                          className={selectedSubCategory === sub.id && selectedCategory === category.id ? 'bg-[#03624c] text-white' : ''}
                        >
                          {sub.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                ) : (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id)
                      setSelectedSubCategory("all")
                    }}
                    className={selectedCategory === category.id ? 'bg-[#03624c] text-white' : ''}
                  >
                    {category.name}
                  </DropdownMenuItem>
                )
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {filteredScholarships.length > 0 ? (
          filteredScholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} {...scholarship} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium">
              Seçilen kriterlere uygun burs bulunamadı.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}


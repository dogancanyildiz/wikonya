"use client"

import { useState } from "react"
import * as React from "react"
import { WorkshopCard } from "./workshop-card"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
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

interface DevelopmentHubProps {
  searchQuery?: string
}

export function DevelopmentHub({ searchQuery = "" }: DevelopmentHubProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSubCategory, setSelectedSubCategory] = useState("all")

  const categories = [
    {
      id: "all",
      name: "Tümü",
      subCategories: [],
    },
    {
      id: "municipality",
      name: "Belediye Kurumları",
      subCategories: [
        { id: "komek", name: "KOMEK" },
        { id: "kapsul", name: "Kapsül" },
        { id: "divizyon", name: "Divizyon" },
        { id: "kbb-akademi", name: "KBB Akademi" },
        { id: "bilim-merkezi", name: "Konya Bilim Merkezi" },
        { id: "kultur", name: "Kültür ve Sosyal İşler" },
      ],
    },
    {
      id: "university",
      name: "Üniversite Etkinlikleri",
      subCategories: [
        { id: "selcuk", name: "Selçuk Üniversitesi" },
        { id: "neu", name: "Necmettin Erbakan Üniversitesi" },
        { id: "kto", name: "KTO Karatay Üniversitesi" },
        { id: "ktun", name: "Konya Teknik Üniversitesi" },
        { id: "kgtu", name: "Konya Gıda ve Tarım Üniversitesi" },
      ],
    },
    {
      id: "other",
      name: "Diğer Kurumlar",
      subCategories: [
        { id: "teknokent", name: "Teknokent" },
        { id: "startup", name: "Startup Toplulukları" },
        { id: "ngo", name: "STK'lar" },
      ],
    },
  ]

  const workshops = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1762158007969-eb58e74ee3d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjBzcGVha2luZyUyMHN0YWdlfGVufDF8fHx8MTc2NDE3Njg1MHww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "KOMEK Diksiyon Kursu",
      organizer: "KOMEK",
      date: "26 Kasım 2024",
      dateDay: "26",
      dateMonth: "KAS",
      time: "14:00 - 16:00",
      location: "KOMEK Merkez",
      participants: 18,
      maxParticipants: 25,
      isFree: true,
      category: "municipality",
      subCategory: "komek",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMGxhcHRvcHxlbnwxfHx8fDE3NjQxNTkzMTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Web Geliştirme Atölyesi",
      organizer: "KBB Akademi",
      date: "28 Kasım 2024",
      dateDay: "28",
      dateMonth: "KAS",
      time: "10:00 - 17:00",
      location: "Konya Bilim Merkezi",
      participants: 32,
      maxParticipants: 40,
      isFree: false,
      category: "municipality",
      subCategory: "kbb-akademi",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1738676524296-364cf18900a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHN0dWRpb3xlbnwxfHx8fDE3NjQxNjU2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "UI/UX Design Temelleri",
      organizer: "Selçuk Üniversitesi",
      date: "1 Aralık 2024",
      dateDay: "01",
      dateMonth: "ARA",
      time: "13:00 - 16:00",
      location: "Selçuk Üniversitesi",
      participants: 24,
      maxParticipants: 30,
      isFree: true,
      category: "university",
      subCategory: "selcuk",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1707301280425-475534ec3cc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByZXNlbnRhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzY0MDgwMTg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Girişimcilik ve İnovasyon",
      organizer: "NEÜ Teknokent",
      date: "3 Aralık 2024",
      dateDay: "03",
      dateMonth: "ARA",
      time: "15:00 - 18:00",
      location: "NEÜ Konferans Salonu",
      participants: 45,
      maxParticipants: 60,
      isFree: true,
      category: "university",
      subCategory: "neu",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1761250246894-ee2314939662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc2hvcCUyMHRyYWluaW5nJTIwc2VtaW5hcnxlbnwxfHx8fDE3NjQxNTY0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Dijital Pazarlama Stratejileri",
      organizer: "KOMEK",
      date: "5 Aralık 2024",
      dateDay: "05",
      dateMonth: "ARA",
      time: "14:00 - 17:00",
      location: "Online",
      participants: 67,
      maxParticipants: 100,
      isFree: true,
      category: "municipality",
      subCategory: "komek",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=600",
      title: "Kapsül Girişimcilik Programı",
      organizer: "Kapsül",
      date: "7 Aralık 2024",
      dateDay: "07",
      dateMonth: "ARA",
      time: "10:00 - 16:00",
      location: "Kapsül Merkez",
      participants: 28,
      maxParticipants: 35,
      isFree: true,
      category: "municipality",
      subCategory: "kapsul",
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=600",
      title: "Divizyon Teknoloji Atölyesi",
      organizer: "Divizyon",
      date: "10 Aralık 2024",
      dateDay: "10",
      dateMonth: "ARA",
      time: "13:00 - 17:00",
      location: "Divizyon Kuluçka Merkezi",
      participants: 15,
      maxParticipants: 20,
      isFree: true,
      category: "municipality",
      subCategory: "divizyon",
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=600",
      title: "KTO Kariyer Günleri",
      organizer: "KTO Karatay Üniversitesi",
      date: "12 Aralık 2024",
      dateDay: "12",
      dateMonth: "ARA",
      time: "09:00 - 18:00",
      location: "KTO Kampüs",
      participants: 120,
      maxParticipants: 200,
      isFree: true,
      category: "university",
      subCategory: "kto",
    },
  ]

  const selectedCategoryData = categories.find(c => c.id === selectedCategory)
  const filteredWorkshops = workshops.filter(workshop => {
    const categoryMatch = selectedCategory === "all" || workshop.category === selectedCategory
    const subCategoryMatch = selectedSubCategory === "all" || workshop.subCategory === selectedSubCategory
    
    // Search query filter
    const searchMatch = !searchQuery.trim() ||
      workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    return categoryMatch && subCategoryMatch && searchMatch
  })

  // Reset page when search query changes
  React.useEffect(() => {
    // DevelopmentHub doesn't have pagination, but we can add it if needed
  }, [searchQuery])

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <h2 className="font-[Manrope] text-foreground font-extrabold text-xl sm:text-2xl lg:text-[28px]">
          Etkinlikler & Kurslar
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Filter Dropdown */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                className="px-3 sm:px-4 py-2 bg-card text-foreground rounded-xl font-[Manrope] hover:bg-accent dark:hover:bg-accent transition-colors shadow-sm font-bold text-xs sm:text-sm border border-border flex items-center gap-2"
              >
                {selectedCategoryData?.name || "Kategori"}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
              {categories.map((category) => (
                category.subCategories.length > 0 ? (
                  <DropdownMenuSub key={category.id}>
                    <DropdownMenuSubTrigger
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setSelectedSubCategory("all")
                      }}
                      className={selectedCategory === category.id ? 'bg-primary text-white' : ''}
                    >
                      {category.name}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedCategory(category.id)
                          setSelectedSubCategory("all")
                        }}
                        className={selectedSubCategory === "all" && selectedCategory === category.id ? 'bg-primary text-white' : ''}
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
                    onClick={() => {
                      setSelectedCategory(category.id)
                      setSelectedSubCategory("all")
                    }}
                    className={selectedCategory === category.id ? 'bg-primary text-white' : ''}
                  >
                    {category.name}
                  </DropdownMenuItem>
                )
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredWorkshops.length > 0 ? (
          filteredWorkshops.map((workshop) => (
            <WorkshopCard key={workshop.id} {...workshop} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium">
              Seçilen kriterlere uygun etkinlik bulunamadı.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}


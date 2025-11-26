"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export function AcademicHeader() {
  return (
    <Card className="rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg mb-8 sm:mb-10 border border-border">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
          <div className="flex-shrink-0">
            <h1 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-extrabold text-3xl sm:text-4xl leading-tight mb-2">
              Akademik Kaynaklar
            </h1>
            <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground mt-2 font-medium text-base">
              Ders notları, sınav soruları ve akademik içerikler
            </p>
          </div>

          <div className="flex-1 w-full lg:max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-[#4d4d4d]/60 dark:text-muted-foreground" />
              <Input
                type="text"
                placeholder="Ders, Hoca veya Konu Ara..."
                className="w-full h-12 sm:h-14 pl-12 sm:pl-14 pr-6 bg-[#f2f4f3] dark:bg-accent border-2 border-transparent rounded-2xl font-[Manrope] text-[#4d4d4d] dark:text-foreground placeholder:text-[#4d4d4d]/40 dark:placeholder:text-muted-foreground focus:outline-none focus:border-[#03624c] focus:bg-white dark:focus:bg-card transition-all font-medium text-base"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


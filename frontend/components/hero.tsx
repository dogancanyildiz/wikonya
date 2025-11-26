"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Hero() {
  return (
    <div className="bg-[#f2f4f3] dark:bg-muted pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-[Manrope] font-black text-[#4d4d4d] dark:text-foreground mb-8 text-3xl sm:text-4xl lg:text-5xl">
            Konya&apos;nın Bilgi Evreni
          </h1>
          <p className="font-[Manrope] font-medium text-[#4d4d4d]/70 dark:text-muted-foreground mb-12 max-w-2xl mx-auto text-base sm:text-lg">
            Öğrencilerin bilgi paylaşım platformu. Sorularını sor, deneyimlerini paylaş, toplulukla birlikte öğren.
          </p>
          
          {/* Premium Search Bar */}
          <div className="relative max-w-3xl mx-auto">
            <div className="relative flex items-center bg-white dark:bg-card rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-lg hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)] dark:hover:shadow-xl transition-shadow duration-300">
              <Search className="absolute left-4 sm:left-6 w-5 h-5 sm:w-6 sm:h-6 text-[#03624c]" />
              <Input
                type="text"
                placeholder="Konuları, soruları keşfet..."
                className="w-full h-[60px] pl-12 sm:pl-16 pr-28 sm:pr-32 bg-transparent rounded-[20px] font-[Manrope] font-medium text-[#4d4d4d] dark:text-foreground placeholder:text-[#4d4d4d]/40 dark:placeholder:text-muted-foreground focus:outline-none border-0 focus-visible:ring-0"
              />
              <Button className="absolute right-2 h-[48px] px-6 sm:px-8 bg-[#03624c] hover:bg-[#03624c]/90 rounded-[16px] font-[Manrope] font-semibold text-white">
                Ara
              </Button>
            </div>
          </div>

          {/* Quick Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            <span className="font-[Manrope] font-semibold text-[#4d4d4d]/60 dark:text-muted-foreground text-sm">Popüler:</span>
            {["Yurt Önerileri", "Ders Notları", "Etkinlikler", "Sosyal Kulüpler"].map((tag) => (
              <button
                key={tag}
                className="px-3 sm:px-4 py-2 bg-white dark:bg-card hover:bg-[#03624c] hover:text-white dark:hover:bg-[#03624c] text-[#4d4d4d] dark:text-foreground rounded-full font-[Manrope] font-semibold transition-colors duration-200 text-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


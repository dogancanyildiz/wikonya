"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, MapPin, Users } from "lucide-react"

export function UniversitySelector() {
  const universities = [
    { 
      id: "selcuk", 
      name: "Selçuk Üniversitesi", 
      abbr: "SÜ",
      description: "Konya'nın en köklü devlet üniversitesi. Geniş akademik program yelpazesi ve güçlü araştırma altyapısı ile öne çıkar.",
      location: "Selçuklu, Konya",
      students: "70,000+",
      established: "1975"
    },
    { 
      id: "neu", 
      name: "Necmettin Erbakan Üniversitesi", 
      abbr: "NEÜ",
      description: "Modern eğitim anlayışı ve yenilikçi programları ile öğrencilere kapsamlı akademik imkanlar sunar.",
      location: "Meram, Konya",
      students: "45,000+",
      established: "2010"
    },
    { 
      id: "kto", 
      name: "KTO Karatay Üniversitesi", 
      abbr: "KTO",
      description: "Özel üniversite olarak hizmet veren, iş dünyası ile güçlü bağları olan modern bir eğitim kurumu.",
      location: "Karatay, Konya",
      students: "8,000+",
      established: "2008"
    },
    { 
      id: "ktun", 
      name: "Konya Teknik Üniversitesi", 
      abbr: "KTÜN",
      description: "Teknik ve mühendislik alanlarında uzmanlaşmış, modern laboratuvarları ve güçlü endüstri işbirlikleri ile öne çıkan üniversite.",
      location: "Selçuklu, Konya",
      students: "15,000+",
      established: "2018"
    },
    { 
      id: "kgtu", 
      name: "Konya Gıda ve Tarım Üniversitesi", 
      abbr: "KGTÜ",
      description: "Gıda bilimleri ve tarım alanlarında öncü, araştırma odaklı bir üniversite. Sürdürülebilir tarım ve gıda güvenliği konularında uzmanlaşmış.",
      location: "Meram, Konya",
      students: "3,500+",
      established: "2010"
    },
  ]

  return (
    <div className="mb-6">
      <h2 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-xl sm:text-2xl mb-4 sm:mb-6">
        Konya Üniversiteleri
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {universities.map((university) => (
          <Card
            key={university.id}
            className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border"
          >
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-[#03624c] to-[#024d3c] flex items-center justify-center flex-shrink-0">
                  <span className="font-[Manrope] text-white font-extrabold text-lg sm:text-xl">
                    {university.abbr}
                  </span>
                </div>
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#03624c] flex-shrink-0" />
              </div>
              
              <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl mb-2">
                {university.name}
              </h3>
              
              <p className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground text-sm mb-4 leading-relaxed">
                {university.description}
              </p>
              
              <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-border">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#03624c] flex-shrink-0" />
                  <span className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground text-xs sm:text-sm">
                    {university.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#03624c] flex-shrink-0" />
                  <span className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground text-xs sm:text-sm">
                    {university.students} öğrenci
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#03624c] flex-shrink-0" />
                  <span className="font-[Manrope] text-[#03624c] font-semibold text-xs sm:text-sm">
                    Kuruluş: {university.established}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


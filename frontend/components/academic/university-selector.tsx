"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function UniversitySelector() {
  const [selectedUniversity, setSelectedUniversity] = useState("selcuk")

  const universities = [
    { id: "selcuk", name: "Selçuk Üniversitesi", abbr: "SÜ" },
    { id: "neu", name: "Necmettin Erbakan Üniversitesi", abbr: "NEÜ" },
    { id: "kto", name: "KTO Karatay Üniversitesi", abbr: "KTO" },
  ]

  return (
    <Card className="rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg mb-6 border border-border">
      <CardHeader>
        <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-base mb-4">
          Üniversite Seçin
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 flex-wrap">
          {universities.map((university) => {
            const isSelected = selectedUniversity === university.id
            
            return (
              <button
                key={university.id}
                onClick={() => setSelectedUniversity(university.id)}
                className="flex flex-col items-center gap-2 group"
              >
                <div 
                  className={`
                    w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f2f4f3] dark:bg-accent flex items-center justify-center transition-all
                    ${isSelected 
                      ? 'ring-4 ring-[#03624c] shadow-[0_4px_20px_rgba(3,98,76,0.2)] dark:shadow-[#03624c]/30' 
                      : 'hover:ring-2 hover:ring-[#03624c]/30 dark:hover:ring-[#03624c]/20'
                    }
                  `}
                >
                  <span 
                    className={`font-[Manrope] ${isSelected ? 'text-[#03624c]' : 'text-[#4d4d4d] dark:text-foreground'}`}
                    style={{ fontWeight: 800, fontSize: '18px' }}
                  >
                    {university.abbr}
                  </span>
                </div>
                <span 
                  className={`font-[Manrope] text-center max-w-[120px] ${isSelected ? 'text-[#03624c] font-bold' : 'text-[#4d4d4d]/60 dark:text-muted-foreground font-medium'}`}
                  style={{ fontSize: '13px' }}
                >
                  {university.name}
                </span>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}


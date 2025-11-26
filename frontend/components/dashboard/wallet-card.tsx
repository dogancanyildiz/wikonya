"use client"

import { ArrowUpRight, TrendingUp, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CoinIcon } from "@/components/coin-icon"

export function WalletCard() {
  return (
    <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
      <CardContent className="p-6 sm:p-10">
        <div className="flex items-start justify-between mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <CoinIcon />
              <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground uppercase tracking-wider font-bold text-xs sm:text-sm">
                Toplam GençCoin
              </p>
            </div>
            <div className="font-[Manrope] text-[#03624c] leading-none mb-2 font-black text-5xl sm:text-6xl lg:text-[72px]">
              12,450
            </div>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-[Manrope] font-semibold text-xs sm:text-sm">
                +240 bu hafta
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#03624c] to-[#024d3c] rounded-2xl p-4 sm:p-6 text-white">
            <Gift className="w-8 h-8 sm:w-10 sm:h-10 mb-1 sm:mb-2" />
            <p className="font-[Manrope] font-bold text-[10px] sm:text-xs">
              BRONZE
            </p>
            <p className="font-[Manrope] opacity-90 font-medium text-[9px] sm:text-[10px]">
              SEVIYE
            </p>
          </div>
        </div>

        <Button 
          className="w-full h-12 sm:h-14 bg-[#03624c] hover:bg-[#03624c]/90 rounded-xl font-[Manrope] text-white mb-4 font-bold text-sm sm:text-base"
        >
          Kültür Kart&apos;a Aktar
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
        </Button>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-border">
          <div>
            <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground mb-1 font-medium text-[10px] sm:text-xs">
              Bu Ay Kazanılan
            </p>
            <p className="font-[Manrope] text-[#03624c] font-bold text-lg sm:text-2xl lg:text-[24px]">
              485
            </p>
          </div>
          <div>
            <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground mb-1 font-medium text-[10px] sm:text-xs">
              Harcanan
            </p>
            <p className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-2xl lg:text-[24px]">
              120
            </p>
          </div>
          <div>
            <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground mb-1 font-medium text-[10px] sm:text-xs">
              Toplam Kazanç
            </p>
            <p className="font-[Manrope] text-[#03624c] font-bold text-lg sm:text-2xl lg:text-[24px]">
              12,570
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


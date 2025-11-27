"use client"

import { ArrowUpRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CoinIcon } from "@/components/common/icons/coin-icon"

export function WalletCard() {
  return (
    <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border h-full flex flex-col">
      <CardContent className="p-3 sm:p-5 flex flex-col flex-1">
        <div className="mb-3 sm:mb-4">
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <CoinIcon />
            <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground uppercase tracking-wider font-bold text-[10px] sm:text-xs">
              Toplam GençCoin
            </p>
          </div>
          <div className="font-[Manrope] text-[#03624c] leading-none mb-1 font-black text-3xl sm:text-4xl lg:text-[36px]">
            12,450
          </div>
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span className="font-[Manrope] font-semibold text-[10px] sm:text-xs">
              +240 bu hafta
            </span>
          </div>
        </div>

        <Button 
          className="w-full h-8 sm:h-10 bg-[#03624c] hover:bg-[#03624c]/90 rounded-xl font-[Manrope] text-white mb-2 font-bold text-xs sm:text-sm"
        >
          Kültür Kart&apos;a Aktar
          <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
        </Button>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200 dark:border-border">
          <div>
            <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground mb-0.5 font-medium text-[9px] sm:text-[10px]">
              Bu Ay Kazanılan
            </p>
            <p className="font-[Manrope] text-[#03624c] font-bold text-base sm:text-lg lg:text-xl">
              485
            </p>
          </div>
          <div>
            <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground mb-0.5 font-medium text-[9px] sm:text-[10px]">
              Harcanan
            </p>
            <p className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-base sm:text-lg lg:text-xl">
              120
            </p>
          </div>
          <div>
            <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground mb-0.5 font-medium text-[9px] sm:text-[10px]">
              Toplam Kazanç
            </p>
            <p className="font-[Manrope] text-[#03624c] font-bold text-base sm:text-lg lg:text-xl">
              12,570
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


"use client"

import { usePathname, useRouter } from "next/navigation"
import { Wallet, BookOpen, UserPlus, Trophy, Settings, BarChart3, MessageSquare, Bell } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const tabs = [
  { id: "contributions", label: "Katkılarım", icon: BookOpen, href: "/dashboard" },
  { id: "wallet", label: "Cüzdan & GençCoin", icon: Wallet, href: "/dashboard/wallet" },
  { id: "messages", label: "Mesajlar", icon: MessageSquare, href: "/dashboard/messages" },
  { id: "notifications", label: "Bildirimler", icon: Bell, href: "/dashboard/notifications" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
  { id: "invite", label: "Arkadaşını Davet Et", icon: UserPlus, href: "/dashboard/invite" },
  { id: "achievements", label: "Başarılar", icon: Trophy, href: "/dashboard/achievements" },
  { id: "settings", label: "Ayarlar", icon: Settings, href: "/dashboard/settings" },
]

export function DashboardTabbar() {
  const pathname = usePathname()
  const router = useRouter()
  
  // Aktif tab'ı belirle
  const getActiveTab = () => {
    if (pathname === "/dashboard") return "contributions"
    if (pathname?.startsWith("/dashboard/wallet")) return "wallet"
    if (pathname?.startsWith("/dashboard/messages")) return "messages"
    if (pathname?.startsWith("/dashboard/notifications")) return "notifications"
    if (pathname?.startsWith("/dashboard/analytics")) return "analytics"
    if (pathname?.startsWith("/dashboard/invite")) return "invite"
    if (pathname?.startsWith("/dashboard/achievements")) return "achievements"
    if (pathname?.startsWith("/dashboard/settings")) return "settings"
    return "contributions"
  }

  const activeTab = getActiveTab()
  const activeTabData = tabs.find(t => t.id === activeTab) || tabs[0]

  const handleTabChange = (value: string) => {
    const tab = tabs.find(t => t.id === value)
    if (tab) {
      router.push(tab.href)
    }
  }

  return (
    <>
      {/* Desktop: Tabs */}
      <div className="hidden md:block">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-8 h-auto p-1 bg-accent dark:bg-accent/50 rounded-lg border border-border">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-md font-[Manrope] font-semibold text-xs sm:text-sm
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-card dark:bg-card text-primary dark:text-primary shadow-sm' 
                      : 'text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{tab.label}</span>
                  <span className="lg:hidden">{tab.label.split(' ')[0]}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>
        </Tabs>
      </div>

      {/* Mobile: Dropdown */}
      <div className="md:hidden mt-4">
        <Select value={activeTab} onValueChange={handleTabChange}>
          <SelectTrigger className="w-full h-14 font-[Manrope] font-bold bg-card dark:bg-card border-2 border-primary/30 dark:border-primary/40 rounded-xl shadow-lg hover:shadow-xl hover:border-primary/50 active:scale-[0.98] transition-all duration-200 [&>svg]:text-primary [&>svg]:opacity-80 [&>svg]:w-5 [&>svg]:h-5 [&_[data-slot=select-value]]:text-foreground [&_[data-slot=select-value]]:font-bold [&_[data-slot=select-value]]:text-base">
            <div className="flex items-center justify-between w-full gap-3 px-1">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = activeTabData.icon
                  return <Icon className="w-5 h-5 text-primary" strokeWidth={2.5} />
                })()}
                <SelectValue>{activeTabData.label}</SelectValue>
              </div>
            </div>
          </SelectTrigger>
          <SelectContent className="bg-popover border-2 border-border shadow-2xl rounded-xl p-2 min-w-[var(--radix-select-trigger-width)]">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <SelectItem 
                  key={tab.id} 
                  value={tab.id}
                  className={`font-[Manrope] font-semibold rounded-lg h-12 px-3 transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary border-l-4 border-l-primary' 
                      : 'text-foreground hover:bg-accent/50 dark:hover:bg-accent/30'
                  }`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} strokeWidth={2.5} />
                    <span className={isActive ? 'text-primary font-bold' : 'font-medium'}>{tab.label}</span>
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>
    </>
  )
}


"use client"

import { usePathname, useRouter } from "next/navigation"
import { Wallet, BookOpen, UserPlus, Trophy, Settings, BarChart3 } from "lucide-react"
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
          <TabsList className="grid w-full grid-cols-6 h-auto p-1 bg-accent dark:bg-accent/50 rounded-lg border border-border">
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
      <div className="md:hidden">
        <Select value={activeTab} onValueChange={handleTabChange}>
          <SelectTrigger className="w-full h-10 font-[Manrope] font-semibold">
            <div className="flex items-center gap-2">
              {(() => {
                const Icon = activeTabData.icon
                return <Icon className="w-4 h-4" />
              })()}
              <SelectValue>{activeTabData.label}</SelectValue>
            </div>
          </SelectTrigger>
          <SelectContent>
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <SelectItem key={tab.id} value={tab.id}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
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


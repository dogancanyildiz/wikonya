"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { usePermissions } from "@/lib/utils/hooks/use-permissions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Save, Loader2, Shield, Ban, Search, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { COIN_MATRIX } from "@/lib/constants"
import { getConversionConfig } from "@/lib/constants/conversion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Lazy load admin dashboard
const AdminDashboard = dynamic(
  () => import("@/components/features/admin/admin-dashboard").then((mod) => ({ default: mod.AdminDashboard })),
  { 
    loading: () => <div className="h-64 animate-pulse bg-muted rounded-xl" />,
    ssr: false 
  }
)

export default function AdminPage() {
  const { canAccessAdminPanel } = usePermissions()
  const [isSaving, setIsSaving] = useState(false)
  const [conversionRate, setConversionRate] = useState(getConversionConfig().rate.toString())
  const [minAmount, setMinAmount] = useState(getConversionConfig().minAmount.toString())
  const [maxAmountPerDay, setMaxAmountPerDay] = useState(
    getConversionConfig().maxAmountPerDay?.toString() || ""
  )

  if (!canAccessAdminPanel) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-[Manrope]">
            Bu sayfaya erişim yetkiniz yok. Admin paneli için &quot;Konya Bilgesi&quot; rolü gereklidir.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const handleSaveConversion = async () => {
    setIsSaving(true)
    try {
      // Gerçek uygulamada API çağrısı yapılacak
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Başarı mesajı gösterilebilir
    } catch (err) {
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveCoinMatrix = async () => {
    setIsSaving(true)
    try {
      // Gerçek uygulamada API çağrısı yapılacak
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Başarı mesajı gösterilebilir
    } catch (err) {
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="font-[Manrope] text-foreground font-extrabold text-2xl sm:text-3xl md:text-4xl mb-2">
          KBB Admin Paneli
        </h1>
        <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground text-sm sm:text-base">
          Platform ayarlarını ve coin sistemini yönetin
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 font-[Manrope] mb-4 sm:mb-6 text-xs sm:text-sm gap-2 sm:gap-0">
          <TabsTrigger value="dashboard" className="w-full sm:w-auto">Dashboard</TabsTrigger>
          <TabsTrigger value="users" className="w-full sm:w-auto">Kullanıcılar</TabsTrigger>
          <TabsTrigger value="content" className="w-full sm:w-auto">İçerik</TabsTrigger>
          <TabsTrigger value="conversion" className="w-full sm:w-auto">Dönüşüm</TabsTrigger>
          <TabsTrigger value="coin-matrix" className="w-full sm:w-auto">Coin Matrisi</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <AdminDashboard />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="content">
          <ContentManagement />
        </TabsContent>

        <TabsContent value="conversion">
          <Card>
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-xl sm:text-2xl">
                Dönüşüm Oranı Yönetimi
              </CardTitle>
              <CardDescription className="font-[Manrope]">
                GençCoin&apos;lerin Kültür Kart puanına dönüşüm oranını ayarlayın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="conversion-rate" className="font-[Manrope] font-bold">
                  Dönüşüm Oranı
                </Label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <Input
                    id="conversion-rate"
                    type="number"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(e.target.value)}
                    className="font-[Manrope] w-full sm:w-auto"
                    disabled={isSaving}
                  />
                  <span className="font-[Manrope] text-xs sm:text-sm text-muted-foreground">
                    GençCoin = 1 Kültür Kart Puanı
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-[Manrope]">
                  Örnek: 100 girerseniz, 100 GençCoin = 1 Kültür Kart Puanı olur
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="min-amount" className="font-[Manrope] font-bold">
                  Minimum Dönüşüm Miktarı
                </Label>
                <Input
                  id="min-amount"
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  className="font-[Manrope]"
                  disabled={isSaving}
                />
                <p className="text-xs text-muted-foreground font-[Manrope]">
                  Kullanıcılar bu miktardan az dönüşüm yapamaz
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-amount-per-day" className="font-[Manrope] font-bold">
                  Günlük Maksimum Dönüşüm (Opsiyonel)
                </Label>
                <Input
                  id="max-amount-per-day"
                  type="number"
                  value={maxAmountPerDay}
                  onChange={(e) => setMaxAmountPerDay(e.target.value)}
                  className="font-[Manrope]"
                  disabled={isSaving}
                  placeholder="Sınırsız için boş bırakın"
                />
                <p className="text-xs text-muted-foreground font-[Manrope]">
                  Bir kullanıcı günde en fazla bu kadar GençCoin dönüştürebilir
                </p>
              </div>

              <Button
                onClick={handleSaveConversion}
                disabled={isSaving}
                className="bg-primary hover:bg-primary/90 font-[Manrope] font-bold"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Kaydet
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coin-matrix">
          <Card>
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-xl sm:text-2xl">
                Coin Kazanma Matrisi
              </CardTitle>
              <CardDescription className="font-[Manrope]">
                Her eylem için &quot;Yeni Gelen&quot; rolüne verilecek base coin miktarını ayarlayın
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-[Manrope] font-bold">Yeni Başlık Açma</Label>
                    <Input
                      type="number"
                      defaultValue={COIN_MATRIX.createTopic}
                      className="font-[Manrope]"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-[Manrope] font-bold">Wiki Düzenleme</Label>
                    <Input
                      type="number"
                      defaultValue={COIN_MATRIX.editWiki}
                      className="font-[Manrope]"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-[Manrope] font-bold">Yorum Yazma</Label>
                    <Input
                      type="number"
                      defaultValue={COIN_MATRIX.comment}
                      className="font-[Manrope]"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-[Manrope] font-bold">Wiki Yararlı Oyu</Label>
                    <Input
                      type="number"
                      defaultValue={COIN_MATRIX.wikiVoteUseful}
                      className="font-[Manrope]"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-[Manrope] font-bold">Wiki Yararsız Oyu</Label>
                    <Input
                      type="number"
                      defaultValue={COIN_MATRIX.wikiVoteNotUseful}
                      className="font-[Manrope]"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-[Manrope] font-bold">Yorum Beğenme</Label>
                    <Input
                      type="number"
                      defaultValue={COIN_MATRIX.commentLike}
                      className="font-[Manrope]"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-[Manrope] font-bold">Mantıklı Yorum</Label>
                    <Input
                      type="number"
                      defaultValue={COIN_MATRIX.commentLogical}
                      className="font-[Manrope]"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-[Manrope] font-bold">Sosyal Sorumluluk Projesi</Label>
                    <Input
                      type="number"
                      defaultValue={COIN_MATRIX.socialResponsibilityProject}
                      className="font-[Manrope]"
                      disabled={isSaving}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSaveCoinMatrix}
                  disabled={isSaving}
                  className="bg-primary hover:bg-primary/90 font-[Manrope] font-bold mt-4"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Coin Matrisini Kaydet
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface User {
  id: number
  name: string
  email: string
  role: string
  coins: number
  joinedAt: string
  status: "active" | "banned"
}

// User Management Component
function UserManagement() {
  // Mock users - gerçek uygulamada API'den gelecek
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Ahmet Yılmaz", email: "ahmet@example.com", role: "gezgin", coins: 3500, joinedAt: "2024-01-15", status: "active" },
    { id: 2, name: "Zeynep Kaya", email: "zeynep@example.com", role: "seyyah", coins: 8500, joinedAt: "2023-12-20", status: "active" },
    { id: 3, name: "Mehmet Demir", email: "mehmet@example.com", role: "yeni_gelen", coins: 250, joinedAt: "2024-11-10", status: "active" },
    { id: 4, name: "Ayşe Şahin", email: "ayse@example.com", role: "kasif_meraklisi", coins: 15000, joinedAt: "2023-08-05", status: "active" },
    { id: 5, name: "Can Özkan", email: "can@example.com", role: "konya_bilgesi", coins: 55000, joinedAt: "2023-05-12", status: "active" },
  ])
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchQuery || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
    toast.success("Kullanıcı rolü güncellendi")
  }

  const handleBanUser = (userId: number) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: "banned" } : u))
    toast.success("Kullanıcı yasaklandı")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-[Manrope] text-foreground font-bold text-xl sm:text-2xl">
          Kullanıcı Yönetimi
        </CardTitle>
        <CardDescription className="font-[Manrope]">
          Kullanıcıları görüntüleyin, rollerini değiştirin ve yönetin
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Kullanıcı ara..."
              className="pl-10 font-[Manrope]"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[180px] font-[Manrope]">
              <SelectValue placeholder="Rol Filtrele" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Roller</SelectItem>
              <SelectItem value="yeni_gelen">Yeni Gelen</SelectItem>
              <SelectItem value="seyyah">Seyyah</SelectItem>
              <SelectItem value="gezgin">Gezgin</SelectItem>
              <SelectItem value="kasif_meraklisi">Kaşif Meraklısı</SelectItem>
              <SelectItem value="konya_bilgesi">Konya Bilgesi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users List */}
        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="bg-card border border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white font-[Manrope] font-bold">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-[Manrope] font-bold text-sm text-foreground truncate">
                        {user.name}
                      </p>
                      <p className="font-[Manrope] text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="font-[Manrope] text-xs">
                          {user.role}
                        </Badge>
                        <span className="font-[Manrope] text-xs text-muted-foreground">
                          {user.coins.toLocaleString()} coin
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={user.role}
                      onValueChange={(newRole) => handleRoleChange(user.id, newRole)}
                    >
                      <SelectTrigger className="w-[150px] font-[Manrope] text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yeni_gelen">Yeni Gelen</SelectItem>
                        <SelectItem value="seyyah">Seyyah</SelectItem>
                        <SelectItem value="gezgin">Gezgin</SelectItem>
                        <SelectItem value="kasif_meraklisi">Kaşif Meraklısı</SelectItem>
                        <SelectItem value="konya_bilgesi">Konya Bilgesi</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleBanUser(user.id)}
                      className="font-[Manrope]"
                    >
                      <Ban className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Content Management Component
function ContentManagement() {
  const [stats] = useState({
    totalTopics: 456,
    totalComments: 3240,
    totalResources: 128,
    totalEvents: 45,
    flaggedContent: 3,
    pendingModeration: 12,
  })

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="font-[Manrope] text-xs text-muted-foreground mb-1">Toplam Başlık</p>
            <p className="font-[Manrope] font-bold text-2xl text-foreground">{stats.totalTopics}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="font-[Manrope] text-xs text-muted-foreground mb-1">Toplam Yorum</p>
            <p className="font-[Manrope] font-bold text-2xl text-foreground">{stats.totalComments}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="font-[Manrope] text-xs text-muted-foreground mb-1">Akademik Kaynak</p>
            <p className="font-[Manrope] font-bold text-2xl text-foreground">{stats.totalResources}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="font-[Manrope] text-xs text-muted-foreground mb-1">Etkinlik</p>
            <p className="font-[Manrope] font-bold text-2xl text-foreground">{stats.totalEvents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="font-[Manrope] text-xs text-muted-foreground mb-1">Bayraklanan</p>
            <p className="font-[Manrope] font-bold text-2xl text-foreground">{stats.flaggedContent}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="font-[Manrope] text-xs text-muted-foreground mb-1">Onay Bekleyen</p>
            <p className="font-[Manrope] font-bold text-2xl text-foreground">{stats.pendingModeration}</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-[Manrope] text-foreground font-bold text-xl">
            Hızlı İşlemler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="font-[Manrope]">
              <Shield className="w-4 h-4 mr-2" />
              Moderasyon Paneli
            </Button>
            <Button variant="outline" className="font-[Manrope]">
              <Filter className="w-4 h-4 mr-2" />
              İçerik Filtrele
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


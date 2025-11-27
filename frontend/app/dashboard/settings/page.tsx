"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { useApp } from "@/contexts/app-context"
import { 
  User, 
  Bell, 
  Shield, 
  Eye, 
  Moon, 
  Globe,
  Mail,
  Lock,
  Camera,
  CheckCircle2,
  AlertCircle,
  Trash2,
  LogOut
} from "lucide-react"

export default function SettingsPage() {
  const { state, setUser } = useApp()
  const user = state.user

  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form states
  const [name, setName] = useState(user?.name || "")
  const [bio, setBio] = useState(user?.bio || "")
  const [location, setLocation] = useState(user?.location || "")
  const [email, setEmail] = useState("kullanici@example.com")

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [commentNotifications, setCommentNotifications] = useState(true)
  const [likeNotifications, setLikeNotifications] = useState(false)
  const [messageNotifications, setMessageNotifications] = useState(true)

  // Privacy settings
  const [profilePublic, setProfilePublic] = useState(true)
  const [showActivity, setShowActivity] = useState(true)
  const [showCoins, setShowCoins] = useState(true)

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="font-[Manrope] text-[#4d4d4d] dark:text-foreground">
          Lütfen giriş yapın
        </p>
      </div>
    )
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      setUser({
        ...user,
        name,
        bio,
        location,
      })
      
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div>
        <h1 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-2xl sm:text-3xl">
          Ayarlar
        </h1>
        <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground mt-1">
          Hesap ve uygulama ayarlarınızı yönetin
        </p>
      </div>

      {/* Alerts */}
      {success && (
        <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="font-[Manrope] text-green-700 dark:text-green-300">
            Değişiklikler kaydedildi!
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-[Manrope]">{error}</AlertDescription>
        </Alert>
      )}

      {/* Profil Ayarları */}
      <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#03624c]" />
            <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg">
              Profil Bilgileri
            </CardTitle>
          </div>
          <CardDescription className="font-[Manrope]">
            Profil bilgilerinizi güncelleyin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-[#03624c] text-white font-[Manrope] font-bold text-2xl">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" className="font-[Manrope]">
                <Camera className="w-4 h-4 mr-2" />
                Fotoğraf Değiştir
              </Button>
              <p className="font-[Manrope] text-xs text-[#4d4d4d]/50 dark:text-muted-foreground mt-2">
                JPG, PNG veya GIF. Max 2MB.
              </p>
            </div>
          </div>

          <Separator />

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-[Manrope] font-bold">
                Ad Soyad
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="font-[Manrope]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="font-[Manrope] font-bold">
                Konum
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Örn: Konya, Selçuklu"
                className="font-[Manrope]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="font-[Manrope] font-bold">
              Hakkımda
            </Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Kendinizi tanıtın..."
              className="font-[Manrope] min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-[Manrope] font-bold">
              E-posta
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-[Manrope]"
            />
          </div>

          <Button
            onClick={handleSaveProfile}
            disabled={isLoading}
            className="bg-[#03624c] hover:bg-[#03624c]/90 font-[Manrope] font-bold"
          >
            {isLoading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
          </Button>
        </CardContent>
      </Card>

      {/* Bildirim Ayarları */}
      <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#03624c]" />
            <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg">
              Bildirim Ayarları
            </CardTitle>
          </div>
          <CardDescription className="font-[Manrope]">
            Hangi bildirimleri almak istediğinizi seçin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#4d4d4d]/60 dark:text-muted-foreground" />
              <div>
                <p className="font-[Manrope] font-semibold text-sm text-[#4d4d4d] dark:text-foreground">
                  E-posta Bildirimleri
                </p>
                <p className="font-[Manrope] text-xs text-[#4d4d4d]/50 dark:text-muted-foreground">
                  Önemli güncellemeler e-posta ile gönderilsin
                </p>
              </div>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#4d4d4d]/60 dark:text-muted-foreground" />
              <div>
                <p className="font-[Manrope] font-semibold text-sm text-[#4d4d4d] dark:text-foreground">
                  Push Bildirimleri
                </p>
                <p className="font-[Manrope] text-xs text-[#4d4d4d]/50 dark:text-muted-foreground">
                  Tarayıcı bildirimleri
                </p>
              </div>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-[Manrope] font-semibold text-sm text-[#4d4d4d] dark:text-foreground">
                Yorum Bildirimleri
              </p>
              <p className="font-[Manrope] text-xs text-[#4d4d4d]/50 dark:text-muted-foreground">
                Yazılarınıza yorum yapıldığında
              </p>
            </div>
            <Switch
              checked={commentNotifications}
              onCheckedChange={setCommentNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-[Manrope] font-semibold text-sm text-[#4d4d4d] dark:text-foreground">
                Beğeni Bildirimleri
              </p>
              <p className="font-[Manrope] text-xs text-[#4d4d4d]/50 dark:text-muted-foreground">
                Yazılarınız beğenildiğinde
              </p>
            </div>
            <Switch
              checked={likeNotifications}
              onCheckedChange={setLikeNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-[Manrope] font-semibold text-sm text-[#4d4d4d] dark:text-foreground">
                Mesaj Bildirimleri
              </p>
              <p className="font-[Manrope] text-xs text-[#4d4d4d]/50 dark:text-muted-foreground">
                Yeni mesaj aldığınızda
              </p>
            </div>
            <Switch
              checked={messageNotifications}
              onCheckedChange={setMessageNotifications}
            />
          </div>
        </CardContent>
      </Card>

      {/* Gizlilik Ayarları */}
      <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#03624c]" />
            <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg">
              Gizlilik Ayarları
            </CardTitle>
          </div>
          <CardDescription className="font-[Manrope]">
            Profilinizin görünürlüğünü kontrol edin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-[#4d4d4d]/60 dark:text-muted-foreground" />
              <div>
                <p className="font-[Manrope] font-semibold text-sm text-[#4d4d4d] dark:text-foreground">
                  Herkese Açık Profil
                </p>
                <p className="font-[Manrope] text-xs text-[#4d4d4d]/50 dark:text-muted-foreground">
                  Profilinizi herkes görebilsin
                </p>
              </div>
            </div>
            <Switch
              checked={profilePublic}
              onCheckedChange={setProfilePublic}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-[Manrope] font-semibold text-sm text-[#4d4d4d] dark:text-foreground">
                Aktivite Göster
              </p>
              <p className="font-[Manrope] text-xs text-[#4d4d4d]/50 dark:text-muted-foreground">
                Son aktiviteleriniz profilinde görünsün
              </p>
            </div>
            <Switch
              checked={showActivity}
              onCheckedChange={setShowActivity}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-[Manrope] font-semibold text-sm text-[#4d4d4d] dark:text-foreground">
                GençCoin Bakiyesi Göster
              </p>
              <p className="font-[Manrope] text-xs text-[#4d4d4d]/50 dark:text-muted-foreground">
                Coin bakiyeniz profilinde görünsün
              </p>
            </div>
            <Switch
              checked={showCoins}
              onCheckedChange={setShowCoins}
            />
          </div>
        </CardContent>
      </Card>

      {/* Güvenlik Ayarları */}
      <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#03624c]" />
            <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg">
              Güvenlik
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start font-[Manrope]">
            <Lock className="w-4 h-4 mr-2" />
            Şifre Değiştir
          </Button>

          <Button variant="outline" className="w-full justify-start font-[Manrope]">
            <Globe className="w-4 h-4 mr-2" />
            Bağlı Hesaplar
          </Button>
        </CardContent>
      </Card>

      {/* Tehlikeli Alan */}
      <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="font-[Manrope] text-red-600 dark:text-red-400 font-bold text-lg">
            Tehlikeli Alan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start font-[Manrope] text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20">
            <LogOut className="w-4 h-4 mr-2" />
            Tüm Cihazlardan Çıkış Yap
          </Button>

          <Button variant="outline" className="w-full justify-start font-[Manrope] text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20">
            <Trash2 className="w-4 h-4 mr-2" />
            Hesabı Sil
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}


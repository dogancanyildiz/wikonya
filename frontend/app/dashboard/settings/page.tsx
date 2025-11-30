"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DEFAULT_AVATAR_URL } from "@/lib/constants"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useApp } from "@/contexts/app-context"
import { useTheme } from "next-themes"
import { useColorTheme, colorThemes } from "@/lib/utils/hooks/use-color-theme"
import { mockLogout } from "@/lib/auth/mock-auth"
import { 
  User, 
  Bell, 
  Shield, 
  Eye, 
  Globe,
  Mail,
  Lock,
  Camera,
  CheckCircle2,
  AlertCircle,
  Trash2,
  LogOut,
  Palette,
  Sun,
  Moon,
  Monitor,
  Check,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const { state, setUser } = useApp()
  const user = state.user
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { colorTheme, setColorTheme, mounted } = useColorTheme()

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

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedNotificationSettings = localStorage.getItem("notification_settings")
      const savedPrivacySettings = localStorage.getItem("privacy_settings")
      
      if (savedNotificationSettings) {
        const settings = JSON.parse(savedNotificationSettings)
        setEmailNotifications(settings.emailNotifications ?? true)
        setPushNotifications(settings.pushNotifications ?? true)
        setCommentNotifications(settings.commentNotifications ?? true)
        setLikeNotifications(settings.likeNotifications ?? false)
        setMessageNotifications(settings.messageNotifications ?? true)
      }
      
      if (savedPrivacySettings) {
        const settings = JSON.parse(savedPrivacySettings)
        setProfilePublic(settings.profilePublic ?? true)
        setShowActivity(settings.showActivity ?? true)
        setShowCoins(settings.showCoins ?? true)
      }
    }
  }, [])

  // Modal states
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isConnectedAccountsModalOpen, setIsConnectedAccountsModalOpen] = useState(false)
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false)
  const [isLogoutAllModalOpen, setIsLogoutAllModalOpen] = useState(false)
  
  // Password change form
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  // Delete account form
  const [deletePassword, setDeletePassword] = useState("")
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)

  // Connected accounts state
  const [connectedAccounts, setConnectedAccounts] = useState([
    { id: "google", name: "Google", icon: "🔵", connected: true, email: "user@gmail.com", authUrl: "https://accounts.google.com/oauth/authorize" },
    { id: "apple", name: "Apple", icon: "⚫", connected: false, email: null, authUrl: "https://appleid.apple.com/auth/authorize" },
    { id: "genckart", name: "GençKart", icon: "💳", connected: true, email: "user@genckart.com", authUrl: "https://genckart.konya.bel.tr/auth" },
  ])

  // Disconnect confirmation modal state
  const [disconnectAccountId, setDisconnectAccountId] = useState<string | null>(null)
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false)

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="font-[Manrope] text-muted-foreground">
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

  // Save notification settings to localStorage
  const saveNotificationSettings = () => {
    if (typeof window !== "undefined") {
      const settings = {
        emailNotifications,
        pushNotifications,
        commentNotifications,
        likeNotifications,
        messageNotifications,
      }
      localStorage.setItem("notification_settings", JSON.stringify(settings))
    }
  }

  // Save privacy settings to localStorage
  const savePrivacySettings = () => {
    if (typeof window !== "undefined") {
      const settings = {
        profilePublic,
        showActivity,
        showCoins,
      }
      localStorage.setItem("privacy_settings", JSON.stringify(settings))
    }
  }

  // Notification settings change handler
  const handleNotificationChange = () => {
    saveNotificationSettings()
    toast.success("Ayarlarınız değişti", {
      description: "Bildirim ayarlarınız güncellendi",
      duration: 3000,
    })
  }

  // Privacy settings change handler
  const handlePrivacyChange = () => {
    savePrivacySettings()
    toast.success("Ayarlarınız değişti", {
      description: "Gizlilik ayarlarınız güncellendi",
      duration: 3000,
    })
  }

  // Password change handler
  const handlePasswordChange = async () => {
    if (!newPassword || !confirmPassword || !currentPassword) {
      toast.error("Lütfen tüm alanları doldurun")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("Yeni şifreler eşleşmiyor")
      return
    }

    if (newPassword.length < 8) {
      toast.error("Şifre en az 8 karakter olmalıdır")
      return
    }

    setIsChangingPassword(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast.success("Şifre değiştirildi", {
        description: "Şifreniz başarıyla güncellendi",
        duration: 3000,
      })
      setIsPasswordModalOpen(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch {
      toast.error("Bir hata oluştu", {
        description: "Şifre değiştirilemedi. Lütfen tekrar deneyin.",
      })
    } finally {
      setIsChangingPassword(false)
    }
  }

  // Delete account handler
  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error("Lütfen şifrenizi girin")
      return
    }

    setIsDeletingAccount(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast.success("Hesap silindi", {
        description: "Hesabınız başarıyla silindi",
        duration: 3000,
      })
      setIsDeleteAccountModalOpen(false)
      setDeletePassword("")
      // Redirect to home page
      router.push("/")
    } catch {
      toast.error("Bir hata oluştu", {
        description: "Hesap silinemedi. Lütfen tekrar deneyin.",
      })
    } finally {
      setIsDeletingAccount(false)
    }
  }

  // Logout all devices handler
  const handleLogoutAll = async () => {
    setIsLogoutAllModalOpen(false)
    try {
      await mockLogout()
      toast.success("Tüm cihazlardan çıkış yapıldı", {
        description: "Güvenliğiniz için tüm oturumlar sonlandırıldı",
        duration: 3000,
      })
      router.push("/auth/login")
    } catch {
      toast.error("Bir hata oluştu")
    }
  }

  // Handle disconnect account
  const handleDisconnectAccount = (accountId: string) => {
    setDisconnectAccountId(accountId)
    setIsDisconnectModalOpen(true)
  }

  // Confirm disconnect
  const confirmDisconnect = () => {
    if (disconnectAccountId) {
      setConnectedAccounts(prev => 
        prev.map(account => 
          account.id === disconnectAccountId 
            ? { ...account, connected: false, email: null }
            : account
        )
      )
      toast.success("Bağlantı kesildi", {
        description: "Hesap bağlantısı başarıyla kaldırıldı",
        duration: 3000,
      })
      setIsDisconnectModalOpen(false)
      setDisconnectAccountId(null)
    }
  }

  // Handle connect account (open in new tab)
  const handleConnectAccount = (account: typeof connectedAccounts[0]) => {
    // Gerçek uygulamada bu URL backend'den gelecek ve OAuth parametreleri içerecek
    window.open(account.authUrl, "_blank", "noopener,noreferrer")
  }

  const themeOptions = [
    { id: "light", name: "Açık", icon: Sun },
    { id: "dark", name: "Koyu", icon: Moon },
    { id: "system", name: "Sistem", icon: Monitor },
  ]

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div>
        <h1 className="font-[Manrope] text-foreground font-bold text-2xl sm:text-3xl">
          Ayarlar
        </h1>
        <p className="font-[Manrope] text-muted-foreground mt-1">
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
      <Card className="bg-card rounded-xl shadow-md border border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <CardTitle className="font-[Manrope] text-foreground font-bold text-lg">
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
              <AvatarImage src={DEFAULT_AVATAR_URL} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground font-[Manrope] font-bold text-2xl">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" className="font-[Manrope]">
                <Camera className="w-4 h-4 mr-2" />
                Fotoğraf Değiştir
              </Button>
              <p className="font-[Manrope] text-xs text-muted-foreground mt-2">
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
            className="bg-primary hover:bg-primary/90 font-[Manrope] font-bold"
          >
            {isLoading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
          </Button>
        </CardContent>
      </Card>

      {/* Tema Ayarları */}
      <Card className="bg-card rounded-xl shadow-md border border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            <CardTitle className="font-[Manrope] text-foreground font-bold text-lg">
              Görünüm Ayarları
            </CardTitle>
          </div>
          <CardDescription className="font-[Manrope]">
            Tema ve renk tercihlerinizi özelleştirin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Light/Dark Mode */}
          <div>
            <Label className="font-[Manrope] font-bold text-sm mb-3 block">
              Tema Modu
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map((option) => {
                const Icon = option.icon
                const isActive = theme === option.id
                return (
                  <button
                    key={option.id}
                    onClick={() => setTheme(option.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                      isActive
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 hover:bg-accent"
                    )}
                  >
                    <Icon className={cn(
                      "w-6 h-6",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      "font-[Manrope] font-semibold text-sm",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}>
                      {option.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <Separator />

          {/* Color Theme */}
          <div>
            <Label className="font-[Manrope] font-bold text-sm mb-3 block">
              Renk Teması
            </Label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {mounted && colorThemes.map((colorOption) => {
                const isActive = colorTheme === colorOption.id
                const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
                const displayColor = isDark ? colorOption.darkColor : colorOption.lightColor
                
                return (
                  <button
                    key={colorOption.id}
                    onClick={() => setColorTheme(colorOption.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200",
                      isActive
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 hover:bg-accent"
                    )}
                    title={colorOption.name}
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: displayColor }}
                    >
                      {isActive && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className={cn(
                      "font-[Manrope] font-medium text-xs",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}>
                      {colorOption.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bildirim Ayarları */}
      <Card className="bg-card rounded-xl shadow-md border border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <CardTitle className="font-[Manrope] text-foreground font-bold text-lg">
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
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-[Manrope] font-semibold text-sm text-foreground">
                  E-posta Bildirimleri
                </p>
                <p className="font-[Manrope] text-xs text-muted-foreground">
                  Önemli güncellemeler e-posta ile gönderilsin
                </p>
              </div>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={(checked) => {
                setEmailNotifications(checked)
                handleNotificationChange()
              }}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-[Manrope] font-semibold text-sm text-foreground">
                  Push Bildirimleri
                </p>
                <p className="font-[Manrope] text-xs text-muted-foreground">
                  Tarayıcı bildirimleri
                </p>
              </div>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={(checked) => {
                setPushNotifications(checked)
                saveNotificationSettings()
                handleNotificationChange()
              }}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-[Manrope] font-semibold text-sm text-foreground">
                Yorum Bildirimleri
              </p>
              <p className="font-[Manrope] text-xs text-muted-foreground">
                Yazılarınıza yorum yapıldığında
              </p>
            </div>
            <Switch
              checked={commentNotifications}
              onCheckedChange={(checked) => {
                setCommentNotifications(checked)
                saveNotificationSettings()
                handleNotificationChange()
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-[Manrope] font-semibold text-sm text-foreground">
                Beğeni Bildirimleri
              </p>
              <p className="font-[Manrope] text-xs text-muted-foreground">
                Yazılarınız beğenildiğinde
              </p>
            </div>
            <Switch
              checked={likeNotifications}
              onCheckedChange={(checked) => {
                setLikeNotifications(checked)
                saveNotificationSettings()
                handleNotificationChange()
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-[Manrope] font-semibold text-sm text-foreground">
                Mesaj Bildirimleri
              </p>
              <p className="font-[Manrope] text-xs text-muted-foreground">
                Yeni mesaj aldığınızda
              </p>
            </div>
            <Switch
              checked={messageNotifications}
              onCheckedChange={(checked) => {
                setMessageNotifications(checked)
                saveNotificationSettings()
                handleNotificationChange()
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Gizlilik Ayarları */}
      <Card className="bg-card rounded-xl shadow-md border border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <CardTitle className="font-[Manrope] text-foreground font-bold text-lg">
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
              <Eye className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-[Manrope] font-semibold text-sm text-foreground">
                  Herkese Açık Profil
                </p>
                <p className="font-[Manrope] text-xs text-muted-foreground">
                  Profilinizi herkes görebilsin
                </p>
              </div>
            </div>
            <Switch
              checked={profilePublic}
              onCheckedChange={(checked) => {
                setProfilePublic(checked)
                savePrivacySettings()
                handlePrivacyChange()
              }}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-[Manrope] font-semibold text-sm text-foreground">
                Aktivite Göster
              </p>
              <p className="font-[Manrope] text-xs text-muted-foreground">
                Son aktiviteleriniz profilinde görünsün
              </p>
            </div>
            <Switch
              checked={showActivity}
              onCheckedChange={(checked) => {
                setShowActivity(checked)
                savePrivacySettings()
                handlePrivacyChange()
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-[Manrope] font-semibold text-sm text-foreground">
                GençCoin Bakiyesi Göster
              </p>
              <p className="font-[Manrope] text-xs text-muted-foreground">
                Coin bakiyeniz profilinde görünsün
              </p>
            </div>
            <Switch
              checked={showCoins}
              onCheckedChange={(checked) => {
                setShowCoins(checked)
                savePrivacySettings()
                handlePrivacyChange()
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Güvenlik Ayarları */}
      <Card className="bg-card rounded-xl shadow-md border border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            <CardTitle className="font-[Manrope] text-foreground font-bold text-lg">
              Güvenlik
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-start font-[Manrope]"
            onClick={() => setIsPasswordModalOpen(true)}
          >
            <Lock className="w-4 h-4 mr-2" />
            Şifre Değiştir
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start font-[Manrope]"
            onClick={() => setIsConnectedAccountsModalOpen(true)}
          >
            <Globe className="w-4 h-4 mr-2" />
            Bağlı Hesaplar
          </Button>
        </CardContent>
      </Card>

      {/* Tehlikeli Alan */}
      <Card className="bg-card rounded-xl shadow-md border border-destructive/30">
        <CardHeader>
          <CardTitle className="font-[Manrope] text-destructive font-bold text-lg">
            Tehlikeli Alan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-start font-[Manrope] text-destructive border-destructive/30 hover:bg-destructive/10"
            onClick={() => setIsLogoutAllModalOpen(true)}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Tüm Cihazlardan Çıkış Yap
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start font-[Manrope] text-destructive border-destructive/30 hover:bg-destructive/10"
            onClick={() => setIsDeleteAccountModalOpen(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Hesabı Sil
          </Button>
        </CardContent>
      </Card>

      {/* Password Change Modal */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-[Manrope] font-bold">Şifre Değiştir</DialogTitle>
            <DialogDescription className="font-[Manrope]">
              Güvenliğiniz için mevcut şifrenizi girin ve yeni şifrenizi belirleyin
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="font-[Manrope] font-bold">
                Mevcut Şifre
              </Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="font-[Manrope]"
                placeholder="Mevcut şifrenizi girin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="font-[Manrope] font-bold">
                Yeni Şifre
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="font-[Manrope]"
                placeholder="En az 8 karakter"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="font-[Manrope] font-bold">
                Yeni Şifre (Tekrar)
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="font-[Manrope]"
                placeholder="Yeni şifrenizi tekrar girin"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsPasswordModalOpen(false)
                setCurrentPassword("")
                setNewPassword("")
                setConfirmPassword("")
              }}
              className="font-[Manrope]"
            >
              İptal
            </Button>
            <Button
              onClick={handlePasswordChange}
              disabled={isChangingPassword}
              className="bg-primary hover:bg-primary/90 font-[Manrope] font-bold"
            >
              {isChangingPassword ? "Değiştiriliyor..." : "Şifreyi Değiştir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Connected Accounts Modal */}
      <Dialog open={isConnectedAccountsModalOpen} onOpenChange={setIsConnectedAccountsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="font-[Manrope] font-bold">Bağlı Hesaplar</DialogTitle>
            <DialogDescription className="font-[Manrope]">
              Hesaplarınızı yönetin ve bağlayın
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {connectedAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 border border-border rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{account.icon}</div>
                  <div>
                    <p className="font-[Manrope] font-semibold text-sm text-foreground">
                      {account.name}
                    </p>
                    {account.connected && account.email && (
                      <p className="font-[Manrope] text-xs text-muted-foreground">
                        {account.email}
                      </p>
                    )}
                  </div>
                </div>
                {account.connected ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-[Manrope] text-destructive hover:bg-destructive/10"
                    onClick={() => handleDisconnectAccount(account.id)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Bağlantıyı Kes
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    className="font-[Manrope] bg-primary hover:bg-primary/90"
                    onClick={() => handleConnectAccount(account)}
                  >
                    Bağla
                  </Button>
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConnectedAccountsModalOpen(false)}
              className="font-[Manrope]"
            >
              Kapat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Modal */}
      <Dialog open={isDeleteAccountModalOpen} onOpenChange={setIsDeleteAccountModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-[Manrope] font-bold text-destructive">
              Hesabı Sil
            </DialogTitle>
            <DialogDescription className="font-[Manrope]">
              Bu işlem geri alınamaz. Hesabınızı silmek için şifrenizi girin.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-[Manrope]">
                Hesabınız silindiğinde tüm verileriniz kalıcı olarak silinecektir.
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <Label htmlFor="delete-password" className="font-[Manrope] font-bold">
                Şifre Onayı
              </Label>
              <Input
                id="delete-password"
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="font-[Manrope]"
                placeholder="Hesabınızı silmek için şifrenizi girin"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteAccountModalOpen(false)
                setDeletePassword("")
              }}
              className="font-[Manrope]"
            >
              İptal
            </Button>
            <Button
              onClick={handleDeleteAccount}
              disabled={isDeletingAccount || !deletePassword}
              variant="destructive"
              className="font-[Manrope] font-bold"
            >
              {isDeletingAccount ? "Siliniyor..." : "Hesabı Sil"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Logout All Devices Modal */}
      <Dialog open={isLogoutAllModalOpen} onOpenChange={setIsLogoutAllModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-[Manrope] font-bold">Tüm Cihazlardan Çıkış Yap</DialogTitle>
            <DialogDescription className="font-[Manrope]">
              Bu işlem tüm cihazlardaki oturumlarınızı sonlandıracaktır. Emin misiniz?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-[Manrope]">
                Tüm cihazlardan çıkış yaptıktan sonra tekrar giriş yapmanız gerekecektir.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsLogoutAllModalOpen(false)}
              className="font-[Manrope]"
            >
              İptal
            </Button>
            <Button
              onClick={handleLogoutAll}
              variant="destructive"
              className="font-[Manrope] font-bold"
            >
              Evet, Tüm Cihazlardan Çıkış Yap
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Disconnect Account Confirmation Modal */}
      <Dialog open={isDisconnectModalOpen} onOpenChange={setIsDisconnectModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-[Manrope] font-bold">Bağlantıyı Kes</DialogTitle>
            <DialogDescription className="font-[Manrope]">
              Bu hesabın bağlantısını kesmek istediğinizden emin misiniz?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-[Manrope]">
                Bağlantı kesildikten sonra bu hesap ile giriş yapamayacaksınız. İsterseniz daha sonra tekrar bağlayabilirsiniz.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDisconnectModalOpen(false)
                setDisconnectAccountId(null)
              }}
              className="font-[Manrope]"
            >
              İptal
            </Button>
            <Button
              onClick={confirmDisconnect}
              variant="destructive"
              className="font-[Manrope] font-bold"
            >
              Evet, Bağlantıyı Kes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

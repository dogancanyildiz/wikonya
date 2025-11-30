"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/contexts/app-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  ThumbsUp, 
  Heart, 
  Users, 
  Award, 
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Calendar
} from "lucide-react"
import { toast } from "sonner"

interface NotificationSettings {
  // General
  emailNotifications: boolean
  pushNotifications: boolean
  inAppNotifications: boolean
  
  // Activity
  commentNotifications: boolean
  likeNotifications: boolean
  replyNotifications: boolean
  mentionNotifications: boolean
  
  // Social
  followNotifications: boolean
  messageNotifications: boolean
  
  // Content
  topicApprovalNotifications: boolean
  proposalNotifications: boolean
  achievementNotifications: boolean
  
  // Events
  eventReminderNotifications: boolean
  eventUpdateNotifications: boolean
}

export default function NotificationsPage() {
  const { state } = useApp()
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    inAppNotifications: true,
    commentNotifications: true,
    likeNotifications: false,
    replyNotifications: true,
    mentionNotifications: true,
    followNotifications: true,
    messageNotifications: true,
    topicApprovalNotifications: true,
    proposalNotifications: true,
    achievementNotifications: true,
    eventReminderNotifications: true,
    eventUpdateNotifications: true,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // Load settings from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("notification_settings_detailed")
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setSettings(parsed)
        } catch {
          // Use defaults
        }
      }
    }
  }, [])

  const handleSettingChange = (key: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => {
      const updated = { ...prev, [key]: value }
      setHasChanges(true)
      return updated
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("notification_settings_detailed", JSON.stringify(settings))
      }
      
      setHasChanges(false)
      toast.success("Bildirim ayarlarınız kaydedildi")
    } catch (err) {
      toast.error("Ayarlar kaydedilirken bir hata oluştu")
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    const defaults: NotificationSettings = {
      emailNotifications: true,
      pushNotifications: true,
      inAppNotifications: true,
      commentNotifications: true,
      likeNotifications: false,
      replyNotifications: true,
      mentionNotifications: true,
      followNotifications: true,
      messageNotifications: true,
      topicApprovalNotifications: true,
      proposalNotifications: true,
      achievementNotifications: true,
      eventReminderNotifications: true,
      eventUpdateNotifications: true,
    }
    setSettings(defaults)
    setHasChanges(true)
  }

  if (!state.user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="font-[Manrope] text-foreground">Lütfen giriş yapın</p>
      </div>
    )
  }

  const NotificationToggle = ({ 
    label, 
    description, 
    icon: Icon, 
    setting, 
    disabled = false 
  }: { 
    label: string
    description?: string
    icon: React.ElementType
    setting: keyof NotificationSettings
    disabled?: boolean
  }) => (
    <div className="flex items-start justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors">
      <div className="flex items-start gap-3 flex-1">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <Label htmlFor={setting} className="font-[Manrope] font-bold text-sm cursor-pointer">
            {label}
          </Label>
          {description && (
            <p className="font-[Manrope] text-xs text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
      <Switch
        id={setting}
        checked={settings[setting]}
        onCheckedChange={(checked) => handleSettingChange(setting, checked)}
        disabled={disabled || isSaving}
        className="ml-4"
      />
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-[Manrope] text-foreground font-extrabold text-2xl sm:text-3xl mb-2">
          Bildirim Ayarları
        </h1>
        <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground text-sm">
          Hangi bildirimleri almak istediğinizi seçin
        </p>
      </div>

      {/* Save Button */}
      {hasChanges && (
        <Alert className="bg-primary/10 border-primary/20">
          <AlertCircle className="h-4 w-4 text-primary" />
          <AlertDescription className="font-[Manrope] flex items-center justify-between">
            <span>Kaydedilmemiş değişiklikler var</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={isSaving}
                className="font-[Manrope]"
              >
                Sıfırla
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="font-[Manrope] font-bold"
              >
                {isSaving ? "Kaydediliyor..." : "Kaydet"}
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* General Settings */}
      <Card className="bg-card border border-border">
        <CardHeader>
          <CardTitle className="font-[Manrope] font-bold text-lg flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Genel Bildirimler
          </CardTitle>
          <CardDescription className="font-[Manrope]">
            Bildirim kanallarınızı yönetin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <NotificationToggle
            label="E-posta Bildirimleri"
            description="Önemli güncellemeler için e-posta alın"
            icon={Mail}
            setting="emailNotifications"
          />
          <NotificationToggle
            label="Push Bildirimleri"
            description="Tarayıcı push bildirimleri"
            icon={Smartphone}
            setting="pushNotifications"
          />
          <NotificationToggle
            label="Uygulama İçi Bildirimler"
            description="Platform içinde bildirimler göster"
            icon={Bell}
            setting="inAppNotifications"
          />
        </CardContent>
      </Card>

      {/* Activity Notifications */}
      <Card className="bg-card border border-border">
        <CardHeader>
          <CardTitle className="font-[Manrope] font-bold text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Aktivite Bildirimleri
          </CardTitle>
          <CardDescription className="font-[Manrope]">
            İçeriklerinizle ilgili bildirimler
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <NotificationToggle
            label="Yorum Bildirimleri"
            description="Başlıklarınıza yorum yapıldığında bildir"
            icon={MessageSquare}
            setting="commentNotifications"
          />
          <NotificationToggle
            label="Beğeni Bildirimleri"
            description="İçerikleriniz beğenildiğinde bildir"
            icon={ThumbsUp}
            setting="likeNotifications"
          />
          <NotificationToggle
            label="Yanıt Bildirimleri"
            description="Yorumlarınıza yanıt verildiğinde bildir"
            icon={MessageSquare}
            setting="replyNotifications"
          />
          <NotificationToggle
            label="Bahsetme Bildirimleri"
            description="Birisi sizden bahsettiğinde bildir"
            icon={Users}
            setting="mentionNotifications"
          />
        </CardContent>
      </Card>

      {/* Social Notifications */}
      <Card className="bg-card border border-border">
        <CardHeader>
          <CardTitle className="font-[Manrope] font-bold text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Sosyal Bildirimler
          </CardTitle>
          <CardDescription className="font-[Manrope]">
            Sosyal etkileşimlerle ilgili bildirimler
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <NotificationToggle
            label="Takip Bildirimleri"
            description="Birisi sizi takip ettiğinde bildir"
            icon={Users}
            setting="followNotifications"
          />
          <NotificationToggle
            label="Mesaj Bildirimleri"
            description="Yeni mesaj aldığınızda bildir"
            icon={MessageSquare}
            setting="messageNotifications"
          />
        </CardContent>
      </Card>

      {/* Content Notifications */}
      <Card className="bg-card border border-border">
        <CardHeader>
          <CardTitle className="font-[Manrope] font-bold text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            İçerik Bildirimleri
          </CardTitle>
          <CardDescription className="font-[Manrope]">
            İçerik onayları ve güncellemeleri
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <NotificationToggle
            label="Başlık Onay Bildirimleri"
            description="Başlığınız onaylandığında veya reddedildiğinde bildir"
            icon={CheckCircle2}
            setting="topicApprovalNotifications"
          />
          <NotificationToggle
            label="Düzenleme Teklifi Bildirimleri"
            description="Wiki düzenleme teklifiniz onaylandığında veya reddedildiğinde bildir"
            icon={BookOpen}
            setting="proposalNotifications"
          />
          <NotificationToggle
            label="Başarı Bildirimleri"
            description="Yeni rozet veya başarı kazandığınızda bildir"
            icon={Award}
            setting="achievementNotifications"
          />
        </CardContent>
      </Card>

      {/* Event Notifications */}
      <Card className="bg-card border border-border">
        <CardHeader>
          <CardTitle className="font-[Manrope] font-bold text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Etkinlik Bildirimleri
          </CardTitle>
          <CardDescription className="font-[Manrope]">
            Etkinliklerle ilgili bildirimler
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <NotificationToggle
            label="Etkinlik Hatırlatıcıları"
            description="Katıldığınız etkinlikler için hatırlatma"
            icon={Bell}
            setting="eventReminderNotifications"
          />
          <NotificationToggle
            label="Etkinlik Güncellemeleri"
            description="Etkinlik bilgileri değiştiğinde bildir"
            icon={AlertCircle}
            setting="eventUpdateNotifications"
          />
        </CardContent>
      </Card>

      {/* Save Button (Bottom) */}
      {hasChanges && (
        <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 rounded-t-lg">
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={isSaving}
              className="font-[Manrope]"
            >
              Sıfırla
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="font-[Manrope] font-bold"
            >
              {isSaving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}


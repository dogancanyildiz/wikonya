"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/contexts/app-context"
import { usePermissions } from "@/lib/utils/hooks/use-permissions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, ArrowLeft, Calendar, MapPin, Clock, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import Link from "next/link"

const EVENT_CATEGORIES = [
  { value: "Spor", label: "Spor" },
  { value: "Kültür", label: "Kültür" },
  { value: "Eğitim", label: "Eğitim" },
  { value: "Sosyal", label: "Sosyal" },
  { value: "Müzik", label: "Müzik" },
  { value: "Diğer", label: "Diğer" },
] as const

const EVENT_TYPES = [
  { value: "student", label: "Öğrenci Etkinliği" },
  { value: "kbb", label: "KBB Etkinliği" },
  { value: "municipality", label: "Belediye Etkinliği" },
] as const

const DISTRICTS = [
  { value: "Meram", label: "Meram" },
  { value: "Selçuklu", label: "Selçuklu" },
  { value: "Karatay", label: "Karatay" },
] as const

export function NewEventPage() {
  const router = useRouter()
  const { state } = useApp()
  const { canModerate } = usePermissions()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<"student" | "kbb" | "municipality">("student")
  const [eventCategory, setEventCategory] = useState<string>("Spor")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [location, setLocation] = useState("")
  const [locationDistrict, setLocationDistrict] = useState("Selçuklu")
  const [maxParticipants, setMaxParticipants] = useState("")
  const [organizer, setOrganizer] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!canModerate) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 md:py-10">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-[Manrope]">
            Bu sayfaya erişim yetkiniz yok. Etkinlik oluşturmak için moderatör yetkisi gereklidir.
          </AlertDescription>
        </Alert>
        <Link href="/events">
          <Button className="mt-4 font-[Manrope]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri Dön
          </Button>
        </Link>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title.trim()) {
      setError("Başlık boş olamaz")
      return
    }

    if (!description.trim()) {
      setError("Açıklama boş olamaz")
      return
    }

    if (!date) {
      setError("Tarih seçmelisiniz")
      return
    }

    if (!time) {
      setError("Başlangıç saati seçmelisiniz")
      return
    }

    if (!location.trim()) {
      setError("Konum boş olamaz")
      return
    }

    if (!maxParticipants || Number(maxParticipants) < 1) {
      setError("Geçerli bir katılımcı sayısı girmelisiniz")
      return
    }

    setIsLoading(true)

    try {
      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Save to localStorage
      if (typeof window !== "undefined") {
        const eventsKey = "created_events"
        const events = JSON.parse(localStorage.getItem(eventsKey) || "[]")
        const newEvent = {
          id: Date.now(),
          title,
          description,
          category,
          eventCategory,
          date: new Date(date).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }),
          time,
          endTime: endTime || undefined,
          location,
          locationDistrict,
          maxParticipants: Number(maxParticipants),
          participants: 0,
          organizer: organizer || state.user?.name || "Organizatör",
          eventDate: new Date(date),
          image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          createdAt: new Date().toISOString(),
          createdBy: state.user,
        }
        events.unshift(newEvent)
        localStorage.setItem(eventsKey, JSON.stringify(events))
      }

      toast.success("Etkinlik başarıyla oluşturuldu")
      router.push("/events")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Etkinlik oluşturulurken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 md:py-10">
      {/* Back Button */}
      <Link href="/events">
        <Button 
          variant="ghost" 
          className="mb-4 sm:mb-6 font-[Manrope] text-foreground hover:bg-accent dark:hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri Dön
        </Button>
      </Link>

      {/* Form */}
      <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
        <CardHeader>
          <CardTitle className="font-[Manrope] text-foreground font-extrabold text-2xl sm:text-3xl">
            Yeni Etkinlik Oluştur
          </CardTitle>
          <CardDescription className="font-[Manrope]">
            Etkinlik bilgilerini doldurun
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="font-[Manrope]">{error}</AlertDescription>
              </Alert>
            )}

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="font-[Manrope] font-bold">
                Etkinlik Başlığı *
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Etkinlik başlığını girin..."
                className="font-[Manrope]"
                maxLength={200}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="font-[Manrope] font-bold">
                Açıklama *
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Etkinlik açıklamasını yazın..."
                className="font-[Manrope] min-h-[150px]"
              />
            </div>

            {/* Category and Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="font-[Manrope] font-bold">
                  Etkinlik Tipi *
                </Label>
                <Select value={category} onValueChange={(v) => setCategory(v as typeof category)}>
                  <SelectTrigger id="category" className="font-[Manrope]">
                    <SelectValue placeholder="Etkinlik tipi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {EVENT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventCategory" className="font-[Manrope] font-bold">
                  Kategori *
                </Label>
                <Select value={eventCategory} onValueChange={setEventCategory}>
                  <SelectTrigger id="eventCategory" className="font-[Manrope]">
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {EVENT_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="font-[Manrope] font-bold flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Tarih *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="font-[Manrope]"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="font-[Manrope] font-bold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Başlangıç Saati *
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="font-[Manrope]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime" className="font-[Manrope] font-bold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Bitiş Saati
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="font-[Manrope]"
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="font-[Manrope] font-bold flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Konum *
                </Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Etkinlik konumunu girin..."
                  className="font-[Manrope]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="locationDistrict" className="font-[Manrope] font-bold">
                  İlçe *
                </Label>
                <Select value={locationDistrict} onValueChange={setLocationDistrict}>
                  <SelectTrigger id="locationDistrict" className="font-[Manrope]">
                    <SelectValue placeholder="İlçe seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {DISTRICTS.map((district) => (
                      <SelectItem key={district.value} value={district.value}>
                        {district.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Participants and Organizer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxParticipants" className="font-[Manrope] font-bold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Maksimum Katılımcı Sayısı *
                </Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                  placeholder="Örn: 30"
                  className="font-[Manrope]"
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizer" className="font-[Manrope] font-bold">
                  Organizatör
                </Label>
                <Input
                  id="organizer"
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  placeholder="Organizatör adı (opsiyonel)"
                  className="font-[Manrope]"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="font-[Manrope] font-bold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Oluşturuluyor...
                  </>
                ) : (
                  "Etkinlik Oluştur"
                )}
              </Button>
              <Link href="/events">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                  className="font-[Manrope]"
                >
                  İptal
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


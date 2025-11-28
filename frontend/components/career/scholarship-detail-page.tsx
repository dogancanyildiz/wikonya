"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { 
  MapPin, 
  Clock, 
  DollarSign,
  ArrowLeft,
  Share2,
  Bookmark,
  Building2,
  Calendar,
  CheckCircle2,
  Mail,
  Phone,
  Globe,
  FileText,
  Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function ScholarshipDetailPage() {
  const params = useParams()
  const scholarshipId = params?.id ? Number(params.id) : 1
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isApplying, setIsApplying] = useState(false)

  // Mock data - gerçek uygulamada API'den gelecek
  const scholarship = {
    id: scholarshipId,
    organization: "Konya Büyükşehir Belediyesi",
    organizationLogo: "KBB",
    title: "Konya Gençlik Burs Programı",
    amount: "2.500₺/Ay",
    totalAmount: "30.000₺/Yıl",
    location: "Konya",
    deadline: "15 Aralık 2024",
    deadlineDays: 12,
    type: "Government" as const,
    description: "Konya Büyükşehir Belediyesi tarafından üniversite öğrencilerine sağlanan gençlik burs programı. Başarılı ve ihtiyaç sahibi öğrencilere aylık 2.500 TL burs desteği sağlanmaktadır.",
    eligibility: [
      "Konya'da üniversite öğrencisi olmak",
      "GPA en az 2.50 olmak",
      "Aylık gelir durumu belirli kriterleri karşılamak",
      "Daha önce bu burs programından yararlanmamış olmak",
      "Türkiye Cumhuriyeti vatandaşı olmak",
    ],
    requiredDocuments: [
      "Başvuru formu",
      "Transkript (not ortalaması belgesi)",
      "Gelir belgesi (aile gelir durumu)",
      "Kimlik fotokopisi",
      "Öğrenci belgesi",
      "2 adet vesikalık fotoğraf",
    ],
    applicationProcess: [
      "Online başvuru formunu doldurun",
      "Gerekli belgeleri hazırlayın",
      "Belgeleri belirtilen adrese gönderin veya online yükleyin",
      "Başvuru değerlendirme sürecini takip edin",
      "Sonuçlar e-posta ile bildirilecektir",
    ],
    benefits: [
      "Aylık 2.500 TL burs desteği",
      "12 ay süreyle devam eder",
      "Yıllık toplam 30.000 TL",
      "Ek eğitim desteği programlarına öncelik",
    ],
    organizationInfo: {
      name: "Konya Büyükşehir Belediyesi",
      description: "Konya Büyükşehir Belediyesi, gençlerin eğitimine destek olmak amacıyla çeşitli burs programları yürütmektedir.",
      website: "https://konya.bel.tr",
      email: "burs@konya.bel.tr",
      phone: "+90 332 221 00 00",
      address: "Konya Büyükşehir Belediyesi, Meram, Konya",
    },
  }

  const typeColors = {
    "Merit": "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400",
    "Need-Based": "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400",
    "Athletic": "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400",
    "Government": "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400",
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: scholarship.title,
          text: scholarship.description,
          url: window.location.href,
        })
      } catch (err) {
        console.error("Share failed:", err)
      }
    }
  }

  const handleApply = () => {
    setIsApplying(true)
    // Gerçek uygulamada API çağrısı yapılacak
    setTimeout(() => {
      setIsApplying(false)
      // Başvuru başarılı mesajı gösterilecek
    }, 2000)
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
      {/* Back Button */}
      <Link href="/career">
        <Button
          variant="ghost"
          className="mb-4 sm:mb-6 font-[Manrope] text-[#4d4d4d] dark:text-foreground hover:text-[#03624c]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri Dön
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Header Card */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#03624c] to-[#024d3c] rounded-xl flex items-center justify-center">
                    <span className="font-[Manrope] text-white font-extrabold text-2xl sm:text-3xl">
                      {scholarship.organizationLogo}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h1 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-2 font-extrabold text-2xl sm:text-3xl lg:text-4xl">
                      {scholarship.title}
                    </h1>
                    <p className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground font-semibold text-base sm:text-lg mb-3">
                      {scholarship.organization}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-[#03624c]" />
                        <span className="font-[Manrope] text-base sm:text-lg font-bold text-[#03624c]">
                          {scholarship.amount}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#03624c]" />
                        <span className="font-[Manrope] text-sm text-[#4d4d4d]/70 dark:text-muted-foreground">
                          {scholarship.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#03624c]" />
                        <span className="font-[Manrope] text-sm text-[#4d4d4d]/70 dark:text-muted-foreground">
                          {scholarship.deadlineDays} gün kaldı
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className="bg-[#f2f4f3] dark:bg-accent hover:bg-[#03624c]/10 dark:hover:bg-[#03624c]/20"
                  >
                    <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-[#03624c] text-[#03624c]' : 'text-[#4d4d4d] dark:text-foreground'}`} />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleShare}
                    className="bg-[#f2f4f3] dark:bg-accent hover:bg-[#03624c]/10 dark:hover:bg-[#03624c]/20"
                  >
                    <Share2 className="w-5 h-5 text-[#4d4d4d] dark:text-foreground" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={`font-[Manrope] font-bold text-sm px-3 py-1.5 ${typeColors[scholarship.type]}`}>
                  {scholarship.type}
                </Badge>
                <Badge className="bg-gradient-to-r from-[#03624c] to-[#024d3c] text-white font-[Manrope] font-bold text-sm px-3 py-1.5">
                  {scholarship.totalAmount}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl">
                Burs Hakkında
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground leading-relaxed">
                {scholarship.description}
              </p>
            </CardContent>
          </Card>

          {/* Eligibility */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl flex items-center gap-2">
                <Users className="w-5 h-5 text-[#03624c]" />
                Başvuru Koşulları
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {scholarship.eligibility.map((condition, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-[#03624c] flex-shrink-0 mt-0.5" />
                    <span className="font-[Manrope] text-sm text-[#4d4d4d] dark:text-foreground">
                      {condition}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Required Documents */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#03624c]" />
                Gerekli Belgeler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {scholarship.requiredDocuments.map((document, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-[#03624c] flex-shrink-0 mt-0.5" />
                    <span className="font-[Manrope] text-sm text-[#4d4d4d] dark:text-foreground">
                      {document}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Application Process */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#03624c]" />
                Başvuru Süreci
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scholarship.applicationProcess.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#03624c] text-white rounded-full flex items-center justify-center flex-shrink-0 font-[Manrope] font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-[Manrope] text-sm text-[#4d4d4d] dark:text-foreground">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl">
                Burs Avantajları
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scholarship.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-[#03624c] flex-shrink-0" />
                    <span className="font-[Manrope] text-sm text-[#4d4d4d] dark:text-foreground">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Apply Card */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border sticky top-4">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg">
                Başvuru
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                  <span className="font-[Manrope] text-sm text-[#4d4d4d]/60 dark:text-muted-foreground">
                    Burs Miktarı
                  </span>
                  <span className="font-[Manrope] font-bold text-sm text-[#03624c]">
                    {scholarship.amount}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                  <span className="font-[Manrope] text-sm text-[#4d4d4d]/60 dark:text-muted-foreground">
                    Son Başvuru
                  </span>
                  <span className="font-[Manrope] font-bold text-sm text-[#4d4d4d] dark:text-foreground">
                    {scholarship.deadline}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                  <span className="font-[Manrope] text-sm text-[#4d4d4d]/60 dark:text-muted-foreground">
                    Kalan Süre
                  </span>
                  <span className={`font-[Manrope] font-bold text-sm ${
                    scholarship.deadlineDays < 7 ? 'text-red-500' : 'text-[#03624c]'
                  }`}>
                    {scholarship.deadlineDays} gün
                  </span>
                </div>
              </div>
              <Button
                onClick={handleApply}
                disabled={isApplying || scholarship.deadlineDays <= 0}
                className="w-full py-3 bg-[#03624c] hover:bg-[#03624c]/90 font-[Manrope] font-bold"
              >
                {isApplying ? "Başvuruluyor..." : scholarship.deadlineDays <= 0 ? "Başvuru Kapalı" : "Başvur"}
              </Button>
            </CardContent>
          </Card>

          {/* Organization Info */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#03624c]" />
                Kurum Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div>
                <p className="font-[Manrope] font-bold text-base text-[#4d4d4d] dark:text-foreground mb-2">
                  {scholarship.organizationInfo.name}
                </p>
                <p className="font-[Manrope] text-sm text-[#4d4d4d]/70 dark:text-muted-foreground leading-relaxed">
                  {scholarship.organizationInfo.description}
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                {scholarship.organizationInfo.website && (
                  <a
                    href={scholarship.organizationInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 bg-[#f2f4f3] dark:bg-accent rounded-lg hover:bg-[#03624c]/10 dark:hover:bg-[#03624c]/20 transition-colors group"
                  >
                    <Globe className="w-4 h-4 text-[#03624c] group-hover:scale-110 transition-transform" />
                    <span className="font-[Manrope] text-sm text-[#03624c] group-hover:underline">
                      Web Sitesi
                    </span>
                  </a>
                )}
                <a
                  href={`mailto:${scholarship.organizationInfo.email}`}
                  className="flex items-center gap-2 p-2 bg-[#f2f4f3] dark:bg-accent rounded-lg hover:bg-[#03624c]/10 dark:hover:bg-[#03624c]/20 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#03624c] group-hover:scale-110 transition-transform" />
                  <span className="font-[Manrope] text-sm text-[#03624c] group-hover:underline">
                    E-posta
                  </span>
                </a>
                <a
                  href={`tel:${scholarship.organizationInfo.phone}`}
                  className="flex items-center gap-2 p-2 bg-[#f2f4f3] dark:bg-accent rounded-lg hover:bg-[#03624c]/10 dark:hover:bg-[#03624c]/20 transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#03624c] group-hover:scale-110 transition-transform" />
                  <span className="font-[Manrope] text-sm text-[#03624c] group-hover:underline">
                    {scholarship.organizationInfo.phone}
                  </span>
                </a>
                <div className="flex items-start gap-2 p-2">
                  <MapPin className="w-4 h-4 text-[#03624c] flex-shrink-0 mt-0.5" />
                  <span className="font-[Manrope] text-xs text-[#4d4d4d]/70 dark:text-muted-foreground">
                    {scholarship.organizationInfo.address}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


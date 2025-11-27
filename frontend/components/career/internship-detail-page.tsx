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
  Briefcase,
  Calendar,
  CheckCircle2,
  Mail,
  Phone,
  Globe,
  GraduationCap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function InternshipDetailPage() {
  const params = useParams()
  const internshipId = params?.id ? Number(params.id) : 1
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isApplying, setIsApplying] = useState(false)

  // Mock data - gerçek uygulamada API'den gelecek
  const internship = {
    id: internshipId,
    company: "TechHub Konya",
    companyLogo: "TH",
    role: "Marketing Intern",
    location: "Konya, Selçuklu",
    fullAddress: "Selçuklu Mahallesi, Teknokent Caddesi No: 15, Selçuklu, Konya",
    type: "Part-Time" as const,
    postedDays: 2,
    salary: "5.000₺",
    duration: "3-6 ay",
    hoursPerWeek: "20-25 saat",
    startDate: "Ocak 2025",
    description: "TechHub Konya'da pazarlama ekibimize katılacak, sosyal medya yönetimi, içerik üretimi ve etkinlik organizasyonu konularında deneyim kazanacak bir stajyer arıyoruz. Staj süresince mentorluk desteği ve sertifika verilecektir.",
    requirements: [
      "Üniversite öğrencisi (İletişim, Pazarlama veya ilgili bölümler)",
      "Sosyal medya platformlarını aktif kullanıyor olmak",
      "Yaratıcı düşünme ve içerik üretme yeteneği",
      "Takım çalışmasına yatkınlık",
      "Haftada en az 20 saat çalışabilme",
    ],
    responsibilities: [
      "Sosyal medya hesaplarının yönetimi ve içerik üretimi",
      "Etkinlik organizasyonu ve koordinasyonu",
      "Pazarlama kampanyalarına destek",
      "Raporlama ve analiz çalışmaları",
    ],
    benefits: [
      "Staj sertifikası",
      "Mentorluk desteği",
      "Esnek çalışma saatleri",
      "Networking imkanları",
      "Proje deneyimi",
      "Referans mektubu",
    ],
    companyInfo: {
      name: "TechHub Konya",
      description: "Konya'nın önde gelen teknoloji ve inovasyon merkezi. Startup'lara ve teknoloji şirketlerine destek sağlıyoruz.",
      website: "https://techhubkonya.com",
      email: "info@techhubkonya.com",
      phone: "+90 332 123 45 67",
      employees: "50-100",
      industry: "Teknoloji",
    },
  }

  const typeColors = {
    "Part-Time": "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400",
    "Full-Time": "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400",
    "Remote": "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400",
    "Hybrid": "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400",
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: internship.role,
          text: internship.description,
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
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#f2f4f3] dark:bg-accent rounded-xl flex items-center justify-center border-2 border-gray-100 dark:border-border">
                    <span className="font-[Manrope] text-[#03624c] font-extrabold text-2xl sm:text-3xl">
                      {internship.companyLogo}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h1 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-2 font-extrabold text-2xl sm:text-3xl lg:text-4xl">
                      {internship.role}
                    </h1>
                    <p className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground font-semibold text-base sm:text-lg mb-3">
                      {internship.company}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#03624c]" />
                        <span className="font-[Manrope] text-sm text-[#4d4d4d]/70 dark:text-muted-foreground">
                          {internship.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#03624c]" />
                        <span className="font-[Manrope] text-sm text-[#4d4d4d]/70 dark:text-muted-foreground">
                          {internship.postedDays} gün önce
                        </span>
                      </div>
                      {internship.salary && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-[#03624c]" />
                          <span className="font-[Manrope] text-sm font-bold text-[#03624c]">
                            {internship.salary}
                          </span>
                        </div>
                      )}
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
                <Badge className={`font-[Manrope] font-bold text-sm px-3 py-1.5 ${typeColors[internship.type]}`}>
                  {internship.type}
                </Badge>
                <Badge className="bg-[#03624c] text-white font-[Manrope] font-bold text-sm px-3 py-1.5">
                  Staj
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl">
                Staj Hakkında
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground leading-relaxed">
                {internship.description}
              </p>
            </CardContent>
          </Card>

          {/* Staj Detayları */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#03624c]" />
                Staj Detayları
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                  <Calendar className="w-5 h-5 text-[#03624c]" />
                  <div>
                    <p className="font-[Manrope] text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                      Süre
                    </p>
                    <p className="font-[Manrope] font-bold text-sm text-[#4d4d4d] dark:text-foreground">
                      {internship.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                  <Clock className="w-5 h-5 text-[#03624c]" />
                  <div>
                    <p className="font-[Manrope] text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                      Haftalık Saat
                    </p>
                    <p className="font-[Manrope] font-bold text-sm text-[#4d4d4d] dark:text-foreground">
                      {internship.hoursPerWeek}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                  <Calendar className="w-5 h-5 text-[#03624c]" />
                  <div>
                    <p className="font-[Manrope] text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                      Başlangıç Tarihi
                    </p>
                    <p className="font-[Manrope] font-bold text-sm text-[#4d4d4d] dark:text-foreground">
                      {internship.startDate}
                    </p>
                  </div>
                </div>
                {internship.salary && (
                  <div className="flex items-center gap-3 p-3 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                    <DollarSign className="w-5 h-5 text-[#03624c]" />
                    <div>
                      <p className="font-[Manrope] text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                        Ücret
                      </p>
                      <p className="font-[Manrope] font-bold text-sm text-[#03624c]">
                        {internship.salary}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Responsibilities */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#03624c]" />
                Sorumluluklar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {internship.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-[#03624c] flex-shrink-0 mt-0.5" />
                    <span className="font-[Manrope] text-sm text-[#4d4d4d] dark:text-foreground">
                      {responsibility}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl">
                Gereksinimler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {internship.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-[#03624c] flex-shrink-0 mt-0.5" />
                    <span className="font-[Manrope] text-sm text-[#4d4d4d] dark:text-foreground">
                      {requirement}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl">
                Staj Avantajları
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {internship.benefits.map((benefit, index) => (
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
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                  <span className="font-[Manrope] text-sm text-[#4d4d4d]/60 dark:text-muted-foreground">
                    İlan Tarihi
                  </span>
                  <span className="font-[Manrope] font-bold text-sm text-[#4d4d4d] dark:text-foreground">
                    {internship.postedDays} gün önce
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                  <span className="font-[Manrope] text-sm text-[#4d4d4d]/60 dark:text-muted-foreground">
                    Çalışma Tipi
                  </span>
                  <Badge className={`font-[Manrope] font-bold text-xs ${typeColors[internship.type]}`}>
                    {internship.type}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                  <span className="font-[Manrope] text-sm text-[#4d4d4d]/60 dark:text-muted-foreground">
                    Süre
                  </span>
                  <span className="font-[Manrope] font-bold text-sm text-[#4d4d4d] dark:text-foreground">
                    {internship.duration}
                  </span>
                </div>
                {internship.salary && (
                  <div className="flex items-center justify-between p-3 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                    <span className="font-[Manrope] text-sm text-[#4d4d4d]/60 dark:text-muted-foreground">
                      Ücret
                    </span>
                    <span className="font-[Manrope] font-bold text-sm text-[#03624c]">
                      {internship.salary}
                    </span>
                  </div>
                )}
              </div>
              <Button
                onClick={handleApply}
                disabled={isApplying}
                className="w-full py-3 bg-[#03624c] hover:bg-[#03624c]/90 font-[Manrope] font-bold"
              >
                {isApplying ? "Başvuruluyor..." : "Başvur"}
              </Button>
            </CardContent>
          </Card>

          {/* Company Info */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#03624c]" />
                Şirket Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-[Manrope] font-bold text-base text-[#4d4d4d] dark:text-foreground mb-2">
                  {internship.companyInfo.name}
                </p>
                <p className="font-[Manrope] text-sm text-[#4d4d4d]/70 dark:text-muted-foreground leading-relaxed">
                  {internship.companyInfo.description}
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-[Manrope] text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                    Sektör
                  </span>
                  <span className="font-[Manrope] font-semibold text-xs text-[#4d4d4d] dark:text-foreground">
                    {internship.companyInfo.industry}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-[Manrope] text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                    Çalışan Sayısı
                  </span>
                  <span className="font-[Manrope] font-semibold text-xs text-[#4d4d4d] dark:text-foreground">
                    {internship.companyInfo.employees}
                  </span>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                {internship.companyInfo.website && (
                  <a
                    href={internship.companyInfo.website}
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
                  href={`mailto:${internship.companyInfo.email}`}
                  className="flex items-center gap-2 p-2 bg-[#f2f4f3] dark:bg-accent rounded-lg hover:bg-[#03624c]/10 dark:hover:bg-[#03624c]/20 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#03624c] group-hover:scale-110 transition-transform" />
                  <span className="font-[Manrope] text-sm text-[#03624c] group-hover:underline">
                    E-posta
                  </span>
                </a>
                <a
                  href={`tel:${internship.companyInfo.phone}`}
                  className="flex items-center gap-2 p-2 bg-[#f2f4f3] dark:bg-accent rounded-lg hover:bg-[#03624c]/10 dark:hover:bg-[#03624c]/20 transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#03624c] group-hover:scale-110 transition-transform" />
                  <span className="font-[Manrope] text-sm text-[#03624c] group-hover:underline">
                    {internship.companyInfo.phone}
                  </span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


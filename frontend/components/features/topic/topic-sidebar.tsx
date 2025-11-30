"use client"

import { Users, TrendingUp, BookOpen, ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TopicSidebarProps {
  topicId: number
}

export function TopicSidebar({ topicId }: TopicSidebarProps) {
  const contributors = [
    { id: 1, name: "Prof. Dr. Ahmet Yılmaz", initials: "AY", role: "Ana Editör" },
    { id: 2, name: "Elif Demir", initials: "ED", role: "Katkıda Bulunan" },
    { id: 3, name: "Burak Kaya", initials: "BK", role: "Katkıda Bulunan" },
  ]

  const relatedTopics = [
    { id: 1, title: "Ceza Hukuku Genel Hükümler", views: "2.4k" },
    { id: 2, title: "Medeni Usul Hukuku Özeti", views: "1.8k" },
    { id: 3, title: "Anayasa Hukuku Ders Notları", views: "3.1k" },
    { id: 4, title: "Ticaret Hukuku Final Hazırlık", views: "1.5k" },
  ]

  const resources = [
    { id: 1, title: "Resmi Ders İzlencesi", type: "PDF" },
    { id: 2, title: "Geçmiş Yıl Sınav Soruları", type: "PDF" },
    { id: 3, title: "Video Ders Serisi", type: "Link" },
  ]

  return (
    <div className="space-y-4 sm:space-y-6 sticky top-24">
      {/* Contributors */}
      <Card className="rounded-xl shadow-md border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span className="font-[Manrope] text-foreground font-bold text-base sm:text-lg">
              Katkıda Bulunanlar
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3 pt-0">
          {contributors.map((contributor) => (
            <div
              key={contributor.id}
              className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-accent rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            >
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-border">
                <AvatarFallback className="bg-primary text-primary-foreground font-[Manrope] font-bold text-[10px] sm:text-xs">
                  {contributor.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-[Manrope] text-foreground font-bold text-xs sm:text-sm truncate">
                  {contributor.name}
                </h4>
                <p className="font-[Manrope] text-muted-foreground font-medium text-[10px] sm:text-xs">
                  {contributor.role}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Related Topics */}
      <Card className="rounded-xl shadow-md border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span className="font-[Manrope] text-foreground font-bold text-base sm:text-lg">
              İlgili Konular
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          {relatedTopics.map((topic) => (
            <div
              key={topic.id}
              className="p-2 sm:p-3 bg-accent rounded-lg hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer group"
            >
              <h4 className="font-[Manrope] text-foreground group-hover:text-primary-foreground mb-1 font-semibold text-xs sm:text-sm">
                {topic.title}
              </h4>
              <p className="font-[Manrope] text-muted-foreground group-hover:text-primary-foreground/80 font-medium text-[10px] sm:text-xs">
                {topic.views} görüntülenme
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Resources */}
      <Card className="rounded-xl shadow-md border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span className="font-[Manrope] text-foreground font-bold text-base sm:text-lg">
              Ek Kaynaklar
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="flex items-center justify-between p-2 sm:p-3 bg-accent rounded-lg hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-[Manrope] text-foreground font-semibold text-xs sm:text-sm truncate">
                  {resource.title}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-card rounded-md font-[Manrope] text-primary font-bold text-[10px] sm:text-xs">
                  {resource.type}
                </span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-primary group-hover:scale-110 transition-transform" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="bg-gradient-to-br from-primary to-primary/80 rounded-xl text-primary-foreground shadow-lg border-0">
        <CardHeader>
          <CardTitle className="font-[Manrope] mb-2 sm:mb-3 font-bold text-base sm:text-lg">
            Doğruluk Kontrolü
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-[Manrope] opacity-90 mb-3 sm:mb-4 font-medium text-xs sm:text-sm leading-relaxed">
            Bu içerik, akademisyenler ve deneyimli öğrenciler tarafından doğrulanmıştır.
          </p>
          <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-white/20">
            <span className="font-[Manrope] font-semibold text-xs sm:text-sm">
              Son Kontrol:
            </span>
            <span className="font-[Manrope] font-bold text-xs sm:text-sm">
              25 Kas 2024
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


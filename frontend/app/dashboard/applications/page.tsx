"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/contexts/app-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from "@/components/ui/empty"
import { Briefcase, Clock, CheckCircle2, XCircle, AlertCircle, FileText, Building2, MapPin } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { tr } from "date-fns/locale"

interface Application {
  id: number
  jobId: number
  jobTitle: string
  company: string
  location: string
  appliedDate: string
  status: "pending" | "reviewing" | "interview" | "accepted" | "rejected"
  notes?: string
}

export default function ApplicationsPage() {
  const { state } = useApp()
  const [applications, setApplications] = useState<Application[]>([])
  const [filter, setFilter] = useState<"all" | "pending" | "reviewing" | "interview" | "accepted" | "rejected">("all")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("job_applications")
      if (stored) {
        try {
          const apps = JSON.parse(stored)
          setApplications(Array.isArray(apps) ? apps : [])
        } catch {
          setApplications([])
        }
      }
    }
  }, [])

  const filteredApplications = applications.filter(app => 
    filter === "all" || app.status === filter
  )

  const getStatusBadge = (status: Application["status"]) => {
    const statusConfig = {
      pending: { label: "Beklemede", variant: "secondary" as const, icon: Clock },
      reviewing: { label: "İnceleniyor", variant: "default" as const, icon: AlertCircle },
      interview: { label: "Mülakat", variant: "default" as const, icon: CheckCircle2 },
      accepted: { label: "Kabul Edildi", variant: "default" as const, icon: CheckCircle2 },
      rejected: { label: "Reddedildi", variant: "destructive" as const, icon: XCircle },
    }
    const config = statusConfig[status]
    const Icon = config.icon
    return (
      <Badge variant={config.variant} className="font-[Manrope] font-semibold">
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const statusCounts = {
    all: applications.length,
    pending: applications.filter(a => a.status === "pending").length,
    reviewing: applications.filter(a => a.status === "reviewing").length,
    interview: applications.filter(a => a.status === "interview").length,
    accepted: applications.filter(a => a.status === "accepted").length,
    rejected: applications.filter(a => a.status === "rejected").length,
  }

  if (!state.user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="font-[Manrope] text-foreground">Lütfen giriş yapın</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-[Manrope] text-foreground font-extrabold text-2xl sm:text-3xl mb-2">
          Başvurularım
        </h1>
        <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground text-sm">
          İş başvurularınızı takip edin
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "all", label: "Tümü", count: statusCounts.all },
          { id: "pending", label: "Beklemede", count: statusCounts.pending },
          { id: "reviewing", label: "İnceleniyor", count: statusCounts.reviewing },
          { id: "interview", label: "Mülakat", count: statusCounts.interview },
          { id: "accepted", label: "Kabul", count: statusCounts.accepted },
          { id: "rejected", label: "Reddedildi", count: statusCounts.rejected },
        ].map((filterOption) => (
          <Button
            key={filterOption.id}
            variant={filter === filterOption.id ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(filterOption.id as typeof filter)}
            className="font-[Manrope] font-semibold"
          >
            {filterOption.label}
            {filterOption.count > 0 && (
              <Badge variant="secondary" className="ml-2">
                {filterOption.count}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <Empty>
          <EmptyMedia>
            <Briefcase className="w-12 h-12 text-muted-foreground" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle className="font-[Manrope]">Henüz başvuru yok</EmptyTitle>
            <EmptyDescription className="font-[Manrope]">
              {filter === "all"
                ? "Henüz hiç başvuru yapmadınız. Kariyer sayfasından iş ilanlarına göz atabilirsiniz."
                : "Bu kategoride başvuru bulunmuyor."}
            </EmptyDescription>
          </EmptyHeader>
          {filter === "all" && (
            <Link href="/career">
              <Button className="font-[Manrope] font-bold">
                <Briefcase className="w-4 h-4 mr-2" />
                İş İlanlarına Git
              </Button>
            </Link>
          )}
        </Empty>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="bg-card border border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-[Manrope] font-bold text-lg text-foreground mb-1">
                          {application.jobTitle}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
                          <span className="font-[Manrope] font-semibold">{application.company}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span className="font-[Manrope]">{application.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span className="font-[Manrope]">
                            {formatDistanceToNow(new Date(application.appliedDate), {
                              addSuffix: true,
                              locale: tr,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    {application.notes && (
                      <div className="mt-3 p-3 bg-accent rounded-lg">
                        <p className="font-[Manrope] text-sm text-foreground">{application.notes}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(application.status)}
                    <Link href={`/career/job/${application.jobId}`}>
                      <Button variant="outline" size="sm" className="font-[Manrope]">
                        <FileText className="w-4 h-4 mr-2" />
                        Detaylar
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}


"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Page error:", error)
    
    // Log to error tracking service in production
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      // Sentry.captureException(error)
    }
  }, [error])

  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-md w-full bg-card border border-border">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="font-[Manrope] font-bold text-xl text-foreground">
              Bir Hata Oluştu
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="font-[Manrope] text-sm text-muted-foreground">
            Üzgünüz, beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin veya ana sayfaya dönün.
          </p>
          
          {process.env.NODE_ENV === "development" && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-[Manrope] text-xs font-semibold text-foreground mb-1">
                Hata Detayı (Sadece Development):
              </p>
              <p className="font-mono text-xs text-muted-foreground break-all">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={reset}
              className="font-[Manrope] font-bold flex-1"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Tekrar Dene
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="font-[Manrope] flex-1"
            >
              <Home className="w-4 h-4 mr-2" />
              Ana Sayfa
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

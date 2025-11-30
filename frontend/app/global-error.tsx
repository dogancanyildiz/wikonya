"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Global error:", error)
    
    // Log to error tracking service in production
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      // Sentry.captureException(error)
    }
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="max-w-md w-full bg-card border border-border">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle className="font-[Manrope] font-bold text-xl text-foreground">
                  Kritik Hata
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-[Manrope] text-sm text-muted-foreground">
                Uygulamada kritik bir hata oluştu. Lütfen sayfayı yenileyin.
              </p>

              <Button
                onClick={reset}
                className="font-[Manrope] font-bold w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sayfayı Yenile
              </Button>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  )
}

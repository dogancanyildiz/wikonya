"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Global error:", error)
  }, [error])

  return (
    <html lang="tr">
      <body>
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="max-w-md w-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <CardTitle className="font-[Manrope] font-bold">
                  Kritik Hata
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-[Manrope] text-muted-foreground">
                Uygulamada kritik bir hata oluştu. Lütfen sayfayı yenileyin veya ana sayfaya dönün.
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground font-[Manrope]">
                <li>Sayfayı yenileyin</li>
                <li>Ana sayfaya dönün</li>
                <li>Tarayıcı önbelleğini temizleyin</li>
              </ul>
              {error.digest && (
                <div className="p-2 bg-muted rounded text-xs font-mono text-muted-foreground">
                  Hata ID: {error.digest}
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={reset}
                  className="font-[Manrope]"
                >
                  🔄 Sayfayı Yenile
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = "/"}
                  className="font-[Manrope]"
                >
                  🏠 Ana Sayfaya Dön
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  )
}


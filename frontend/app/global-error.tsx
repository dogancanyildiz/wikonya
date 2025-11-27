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
                Uygulamada kritik bir hata oluştu. Lütfen sayfayı yenileyin.
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground font-mono">
                  Hata ID: {error.digest}
                </p>
              )}
              <div className="flex gap-2">
                <Button
                  onClick={reset}
                  className="font-[Manrope]"
                >
                  Sayfayı Yenile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  )
}


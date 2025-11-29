"use client"

import { Component, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="max-w-md w-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <CardTitle className="font-[Manrope] font-bold">
                  Bir Hata Oluştu
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <p className="font-[Manrope] text-muted-foreground">
                Üzgünüz, beklenmeyen bir hata oluştu. Lütfen aşağıdaki seçenekleri deneyin:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground font-[Manrope]">
                <li>Sayfayı yenileyin</li>
                <li>Ana sayfaya dönün</li>
                <li>Birkaç dakika sonra tekrar deneyin</li>
              </ul>
              {this.state.error && (
                <details className="text-sm text-muted-foreground">
                  <summary className="cursor-pointer font-semibold mb-2 font-[Manrope] hover:text-foreground transition-colors">
                    Hata Detayları (Geliştiriciler için)
                  </summary>
                  <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-auto font-mono">
                    {this.state.error.message}
                    {this.state.error.stack && (
                      <>
                        {"\n\n"}
                        {this.state.error.stack}
                      </>
                    )}
                  </pre>
                </details>
              )}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={() => window.location.reload()}
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
                <Button
                  variant="ghost"
                  onClick={() => {
                    this.setState({ hasError: false, error: null })
                  }}
                  className="font-[Manrope]"
                >
                  🔁 Tekrar Dene
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}


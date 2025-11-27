"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/contexts/app-context"
import { mockRegister, mockVerifyUser } from "@/lib/auth/mock-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const { setUser } = useApp()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Email doğrulaması
      const isValid = await mockVerifyUser(email, "email")
      if (!isValid) {
        throw new Error("Sadece üniversite email'i (.edu.tr) veya test email'i kullanılabilir")
      }

      // Register
      const user = await mockRegister(email, name)
      if (user) {
        setUser(user)
        router.push("/dashboard")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kayıt olurken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f2f4f3] dark:bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Kayıt Ol</CardTitle>
          <CardDescription className="text-center">
            Genç Kültür Kart ID veya üniversite email&apos;inizle kayıt olun
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Ad Soyad</Label>
              <Input
                id="name"
                type="text"
                placeholder="Adınız ve Soyadınız"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email veya Genç Kültür Kart ID</Label>
              <Input
                id="email"
                type="text"
                placeholder="ornek@selcuk.edu.tr veya test email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Sadece üniversite email&apos;i (.edu.tr) veya test email&apos;i kullanılabilir
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Şifre (Opsiyonel - Mock)</Label>
              <Input
                id="password"
                type="password"
                placeholder="Şifre (mock sistemde opsiyonel)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Kayıt olunuyor...
                </>
              ) : (
                "Kayıt Ol"
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Zaten hesabınız var mı?{" "}
              <a href="/auth/login" className="text-[#03624c] hover:underline">
                Giriş yapın
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


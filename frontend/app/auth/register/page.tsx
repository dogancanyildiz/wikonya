"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useApp } from "@/contexts/app-context"
import { mockRegister, mockVerifyUser } from "@/lib/auth/mock-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, Mail, Lock, User, Rocket, Gift, Trophy, Star, Home } from "lucide-react"

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
      const isValid = await mockVerifyUser(email, "email")
      if (!isValid) {
        throw new Error("Sadece üniversite email'i (.edu.tr) veya test email'i kullanılabilir")
      }

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

  const benefits = [
    { icon: Gift, title: "100 GençCoin", desc: "Hoş geldin hediyesi" },
    { icon: Trophy, title: "Rozet Kazan", desc: "İlk katkıda" },
    { icon: Star, title: "Özel Avantajlar", desc: "Kültür Kart'a çevir" },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Sol Panel - Branding (sadece desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-[#013d2f] relative overflow-hidden">
        {/* Decorative glow elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <Link href="/" className="mb-12 inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-[Manrope] text-white font-black text-3xl xl:text-4xl">
              KONYA <span className="text-white/80">GENÇ</span>
            </span>
          </Link>
          
          <h1 className="font-[Manrope] text-white font-black text-4xl xl:text-5xl leading-tight mb-6">
            Topluluğa<br />
            <span className="text-white/80">Katıl!</span>
          </h1>
          
          <p className="font-[Manrope] text-white/70 font-medium text-lg xl:text-xl leading-relaxed mb-10 max-w-md">
            Konya&apos;daki üniversite öğrencileriyle bilgi paylaş, deneyimlerini aktar ve GençCoin kazan!
          </p>

          {/* Benefits */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 bg-white/10 rounded-2xl p-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-[Manrope] text-white font-bold text-lg">
                    {benefit.title}
                  </p>
                  <p className="font-[Manrope] text-white/60 font-medium text-sm">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sağ Panel / Mobil - Register Form */}
      <div className="w-full lg:w-1/2 bg-background flex items-center justify-center p-6 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="font-[Manrope] text-foreground font-black text-2xl">
                KONYA <span className="text-primary">GENÇ</span>
              </span>
            </Link>
          </div>

          {/* Welcome */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
              <Rocket className="w-4 h-4 text-primary" />
              <span className="font-[Manrope] text-primary font-semibold text-sm">
                Yolculuğa başla
              </span>
            </div>
            <h2 className="font-[Manrope] text-foreground font-black text-3xl sm:text-4xl mb-2">
              Kayıt Ol
            </h2>
            <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium">
              Üniversite email&apos;inizle hemen ücretsiz hesap oluşturun
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white dark:bg-card rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-lg p-6 sm:p-8 border border-border">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="rounded-xl border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="font-[Manrope] font-medium text-sm">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label 
                  htmlFor="name" 
                  className="font-[Manrope] text-foreground font-bold text-sm"
                >
                  Ad Soyad
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 dark:text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Adınız ve Soyadınız"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-14 pl-12 pr-4 bg-accent border-0 rounded-xl font-[Manrope] font-medium text-foreground placeholder:text-foreground/40 dark:placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label 
                  htmlFor="email" 
                  className="font-[Manrope] text-foreground font-bold text-sm"
                >
                  Üniversite Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 dark:text-muted-foreground" />
                  <Input
                    id="email"
                    type="text"
                    placeholder="ornek@selcuk.edu.tr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-14 pl-12 pr-4 bg-accent border-0 rounded-xl font-[Manrope] font-medium text-foreground placeholder:text-foreground/40 dark:placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>
                <p className="font-[Manrope] text-[10px] text-foreground/50 dark:text-muted-foreground">
                  Sadece üniversite email&apos;i (.edu.tr) veya test email&apos;i kullanılabilir
                </p>
              </div>

              <div className="space-y-2">
                <Label 
                  htmlFor="password" 
                  className="font-[Manrope] text-foreground font-bold text-sm"
                >
                  Şifre
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 dark:text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="h-14 pl-12 pr-4 bg-accent border-0 rounded-xl font-[Manrope] font-medium text-foreground placeholder:text-foreground/40 dark:placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-[Manrope] font-bold text-base transition-all duration-200 shadow-[0_4px_14px_rgba(3,98,76,0.4)] hover:shadow-[0_6px_20px_rgba(3,98,76,0.5)]" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>Kayıt olunuyor...</span>
                  </>
                ) : (
                  "Kayıt Ol"
                )}
              </Button>

              <p className="font-[Manrope] text-[10px] text-foreground/50 dark:text-muted-foreground text-center leading-relaxed pt-2">
                Kayıt olarak{" "}
                <Link href="#" className="text-primary hover:underline">Kullanım Şartları</Link>
                {" "}ve{" "}
                <Link href="#" className="text-primary hover:underline">Gizlilik Politikası</Link>
                &apos;nı kabul etmiş olursunuz.
              </p>
            </form>
          </div>

          {/* Login Link */}
          <div className="text-center mt-8">
            <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium">
              Zaten hesabınız var mı?{" "}
              <Link 
                href="/auth/login" 
                className="text-primary font-bold hover:underline"
              >
                Giriş yapın
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="text-center mt-10">
            <p className="font-[Manrope] text-foreground/40 dark:text-muted-foreground/60 text-xs">
              © 2024 Konya Büyükşehir Belediyesi
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { commentSchema, type CommentFormData } from "@/lib/validations"

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => void | Promise<void>
  isLoading?: boolean
}

export function CommentForm({ onSubmit, isLoading = false }: CommentFormProps) {
  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  })

  const handleSubmit = async (data: CommentFormData) => {
    await onSubmit(data)
    form.reset()
  }

  return (
    <Card className="mt-6 sm:mt-8 rounded-xl shadow-md border-border">
      <CardHeader>
        <CardTitle className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl">
          Görüş Bildir
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Deneyimlerinizi ve düşüncelerinizi paylaşın..."
                      className="w-full p-4 bg-accent rounded-lg font-[Manrope] text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring font-medium min-h-[120px] text-sm sm:text-base"
                      aria-label="Yorum metni"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <span className="font-[Manrope] text-muted-foreground font-medium text-xs sm:text-sm">
                Lütfen yapıcı ve saygılı yorumlar yazın
              </span>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 font-[Manrope] px-6 sm:px-8 font-bold text-primary-foreground"
                aria-label="Yorumu gönder"
              >
                {isLoading ? "Gönderiliyor..." : "Gönder"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}


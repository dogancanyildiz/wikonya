import { z } from "zod"

// Search Form Schema
export const searchSchema = z.object({
  query: z.string().min(1, "Arama terimi boş olamaz").max(100, "Arama terimi çok uzun"),
})

export type SearchFormData = z.infer<typeof searchSchema>

// Comment Form Schema
export const commentSchema = z.object({
  content: z.string().min(10, "Yorum en az 10 karakter olmalıdır").max(1000, "Yorum çok uzun"),
})

export type CommentFormData = z.infer<typeof commentSchema>

// Contact Form Schema
export const contactSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır").max(50, "İsim çok uzun"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır").max(500, "Mesaj çok uzun"),
})

export type ContactFormData = z.infer<typeof contactSchema>

// Topic Form Schema
export const topicSchema = z.object({
  title: z.string().min(5, "Başlık en az 5 karakter olmalıdır").max(200, "Başlık çok uzun"),
  content: z.string().min(20, "İçerik en az 20 karakter olmalıdır").max(5000, "İçerik çok uzun"),
  category: z.string().min(1, "Kategori seçiniz"),
  tags: z.array(z.string()).optional(),
})

export type TopicFormData = z.infer<typeof topicSchema>


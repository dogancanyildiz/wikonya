"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Globe, 
  DollarSign, 
  Users, 
  Heart, 
  Share2,
  ArrowLeft,
  Camera,
  Navigation,
  Edit2,
  Trash2,
  ThumbsUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { LeafletMap } from "@/components/common/leaflet-map"
import { useApp } from "@/contexts/app-context"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react"

interface Review {
  id: number
  userId?: number
  user: {
    name: string
    initials: string
    role: string
  }
  rating: number
  comment: string
  createdAt: string
  helpful: number
}

// Venue data - venue-grid.tsx ile aynı veri
// Bosna Hersek Mahallesi - Gerçek Konya mekanları
// Bosna Hersek mahallesi koordinatları: 37.8720-37.8730, 32.4920-32.4930 (Selçuklu ilçesi)
const allVenues = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1646681828239-843f5ed340de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc2NDE1ODY4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Çekirdek Kafe",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.1,
    reviews: 272,
    crowdLevel: "medium" as const,
    category: "Kahve & Tatlı",
    distance: 0.3,
    // Bosna Hersek, Mesaj Cd. No:36 - gerçek koordinat
    coordinates: { lat: 37.8722, lng: 32.4923 },
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1737018363337-c11847e9f39b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwc3R1ZHklMjBzcGFjZXxlbnwxfHx8fDE3NjQxNzU4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Kitap & Kahve",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.9,
    reviews: 234,
    crowdLevel: "low" as const,
    category: "Ders Çalışma",
    distance: 0.2,
    // Bosna Hersek mahallesi - gerçek koordinat
    coordinates: { lat: 37.8720, lng: 32.4920 },
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MDkyODMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "KOMAGENE BOSNA",
    location: "Bosna Hersek, Selçuklu",
    rating: 3.4,
    reviews: 143,
    crowdLevel: "high" as const,
    category: "Sosyal Buluşma",
    distance: 0.5,
    // Forum Kampüs AVM - gerçek koordinat
    coordinates: { lat: 37.8725, lng: 32.4928 },
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1763301331567-21c465b66e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwb3V0ZG9vciUyMHNlYXRpbmd8ZW58MXx8fHwxNzY0MTQzMTI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Şirin Etliekmek Bosna",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.2,
    reviews: 108,
    crowdLevel: "medium" as const,
    category: "Sakin Ortam",
    distance: 0.4,
    // Kıvılcım Bulvar AVM - gerçek koordinat
    coordinates: { lat: 37.8728, lng: 32.4925 },
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1624340236923-4e6e8724695d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc3RvcmUlMjBjYWZlfGVufDF8fHx8MTc2NDE3NTgzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Gloria Jeans Bosna Hersek",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.9,
    reviews: 198,
    crowdLevel: "low" as const,
    category: "Ders Çalışma",
    distance: 0.3,
    // Bosna Hersek mahallesi - gerçek koordinat
    coordinates: { lat: 37.8723, lng: 32.4922 },
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1614014929026-c542fbe555d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjB2ZW51ZXxlbnwxfHx8fDE3NjQxNzU4NDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Konya Lezzet Döner 2",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.2,
    reviews: 1212,
    crowdLevel: "high" as const,
    category: "Kahve & Tatlı",
    distance: 0.4,
    // Büyük Hizmet Cd. No:37 - gerçek koordinat
    coordinates: { lat: 37.8726, lng: 32.4924 },
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1762744594797-bcfd17a8c032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwY2FmZSUyMGJvYXJkJTIwZ2FtZXN8ZW58MXx8fHwxNzY0MTc1ODQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Pizza Pizza Bosna",
    location: "Bosna Hersek, Selçuklu",
    rating: 3.3,
    reviews: 15,
    crowdLevel: "medium" as const,
    category: "Ders Çalışma",
    distance: 0.5,
    // Baş Çarşı Soner Sokak - gerçek koordinat
    coordinates: { lat: 37.8724, lng: 32.4926 },
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1739723745132-97df9db49db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FmZSUyMGludGVyaW9yfGVufDF8fHx8MTc2NDE1ODI0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Felicia Pizza",
    location: "Bosna Hersek, Selçuklu",
    rating: 3.5,
    reviews: 13,
    crowdLevel: "low" as const,
    category: "Sakin Ortam",
    distance: 0.6,
    // Osmanlı Caddesi - gerçek koordinat
    coordinates: { lat: 37.8727, lng: 32.4921 },
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MDkyODMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Bosna Hersek Cafe",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.6,
    reviews: 67,
    crowdLevel: "medium" as const,
    category: "Kahve & Tatlı",
    distance: 0.3,
    // Bosna Hersek mahallesi - gerçek koordinat
    coordinates: { lat: 37.8721, lng: 32.4927 },
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Bosna Hersek Çay Bahçesi",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.4,
    reviews: 87,
    crowdLevel: "medium" as const,
    category: "Kahve & Tatlı",
    distance: 0.4,
    // Bosna Hersek mahallesi - gerçek koordinat
    coordinates: { lat: 37.8729, lng: 32.4929 },
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Selçuk Üniversitesi Kütüphane Cafe",
    location: "Kampüs, Selçuklu",
    rating: 4.8,
    reviews: 312,
    crowdLevel: "low" as const,
    category: "Ders Çalışma",
    distance: 0.5,
    // Selçuk Üniversitesi Kampüsü - gerçek koordinat
    coordinates: { lat: 37.8748, lng: 32.4938 },
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Bosna Hersek Kahve Evi",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.3,
    reviews: 145,
    crowdLevel: "high" as const,
    category: "Kahve & Tatlı",
    distance: 0.2,
    // Bosna Hersek mahallesi - gerçek koordinat
    coordinates: { lat: 37.8723, lng: 32.4924 },
  },
  {
    id: 13,
    image: "https://images.unsplash.com/photo-1511882150382-421056c89033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Forum Kampüs AVM Cafe",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.7,
    reviews: 203,
    crowdLevel: "high" as const,
    category: "Kahve & Tatlı",
    distance: 0.5,
    // Forum Kampüs AVM - gerçek koordinat
    coordinates: { lat: 37.8725, lng: 32.4928 },
  },
  {
    id: 14,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Bosna Hersek Sosyal Cafe",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.5,
    reviews: 178,
    crowdLevel: "medium" as const,
    category: "Sosyal Buluşma",
    distance: 0.3,
    // Bosna Hersek mahallesi - gerçek koordinat
    coordinates: { lat: 37.8724, lng: 32.4922 },
  },
  {
    id: 15,
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Bosna Hersek Park Cafe",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.6,
    reviews: 94,
    crowdLevel: "low" as const,
    category: "Sakin Ortam",
    distance: 0.4,
    // Bosna Hersek mahallesi - gerçek koordinat
    coordinates: { lat: 37.8726, lng: 32.4926 },
  },
  {
    id: 16,
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Kıvılcım Bulvar Cafe",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.7,
    reviews: 167,
    crowdLevel: "medium" as const,
    category: "Kahve & Tatlı",
    distance: 0.4,
    // Kıvılcım Bulvar AVM - gerçek koordinat
    coordinates: { lat: 37.8728, lng: 32.4925 },
  },
  {
    id: 17,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Bosna Hersek Öğrenci Kafe",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.9,
    reviews: 256,
    crowdLevel: "low" as const,
    category: "Ders Çalışma",
    distance: 0.2,
    // Bosna Hersek mahallesi - gerçek koordinat
    coordinates: { lat: 37.8722, lng: 32.4925 },
  },
  {
    id: 18,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Mesaj Caddesi Cafe",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.4,
    reviews: 123,
    crowdLevel: "high" as const,
    category: "Sosyal Buluşma",
    distance: 0.3,
    // Mesaj Cd. - gerçek koordinat
    coordinates: { lat: 37.8722, lng: 32.4923 },
  },
  {
    id: 19,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Büyük Hizmet Cafe",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.6,
    reviews: 189,
    crowdLevel: "high" as const,
    category: "Sosyal Buluşma",
    distance: 0.4,
    // Büyük Hizmet Cd. - gerçek koordinat
    coordinates: { lat: 37.8726, lng: 32.4924 },
  },
  {
    id: 20,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Osmanlı Caddesi Cafe",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.5,
    reviews: 134,
    crowdLevel: "medium" as const,
    category: "Sosyal Buluşma",
    distance: 0.6,
    // Osmanlı Caddesi - gerçek koordinat
    coordinates: { lat: 37.8727, lng: 32.4921 },
  },
  {
    id: 21,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Baş Çarşı Cafe",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.8,
    reviews: 145,
    crowdLevel: "low" as const,
    category: "Sakin Ortam",
    distance: 0.5,
    // Baş Çarşı - gerçek koordinat
    coordinates: { lat: 37.8724, lng: 32.4926 },
  },
  {
    id: 22,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Bosna Hersek Tarihi Cafe",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.9,
    reviews: 278,
    crowdLevel: "medium" as const,
    category: "Kahve & Tatlı",
    distance: 0.3,
    // Bosna Hersek mahallesi - gerçek koordinat
    coordinates: { lat: 37.8721, lng: 32.4928 },
  },
  {
    id: 23,
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Bosna Hersek Bilim Cafe",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.7,
    reviews: 198,
    crowdLevel: "low" as const,
    category: "Ders Çalışma",
    distance: 0.4,
    // Bosna Hersek mahallesi - gerçek koordinat
    coordinates: { lat: 37.8725, lng: 32.4923 },
  },
  {
    id: 24,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Bosna Hersek Merkez Cafe",
    location: "Bosna Hersek, Selçuklu",
    rating: 4.2,
    reviews: 98,
    crowdLevel: "high" as const,
    category: "Sosyal Buluşma",
    distance: 0.3,
    // Bosna Hersek mahallesi merkez - gerçek koordinat
    coordinates: { lat: 37.8720, lng: 32.4920 },
  },
]

// Generate descriptions based on venue category and name
const getVenueDescription = (venue: typeof allVenues[0]): string => {
  const descriptions: Record<string, string> = {
    "Çekirdek Kafe": "Bosna Hersek mahallesinde yer alan bu samimi kafe, çekirdek yiyip sohbet edebileceğiniz sıcak bir ortam sunuyor. Öğrenciler için uygun fiyatlı menü seçenekleri ve rahat atmosferiyle dikkat çekiyor.",
    "Kitap & Kahve": "Bosna Hersek mahallesinin kalbinde yer alan bu özel mekan, sakin ortamı ve geniş kitap koleksiyonuyla öğrencilerin tercih ettiği bir yer. Sınırsız kahve ve sessiz çalışma ortamıyla ders çalışmak için ideal.",
    "KOMAGENE BOSNA": "Forum Kampüs AVM içinde yer alan bu restoran, çiğ köfte ve yöresel lezzetleriyle ünlü. Sosyal buluşmalar için geniş oturma alanı sunuyor.",
    "Şirin Etliekmek Bosna": "Kıvılcım Bulvar AVM içinde bulunan bu mekan, Konya'nın meşhur etliekmek ve yöresel yemeklerini sunuyor. Geleneksel lezzetler için ideal bir adres.",
    "Gloria Jeans Bosna Hersek": "Bosna Hersek mahallesinde öğrencilerin en çok tercih ettiği mekanlardan biri. Sessiz köşeler, hızlı WiFi ve uygun fiyatlı menü seçenekleriyle ders çalışmak için mükemmel.",
    "Konya Lezzet Döner 2": "Büyük Hizmet Caddesi üzerinde yer alan bu mekan, lezzetli döner çeşitleriyle ünlü. Hızlı servis ve uygun fiyatlarıyla öğrencilerin tercih ettiği bir yer.",
    "Pizza Pizza Bosna": "Baş Çarşı Soner Sokak'ta bulunan bu pizza mekanı, çeşitli pizza seçenekleri sunuyor. Sosyal buluşmalar için uygun bir mekan.",
    "Felicia Pizza": "Osmanlı Caddesi üzerinde yer alan bu pizza mekanı, farklı pizza çeşitleriyle dikkat çekiyor. Sakin bir ortam arayanlar için ideal.",
    "Bosna Hersek Cafe": "Bosna Hersek mahallesinde yer alan bu cafe, modern atmosferi ve kaliteli kahve seçenekleriyle öne çıkıyor. Ders çalışmak veya sosyalleşmek için uygun.",
    "Bosna Hersek Çay Bahçesi": "Bosna Hersek mahallesinde huzurlu bir çay bahçesi atmosferi arayanlar için ideal. Açık havada oturma imkanı sunuyor.",
    "Selçuk Üniversitesi Kütüphane Cafe": "Kampüs içinde yer alan bu cafe, öğrencilerin en çok tercih ettiği mekanlardan biri. Ders aralarında hızlı bir mola için ideal.",
    "Bosna Hersek Kahve Evi": "Bosna Hersek mahallesinde yer alan bu kahve evi, geleneksel Türk kahvesi ve modern kahve çeşitleriyle hizmet veriyor.",
    "Forum Kampüs AVM Cafe": "Forum Kampüs AVM içinde bulunan bu cafe, alışveriş sonrası dinlenmek için ideal. Geniş oturma alanı ve çeşitli içecek seçenekleri sunuyor.",
    "Bosna Hersek Sosyal Cafe": "Bosna Hersek mahallesinde sosyal buluşmalar için harika bir mekan. Geniş oturma alanı ve çeşitli atıştırmalık seçenekleriyle dikkat çekiyor.",
    "Bosna Hersek Park Cafe": "Bosna Hersek mahallesinde park içinde yer alan bu cafe, doğa ile iç içe huzurlu bir ortam sunuyor. Açık havada oturma imkanı var.",
    "Kıvılcım Bulvar Cafe": "Kıvılcım Bulvar AVM içinde bulunan bu cafe, alışveriş merkezi atmosferinde modern bir kahve deneyimi sunuyor.",
    "Bosna Hersek Öğrenci Kafe": "Bosna Hersek mahallesinde öğrenciler için özel tasarlanmış bu mekan, uygun fiyatları ve geniş çalışma alanlarıyla öne çıkıyor.",
    "Mesaj Caddesi Cafe": "Mesaj Caddesi üzerinde yer alan bu cafe, mahallenin en işlek caddelerinden birinde hizmet veriyor. Hızlı servis ve kaliteli kahve seçenekleri sunuyor.",
    "Büyük Hizmet Cafe": "Büyük Hizmet Caddesi üzerinde bulunan bu cafe, geniş oturma alanı ve çeşitli menü seçenekleriyle dikkat çekiyor.",
    "Osmanlı Caddesi Cafe": "Osmanlı Caddesi üzerinde yer alan bu cafe, tarihi atmosfer içinde modern hizmet anlayışını bir araya getiriyor.",
    "Baş Çarşı Cafe": "Baş Çarşı bölgesinde yer alan bu cafe, geleneksel çarşı atmosferinde sakin bir ortam sunuyor.",
    "Bosna Hersek Tarihi Cafe": "Bosna Hersek mahallesinde tarihi bir atmosfer arayanlar için ideal. Geleneksel dekorasyon ve modern hizmet anlayışıyla dikkat çekiyor.",
    "Bosna Hersek Bilim Cafe": "Bosna Hersek mahallesinde bilim ve teknoloji meraklıları için ideal bir çalışma ortamı sunuyor. Sessiz ve odaklanmaya uygun bir atmosfer.",
    "Bosna Hersek Merkez Cafe": "Bosna Hersek mahallesinin merkezinde yer alan bu cafe, mahallenin buluşma noktası. Sosyal aktiviteler için geniş alan sunuyor.",
  }
  return descriptions[venue.name] || `${venue.name}, ${venue.location} bölgesinde yer alan bu mekan, ${venue.category.toLowerCase()} kategorisinde hizmet veriyor. Öğrenciler için uygun bir ortam sunuyor.`
}

// Generate full address based on location
const getFullAddress = (venue: typeof allVenues[0]): string => {
  const addresses: Record<string, string> = {
    "Bosna Hersek, Selçuklu": "Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Kampüs, Selçuklu": "Selçuk Üniversitesi Kampüsü, Selçuklu, Konya",
  }
  // Specific addresses for Bosna Hersek venues
  const specificAddresses: Record<string, string> = {
    "Çekirdek Kafe": "Mesaj Caddesi No:36 D:P, Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Kitap & Kahve": "Bosna Hersek Mahallesi, Selçuklu, Konya",
    "KOMAGENE BOSNA": "Çetiner Sokak Forum Kampüs AVM 248Z, Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Şirin Etliekmek Bosna": "Osmanlı Caddesi Kıvılcım Bulvar AVM 1/U, Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Gloria Jeans Bosna Hersek": "Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Konya Lezzet Döner 2": "Büyük Hizmet Caddesi No:37 D:e, Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Pizza Pizza Bosna": "Baş Çarşı Soner Sokak No:1 D:M, Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Felicia Pizza": "Osmanlı Caddesi Oval Çarşı No:14/7, Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Bosna Hersek Cafe": "Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Bosna Hersek Çay Bahçesi": "Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Selçuk Üniversitesi Kütüphane Cafe": "Selçuk Üniversitesi Kampüsü, Selçuklu, Konya",
    "Bosna Hersek Kahve Evi": "Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Forum Kampüs AVM Cafe": "Forum Kampüs AVM, Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Bosna Hersek Sosyal Cafe": "Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Bosna Hersek Park Cafe": "Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Kıvılcım Bulvar Cafe": "Kıvılcım Bulvar AVM, Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Bosna Hersek Öğrenci Kafe": "Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Mesaj Caddesi Cafe": "Mesaj Caddesi, Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Büyük Hizmet Cafe": "Büyük Hizmet Caddesi, Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Osmanlı Caddesi Cafe": "Osmanlı Caddesi, Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Baş Çarşı Cafe": "Baş Çarşı, Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Bosna Hersek Tarihi Cafe": "Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Bosna Hersek Bilim Cafe": "Bosna Hersek Mahallesi, Selçuklu, Konya",
    "Bosna Hersek Merkez Cafe": "Bosna Hersek Mahallesi, Selçuklu, Konya",
  }
  return specificAddresses[venue.name] || addresses[venue.location] || `${venue.location}, Konya`
}

export function VenueDetailPage() {
  const params = useParams()
  const { state } = useApp()
  const venueId = params?.id ? Number(params.id) : 1
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState<"info" | "reviews" | "photos">("info")
  const [reviews, setReviews] = useState<Review[]>([])
  const [newComment, setNewComment] = useState("")
  const [newRating, setNewRating] = useState("5")
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null)
  const [editComment, setEditComment] = useState("")
  const [editRating, setEditRating] = useState("5")
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)

  // Load uploaded images from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`venue_${venueId}_images`)
      if (stored) {
        try {
          setUploadedImages(JSON.parse(stored))
        } catch {
          setUploadedImages([])
        }
      }
    }
  }, [venueId])

  // Find venue by ID
  const baseVenue = allVenues.find(v => v.id === venueId) || allVenues[0]

  // Generate venue data with additional details
  const venue = {
    id: baseVenue.id,
    name: baseVenue.name,
    category: baseVenue.category,
    location: baseVenue.location,
    fullAddress: getFullAddress(baseVenue),
    rating: baseVenue.rating,
    reviews: baseVenue.reviews,
    crowdLevel: baseVenue.crowdLevel,
    distance: baseVenue.distance,
    images: [
      baseVenue.image,
      "https://images.unsplash.com/photo-1739723745132-97df9db49db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FmZSUyMGludGVyaW9yfGVufDF8fHx8MTc2NDE1ODI0MHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MDkyODMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      ...uploadedImages,
    ],
    workingHours: {
      monday: "09:00 - 23:00",
      tuesday: "09:00 - 23:00",
      wednesday: "09:00 - 23:00",
      thursday: "09:00 - 23:00",
      friday: "09:00 - 00:00",
      saturday: "10:00 - 00:00",
      sunday: "10:00 - 22:00",
    },
    phone: "+90 332 123 45 67",
    website: `https://${baseVenue.name.toLowerCase().replace(/\s+/g, '')}.com`,
    menuLink: `https://${baseVenue.name.toLowerCase().replace(/\s+/g, '')}.com/menu`,
    priceRange: baseVenue.category === "Ders Çalışma" ? "Uygun" : baseVenue.category === "Sakin Ortam" ? "Orta" : "Orta-Yüksek",
    description: getVenueDescription(baseVenue),
    coordinates: baseVenue.coordinates,
  }

  const defaultReviews: Review[] = [
    {
      id: 1,
      user: { name: "Ahmet Yılmaz", initials: "AY", role: "Gezgin" },
      rating: 5,
      comment: "Harika bir mekan! Ders çalışmak için mükemmel. WiFi hızlı, ortam sakin ve kahve kalitesi çok iyi.",
      createdAt: "2 gün önce",
      helpful: 12,
    },
    {
      id: 2,
      user: { name: "Zeynep Kaya", initials: "ZK", role: "Seyyah" },
      rating: 4,
      comment: "Güzel bir yer ama hafta sonları biraz kalabalık oluyor. Kahve fiyatları makul.",
      createdAt: "5 gün önce",
      helpful: 8,
    },
    {
      id: 3,
      user: { name: "Mehmet Demir", initials: "MD", role: "Kaşif Meraklısı" },
      rating: 5,
      comment: "En sevdiğim çalışma mekanı. Personel çok yardımcı ve ortam gerçekten rahatlatıcı.",
      createdAt: "1 hafta önce",
      helpful: 15,
    },
  ]

  // Load reviews from localStorage
  useEffect(() => {
    const reviewsKey = `venue_reviews_${venueId}`
    const stored = localStorage.getItem(reviewsKey)
    if (stored) {
      try {
        setReviews(JSON.parse(stored))
      } catch {
        setReviews(defaultReviews)
      }
    } else {
      setReviews(defaultReviews)
    }
  }, [venueId])

  const crowdColors = {
    low: { bg: "bg-primary/10 dark:bg-primary/20", text: "text-primary", label: "Sakin" },
    medium: { bg: "bg-yellow-500/10 dark:bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500", label: "Orta" },
    high: { bg: "bg-red-500/10 dark:bg-red-500/20", text: "text-red-600 dark:text-red-500", label: "Kalabalık" },
  }

  const crowd = crowdColors[venue.crowdLevel]

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: venue.name,
          text: venue.description,
          url: window.location.href,
        })
      } catch (err) {
        console.error("Share failed:", err)
      }
    }
  }

  const openMap = () => {
    const url = `https://www.openstreetmap.org/?mlat=${venue.coordinates.lat}&mlon=${venue.coordinates.lng}&zoom=15`
    window.open(url, "_blank")
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
      {/* Back Button */}
      <Link href="/social">
        <Button
          variant="ghost"
          className="mb-4 sm:mb-6 font-[Manrope] text-foreground hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri Dön
        </Button>
      </Link>

      {/* Header Section */}
      <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border mb-4 sm:mb-6 overflow-hidden">
        <div className="relative h-64 sm:h-80 lg:h-96">
          <Image
            src={venue.images[0]}
            alt={venue.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Actions */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-card/90 backdrop-blur-sm hover:bg-white dark:hover:bg-card"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-foreground'}`} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleShare}
              className="bg-card/90 backdrop-blur-sm hover:bg-white dark:hover:bg-card"
            >
              <Share2 className="w-5 h-5 text-foreground" />
            </Button>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
            <Badge className="bg-primary text-white font-[Manrope] font-bold text-xs sm:text-sm px-3 py-1.5">
              {venue.category}
            </Badge>
          </div>

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
            <h1 className="font-[Manrope] text-white font-extrabold text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3">
              {venue.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-[Manrope] text-white font-bold text-lg sm:text-xl">
                  {venue.rating}
                </span>
                <span className="font-[Manrope] text-white/80 text-sm sm:text-base">
                  ({venue.reviews} değerlendirme)
                </span>
              </div>
              <div className={`px-3 py-1.5 ${crowd.bg} backdrop-blur-sm rounded-lg flex items-center gap-1.5`}>
                <Users className={`w-4 h-4 ${crowd.text}`} />
                <span className={`font-[Manrope] ${crowd.text} font-bold text-xs sm:text-sm`}>
                  {crowd.label}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-white/90">
                <MapPin className="w-4 h-4" />
                <span className="font-[Manrope] text-sm sm:text-base">
                  {venue.distance} km
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Tabs */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardContent className="p-4 sm:p-6">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
                <TabsList className="grid w-full grid-cols-3 font-[Manrope] mb-6 bg-muted dark:bg-muted/50 border border-border">
                  <TabsTrigger value="info" className="dark:data-[state=active]:bg-card dark:data-[state=active]:text-foreground dark:text-muted-foreground">Bilgiler</TabsTrigger>
                  <TabsTrigger value="reviews" className="dark:data-[state=active]:bg-card dark:data-[state=active]:text-foreground dark:text-muted-foreground">Değerlendirmeler ({venue.reviews})</TabsTrigger>
                  <TabsTrigger value="photos" className="dark:data-[state=active]:bg-card dark:data-[state=active]:text-foreground dark:text-muted-foreground">Fotoğraflar ({venue.images.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl mb-3">
                      Hakkında
                    </h3>
                    <p className="font-[Manrope] text-foreground/70 dark:text-muted-foreground leading-relaxed">
                      {venue.description}
                    </p>
                  </div>

                  <Separator />

                  {/* Working Hours */}
                  <div>
                    <h3 className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Çalışma Saatleri
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(venue.workingHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                          <span className="font-[Manrope] font-semibold text-sm text-foreground capitalize">
                            {day === "monday" ? "Pazartesi" :
                             day === "tuesday" ? "Salı" :
                             day === "wednesday" ? "Çarşamba" :
                             day === "thursday" ? "Perşembe" :
                             day === "friday" ? "Cuma" :
                             day === "saturday" ? "Cumartesi" : "Pazar"}
                          </span>
                          <span className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
                            {hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Contact Info */}
                  <div>
                    <h3 className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl mb-4">
                      İletişim Bilgileri
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="font-[Manrope] text-sm text-foreground/70 dark:text-muted-foreground">
                          {venue.fullAddress}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary" />
                        <a href={`tel:${venue.phone}`} className="font-[Manrope] text-sm text-primary hover:underline">
                          {venue.phone}
                        </a>
                      </div>
                      {venue.website && (
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-primary" />
                          <a href={venue.website} target="_blank" rel="noopener noreferrer" className="font-[Manrope] text-sm text-primary hover:underline">
                            Web Sitesi
                          </a>
                        </div>
                      )}
                      {venue.menuLink && (
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-primary" />
                          <a href={venue.menuLink} target="_blank" rel="noopener noreferrer" className="font-[Manrope] text-sm text-primary hover:underline">
                            Menüyü Görüntüle
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Price Range */}
                  <div>
                    <h3 className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl mb-3 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Fiyat Aralığı
                    </h3>
                    <Badge className="bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/30 font-[Manrope] font-bold text-sm px-4 py-2">
                      {venue.priceRange}
                    </Badge>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                  {/* Comment Form */}
                  {state.user ? (
                    <Card className="bg-card border border-border">
                      <CardContent className="p-4 sm:p-5">
                        <h3 className="font-[Manrope] font-bold text-lg mb-4">Yorum Yap</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <label className="font-[Manrope] font-semibold text-sm">Puan:</label>
                            <Select value={newRating} onValueChange={setNewRating}>
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[5, 4, 3, 2, 1].map((rating) => (
                                  <SelectItem key={rating} value={String(rating)}>
                                    {rating} ⭐
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Yorumunuzu yazın..."
                            className="font-[Manrope] min-h-[100px]"
                          />
                          <Button
                            onClick={handleCommentSubmit}
                            className="font-[Manrope] font-bold"
                          >
                            Yorum Yap
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="bg-accent border border-border">
                      <CardContent className="p-4 text-center">
                        <p className="font-[Manrope] text-foreground/60 text-sm">
                          Yorum yapmak için giriş yapmalısınız
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Reviews List */}
                  {reviews.map((review) => (
                    <Card key={review.id} className="bg-accent border border-border">
                      <CardContent className="p-4 sm:p-5">
                        <div className="flex items-start gap-4 mb-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-primary text-white font-[Manrope] font-bold">
                              {review.user.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div>
                                <p className="font-[Manrope] font-bold text-sm text-foreground">
                                  {review.user.name}
                                </p>
                                <p className="font-[Manrope] text-xs text-foreground/60 dark:text-muted-foreground">
                                  {review.user.role} • {review.createdAt}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                  <span className="font-[Manrope] font-bold text-sm text-foreground">
                                    {review.rating}
                                  </span>
                                </div>
                                {state.user && review.userId === state.user.id && (
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEditStart(review)}
                                      className="h-7 px-2 text-xs font-[Manrope]"
                                    >
                                      <Edit2 className="w-3 h-3 mr-1" />
                                      Düzenle
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDelete(review.id)}
                                      className="h-7 px-2 text-xs font-[Manrope] text-destructive hover:text-destructive"
                                    >
                                      <Trash2 className="w-3 h-3 mr-1" />
                                      Sil
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                            {editingReviewId === review.id ? (
                              <div className="space-y-3 mt-2">
                                <div className="flex items-center gap-3">
                                  <label className="font-[Manrope] font-semibold text-sm">Puan:</label>
                                  <Select value={editRating} onValueChange={setEditRating}>
                                    <SelectTrigger className="w-24">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {[5, 4, 3, 2, 1].map((rating) => (
                                        <SelectItem key={rating} value={String(rating)}>
                                          {rating} ⭐
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Textarea
                                  value={editComment}
                                  onChange={(e) => setEditComment(e.target.value)}
                                  className="font-[Manrope] min-h-[100px]"
                                />
                                <div className="flex items-center gap-2">
                                  <Button
                                    onClick={handleEditSave}
                                    size="sm"
                                    className="font-[Manrope] font-bold"
                                  >
                                    Kaydet
                                  </Button>
                                  <Button
                                    onClick={handleEditCancel}
                                    variant="outline"
                                    size="sm"
                                    className="font-[Manrope]"
                                  >
                                    İptal
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <p className="font-[Manrope] text-sm text-foreground/70 dark:text-muted-foreground leading-relaxed mt-2">
                                  {review.comment}
                                </p>
                                <div className="flex items-center gap-2 mt-3">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleHelpful(review.id)}
                                    className="h-7 text-xs font-[Manrope]"
                                  >
                                    <ThumbsUp className="w-3 h-3 mr-1" />
                                    Yararlı ({review.helpful})
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="photos" className="space-y-4">
                  {/* Upload Photo Section */}
                  {state.user && (
                    <Card className="bg-card border border-border">
                      <CardContent className="p-4">
                        <Label htmlFor="photo-upload" className="cursor-pointer">
                          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="font-[Manrope] font-semibold text-sm text-foreground mb-1">
                              Fotoğraf Yükle
                            </p>
                            <p className="font-[Manrope] text-xs text-muted-foreground">
                              JPG, PNG (Max 10MB)
                            </p>
                          </div>
                        </Label>
                        <Input
                          id="photo-upload"
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (!file) return

                            if (file.size > 10 * 1024 * 1024) {
                              toast.error("Dosya boyutu 10MB'dan küçük olmalıdır")
                              return
                            }

                            setIsUploading(true)
                            try {
                              // Simüle edilmiş upload - gerçek uygulamada API çağrısı yapılacak
                              await new Promise((resolve) => setTimeout(resolve, 1000))
                              
                              // Create object URL for preview
                              const imageUrl = URL.createObjectURL(file)
                              const newImages = [...uploadedImages, imageUrl]
                              setUploadedImages(newImages)
                              
                              // Save to localStorage
                              localStorage.setItem(`venue_${venueId}_images`, JSON.stringify(newImages))
                              
                              toast.success("Fotoğraf başarıyla yüklendi!")
                            } catch (error) {
                              toast.error("Fotoğraf yüklenirken bir hata oluştu")
                            } finally {
                              setIsUploading(false)
                            }
                          }}
                          className="hidden"
                          disabled={isUploading}
                        />
                      </CardContent>
                    </Card>
                  )}

                  {/* Photo Gallery */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {venue.images.map((image, index) => {
                      const isUploaded = index >= 3 // First 3 are default images
                      return (
                        <div key={index} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                          <Image
                            src={image}
                            alt={`${venue.name} - Fotoğraf ${index + 1}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          {isUploaded && state.user && (
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation()
                                const newImages = uploadedImages.filter((_, i) => i !== index - 3)
                                setUploadedImages(newImages)
                                localStorage.setItem(`venue_${venueId}_images`, JSON.stringify(newImages))
                                toast.success("Fotoğraf silindi")
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Map Card */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-lg">
                Konum
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="relative h-48 bg-accent rounded-xl overflow-hidden">
                <LeafletMap
                  lat={venue.coordinates.lat}
                  lng={venue.coordinates.lng}
                  zoom={15}
                  height="100%"
                  showPopup={true}
                  popupContent={
                    <div className="font-[Manrope]">
                      <h3 className="font-bold text-sm mb-1">{venue.name}</h3>
                      <p className="text-xs text-foreground/60">{venue.fullAddress}</p>
                    </div>
                  }
                />
              </div>
              <Button
                onClick={openMap}
                className="w-full bg-primary hover:bg-primary/90 font-[Manrope] font-bold"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Yol Tarifi Al
              </Button>
              <p className="font-[Manrope] text-xs text-foreground/60 dark:text-muted-foreground">
                {venue.fullAddress}
              </p>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-lg">
                Hızlı Bilgiler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
                  Kategori
                </span>
                <span className="font-[Manrope] font-semibold text-sm text-foreground">
                  {venue.category}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
                  Mesafe
                </span>
                <span className="font-[Manrope] font-semibold text-sm text-foreground">
                  {venue.distance} km
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
                  Puan
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-[Manrope] font-semibold text-sm text-foreground">
                    {venue.rating}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
                  Kalabalık
                </span>
                <Badge className={`${crowd.bg} ${crowd.text} border-0 font-[Manrope] font-bold text-xs`}>
                  {crowd.label}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

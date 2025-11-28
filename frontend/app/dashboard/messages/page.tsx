"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, MoreVertical, Circle, ArrowLeft } from "lucide-react"

interface Message {
  id: number
  content: string
  senderId: number
  timestamp: string
  isRead: boolean
}

interface Conversation {
  id: number
  user: {
    id: number
    name: string
    initials: string
    role: string
    isOnline: boolean
  }
  lastMessage: string
  timestamp: string
  unreadCount: number
  messages: Message[]
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messageInput, setMessageInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const currentUserId = 1

  // Mock data
  const conversations: Conversation[] = [
    {
      id: 1,
      user: {
        id: 2,
        name: "Ahmet Yılmaz",
        initials: "AY",
        role: "Gezgin",
        isOnline: true,
      },
      lastMessage: "Notlar için teşekkürler!",
      timestamp: "10 dk önce",
      unreadCount: 2,
      messages: [
        { id: 1, content: "Merhaba, Selçuk Hukuk notlarını paylaşabilir misin?", senderId: 2, timestamp: "Dün 14:30", isRead: true },
        { id: 2, content: "Tabii, şimdi gönderiyorum", senderId: 1, timestamp: "Dün 14:35", isRead: true },
        { id: 3, content: "Harika, çok yardımcı olacak", senderId: 2, timestamp: "Dün 14:36", isRead: true },
        { id: 4, content: "Notlar için teşekkürler!", senderId: 2, timestamp: "10 dk önce", isRead: false },
      ],
    },
    {
      id: 2,
      user: {
        id: 3,
        name: "Zeynep Kaya",
        initials: "ZK",
        role: "Kaşif Meraklısı",
        isOnline: true,
      },
      lastMessage: "Ev arkadaşı konusunda ilerleme var mı?",
      timestamp: "1 saat önce",
      unreadCount: 0,
      messages: [
        { id: 1, content: "Merhaba, Bosna Hersek'te ev arıyormuşsun?", senderId: 3, timestamp: "2 gün önce", isRead: true },
        { id: 2, content: "Evet, 2+1 bir daire arıyorum", senderId: 1, timestamp: "2 gün önce", isRead: true },
        { id: 3, content: "Ben de arıyorum, beraber bakalım mı?", senderId: 3, timestamp: "2 gün önce", isRead: true },
        { id: 4, content: "Olur, iyi fikir!", senderId: 1, timestamp: "1 gün önce", isRead: true },
        { id: 5, content: "Ev arkadaşı konusunda ilerleme var mı?", senderId: 3, timestamp: "1 saat önce", isRead: true },
      ],
    },
    {
      id: 3,
      user: {
        id: 4,
        name: "Mehmet Demir",
        initials: "MD",
        role: "Seyyah",
        isOnline: false,
      },
      lastMessage: "Tamam, yarın görüşürüz",
      timestamp: "3 saat önce",
      unreadCount: 0,
      messages: [
        { id: 1, content: "Kütüphanede mi çalışıyorsun?", senderId: 4, timestamp: "3 saat önce", isRead: true },
        { id: 2, content: "Evet, 3. katta", senderId: 1, timestamp: "3 saat önce", isRead: true },
        { id: 3, content: "Tamam, yarın görüşürüz", senderId: 4, timestamp: "3 saat önce", isRead: true },
      ],
    },
  ]

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return
    // Mock: Gerçek uygulamada API'ye gönderilecek
    console.log("Mesaj gönderildi:", messageInput)
    setMessageInput("")
  }

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="font-[Manrope] text-foreground font-bold text-2xl sm:text-3xl">
            Mesajlar
          </h1>
          {totalUnread > 0 && (
            <Badge className="bg-primary text-white font-[Manrope] font-bold">
              {totalUnread} yeni
            </Badge>
          )}
        </div>
        <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground mt-1">
          Diğer kullanıcılarla mesajlaşın
        </p>
      </div>

      <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
          {/* Conversation List */}
          <div className={`border-r border-gray-200 dark:border-border ${selectedConversation ? 'hidden md:block' : ''}`}>
            <div className="p-4 border-b border-gray-200 dark:border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50 dark:text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Kullanıcı ara..."
                  className="pl-10 font-[Manrope]"
                />
              </div>
            </div>
            <ScrollArea className="h-[536px]">
              {filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`p-4 cursor-pointer hover:bg-[#f2f4f3] dark:hover:bg-accent transition-colors border-b border-gray-100 dark:border-border ${
                    selectedConversation?.id === conv.id ? 'bg-[#f2f4f3] dark:bg-accent' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary text-white font-[Manrope] font-bold">
                          {conv.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      {conv.user.isOnline && (
                        <Circle className="absolute bottom-0 right-0 w-3 h-3 fill-green-500 text-green-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-[Manrope] font-bold text-sm text-foreground truncate">
                          {conv.user.name}
                        </p>
                        <span className="font-[Manrope] text-[10px] text-foreground/50 dark:text-muted-foreground whitespace-nowrap">
                          {conv.timestamp}
                        </span>
                      </div>
                      <p className="font-[Manrope] text-xs text-foreground/60 dark:text-muted-foreground truncate">
                        {conv.lastMessage}
                      </p>
                    </div>
                    {conv.unreadCount > 0 && (
                      <Badge className="bg-primary text-white font-[Manrope] text-xs h-5 min-w-[20px] flex items-center justify-center">
                        {conv.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className={`col-span-2 flex flex-col ${!selectedConversation ? 'hidden md:flex' : ''}`}>
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 dark:border-border flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setSelectedConversation(null)}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary text-white font-[Manrope] font-bold">
                        {selectedConversation.user.initials}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversation.user.isOnline && (
                      <Circle className="absolute bottom-0 right-0 w-2.5 h-2.5 fill-green-500 text-green-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-[Manrope] font-bold text-sm text-foreground">
                      {selectedConversation.user.name}
                    </p>
                    <p className="font-[Manrope] text-xs text-foreground/60 dark:text-muted-foreground">
                      {selectedConversation.user.isOnline ? 'Çevrimiçi' : 'Çevrimdışı'} • {selectedConversation.user.role}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {selectedConversation.messages.map((message) => {
                      const isOwn = message.senderId === currentUserId
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] ${isOwn ? 'order-2' : ''}`}>
                            <div
                              className={`px-4 py-2 rounded-2xl ${
                                isOwn
                                  ? 'bg-primary text-white rounded-br-sm'
                                  : 'bg-[#f2f4f3] dark:bg-accent text-foreground rounded-bl-sm'
                              }`}
                            >
                              <p className="font-[Manrope] text-sm">{message.content}</p>
                            </div>
                            <p className={`font-[Manrope] text-[10px] text-foreground/50 dark:text-muted-foreground mt-1 ${isOwn ? 'text-right' : ''}`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 dark:border-border">
                  <div className="flex items-center gap-2">
                    <Input
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Mesajınızı yazın..."
                      className="font-[Manrope]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className="bg-primary hover:bg-primary/90 font-[Manrope]"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#f2f4f3] dark:bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-foreground/30 dark:text-muted-foreground" />
                  </div>
                  <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground">
                    Mesajlaşmaya başlamak için bir sohbet seçin
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}


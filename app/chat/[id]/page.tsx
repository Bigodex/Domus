"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChatBubble } from "@/components/chat-bubble"
import { mockConversations, mockMessages } from "@/lib/mock-chat-data"
import { mockUser } from "@/lib/mock-user-data"
import { ArrowLeft, Send, Phone, MoreVertical, Home } from "lucide-react"
import Link from "next/link"

interface ChatPageProps {
  params: {
    id: string
  }
}

export default function ChatPage({ params }: ChatPageProps) {
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages[params.id] || [])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const conversation = mockConversations.find((c) => c.id === params.id)
  const otherParticipant = conversation?.participants.find((p) => p.id !== mockUser.id)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: `msg-${Date.now()}`,
      conversationId: params.id,
      senderId: mockUser.id,
      sender: mockUser,
      content: newMessage.trim(),
      type: "text" as const,
      createdAt: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // TODO: Send message to backend
    console.log("Sending message:", message)
  }

  if (!conversation || !otherParticipant) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Conversa não encontrada</h1>
            <Button asChild>
              <Link href="/chat">Voltar para conversas</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="h-[600px] flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/chat">
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Avatar className="h-10 w-10">
                    <AvatarImage src={otherParticipant.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {otherParticipant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h2 className="font-semibold">{otherParticipant.name}</h2>
                    {conversation.property && (
                      <div className="flex items-center gap-2">
                        <Home className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground truncate">{conversation.property.title}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Property Info */}
              {conversation.property && (
                <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img
                      src={conversation.property.images[0] || "/placeholder.svg"}
                      alt={conversation.property.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{conversation.property.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {conversation.property.neighborhood} • R$ {conversation.property.price.toLocaleString("pt-BR")}
                        /mês
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/imovel/${conversation.property.id}`}>Ver Imóvel</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length > 0 ? (
                <>
                  {messages.map((message, index) => {
                    const isOwn = message.senderId === mockUser.id
                    const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId

                    return <ChatBubble key={message.id} message={message} isOwn={isOwn} showAvatar={showAvatar} />
                  })}
                  <div ref={messagesEndRef} />
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground">Nenhuma mensagem ainda</p>
                    <p className="text-sm text-muted-foreground">Envie a primeira mensagem!</p>
                  </div>
                </div>
              )}
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConversationItem } from "@/components/conversation-item"
import { mockConversations } from "@/lib/mock-chat-data"
import { mockUser } from "@/lib/mock-user-data"
import { MessageCircle, Search, Plus } from "lucide-react"

export default function ChatPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredConversations = mockConversations.filter((conversation) => {
    const otherParticipant = conversation.participants.find((p) => p.id !== mockUser.id)
    return (
      otherParticipant?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.property?.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold mb-2">Conversas</h1>
            <p className="text-muted-foreground">Gerencie suas conversas sobre imóveis</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Conversas
                    </span>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Search */}
                  <div className="p-4 border-b">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar conversas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Conversations */}
                  <div className="max-h-96 overflow-y-auto">
                    {filteredConversations.length > 0 ? (
                      filteredConversations.map((conversation) => (
                        <ConversationItem
                          key={conversation.id}
                          conversation={conversation}
                          currentUserId={mockUser.id}
                        />
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">Nenhuma conversa encontrada</h3>
                        <p className="text-sm text-muted-foreground">
                          {searchTerm ? "Tente buscar por outro termo" : "Suas conversas aparecerão aqui"}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Placeholder */}
            <div className="lg:col-span-2">
              <Card className="h-96">
                <CardContent className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Selecione uma conversa</h3>
                    <p className="text-muted-foreground">
                      Escolha uma conversa da lista para começar a trocar mensagens
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

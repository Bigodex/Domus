"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ProposalStatusBadge } from "@/components/proposal-status-badge"
import { mockProposals } from "@/lib/mock-user-data"
import { FileText, Search, Calendar, MessageCircle, Eye, CheckCircle, XCircle } from "lucide-react"

export default function ProposalsPage() {
  const [activeTab, setActiveTab] = useState("received")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - in real app, this would come from API based on user role
  const receivedProposals = mockProposals.filter((p) => p.landlordId === "current-user-id")
  const sentProposals = mockProposals

  const filteredReceivedProposals = receivedProposals.filter(
    (proposal) =>
      proposal.property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.tenant.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredSentProposals = sentProposals.filter(
    (proposal) =>
      proposal.property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.landlord.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleProposalAction = (proposalId: string, action: "approve" | "reject") => {
    // TODO: Implement proposal action
    console.log("Proposal action:", { proposalId, action })
  }

  const handleSendMessage = (proposalId: string, message: string) => {
    // TODO: Implement message sending
    console.log("Send message:", { proposalId, message })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold mb-2">Gerenciar Propostas</h1>
          <p className="text-muted-foreground">Acompanhe e gerencie todas as suas propostas de aluguel</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por imóvel ou pessoa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="received" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Recebidas ({filteredReceivedProposals.length})
            </TabsTrigger>
            <TabsTrigger value="sent" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Enviadas ({filteredSentProposals.length})
            </TabsTrigger>
          </TabsList>

          {/* Received Proposals */}
          <TabsContent value="received" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Propostas Recebidas</CardTitle>
                <CardDescription>Propostas de interessados nos seus imóveis</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredReceivedProposals.length > 0 ? (
                  <div className="space-y-4">
                    {filteredReceivedProposals.map((proposal) => (
                      <Card key={proposal.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <img
                              src={proposal.property.images[0] || "/placeholder.svg"}
                              alt={proposal.property.title}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold">{proposal.property.title}</h3>
                                  <p className="text-sm text-muted-foreground">Proposta de: {proposal.tenant.name}</p>
                                </div>
                                <ProposalStatusBadge status={proposal.status} />
                              </div>

                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{proposal.message}</p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(proposal.createdAt).toLocaleDateString("pt-BR")}
                                  </span>
                                  <span>Tel: {proposal.tenant.phone || "Não informado"}</span>
                                </div>

                                <div className="flex gap-2">
                                  {proposal.status === "pending" && (
                                    <>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleProposalAction(proposal.id, "reject")}
                                        className="text-red-600 border-red-200 hover:bg-red-50"
                                      >
                                        <XCircle className="h-3 w-3 mr-1" />
                                        Rejeitar
                                      </Button>
                                      <Button
                                        size="sm"
                                        onClick={() => handleProposalAction(proposal.id, "approve")}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Aprovar
                                      </Button>
                                    </>
                                  )}
                                  <Button variant="outline" size="sm">
                                    <MessageCircle className="h-3 w-3 mr-1" />
                                    Conversar
                                  </Button>
                                  <Button variant="outline" size="sm" asChild>
                                    <a href={`/imovel/${proposal.propertyId}`}>
                                      <Eye className="h-3 w-3 mr-1" />
                                      Ver Imóvel
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Nenhuma proposta recebida</h3>
                    <p className="text-muted-foreground mb-4">
                      Quando alguém se interessar pelos seus imóveis, as propostas aparecerão aqui
                    </p>
                    <Button asChild>
                      <a href="/anunciar">Anunciar Imóvel</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sent Proposals */}
          <TabsContent value="sent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Propostas Enviadas</CardTitle>
                <CardDescription>Acompanhe o status das suas propostas</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredSentProposals.length > 0 ? (
                  <div className="space-y-4">
                    {filteredSentProposals.map((proposal) => (
                      <Card key={proposal.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <img
                              src={proposal.property.images[0] || "/placeholder.svg"}
                              alt={proposal.property.title}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold">{proposal.property.title}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {proposal.property.neighborhood} • R${" "}
                                    {proposal.property.price.toLocaleString("pt-BR")}/mês
                                  </p>
                                </div>
                                <ProposalStatusBadge status={proposal.status} />
                              </div>

                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{proposal.message}</p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(proposal.createdAt).toLocaleDateString("pt-BR")}
                                  </span>
                                  <span>Para: {proposal.landlord.name}</span>
                                </div>

                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <MessageCircle className="h-3 w-3 mr-1" />
                                    Conversar
                                  </Button>
                                  <Button variant="outline" size="sm" asChild>
                                    <a href={`/imovel/${proposal.propertyId}`}>
                                      <Eye className="h-3 w-3 mr-1" />
                                      Ver Imóvel
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Nenhuma proposta enviada</h3>
                    <p className="text-muted-foreground mb-4">
                      Quando você enviar propostas para imóveis, elas aparecerão aqui
                    </p>
                    <Button asChild>
                      <a href="/imoveis">Buscar Imóveis</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

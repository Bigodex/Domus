"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PropertyCard } from "@/components/property-card"
import { ProposalStatusBadge } from "@/components/proposal-status-badge"
import { mockUser, mockFavorites, mockProposals } from "@/lib/mock-user-data"
import { Heart, FileText, User, Home, MessageCircle, Calendar, Eye } from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("favorites")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={mockUser.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {mockUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-heading text-2xl font-bold">Olá, {mockUser.name}!</h1>
                  <p className="text-muted-foreground">{mockUser.email}</p>
                  <Badge variant="outline" className="mt-1">
                    {mockUser.role === "tenant"
                      ? "Locatário"
                      : mockUser.role === "landlord"
                        ? "Proprietário"
                        : "Locatário e Proprietário"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favoritos
            </TabsTrigger>
            <TabsTrigger value="proposals" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Propostas
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Meus Imóveis
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Perfil
            </TabsTrigger>
          </TabsList>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Imóveis Favoritos
                </CardTitle>
                <CardDescription>Imóveis que você salvou para visualizar depois</CardDescription>
              </CardHeader>
              <CardContent>
                {mockFavorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockFavorites.map((favorite) => (
                      <PropertyCard key={favorite.id} property={favorite.property} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Nenhum favorito ainda</h3>
                    <p className="text-muted-foreground mb-4">
                      Comece a favoritar imóveis que você gosta para vê-los aqui
                    </p>
                    <Button asChild>
                      <a href="/imoveis">Explorar Imóveis</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Proposals Tab */}
          <TabsContent value="proposals" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Minhas Propostas
                    </CardTitle>
                    <CardDescription>Acompanhe o status das suas propostas de aluguel</CardDescription>
                  </div>
                  <Button variant="outline" asChild>
                    <a href="/propostas">Ver Todas</a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {mockProposals.length > 0 ? (
                  <div className="space-y-4">
                    {mockProposals.slice(0, 3).map((proposal) => (
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
                    {mockProposals.length > 3 && (
                      <div className="text-center pt-4">
                        <Button variant="outline" asChild>
                          <a href="/propostas">Ver todas as {mockProposals.length} propostas</a>
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
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

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Meus Imóveis
                </CardTitle>
                <CardDescription>Gerencie os imóveis que você está alugando</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Nenhum imóvel cadastrado</h3>
                  <p className="text-muted-foreground mb-4">Você ainda não cadastrou nenhum imóvel para aluguel</p>
                  <Button asChild>
                    <a href="/anunciar">Anunciar Imóvel</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Meu Perfil
                </CardTitle>
                <CardDescription>Gerencie suas informações pessoais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={mockUser.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {mockUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      Alterar Foto
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Nome</label>
                    <p className="text-muted-foreground">{mockUser.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">E-mail</label>
                    <p className="text-muted-foreground">{mockUser.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Telefone</label>
                    <p className="text-muted-foreground">{mockUser.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Membro desde</label>
                    <p className="text-muted-foreground">{new Date(mockUser.createdAt).toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button>Editar Perfil</Button>
                  <Button variant="outline">Alterar Senha</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

"use client"

import { useState } from "react"
import type { Property } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProposalDialog } from "@/components/proposal-dialog"
import { MessageCircle, Phone, Mail, Heart, Share2 } from "lucide-react"

interface PropertyContactProps {
  property: Property
}

export function PropertyContact({ property }: PropertyContactProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    // TODO: Implement actual favorite functionality
    console.log("Favorite toggled:", { propertyId: property.id, isFavorited: !isFavorited })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Confira este imóvel: ${property.title}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleCall = () => {
    // TODO: Implement call functionality
    console.log("Calling landlord:", property.landlord.name)
  }

  const handleEmail = () => {
    // TODO: Implement email functionality
    console.log("Emailing landlord:", property.landlord.name)
  }

  return (
    <div className="space-y-6">
      {/* Price and Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-heading text-3xl font-bold text-primary">
                R$ {property.price.toLocaleString("pt-BR")}
              </p>
              <p className="text-muted-foreground">por mês</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleFavorite}
                className={isFavorited ? "text-red-500 border-red-500" : ""}
              >
                <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ProposalDialog property={property}>
            <Button className="w-full" size="lg">
              <MessageCircle className="h-4 w-4 mr-2" />
              Enviar Proposta
            </Button>
          </ProposalDialog>
        </CardContent>
      </Card>

      {/* Landlord Info */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg">Proprietário</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={property.landlord.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {property.landlord.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{property.landlord.name}</p>
              <p className="text-sm text-muted-foreground">Proprietário</p>
            </div>
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleCall}>
              <Phone className="h-4 w-4 mr-2" />
              Ligar
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleEmail}>
              <Mail className="h-4 w-4 mr-2" />
              Enviar E-mail
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg">Contato Rápido</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Precisa de mais informações? Entre em contato diretamente com o proprietário.
          </p>
          <div className="space-y-2">
            <ProposalDialog property={property}>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <MessageCircle className="h-4 w-4 mr-2" />
                Enviar Mensagem
              </Button>
            </ProposalDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

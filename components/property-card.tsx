"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Property } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MapPin, Bed, Bath, Square, Car, PawPrint } from "lucide-react"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorited(!isFavorited)
  }

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))
  }

  return (
    <Card className="group overflow-hidden rounded-xl hover:shadow-xl transition-shadow duration-300 border border-border">
      <Link href={`/imovel/${property.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.images[currentImageIndex] || "/placeholder.svg"}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Overlay gradiente para destacar ícones */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          {/* Navegação de imagens */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Imagem anterior"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Próxima imagem"
              >
                →
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                {property.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full ring-1 ring-white/40 ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Favoritar */}
          <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center shadow transition-colors"
            aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Heart className={`h-5 w-5 ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </button>

          {/* Tipo de imóvel */}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-white/90 text-gray-900 px-3 py-1 rounded-md shadow-sm">
              {property.type === "apartment" && "Apartamento"}
              {property.type === "house" && "Casa"}
              {property.type === "studio" && "Studio"}
            </Badge>
          </div>
        </div>

        <CardContent className="p-5">
          {/* Título e preço */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-heading text-lg font-semibold text-foreground line-clamp-1">
              {property.title}
            </h3>
            <div className="text-right">
              <p className="font-heading text-2xl font-bold text-primary">
                R$ {property.price.toLocaleString("pt-BR")}
              </p>
              <p className="text-xs text-muted-foreground">/mês</p>
            </div>
          </div>

          {/* Localização */}
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-1 text-primary" />
            <span className="text-sm">{property.neighborhood}</span>
          </div>

          {/* Infos principais */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1 text-primary" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1 text-primary" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1 text-primary" />
              <span>{property.area}m²</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {property.parking && (
              <Badge variant="outline" className="text-xs flex items-center gap-1 px-2 py-1">
                <Car className="h-3 w-3" /> Garagem
              </Badge>
            )}
            {property.petFriendly && (
              <Badge variant="outline" className="text-xs flex items-center gap-1 px-2 py-1">
                <PawPrint className="h-3 w-3" /> Pet Friendly
              </Badge>
            )}
            {property.furnished && (
              <Badge variant="outline" className="text-xs px-2 py-1">Mobiliado</Badge>
            )}
          </div>

          {/* Descrição */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-5">{property.description}</p>

          {/* Botão */}
          <Button className="w-full md:w-auto" size="sm" variant="secondary">
            Ver Detalhes
          </Button>
        </CardContent>
      </Link>
    </Card>
  )
}

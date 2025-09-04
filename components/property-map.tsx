"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation } from "lucide-react"

interface PropertyMapProps {
  address: string
  neighborhood: string
}

export function PropertyMap({ address, neighborhood }: PropertyMapProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-xl flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Localização
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="font-semibold">{address}</p>
            <p className="text-muted-foreground">{neighborhood}, Pato Branco - PR</p>
          </div>

          {/* Placeholder Map */}
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Navigation className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Mapa será carregado aqui</p>
              <p className="text-sm text-muted-foreground">Integração com Google Maps</p>
            </div>
          </div>

          {/* Nearby Places */}
          <div className="space-y-2">
            <h4 className="font-semibold">Pontos de Interesse Próximos</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span>Centro da cidade</span>
                <span className="text-muted-foreground">2 km</span>
              </div>
              <div className="flex justify-between">
                <span>Supermercado</span>
                <span className="text-muted-foreground">500 m</span>
              </div>
              <div className="flex justify-between">
                <span>Escola</span>
                <span className="text-muted-foreground">800 m</span>
              </div>
              <div className="flex justify-between">
                <span>Hospital</span>
                <span className="text-muted-foreground">1.5 km</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

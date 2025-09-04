import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi, Car, Sofa, Shield, Waves, Dumbbell, TreePine, Utensils, Snowflake, Zap, Home } from "lucide-react"

interface PropertyAmenitiesProps {
  amenities: string[]
  petFriendly: boolean
  furnished: boolean
  parking: boolean
}

const amenityIcons: Record<string, React.ReactNode> = {
  "Wi-Fi": <Wifi className="h-4 w-4" />,
  Internet: <Wifi className="h-4 w-4" />,
  Garagem: <Car className="h-4 w-4" />,
  Mobiliado: <Sofa className="h-4 w-4" />,
  "Portaria 24h": <Shield className="h-4 w-4" />,
  Portaria: <Shield className="h-4 w-4" />,
  Piscina: <Waves className="h-4 w-4" />,
  Academia: <Dumbbell className="h-4 w-4" />,
  Quintal: <TreePine className="h-4 w-4" />,
  Jardim: <TreePine className="h-4 w-4" />,
  Churrasqueira: <Utensils className="h-4 w-4" />,
  "Área Gourmet": <Utensils className="h-4 w-4" />,
  "Ar condicionado": <Snowflake className="h-4 w-4" />,
  Elevador: <Zap className="h-4 w-4" />,
  Varanda: <Home className="h-4 w-4" />,
  Suíte: <Home className="h-4 w-4" />,
  Lavanderia: <Home className="h-4 w-4" />,
  Playground: <TreePine className="h-4 w-4" />,
}

export function PropertyAmenities({ amenities, petFriendly, furnished, parking }: PropertyAmenitiesProps) {
  const allAmenities = [
    ...amenities,
    ...(petFriendly ? ["Pet Friendly"] : []),
    ...(furnished ? ["Mobiliado"] : []),
    ...(parking ? ["Garagem"] : []),
  ]

  if (allAmenities.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-xl">Comodidades</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {allAmenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="text-primary">{amenityIcons[amenity] || <Home className="h-4 w-4" />}</div>
              <span className="text-sm font-medium">{amenity}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { PropertyGallery } from "@/components/property-gallery"
import { PropertyAmenities } from "@/components/property-amenities"
import { PropertyContact } from "@/components/property-contact"
import { PropertyMap } from "@/components/property-map"
import { mockProperties } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Bed, Bath, Square, MapPin, Calendar } from "lucide-react"

interface PropertyPageProps {
  params: {
    id: string
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const property = mockProperties.find((p) => p.id === params.id)

  if (!property) {
    notFound()
  }

  const propertyTypeLabel = {
    apartment: "Apartamento",
    house: "Casa",
    studio: "Studio",
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Início</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/imoveis">Imóveis</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{property.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Gallery */}
            <PropertyGallery images={property.images} title={property.title} />

            {/* Property Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="font-heading text-3xl font-bold mb-2">{property.title}</h1>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>
                        {property.address}, {property.neighborhood}
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {propertyTypeLabel[property.type]}
                  </Badge>
                </div>

                {/* Property Stats */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>
                      {property.bedrooms} {property.bedrooms === 1 ? "quarto" : "quartos"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>
                      {property.bathrooms} {property.bathrooms === 1 ? "banheiro" : "banheiros"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span>{property.area}m²</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Disponível</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-xl">Descrição</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                </CardContent>
              </Card>

              {/* Amenities */}
              <PropertyAmenities
                amenities={property.amenities}
                petFriendly={property.petFriendly}
                furnished={property.furnished}
                parking={property.parking}
              />

              {/* Map */}
              <PropertyMap address={property.address} neighborhood={property.neighborhood} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <PropertyContact property={property} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  return mockProperties.map((property) => ({
    id: property.id,
  }))
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const property = mockProperties.find((p) => p.id === params.id)

  if (!property) {
    return {
      title: "Imóvel não encontrado",
    }
  }

  return {
    title: `${property.title} - CasaBranco`,
    description: property.description,
  }
}

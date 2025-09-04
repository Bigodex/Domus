import { Header } from "@/components/header"
import { SearchHero } from "@/components/search-hero"
import { PropertyCard } from "@/components/property-card"
import { mockProperties } from "@/lib/mock-data"
import { Search, Home, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  const featuredProperties = mockProperties.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SearchHero />

        {/* Seção de Imóveis em Destaque */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="font-heading text-3xl font-bold text-center mb-8">Imóveis em Destaque Perto de Você</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            <div className="text-center">
              <Button asChild size="lg">
                <Link href="/imoveis">Ver Todos os Imóveis</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Seção "Como Funciona" */}
        <section className="bg-muted/50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-heading text-3xl font-bold text-center mb-12">Como Funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">1. Busque</h3>
                <p className="text-muted-foreground text-pretty">
                  Use nossos filtros para encontrar o imóvel ideal na região que você deseja
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">2. Visite</h3>
                <p className="text-muted-foreground text-pretty">
                  Entre em contato com o proprietário e agende uma visita ao imóvel
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">3. Alugue</h3>
                <p className="text-muted-foreground text-pretty">
                  Envie sua proposta e finalize o processo de locação de forma segura
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

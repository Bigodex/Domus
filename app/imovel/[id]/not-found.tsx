import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function PropertyNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <Home className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
            <h1 className="font-heading text-3xl font-bold mb-2">Imóvel não encontrado</h1>
            <p className="text-muted-foreground">O imóvel que você está procurando não existe ou foi removido.</p>
          </div>

          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/imoveis">
                <Search className="h-4 w-4 mr-2" />
                Ver Todos os Imóveis
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Voltar ao Início
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

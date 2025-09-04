"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Home, DollarSign, Users } from "lucide-react"

export function SearchHero() {
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [bedrooms, setBedrooms] = useState("")
  const [people, setPeople] = useState("")
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const router = useRouter()

  const handleSearch = () => {
    const searchParams = new URLSearchParams()

    // Add filters to URL params if they have values
    if (location.trim()) searchParams.append("location", location.trim())
    if (priceRange) searchParams.append("priceRange", priceRange)
    if (bedrooms) searchParams.append("bedrooms", bedrooms)
    if (people) searchParams.append("people", people)
    if (selectedFeatures.length > 0) searchParams.append("features", selectedFeatures.join(","))

    // Navigate to results page with filters
    router.push(`/imoveis?${searchParams.toString()}`)
  }

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <section className="bg-gradient-to-br from-primary/0 to-accent/5 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
          <span className="text-primary"> Domus</span> <br />
          Conectando você ao imóvel dos seus sonhos.
        </h1>
        <p className="text-lg text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
          Encontre o imóvel perfeito para você e sua família. Milhares de opções com fotos, preços transparentes e
          processo simplificado.
        </p>

        {/* Search Form */}
        <div className="bg-card rounded-lg shadow-xl p-6 max-w-4xl mx-auto border border-solid border-border">
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
            {/* Localização */}
            <div className="flex-1 relative w-full">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Bairro ou Região"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 shadow-md focus:shadow-lg"
              />
            </div>

            {/* Preço */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full md:w-[180px] shadow-md focus:shadow-lg">
                <DollarSign className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1000">Até R$ 1.000</SelectItem>
                <SelectItem value="1000-2000">R$ 1.000 - R$ 2.000</SelectItem>
                <SelectItem value="2000-3000">R$ 2.000 - R$ 3.000</SelectItem>
                <SelectItem value="3000-4000">R$ 3.000 - R$ 4.000</SelectItem>
                <SelectItem value="4000-5000">R$ 4.000 - R$ 5.000</SelectItem>
                <SelectItem value="5000-6000">R$ 5.000 - R$ 6.000</SelectItem>
                <SelectItem value="7000+">Acima de R$ 7.000</SelectItem>
              </SelectContent>
            </Select>

            {/* Quartos */}
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger className="w-full md:w-[150px] shadow-md focus:shadow-lg">
                <Home className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Quartos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 quarto</SelectItem>
                <SelectItem value="2">2 quartos</SelectItem>
                <SelectItem value="3">3 quartos</SelectItem>
                <SelectItem value="4+">4+ quartos</SelectItem>
              </SelectContent>
            </Select>

            {/* Pessoas */}
            <Select value={people} onValueChange={setPeople}>
              <SelectTrigger className="w-full md:w-[150px] shadow-md focus:shadow-lg">
                <Users className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Pessoas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Pessoa</SelectItem>
                <SelectItem value="2">2 Pessoas</SelectItem>
                <SelectItem value="3">3 Pessoas</SelectItem>
                <SelectItem value="4+">4+ Pessoas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Botão centralizado */}
          <div className="flex justify-center">
            <Button onClick={handleSearch} size="lg" className="w-full md:w-auto">
              <Search className="h-4 w-4 mr-2" />
              Buscar Imóveis
            </Button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {[
            { key: "pets", label: "Aceita Pets" },
            { key: "garagem", label: "Com Garagem" },
            { key: "mobiliado", label: "Mobiliado" },
            { key: "centro", label: "Centro" },
            { key: "piscina", label: "Piscina" },
            { key: "ar-condicionado", label: "Ar Condicionado" },
          ].map((feature) => (
            <Button
              key={feature.key}
              variant={selectedFeatures.includes(feature.key) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFeature(feature.key)}
            >
              {feature.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}

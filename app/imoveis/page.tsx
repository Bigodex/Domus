"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { PropertyCard } from "@/components/property-card"
import { PropertyFilters } from "@/components/property-filters"
import { mockProperties } from "@/lib/mock-data"
import type { SearchFilters } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, Grid3X3, List } from "lucide-react"

export default function PropertiesPage() {
  const [filters, setFilters] = useState<SearchFilters>({})
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "newest" | "oldest">("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredAndSortedProperties = useMemo(() => {
    const filtered = mockProperties.filter((property) => {
      if (filters.location && !property.neighborhood.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }
      if (filters.priceMin && property.price < filters.priceMin) {
        return false
      }
      if (filters.priceMax && property.price > filters.priceMax) {
        return false
      }
      if (filters.bedrooms && property.bedrooms !== filters.bedrooms) {
        return false
      }
      if (filters.type && property.type !== filters.type) {
        return false
      }
      if (filters.petFriendly && !property.petFriendly) {
        return false
      }
      if (filters.furnished && !property.furnished) {
        return false
      }
      if (filters.parking && !property.parking) {
        return false
      }
      return true
    })

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [filters, sortBy])

  const clearFilters = () => {
    setFilters({})
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold mb-2">Imóveis para Alugar em Pato Branco</h1>
          <p className="text-muted-foreground">{filteredAndSortedProperties.length} imóveis encontrados</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <PropertyFilters filters={filters} onFiltersChange={setFilters} onClearFilters={clearFilters} />
          </div>

          {/* Properties List */}
          <div className="lg:col-span-3">
            {/* Sort and View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-48">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mais Recentes</SelectItem>
                    <SelectItem value="oldest">Mais Antigos</SelectItem>
                    <SelectItem value="price-asc">Menor Preço</SelectItem>
                    <SelectItem value="price-desc">Maior Preço</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Properties Grid */}
            {filteredAndSortedProperties.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {filteredAndSortedProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  Nenhum imóvel encontrado com os filtros selecionados
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

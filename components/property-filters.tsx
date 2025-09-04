"use client"

import { useState } from "react"
import type { SearchFilters } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Filter, X } from "lucide-react"

interface PropertyFiltersProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
  onClearFilters: () => void
}

export function PropertyFilters({ filters, onFiltersChange, onClearFilters }: PropertyFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== undefined && value !== "" && value !== null)

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filtros
                {hasActiveFilters && (
                  <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">Ativos</span>
                )}
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Location Filter */}
            <div className="space-y-2">
              <Label htmlFor="location">Localização</Label>
              <Input
                id="location"
                placeholder="Bairro ou região"
                value={filters.location || ""}
                onChange={(e) => updateFilter("location", e.target.value)}
              />
            </div>

            {/* Price Range */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priceMin">Preço Mínimo</Label>
                <Input
                  id="priceMin"
                  type="number"
                  placeholder="R$ 0"
                  value={filters.priceMin || ""}
                  onChange={(e) => updateFilter("priceMin", e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceMax">Preço Máximo</Label>
                <Input
                  id="priceMax"
                  type="number"
                  placeholder="R$ 10.000"
                  value={filters.priceMax || ""}
                  onChange={(e) => updateFilter("priceMax", e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div className="space-y-2">
              <Label>Quartos</Label>
              <Select
                value={filters.bedrooms?.toString() || "0"}
                onValueChange={(value) => updateFilter("bedrooms", value ? Number(value) : undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Qualquer quantidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Qualquer quantidade</SelectItem>
                  <SelectItem value="1">1 quarto</SelectItem>
                  <SelectItem value="2">2 quartos</SelectItem>
                  <SelectItem value="3">3 quartos</SelectItem>
                  <SelectItem value="4">4+ quartos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <Label>Tipo de Imóvel</Label>
              <Select value={filters.type || "all"} onValueChange={(value) => updateFilter("type", value || undefined)}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="apartment">Apartamento</SelectItem>
                  <SelectItem value="house">Casa</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <Label>Comodidades</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="petFriendly"
                    checked={filters.petFriendly || false}
                    onCheckedChange={(checked) => updateFilter("petFriendly", checked)}
                  />
                  <Label htmlFor="petFriendly" className="text-sm font-normal">
                    Aceita Pets
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="furnished"
                    checked={filters.furnished || false}
                    onCheckedChange={(checked) => updateFilter("furnished", checked)}
                  />
                  <Label htmlFor="furnished" className="text-sm font-normal">
                    Mobiliado
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="parking"
                    checked={filters.parking || false}
                    onCheckedChange={(checked) => updateFilter("parking", checked)}
                  />
                  <Label htmlFor="parking" className="text-sm font-normal">
                    Garagem
                  </Label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={onClearFilters}
                disabled={!hasActiveFilters}
                className="flex-1 bg-transparent"
              >
                <X className="h-4 w-4 mr-2" />
                Limpar
              </Button>
              <Button onClick={() => setIsOpen(false)} className="flex-1">
                Aplicar Filtros
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

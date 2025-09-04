"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, Heart, MessageCircle, Building2, Key, Rocket, Bed, UtensilsCrossed } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-primary" />
            <span className="font-heading text-xl font-bold text-foreground">Domus</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/imoveis"
              className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Inicio</span>
            </Link>
            <Link
              href="/como-funciona"
              className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Building2 className="h-4 w-4" />
              <span>Imovéis para Alugar</span>
            </Link>
            <Link
              href="/anunciar"
              className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Key className="h-4 w-4" />
              <span>Imovéis a Venda</span>
            </Link>
            <Link
              href="/anunciar"
              className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Rocket className="h-4 w-4" />
              <span>Lançamentos</span>
            </Link>
            <Link
              href="/anunciar"
              className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Bed className="h-4 w-4" />
              <span>Pernoites</span>
            </Link>
            <Link
              href="/anunciar"
              className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <UtensilsCrossed className="h-4 w-4" />
              <span>Restaurantes</span>
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/chat">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/favoritos">
                <Heart className="h-4 w-4 mr-2" />
                Favoritos
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/cadastro">Cadastrar</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/imoveis"
                className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Building2 className="h-4 w-4" />
                <span>Imóveis</span>
              </Link>
              <Link
                href="/como-funciona"
                className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                <span>Como Funciona</span>
              </Link>
              <Link
                href="/anunciar"
                className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Key className="h-4 w-4" />
                <span>Anunciar Imóvel</span>
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/chat" onClick={() => setIsMenuOpen(false)}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/favoritos" onClick={() => setIsMenuOpen(false)}>
                    <Heart className="h-4 w-4 mr-2" />
                    Favoritos
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    Entrar
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/cadastro" onClick={() => setIsMenuOpen(false)}>
                    Cadastrar
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

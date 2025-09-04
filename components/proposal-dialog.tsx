"use client"

import type React from "react"

import { useState } from "react"
import type { Property } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MessageCircle, CheckCircle, AlertCircle } from "lucide-react"

interface ProposalDialogProps {
  property: Property
  children: React.ReactNode
}

export function ProposalDialog({ property, children }: ProposalDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Olá! Tenho interesse no imóvel "${property.title}". Gostaria de agendar uma visita e discutir os detalhes do aluguel. Aguardo seu contato!`,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // TODO: Implement actual proposal submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Proposal submitted:", {
        propertyId: property.id,
        landlordId: property.landlord.id,
        ...formData,
      })

      setSubmitStatus("success")

      // Reset form after successful submission
      setTimeout(() => {
        setIsOpen(false)
        setSubmitStatus("idle")
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: `Olá! Tenho interesse no imóvel "${property.title}". Gostaria de agendar uma visita e discutir os detalhes do aluguel. Aguardo seu contato!`,
        })
      }, 2000)
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Enviar Proposta
          </DialogTitle>
          <DialogDescription>Envie uma proposta para o proprietário do imóvel "{property.title}"</DialogDescription>
        </DialogHeader>

        {submitStatus === "success" ? (
          <div className="py-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Proposta enviada com sucesso!</h3>
            <p className="text-muted-foreground mb-4">
              Sua proposta foi enviada para {property.landlord.name}. Você receberá uma resposta em breve.
            </p>
            <Button onClick={() => setIsOpen(false)} className="w-full">
              Fechar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Erro ao enviar proposta. Tente novamente ou entre em contato conosco.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="proposal-name">Nome completo</Label>
                <Input
                  id="proposal-name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="proposal-phone">Telefone</Label>
                <Input
                  id="proposal-phone"
                  placeholder="(46) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="proposal-email">E-mail</Label>
              <Input
                id="proposal-email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proposal-message">Mensagem</Label>
              <Textarea
                id="proposal-message"
                placeholder="Descreva seu interesse no imóvel..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Informações do Imóvel</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  <strong>Imóvel:</strong> {property.title}
                </p>
                <p>
                  <strong>Endereço:</strong> {property.address}, {property.neighborhood}
                </p>
                <p>
                  <strong>Valor:</strong> R$ {property.price.toLocaleString("pt-BR")}/mês
                </p>
                <p>
                  <strong>Proprietário:</strong> {property.landlord.name}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-transparent"
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Enviando..." : "Enviar Proposta"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

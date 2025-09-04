import type { User, Proposal, Favorite } from "./types"
import { mockProperties } from "./mock-data"

export const mockUser: User = {
  id: "user-1",
  name: "João da Silva",
  email: "joao@email.com",
  phone: "(46) 99999-9999",
  avatar: "/man-avatar.png",
  createdAt: "2024-01-01",
  role: "tenant",
}

export const mockFavorites: Favorite[] = [
  {
    id: "fav-1",
    userId: "user-1",
    propertyId: "1",
    property: mockProperties[0],
    createdAt: "2024-01-15",
  },
  {
    id: "fav-2",
    userId: "user-1",
    propertyId: "3",
    property: mockProperties[2],
    createdAt: "2024-01-12",
  },
  {
    id: "fav-3",
    userId: "user-1",
    propertyId: "4",
    property: mockProperties[3],
    createdAt: "2024-01-10",
  },
]

export const mockProposals: Proposal[] = [
  {
    id: "prop-1",
    propertyId: "1",
    property: mockProperties[0],
    tenantId: "user-1",
    tenant: mockUser,
    landlordId: "1",
    landlord: {
      id: "1",
      name: "Maria Silva",
      email: "maria@email.com",
      phone: "(46) 98888-8888",
      avatar: "/diverse-woman-avatar.png",
      createdAt: "2023-12-01",
      role: "landlord",
    },
    message:
      "Olá! Tenho muito interesse neste apartamento. Gostaria de agendar uma visita para esta semana. Sou funcionário público e posso comprovar renda. Aguardo retorno!",
    status: "pending",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16",
  },
  {
    id: "prop-2",
    propertyId: "3",
    property: mockProperties[2],
    tenantId: "user-1",
    tenant: mockUser,
    landlordId: "3",
    landlord: {
      id: "3",
      name: "Ana Costa",
      email: "ana@email.com",
      phone: "(46) 97777-7777",
      avatar: "/diverse-woman-avatar.png",
      createdAt: "2023-11-15",
      role: "landlord",
    },
    message:
      "Boa tarde! Este studio é perfeito para mim. Sou estudante universitário e preciso de um local próximo ao centro. Posso apresentar fiador se necessário.",
    status: "approved",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-15",
  },
  {
    id: "prop-3",
    propertyId: "2",
    property: mockProperties[1],
    tenantId: "user-1",
    tenant: mockUser,
    landlordId: "2",
    landlord: {
      id: "2",
      name: "João Santos",
      email: "joao.santos@email.com",
      phone: "(46) 96666-6666",
      avatar: "/man-avatar.png",
      createdAt: "2023-10-20",
      role: "landlord",
    },
    message:
      "Olá! Estou procurando uma casa para minha família. Temos dois filhos e um cachorro. A casa parece ideal para nós. Podemos conversar sobre os detalhes?",
    status: "rejected",
    createdAt: "2024-01-13",
    updatedAt: "2024-01-14",
  },
]

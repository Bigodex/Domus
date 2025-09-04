export interface Property {
  id: string
  title: string
  description: string
  price: number
  address: string
  neighborhood: string
  bedrooms: number
  bathrooms: number
  area: number
  images: string[]
  amenities: string[]
  type: "apartment" | "house" | "studio"
  petFriendly: boolean
  furnished: boolean
  parking: boolean
  createdAt: string
  landlord: {
    id: string
    name: string
    avatar?: string
  }
}

export interface SearchFilters {
  location?: string
  priceMin?: number
  priceMax?: number
  bedrooms?: number
  type?: Property["type"]
  petFriendly?: boolean
  furnished?: boolean
  parking?: boolean
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  createdAt: string
  role: "tenant" | "landlord" | "both"
}

export interface Proposal {
  id: string
  propertyId: string
  property: Property
  tenantId: string
  tenant: User
  landlordId: string
  landlord: User
  message: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
}

export interface Favorite {
  id: string
  userId: string
  propertyId: string
  property: Property
  createdAt: string
}

export interface ChatMessage {
  id: string
  conversationId: string
  senderId: string
  sender: User
  content: string
  type: "text" | "image" | "file"
  createdAt: string
  readAt?: string
}

export interface Conversation {
  id: string
  participants: User[]
  propertyId?: string
  property?: Property
  proposalId?: string
  lastMessage?: ChatMessage
  unreadCount: number
  createdAt: string
  updatedAt: string
}

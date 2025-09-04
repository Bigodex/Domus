import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"

interface ProposalStatusBadgeProps {
  status: "pending" | "approved" | "rejected" | "expired"
  size?: "sm" | "md" | "lg"
}

export function ProposalStatusBadge({ status, size = "md" }: ProposalStatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "approved":
        return {
          label: "Aprovada",
          variant: "default" as const,
          icon: <CheckCircle className="h-3 w-3" />,
          className: "bg-green-100 text-green-800 border-green-200",
        }
      case "rejected":
        return {
          label: "Rejeitada",
          variant: "destructive" as const,
          icon: <XCircle className="h-3 w-3" />,
          className: "bg-red-100 text-red-800 border-red-200",
        }
      case "expired":
        return {
          label: "Expirada",
          variant: "secondary" as const,
          icon: <AlertTriangle className="h-3 w-3" />,
          className: "bg-gray-100 text-gray-800 border-gray-200",
        }
      default:
        return {
          label: "Pendente",
          variant: "secondary" as const,
          icon: <Clock className="h-3 w-3" />,
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        }
    }
  }

  const config = getStatusConfig(status)
  const sizeClass = size === "sm" ? "text-xs px-2 py-1" : size === "lg" ? "text-sm px-3 py-2" : "text-xs px-2 py-1"

  return (
    <Badge variant={config.variant} className={`flex items-center gap-1 ${sizeClass} ${config.className}`}>
      {config.icon}
      {config.label}
    </Badge>
  )
}

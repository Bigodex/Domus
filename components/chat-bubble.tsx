import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ChatMessage } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface ChatBubbleProps {
  message: ChatMessage
  isOwn: boolean
  showAvatar?: boolean
}

export function ChatBubble({ message, isOwn, showAvatar = true }: ChatBubbleProps) {
  return (
    <div className={`flex gap-3 ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
      {showAvatar && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={message.sender.avatar || "/placeholder.svg"} />
          <AvatarFallback className="text-xs">
            {message.sender.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`flex flex-col max-w-[70%] ${isOwn ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-lg px-4 py-2 ${
            isOwn ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-1">
          {formatDistanceToNow(new Date(message.createdAt), {
            addSuffix: true,
            locale: ptBR,
          })}
          {message.readAt && isOwn && <span className="ml-1 text-primary">✓✓</span>}
        </span>
      </div>
    </div>
  )
}

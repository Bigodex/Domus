import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Conversation } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface ConversationItemProps {
  conversation: Conversation
  currentUserId: string
}

export function ConversationItem({ conversation, currentUserId }: ConversationItemProps) {
  const otherParticipant = conversation.participants.find((p) => p.id !== currentUserId)

  if (!otherParticipant) return null

  return (
    <Link href={`/chat/${conversation.id}`} className="block p-4 hover:bg-muted/50 transition-colors border-b">
      <div className="flex items-start gap-3">
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarImage src={otherParticipant.avatar || "/placeholder.svg"} />
          <AvatarFallback>
            {otherParticipant.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-sm truncate">{otherParticipant.name}</h3>
            {conversation.lastMessage && (
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {formatDistanceToNow(new Date(conversation.lastMessage.createdAt), {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </span>
            )}
          </div>

          {conversation.property && (
            <p className="text-xs text-muted-foreground mb-1 truncate">{conversation.property.title}</p>
          )}

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground truncate flex-1">
              {conversation.lastMessage?.content || "Nenhuma mensagem ainda"}
            </p>
            {conversation.unreadCount > 0 && (
              <Badge
                variant="default"
                className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {conversation.unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

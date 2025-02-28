"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { Trash2, RefreshCw } from "lucide-react"
import { CardBlur } from "../ui/blur-container"
import { FadeIn } from "../ui/animation-wrapper"
import { getInteractiveEffectClasses, getDeleteButtonEffectClasses, getRefreshButtonEffectClasses } from "@/utils/visual-effects"

// Define the Message type locally to avoid circular dependencies
type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
}

interface ChatMessageProps {
  message: Message
  onDelete: (id: string) => void
  onRefresh?: (id: string) => void
}

export function ChatMessage({ message, onDelete, onRefresh }: ChatMessageProps) {
  const isAssistant = message.role === "assistant"

  return (
    <CardBlur
      className={cn(
        "flex w-full items-start gap-4 rounded-lg p-4 mb-4 transition-all duration-500 group",
        isAssistant
          ? "bg-muted/30 border border-muted/20"
          : "bg-background/70",
        getInteractiveEffectClasses()
      )}
    >
      <div className={cn(
        "flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow-md overflow-hidden",
        isAssistant ? "bg-transparent" : "bg-background/80"
      )}>
        {isAssistant ? (
          <Image
            src="/logo.webp"
            alt="Vipassana Assistant"
            width={32}
            height={32}
            className="object-cover"
          />
        ) : (
          <span className="text-sm font-semibold">U</span>
        )}
      </div>
      <div className="flex-1 space-y-3">
        <FadeIn duration={1}>
          <p className="text-sm leading-relaxed tracking-wide">
            {message.content}
          </p>
        </FadeIn>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground opacity-70">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <div className="flex space-x-2">
            {!isAssistant && onRefresh && (
              <button
                onClick={() => onRefresh(message.id)}
                className={getRefreshButtonEffectClasses()}
                aria-label="Refresh conversation from this message"
              >
                <RefreshCw size={16} />
              </button>
            )}
            <button
              onClick={() => onDelete(message.id)}
              className={getDeleteButtonEffectClasses()}
              aria-label="Delete message"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </CardBlur>
  )
}

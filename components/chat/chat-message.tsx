"use client"

import { cn } from "@/lib/utils"
import type { Message } from "./chat-container"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === "assistant"

  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 rounded-lg p-4",
        isAssistant ? "bg-muted/50" : "bg-background"
      )}
    >
      <div className="flex size-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
        <span className="text-sm font-semibold">
          {isAssistant ? "V" : "U"}
        </span>
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-sm leading-relaxed">
          {message.content}
        </p>
        <p className="text-xs text-muted-foreground">
          {new Date(message.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}

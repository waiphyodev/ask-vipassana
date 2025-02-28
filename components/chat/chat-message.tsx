"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import type { Message } from "./chat-container"
import { CardBlur } from "../ui/blur-container"
import { FadeIn } from "../ui/animation-wrapper"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === "assistant"

  return (
    <CardBlur
      className={cn(
        "flex w-full items-start gap-4 rounded-lg p-4 mb-4 transition-all duration-500",
        isAssistant
          ? "bg-muted/30 border border-muted/20"
          : "bg-background/70"
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
        <p className="text-xs text-muted-foreground opacity-70">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </CardBlur>
  )
}

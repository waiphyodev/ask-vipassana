"use client"

import { cn } from "@/lib/utils"
import { Trash2, RefreshCw } from "lucide-react"
import { CardBlur } from "../ui/blur-container"
import { FadeIn } from "../ui/animation-wrapper"
import {
  getInteractiveEffectClasses,
  getDeleteButtonEffectClasses,
  getRefreshButtonEffectClasses,
  getGlowEffectClasses,
  getShineAnimationClasses
} from "@/utils/visual-effects"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

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

  // Markdown rendering is now implemented and working correctly

  return (
    <CardBlur
      className={cn(
        "w-full mb-4 transition-all duration-500 group max-w-[85%]",
        isAssistant
          ? "bg-muted/30 border border-muted/20 rounded-lg rounded-bl-sm p-4 ml-0 mr-auto"
          : "bg-primary/10 border border-primary/10 rounded-lg rounded-br-sm p-4 ml-auto mr-0",
        getInteractiveEffectClasses(),
        getGlowEffectClasses("", !isAssistant),
        getShineAnimationClasses()
      )}
    >
      <div className="flex-1 space-y-3">
        <FadeIn duration={1}>
          <div className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-p:tracking-wide prose-p:my-2 prose-headings:mb-2 prose-headings:mt-4 prose-pre:bg-muted/50 prose-pre:border prose-pre:border-muted/20 prose-pre:rounded-md max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
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

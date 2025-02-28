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
        "w-full mb-6 transition-all duration-500 group max-w-[85%] relative overflow-hidden",
        isAssistant
          ? "border border-[#E5D9C9]/60 dark:border-[#E5D9C9]/10  rounded-[16px] rounded-bl-[6px] p-5 ml-0 mr-auto text-[#332E2B] dark:text-[#E5D9C9]"
          : "border border-[#D2885A]/20 dark:border-[#E5D9C9]/10  rounded-[16px] rounded-br-[6px] p-5 ml-auto mr-0 hover:bg-white dark:hover:bg-[#D2885A]/40",
        getInteractiveEffectClasses(),
        getShineAnimationClasses()
      )}
    >
      <div className="flex-1 space-y-4">
        <FadeIn duration={1.2}>
          <div className={cn(
            "prose prose-sm prose-p:leading-relaxed prose-p:tracking-wide prose-p:my-3 prose-headings:mb-3 prose-headings:mt-5 max-w-none",
            isAssistant
              ? "prose-pre:bg-[#E5D9C9]/50 prose-pre:border prose-pre:border-[#E5D9C9]/40 prose-pre:rounded-md dark:prose-invert dark:prose-pre:bg-[#332E2B] dark:prose-pre:border-[#E5D9C9]/30"
              : "prose-pre:bg-[#FAF9F6] prose-pre:border prose-pre:border-[#D2885A]/10 prose-pre:rounded-md dark:prose-invert dark:prose-pre:bg-[#D2885A]/20 dark:prose-pre:border-[#D2885A]/30"
          )}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </FadeIn>
        <div className="flex items-center justify-end absolute bottom-5 right-5">
          <div className="flex space-x-3">
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

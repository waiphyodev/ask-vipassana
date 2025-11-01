"use client"

import { useState, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { SendIcon } from "lucide-react"
import { FadeIn } from "@/components/ui/animation-wrapper"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit"
      const scrollHeight = textareaRef.current.scrollHeight
      // Limit max height to 200px to prevent content being cut off
      textareaRef.current.style.height = `${Math.min(scrollHeight, 200)}px`

      // Ensure the cursor is visible by scrolling to bottom of textarea if needed
      if (scrollHeight > 200) {
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight
      }
    }
  }, [message])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSendMessage(message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <FadeIn duration={0.5}>
      <form onSubmit={handleSubmit} className="relative">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="မေးခွန်းမေးရန်..."
          className="min-h-[80px] max-h-[200px] w-full resize-none pr-16 rounded-2xl border-muted/30 focus:border-muted/50 transition-all duration-300 pb-4 pt-3 px-4"
          disabled={isLoading}
        />
        <div className="absolute bottom-3 right-3">
          <Button
            type="submit"
            size="icon"
            disabled={!message.trim() || isLoading}
            className="rounded-full transition-all duration-500 hover:scale-105 active:scale-95"
          >
            <SendIcon className="size-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </FadeIn>
  )
}

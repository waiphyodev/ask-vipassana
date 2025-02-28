"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"

export type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
}

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load chat history from localStorage
    const savedHistory = localStorage.getItem("vipassana-chat-history")
    if (savedHistory) {
      setMessages(JSON.parse(savedHistory))
    }
  }, [])

  const saveMessages = (newMessages: Message[]) => {
    setMessages(newMessages)
    localStorage.setItem("vipassana-chat-history", JSON.stringify(newMessages))
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: Date.now(),
    }

    const updatedMessages = [...messages, newMessage]
    saveMessages(updatedMessages)
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, history: messages }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.message,
        timestamp: Date.now(),
      }

      saveMessages([...updatedMessages, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
        timestamp: Date.now(),
      }
      saveMessages([...updatedMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearHistory = () => {
    setMessages([])
    localStorage.removeItem("vipassana-chat-history")
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col space-y-4">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ChatMessage message={message} />
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 text-sm text-muted-foreground"
          >
            <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground" />
            <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground delay-150" />
            <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground delay-300" />
          </motion.div>
        )}
      </div>
      <div className="p-4">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        {messages.length > 0 && (
          <button
            onClick={clearHistory}
            className="mt-2 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear Conversation
          </button>
        )}
      </div>
    </div>
  )
}

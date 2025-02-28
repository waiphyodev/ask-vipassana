"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import { SlideUp, Breathing } from "../ui/animation-wrapper"
import { FloatingBlur } from "../ui/blur-container"
import { WelcomeMessage } from "./welcome-message"
import { SuggestedQuestions } from "./suggested-questions"
import { TimerButton } from "../meditation/timer-button"
import { getInteractiveEffectClasses } from "@/utils/visual-effects"

export type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
}

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstVisit, setIsFirstVisit] = useState(false)

  useEffect(() => {
    // Load chat history from localStorage
    const savedHistory = localStorage.getItem("vipassana-chat-history")
    if (savedHistory) {
      setMessages(JSON.parse(savedHistory))
    }

    // Check if this is the first visit
    const hasVisitedBefore = localStorage.getItem("vipassana-visited-before")
    if (!hasVisitedBefore) {
      setIsFirstVisit(true)
      localStorage.setItem("vipassana-visited-before", "true")
    }

    // Check for inactive period (7 days) and clear if needed
    const lastActivity = localStorage.getItem("vipassana-last-activity")
    if (lastActivity) {
      const lastActiveTime = parseInt(lastActivity, 10)
      const currentTime = Date.now()
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000

      if (currentTime - lastActiveTime > sevenDaysInMs) {
        // Clear history after 7 days of inactivity
        clearHistory()
      }
    }

    // Update last activity timestamp
    localStorage.setItem("vipassana-last-activity", Date.now().toString())
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
        body: JSON.stringify({ chatInput: content, history: messages }),
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

  const handleDeleteMessage = (id: string) => {
    const updatedMessages = messages.filter(message => message.id !== id)
    saveMessages(updatedMessages)
  }

  const handleRefreshFromMessage = async (id: string) => {
    // Find the index of the message to refresh from
    const messageIndex = messages.findIndex(message => message.id === id)
    if (messageIndex === -1) return

    // Get the message content
    const messageToRefresh = messages[messageIndex]
    if (messageToRefresh.role !== "user") return

    // Keep only messages up to the selected message
    const updatedMessages = messages.slice(0, messageIndex + 1)
    saveMessages(updatedMessages)
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatInput: messageToRefresh.content,
          history: messages.slice(0, messageIndex)
        }),
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
    <div className="flex h-[calc(100vh-8rem)] flex-col space-y-4 relative">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {/* Welcome message for first-time visitors */}
        {isFirstVisit && messages.length === 0 && (
          <WelcomeMessage />
        )}

        {/* Suggested questions for first-time visitors */}
        {isFirstVisit && messages.length === 0 && (
          <SuggestedQuestions onSelectQuestion={handleSendMessage} />
        )}

        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <SlideUp
              key={message.id}
              delay={index * 0.1}
              duration={0.8}
              className="w-full"
            >
              <ChatMessage
                message={message}
                onDelete={handleDeleteMessage}
                onRefresh={message.role === "user" ? handleRefreshFromMessage : undefined}
              />
            </SlideUp>
          ))}
        </AnimatePresence>

        {isLoading && (
          <Breathing className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-muted-foreground" />
            <div className="h-2 w-2 rounded-full bg-muted-foreground" />
            <div className="h-2 w-2 rounded-full bg-muted-foreground" />
          </Breathing>
        )}
      </div>

      <FloatingBlur className="p-4 mx-auto w-full max-w-3xl">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        {messages.length > 0 && (
          <button
            onClick={clearHistory}
            className={getInteractiveEffectClasses("mt-2 text-xs text-muted-foreground hover:text-foreground")}
          >
            Clear Conversation
          </button>
        )}
      </FloatingBlur>

      {/* Meditation Timer Button */}
      <TimerButton />
    </div>
  )
}

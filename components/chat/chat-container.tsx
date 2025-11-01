"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { Bell } from "lucide-react"
import { ChatMessage } from "@/components/chat/chat-message"
import { ChatInput } from "@/components/chat/chat-input"
import { SlideUp, Breathing } from "../ui/animation-wrapper"
import { FloatingBlur } from "../ui/blur-container"
import { WelcomeMessage } from "./welcome-message"
import { SuggestedQuestions } from "./suggested-questions"
import { MeditationTimer } from "../meditation/meditation-timer"
import { Button } from "../ui/button"
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
  const [isTimerOpen, setIsTimerOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    // Load chat history from localStorage
    const savedHistory = localStorage.getItem("vipassana-chat-history")
    if (savedHistory) {
      setMessages(JSON.parse(savedHistory))
    }

    // Check if this is the first visit
    const hasVisitedBefore = localStorage.getItem("vipassana-visited-before")
    if (!hasVisitedBefore) {
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

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar-hide" ref={chatContainerRef}>
        <div className="px-4  mt-24 mb-48 space-y-4 min-h-[calc(100vh-200px)]">
          {/* Welcome message for empty chat */}
          {messages.length === 0 && (
            <div className="flex justify-center w-ful ">
              <WelcomeMessage />
            </div>
          )}

          {/* Suggested questions */}
          {messages.length === 0 && (
            <div className="px-2">
              <SuggestedQuestions onSelectQuestion={handleSendMessage} />
            </div>
          )}

          <div className="space-y-4">
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
              <Breathing className="flex items-center justify-center text-sm text-muted-foreground">
                <div dangerouslySetInnerHTML={{ __html: '<lord-icon src="https://cdn.lordicon.com/nrqdaujr.json" trigger="loop" delay="500" colors="primary:#D2885A" style="width:100px;height:100px"></lord-icon>' }} />
              </Breathing>
            )}
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <FloatingBlur className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full max-w-3xl mx-auto px-4 py-4">
          <div className="relative">
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            {messages.length > 0 && (
              <div className="flex justify-between items-center mt-2 gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => setIsTimerOpen(true)}
                >
                  <Bell className="h-3 w-3 mr-1" />
                  Meditation Timer
                </Button>

                <footer className="text-center text-xs">
                  <p>Forked from <a href="https://tarasenko.dev?utm_source=askvipassana" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">Igor Tarasenko</a></p>
                </footer>

                <button
                  onClick={clearHistory}
                  className={getInteractiveEffectClasses("text-xs text-muted-foreground hover:text-foreground")}
                >
                  ပြောဆိုထားသည်များအား ဖျက်ရန်
                </button>
              </div>
            )}
          </div>
        </div>
      </FloatingBlur>

      {/* Meditation Timer */}
      <MeditationTimer open={isTimerOpen} onOpenChange={setIsTimerOpen} />
    </div>
  )
}

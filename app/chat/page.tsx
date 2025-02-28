"use client"

import { useEffect } from "react"
import { ChatContainer } from "@/components/chat/chat-container"
import { useRouter } from "next/navigation"

export default function ChatPage() {
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const chatHistory = localStorage.getItem("vipassana-chat-history")
    if (!chatHistory) {
      localStorage.setItem("vipassana-chat-history", JSON.stringify([]))
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Vipassana Guide</h1>
          <button
            onClick={() => router.push("/")}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Return Home
          </button>
        </div>
        <ChatContainer />
      </div>
    </main>
  )
}

"use client"

import { useEffect } from "react"
import { ChatContainer } from "@/components/chat/chat-container"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FadeIn, SlideUp } from "@/components/ui/animation-wrapper"
import { ThemeToggle } from "@/components/ui/theme-toggle"

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
    <main className="flex h-screen flex-col overflow-hidden">
      <div className="flex-1 space-y-6 p-4 md:p-8 max-w-6xl mx-auto w-full overflow-hidden">
        <FadeIn duration={1}>
          <div className="flex items-center justify-between mb-6">
            <SlideUp delay={0.2}>
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                title="Return to Home"
              >
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src="/logo.webp"
                    alt="Vipassana Logo"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">Ask Teacher</h1>
              </button>
            </SlideUp>
            <ThemeToggle />
          </div>
        </FadeIn>
        <ChatContainer />
      </div>
    </main>
  )
}

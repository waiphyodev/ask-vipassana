"use client"

import { useEffect } from "react"
import { ChatContainer } from "@/components/chat/chat-container"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FadeIn, SlideUp } from "@/components/ui/animation-wrapper"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { FloatingBlur } from "@/components/ui/blur-container"

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
    <main className="flex flex-col min-h-screen h-screen overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-3xl mx-auto w-full">
          <FloatingBlur className="border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-4">
              <FadeIn duration={1}>
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
                    <h1 className="text-2xl font-semibold tracking-tight">Ask Vipassana</h1>
                  </button>
                </SlideUp>
              </FadeIn>
              <ThemeToggle />
            </div>
          </FloatingBlur>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 h-[calc(100vh-4rem)]">
        <div className="h-full max-w-3xl mx-auto w-full">
          <ChatContainer />
        </div>
      </div>
    </main>
  )
}

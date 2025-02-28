"use client"

import { useEffect } from "react"
import { ChatContainer } from "@/components/chat/chat-container"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FadeIn, SlideUp } from "@/components/ui/animation-wrapper"
import { FloatingBlur } from "@/components/ui/blur-container"
import { ArrowLeft } from "lucide-react"

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
      <div className="flex-1 space-y-6 p-4 md:p-8 max-w-6xl mx-auto w-full">
        <FadeIn duration={1}>
          <div className="flex items-center justify-between mb-8">
            <SlideUp delay={0.2}>
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src="/logo.webp"
                    alt="Vipassana Logo"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <h1 className="text-3xl font-semibold tracking-tight">Vipassana Guide</h1>
              </div>
            </SlideUp>
            <FloatingBlur className="p-2">
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Return Home</span>
              </button>
            </FloatingBlur>
          </div>
        </FadeIn>
        <ChatContainer />
      </div>
    </main>
  )
}

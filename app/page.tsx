"use client"

import Link from "next/link"
import Image from "next/image"
import { SlideUp, FadeIn } from "@/components/ui/animation-wrapper"
import { FloatingBlur } from "@/components/ui/blur-container"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <SlideUp duration={1.2} className="text-center space-y-8">
        <FadeIn delay={0.2} duration={1.5}>
          <div className="flex justify-center mb-6">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-primary/20 shadow-lg">
              <Image
                src="/logo.webp"
                alt="Vipassana Logo"
                width={96}
                height={96}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4} duration={1.5}>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl mb-6">
            Welcome to Ask Vipassana
          </h1>
        </FadeIn>

        <FadeIn delay={0.6} duration={1.5}>
          <p className="max-w-[600px] text-muted-foreground text-lg leading-relaxed tracking-wide">
            A space for mindful conversation and authentic Vipassana Buddhist wisdom.
            Begin your journey with a calm and open mind.
          </p>
        </FadeIn>

        <FadeIn delay={0.9} duration={1.5}>
          <FloatingBlur className="inline-block mt-6">
            <Link
              href="/chat"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-all duration-500 hover:bg-primary/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Start Conversation
            </Link>
          </FloatingBlur>
        </FadeIn>
      </SlideUp>
    </main>
  )
}

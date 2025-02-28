"use client"

import Link from "next/link"
import Image from "next/image"
import { SlideUp, FadeIn } from "@/components/ui/animation-wrapper"

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
          <p className="max-w-[600px] mx-auto text-muted-foreground text-lg leading-relaxed tracking-wide">
            Your practical guide for authentic Vipassana wisdom.
          </p>
        </FadeIn>

        <FadeIn delay={0.8} duration={1.5}>
          <p className="max-w-[600px] mx-auto text-muted-foreground text-lg leading-relaxed tracking-wide">
            Ask questions, receive clear meditation instructions, and discover daily applications of profound Dhamma teachings—accessible, direct, and completely free from commercialization.
          </p>
        </FadeIn>

        <FadeIn delay={1.0} duration={1.5}>
          <p className="max-w-[600px] mx-auto text-muted-foreground text-lg leading-relaxed tracking-wide">
            Clear your mind. Take your first step.
          </p>
        </FadeIn>

        <FadeIn delay={1.2} duration={1.5}>
          <Link
            href="/chat"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-all duration-500 hover:bg-primary/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Start Conversation
          </Link>
        </FadeIn>
      </SlideUp>
    </main>
  )
}

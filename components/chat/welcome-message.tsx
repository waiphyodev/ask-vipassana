"use client"

import { FadeIn } from "@/components/ui/animation-wrapper"
import { CardBlur } from "@/components/ui/blur-container"

export function WelcomeMessage() {
  return (
    <FadeIn duration={1.5} className="mb-8">
      <CardBlur className="text-center p-6">
        <h2 className="text-xl font-medium mb-3">Welcome to Ask Vipassana</h2>
        <p className="text-muted-foreground mb-4">
          I&apos;m here to provide guidance on Vipassana meditation and Buddhist teachings in a calm,
          teacher-like manner. Feel free to ask any questions about your meditation practice or
          spiritual journey.
        </p>
        <p className="text-sm text-muted-foreground">
          Your conversations are stored locally on your device for privacy and will be automatically
          cleared after a period of inactivity.
        </p>
      </CardBlur>
    </FadeIn>
  )
}

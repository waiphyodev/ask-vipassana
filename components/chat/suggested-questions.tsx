"use client"

import { useState } from "react"
import { FadeIn, SlideUp } from "@/components/ui/animation-wrapper"
import { CardBlur } from "@/components/ui/blur-container"
import { Button } from "@/components/ui/button"

interface SuggestedQuestionsProps {
  onSelectQuestion: (question: string) => void
}

const SUGGESTED_QUESTIONS = [
  "How do I start practicing Vipassana meditation?",
  "What is the main principle of Vipassana?",
  "How long should I meditate each day?",
  "How can I deal with distracting thoughts during meditation?",
  "What is the proper posture for Vipassana meditation?",
  "How does Vipassana relate to Buddhist teachings?"
]

export function SuggestedQuestions({ onSelectQuestion }: SuggestedQuestionsProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleSelectQuestion = (question: string, index: number) => {
    setSelectedIndex(index)
    // Short delay to show the selection before sending
    setTimeout(() => {
      onSelectQuestion(question)
    }, 300)
  }

  return (
    <FadeIn duration={1.2} className="mb-6">
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center mb-4">
          Here are some questions to help you get started:
        </p>
        <div className="grid grid-cols-1 gap-3">
          {SUGGESTED_QUESTIONS.map((question, index) => (
            <SlideUp key={index} delay={index * 0.1} duration={0.8}>
              <CardBlur
                className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                  selectedIndex === index ? "bg-primary/10" : ""
                }`}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left font-normal h-auto py-3 px-4 whitespace-normal flex-wrap"
                  onClick={() => handleSelectQuestion(question, index)}
                >
                  {question}
                </Button>
              </CardBlur>
            </SlideUp>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}

"use client"

import { useState } from "react"
import { FadeIn, SlideUp } from "@/components/ui/animation-wrapper"
import { CardBlur } from "@/components/ui/blur-container"
import { Button } from "@/components/ui/button"

interface SuggestedQuestionsProps {
  onSelectQuestion: (question: string) => void
}

const SUGGESTED_QUESTIONS = [
  "ဝိပဿနာဆိုတာ ဘာလဲ၊ ဘာကို ဆိုလိုတာလဲ။",
  "ဝိပဿနာတရားကို ဘာကြောင့် အားထုတ်သင့်တာလဲ၊ ဘယ်လို အကျိုးကျေးဇူးတွေ ရနိုင်သလဲ။",
  "ဝိပဿနာဟာ ဗုဒ္ဓဘာသာဝင်တွေအတွက်ပဲလား၊ တခြားဘာသာဝင်တွေ အားထုတ်လို့ရလား။",
  "ဝိပဿနာနဲ့ သမထ (စိတ်ငြိမ်အောင် ထားတဲ့တရား) တို့ရဲ့ ကွာခြားချက်က ဘာလဲ။",
  "တရားထိုင်နေစဉ် စိတ်အာရုံပျံ့လွင့်စေတဲ့ အကြံအစည် (အတွေး) တွေကို ဘယ်လိုကိုင်တွယ်ဖြေရှင်းရမလဲ။",
  "ဝိပဿနာတရားအားထုတ်ရာမှာ အဓိက အာရုံစိုက်ရမယ့် အရာက ဘာလဲ။",
  "ဝိပဿနာကို ဘယ်လို စတင် အားထုတ်ရမလဲ။ (ဥပမာ- ဝင်လေထွက်လေ ရှုမှတ်ခြင်း)",
  "တရားထိုင်တဲ့အခါ ဘယ်လို ကိုယ်ဟန်အနေအထားနဲ့ ထိုင်သင့်သလဲ။",
  "တရားထိုင်နေစဉ် စိတ်တွေ လွင့်နေရင် (သို့) အတွေးတွေ ဝင်နေရင် ဘာလုပ်သင့်သလဲ။",
  "ခန္ဓာကိုယ်မှာ ဖြစ်ပေါ်လာတဲ့ နာကျင်မှု၊ ထုံကျဉ်မှု စတဲ့ ခံစားမှု တွေကို ဘယ်လို ရှုမှတ်ရမလဲ။",
  "ဝိပဿနာကို တစ်နေ့ ဘယ်လောက်ကြာအောင် အားထုတ်သင့်သလဲ။",
  "တရားစခန်းတွေ ဝင်ဖို့ လိုအပ်သလား၊ ကိုယ့်ဘာသာ အိမ်မှာ အားထုတ်လို့ရလား။",
  "နာမ်တရား (စိတ်) နဲ့ ရုပ်တရား (ခန္ဓာ) ကို ဘယ်လို ခွဲခြား ရှုမှတ်ရမလဲ",
  "တရားအားထုတ်ဖို့ အသက်အရွယ် ကန့်သတ်ချက် ရှိသလား"
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
          နမူနာမေးခွန်းများ
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

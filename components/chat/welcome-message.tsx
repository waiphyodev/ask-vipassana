"use client"

import { FadeIn } from "@/components/ui/animation-wrapper"
import { CardBlur } from "@/components/ui/blur-container"

export function WelcomeMessage() {
  return (
    <FadeIn duration={1.5} className="mb-8">
      <CardBlur className="text-center p-6">
        <h2 className="text-xl font-medium mb-3">ဝိပဿနာ အမေးအဖြေ</h2>
        <p className="text-sm leading-loose text-muted-foreground mb-4">
          ဝိပဿနာတရားကျင့်စဉ်နဲ့ ဗုဒ္ဓတရားတော်တွေအကြောင်းကို လွတ်လပ်စွာ မေးမြန်းနိုင်ပါတယ်။
        </p>
        <p className="text-sm leading-loose text-muted-foreground">
          ပြောဆိုထားတဲ့ အချက်အလတ်တွေကို ကိုယ်ရေးကိုယ်တာ လုံခြုံမှုအတွက် (ဖုန်း/ကွန်ပြူတာ) ပေါ်မှာပဲ သိမ်းဆည်းထားပြီး အချိန်တစ်ခုကြာအောင် အသုံးမပြုဘဲနေရင် အလိုအလျောက် ဖျက်ပေးသွားမှာ ဖြစ်ပါတယ်။
        </p>
      </CardBlur>
    </FadeIn>
  )
}

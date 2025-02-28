import { NextResponse } from "next/server"
import type { Message } from "@/components/chat/chat-container"

if (!process.env.N8N_WEBHOOK_URL) {
  throw new Error("Missing N8N_WEBHOOK_URL environment variable")
}

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL as string

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json()

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        history: history.map((msg: Message) => ({
          role: msg.role,
          content: msg.content,
        })),
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to get response from N8N")
    }

    const data = await response.json()

    return NextResponse.json({
      message: data.message || "I apologize, but I'm having trouble understanding. Could you please rephrase your question?",
    })
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json(
      {
        message: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
      },
      { status: 500 }
    )
  }
}

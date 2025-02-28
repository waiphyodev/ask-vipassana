import { NextResponse } from "next/server"
import type { Message } from "@/components/chat/chat-container"

if (!process.env.NEXT_N8N_API_ENDPOINT) {
  throw new Error("Missing NEXT_N8N_API_ENDPOINT environment variable")
}
if (!process.env.NEXT_N8N_API_TOKEN) {
  throw new Error("Missing NEXT_N8N_API_TOKEN environment variable")
}

const NEXT_N8N_API_ENDPOINT = process.env.NEXT_N8N_API_ENDPOINT as string

export async function POST(req: Request) {
  try {
    const { chatInput, history } = await req.json()

    const response = await fetch(NEXT_N8N_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_N8N_API_TOKEN}`,
      },
      body: JSON.stringify({
        chatInput,
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
    let output = data.response.text

    // Remove any <think> tags from the output
    if (output) {
      output = output.replace(/<think>[\s\S]*?<\/think>/g, '').trim()
    }

    return NextResponse.json({
      message: output || "I apologize, but I'm having trouble understanding. Could you please rephrase your question?",
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

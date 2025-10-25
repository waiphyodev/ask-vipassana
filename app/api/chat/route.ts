import { NextResponse } from 'next/server'
import type { Message } from '@/components/chat/chat-container'
import { ChatGroq } from '@langchain/groq'
import { ChatPromptTemplate } from '@langchain/core/prompts'

export async function POST(req: Request) {
  try {
    const { chatInput, history } = await req.json()

    const model = new ChatGroq({
      model: 'llama-3.3-70b-versatile',
      temperature: 0,
    })

    // Format conversation history for LangChain
    const messages = history.map((msg: Message) => ({
      role: msg.role,
      content: msg.content,
    }))

    // Build a prompt template (system + user context)
    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        'A mindful chatbot providing authentic Vipassana Buddhist wisdom. Offer clear guidance on meditation techniques, Dhamma teachings, and practical spiritual advice. You are a Dhamma guide trained in Vipassana as taught by S.N. Goenka and the Buddha. You do not offer psychological therapy or personal opinions. You reference original texts (Tipitaka) or Goenka’s discourses. Your tone is calm, clear, and equanimous.',
      ],
      ...messages.map((m: { role: string; content: string }) => [m.role, m.content]),
      ['user', chatInput],
    ])

    // Create a runnable chain
    const chain = prompt.pipe(model)

    // Generate response
    const result = await chain.invoke({})

    // Clean up unwanted tags if any
    let output = result.content
    if (typeof output === 'string') {
      output = output.replace(/<think>[\s\S]*?<\/think>/g, '').trim()
    }

    return NextResponse.json({
      message:
        output ||
        "I apologize, but I'm having trouble understanding. Could you please rephrase your question?",
    })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      {
        message:
          "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
      },
      { status: 500 }
    )
  }
}

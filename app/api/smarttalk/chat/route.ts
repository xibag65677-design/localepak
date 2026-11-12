import { NextRequest, NextResponse } from 'next/server'

const OPENAI_API_KEY = process.env.AI_INTEGRATIONS_OPENAI_API_KEY
const OPENAI_BASE_URL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL || 'https://api.openai.com/v1'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

const SYSTEM_PROMPT = `You are LocalePak Assistant, a helpful AI assistant for LocalePak - Pakistan's premier business directory platform. 

Your responsibilities:
1. Help users list their business on the platform by guiding them through a structured consultation
2. Answer questions about how the directory works
3. Provide information about business listing benefits and features
4. Be friendly, professional, and conversational
5. Use Urdu-friendly responses where appropriate for local context

Key Information:
- LocalePak is a free business listing directory covering all cities in Pakistan
- Businesses get published within 1-2 hours after administrative review
- Listings include business info, contact numbers, location, and services
- Users can update their listings anytime
- No hidden fees or charges

When users express intent to list their business, the consultation flow will guide them through questions to collect business details.

Be encouraging, responsive, and solve problems. If users have concerns, offer to connect them via WhatsApp (+92 334 563 6230) or email (admin@localepak.com).`

async function streamOpenAIResponse(
  messages: Message[],
  res: NextResponse
) {
  try {
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured')
    }

    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.7,
        max_tokens: 500,
        stream: true,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    if (!reader) {
      throw new Error('No response body from OpenAI')
    }

    // Send SSE stream headers
    const encoder = new TextEncoder()
    const textStream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            const lines = chunk.split('\n')

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6)
                if (data === '[DONE]') {
                  controller.enqueue(encoder.encode('data: {"done": true}\n\n'))
                  continue
                }

                try {
                  const json = JSON.parse(data)
                  const content = json.choices?.[0]?.delta?.content || ''
                  if (content) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                    )
                  }
                } catch {}
              }
            }
          }

          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(textStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Error calling OpenAI:', error)
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    const encoder = new TextEncoder()

    return new Response(
      encoder.encode(
        `data: ${JSON.stringify({ error: errorMessage, done: true })}\n\n`
      ),
      {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages must be an array' },
        { status: 400 }
      )
    }

    return await streamOpenAIResponse(messages, NextResponse.json({}))
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

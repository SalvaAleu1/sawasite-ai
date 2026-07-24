import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert full-stack web developer. Generate clean, modern, responsive HTML/Tailwind CSS code based on the user prompt. Return ONLY valid JSON with keys: "title", "description", and "htmlCode". Do not wrap response in markdown codeblocks.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    })

    const content = response.choices[0]?.message?.content || '{}'
    const data = JSON.parse(content)

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('Error generating site:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate website' },
      { status: 500 }
    )
  }
}
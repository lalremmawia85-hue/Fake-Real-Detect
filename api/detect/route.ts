import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.formData()
  const image: File | null = data.get('image') as unknown as File
  if (!image) return Response.json({ error: 'No image' }, { status: 400 })

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  const result = await model.generateContent([
    'You are a forensic expert. Is this image AI generated or real? Return ONLY JSON: {verdict: REAL or FAKE, confidence: 0-100, reasons: [5 short reasons]}. Check fingers, eyes, text, skin, lighting.',
    { inlineData: { data: buffer.toString('base64'), mimeType: image.type } }
  ])
  
  const text = result.response.text().replace(/```json|```/g, '')
  return Response.json(JSON.parse(text))
    }

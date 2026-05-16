import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file = data.get('file') as File
  
  if (!file) {
    return NextResponse.json({ error: 'File a awm lo' }, { status: 400 })
  }

  const formData = new FormData()
  formData.append('media', file)
  formData.append('models', 'genai')
  formData.append('api_user', 'YOUR_API_USER')
  formData.append('api_secret', 'YOUR_API_SECRET')

  try {
    const res = await fetch('https://api.sightengine.com/1.0/check.json', {
      method: 'POST',
      body: formData
    })
    const result = await res.json()
    
    const aiScore = result.type?.ai_generated || 0
    const isFake = aiScore > 0.5

    return NextResponse.json({
      isFake: isFake,
      confidence: Math.round(aiScore * 100),
      message: isFake ? 'FAKE ni maithei - AI siam a ang' : 'REAL a ang ber'
    })
  } catch (error) {
    return NextResponse.json({ error: 'API error' }, { status: 500 })
  }
}

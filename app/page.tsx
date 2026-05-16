'use client'
import { useState } from 'react'

export default function Home() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function checkImage(e: any) {
    const file = e.target.files[0]
    if (!file) return
    setLoading(true)
    const formData = new FormData()
    formData.append('image', file)
    const res = await fetch('/api/detect', { method: 'POST', body: formData })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold my-8">Fake or Real Detector</h1>
      <input type="file" onChange={checkImage} className="mb-8" accept="image/*" />
      {loading && <p>Checking...</p>}
      {result && (
        <div className={`p-8 rounded-xl text-center ${result.verdict === 'REAL'? 'bg-green-600' : 'bg-red-600'}`}>
          <h2 className="text-5xl font-bold">{result.verdict}</h2>
          <p className="text-xl">{result.confidence}% Confidence</p>
          <ul className="mt-4 text-left">{result.reasons?.map((r: string, i: number) => <li key={i}>✓ {r}</li>)}</ul>
        </div>
      )}
    </main>
  )
}

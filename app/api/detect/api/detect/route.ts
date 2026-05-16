import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = "Analyze this image and tell me if it's AI-generated or real. Reply in JSON format with two fields: 'result' which is either 'AI-Generated' or 'Real', and 'confidence' which is a percentage from 0-100.";
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: image.split(',')[1],
          mimeType: "image/jpeg"
        }
      }
    ]);
    
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const data = JSON.parse(jsonMatch![0]);
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to analyze" }, { status: 500 });
  }
      }

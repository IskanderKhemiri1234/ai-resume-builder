import { NextResponse } from 'next/server';
import { callOpenRouter } from '@/lib/openrouter';

export async function POST(request) {
  try {
    const { prompt, model } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // استدعاء الذكاء الاصطناعي عبر OpenRouter
    const aiResponse = await callOpenRouter(prompt, model);

    return NextResponse.json({ success: true, data: aiResponse });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

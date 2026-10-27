// src/lib/openrouter.ts

export async function callOpenRouter(prompt: string, model: string = "openai/gpt-3.5-turbo") {
  const apiKey = process.env.OPENROUTER_API_KEY_1; // استخدام المفتاح الأول من ملف البيئة

  if (!apiKey) {
    throw new Error("Missing OpenRouter API Key in environment variables.");
  }

  const response =="https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      "X-Title": "Khemiri Career AI",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: "system", content: "You are an expert career consultant for Khemiri Career AI platform." },
        { role: "user", content: prompt }
      ]
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`OpenRouter API Error: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

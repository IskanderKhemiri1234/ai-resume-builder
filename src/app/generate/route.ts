
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_LENGTH = 12000;

function cleanText(value: unknown, maxLength = 3000): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

export async function POST(req: Request) {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI service is not configured. Please try again later.' },
        { status: 503 }
      );
    }

    const contentLength = Number(req.headers.get('content-length') || 0);

    if (contentLength > MAX_LENGTH) {
      return NextResponse.json(
        { error: 'Your request is too long. Please shorten it.' },
        { status: 413 }
      );
    }

    const body: unknown = await req.json();

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Invalid request data.' },
        { status: 400 }
      );
    }

    const input = body as Record<string, unknown>;

    const fullName = cleanText(input.fullName, 120);
    const targetJob = cleanText(input.targetJob, 200);
    const language = cleanText(input.language, 40) || 'English';
    const tone = cleanText(input.tone, 40) || 'Professional';
    const experience = cleanText(input.experience, 3000);
    const skills = cleanText(input.skills, 2000);
    const jobDescription = cleanText(input.jobDescription, 4000);
    const documentType = cleanText(input.documentType, 30).toLowerCase();

    const allowedTypes = ['resume', 'cover', 'linkedin'];

    if (!allowedTypes.includes(documentType)) {
      return NextResponse.json(
        { error: 'Please select a valid document type.' },
        { status: 400 }
      );
    }

    if (!targetJob || (!experience && !skills)) {
      return NextResponse.json(
        {
          error:
            'Enter your target job and provide your experience or at least one skill.',
        },
        { status: 400 }
      );
    }

    const documentInstructions: Record<string, string> = {
      resume:
        'Create an ATS-friendly resume draft with a professional summary, relevant experience, skills, and education only if provided. Use clear headings and concise bullet points.',
      cover:
        'Write a tailored cover letter for the target job. Include a suitable greeting, opening, relevant skills and experience, motivation, and professional closing. Do not invent company details.',
      linkedin:
        'Create LinkedIn profile content including a headline, About section, key skills, and suggested experience wording based only on the supplied facts.',
    };

    const controller = new AbortController();
    timeout = setTimeout(() => controller.abort(), 25000);

    let response: Response;

    try {
      response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'X-Title': 'ResuMaker AI',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
            messages: [
              {
                role: 'system',
                content:
                  'You are a professional career-writing assistant. Write useful, truthful, ATS-friendly career content. Never invent employers, degrees, dates, certifications, achievements, or qualifications. If details are missing, omit them or use clearly marked placeholders. Follow the requested language and tone. Return plain text with clear headings.',
              },
              {
                role: 'user',
                content: `Create the following document: ${documentType.toUpperCase()}.

Instructions:
${documentInstructions[documentType]}

Output language: ${language}
Writing tone: ${tone}
Full name: ${fullName || 'Not provided'}
Target job: ${targetJob}
Experience and career history:
${experience || 'Not provided'}
Skills:
${skills || 'Not provided'}
Job advertisement or description:
${jobDescription || 'Not provided'}

Use the job description to tailor the content when available. Do not claim the applicant has qualifications or experience that were not supplied. Return only the requested document.`,
              },
            ],
            temperature: 0.5,
            max_tokens: 2200,
          }),
          signal: controller.signal,
        }
      );
    } finally {
      if (timeout) clearTimeout(timeout);
    }

    const data: unknown = await response.json().catch(() => null);

    if (!response.ok) {
      console.error('OpenRouter request failed:', response.status);

      return NextResponse.json(
        {
          error:
            response.status === 429
              ? 'Too many requests. Please try again shortly.'
              : 'AI generation failed. Check the AI service configuration and try again.',
        },
        { status: response.status === 429 ? 429 : 502 }
      );
    }

    const resultData = data as {
      choices?: Array<{
        message?: { content?: string | Array<{ text?: string }> };
      }>;
    } | null;

    const content = resultData?.choices?.[0]?.message?.content;

    const result =
      typeof content === 'string'
        ? content.trim()
        : Array.isArray(content)
          ? content.map((item) => item.text || '').join('\n').trim()
          : '';

    if (!result) {
      return NextResponse.json(
        { error: 'The AI returned no usable content. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ result });
  } catch (error: unknown) {
    if (timeout) clearTimeout(timeout);

    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'AI generation timed out. Please try again.' },
        { status: 504 }
      );
    }

    console.error('Career document generation failed:', error);

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

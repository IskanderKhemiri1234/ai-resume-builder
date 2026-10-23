export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, jobTitle, experience, skills, language, tone } = req.body;

  const targetLang = language === 'en' ? 'English' : 'Arabic';
  const toneStyle = tone === 'creative' ? 'Creative & Enthusiastic' : tone === 'concise' ? 'Concise & Bullet-pointed' : 'Professional & Corporate';

  const prompt = `You are an expert resume builder and HR consultant.
Create a concise, ATS-friendly resume for:
- Name: ${name}
- Target Job Title: ${jobTitle}
- Work Experience: ${experience}
- Skills: ${skills}

Output Language: ${targetLang}
Tone: ${toneStyle}

Include:
1. Short Summary
2. Key Experience & Achievements
3. Core Skills
4. 3 Quick Interview Tips

Keep the response clear and strictly formatted in Markdown.`;

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY non défini sur Vercel' });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 800,
          temperature: 0.7
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || 'Erreur lors du traitement par Gemini' });
    }

    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      const generatedText = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ result: generatedText });
    } else {
      return res.status(500).json({ error: 'Aucun texte généré reçu' });
    }

  } catch (error) {
    return res.status(500).json({ error: 'Erreur de connexion au serveur: ' + error.message });
  }
}

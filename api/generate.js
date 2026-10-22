export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, jobTitle, experience, skills } = req.body;

  const prompt = `قم بإنشاء سيرة ذاتية احترافية ومنظمة باللغة العربية للبيانات التالية:
- الاسم: ${name}
- المسمى الوظيفي: ${jobTitle}
- الخبرات والمسار المهني: ${experience}
- المهارات التقنية والشخصية: ${skills}

اجعل السيرة الذاتية تتضمن:
1. ملخص مهني جذاب (Professional Summary).
2. أهم المسؤوليات والإنجازات للخبرات المذكورة.
3. المهارات مصنفة بشكل رئيسي.
4. نصائح سريعة للمقابلة الشخصية.`;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY غير معرف في Vercel' });
    }

    // التحديث إلى النموذج الجديد gemini-3.8-flash
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || 'خطأ من Gemini API' });
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    return res.status(200).json({ result: generatedText });

  } catch (error) {
    return res.status(500).json({ error: 'خطأ داخلي في الخادم' });
  }
}

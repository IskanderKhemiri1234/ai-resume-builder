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
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || 'خطأ من OpenAI' });
    }

    return res.status(200).json({ result: data.choices[0].message.content });
  } catch (error) {
    return res.status(500).json({ error: 'خطأ داخلي في الخادم' });
  }
}

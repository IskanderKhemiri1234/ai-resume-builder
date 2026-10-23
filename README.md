# 🚀 AI Resume Builder - مولّد السير الذاتية بالذكاء الاصطناعي

تطبيق ويب (Micro-SaaS) ذكي وسريع لتوليد سير ذاتية احترافية ومتوافقة مع أنظمة الفرز الآلي (ATS) باستخدام نموذج الذكاء الاصطناعي Google Gemini.

---

## ✨ المميزات الرئيسيّة (Features)

* 🌐 **دعم متعدد اللغات:** إمكانية إنشاء السيرة الذاتية باللغتين العربية والإنجليزية.
* 🎯 **تخصيص نبرة الصياغة:** خيارات متنوعة بين (احترافية رسمية، إبداعية وحماسية، وموجزة ومباشرة).
* ⚡ **سرعة استجابة عالية:** يعتمد على Vercel Serverless Functions لمعالجة الطلبات بدون خادم دائم.
* 📱 **واجهة متجاوبة بالكامل:** تصميم حديث وأنيق باستخدام Tailwind CSS يعمل بكفاءة على كافة الأجهزة والهواتف.
* 📋 **نسخ بنقرة واحدة:** إمكانية نسخ السيرة الذاتية المنسقة مباشرة لاستخدامها فوراً.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

* **Frontend:** HTML5, Tailwind CSS, JavaScript (ES6+), Marked.js.
* **Backend:** Vercel Serverless Functions (Node.js).
* **AI Model:** Google Gemini API (`gemini-3.8-flash`).
* **Deployment:** Vercel.

---

## 📂 هيكل المشروع (Project Structure)

```text
├── api/
│   └── generate.js     # Vercel Serverless Function (Gemini API Integration)
├── public/
│   └── index.html      # Frontend Application (Tailwind CSS & JavaScript)
└── README.md

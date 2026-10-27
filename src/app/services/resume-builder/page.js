'use client';
import { useState } from 'react';

export default function ResumeBuilderPage() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/generate-career-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model: 'openai/gpt-3.5-turbo' }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setResult(data.data);
      if (data.remainingBalance !== undefined) {
        setBalance(data.remainingBalance);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">🚀 صانع السيرة الذاتية الذكي</h1>
      {balance !== null && <p className="mb-4 text-green-600 font-semibold">رصيدك الحالي: {balance} نقاط</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        صف خبرتك أو مهامك لنقوم بصياغتها احترافياً:
        <textarea
          className="w-full p-3 border rounded-lg h-32"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="اكتب تفاصيل خبرتك هنا..."
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'جاري المعالجة والخصم...' : 'إنشاء المحتوى'}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 border rounded-lg whitespace-pre-wrap">
          <h2 className="font-bold mb-2">النتيجة:</h2>
          {result}
        </div>
      )}
    </div>
  );
}

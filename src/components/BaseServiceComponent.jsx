'use client';
import { useState } from 'react';

export default function BaseServiceComponent({ title, description, placeholder }) {
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
      if (!res.ok) throw new Error(data.error || 'حدث خطأ ما');

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
    <div className="max-w-2xl mx-auto p-6 font-sans text-right" dir="rtl">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      
      {balance !== null && <p className="mb-4 text-green-600 font-semibold">رصيدك الحالي: {balance} نقاط</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-3 border rounded-lg h-32 text-right"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-bold"
        >
          {loading ? 'جاري المعالجة والخصم...' : 'بدء التوليد والتحليل (خصم 1 نقطة)'}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 border rounded-lg whitespace-pre-wrap text-right">
          <h2 className="font-bold mb-2 text-blue-700">النتيجة الاحترافية:</h2>
          {result}
        </div>
      )}
    </div>
  );
}

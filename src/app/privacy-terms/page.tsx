import React from 'react';

export default function PrivacyTerms() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 py-16 px-6 sm:px-12 lg:px-24 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Privacy Policy & Terms of Service
          </h1>
          <p className="text-slate-400 text-sm">
            Last Updated: October 2026 | Effective Date: Immediately
          </p>
        </header>

        {/* Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
          <p className="leading-relaxed">
            Welcome to <span className="text-indigo-400 font-medium">ResuMaker AI</span> ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy.
          </p>
        </section>

        {/* Data Collection */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">2. Information We Collect</h2>
          <p className="leading-relaxed">
            We collect personal data that you voluntarily provide to us when creating a resume, including your name, employment history, and education.
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-400">
            <li>AI-generated content is processed securely and never sold to third parties.</li>
            <li>Fully compliant with GDPR and CCPA privacy standards.</li>
          </ul>
        </section>

        {/* Payments & PayPal */}
        <section className="space-y-4 border-t border-slate-800 pt-8">
          <h2 className="text-2xl font-semibold text-white">3. Payments & Refund Policy</h2>
          <p className="leading-relaxed">
            All payment transactions are processed securely through trusted third-party providers, including <span className="text-blue-400 font-medium">PayPal</span>.
          </p>
        </section>

        {/* Advertising */}
        <section className="space-y-4 border-t border-slate-800 pt-8">
          <h2 className="text-2xl font-semibold text-white">4. Advertising & Cookies</h2>
          <p className="leading-relaxed">
            We may display non-intrusive ads via providers such as <span className="text-amber-400 font-medium">Google AdSense</span> to support our free features.
          </p>
        </section>

        {/* Contact Information */}
        <footer className="border-t border-slate-800 pt-8 text-center space-y-2">
          <p className="text-slate-400">Support & Inquiries:</p>
          <p className="text-indigo-400 font-medium">support@khemiri-resumaker-ai.vercel.app</p>
          <p className="text-xs text-slate-600 mt-6">
            <a 
  href="/privacy-terms" 
  className="text-slate-400 hover:text-white transition-colors text-sm"
>
  Privacy Policy & Terms
</a>

            &copy; 2026 ResuMaker AI. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

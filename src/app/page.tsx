'use client';

import React, { useState } from 'react';

export default function ResuMakerPlatform() {
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [language, setLanguage] = useState('English (US)');
  const [tone, setTone] = useState('Executive C-Level');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('resume');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('ResuMaker AI: Career Package Generated Successfully!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#030307] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white antialiased overflow-x-hidden flex flex-col items-center">
      
      {/* Top Announcement Bar */}
      <div className="w-full bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-950 border-b border-indigo-500/30 py-3 px-4 text-center text-xs font-black text-indigo-200 tracking-widest uppercase shadow-lg">
        ✨ Powered by Khemiri AI Engine — Global Recruitment Standard for US, UK & Europe
      </div>

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 flex items-center justify-center font-black text-white text-2xl shadow-[0_0_35px_rgba(79,70,229,0.7)]">
            R
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-white block leading-none">
              ResuMaker <span className="text-indigo-400">AI</span>
            </span>
            <span className="text-[11px] tracking-[0.25em] text-slate-400 font-extrabold uppercase block mt-1.5">
              Powered by Khemiri
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-10 text-sm font-bold text-slate-300">
          <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
          <a href="#generator" className="hover:text-indigo-400 transition-colors">AI Engine</a>
          <a href="#pricing" className="hover:text-indigo-400 transition-colors">Global Pricing</a>
          <a href="#testimonials" className="hover:text-indigo-400 transition-colors">Success Stories</a>
        </nav>

        <div className="flex items-center space-x-4">
          <a href="#signin" className="hidden sm:inline-block text-xs font-extrabold text-slate-300 hover:text-white px-5 py-3 transition-colors">
            Sign In
          </a>
          <a href="#generator" className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/50 transition-all">
            Get Started Free
          </a>
        </div>
      </header>

      {/* Hero & Generator */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
          <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-extrabold tracking-wider uppercase shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping"></span>
            <span>Western Corporate Standard</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">
            Career Path <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Platform Elite
            </span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl max-w-xl font-normal leading-relaxed">
            Architect your elite executive resume, high-converting cover letter, and optimize your LinkedIn profile with world-class global standards engineered by Khemiri.
          </p>

          <div className="grid grid-cols-3 gap-6 w-full pt-6">
            <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-center shadow-2xl">
              <div className="text-2xl lg:text-3xl font-black text-white">+14.5K</div>
              <div className="text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-wider">Elite CVs</div>
            </div>
            <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-center shadow-2xl">
              <div className="text-2xl lg:text-3xl font-black text-white">99.8%</div>
              <div className="text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-wider">Success Rate</div>
            </div>
            <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-center shadow-2xl">
              <div className="text-2xl lg:text-3xl font-black text-white">100%</div>
              <div className="text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-wider">ATS Pass</div>
            </div>
          </div>
        </div>

        {/* Right Column (Generator) */}
        <div className="lg:col-span-6 w-full" id="generator">
          <div className="p-8 sm:p-12 rounded-[3rem] bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950 border border-slate-800/90 shadow-[0_30px_100px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
            
            <div className="flex space-x-2 bg-slate-950 p-1.5 rounded-2xl mb-8 border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab('resume')}
                className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${activeTab === 'resume' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                Resume ATS
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('cover')}
                className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${activeTab === 'cover' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                Cover Letter
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('linkedin')}
                className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${activeTab === 'linkedin' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                LinkedIn
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 mb-2.5 uppercase tracking-wider">Full Name & Credentials</label>
                <input
                  type="text"
                  placeholder="e.g. Iskandar Khemiri, MBA"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-[#020617] border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm transition-all shadow-inner"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 mb-2.5 uppercase tracking-wider">Target Position</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Principal AI Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-[#020617] border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm transition-all shadow-inner"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 mb-2.5 uppercase tracking-wider">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-[#020617] border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 text-sm cursor-pointer shadow-inner"
                  >
                    <option value="English (US)">English (US / UK Standard)</option>
                    <option value="French">French (European Corporate)</option>
                    <option value="Arabic">Arabic (GCC Standard)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 mb-2.5 uppercase tracking-wider">Executive Tone</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-[#020617] border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 text-sm cursor-pointer shadow-inner"
                  >
                    <option value="Executive C-Level">Executive C-Level</option>
                    <option value="Modern Corporate">Modern Corporate</option>
                    <option value="Creative Tech">Creative Tech</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 mb-2.5 uppercase tracking-wider">Career Milestones</label>
                <textarea
                  rows={4}
                  placeholder="Summarize your achievements..."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-[#020617] border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm resize-none shadow-inner"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 mb-2.5 uppercase tracking-wider">Core Skills</label>
                <input
                  type="text"
                  placeholder="e.g. Next.js, AI Architecture, Leadership"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-[#020617] border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-6 py-5 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:opacity-95 text-white font-black text-base shadow-[0_20px_50px_rgba(79,70,229,0.5)] transition-all uppercase tracking-wider flex items-center justify-center"
              >
                {isProcessing ? 'Processing...' : '🚀 Start Instant Generation'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 border-t border-slate-800/80" id="pricing">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">Transparent Pricing</h2>
          <p className="text-slate-400 text-lg">Integrated with PayPal & Stripe infrastructure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 lg:p-10 rounded-[3rem] bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">Starter</div>
              <div className="text-5xl font-black text-white mb-4">$9<span className="text-sm text-slate-400 font-normal"> / one-time</span></div>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">Ideal for single professional applications.</p>
            </div>
            <button className="w-full py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 font-bold text-sm text-white transition-all">
              Pay with PayPal
            </button>
          </div>

          <div className="p-8 lg:p-10 rounded-[3rem] bg-gradient-to-b from-indigo-950/80 to-slate-900 border-2 border-indigo-500/80 flex flex-col justify-between relative shadow-[0_20px_70px_rgba(79,70,229,0.3)]">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-black uppercase shadow-xl">
              Most Popular
            </div>
            <div>
              <div className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">Professional</div>
              <div className="text-5xl font-black text-white mb-4">$29<span className="text-sm text-slate-400 font-normal"> / bundle</span></div>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">Full suite: Resume, Cover Letter, and LinkedIn Optimization.</p>
            </div>
            <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 font-bold text-sm text-white transition-all">
              Pay via PayPal & Stripe
            </button>
          </div>

          <div className="p-8 lg:p-10 rounded-[3rem] bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">Executive</div>
              <div className="text-5xl font-black text-white mb-4">$59<span className="text-sm text-slate-400 font-normal"> / unlimited</span></div>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">Unlimited generations with priority AI routing.</p>
            </div>
            <button className="w-full py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 font-bold text-sm text-white transition-all">
              Pay with PayPal
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 border-t border-slate-800/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>&copy; 2026 ResuMaker AI Platform (Powered by Khemiri). All rights reserved.</div>
        <div className="flex space-x-8">
          <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
        </div>
      </footer>

    </div>
  );
}

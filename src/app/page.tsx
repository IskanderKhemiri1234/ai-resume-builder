'use client';

import React, { useState } from 'react';

export default function ResuMakerUltimateMasterpiece() {
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [language, setLanguage] = useState('English (US)');
  const [tone, setTone] = useState('Executive');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('ResuMaker AI: Elite Global Career Package Generated Successfully!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050507] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white antialiased overflow-x-hidden">
      
      {/* Top Announcement / Trust Bar */}
      <div className="w-full bg-gradient-to-r from-indigo-900/60 via-purple-900/60 to-slate-900/60 border-b border-indigo-500/20 py-2.5 px-4 text-center text-xs font-semibold text-indigo-200 tracking-wider">
        ✨ Powered by Khemiri AI — Trusted by Top Professionals in US, UK & Europe
      </div>

      {/* Main Navigation Header */}
      <header className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center font-black text-white text-xl shadow-[0_0_25px_rgba(79,70,229,0.5)]">
            R
          </div>
          <div>
            <span className="text-xl lg:text-2xl font-black tracking-tight text-white block">
              ResuMaker <span className="text-indigo-400">AI</span>
            </span>
            <span className="text-[10px] tracking-widest text-slate-400 font-bold uppercase block -mt-1">
              Powered by Khemiri
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-10 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-indigo-400 transition-colors">Global Pricing</a>
          <a href="#testimonials" className="hover:text-indigo-400 transition-colors">Testimonials</a>
          <a href="#standards" className="hover:text-indigo-400 transition-colors">ATS Standard</a>
        </nav>

        <div className="flex items-center space-x-4">
          <a href="#signin" className="hidden sm:inline-block text-xs font-bold text-slate-300 hover:text-white px-4 py-2.5 transition-colors">
            Sign In
          </a>
          <a href="#generator" className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all">
            Get Started Free
          </a>
        </div>
      </header>

      {/* Hero Section & Interactive Generator Hub */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Brand Pitch & Wide Spacious Stats */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
          
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold tracking-wide shadow-inner">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            <span>Next-Gen Western Recruitment Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">
            Career Path <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Platform Elite
            </span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl max-w-xl font-normal leading-relaxed">
            Architect your elite executive resume, high-converting cover letter, and optimize your LinkedIn profile with world-class global standards.
          </p>

          {/* Wide Spacious Stats Cards */}
          <div className="grid grid-cols-3 gap-4 w-full pt-4">
            <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 text-center shadow-xl">
              <div className="text-2xl lg:text-3xl font-black text-white">+14.5K</div>
              <div className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Elite CVs</div>
            </div>
            <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 text-center shadow-xl">
              <div className="text-2xl lg:text-3xl font-black text-white">99.8%</div>
              <div className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Success Rate</div>
            </div>
            <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 text-center shadow-xl">
              <div className="text-2xl lg:text-3xl font-black text-white">100%</div>
              <div className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">ATS Pass</div>
            </div>
          </div>
        </div>

        {/* Right Column: High-End Generator Form */}
        <div className="lg:col-span-6 w-full" id="generator">
          <div className="p-8 sm:p-10 lg:p-12 rounded-[2.5rem] bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950 border border-slate-800/90 shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  AI Career Builder
                </h3>
                <p className="text-xs text-slate-400 mt-1">Configure your parameters for instant generation</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                Online
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Iskandar Khemiri"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-[#020617] border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 text-sm transition-all shadow-inner"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                  Target Job Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior Principal AI Architect"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-[#020617] border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 text-sm transition-all shadow-inner"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-[#020617] border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 text-sm cursor-pointer shadow-inner"
                  >
                    <option value="English (US)">English (US / UK)</option>
                    <option value="French">French (FR)</option>
                    <option value="Arabic">Arabic (AR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                    Writing Tone
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-[#020617] border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 text-sm cursor-pointer shadow-inner"
                  >
                    <option value="Executive">Executive C-Level</option>
                    <option value="Modern">Modern Corporate</option>
                    <option value="Creative">Creative Tech</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                  Experience & Career Summary
                </label>
                <textarea
                  rows={4}
                  placeholder="Highlight your key achievements and background..."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-[#020617] border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm resize-none shadow-inner"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                  Technical & Soft Skills
                </label>
                <input
                  type="text"
                  placeholder="e.g. Next.js, AI Architecture, Leadership, Cloud"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-[#020617] border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 py-5 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:opacity-95 text-white font-black text-base shadow-[0_15px_35px_rgba(79,70,229,0.5)] transition-all transform active:scale-[0.99] tracking-wide flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>Processing AI Generation...</span>
                ) : (
                  <span>🚀 Start Instant AI Generation</span>
                )}
              </button>
            </form>
          </div>
        </div>

      </section>

      {/* Global Pricing Section (PayPal & Stripe Ready) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-t border-slate-800/80" id="pricing">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Transparent Global Pricing
          </h2>
          <p className="text-slate-400 text-base lg:text-lg">
            Secure international checkouts powered by PayPal & Stripe infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 lg:p-10 rounded-[2.5rem] bg-slate-900/50 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Starter Tier</div>
              <div className="text-4xl lg:text-5xl font-black text-white mb-4">$9<span className="text-sm text-slate-400 font-normal"> / one-time</span></div>
              <p className="text-slate-400 text-sm mb-8">Ideal for single professional job applications with ATS standard formatting.</p>
            </div>
            <button className="w-full py-4 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-sm text-white transition-all shadow-md">
              Pay with PayPal
            </button>
          </div>

          <div className="p-8 lg:p-10 rounded-[2.5rem] bg-gradient-to-b from-indigo-950/60 to-slate-900 border-2 border-indigo-500/60 flex flex-col justify-between relative shadow-2xl">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-5 py-1.5 rounded-full bg-indigo-600 text-white text-[11px] font-black tracking-widest uppercase shadow-lg">
              Most Popular Elite
            </div>
            <div>
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Professional Suite</div>
              <div className="text-4xl lg:text-5xl font-black text-white mb-4">$29<span className="text-sm text-slate-400 font-normal"> / bundle</span></div>
              <p className="text-slate-400 text-sm mb-8">Complete suite: Elite Resume, Tailored Cover Letter, and Full LinkedIn Optimization.</p>
            </div>
            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:opacity-95 font-bold text-sm text-white transition-all shadow-xl shadow-indigo-600/30">
              Pay via PayPal & Stripe
            </button>
          </div>

          <div className="p-8 lg:p-10 rounded-[2.5rem] bg-slate-900/50 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Executive Access</div>
              <div className="text-4xl lg:text-5xl font-black text-white mb-4">$59<span className="text-sm text-slate-400 font-normal"> / unlimited</span></div>
              <p className="text-slate-400 text-sm mb-8">Unlimited generations with priority AI routing and professional expert reviews.</p>
            </div>
            <button className="w-full py-4 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-sm text-white transition-all shadow-md">
              Pay with PayPal
            </button>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-t border-slate-800/80" id="testimonials">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Loved by Job Seekers Worldwide
          </h2>
          <p className="text-slate-400 text-base">Verified reviews from elite professionals across North America and Europe.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-[2rem] bg-slate-900/60 border border-slate-800/80 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 mb-4 space-x-1">★★★★★</div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">"The ATS compatibility feature completely transformed my job hunt in New York. Recruiters started messaging me directly within 48 hours!"</p>
            </div>
            <div>
              <div className="font-bold text-white text-sm">Sarah Miller</div>
              <div className="text-slate-500 text-xs">Marketing Director, New York</div>
            </div>
          </div>

          <div className="p-8 rounded-[2rem] bg-slate-900/60 border border-slate-800/80 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 mb-4 space-x-1">★★★★★</div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">"Building a world-class executive resume and cover letter took less than 3 minutes. Powered by Khemiri AI is an absolute technological masterpiece."</p>
            </div>
            <div>
              <div className="font-bold text-white text-sm">Sami Ben Ali</div>
              <div className="text-slate-500 text-xs">Senior Software Architect, London</div>
            </div>
          </div>

          <div className="p-8 rounded-[2rem] bg-slate-900/60 border border-slate-800/80 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 mb-4 space-x-1">★★★★★</div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">"The LinkedIn profile optimization modules gave my professional network 5x more organic reach and recruiter traffic across Europe."</p>
            </div>
            <div>
              <div className="font-bold text-white text-sm">Ahmad Khemiri</div>
              <div className="text-slate-500 text-xs">Principal Business Analyst, Paris</div>
            </div>
          </div>

        </div>
      </section>

      {/* Global Footer */}
      <footer className="max-w-7xl mx-auto px-6 lg:px-12 py-12 border-t border-slate-800/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>&copy; 2026 ResuMaker AI Platform (Powered by Khemiri). All rights reserved.</div>
        <div className="flex space-x-8">
          <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          <a href="#support" className="hover:text-slate-300 transition-colors">Global Support</a>
        </div>
      </footer>

    </div>
  );
}

'use client';

import React, { useState } from 'react';

export default function ResuMakerMasterpieceGlobal() {
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [language, setLanguage] = useState('English');
  const [tone, setTone] = useState('Modern');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('ResuMaker AI: Elite global career package generation initiated successfully!');
  };

  return (
    <div className="min-h-screen bg-[#070709] text-slate-100 flex flex-col items-center px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden">
      
      {/* Top Header - Global Standards with Powered by Khemiri & Actions */}
      <header className="w-full max-w-7xl flex items-center justify-between py-6 border-b border-slate-800/60">
        <div className="flex items-center space-x-3">
          <div>
            <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              ResuMaker AI
            </span>
            <div className="text-[10px] tracking-widest text-indigo-400 uppercase font-bold mt-0.5">
              Powered by Khemiri
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.5)]"></span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-indigo-400 transition-colors">Testimonials</a>
          <a href="#insights" className="hover:text-indigo-400 transition-colors">Global Standards</a>
        </nav>

        <div className="flex items-center space-x-3">
          <a
            href="#sign-in"
            className="hidden sm:inline-block px-4 py-2.5 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition-all border border-slate-800"
          >
            Sign In
          </a>
          <a
            href="#get-started"
            className="px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white transition-all shadow-lg shadow-indigo-500/25"
          >
            Get Started Free
          </a>
        </div>
      </header>

      {/* Hero Section & High-End Generator Grid */}
      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-16 lg:my-24">
        
        {/* Left Column: Western Market Pitch & Wide Stats */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
          <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-wide shadow-inner">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
            <span>Global Western Market Standard</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Career Path <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Platform Elite
            </span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl max-w-xl font-normal leading-relaxed">
            Create your elite resume, high-converting cover letter, and optimize your LinkedIn profile designed specifically for top US & European corporate recruitment.
          </p>

          {/* Wide Spacious Stats Boxes */}
          <div className="grid grid-cols-3 gap-4 w-full pt-4">
            <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 text-center shadow-xl">
              <div className="text-xl sm:text-2xl font-black text-white tracking-tight">+14,500</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Successful CVs</div>
            </div>
            <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 text-center shadow-xl">
              <div className="text-xl sm:text-2xl font-black text-white tracking-tight">99.8%</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Satisfaction</div>
            </div>
            <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 text-center shadow-xl">
              <div className="text-xl sm:text-2xl font-black text-white tracking-tight">ATS</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">100% Match</div>
            </div>
          </div>
        </div>

        {/* Right Column: High-End Generator Form with Email Option */}
        <div className="lg:col-span-6 w-full" id="get-started">
          <div className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-white tracking-tight">
                Build Professional Profile
              </h3>
              <a href="#signin" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                Continue with Email &rarr;
              </a>
            </div>

            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  placeholder="Example: Iskandar Khemiri"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-[#020617] border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all shadow-inner"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Target Job Title</label>
                <input
                  type="text"
                  placeholder="Example: Senior AI Software Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-[#020617] border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all shadow-inner"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-[#020617] border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 text-sm cursor-pointer"
                  >
                    <option value="English">English (US/UK)</option>
                    <option value="French">French</option>
                    <option value="Arabic">Arabic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Tone</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-[#020617] border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 text-sm cursor-pointer"
                  >
                    <option value="Modern">Modern Corporate</option>
                    <option value="Executive">Executive C-Level</option>
                    <option value="Creative">Creative Tech</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Experience & Milestones</label>
                <textarea
                  rows={4}
                  placeholder="Briefly describe your career background..."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-[#020617] border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Core Technical Skills</label>
                <input
                  type="text"
                  placeholder="Example: React, Next.js, Cloud Architecture"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-[#020617] border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-5 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-black text-base shadow-[0_10px_30px_rgba(79,70,229,0.5)] transition-all transform active:scale-[0.99] tracking-wide"
              >
                🚀 Start Instant AI Generation
              </button>
            </form>
          </div>
        </div>

      </main>

      {/* Pricing & PayPal / Stripe Integration Section */}
      <section className="w-full max-w-7xl my-20" id="pricing">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Transparent Global Pricing
          </h2>
          <p className="text-slate-400 text-base">Secure checkout powered by PayPal & Stripe (Coming Soon)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2">Starter</div>
              <div className="text-4xl font-black text-white mb-4">$9<span className="text-sm text-slate-400 font-normal"> / one-time</span></div>
              <p className="text-slate-400 text-sm mb-6">Perfect for single job applications with standard ATS templates.</p>
            </div>
            <button className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-sm text-white transition-all">
              Pay with PayPal
            </button>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-b from-indigo-950/40 to-slate-900/80 border-2 border-indigo-500/50 flex flex-col justify-between relative shadow-2xl">
            <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold tracking-wider uppercase">
              Most Popular
            </div>
            <div>
              <div className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2">Professional Elite</div>
              <div className="text-4xl font-black text-white mb-4">$29<span className="text-sm text-slate-400 font-normal"> / bundle</span></div>
              <p className="text-slate-400 text-sm mb-6">Full suite: Resume, Cover Letter, and complete LinkedIn Optimization.</p>
            </div>
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:opacity-95 font-bold text-sm text-white transition-all shadow-lg shadow-indigo-500/30">
              Pay with PayPal / Stripe
            </button>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2">Executive</div>
              <div className="text-4xl font-black text-white mb-4">$59<span className="text-sm text-slate-400 font-normal"> / unlimited</span></div>
              <p className="text-slate-400 text-sm mb-6">Unlimited generations with priority career routing and expert review.</p>
            </div>
            <button className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-sm text-white transition-all">
              Pay with PayPal
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials with Stars & Western Ratings */}
      <section className="w-full max-w-7xl my-20" id="testimonials">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Loved by Job Seekers Worldwide
          </h2>
          <p className="text-slate-400 text-base">Verified reviews from professionals in US, Canada & Europe</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 mb-4 space-x-1">★★★★★</div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">"The ATS compatibility feature completely changed my job search trajectory in New York. Recruiters started messaging me directly within days!"</p>
            </div>
            <div>
              <div className="font-bold text-white text-sm">Sarah Miller</div>
              <div className="text-slate-500 text-xs">Marketing Director, NY</div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 mb-4 space-x-1">★★★★★</div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">"Building a world-class executive resume and precise cover letter took less than 3 minutes. Powered by Khemiri AI is a masterpiece."</p>
            </div>
            <div>
              <div className="font-bold text-white text-sm">Sami Ben Ali</div>
              <div className="text-slate-500 text-xs">Senior Software Architect, London</div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 mb-4 space-x-1">★★★★★</div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">"The LinkedIn profile optimization tips gave my professional network 5x more organic reach and recruiter traffic across Europe."</p>
            </div>
            <div>
              <div className="font-bold text-white text-sm">Ahmad Khemiri</div>
              <div className="text-slate-500 text-xs">Principal Business Analyst, Paris</div>
            </div>
          </div>
        </div>
      </section>

      {/* Wide Footer */}
      <footer className="w-full max-w-7xl mt-auto py-10 border-t border-slate-800/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
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

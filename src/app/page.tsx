'use client';

import React, { useState } from 'react';

export default function ResuMakerFullPlatform() {
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [language, setLanguage] = useState('English');
  const [tone, setTone] = useState('Modern');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('ResuMaker AI: Instant generation started successfully!');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 flex flex-col items-center px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white">
      
      {/* Top Header */}
      <header className="w-full max-w-6xl flex items-center justify-between py-5 border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-black tracking-wider bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            ResuMaker AI
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-sm text-slate-400 font-medium">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
        </nav>
        <div className="flex items-center space-x-3">
          <a
            href="#sign-in"
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all border border-slate-700 shadow-sm"
          >
            Sign In
          </a>
        </div>
      </header>

      {/* Main Hero & Generator Section */}
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-12">
        
        {/* Left Column: Hero Details */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            <span>Powered by Khemiri AI</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
            Career Path <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Platform
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
            Create your elite resume, cover letter, and optimize your LinkedIn profile with world-class global standards.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 w-full pt-2">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center shadow-md">
              <div className="text-lg sm:text-xl font-bold text-white">+14,500</div>
              <div className="text-xs text-slate-400 mt-1">Successful CVs</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center shadow-md">
              <div className="text-lg sm:text-xl font-bold text-white">99.8%</div>
              <div className="text-xs text-slate-400 mt-1">Satisfaction</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center shadow-md">
              <div className="text-lg sm:text-xl font-bold text-white">ATS</div>
              <div className="text-xs text-slate-400 mt-1">100% Compatible</div>
            </div>
          </div>
        </div>

        {/* Right Column: Generator Form */}
        <div className="lg:col-span-6 w-full">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
            <h3 className="text-xl font-bold text-white mb-6 text-center lg:text-left">
              Build Your Professional Profile
            </h3>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="Example: Iskandar al-Tunisi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Target Job Title</label>
                <input
                  type="text"
                  placeholder="Example: Software Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 text-sm transition-all"
                  >
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                    <option value="French">French</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Tone</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 text-sm transition-all"
                  >
                    <option value="Modern">Modern</option>
                    <option value="Executive">Executive</option>
                    <option value="Creative">Creative</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Experience & Career Path</label>
                <textarea
                  rows={3}
                  placeholder="Brief summary of your previous experiences..."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm transition-all resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Technical & Personal Skills</label>
                <input
                  type="text"
                  placeholder="Example: Next.js, React, Node.js"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-3 py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all transform active:scale-[0.99]"
              >
                🚀 Start Instant Generation
              </button>
            </form>
          </div>
        </div>

      </main>

      {/* Testimonials Section */}
      <section className="w-full max-w-6xl my-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-white mb-3">
          Loved by Job Seekers Worldwide
        </h2>
        <p className="text-slate-400 text-center text-sm mb-8">
          See what professionals are saying about ResuMaker AI
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <p className="text-slate-300 text-sm mb-4">"The ATS compatibility feature completely changed my job search. Recruiters started messaging me directly!"</p>
            <div className="font-semibold text-white text-xs">Sarah M.</div>
            <div className="text-slate-500 text-xs">Marketing Director</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <p className="text-slate-300 text-sm mb-4">"Building a world-class resume and cover letter took less than 3 minutes. Absolutely incredible tool."</p>
            <div className="font-semibold text-white text-xs">Sami B.</div>
            <div className="text-slate-500 text-xs">Full Stack Engineer</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <p className="text-slate-300 text-sm mb-4">"The LinkedIn optimization tips gave my profile 5x more visibility. Highly recommended."</p>
            <div className="font-semibold text-white text-xs">Ahmad K.</div>
            <div className="text-slate-500 text-xs">Business Analyst</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-6xl mt-auto py-8 border-t border-slate-800/80 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>&copy; 2026 ResuMaker AI Platform. All rights reserved.</div>
        <div className="flex space-x-6">
          <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
        </div>
      </footer>

    </div>
  );
}

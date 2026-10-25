'use client';

import React, { useState } from 'react';

export default function ResuMakerLanding() {
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [language, setLanguage] = useState('English');
  const [tone, setTone] = useState('Modern');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('ResuMaker AI: Generation process initiated successfully!');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 flex flex-col items-center px-4 py-6 selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="w-full max-w-6xl flex items-center justify-between py-4 mb-8 border-b border-slate-800/60">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            ResuMaker AI
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-sm text-slate-400 font-medium">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </nav>
        <div className="flex items-center space-x-4">
          <a
            href="#sign-in"
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all border border-slate-700 shadow-sm"
          >
            Sign In
          </a>
        </div>
      </header>

      {/* Main Container: Responsive Grid (Vertical for Mobile, Horizontal/Split for Desktop) */}
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
        
        {/* Left Section: Hero Info & Stats */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            <span>Powered by Khemiri AI</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Career Path <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Platform
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-xl">
            Create your resume, cover letter, and optimize your LinkedIn profile with elite global standards.
          </p>

          {/* Stats Box */}
          <div className="grid grid-cols-3 gap-3 w-full pt-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-center shadow-lg">
              <div className="text-lg sm:text-xl font-bold text-white">+14,500</div>
              <div className="text-xs text-slate-400 mt-1">Successful CVs</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-center shadow-lg">
              <div className="text-lg sm:text-xl font-bold text-white">99.8%</div>
              <div className="text-xs text-slate-400 mt-1">Satisfaction Rate</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-center shadow-lg">
              <div className="text-lg sm:text-xl font-bold text-white">ATS</div>
              <div className="text-xs text-slate-400 mt-1">Compatible 100%</div>
            </div>
          </div>
        </div>

        {/* Right Section: Generator Form Card */}
        <div className="lg:col-span-6 w-full">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-2xl backdrop-blur-xl">
            <h3 className="text-xl font-semibold text-white mb-6 text-center lg:text-left">
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
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Experience Summary</label>
                <textarea
                  rows={3}
                  placeholder="Brief summary of your professional background..."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm transition-all resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Key Skills</label>
                <input
                  type="text"
                  placeholder="React, Next.js, Node.js, AI Integration"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all transform active:scale-[0.99]"
              >
                Start Generation 🚀
              </button>
            </form>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mt-12 py-6 border-t border-slate-800/60 text-center text-xs text-slate-500">
        &copy; 2026 ResuMaker AI Platform. All rights reserved.
      </footer>
    </div>
  );
}

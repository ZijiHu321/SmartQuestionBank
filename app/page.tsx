'use client';
import React from 'react';
import Link from 'next/link';

// Small helper components
function SectionTitle({ kicker, title, desc }: { kicker?: string; title: string; desc?: string }) {
  return (
    <header className="mb-8">
      {kicker && <p className="text-xs tracking-widest text-blue-600 font-semibold mb-2 uppercase">{kicker}</p>}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">{title}</h2>
      {desc && <p className="text-sm md:text-base text-gray-600 max-w-2xl leading-relaxed">{desc}</p>}
    </header>
  );
}

const FEATURES = [
  { title: 'Adaptive Engine', desc: 'Adjusts difficulty in real time based on recent accuracy.' },
  { title: 'Focused Drills', desc: 'Filter by topic & sub-skill to remove noise and build depth.' },
  { title: 'Smart Review', desc: 'Resurfaces mistakes at spaced intervals for durable retention.' },
  { title: 'Clean Analytics', desc: 'Simple trend lines—no clutter, just progress signals.' },
];

const BEST = [
  'Practice 15–30 minutes consistently',
  'Write reasoning before checking solution',
  'Tag / bookmark unsolved problems',
  'Revisit weak topics weekly',
  'Aim for gradual accuracy gains'
];

const PITFALLS = [
  'Guessing rapidly for volume',
  'Skipping solution reasoning',
  'Only doing strengths',
  'Memorizing final answers',
  'Taking long inactive breaks'
];

const SYSTEM = [
  'Modern browser (Chrome / Firefox / Safari / Edge)',
  'Stable connection (≥5Mbps recommended)',
  'JavaScript enabled',
  'Screen width ≥ 1024px for full dashboard'
];

const DEVICES = [
  'Desktop / Laptop (best experience)',
  'Tablet (supports handwriting notes)',
  'Phone (quick review mode)',
  'Math rendered with KaTeX'
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 pt-16">
      {/* Page width wrapper with left offset */}
      <div className="max-w-7xl mx-auto flex">
        {/* Left gutter / visual whitespace */}
        <div className="hidden lg:block w-12 xl:w-20" aria-hidden />

        {/* Main column */}
        <div className="flex-1 px-6 md:px-10 lg:px-0 pb-24">
          {/* Hero */}
          <section className="mb-20">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-medium text-gray-600">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Smart Question Bank
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight max-w-3xl">
              Learn faster with structured math practice
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mb-10">
              Targeted question sets, adaptive progression, and clear feedback for <span className="font-semibold text-blue-600">IB Calculus</span>, <span className="font-semibold text-purple-600">IB Statistics</span>, and <span className="font-semibold text-indigo-600">Calculus 1</span>.
            </p>
            <div className="flex flex-col sm:flex-row mb-14">
              <Link href="/unit" className="group inline-flex items-center justify-center rounded-md bg-gray-900 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors">
                Start Practicing
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14" /><path d="M13 6l6 6-6 6"/></svg>
              </Link>
              <Link href="/profile" className="inline-flex items-center justify-center rounded-md border border-gray-300 px-7 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                View Progress
              </Link>
            </div>

            {/* Feature grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl">
              {FEATURES.map(f => (
                <div key={f.title} className="rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Guidelines */}
          <section className="mb-24">
            <SectionTitle title="Better Results, Fewer Wasted Reps" desc="Adopt the habits that compound and avoid the traps that stall progress." />
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl">
              <div className="rounded-xl border border-green-200 bg-green-50/40 p-6">
                <h3 className="text-sm font-semibold tracking-wide text-green-700 mb-4">BEST PRACTICES</h3>
                <ul className="space-y-3 text-sm">
                  {BEST.map(item => (
                    <li key={item} className="flex gap-3 items-start">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-green-500" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-red-200 bg-red-50/40 p-6">
                <h3 className="text-sm font-semibold tracking-wide text-red-700 mb-4">COMMON PITFALLS</h3>
                <ul className="space-y-3 text-sm">
                  {PITFALLS.map(item => (
                    <li key={item} className="flex gap-3 items-start">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-red-500" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* How It Works */}
            <section className="mb-24">
              <SectionTitle title="How It Works" desc="A simple loop: choose, focus, practice, refine." />
              <ol className="space-y-6 max-w-3xl text-sm">
                {[
                  { n: '01', t: 'Choose Course', d: 'Select the curriculum track that matches your syllabus.' },
                  { n: '02', t: 'Drill a Topic', d: 'Filter by concept—limits, derivatives, distributions, etc.' },
                  { n: '03', t: 'Reflect & Review', d: 'Read full solutions. Tag what you did not fully own.' },
                  { n: '04', t: 'Track & Adjust', d: 'Let analytics surface weak clusters and re-balance.' }
                ].map(step => (
                  <li key={step.n} className="flex gap-6">
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gray-900 text-white flex items-center justify-center text-xs font-semibold tracking-wide">{step.n}</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">{step.t}</p>
                      <p className="text-gray-600 leading-relaxed">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

          {/* Technical */}
          <section className="mb-24">
            <SectionTitle title="Technical" desc="Lightweight & fast—no installs required." />
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl">
              <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-6">
                <h3 className="text-sm font-semibold tracking-wide text-blue-700 mb-4">SYSTEM</h3>
                <ul className="space-y-3 text-sm">
                  {SYSTEM.map(item => (
                    <li key={item} className="flex gap-3 items-start">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-500" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-6">
                <h3 className="text-sm font-semibold tracking-wide text-indigo-700 mb-4">DEVICES</h3>
                <ul className="space-y-3 text-sm mb-4">
                  {DEVICES.map(item => (
                    <li key={item} className="flex gap-3 items-start">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-indigo-500" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-lg border border-indigo-200 bg-white p-4 text-xs text-gray-600 leading-relaxed">
                  <strong className="font-semibold text-gray-900">Tip:</strong> Larger screens make multi‑step derivations easier to parse and annotate.
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-10 border-t border-gray-200 text-xs text-gray-500">
            © 2025 Smart Question Bank. Built for focused mastery.
          </footer>
        </div>
      </div>
    </main>
  );
}
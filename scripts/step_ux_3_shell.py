# -*- coding: utf-8 -*-
import os

def write_file(path, content):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {path}")

# Search Modal
write_file("apps/web/components/layout/search-modal.tsx", """"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  // Sample quick searchable index
  const index = [
    { title: 'Java Track Overview', category: 'Course', href: '/java' },
    { title: 'Java Architecture & Your First Program', category: 'Module', href: '/java' },
    { title: 'Deconstructing Hello World & The JVM Architecture', category: 'Lesson', href: '/java/fundamentals/hello-world' },
    { title: 'JDK vs JRE vs JVM Concepts', category: 'Concept', href: '/java/fundamentals/hello-world' },
    { title: 'Why is Java main() Static? (TCS / Infosys)', category: 'Interview QA', href: '/java/fundamentals/hello-world' },
    { title: 'Practice Problems Catalog', category: 'Practice', href: '/practice' },
    { title: 'Student Profile & Mastery', category: 'Profile', href: '/profile' }
  ];

  const filtered = query.trim()
    ? index.filter(i => i.title.toLowerCase().includes(query.toLowerCase()) || i.category.toLowerCase().includes(query.toLowerCase()))
    : index;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-floating border border-slate-200 overflow-hidden transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-label="Search LearnBySelf"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100">
          <span className="text-slate-400 mr-3 text-lg">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, topics, interview questions..."
            className="w-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
            autoFocus
          />
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded font-mono"
            aria-label="Close search"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-50">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-50/50 hover:text-brand-900 transition-colors group"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-brand-700">
                    {item.title}
                  </p>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
                    {item.category}
                  </span>
                </div>
                <span className="text-xs text-slate-400 group-hover:text-brand-600 font-bold">
                  →
                </span>
              </Link>
            ))
          ) : (
            <div className="text-center py-8 text-sm text-slate-400">
              No matching topics found for "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
""")

# Mobile Drawer
write_file("apps/web/components/layout/mobile-drawer.tsx", """"use client";

import React from 'react';
import Link from 'next/link';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex sm:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div
        className="relative w-4/5 max-w-xs bg-white h-full shadow-floating p-6 flex flex-col justify-between z-10"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <Link href="/" onClick={onClose} className="flex items-center space-x-2 font-bold text-lg text-brand-600">
              <span>⚡</span>
              <span>LearnBySelf</span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Nav links with 44px touch targets */}
          <nav className="space-y-1">
            <Link
              href="/java"
              onClick={onClose}
              className="flex items-center space-x-3 p-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700 min-h-[44px]"
            >
              <span>☕</span>
              <span>Java Path (Active)</span>
            </Link>
            <Link
              href="/practice"
              onClick={onClose}
              className="flex items-center space-x-3 p-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700 min-h-[44px]"
            >
              <span>✍️</span>
              <span>Practice Problems</span>
            </Link>
            <Link
              href="/profile"
              onClick={onClose}
              className="flex items-center space-x-3 p-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700 min-h-[44px]"
            >
              <span>👤</span>
              <span>Student Profile</span>
            </Link>
          </nav>
        </div>

        {/* Footer info */}
        <div className="border-t border-slate-100 pt-4 text-xs text-slate-500 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-600 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Phase 1 Verified Foundation</span>
          </div>
          <p>© 2026 LearnBySelf</p>
        </div>
      </div>
    </div>
  );
};
""")

# Navbar
write_file("apps/web/components/layout/navbar.tsx", """"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { SearchModal } from './search-modal';
import { MobileDrawer } from './mobile-drawer';

export const Navbar: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Platform Tag */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2.5 font-extrabold text-xl text-brand-600 tracking-tight">
              <span className="text-2xl">⚡</span>
              <span className="bg-gradient-to-r from-brand-700 to-indigo-600 bg-clip-text text-transparent">LearnBySelf</span>
            </Link>
            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              B.Tech Placement Track
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden sm:flex items-center space-x-1 sm:space-x-2 text-sm font-semibold text-slate-600">
            <Link
              href="/java"
              className="px-3 py-2 rounded-lg hover:text-brand-600 hover:bg-slate-50 transition-colors"
            >
              Java Track
            </Link>
            <Link
              href="/practice"
              className="px-3 py-2 rounded-lg hover:text-brand-600 hover:bg-slate-50 transition-colors"
            >
              Practice
            </Link>
            <Link
              href="/profile"
              className="px-3 py-2 rounded-lg hover:text-brand-600 hover:bg-slate-50 transition-colors"
            >
              Profile
            </Link>
          </nav>

          {/* Search Trigger, Streak Pill & Mobile Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100 text-slate-500 text-xs font-medium transition-all shadow-subtle min-h-[36px]"
              aria-label="Open search dialog"
            >
              <span>🔍</span>
              <span className="hidden md:inline">Search curriculum...</span>
              <kbd className="hidden md:inline-block font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[10px]">
                ⌘K
              </kbd>
            </button>

            {/* Streak Pill */}
            <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 text-xs font-bold">
              <span>🔥</span>
              <span>Day 1</span>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="sm:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Open navigation menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Global Modals */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};
""")

# Footer
write_file("apps/web/components/layout/footer.tsx", """import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white mt-16 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Learning Paths
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/java" className="hover:text-brand-600">Java Foundations</Link></li>
              <li className="text-slate-400">Python Mastery (Roadmap)</li>
              <li className="text-slate-400">C# .NET (Roadmap)</li>
              <li className="text-slate-400">Fullstack TS (Roadmap)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Practice & Prep
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/practice" className="hover:text-brand-600">MCQ Challenges</Link></li>
              <li><Link href="/practice" className="hover:text-brand-600">Bug Hunting</Link></li>
              <li><Link href="/practice" className="hover:text-brand-600">Output Prediction</Link></li>
              <li><Link href="/java/fundamentals/hello-world" className="hover:text-brand-600">Interview Q&A</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Student Hub
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/profile" className="hover:text-brand-600">Learner Profile</Link></li>
              <li><Link href="/profile" className="hover:text-brand-600">Mastery Milestones</Link></li>
              <li><Link href="/java" className="hover:text-brand-600">Course Syllabus</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Engineering Standard
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              LearnBySelf is built with zero-teacher dependency to take ambitious students from ground zero to placement readiness.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© 2026 LearnBySelf. Built for aspiring engineers and college graduates.</p>
          <div className="flex space-x-4 mt-3 sm:mt-0 font-medium">
            <span>WCAG Accessible</span>
            <span>•</span>
            <span>Zero Tracking</span>
            <span>•</span>
            <span>Server Components</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
""")

print("Layout shell components created.")

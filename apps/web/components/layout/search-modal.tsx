"use client";

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
    { title: 'Why is Java main() Static?', category: 'Q&A', href: '/java/fundamentals/hello-world' },
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
              No matching topics found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

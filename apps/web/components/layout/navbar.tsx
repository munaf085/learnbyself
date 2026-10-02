"use client";

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
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2 font-extrabold text-xl text-brand-600 tracking-tight">
              <span className="text-2xl">⚡</span>
              <span className="bg-gradient-to-r from-brand-700 to-indigo-600 bg-clip-text text-transparent">LearnBySelf</span>
            </Link>
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

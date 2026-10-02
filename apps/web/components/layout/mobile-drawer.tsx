"use client";

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
              <span>Java Programming</span>
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
              <span>Profile</span>
            </Link>
          </nav>
        </div>

        {/* Footer info */}
        <div className="border-t border-slate-100 pt-4 text-xs text-slate-500 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-600 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Interactive Platform</span>
          </div>
          <p>© 2026 LearnBySelf</p>
        </div>
      </div>
    </div>
  );
};

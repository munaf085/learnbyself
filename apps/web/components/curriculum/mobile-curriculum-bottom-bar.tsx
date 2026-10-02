"use client";

import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';

interface MobileCurriculumBottomBarProps {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  prevLessonTitle?: string;
  nextLessonTitle?: string;
  onOpenSyllabus: () => void;
  currentLessonIndex?: number;
  totalLessons?: number;
  showCelebration?: boolean;
}

export const MobileCurriculumBottomBar: React.FC<MobileCurriculumBottomBarProps> = ({
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  prevLessonTitle,
  nextLessonTitle,
  onOpenSyllabus,
  currentLessonIndex = 0,
  totalLessons = 1,
  showCelebration = false
}) => {
  return (
    <nav
      aria-label="Mobile lesson navigation"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 pt-2 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] sm:px-4"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* Previous Button */}
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          aria-label={prevLessonTitle ? `Previous lesson: ${prevLessonTitle}` : 'Previous lesson'}
          className={`flex-1 min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all border ${
            hasPrev
              ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300 active:scale-98 cursor-pointer'
              : 'bg-slate-50/50 text-slate-300 border-slate-200 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4 shrink-0" />
          <span className="truncate">Prev</span>
        </button>

        {/* Center Syllabus Button */}
        <button
          onClick={onOpenSyllabus}
          aria-label={`Open syllabus. Current lesson ${currentLessonIndex + 1} of ${totalLessons}`}
          className="flex-1.5 min-h-[44px] px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 active:scale-98 transition-all cursor-pointer shadow-2xs"
        >
          <Layers className="w-4 h-4 text-brand-600 shrink-0" />
          <span className="truncate">Syllabus</span>
          {totalLessons > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-200/70 text-brand-900 font-mono font-bold shrink-0">
              {currentLessonIndex + 1}/{totalLessons}
            </span>
          )}
        </button>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={!hasNext}
          aria-label={nextLessonTitle ? `Next lesson: ${nextLessonTitle}` : 'Next lesson'}
          className={`flex-1 min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all relative ${
            hasNext
              ? 'bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white shadow-subtle active:scale-98 cursor-pointer'
              : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
          }`}
        >
          {showCelebration && (
            <span className="absolute -top-3.5 right-2 px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-0.5 animate-bounce shadow-md">
              <Sparkles className="w-2.5 h-2.5" />
              <span>+50 XP</span>
            </span>
          )}
          <span className="truncate">Next</span>
          <ChevronRight className="w-4 h-4 shrink-0" />
        </button>
      </div>
    </nav>
  );
};

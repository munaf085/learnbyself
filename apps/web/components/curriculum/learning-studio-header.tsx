"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@learnbyself/ui';
import {
  Sparkles,
  Flame,
  Maximize2,
  Minimize2,
  BookOpen,
  Layers,
  ChevronLeft,
  ChevronRight,
  Clock
} from 'lucide-react';

interface LearningStudioHeaderProps {
  languageSlug: string;
  sectionTitle: string;
  moduleTitle: string;
  lessonTitle: string;
  sectionSlug?: string;
  moduleSlug?: string;
  lessonIndex?: number;
  totalLessons?: number;
  difficulty?: string;
  estimatedMinutes?: number;
  isFocusMode?: boolean;
  onToggleFocusMode?: () => void;
  onOpenMobileSyllabus: () => void;
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  prevLessonTitle?: string;
  nextLessonTitle?: string;
}

export const LearningStudioHeader: React.FC<LearningStudioHeaderProps> = ({
  languageSlug,
  sectionTitle,
  moduleTitle,
  lessonTitle,
  sectionSlug = 'basics',
  moduleSlug = 'getting-started',
  lessonIndex = 0,
  totalLessons = 10,
  difficulty = 'easy',
  estimatedMinutes = 15,
  isFocusMode = false,
  onToggleFocusMode,
  onOpenMobileSyllabus,
  onPrevLesson,
  onNextLesson,
  hasPrev = false,
  hasNext = false,
  prevLessonTitle,
  nextLessonTitle
}) => {
  const [showNextTooltip, setShowNextTooltip] = useState(false);
  const [showPrevTooltip, setShowPrevTooltip] = useState(false);

  const progressPercent = totalLessons > 0 ? Math.min(100, Math.round(((lessonIndex + 1) / totalLessons) * 100)) : 0;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-subtle overflow-hidden transition-all">
      {/* Top Thin Progress Bar (like top online learning platforms) */}
      <div className="w-full bg-slate-100 h-1 relative">
        <div
          className="h-full bg-brand-600 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="p-4 sm:p-5 space-y-3.5">
        {/* Breadcrumb row & Navigation Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5 font-medium min-w-0 max-w-full">
            <Link href={`/${languageSlug}`} className="hover:text-brand-600 uppercase font-bold tracking-wider shrink-0">
              {languageSlug}
            </Link>
            <span className="text-slate-300">/</span>
            <Link href={`/${languageSlug}/${sectionSlug}`} className="text-slate-600 hover:text-brand-600 shrink-0">
              {sectionTitle}
            </Link>
            <span className="text-slate-300">/</span>
            <Link
              href={`/${languageSlug}/${sectionSlug}/${moduleSlug}`}
              className="text-slate-800 font-semibold hover:text-brand-600 hover:underline transition-colors truncate max-w-[160px] sm:max-w-[280px]"
              title={moduleTitle}
            >
              {moduleTitle}
            </Link>
          </nav>

          {/* Right Header Status Badges */}
          <div className="flex items-center space-x-2">
            {/* Lesson position in module */}
            <div
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold shrink-0"
              title={`Lesson ${lessonIndex + 1} of ${totalLessons} in ${moduleTitle}`}
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>Lesson {lessonIndex + 1} of {totalLessons}</span>
            </div>

            {/* Streak pill */}
            <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Day 1</span>
            </div>

            {/* XP Reward Pill */}
            <div className="hidden md:flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>+50 XP</span>
            </div>

            {/* Mobile drawer trigger */}
            <button
              onClick={onOpenMobileSyllabus}
              className="lg:hidden flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-semibold border border-brand-200 transition-colors min-h-[34px] cursor-pointer"
              aria-label="Open course syllabus drawer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Syllabus</span>
            </button>
          </div>
        </div>

        {/* Main title & Interactive Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                <Clock className="w-3 h-3 text-slate-400" />
                ~{estimatedMinutes} mins
              </span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md capitalize ${
                difficulty === 'advanced' || difficulty === 'hard'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : difficulty === 'intermediate' || difficulty === 'medium'
                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {difficulty}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight break-words">
              {lessonTitle}
            </h1>
          </div>

          {/* Action controls: Focus Mode & Quick Prev/Next with Preview Tooltips */}
          <div className="flex items-center space-x-2 self-start sm:self-center shrink-0">
            {onToggleFocusMode && (
              <button
                onClick={onToggleFocusMode}
                className={`hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                  isFocusMode
                    ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                }`}
                title={isFocusMode ? 'Exit Full Focus Mode' : 'Focus Mode (hides sidebar)'}
              >
                {isFocusMode ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Exit Focus</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Focus</span>
                  </>
                )}
              </button>
            )}

            {/* Prev button with tooltip */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                disabled={!hasPrev}
                onClick={onPrevLesson}
                onMouseEnter={() => setShowPrevTooltip(true)}
                onMouseLeave={() => setShowPrevTooltip(false)}
                className="text-xs flex items-center gap-1 cursor-pointer min-h-[34px] px-3 font-medium"
                aria-label={prevLessonTitle ? `Previous lesson: ${prevLessonTitle}` : 'Previous lesson'}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </Button>

              {showPrevTooltip && prevLessonTitle && (
                <div className="absolute left-0 top-full mt-1.5 z-40 bg-slate-900 text-white text-[11px] rounded-lg px-2.5 py-1.5 shadow-lg whitespace-nowrap pointer-events-none animate-fadeIn">
                  <span className="text-slate-400 block text-[10px]">Previous:</span>
                  <span className="font-medium">{prevLessonTitle}</span>
                </div>
              )}
            </div>

            {/* Next button with highlighted primary feel and tooltip */}
            <div className="relative">
              <Button
                variant={hasNext ? "primary" : "outline"}
                size="sm"
                disabled={!hasNext}
                onClick={onNextLesson}
                onMouseEnter={() => setShowNextTooltip(true)}
                onMouseLeave={() => setShowNextTooltip(false)}
                className={`text-xs flex items-center gap-1 cursor-pointer min-h-[34px] px-3.5 font-semibold ${
                  hasNext ? 'shadow-subtle' : ''
                }`}
                aria-label={nextLessonTitle ? `Next lesson: ${nextLessonTitle}` : 'Next lesson'}
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>

              {showNextTooltip && nextLessonTitle && (
                <div className="absolute right-0 top-full mt-1.5 z-40 bg-slate-900 text-white text-[11px] rounded-lg px-2.5 py-1.5 shadow-lg whitespace-nowrap pointer-events-none animate-fadeIn">
                  <span className="text-slate-400 block text-[10px]">Up next:</span>
                  <span className="font-medium">{nextLessonTitle}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

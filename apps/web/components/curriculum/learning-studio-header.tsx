import React from 'react';
import Link from 'next/link';
import { Button } from '@learnbyself/ui';
import { Sparkles, Flame, Maximize2, Minimize2, BookOpen, Layers } from 'lucide-react';

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
}

export const LearningStudioHeader: React.FC<LearningStudioHeaderProps> = ({
  languageSlug,
  sectionTitle,
  moduleTitle,
  lessonTitle,
  sectionSlug = 'basics',
  moduleSlug = 'getting-started',
  lessonIndex,
  totalLessons,
  difficulty = 'easy',
  estimatedMinutes = 15,
  isFocusMode = false,
  onToggleFocusMode,
  onOpenMobileSyllabus,
  onPrevLesson,
  onNextLesson,
  hasPrev = false,
  hasNext = false
}) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-subtle space-y-3 transition-all">
      {/* Breadcrumb row & Mobile syllabus button */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5 font-medium">
          <Link href={`/${languageSlug}`} className="hover:text-brand-600 uppercase font-bold tracking-wider">
            {languageSlug}
          </Link>
          <span>/</span>
          <Link href={`/${languageSlug}/${sectionSlug}`} className="text-slate-600 hover:text-brand-600">
            {sectionTitle}
          </Link>
          <span>/</span>
          <Link
            href={`/${languageSlug}/${sectionSlug}/${moduleSlug}`}
            className="text-slate-800 font-semibold hover:text-brand-600 hover:underline transition-colors"
            title="Return to module outline"
          >
            {moduleTitle}
          </Link>
        </div>

        {/* Right Header Status Badges */}
        <div className="flex items-center space-x-2">
          {lessonIndex !== undefined && totalLessons !== undefined && (
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>{lessonIndex + 1}/{totalLessons}</span>
            </div>
          )}

          {/* Streak pill */}
          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Day 1</span>
          </div>

          {/* XP Reward Pill */}
          <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>+50 XP</span>
          </div>

          {/* Mobile drawer trigger */}
          <button
            onClick={onOpenMobileSyllabus}
            className="lg:hidden flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-semibold border border-brand-200 transition-colors min-h-[36px]"
            aria-label="Open course modules drawer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Modules</span>
          </button>
        </div>
      </div>

      {/* Main title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {lessonTitle}
          </h1>
        </div>

        {/* Action controls: Focus Mode & Quick Prev/Next */}
        <div className="flex items-center space-x-2 self-start sm:self-center">
          {onToggleFocusMode && (
            <button
              onClick={onToggleFocusMode}
              className={`hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                isFocusMode
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              }`}
              title={isFocusMode ? 'Exit Full Focus Mode' : 'Focus Mode (hides syllabus sidebar)'}
            >
              {isFocusMode ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Exit Focus</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Focus Mode</span>
                </>
              )}
            </button>
          )}

          <Button
            variant="outline"
            size="sm"
            disabled={!hasPrev}
            onClick={onPrevLesson}
            className="text-xs"
          >
            ← Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!hasNext}
            onClick={onNextLesson}
            className="text-xs"
          >
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
};

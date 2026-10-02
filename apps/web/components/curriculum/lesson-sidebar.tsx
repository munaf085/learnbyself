import React from 'react';
import Link from 'next/link';
import type { LessonSummary } from '@learnbyself/types';

interface LessonSidebarProps {
  moduleTitle: string;
  lessons: LessonSummary[];
  languageSlug: string;
  sectionSlug: string;
  currentLessonSlug: string;
}

export const LessonSidebar: React.FC<LessonSidebarProps> = ({
  moduleTitle,
  lessons,
  languageSlug,
  sectionSlug,
  currentLessonSlug
}) => {
  return (
    <aside
      className="hidden lg:block w-72 flex-shrink-0 bg-white border border-slate-200 rounded-2xl p-5 shadow-subtle self-start sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
      aria-label="Module Lessons"
    >
      <div className="border-b border-slate-100 pb-3 mb-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 font-mono">
          Current Module
        </span>
        <h4 className="text-sm font-bold text-slate-900 leading-snug mt-0.5">
          {moduleTitle}
        </h4>
        <span className="text-[11px] text-slate-400 font-medium">
          {lessons.length} Lessons in this module
        </span>
      </div>

      <nav className="space-y-1">
        {lessons.map((lesson, idx) => {
          const isCurrent = lesson.slug === currentLessonSlug;
          const isCompleted = !!lesson.isCompleted;

          return (
            <Link
              key={lesson.id}
              href={`/${languageSlug}/${sectionSlug}/${lesson.moduleSlug}/${lesson.slug}`}
              className={`flex items-start space-x-2.5 p-2.5 rounded-xl text-xs transition-colors min-h-[40px] ${
                isCurrent
                  ? 'bg-brand-50 text-brand-900 font-bold border border-brand-200'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="mt-0.5 select-none font-mono">
                {isCompleted ? (
                  <span className="text-emerald-600 font-bold">✓</span>
                ) : isCurrent ? (
                  <span className="text-brand-600 font-bold">●</span>
                ) : (
                  <span className="text-slate-300">○</span>
                )}
              </span>

              <div className="flex-1 space-y-0.5">
                <p className="leading-snug">
                  {idx + 1}. {lesson.title}
                </p>
                <span className="text-[10px] text-slate-400 font-mono block">
                  ~{lesson.estimatedMinutes}m
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

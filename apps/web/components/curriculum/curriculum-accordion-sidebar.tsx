"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Module, LessonSummary } from '@learnbyself/types';
import { Badge } from '@learnbyself/ui';
import {
  ChevronDown,
  CheckCircle2,
  BookOpen,
  Search,
  X,
  Layers,
  Sparkles
} from 'lucide-react';

interface CurriculumAccordionSidebarProps {
  languageSlug?: string;
  sectionSlug?: string;
  sectionTitle: string;
  modules: Module[];
  activeModuleSlug: string;
  activeLessonSlug: string;
  onSelectLesson: (moduleSlug: string, lessonSlug: string) => void;
  className?: string;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const CurriculumAccordionSidebar: React.FC<CurriculumAccordionSidebarProps> = ({
  languageSlug,
  sectionSlug,
  sectionTitle,
  modules,
  activeModuleSlug,
  activeLessonSlug,
  onSelectLesson,
  className = '',
  isMobileDrawer = false,
  onCloseMobileDrawer
}) => {
  // Track expanded modules. Open active module by default.
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [activeModuleSlug]: true
  });
  const [filterQuery, setFilterQuery] = useState('');

  // Ref for the active lesson element to auto-scroll into view
  const activeItemRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Automatically keep current module expanded when activeModuleSlug changes
  useEffect(() => {
    if (activeModuleSlug) {
      setExpandedModules(prev => ({
        ...prev,
        [activeModuleSlug]: true
      }));
    }
  }, [activeModuleSlug]);

  // Auto-scroll the sidebar container ONLY to keep the active lesson in view without scrolling the main window
  useEffect(() => {
    if (scrollContainerRef.current && activeItemRef.current) {
      const container = scrollContainerRef.current;
      const item = activeItemRef.current;

      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      // Check if item is above or below visible portion of sidebar container
      const isAbove = itemRect.top < containerRect.top;
      const isBelow = itemRect.bottom > containerRect.bottom;

      if (isAbove) {
        container.scrollTop -= (containerRect.top - itemRect.top + 20);
      } else if (isBelow) {
        container.scrollTop += (itemRect.bottom - containerRect.bottom + 20);
      }
    }
  }, [activeLessonSlug, activeModuleSlug]);

  const toggleModule = (slug: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [slug]: !prev[slug]
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    modules.forEach(m => { all[m.slug] = true; });
    setExpandedModules(all);
  };

  const collapseAll = () => {
    setExpandedModules({});
  };

  // Calculate course stats
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = modules.reduce(
    (acc, m) => acc + m.lessons.filter(l => l.isCompleted).length,
    0
  );
  const courseProgressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className={`flex flex-col bg-white border border-slate-200/90 rounded-2xl shadow-subtle overflow-hidden ${className}`}>
      {/* 1. Header with Course Progress (Udemy/Coursera style) */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/70 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-brand-600" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 font-mono">
              Course Syllabus
            </span>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-slate-500">
            <button
              onClick={expandAll}
              className="hover:text-brand-600 font-medium py-0.5 cursor-pointer"
            >
              Expand All
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={collapseAll}
              className="hover:text-brand-600 font-medium py-0.5 cursor-pointer"
            >
              Collapse
            </button>
            {isMobileDrawer && (
              <button
                onClick={onCloseMobileDrawer}
                className="ml-2 p-2 -mr-1 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close syllabus drawer"
              >
                <X className="w-5 h-5 text-slate-700" />
              </button>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 leading-snug">
            {sectionTitle}
          </h3>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
            <span>{modules.length} Modules • {totalLessons} Lessons</span>
            {completedLessons > 0 && (
              <span className="font-semibold text-emerald-600">{completedLessons}/{totalLessons} Done</span>
            )}
          </div>
        </div>

        {/* Progress bar */}
        {completedLessons > 0 && (
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${courseProgressPercent}%` }}
            />
          </div>
        )}

        {/* Quick search input with clear button */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter lessons..."
            className="w-full text-xs bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 pl-8 pr-7 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
          />
          {filterQuery && (
            <button
              onClick={() => setFilterQuery('')}
              className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Scrollable Modules Accordion List */}
      <div
        ref={scrollContainerRef}
        className={`flex-1 overflow-y-auto divide-y divide-slate-100 scrollbar-thin ${
          isMobileDrawer ? 'max-h-[calc(100vh-10rem)]' : 'max-h-[calc(100vh-14rem)]'
        }`}
      >
        {modules.map((mod, modIdx) => {
          const isExpanded = !!expandedModules[mod.slug] || !!filterQuery.trim();
          const isCurrentModule = mod.slug === activeModuleSlug;

          const filteredLessons = filterQuery.trim()
            ? mod.lessons.filter(l => l.title.toLowerCase().includes(filterQuery.toLowerCase()))
            : mod.lessons;

          if (filterQuery.trim() && filteredLessons.length === 0) {
            return null;
          }

          const moduleCompletedCount = mod.lessons.filter(l => l.isCompleted).length;

          return (
            <div
              key={mod.id}
              className={`transition-colors ${
                isCurrentModule ? 'bg-brand-50/15 border-l-2 border-brand-500' : ''
              }`}
            >
              {/* Module Accordion Trigger */}
              <button
                onClick={() => toggleModule(mod.slug)}
                className={`w-full text-left p-3.5 flex items-start justify-between gap-2 hover:bg-slate-50 transition-colors min-h-[44px] cursor-pointer`}
                aria-expanded={isExpanded}
              >
                <div className="flex items-start space-x-2.5 flex-1 min-w-0">
                  <span
                    className={`text-slate-400 mt-0.5 transition-transform duration-200 inline-block ${
                      isExpanded ? 'rotate-0' : '-rotate-90'
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </span>

                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] font-bold text-slate-400 font-mono">
                        {String(modIdx + 1).padStart(2, '0')}.
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {mod.title}
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      {mod.lessons.length} Lessons • ~{mod.estimatedMinutes}m
                    </span>
                  </div>
                </div>

                {moduleCompletedCount > 0 && (
                  <span className="text-[10px] text-emerald-600 font-semibold px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200/80 shrink-0">
                    {moduleCompletedCount}/{mod.lessons.length}
                  </span>
                )}
              </button>

              {/* Collapsible Lessons List */}
              {isExpanded && (
                <div className="bg-slate-50/40 px-2 py-1.5 space-y-1">
                  {filteredLessons.length > 0 ? (
                    filteredLessons.map((lesson, lIdx) => {
                      const isCurrentLesson = isCurrentModule && lesson.slug === activeLessonSlug;
                      const isCompleted = !!lesson.isCompleted;

                      const href = languageSlug && sectionSlug
                        ? `/${languageSlug}/${sectionSlug}/${mod.slug}/${lesson.slug}`
                        : undefined;

                      const content = (
                        <>
                          {/* Active / Completed indicator icon */}
                          <div className="mt-0.5 shrink-0">
                            {isCompleted ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : isCurrentLesson ? (
                              <span className="relative flex h-2.5 w-2.5 mt-0.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-600" />
                              </span>
                            ) : (
                              <span className="w-2.5 h-2.5 rounded-full border border-slate-300 inline-block mt-0.5" />
                            )}
                          </div>

                          {(() => {
                            const titleLower = lesson.title.toLowerCase();
                            const isFinal = titleLower.includes('final project') || titleLower.includes('capstone');
                            const isProject = !isFinal && titleLower.includes('mini project');
                            const isChallenge = titleLower.includes('challenge') || titleLower.includes('debugging');
                            const isPractice = titleLower.includes('practice');

                            return (
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1.5">
                                  <p className="leading-snug truncate">
                                    {lIdx + 1}. {lesson.title}
                                  </p>
                                  {isFinal && (
                                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 shrink-0">
                                      🏆 Capstone
                                    </span>
                                  )}
                                  {isProject && (
                                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-brand-100 text-brand-800 border border-brand-200 shrink-0">
                                      🚀 Project
                                    </span>
                                  )}
                                  {isChallenge && (
                                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 shrink-0">
                                      ⚡ Challenge
                                    </span>
                                  )}
                                  {isPractice && (
                                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                                      🛠️ Practice
                                    </span>
                                  )}
                                </div>
                                <span className={`text-[10px] font-mono block mt-0.5 ${
                                  isCurrentLesson ? 'text-brand-700' : 'text-slate-400'
                                }`}>
                                  ~{lesson.estimatedMinutes}m • {lesson.difficulty}
                                </span>
                              </div>
                            );
                          })()}
                        </>
                      );

                      const itemClasses = `w-full text-left p-2.5 sm:p-3 rounded-xl text-xs transition-all flex items-start space-x-2.5 min-h-[44px] cursor-pointer ${
                        isCurrentLesson
                          ? 'bg-brand-50 text-brand-950 font-semibold border-l-3 border-brand-600 shadow-xs'
                          : 'text-slate-700 hover:bg-white hover:text-slate-900'
                      }`;

                      if (href) {
                        return (
                          <Link
                            key={lesson.id}
                            href={href}
                            scroll={false}
                            ref={isCurrentLesson ? (el => { activeItemRef.current = el; }) : undefined}
                            onClick={(e) => {
                              if (!e.metaKey && !e.ctrlKey) {
                                e.preventDefault();
                                onSelectLesson(mod.slug, lesson.slug);
                                onCloseMobileDrawer?.();
                              }
                            }}
                            className={itemClasses}
                          >
                            {content}
                          </Link>
                        );
                      }

                      return (
                        <button
                          key={lesson.id}
                          ref={isCurrentLesson ? (el => { activeItemRef.current = el; }) : undefined}
                          onClick={() => {
                            onSelectLesson(mod.slug, lesson.slug);
                            onCloseMobileDrawer?.();
                          }}
                          className={itemClasses}
                        >
                          {content}
                        </button>
                      );
                    })
                  ) : (
                    <p className="text-[11px] text-slate-400 italic p-2">
                      No matching lessons found.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

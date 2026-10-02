"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Module, LessonSummary } from '@learnbyself/types';
import { Badge, ProgressBar } from '@learnbyself/ui';

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

  // Automatically keep current module expanded if user navigates
  useEffect(() => {
    if (activeModuleSlug) {
      setExpandedModules(prev => ({
        ...prev,
        [activeModuleSlug]: true
      }));
    }
  }, [activeModuleSlug]);

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

  return (
    <div className={`flex flex-col bg-white border border-slate-200/90 rounded-2xl shadow-subtle overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/60">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 font-mono">
            Section Modules
          </span>
          <div className="flex items-center space-x-2 text-[11px] text-slate-500">
            <button
              onClick={expandAll}
              className="hover:text-brand-600 font-medium py-0.5"
            >
              Expand All
            </button>
            <span>•</span>
            <button
              onClick={collapseAll}
              className="hover:text-brand-600 font-medium py-0.5"
            >
              Collapse
            </button>
            {isMobileDrawer && (
              <button
                onClick={onCloseMobileDrawer}
                className="ml-2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Close drawer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <h3 className="text-sm font-bold text-slate-900 leading-snug">
          {sectionTitle}
        </h3>

        {/* Quick search input */}
        <div className="mt-2.5 relative">
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search lessons..."
            className="w-full text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 pl-7 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500"
          />
          <span className="absolute left-2 top-2 text-xs text-slate-400">🔍</span>
        </div>
      </div>

      {/* Modules Accordion List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 max-h-[calc(100vh-14rem)]">
        {modules.map((mod, modIdx) => {
          const isExpanded = !!expandedModules[mod.slug] || !!filterQuery.trim();
          const isCurrentModule = mod.slug === activeModuleSlug;

          const filteredLessons = filterQuery.trim()
            ? mod.lessons.filter(l => l.title.toLowerCase().includes(filterQuery.toLowerCase()))
            : mod.lessons;

          if (filterQuery.trim() && filteredLessons.length === 0) {
            return null;
          }

          return (
            <div key={mod.id} className="transition-colors">
              {/* Module Accordion Trigger */}
              <button
                onClick={() => toggleModule(mod.slug)}
                className={`w-full text-left p-3.5 flex items-start justify-between gap-2 hover:bg-slate-50 transition-colors min-h-[44px] ${
                  isCurrentModule ? 'bg-brand-50/20' : ''
                }`}
                aria-expanded={isExpanded}
              >
                <div className="flex items-start space-x-2.5 flex-1 min-w-0">
                  <span className="text-xs text-slate-400 font-mono mt-0.5 select-none">
                    {isExpanded ? '▼' : '▶'}
                  </span>
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-bold text-slate-400 font-mono">
                        {String(modIdx + 1).padStart(2, '0')}
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

                {mod.progressPercent !== undefined && mod.progressPercent > 0 && (
                  <Badge variant="blue" size="sm" className="flex-shrink-0 text-[10px]">
                    {mod.progressPercent}%
                  </Badge>
                )}
              </button>

              {/* Collapsible Lessons List */}
              {isExpanded && (
                <div className="bg-slate-50/50 px-2 py-1.5 space-y-1">
                  {filteredLessons.length > 0 ? (
                    filteredLessons.map((lesson, lIdx) => {
                      const isCurrentLesson = isCurrentModule && lesson.slug === activeLessonSlug;
                      const isCompleted = !!lesson.isCompleted;

                      const href = languageSlug && sectionSlug
                        ? `/${languageSlug}/${sectionSlug}/${mod.slug}/${lesson.slug}`
                        : undefined;

                      const content = (
                        <>
                          <span className="mt-0.5 font-mono select-none">
                            {isCompleted ? (
                              <span className={isCurrentLesson ? 'text-white' : 'text-emerald-600 font-bold'}>✓</span>
                            ) : isCurrentLesson ? (
                              <span className="text-white font-bold">●</span>
                            ) : (
                              <span className="text-slate-300">○</span>
                            )}
                          </span>

                          <div className="flex-1 min-w-0">
                            <p className="leading-snug truncate">
                              {lIdx + 1}. {lesson.title}
                            </p>
                            <span className={`text-[10px] font-mono block mt-0.5 ${
                              isCurrentLesson ? 'text-brand-100' : 'text-slate-400'
                            }`}>
                              ~{lesson.estimatedMinutes}m • {lesson.difficulty}
                            </span>
                          </div>
                        </>
                      );

                      const itemClasses = `w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start space-x-2.5 min-h-[40px] cursor-pointer ${
                        isCurrentLesson
                          ? 'bg-brand-600 text-white font-bold shadow-subtle'
                          : 'text-slate-700 hover:bg-white hover:text-slate-900'
                      }`;

                      if (href) {
                        return (
                          <Link
                            key={lesson.id}
                            href={href}
                            onClick={() => {
                              onSelectLesson(mod.slug, lesson.slug);
                              onCloseMobileDrawer?.();
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
                      Lessons coming soon for this module.
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

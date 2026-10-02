# -*- coding: utf-8 -*-
import os

def write_file(path, content):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {path}")

# 1. curriculum-accordion-sidebar.tsx
write_file("apps/web/components/curriculum/curriculum-accordion-sidebar.tsx", """"use client";

import React, { useState } from 'react';
import type { Module, LessonSummary } from '@learnbyself/types';
import { Badge, ProgressBar } from '@learnbyself/ui';

interface CurriculumAccordionSidebarProps {
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

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            onSelectLesson(mod.slug, lesson.slug);
                            onCloseMobileDrawer?.();
                          }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start space-x-2.5 min-h-[40px] ${
                            isCurrentLesson
                              ? 'bg-brand-600 text-white font-bold shadow-subtle'
                              : 'text-slate-700 hover:bg-white hover:text-slate-900'
                          }`}
                        >
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
""")

# 2. learning-studio-header.tsx
write_file("apps/web/components/curriculum/learning-studio-header.tsx", """import React from 'react';
import Link from 'next/link';
import { Badge, Button } from '@learnbyself/ui';

interface LearningStudioHeaderProps {
  languageSlug: string;
  sectionTitle: string;
  moduleTitle: string;
  lessonTitle: string;
  difficulty?: string;
  estimatedMinutes?: number;
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
  difficulty = 'easy',
  estimatedMinutes = 15,
  onOpenMobileSyllabus,
  onPrevLesson,
  onNextLesson,
  hasPrev = false,
  hasNext = false
}) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-subtle space-y-3">
      {/* Breadcrumb row & Mobile syllabus button */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5 font-medium">
          <Link href={`/${languageSlug}`} className="hover:text-brand-600 uppercase font-bold tracking-wider">
            {languageSlug}
          </Link>
          <span>/</span>
          <span className="text-slate-600">{sectionTitle}</span>
          <span>/</span>
          <span className="text-slate-800 font-semibold">{moduleTitle}</span>
        </div>

        {/* Mobile drawer trigger */}
        <button
          onClick={onOpenMobileSyllabus}
          className="lg:hidden flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-semibold border border-brand-200 transition-colors min-h-[36px]"
          aria-label="Open course modules drawer"
        >
          <span>📚</span>
          <span>All Modules</span>
        </button>
      </div>

      {/* Main title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Badge variant="blue" size="sm">ACTIVE LESSON</Badge>
            <Badge variant="slate" size="sm">{difficulty.toUpperCase()}</Badge>
            <span className="text-xs text-slate-400 font-mono">~{estimatedMinutes}m</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {lessonTitle}
          </h1>
        </div>

        {/* Quick Prev / Next Lesson triggers */}
        <div className="flex items-center space-x-2 self-start sm:self-center">
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
""")

# 3. learning-studio.tsx
write_file("apps/web/components/curriculum/learning-studio.tsx", """"use client";

import React, { useState, useEffect } from 'react';
import type { Section, LessonDetail, LessonSummary } from '@learnbyself/types';
import { Tabs, TabItem, Card, Badge, Alert, CodeBlock, Button, ProgressBar } from '@learnbyself/ui';
import { CurriculumAccordionSidebar } from './curriculum-accordion-sidebar';
import { LearningStudioHeader } from './learning-studio-header';
import { QuizRunner } from '../practice/quiz-runner';
import { ChecklistRunner } from '../practice/checklist-runner';
import { CompletionCard } from './completion-card';
import { storage } from '@/lib/storage';

interface LearningStudioProps {
  languageSlug: string;
  section: Section;
  initialLesson: LessonDetail;
}

export const LearningStudio: React.FC<LearningStudioProps> = ({
  languageSlug,
  section,
  initialLesson
}) => {
  const [activeModuleSlug, setActiveModuleSlug] = useState(initialLesson.moduleSlug);
  const [activeLessonSlug, setActiveLessonSlug] = useState(initialLesson.slug);
  const [currentLesson, setCurrentLesson] = useState<LessonDetail>(initialLesson);
  const [activeTab, setActiveTab] = useState('concept');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Sync active lesson with local storage for ContinueLearning banner
  useEffect(() => {
    storage.set('last_lesson', {
      languageSlug,
      languageName: languageSlug.toUpperCase(),
      sectionSlug: section.slug,
      moduleSlug: currentLesson.moduleSlug,
      lessonSlug: currentLesson.slug,
      lessonTitle: currentLesson.title,
      progressPercent: 40
    });
  }, [languageSlug, section.slug, currentLesson]);

  // Handle switching lessons
  const handleSelectLesson = (moduleSlug: string, lessonSlug: string) => {
    setActiveModuleSlug(moduleSlug);
    setActiveLessonSlug(lessonSlug);
    setActiveTab('concept');

    // Update browser URL silently without page reload so user can refresh/bookmark
    if (typeof window !== 'undefined') {
      window.history.pushState(
        null,
        '',
        `/${languageSlug}/${section.slug}/${moduleSlug}/${lessonSlug}`
      );
    }

    // In local development, if selecting the same initial lesson or mock lesson
    if (lessonSlug === initialLesson.slug && moduleSlug === initialLesson.moduleSlug) {
      setCurrentLesson(initialLesson);
    } else {
      // Find summary from section modules
      const mod = section.modules.find(m => m.slug === moduleSlug);
      const summary = mod?.lessons.find(l => l.slug === lessonSlug);
      if (summary) {
        // Construct dynamic lesson detail
        setCurrentLesson({
          ...initialLesson,
          id: summary.id,
          slug: summary.slug,
          moduleSlug: mod!.slug,
          sectionSlug: section.slug,
          title: summary.title,
          summary: summary.summary,
          difficulty: summary.difficulty,
          estimatedMinutes: summary.estimatedMinutes
        });
      }
    }
  };

  // Compute Prev / Next lesson pointers in current section
  const allSectionLessons: { moduleSlug: string; lesson: LessonSummary }[] = [];
  section.modules.forEach(m => {
    m.lessons.forEach(l => {
      allSectionLessons.push({ moduleSlug: m.slug, lesson: l });
    });
  });

  const currentIndex = allSectionLessons.findIndex(
    item => item.moduleSlug === activeModuleSlug && item.lesson.slug === activeLessonSlug
  );

  const prevItem = currentIndex > 0 ? allSectionLessons[currentIndex - 1] : null;
  const nextItem = currentIndex < allSectionLessons.length - 1 && currentIndex !== -1
    ? allSectionLessons[currentIndex + 1]
    : null;

  const currentMod = section.modules.find(m => m.slug === activeModuleSlug) || section.modules[0];

  // Activities
  const analogyActivity = currentLesson.activities.find(a => a.type === 'analogy');
  const conceptActivity = currentLesson.activities.find(a => a.type === 'concept');
  const codeActivity = currentLesson.activities.find(a => a.type === 'code_walkthrough');
  const mcqActivities = currentLesson.activities.filter(a => a.type === 'mcq' || a.type === 'debugging');
  const interviewActivity = currentLesson.activities.find(a => a.type === 'interview_qa');
  const checklistActivity = currentLesson.activities.find(a => a.type === 'self_evaluation');

  const studioTabs: TabItem[] = [
    { id: 'concept', label: '1. Learn & Deconstruct', icon: '💡' },
    { id: 'practice', label: '2. Practice & Bug Hunt', icon: '✍️', badge: `${mcqActivities.length}` },
    { id: 'interview', label: '3. Placement Interview Q&A', icon: '🎯' },
    { id: 'checklist', label: '4. Self Check & Notes', icon: '✅' }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start pb-20">
      {/* 1. Left Side: Modules Accordion Sidebar (Desktop) */}
      <aside className="hidden lg:block w-80 flex-shrink-0 sticky top-20 self-start">
        <CurriculumAccordionSidebar
          sectionTitle={section.title}
          modules={section.modules}
          activeModuleSlug={activeModuleSlug}
          activeLessonSlug={activeLessonSlug}
          onSelectLesson={handleSelectLesson}
        />
      </aside>

      {/* Mobile Slide-Over Drawer for Modules */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-floating p-4 flex flex-col z-10">
            <CurriculumAccordionSidebar
              sectionTitle={section.title}
              modules={section.modules}
              activeModuleSlug={activeModuleSlug}
              activeLessonSlug={activeLessonSlug}
              onSelectLesson={handleSelectLesson}
              isMobileDrawer
              onCloseMobileDrawer={() => setMobileDrawerOpen(false)}
              className="border-0 shadow-none h-full"
            />
          </div>
        </div>
      )}

      {/* 2. Main Area: Unified Interactive Learning Studio */}
      <main className="flex-1 w-full min-w-0 space-y-6">
        {/* Header */}
        <LearningStudioHeader
          languageSlug={languageSlug}
          sectionTitle={section.title}
          moduleTitle={currentMod?.title || 'Active Module'}
          lessonTitle={currentLesson.title}
          difficulty={currentLesson.difficulty}
          estimatedMinutes={currentLesson.estimatedMinutes || 15}
          onOpenMobileSyllabus={() => setMobileDrawerOpen(true)}
          hasPrev={!!prevItem}
          hasNext={!!nextItem}
          onPrevLesson={() => prevItem && handleSelectLesson(prevItem.moduleSlug, prevItem.lesson.slug)}
          onNextLesson={() => nextItem && handleSelectLesson(nextItem.moduleSlug, nextItem.lesson.slug)}
        />

        {/* Navigation Tabs */}
        <Tabs tabs={studioTabs} defaultTab={activeTab} onChange={setActiveTab} />

        {/* Tab 1: Concept & Deconstruction */}
        {activeTab === 'concept' && (
          <div className="space-y-6 animate-fadeIn">
            {analogyActivity?.analogy && (
              <Alert type="info" title={`Mental Model: ${analogyActivity.analogy.headline}`}>
                <p className="leading-relaxed mb-3 text-sm">{analogyActivity.analogy.story}</p>
                <div className="bg-white/80 p-3 rounded-lg border border-brand-200 text-xs font-semibold text-brand-900">
                  Key Takeaway: {analogyActivity.analogy.keyTakeaway}
                </div>
              </Alert>
            )}

            {conceptActivity && (
              <Card className="space-y-3.5">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <span>📘</span>
                  <span>{conceptActivity.title}</span>
                </h3>
                <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed space-y-2">
                  {conceptActivity.content}
                </div>
              </Card>
            )}

            {codeActivity && (
              <Card className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <span>💻</span>
                  <span>{codeActivity.title}</span>
                </h3>

                {codeActivity.codeSnippet && (
                  <CodeBlock
                    code={codeActivity.codeSnippet}
                    language="java"
                    filename="Main.java"
                    showLineNumbers
                  />
                )}

                <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed pt-1">
                  {codeActivity.description}
                </div>
              </Card>
            )}

            <div className="flex justify-end pt-2">
              <Button variant="primary" onClick={() => setActiveTab('practice')}>
                Continue to Practice & Bug Hunt →
              </Button>
            </div>
          </div>
        )}

        {/* Tab 2: Practice & Bug Hunt */}
        {activeTab === 'practice' && (
          <div className="space-y-6 animate-fadeIn">
            {mcqActivities.length > 0 ? (
              mcqActivities.map((act) => (
                act.questions ? (
                  <QuizRunner
                    key={act.id}
                    questions={act.questions}
                    categoryTitle={act.title}
                  />
                ) : null
              ))
            ) : (
              <Card className="text-center py-8 text-slate-500">
                Practice challenges being prepared for this lesson.
              </Card>
            )}

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setActiveTab('concept')}>
                ← Back to Concept
              </Button>
              <Button variant="primary" onClick={() => setActiveTab('interview')}>
                Continue to Placement Q&A →
              </Button>
            </div>
          </div>
        )}

        {/* Tab 3: Placement Interview Q&A */}
        {activeTab === 'interview' && (
          <div className="space-y-6 animate-fadeIn">
            {interviewActivity?.interviewQA ? (
              interviewActivity.interviewQA.map((qa) => (
                <Card key={qa.id} className="space-y-4 border-purple-200/80 bg-purple-50/10">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-100 pb-2">
                    <div className="flex flex-wrap gap-1.5">
                      {qa.companyTags?.map((tag, idx) => (
                        <Badge key={idx} variant="purple" size="sm">{tag}</Badge>
                      ))}
                    </div>
                    <span className="text-xs text-purple-700 font-semibold font-mono">Frequent Technical Question</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    Q: {qa.question}
                  </h4>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <span className="font-bold text-slate-900 block mb-1">Expected Model Answer:</span>
                    {qa.expectedAnswer}
                  </div>

                  <div className="space-y-1 text-xs text-slate-700">
                    <span className="font-bold text-slate-900">Key Points to Highlight:</span>
                    <ul className="list-disc list-inside space-y-0.5 mt-1 text-slate-600">
                      {qa.keyPoints.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="text-center py-8 text-slate-500">
                Placement interview questions being loaded for this topic.
              </Card>
            )}

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setActiveTab('practice')}>
                ← Back to Practice
              </Button>
              <Button variant="primary" onClick={() => setActiveTab('checklist')}>
                Continue to Self-Mastery Check →
              </Button>
            </div>
          </div>
        )}

        {/* Tab 4: Self Check & Notes */}
        {activeTab === 'checklist' && (
          <div className="space-y-6 animate-fadeIn">
            {checklistActivity?.checklist && (
              <ChecklistRunner
                lessonId={currentLesson.id}
                items={checklistActivity.checklist}
              />
            )}

            {/* Completion Card */}
            <CompletionCard
              type={nextItem ? 'lesson' : 'module'}
              title={currentLesson.title}
              nextTitle={nextItem?.lesson.title || 'Next Section'}
              nextHref={nextItem ? `/${languageSlug}/${section.slug}/${nextItem.moduleSlug}/${nextItem.lesson.slug}` : `/${languageSlug}`}
            />
          </div>
        )}

        {/* Bottom Sticky Action Dock */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Button
            variant="outline"
            size="md"
            disabled={!prevItem}
            onClick={() => prevItem && handleSelectLesson(prevItem.moduleSlug, prevItem.lesson.slug)}
            className="w-full sm:w-auto"
          >
            ← Previous Lesson
          </Button>

          <Button
            variant="success"
            size="md"
            disabled={!nextItem}
            onClick={() => nextItem && handleSelectLesson(nextItem.moduleSlug, nextItem.lesson.slug)}
            className="w-full sm:w-auto font-semibold"
          >
            Mark Complete & Next Lesson →
          </Button>
        </div>
      </main>
    </div>
  );
};
""")

print("Learning studio components generated.")

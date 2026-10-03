"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Section, LessonDetail, LessonSummary } from '@learnbyself/types';
import { Tabs, TabItem, Card, Badge, Alert, Button } from '@learnbyself/ui';
import { Lightbulb, Code2, Terminal, Copy, Check, CheckCircle2, ArrowRight } from 'lucide-react';
import { CurriculumAccordionSidebar } from './curriculum-accordion-sidebar';
import { LearningStudioHeader } from './learning-studio-header';
import { InterviewCard } from './interview-card';
import { QuizRunner } from '../practice/quiz-runner';
import { AssignmentRunner } from '../practice/assignment-runner';
import { ChecklistRunner } from '../practice/checklist-runner';
import { JvmArchitectureVisualizer } from './jvm-visualizer';
import { InteractiveCodeExplainer } from './interactive-code-explainer';
import { OsSetupGuide } from './os-setup-guide';
import { EditorialArticle } from './editorial-article';
import { SummaryCheatSheet } from './summary-cheatsheet';
import { PracticeProblemsList } from '../practice/practice-problems-list';
import { MiniProjectStudio } from './mini-project-studio';
import { MobileCurriculumBottomBar } from './mobile-curriculum-bottom-bar';
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
  const router = useRouter();
  const [activeModuleSlug, setActiveModuleSlug] = useState(initialLesson.moduleSlug);
  const [activeLessonSlug, setActiveLessonSlug] = useState(initialLesson.slug);
  const [currentLesson, setCurrentLesson] = useState<LessonDetail>(initialLesson);
  const [activeTab, setActiveTab] = useState('concept');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Synchronize state whenever initialLesson prop changes on route transition
  useEffect(() => {
    setCurrentLesson(initialLesson);
    setActiveModuleSlug(initialLesson.moduleSlug);
    setActiveLessonSlug(initialLesson.slug);
    setActiveTab('concept');
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [initialLesson]);

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

  // Handle switching lessons via Next.js router
  const handleSelectLesson = useCallback((moduleSlug: string, lessonSlug: string) => {
    setActiveModuleSlug(moduleSlug);
    setActiveLessonSlug(lessonSlug);
    setActiveTab('concept');
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    router.push(`/${languageSlug}/${section.slug}/${moduleSlug}/${lessonSlug}`, { scroll: false });
  }, [languageSlug, section.slug, router]);

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

  const analogyActivity = currentLesson.activities.find(a => a.type === 'analogy');
  const conceptActivity = currentLesson.activities.find(a => a.type === 'concept');
  const codeActivities = currentLesson.activities.filter(a => a.type === 'code_walkthrough');
  const mcqActivities = currentLesson.activities.filter(a => a.type === 'mcq' || a.type === 'output_prediction');
  const totalQuestions = mcqActivities.reduce((acc, act: any) => acc + (act.questions?.length || act.mcq?.questions?.length || 0), 0);
  const practiceActivity = currentLesson.activities.find(a => a.practice);
  const practiceProblems = currentLesson.practiceProblems || [];
  const interviewActivity = currentLesson.activities.find(a => a.type === 'interview_qa');
  const interviewCount = interviewActivity?.interviewQA?.length || 0;
  const checklistActivity = currentLesson.activities.find(a => a.type === 'self_evaluation');
  const hasMiniProjectPayload = !!currentLesson.miniProject || !!(currentLesson as any).project;
  const isMiniProject =
    hasMiniProjectPayload &&
    (currentLesson.moduleSlug === 'mini-projects' ||
     currentLesson.moduleSlug === 'oop-mini-projects' ||
     currentLesson.isMiniProject ||
     currentLesson.title.toLowerCase().includes('portfolio'));

  const studioTabs: TabItem[] = [
    { id: 'concept', label: '1. Learn' },
    { id: 'mcq', label: '2. MCQ', badge: totalQuestions > 0 ? `${totalQuestions}` : undefined },
    { id: 'practice', label: '3. Practice', badge: practiceProblems.length > 0 ? `${practiceProblems.length}` : undefined },
    { id: 'interview', label: '4. Interview Q&A', badge: interviewCount > 0 ? `${interviewCount}` : undefined },
    { id: 'summary', label: '5. Summary' },
    { id: 'checklist', label: '6. Checklist' }
  ];

  const handleNextLessonWithCelebration = () => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2500);
    if (nextItem) {
      handleSelectLesson(nextItem.moduleSlug, nextItem.lesson.slug);
    }
  };

  // Close mobile syllabus drawer on Escape key and lock body scroll
  useEffect(() => {
    if (!mobileDrawerOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileDrawerOpen(false);
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileDrawerOpen]);

  // Smooth scroll to top of studio content on tab change if scrolled down
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    if (typeof window !== 'undefined' && window.scrollY > 180) {
      const mainEl = document.getElementById('lesson-studio-main');
      if (mainEl) {
        const yOffset = -70;
        const y = mainEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    }
  };

  // Keyboard navigation shortcuts: Alt + ArrowRight for Next, Alt + ArrowLeft for Prev
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if (e.altKey && e.key === 'ArrowRight') {
        if (nextItem) {
          e.preventDefault();
          handleSelectLesson(nextItem.moduleSlug, nextItem.lesson.slug);
        }
      } else if (e.altKey && e.key === 'ArrowLeft') {
        if (prevItem) {
          e.preventDefault();
          handleSelectLesson(prevItem.moduleSlug, prevItem.lesson.slug);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevItem, nextItem, handleSelectLesson]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start pb-28 lg:pb-16">
      {/* 1. Left Side: Modules Accordion Sidebar (Desktop) - collapsed in Focus Mode */}
      {!isFocusMode && (
        <aside className="hidden lg:block w-80 flex-shrink-0 sticky top-20 self-start animate-fadeIn">
          <CurriculumAccordionSidebar
            languageSlug={languageSlug}
            sectionSlug={section.slug}
            sectionTitle={section.title}
            modules={section.modules}
            activeModuleSlug={activeModuleSlug}
            activeLessonSlug={activeLessonSlug}
            onSelectLesson={handleSelectLesson}
          />
        </aside>
      )}

      {/* Mobile Slide-Over Drawer for Modules */}
      {mobileDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Curriculum Syllabus Drawer"
          className="fixed inset-0 z-50 flex lg:hidden"
        >
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
            onClick={() => setMobileDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-[88vw] max-w-sm sm:max-w-md bg-white h-full shadow-2xl p-3 sm:p-4 flex flex-col z-10 animate-slideInLeft">
            <CurriculumAccordionSidebar
              languageSlug={languageSlug}
              sectionSlug={section.slug}
              sectionTitle={section.title}
              modules={section.modules}
              activeModuleSlug={activeModuleSlug}
              activeLessonSlug={activeLessonSlug}
              onSelectLesson={handleSelectLesson}
              isMobileDrawer
              onCloseMobileDrawer={() => setMobileDrawerOpen(false)}
              className="border-0 shadow-none h-full flex-1"
            />
          </div>
        </div>
      )}

      {/* 2. Main Area: Unified Interactive Learning Studio */}
      <main id="lesson-studio-main" className="flex-1 w-full min-w-0 space-y-6">
        {/* Header with Gamification & Focus Mode */}
        <LearningStudioHeader
          languageSlug={languageSlug}
          sectionTitle={section.title}
          sectionSlug={section.slug}
          moduleTitle={currentMod?.title || 'Getting Started'}
          moduleSlug={activeModuleSlug}
          lessonTitle={currentLesson.title}
          lessonIndex={currentMod?.lessons.findIndex(l => l.slug === activeLessonSlug || l.slug === currentLesson.slug)}
          totalLessons={currentMod?.lessons.length || 10}
          difficulty={currentLesson.difficulty}
          estimatedMinutes={currentLesson.estimatedMinutes || 15}
          isFocusMode={isFocusMode}
          onToggleFocusMode={() => setIsFocusMode(!isFocusMode)}
          onOpenMobileSyllabus={() => setMobileDrawerOpen(true)}
          hasPrev={!!prevItem}
          hasNext={!!nextItem}
          prevLessonTitle={prevItem?.lesson.title}
          nextLessonTitle={nextItem?.lesson.title}
          onPrevLesson={() => prevItem && handleSelectLesson(prevItem.moduleSlug, prevItem.lesson.slug)}
          onNextLesson={() => nextItem && handleSelectLesson(nextItem.moduleSlug, nextItem.lesson.slug)}
        />

        {isMiniProject ? (
          <MiniProjectStudio lesson={currentLesson} />
        ) : (
          <>
            {/* Navigation Tabs */}
            <Tabs tabs={studioTabs} defaultTab={activeTab} onChange={handleTabChange} />

        {/* Tab 1: Concept & Core Understanding */}
        {activeTab === 'concept' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Playful Interactive Studio Components based on Lesson Slug */}
            {(currentLesson.slug === 'java-and-jvm' || currentLesson.slug === 'what-is-java-and-the-jvm') && (
              <JvmArchitectureVisualizer />
            )}

            {(currentLesson.slug === 'install-java' || currentLesson.slug === 'installing-java-on-windows-and-mac') && (
              <OsSetupGuide />
            )}

            {(currentLesson.slug === 'your-first-program' || currentLesson.slug === 'your-first-java-program-and-execution') && (
              <InteractiveCodeExplainer />
            )}

            {/* 2. Main Editorial Concept Lesson with Rich Visual Cards & Steps */}
            {conceptActivity && (
              <EditorialArticle
                title={conceptActivity.title}
                content={conceptActivity.content || ''}
              />
            )}

            {/* 3. Verified Java Code Showcases & Terminal Previews */}
            {codeActivities.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-2">
                  <Code2 className="w-4 h-4 text-brand-600" />
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    Step-by-Step Code Examples ({codeActivities.length} {codeActivities.length === 1 ? 'Example' : 'Examples'})
                  </h3>
                </div>

                {codeActivities.map((codeAct, idx) => {
                  const snippetId = codeAct.id || `code-${idx}`;
                  const isSnippetCopied = copiedSnippetId === snippetId;

                  return (
                    <div key={snippetId} className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-subtle space-y-0">
                      <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full bg-brand-600/30 text-brand-300 font-mono text-[11px] font-bold flex items-center justify-center border border-brand-500/30">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-semibold text-slate-200">
                            {codeAct.title || `Example ${idx + 1}`}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            const snippet = codeAct.codeSnippet || (codeAct as any).code || '';
                            navigator.clipboard.writeText(snippet);
                            setCopiedSnippetId(snippetId);
                            setTimeout(() => setCopiedSnippetId(null), 2000);
                          }}
                          className="text-xs text-slate-400 hover:text-white flex items-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          {isSnippetCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="p-4 bg-slate-950 overflow-x-auto text-xs font-mono text-slate-100 leading-relaxed">
                        <pre>{codeAct.codeSnippet || (codeAct as any).code}</pre>
                      </div>

                      {conceptActivity?.outputSnippet && idx === 0 && (
                        <div className="p-3.5 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-emerald-400">
                          <div className="flex items-center space-x-2">
                            <Terminal className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-slate-400">Terminal Output:</span>
                            <span className="font-semibold text-emerald-300">{conceptActivity.outputSnippet}</span>
                          </div>
                          <span className="text-[11px] text-slate-500 font-sans">✓ Verified Console Output</span>
                        </div>
                      )}

                      {codeAct.description && (
                        <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          <span className="font-semibold text-slate-800">Walkthrough: </span>
                          {codeAct.description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}


          </div>
        )}

        {/* Tab 2: MCQ Challenges */}
        {activeTab === 'mcq' && (
          <div className="space-y-6 animate-fadeIn">
            {mcqActivities.length > 0 ? (
              mcqActivities.map((act: any) => {
                const qList = act.questions || act.mcq?.questions;
                return qList && qList.length > 0 ? (
                  <QuizRunner
                    key={act.id}
                    questions={qList}
                    categoryTitle={act.title || "Interactive Concept Check (10 Questions)"}
                  />
                ) : null;
              })
            ) : (
              <Card className="text-center py-8 text-slate-500">
                MCQ challenges being prepared for this lesson.
              </Card>
            )}
          </div>
        )}

        {/* Tab 3: Practice Problems (Self-Paced Practical Challenges) */}
        {activeTab === 'practice' && (
          <div className="space-y-6 animate-fadeIn">
            {practiceProblems.length > 0 ? (
              <PracticeProblemsList
                lessonTitle={currentLesson.title}
                problems={practiceProblems}
              />
            ) : (
              <AssignmentRunner
                lessonId={currentLesson.id}
                title={practiceActivity?.practice?.title || `Assignment: Hands-on Practice for ${currentLesson.title}`}
                problemStatement={practiceActivity?.practice?.problemStatement || "Write and run a complete Java program to practice the concepts learned in this lesson."}
                requirements={practiceActivity?.practice?.requirements || [
                  "Class name must be 'Main'",
                  "Include standard entry point: public static void main(String[] args)",
                  "Ensure your code compiles without syntax errors"
                ]}
                initialCode={practiceActivity?.practice?.initialCode || codeActivities[0]?.codeSnippet || `public class Main {\n    public static void main(String[] args) {\n        // TODO: Practice your Java code here\n    }\n}`}
                expectedOutput={practiceActivity?.practice?.expectedOutput || ""}
                hints={practiceActivity?.practice?.hints}
              />
            )}
          </div>
        )}

        {/* Tab 4: Interview Q&A */}
        {activeTab === 'interview' && (
          <div className="space-y-6 animate-fadeIn">
            {interviewActivity?.interviewQA && interviewActivity.interviewQA.length > 0 ? (
              interviewActivity.interviewQA.map((qa, idx) => (
                <InterviewCard key={qa.id} qa={qa} index={idx} />
              ))
            ) : (
              <Card className="text-center py-8 text-slate-500">
                Interview questions being loaded for this topic.
              </Card>
            )}
          </div>
        )}

        {/* Tab: Summary / Cheat Sheet & Quick Revision */}
        {activeTab === 'summary' && (
          <SummaryCheatSheet lesson={currentLesson} />
        )}

        {/* Tab 5: Checklist */}
        {activeTab === 'checklist' && (
          <div className="space-y-6 animate-fadeIn">
            {checklistActivity?.checklist && (
              <ChecklistRunner
                lessonId={currentLesson.id}
                items={checklistActivity.checklist}
              />
            )}
          </div>
        )}
          </>
        )}

        {/* Clean Bottom Navigation: Previous and Next with Lesson Titles */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col items-start gap-1">
            {prevItem && (
              <span className="text-[11px] text-slate-400 font-medium truncate max-w-[240px]">
                ← {prevItem.lesson.title}
              </span>
            )}
            <Button
              variant="outline"
              size="md"
              disabled={!prevItem}
              onClick={() => prevItem && handleSelectLesson(prevItem.moduleSlug, prevItem.lesson.slug)}
              className="min-h-[42px] px-5 font-medium cursor-pointer"
            >
              ← Previous Lesson
            </Button>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center space-x-3">
              {showCelebration && (
                <span className="text-xs font-bold text-emerald-600 animate-bounce flex items-center gap-1">
                  <span>🎉</span> +50 XP
                </span>
              )}
              {nextItem && (
                <span className="text-[11px] text-slate-400 font-medium truncate max-w-[240px] text-right">
                  {nextItem.lesson.title} →
                </span>
              )}
            </div>
            <Button
              variant="primary"
              size="md"
              disabled={!nextItem}
              onClick={handleNextLessonWithCelebration}
              className="min-h-[42px] px-6 font-semibold shadow-subtle cursor-pointer"
            >
              Next Lesson →
            </Button>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Navigation (< lg screens) */}
      <MobileCurriculumBottomBar
        hasPrev={!!prevItem}
        hasNext={!!nextItem}
        onPrev={() => prevItem && handleSelectLesson(prevItem.moduleSlug, prevItem.lesson.slug)}
        onNext={handleNextLessonWithCelebration}
        prevLessonTitle={prevItem?.lesson.title}
        nextLessonTitle={nextItem?.lesson.title}
        onOpenSyllabus={() => setMobileDrawerOpen(true)}
        currentLessonIndex={currentMod?.lessons.findIndex(l => l.slug === activeLessonSlug || l.slug === currentLesson.slug)}
        totalLessons={currentMod?.lessons.length || 10}
        showCelebration={showCelebration}
      />
    </div>
  );
};

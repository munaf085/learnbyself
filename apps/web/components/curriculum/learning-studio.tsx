"use client";

import React, { useState, useEffect } from 'react';
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
  const [copied, setCopied] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Synchronize state whenever initialLesson prop changes on route transition
  useEffect(() => {
    setCurrentLesson(initialLesson);
    setActiveModuleSlug(initialLesson.moduleSlug);
    setActiveLessonSlug(initialLesson.slug);
    setActiveTab('concept');
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
  const handleSelectLesson = (moduleSlug: string, lessonSlug: string) => {
    setActiveModuleSlug(moduleSlug);
    setActiveLessonSlug(lessonSlug);
    setActiveTab('concept');

    router.push(`/${languageSlug}/${section.slug}/${moduleSlug}/${lessonSlug}`);
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

  const analogyActivity = currentLesson.activities.find(a => a.type === 'analogy');
  const conceptActivity = currentLesson.activities.find(a => a.type === 'concept');
  const codeActivity = currentLesson.activities.find(a => a.type === 'code_walkthrough');
  const mcqActivities = currentLesson.activities.filter(a => a.type === 'mcq' || a.type === 'output_prediction');
  const totalQuestions = mcqActivities.reduce((acc, act) => acc + (act.questions?.length || 0), 0);
  const practiceActivity = currentLesson.activities.find(a => a.practice);
  const practiceProblems = currentLesson.practiceProblems || [];
  const interviewActivity = currentLesson.activities.find(a => a.type === 'interview_qa');
  const interviewCount = interviewActivity?.interviewQA?.length || 0;
  const checklistActivity = currentLesson.activities.find(a => a.type === 'self_evaluation');

  const hasPractice = practiceProblems.length > 0 || !!practiceActivity?.practice;
  const studioTabs: TabItem[] = [
    { id: 'concept', label: '1. Learn' },
    { id: 'mcq', label: '2. MCQ', badge: totalQuestions > 0 ? `${totalQuestions}` : undefined },
    ...(hasPractice ? [{ id: 'practice', label: '3. Practice', badge: practiceProblems.length > 0 ? `${practiceProblems.length}` : undefined }] : []),
    { id: 'interview', label: `${hasPractice ? '4' : '3'}. Interview Q&A`, badge: interviewCount > 0 ? `${interviewCount}` : undefined },
    { id: 'summary', label: `${hasPractice ? '5' : '4'}. Summary` },
    { id: 'checklist', label: `${hasPractice ? '6' : '5'}. Checklist` }
  ];

  const handleNextLessonWithCelebration = () => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2500);
    if (nextItem) {
      handleSelectLesson(nextItem.moduleSlug, nextItem.lesson.slug);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start pb-20">
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
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-floating p-4 flex flex-col z-10">
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
              className="border-0 shadow-none h-full"
            />
          </div>
        </div>
      )}

      {/* 2. Main Area: Unified Interactive Learning Studio */}
      <main className="flex-1 w-full min-w-0 space-y-6">
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
          onPrevLesson={() => prevItem && handleSelectLesson(prevItem.moduleSlug, prevItem.lesson.slug)}
          onNextLesson={() => nextItem && handleSelectLesson(nextItem.moduleSlug, nextItem.lesson.slug)}
        />

        {/* Navigation Tabs */}
        <Tabs tabs={studioTabs} defaultTab={activeTab} onChange={setActiveTab} />

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

            {/* 3. Verified Java Code Showcase & Terminal Preview */}
            {codeActivity?.codeSnippet && (
              <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-subtle space-y-0">
                <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <Code2 className="w-4 h-4 text-brand-400" />
                    <span className="text-xs font-semibold text-slate-200">
                      {codeActivity.title || "Java Source Code"}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(codeActivity.codeSnippet || '');
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-xs text-slate-400 hover:text-white flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? (
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
                  <pre>{codeActivity.codeSnippet}</pre>
                </div>

                {conceptActivity?.outputSnippet && (
                  <div className="p-3.5 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-emerald-400">
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-400">Terminal Output:</span>
                      <span className="font-semibold text-emerald-300">{conceptActivity.outputSnippet}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-sans">✓ Verified Console Output</span>
                  </div>
                )}

                {codeActivity.description && (
                  <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-800">Walkthrough: </span>
                    {codeActivity.description}
                  </div>
                )}
              </div>
            )}


          </div>
        )}

        {/* Tab 2: MCQ Challenges */}
        {activeTab === 'mcq' && (
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
                initialCode={practiceActivity?.practice?.initialCode || codeActivity?.codeSnippet || `public class Main {\n    public static void main(String[] args) {\n        // TODO: Practice your Java code here\n    }\n}`}
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

        {/* Clean Bottom Navigation: Previous and Next only */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="md"
            disabled={!prevItem}
            onClick={() => prevItem && handleSelectLesson(prevItem.moduleSlug, prevItem.lesson.slug)}
            className="min-h-[42px] px-5 font-medium"
          >
            ← Previous
          </Button>

          <div className="flex items-center space-x-3">
            {showCelebration && (
              <span className="text-xs font-bold text-emerald-600 animate-bounce flex items-center gap-1">
                <span>🎉</span> +50 XP
              </span>
            )}
            <Button
              variant="primary"
              size="md"
              disabled={!nextItem}
              onClick={handleNextLessonWithCelebration}
              className="min-h-[42px] px-6 font-semibold"
            >
              Next →
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

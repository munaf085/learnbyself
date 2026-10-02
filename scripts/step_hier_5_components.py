# -*- coding: utf-8 -*-
import os

def write_file(path, content):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {path}")

# CourseHeader
write_file("apps/web/components/curriculum/course-header.tsx", """import React from 'react';
import Link from 'next/link';
import type { Course } from '@learnbyself/types';
import { Badge, ProgressBar, Button } from '@learnbyself/ui';

interface CourseHeaderProps {
  course: Course;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({ course }) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-5 shadow-subtle">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="purple" size="sm">{course.level.toUpperCase()}</Badge>
        <Badge variant="blue" size="sm">{course.estimatedHours} Hours Total</Badge>
        <Badge variant="green" size="sm">Zero Prerequisites</Badge>
        <span className="text-xs text-slate-400 font-mono">• 18 Sections Curriculum</span>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {course.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {course.headline}
        </p>
      </div>

      {/* Progress & Quick Action */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="w-full sm:w-72">
          <ProgressBar value={course.progressPercent || 25} label="Overall Java Progress" />
        </div>
        <Link href={`/${course.languageSlug}/basics`}>
          <Button variant="primary" size="md" className="w-full sm:w-auto font-semibold">
            Continue Learning →
          </Button>
        </Link>
      </div>
    </div>
  );
};
""")

# SectionCard
write_file("apps/web/components/curriculum/section-card.tsx", """import React from 'react';
import Link from 'next/link';
import type { Section } from '@learnbyself/types';
import { Card, Badge, ProgressBar } from '@learnbyself/ui';

interface SectionCardProps {
  section: Section;
  languageSlug: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({ section, languageSlug }) => {
  const isLocked = !!section.isLocked;
  const numStr = String(section.orderIndex).padStart(2, '0');

  const content = (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start space-x-4">
        <span className="font-mono text-xl sm:text-2xl font-extrabold text-slate-300">
          {numStr}
        </span>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {section.title}
            </h3>
            {isLocked ? (
              <Badge variant="slate" size="sm">🔒 Locked</Badge>
            ) : (
              section.progressPercent ? (
                <Badge variant="blue" size="sm">{section.progressPercent}% Complete</Badge>
              ) : (
                <Badge variant="green" size="sm">Ready to Start</Badge>
              )
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl">
            {section.summary}
          </p>
          <div className="text-xs text-slate-400 flex items-center space-x-3 pt-1">
            <span>{section.totalModules || section.modules.length} Modules</span>
            <span>•</span>
            <span>{section.totalLessons || 0} Lessons</span>
            <span>•</span>
            <span>~{section.estimatedHours || 5} Hours</span>
          </div>
        </div>
      </div>

      <div className="sm:self-center min-w-[120px] text-right">
        {!isLocked ? (
          <span className="inline-flex items-center text-xs font-bold text-brand-600 hover:text-brand-700">
            Open Section →
          </span>
        ) : (
          <span className="text-xs text-slate-400 italic">
            Prerequisites Required
          </span>
        )}
      </div>
    </div>
  );

  if (isLocked) {
    return (
      <Card variant="default" className="opacity-70 bg-slate-50/60 border-slate-200">
        {content}
      </Card>
    );
  }

  return (
    <Link href={`/${languageSlug}/${section.slug}`} className="block">
      <Card variant="interactive">
        {content}
      </Card>
    </Link>
  );
};
""")

# ModuleCard
write_file("apps/web/components/curriculum/module-card.tsx", """import React from 'react';
import Link from 'next/link';
import type { Module } from '@learnbyself/types';
import { Card, Badge, Button, ProgressBar } from '@learnbyself/ui';

interface ModuleCardProps {
  module: Module;
  languageSlug: string;
  sectionSlug: string;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, languageSlug, sectionSlug }) => {
  const isLocked = !!module.isLocked;
  const numStr = String(module.orderIndex).padStart(2, '0');

  return (
    <Card className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex items-start space-x-3.5">
          <span className="font-mono text-lg sm:text-xl font-extrabold text-brand-600/70 pt-0.5">
            {numStr}
          </span>
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              {module.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              {module.description}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-start">
          <Badge variant="blue" size="sm">
            {module.lessons.length} Lessons
          </Badge>
          <span className="text-xs text-slate-400 font-mono">
            ~{module.estimatedMinutes}m
          </span>
        </div>
      </div>

      {/* Learning Objectives */}
      {module.learningObjectives.length > 0 && (
        <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100 text-xs text-slate-700">
          <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            What you'll master:
          </span>
          <ul className="grid sm:grid-cols-2 gap-1 list-disc list-inside">
            {module.learningObjectives.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Progress & CTA */}
      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="w-full sm:w-48">
          <ProgressBar value={module.progressPercent || 0} showPercent />
        </div>

        {!isLocked ? (
          <Link href={`/${languageSlug}/${sectionSlug}/${module.slug}`}>
            <Button size="sm" variant="primary">
              View Module & Lessons →
            </Button>
          </Link>
        ) : (
          <Button size="sm" variant="outline" disabled>
            Locked
          </Button>
        )}
      </div>
    </Card>
  );
};
""")

# LessonSidebar (Desktop module sidebar showing CURRENT MODULE ONLY)
write_file("apps/web/components/curriculum/lesson-sidebar.tsx", """import React from 'react';
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
""")

# CompletionCard (Milestone modals & celebration cards)
write_file("apps/web/components/curriculum/completion-card.tsx", """import React from 'react';
import Link from 'next/link';
import { Button } from '@learnbyself/ui';

interface CompletionCardProps {
  type: 'lesson' | 'module' | 'section';
  title: string;
  nextTitle?: string;
  nextHref?: string;
}

export const CompletionCard: React.FC<CompletionCardProps> = ({
  type,
  title,
  nextTitle,
  nextHref
}) => {
  const configs = {
    lesson: {
      badge: '✓ LESSON COMPLETE',
      heading: title,
      sub: 'Great work! You have deconstructed the mental models and verified your understanding.',
      cta: 'Continue to Next Lesson →'
    },
    module: {
      badge: '🎉 MODULE COMPLETE',
      heading: title,
      sub: 'Outstanding achievement! You have mastered all topics and challenges in this module.',
      cta: 'Start Next Module →'
    },
    section: {
      badge: '🏆 SECTION MASTERED',
      heading: title,
      sub: 'Milestone reached! You have completed this foundational section and unlocked the next phase.',
      cta: 'Start Next Section →'
    }
  }[type];

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-subtle">
      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 tracking-wider">
        {configs.badge}
      </span>
      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
        {configs.heading}
      </h3>
      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
        {configs.sub}
      </p>

      {nextHref && nextTitle && (
        <div className="pt-2">
          <p className="text-xs text-slate-500 font-medium mb-2">Up Next: <span className="font-bold text-slate-800">{nextTitle}</span></p>
          <Link href={nextHref}>
            <Button variant="success" size="lg" className="font-semibold shadow-subtle">
              {configs.cta}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
""")

# StepWorkspace (Step-by-Step progressive learning engine)
write_file("apps/web/components/curriculum/step-workspace.tsx", """"use client";

import React, { useState } from 'react';
import type { LessonDetail } from '@learnbyself/types';
import { Card, Badge, Alert, CodeBlock, Button, ProgressBar } from '@learnbyself/ui';
import { QuizRunner } from '../practice/quiz-runner';
import { ChecklistRunner } from '../practice/checklist-runner';
import { CompletionCard } from './completion-card';

interface StepWorkspaceProps {
  lesson: LessonDetail;
  languageSlug: string;
  sectionSlug: string;
}

export const StepWorkspace: React.FC<StepWorkspaceProps> = ({
  lesson,
  languageSlug,
  sectionSlug
}) => {
  // Deconstruct lesson activities into step items
  const steps: {
    id: string;
    type: string;
    title: string;
    badge: string;
    content: React.ReactNode;
  }[] = [];

  const analogyActivity = lesson.activities.find(a => a.type === 'analogy');
  if (analogyActivity?.analogy) {
    steps.push({
      id: 'step-analogy',
      type: 'analogy',
      title: 'Mental Model: Why Does This Concept Exist?',
      badge: '💡 MENTAL MODEL',
      content: (
        <Alert type="info" title={analogyActivity.analogy.headline}>
          <p className="leading-relaxed mb-3 text-sm">{analogyActivity.analogy.story}</p>
          <div className="bg-white/80 p-3 rounded-lg border border-brand-200 text-xs font-semibold text-brand-900">
            Key Mental Model: {analogyActivity.analogy.keyTakeaway}
          </div>
        </Alert>
      )
    });
  }

  const conceptActivity = lesson.activities.find(a => a.type === 'concept');
  if (conceptActivity) {
    steps.push({
      id: 'step-concept',
      type: 'concept',
      title: conceptActivity.title,
      badge: '📘 CONCEPT ARCHITECTURE',
      content: (
        <Card className="space-y-4">
          <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed space-y-2">
            {conceptActivity.content}
          </div>
        </Card>
      )
    });
  }

  const codeActivity = lesson.activities.find(a => a.type === 'code_walkthrough');
  if (codeActivity) {
    steps.push({
      id: 'step-code',
      type: 'code',
      title: codeActivity.title,
      badge: '💻 CODE DECONSTRUCTION',
      content: (
        <Card className="space-y-4">
          {codeActivity.codeSnippet && (
            <CodeBlock
              code={codeActivity.codeSnippet}
              language="java"
              filename="Main.java"
              showLineNumbers
            />
          )}
          <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed pt-2">
            {codeActivity.description}
          </div>
        </Card>
      )
    });
  }

  const mcqActivities = lesson.activities.filter(a => a.type === 'mcq' || a.type === 'debugging');
  if (mcqActivities.length > 0) {
    steps.push({
      id: 'step-practice',
      type: 'practice',
      title: 'Guided Practice & Bug Hunting',
      badge: '✍️ GUIDED PRACTICE',
      content: (
        <div className="space-y-4">
          {mcqActivities.map((act) => (
            act.questions ? (
              <QuizRunner
                key={act.id}
                questions={act.questions}
                categoryTitle={act.title}
              />
            ) : null
          ))}
        </div>
      )
    });
  }

  const interviewActivity = lesson.activities.find(a => a.type === 'interview_qa');
  if (interviewActivity?.interviewQA) {
    steps.push({
      id: 'step-interview',
      type: 'interview',
      title: 'Top Placement Interview Questions',
      badge: '🎯 INTERVIEW READY',
      content: (
        <div className="space-y-4">
          {interviewActivity.interviewQA.map((qa) => (
            <Card key={qa.id} className="space-y-3.5 border-purple-200/80 bg-purple-50/10">
              <div className="flex flex-wrap gap-1.5 border-b border-purple-100 pb-2">
                {qa.companyTags?.map((tag, idx) => (
                  <Badge key={idx} variant="purple" size="sm">{tag}</Badge>
                ))}
              </div>
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                Q: {qa.question}
              </h4>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">Expected Answer:</span>
                {qa.expectedAnswer}
              </div>
              <div className="text-xs text-slate-700">
                <span className="font-bold text-slate-900">Key Points to Highlight:</span>
                <ul className="list-disc list-inside space-y-0.5 mt-1 text-slate-600">
                  {qa.keyPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      )
    });
  }

  const checklistActivity = lesson.activities.find(a => a.type === 'self_evaluation');
  if (checklistActivity?.checklist) {
    steps.push({
      id: 'step-checklist',
      type: 'checklist',
      title: 'Mastery Verification',
      badge: '✅ SELF CHECK',
      content: (
        <ChecklistRunner
          lessonId={lesson.id}
          items={checklistActivity.checklist}
        />
      )
    });
  }

  // Final Step: Celebration / Completion Card
  const nextTargetHref = lesson.nextLesson
    ? `/${languageSlug}/${sectionSlug}/${lesson.moduleSlug}/${lesson.nextLesson.slug}`
    : lesson.nextModule
    ? `/${languageSlug}/${lesson.nextModule.sectionSlug}/${lesson.nextModule.slug}`
    : `/${languageSlug}`;

  const nextTargetTitle = lesson.nextLesson
    ? lesson.nextLesson.title
    : lesson.nextModule
    ? lesson.nextModule.title
    : 'Course Dashboard';

  steps.push({
    id: 'step-completion',
    type: 'completion',
    title: 'Lesson Mastered!',
    badge: '🏆 COMPLETE',
    content: (
      <CompletionCard
        type={lesson.nextLesson ? 'lesson' : lesson.nextModule ? 'module' : 'section'}
        title={lesson.title}
        nextTitle={nextTargetTitle}
        nextHref={nextTargetHref}
      />
    )
  });

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const currentStep = steps[currentStepIdx];
  const stepPercent = ((currentStepIdx + 1) / steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Step Header with progress */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-subtle space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold text-brand-600">
              Step {currentStepIdx + 1} of {steps.length}
            </span>
            <span className="text-xs text-slate-300">•</span>
            <span className="text-xs font-semibold text-slate-700">{currentStep?.badge}</span>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            {lesson.title}
          </span>
        </div>

        <ProgressBar value={stepPercent} showPercent={false} />
      </div>

      {/* Step Content */}
      <div className="animate-fadeIn space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {currentStep?.title}
        </h2>
        {currentStep?.content}
      </div>

      {/* Step Navigation Actions */}
      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <Button
          variant="outline"
          size="md"
          disabled={currentStepIdx === 0}
          onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))}
          className="w-full sm:w-auto"
        >
          ← Previous Step
        </Button>

        {currentStepIdx < steps.length - 1 ? (
          <Button
            variant="primary"
            size="md"
            onClick={() => setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1))}
            className="w-full sm:w-auto font-semibold"
          >
            Continue Step →
          </Button>
        ) : (
          <a href={nextTargetHref} className="w-full sm:w-auto">
            <Button variant="success" size="md" className="w-full sm:w-auto font-semibold">
              Continue to Next Lesson →
            </Button>
          </a>
        )}
      </div>
    </div>
  );
};
""")

print("Curriculum components created.")

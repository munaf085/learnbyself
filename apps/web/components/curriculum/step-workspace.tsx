"use client";

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

# -*- coding: utf-8 -*-
import os

def write_file(path, content):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {path}")

# Breadcrumbs
write_file("apps/web/components/learning/breadcrumbs.tsx", """import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`text-xs ${className}`}>
      {/* Desktop view */}
      <ol className="hidden sm:flex items-center space-x-2 text-slate-500">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center space-x-2">
              {idx > 0 && <span className="text-slate-300">/</span>}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-brand-600 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={`font-semibold ${isLast ? 'text-slate-900' : 'text-slate-600'}`}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {/* Mobile condensed view */}
      <div className="sm:hidden flex items-center text-slate-600">
        {items.length > 1 && items[items.length - 2]?.href ? (
          <Link
            href={items[items.length - 2].href!}
            className="flex items-center space-x-1 text-brand-600 font-semibold py-1 min-h-[36px]"
          >
            <span>←</span>
            <span>Back to {items[items.length - 2].label}</span>
          </Link>
        ) : (
          <span className="font-semibold text-slate-800">{items[items.length - 1]?.label}</span>
        )}
      </div>
    </nav>
  );
};
""")

# ContinueLearning banner
write_file("apps/web/components/learning/continue-learning.tsx", """"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { storage } from '@/lib/storage';
import { Button, Card, Badge, ProgressBar } from '@learnbyself/ui';

export const ContinueLearning: React.FC = () => {
  const [lastLesson, setLastLesson] = useState<{
    languageSlug: string;
    languageName: string;
    moduleSlug: string;
    lessonSlug: string;
    lessonTitle: string;
    progressPercent: number;
  } | null>(null);

  useEffect(() => {
    // Check client storage for last accessed lesson
    const saved = storage.get('last_lesson', null);
    if (saved) {
      setLastLesson(saved);
    } else {
      // Default to ground zero Java start
      setLastLesson({
        languageSlug: 'java',
        languageName: 'Java',
        moduleSlug: 'fundamentals',
        lessonSlug: 'hello-world',
        lessonTitle: 'Deconstructing Hello World & The JVM Architecture',
        progressPercent: 25
      });
    }
  }, []);

  if (!lastLesson) return null;

  return (
    <Card variant="highlight" className="border-brand-200">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center space-x-2">
            <Badge variant="blue" size="sm">ACTIVE LESSON</Badge>
            <span className="text-xs text-slate-500 font-medium">
              {lastLesson.languageName} • Module 1
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {lastLesson.lessonTitle}
          </h3>
          <div className="w-48 sm:w-64 pt-1">
            <ProgressBar value={lastLesson.progressPercent} label="Lesson Progress" />
          </div>
        </div>

        <Link
          href={`/${lastLesson.languageSlug}/${lastLesson.moduleSlug}/${lastLesson.lessonSlug}`}
          className="w-full md:w-auto"
        >
          <Button variant="primary" size="md" className="w-full md:w-auto font-semibold">
            Resume Learning →
          </Button>
        </Link>
      </div>
    </Card>
  );
};
""")

# QuizRunner
write_file("apps/web/components/practice/quiz-runner.tsx", """"use client";

import React, { useState } from 'react';
import type { Question } from '@learnbyself/types';
import { Button, Card, Badge, Alert } from '@learnbyself/ui';

interface QuizRunnerProps {
  questions: Question[];
  categoryTitle?: string;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({ questions, categoryTitle }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});
  const [hintSteps, setHintSteps] = useState<Record<string, number>>({});

  const handleSelect = (questionId: string, optionIdx: number) => {
    if (submittedAnswers[questionId]) return; // lock after submit
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmit = (questionId: string) => {
    if (selectedAnswers[questionId] === undefined) return;
    setSubmittedAnswers(prev => ({ ...prev, [questionId]: true }));
  };

  const handleShowHint = (questionId: string, maxHints: number) => {
    const current = hintSteps[questionId] || 0;
    if (current < maxHints) {
      setHintSteps(prev => ({ ...prev, [questionId]: current + 1 }));
    }
  };

  return (
    <div className="space-y-6">
      {questions.map((q, qIndex) => {
        const selected = selectedAnswers[q.id];
        const isSubmitted = submittedAnswers[q.id];
        const isCorrect = isSubmitted && selected === Number(q.correctAnswer);
        const currentHintLevel = hintSteps[q.id] || 0;

        return (
          <Card key={q.id} className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Badge variant="purple" size="sm">
                  {categoryTitle || `Question ${qIndex + 1}`}
                </Badge>
                <span className="text-xs text-slate-400 capitalize">{q.difficulty}</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">~{q.estimatedSeconds}s</span>
            </div>

            {/* Prompt */}
            <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
              {q.prompt}
            </p>

            {/* Code Snippet if applicable */}
            {q.codeSnippet && (
              <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800">
                <code>{q.codeSnippet}</code>
              </pre>
            )}

            {/* Options */}
            <div className="space-y-2.5 pt-1" role="radiogroup">
              {q.options?.map((opt, optIdx) => {
                const isThisSelected = selected === optIdx;
                let optionStyle = 'bg-white border-slate-200 hover:border-brand-300 text-slate-800';

                if (isSubmitted) {
                  if (optIdx === Number(q.correctAnswer)) {
                    optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold';
                  } else if (isThisSelected) {
                    optionStyle = 'bg-rose-50 border-rose-300 text-rose-950';
                  } else {
                    optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isThisSelected) {
                  optionStyle = 'bg-brand-50 border-brand-500 text-brand-900 font-semibold shadow-subtle';
                }

                return (
                  <button
                    key={optIdx}
                    role="radio"
                    aria-checked={isThisSelected}
                    onClick={() => handleSelect(q.id, optIdx)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all duration-150 flex items-start space-x-3 min-h-[44px] ${optionStyle}`}
                  >
                    <span className="font-mono text-xs text-slate-400 mt-0.5 select-none">
                      {String.fromCharCode(65 + optIdx)}.
                    </span>
                    <span className="flex-1">{opt}</span>
                    {isSubmitted && optIdx === Number(q.correctAnswer) && (
                      <span className="text-emerald-600 font-bold">✓</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hint Section */}
            {q.hints && q.hints.length > 0 && !isSubmitted && (
              <div className="pt-2">
                {currentHintLevel > 0 && (
                  <div className="space-y-1.5 mb-2">
                    {q.hints.slice(0, currentHintLevel).map((h, i) => (
                      <div key={i} className="text-xs bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-amber-900">
                        <span className="font-bold">Hint {h.step}: </span>{h.hint}
                      </div>
                    ))}
                  </div>
                )}
                {currentHintLevel < q.hints.length && (
                  <button
                    onClick={() => handleShowHint(q.id, q.hints.length)}
                    className="text-xs text-brand-600 hover:text-brand-800 font-medium py-1 min-h-[32px] flex items-center space-x-1"
                  >
                    <span>💡 Need a hint?</span>
                    <span>({currentHintLevel}/{q.hints.length})</span>
                  </button>
                )}
              </div>
            )}

            {/* Submit Action & Constructive Feedback */}
            {!isSubmitted ? (
              <div className="pt-2 flex justify-end">
                <Button
                  variant="primary"
                  size="sm"
                  disabled={selected === undefined}
                  onClick={() => handleSubmit(q.id)}
                >
                  Verify Answer
                </Button>
              </div>
            ) : (
              <div className="pt-2 space-y-3">
                {isCorrect ? (
                  <Alert type="success" title="Spot on! Concept Verified ✓">
                    {q.explanation}
                  </Alert>
                ) : (
                  <Alert type="warning" title="Not quite yet — Let's understand why:">
                    <p className="mb-2 text-slate-700">{q.explanation}</p>
                    <p className="text-xs text-slate-500 font-medium">
                      Review the code walkthrough and try to trace the execution step-by-step.
                    </p>
                  </Alert>
                )}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};
""")

# ChecklistRunner
write_file("apps/web/components/practice/checklist-runner.tsx", """"use client";

import React, { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { Card, ProgressBar, Badge } from '@learnbyself/ui';

interface ChecklistRunnerProps {
  lessonId: string;
  items: string[];
}

export const ChecklistRunner: React.FC<ChecklistRunnerProps> = ({ lessonId, items }) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const saved = storage.get(`checklist:${lessonId}`, {});
    setCheckedItems(saved);
  }, [lessonId]);

  const handleToggle = (idx: number) => {
    setCheckedItems(prev => {
      const updated = { ...prev, [idx]: !prev[idx] };
      storage.set(`checklist:${lessonId}`, updated);
      return updated;
    });
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const percent = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  return (
    <Card className="space-y-4 border-teal-200/80 bg-teal-50/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-100 pb-3">
        <div className="flex items-center space-x-2">
          <span className="text-xl">✅</span>
          <h4 className="font-bold text-teal-950 text-base">Self-Mastery Verification</h4>
        </div>
        <Badge variant="green" size="sm">
          {completedCount} of {items.length} Checked
        </Badge>
      </div>

      <ProgressBar value={percent} label="Topic Confidence" showPercent />

      <div className="space-y-2.5 pt-1">
        {items.map((item, idx) => {
          const isChecked = !!checkedItems[idx];
          return (
            <label
              key={idx}
              className={`flex items-start space-x-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-colors min-h-[44px] ${
                isChecked
                  ? 'bg-teal-50/70 border-teal-300 text-teal-950 font-medium'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-teal-300'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggle(idx)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
              />
              <span className="flex-1 leading-relaxed">{item}</span>
            </label>
          );
        })}
      </div>
    </Card>
  );
};
""")

# LessonWorkspace (7-stage tabbed interactive player)
write_file("apps/web/components/learning/lesson-workspace.tsx", """"use client";

import React, { useState } from 'react';
import type { LessonDetail } from '@learnbyself/types';
import { Tabs, TabItem, Card, Badge, Alert, CodeBlock, Button } from '@learnbyself/ui';
import { QuizRunner } from '../practice/quiz-runner';
import { ChecklistRunner } from '../practice/checklist-runner';

interface LessonWorkspaceProps {
  lesson: LessonDetail;
}

export const LessonWorkspace: React.FC<LessonWorkspaceProps> = ({ lesson }) => {
  const tabs: TabItem[] = [
    { id: 'concept', label: 'Concept & Analogy', icon: '💡' },
    { id: 'code', label: 'Code Breakdown', icon: '💻' },
    { id: 'practice', label: 'Guided Practice', icon: '✍️' },
    { id: 'interview', label: 'Interview Q&A', icon: '🎯' },
    { id: 'checklist', label: 'Self Check', icon: '✅' }
  ];

  const [activeTab, setActiveTab] = useState('concept');
  const [expandedInterview, setExpandedInterview] = useState<Record<string, boolean>>({});

  const toggleInterview = (id: string) => {
    setExpandedInterview(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const analogyActivity = lesson.activities.find(a => a.type === 'analogy');
  const conceptActivity = lesson.activities.find(a => a.type === 'concept');
  const codeActivity = lesson.activities.find(a => a.type === 'code_walkthrough');
  const mcqActivities = lesson.activities.filter(a => a.type === 'mcq' || a.type === 'debugging');
  const interviewActivity = lesson.activities.find(a => a.type === 'interview_qa');
  const checklistActivity = lesson.activities.find(a => a.type === 'self_evaluation');

  return (
    <div className="space-y-6">
      {/* Activity Mode Tabs */}
      <Tabs tabs={tabs} defaultTab={activeTab} onChange={setActiveTab} />

      {/* Tab 1: Concept & Analogy */}
      {activeTab === 'concept' && (
        <div className="space-y-6 animate-fadeIn">
          {analogyActivity?.analogy && (
            <Alert type="info" title={`Mental Model: ${analogyActivity.analogy.headline}`}>
              <p className="leading-relaxed mb-3">{analogyActivity.analogy.story}</p>
              <div className="bg-white/80 p-3 rounded-lg border border-brand-200 text-xs font-semibold text-brand-900">
                Key Takeaway: {analogyActivity.analogy.keyTakeaway}
              </div>
            </Alert>
          )}

          {conceptActivity && (
            <Card className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <span>📘</span>
                <span>{conceptActivity.title}</span>
              </h3>
              <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed space-y-2">
                {conceptActivity.content}
              </div>
            </Card>
          )}

          <div className="flex justify-end pt-2">
            <Button variant="primary" onClick={() => setActiveTab('code')}>
              Next: Code Breakdown →
            </Button>
          </div>
        </div>
      )}

      {/* Tab 2: Code Breakdown */}
      {activeTab === 'code' && (
        <div className="space-y-6 animate-fadeIn">
          {codeActivity && (
            <Card className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
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

              <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed pt-2">
                {codeActivity.description}
              </div>
            </Card>
          )}

          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={() => setActiveTab('concept')}>
              ← Back to Concept
            </Button>
            <Button variant="primary" onClick={() => setActiveTab('practice')}>
              Next: Guided Practice →
            </Button>
          </div>
        </div>
      )}

      {/* Tab 3: Guided Practice */}
      {activeTab === 'practice' && (
        <div className="space-y-6 animate-fadeIn">
          {mcqActivities.map((act) => (
            act.questions ? (
              <QuizRunner
                key={act.id}
                questions={act.questions}
                categoryTitle={act.title}
              />
            ) : null
          ))}

          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={() => setActiveTab('code')}>
              ← Back to Code
            </Button>
            <Button variant="primary" onClick={() => setActiveTab('interview')}>
              Next: Placement Interview Q&A →
            </Button>
          </div>
        </div>
      )}

      {/* Tab 4: Interview Q&A */}
      {activeTab === 'interview' && (
        <div className="space-y-6 animate-fadeIn">
          {interviewActivity?.interviewQA?.map((qa) => {
            const isExpanded = !!expandedInterview[qa.id];
            return (
              <Card key={qa.id} className="space-y-4 border-purple-200/80 bg-purple-50/10">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-100 pb-3">
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
                  <span className="font-bold text-slate-900">Key Points to Mention:</span>
                  <ul className="list-disc list-inside space-y-0.5 mt-1 text-slate-600">
                    {qa.keyPoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>

                {/* Expandable follow up questions */}
                {qa.followUpQuestions && qa.followUpQuestions.length > 0 && (
                  <div className="pt-2 border-t border-purple-100">
                    <button
                      onClick={() => toggleInterview(qa.id)}
                      className="text-xs text-brand-600 hover:text-brand-800 font-semibold py-1 min-h-[36px] flex items-center space-x-1"
                    >
                      <span>{isExpanded ? '▼ Hide Interview Follow-Ups' : '▶ Show Expected Follow-Up Questions'}</span>
                    </button>

                    {isExpanded && (
                      <div className="mt-2 space-y-2 pl-3 border-l-2 border-brand-300">
                        {qa.followUpQuestions.map((fq, idx) => (
                          <p key={idx} className="text-xs text-slate-700 italic">
                            • {fq}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}

          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={() => setActiveTab('practice')}>
              ← Back to Practice
            </Button>
            <Button variant="primary" onClick={() => setActiveTab('checklist')}>
              Next: Self-Mastery Check →
            </Button>
          </div>
        </div>
      )}

      {/* Tab 5: Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-6 animate-fadeIn">
          {checklistActivity?.checklist && (
            <ChecklistRunner
              lessonId={lesson.id}
              items={checklistActivity.checklist}
            />
          )}

          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={() => setActiveTab('interview')}>
              ← Back to Interview Q&A
            </Button>
            <Button variant="success">
              Lesson Fully Mastered ✓
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
""")

print("Learning and practice components created.")

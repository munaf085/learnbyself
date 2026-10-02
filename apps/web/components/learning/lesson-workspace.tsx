"use client";

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

"use client";

import React, { useState } from 'react';
import type { Question } from '@learnbyself/types';
import { Button, Card, Badge, Alert } from '@learnbyself/ui';
import { CheckCircle2, RotateCcw, Sparkles, HelpCircle } from 'lucide-react';

interface QuizRunnerProps {
  questions: Question[];
  categoryTitle?: string;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({ questions, categoryTitle }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});
  const [hintSteps, setHintSteps] = useState<Record<string, number>>({});

  // Reset quiz state when questions change across lessons
  React.useEffect(() => {
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setHintSteps({});
  }, [questions]);

  const handleSelect = (questionId: string, optionIdx: number) => {
    if (submittedAnswers[questionId]) return; // lock until retry
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmit = (questionId: string) => {
    if (selectedAnswers[questionId] === undefined) return;
    setSubmittedAnswers(prev => ({ ...prev, [questionId]: true }));
  };

  const handleRetry = (questionId: string) => {
    setSubmittedAnswers(prev => ({ ...prev, [questionId]: false }));
    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  const handleShowHint = (questionId: string, maxHints: number) => {
    const current = hintSteps[questionId] || 0;
    if (current < maxHints) {
      setHintSteps(prev => ({ ...prev, [questionId]: current + 1 }));
    }
  };

  // Count correct answers
  const correctCount = questions.filter(
    q => submittedAnswers[q.id] && selectedAnswers[q.id] === Number(q.correctAnswer)
  ).length;

  return (
    <div className="space-y-6">
      {questions.map((q, qIndex) => {
        const selected = selectedAnswers[q.id];
        const isSubmitted = submittedAnswers[q.id];
        const isCorrect = isSubmitted && selected === Number(q.correctAnswer);
        const currentHintLevel = hintSteps[q.id] || 0;

        return (
          <Card key={q.id} className="space-y-4 shadow-subtle border-slate-200/90 transition-all">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Badge variant="purple" size="sm">
                  Challenge {qIndex + 1}
                </Badge>
                <span className="text-xs text-slate-400 capitalize">{q.difficulty}</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">~{q.estimatedSeconds}s</span>
            </div>

            {/* Question Prompt */}
            <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
              {q.prompt || (q as any).question}
            </p>

            {/* Code Snippet if present */}
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
                    optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold shadow-xs';
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
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all duration-150 flex items-start space-x-3 min-h-[44px] cursor-pointer ${optionStyle}`}
                  >
                    <span className="font-mono text-xs text-slate-400 mt-0.5 select-none font-bold">
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

            {/* Hints Accordion */}
            {q.hints && q.hints.length > 0 && !isSubmitted && (
              <div className="pt-2">
                {currentHintLevel > 0 && (
                  <div className="space-y-1.5 mb-2">
                    {q.hints.slice(0, currentHintLevel).map((h, i) => {
                      const hintText = typeof h === 'string' ? h : h.hint;
                      const stepNum = typeof h === 'string' ? i + 1 : h.step;
                      return (
                        <div key={i} className="text-xs bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-amber-900 animate-fadeIn">
                          <span className="font-bold">Hint {stepNum}: </span>{hintText}
                        </div>
                      );
                    })}
                  </div>
                )}
                {currentHintLevel < q.hints.length && (
                  <button
                    onClick={() => handleShowHint(q.id, q.hints.length)}
                    className="text-xs text-brand-600 hover:text-brand-800 font-medium py-1 min-h-[32px] flex items-center space-x-1 cursor-pointer"
                  >
                    <span>💡 Need a gentle hint?</span>
                    <span>({currentHintLevel}/{q.hints.length})</span>
                  </button>
                )}
              </div>
            )}

            {/* Action Buttons & Feedback */}
            {!isSubmitted ? (
              <div className="pt-2 flex justify-end">
                <Button
                  variant="primary"
                  size="sm"
                  disabled={selected === undefined}
                  onClick={() => handleSubmit(q.id)}
                  className="font-semibold shadow-xs min-h-[36px]"
                >
                  Verify My Answer
                </Button>
              </div>
            ) : (
              <div className="pt-2 space-y-3 animate-fadeIn">
                {isCorrect ? (
                  <Alert type="success" title="Spot on! 🎉 +10 XP">
                    <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                      {q.explanation}
                    </p>
                  </Alert>
                ) : (
                  <div className="space-y-3">
                    <Alert type="warning" title="Almost there! Let's understand why:">
                      <p className="text-xs sm:text-sm mb-2 text-slate-700 leading-relaxed">
                        {q.explanation}
                      </p>
                      <p className="text-xs text-slate-500 font-medium">
                        {"Don't worry — learning happens through trying! Give it another shot."}
                      </p>
                    </Alert>
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRetry(q.id)}
                        className="text-xs font-semibold flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Try Again</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        );
      })}

      {/* Completion Celebration if all solved */}
      {correctCount === questions.length && questions.length > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-center space-y-1.5 animate-fadeIn">
          <span className="text-2xl inline-block">🌟</span>
          <h4 className="font-extrabold text-emerald-950 text-sm sm:text-base">
            Awesome work! You solved all practice questions!
          </h4>
          <p className="text-xs text-emerald-800">
            Your understanding is rock solid. Keep this momentum going!
          </p>
        </div>
      )}
    </div>
  );
};

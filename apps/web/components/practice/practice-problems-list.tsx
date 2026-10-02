"use client";

import React, { useState } from 'react';
import type { PracticeProblem } from '@learnbyself/types';
import { Card, Badge, Button } from '@learnbyself/ui';
import {
  Code2,
  Terminal,
  Copy,
  Check,
  Eye,
  EyeOff,
  Lightbulb,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface PracticeProblemsListProps {
  lessonTitle: string;
  problems: PracticeProblem[];
}

export const PracticeProblemsList: React.FC<PracticeProblemsListProps> = ({
  lessonTitle,
  problems
}) => {
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [copiedProblemId, setCopiedProblemId] = useState<string | null>(null);

  const toggleSolution = (id: string) => {
    setRevealedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleHint = (id: string) => {
    setRevealedHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedProblemId(id);
    setTimeout(() => setCopiedProblemId(null), 2000);
  };

  if (!problems || problems.length === 0) {
    return (
      <Card className="text-center py-10 text-slate-500">
        Practice challenges being prepared for this topic.
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Intro Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-brand-600" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              Hands-on Practice Problems ({problems.length} Challenges)
            </h3>
          </div>
          <p className="text-xs text-slate-600">
            Write and run these in your local IDE (VS Code / IntelliJ) or terminal. Test your code, then reveal the solution to verify!
          </p>
        </div>
        <Badge variant="blue" size="sm">Self-Paced Practice</Badge>
      </div>

      {/* List of Problems */}
      <div className="space-y-4">
        {problems.map((prob, idx) => {
          const isSolutionOpen = !!revealedSolutions[prob.id];
          const isHintOpen = !!revealedHints[prob.id];
          const isCopied = copiedProblemId === prob.id;

          const diffVariant: 'blue' | 'green' | 'amber' =
            prob.difficulty === 'medium'
              ? 'amber'
              : prob.difficulty === 'easy'
              ? 'green'
              : 'blue';

          return (
            <Card
              key={prob.id}
              className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4 hover:border-slate-300 transition-all"
            >
              {/* Problem Title & Difficulty */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2.5">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900">
                    {prob.title}
                  </h4>
                </div>
                <Badge variant={diffVariant} size="sm">
                  {prob.difficulty ? prob.difficulty.toUpperCase() : 'PRACTICE'}
                </Badge>
              </div>

              {/* Problem Description */}
              {(prob.description || prob.problemStatement) && (
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                  {prob.description || prob.problemStatement}
                </p>
              )}

              {/* Expected Output Preview */}
              {prob.expectedOutput && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-slate-400" />
                    Target Console Output
                  </span>
                  <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-emerald-400 overflow-x-auto shadow-inner">
                    <pre>{prob.expectedOutput}</pre>
                  </div>
                </div>
              )}

              {/* Hint Box (Collapsible) */}
              {(prob.hint || (Array.isArray(prob.hints) && prob.hints.length > 0)) && (
                <div className="pt-1">
                  <button
                    onClick={() => toggleHint(prob.id)}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{isHintOpen ? 'Hide Hint' : 'Need a Hint?'}</span>
                  </button>
                  {isHintOpen && (
                    <div className="mt-2 p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 leading-relaxed animate-fadeIn whitespace-pre-line">
                      {prob.hint || (Array.isArray(prob.hints) ? prob.hints.join('\n') : prob.hints)}
                    </div>
                  )}
                </div>
              )}

              {/* Solution Toggle & Box */}
              {prob.solutionCode && (
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleSolution(prob.id)}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center space-x-1.5 cursor-pointer py-1"
                    >
                      {isSolutionOpen ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                          <span>Hide Solution</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5 text-brand-600" />
                          <span className="text-brand-600">Reveal Solution</span>
                        </>
                      )}
                    </button>

                    {isSolutionOpen && (
                      <button
                        onClick={() => handleCopyCode(prob.id, prob.solutionCode!)}
                        className="text-xs text-slate-500 hover:text-slate-800 flex items-center space-x-1 cursor-pointer"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Copied' : 'Copy Solution'}</span>
                      </button>
                    )}
                  </div>

                  {isSolutionOpen && (
                    <div className="mt-2.5 p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner animate-fadeIn">
                      <pre>{prob.solutionCode}</pre>
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

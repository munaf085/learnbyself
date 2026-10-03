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

// Helper to format inline code and bold text inside problem descriptions
const formatInlineText = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={match.index}
          className="font-mono text-xs font-semibold bg-slate-100 text-brand-700 px-1.5 py-0.5 rounded border border-slate-200/80 mx-0.5"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-bold text-slate-900">
          {token.slice(2, -2)}
        </strong>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};

// Render problem description with support for code blocks and paragraphs
const renderProblemDescription = (text: string) => {
  if (!text) return null;

  // Split by fenced code blocks ``` ... ```
  const codeBlockRegex = /```(?:java)?\n([\s\S]*?)```/g;
  const segments: React.ReactNode[] = [];
  let lastIdx = 0;
  let blockMatch: RegExpExecArray | null;

  while ((blockMatch = codeBlockRegex.exec(text)) !== null) {
    if (blockMatch.index > lastIdx) {
      const textChunk = text.substring(lastIdx, blockMatch.index);
      segments.push(
        <p key={lastIdx} className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
          {formatInlineText(textChunk)}
        </p>
      );
    }
    const codeContent = blockMatch[1];
    segments.push(
      <div key={blockMatch.index} className="my-2.5 p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-amber-300 overflow-x-auto shadow-inner border border-slate-800/80 leading-relaxed">
        <pre>{codeContent}</pre>
      </div>
    );
    lastIdx = codeBlockRegex.lastIndex;
  }

  if (lastIdx < text.length) {
    segments.push(
      <p key={lastIdx} className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
        {formatInlineText(text.substring(lastIdx))}
      </p>
    );
  }

  return <div className="space-y-2">{segments}</div>;
};

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
          const isCopiedSolution = copiedProblemId === `sol-${prob.id}`;
          const isCopiedStarter = copiedProblemId === `start-${prob.id}`;

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

              {/* Formatted Problem Description */}
              {(prob.description || prob.problemStatement) && (
                renderProblemDescription(prob.description || prob.problemStatement || '')
              )}

              {/* Starter Code / Code to Inspect & Fix */}
              {prob.initialCode && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-amber-500" />
                      Starter Code / Code to Inspect &amp; Fix
                    </span>
                    <button
                      onClick={() => handleCopyCode(`start-${prob.id}`, prob.initialCode!)}
                      className="text-xs text-slate-500 hover:text-slate-800 flex items-center space-x-1 cursor-pointer transition-colors"
                    >
                      {isCopiedStarter ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Starter Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-amber-200 overflow-x-auto shadow-inner border border-slate-800/80 leading-relaxed">
                    <pre>{prob.initialCode}</pre>
                  </div>
                </div>
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
                        className="text-xs text-slate-500 hover:text-slate-800 flex items-center space-x-1 cursor-pointer transition-colors"
                      >
                        {copiedProblemId === prob.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Solution</span>
                          </>
                        )}
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

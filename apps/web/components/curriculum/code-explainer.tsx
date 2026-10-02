"use client";

import React, { useState } from 'react';
import { Card, Badge, Button } from '@learnbyself/ui';
import { ChevronRight, ChevronLeft, Sparkles, BookOpen } from 'lucide-react';

export interface CodeLineExplanation {
  lineNum: number;
  code: string;
  keyword: string;
  plainEnglish: string;
  whyItMatters: string;
}

const DEFAULT_EXPLANATIONS: CodeLineExplanation[] = [
  {
    lineNum: 1,
    code: "public class Main {",
    keyword: "class Main",
    plainEnglish: "Every Java program lives inside a class. Think of a class like a named blueprint or container box for your code.",
    whyItMatters: "Java requires everything to be organized inside classes. 'public' means anyone can access it."
  },
  {
    lineNum: 2,
    code: "    public static void main(String[] args) {",
    keyword: "public static void main",
    plainEnglish: "This is the front door of your program! Whenever Java runs your app, it always starts here first.",
    whyItMatters: "'static' means Java can open this door right away without building an object first. 'void' means it just does its job and doesn't hand back a return value."
  },
  {
    lineNum: 3,
    code: "        System.out.println(\"Hello, World!\");",
    keyword: "System.out.println",
    plainEnglish: "This tells the computer: 'Print this message onto the screen and then move down to a new line.'",
    whyItMatters: "'System.out' is the computer's standard output screen. 'println' is short for print line."
  },
  {
    lineNum: 4,
    code: "    }",
    keyword: "}",
    plainEnglish: "This closing curly brace marks the end of the main() front door instructions.",
    whyItMatters: "In Java, curly braces { } always work in pairs to open and close instruction blocks."
  },
  {
    lineNum: 5,
    code: "}",
    keyword: "}",
    plainEnglish: "This closing curly brace marks the end of the Main class container.",
    whyItMatters: "Every opening brace { must have a matching closing brace }."
  }
];

interface CodeExplainerProps {
  explanations?: CodeLineExplanation[];
}

export const CodeExplainer: React.FC<CodeExplainerProps> = ({
  explanations = DEFAULT_EXPLANATIONS
}) => {
  const [activeLineIdx, setActiveLineIdx] = useState(0);

  const current = explanations[activeLineIdx] || explanations[0]!;

  return (
    <div className="space-y-4 rounded-2xl border border-brand-200/80 bg-gradient-to-br from-brand-50/40 via-white to-indigo-50/20 p-4 sm:p-5 shadow-subtle">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-100 pb-3">
        <div className="flex items-center space-x-2">
          <span className="p-2 rounded-xl bg-brand-600 text-white shadow-xs">
            <BookOpen className="w-4 h-4" />
          </span>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Interactive Line-by-Line Breakdown
              </h4>
              <Badge variant="blue" size="sm">TAP ANY LINE</Badge>
            </div>
            <p className="text-xs text-slate-500">
              Click or tap any line of code to see what it actually means in everyday plain English
            </p>
          </div>
        </div>

        {/* Step navigation controls */}
        <div className="flex items-center space-x-2 self-start sm:self-center">
          <Button
            variant="outline"
            size="sm"
            disabled={activeLineIdx === 0}
            onClick={() => setActiveLineIdx(prev => Math.max(0, prev - 1))}
            className="text-xs min-h-[36px]"
          >
            <ChevronLeft className="w-3.5 h-3.5 mr-1" />
            Prev Line
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={activeLineIdx === explanations.length - 1}
            onClick={() => setActiveLineIdx(prev => Math.min(explanations.length - 1, prev + 1))}
            className="text-xs min-h-[36px]"
          >
            Next Line
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>

      {/* Code Viewer with Clickable Lines */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto shadow-inner">
        <div className="space-y-1">
          {explanations.map((item, idx) => {
            const isActive = idx === activeLineIdx;
            return (
              <button
                key={item.lineNum}
                onClick={() => setActiveLineIdx(idx)}
                className={`w-full text-left flex items-start space-x-3 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand-600/30 text-white border border-brand-500/50 shadow-xs'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <span className={`select-none font-mono text-xs w-6 text-right shrink-0 ${
                  isActive ? 'text-brand-300 font-bold' : 'text-slate-600'
                }`}>
                  {item.lineNum}
                </span>
                <span className="flex-1 whitespace-pre">{item.code}</span>
                {isActive && (
                  <span className="text-[11px] font-sans px-2 py-0.5 rounded-full bg-brand-500 text-white font-semibold shrink-0">
                    Inspecting 👀
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Plain English Explanation Card */}
      <div className="bg-white rounded-xl border border-brand-200 p-4 space-y-3 shadow-xs animate-fadeIn">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div className="flex items-center space-x-2">
            <Badge variant="purple" size="sm">Line {current.lineNum}</Badge>
            <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
              {current.keyword}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Line {activeLineIdx + 1} of {explanations.length}
          </span>
        </div>

        {/* The Plain English Description */}
        <div className="space-y-2">
          <div className="flex items-start space-x-2.5">
            <span className="text-base shrink-0">💬</span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {current.plainEnglish}
            </p>
          </div>

          <div className="flex items-start space-x-2.5 bg-amber-50/70 border border-amber-200/80 rounded-lg p-2.5 text-xs text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold">Why it matters: </span>
              {current.whyItMatters}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

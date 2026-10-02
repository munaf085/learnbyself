"use client";

import React, { useState } from 'react';
import type { InterviewQA } from '@learnbyself/types';
import { Card, Badge } from '@learnbyself/ui';
import { HelpCircle, Eye, EyeOff } from 'lucide-react';

interface InterviewCardProps {
  qa: InterviewQA;
  index: number;
}

export const InterviewCard: React.FC<InterviewCardProps> = ({ qa, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const answer = qa.expectedAnswer || (qa as any).answer || '';
  const takeaway = (qa.keyPoints && qa.keyPoints[0]) || (qa as any).keyTakeaway;
  const company = (qa.companyTags && qa.companyTags.join(', ')) || (qa as any).company;

  return (
    <Card className="p-4 sm:p-5 space-y-3.5 border-slate-200/90 bg-white shadow-subtle hover:border-brand-200 transition-all">
      {/* Top Header: Index & Company Tags */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <span className="text-xs font-bold text-brand-600 font-mono">
          Question #{index + 1}
        </span>
        {company && (
          <Badge variant="blue" size="sm">
            {company}
          </Badge>
        )}
      </div>

      {/* Question Text */}
      <div className="flex items-start space-x-2.5">
        <HelpCircle className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
        <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
          {qa.question}
        </h4>
      </div>

      {/* Reveal / Hide Action */}
      <div className="pt-0.5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200/80 transition-colors cursor-pointer"
        >
          {isOpen ? (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span>Hide Answer</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Reveal Answer</span>
            </>
          )}
        </button>
      </div>

      {/* Clean, Conversational Answer */}
      {isOpen && (
        <div className="pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 animate-fadeIn">
          <div className="bg-slate-50/90 p-4 rounded-xl border border-slate-200/70 text-slate-800 leading-relaxed font-sans whitespace-pre-line">
            {answer}
          </div>

          {takeaway && (
            <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-950 flex items-start space-x-2">
              <span className="font-bold text-emerald-700 shrink-0">💡 Quick Takeaway:</span>
              <span className="text-slate-700">{takeaway}</span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

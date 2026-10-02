"use client";

import React, { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { Card, ProgressBar, Badge } from '@learnbyself/ui';
import { CheckCircle2, Sparkles } from 'lucide-react';

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
  const percent = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;
  const isAllComplete = percent === 100 && items.length > 0;

  return (
    <Card className="space-y-4 border-teal-200/80 bg-teal-50/20 shadow-subtle">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-100 pb-3">
        <div className="flex items-center space-x-2">
          <span className="text-xl">✅</span>
          <div>
            <h4 className="font-bold text-teal-950 text-base">Key Checkpoints</h4>
            <p className="text-xs text-teal-700">Check off what you now feel confident doing</p>
          </div>
        </div>
        <Badge variant="green" size="sm">
          {completedCount} of {items.length} Checked ({percent}%)
        </Badge>
      </div>

      <ProgressBar value={percent} label="My Confidence" showPercent />

      <div className="space-y-2.5 pt-1">
        {items.map((item, idx) => {
          const isChecked = !!checkedItems[idx];
          return (
            <label
              key={idx}
              className={`flex items-start space-x-3 p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all duration-150 min-h-[44px] ${
                isChecked
                  ? 'bg-teal-50/80 border-teal-300 text-teal-950 font-medium shadow-2xs'
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
              {isChecked && (
                <span className="text-teal-600 text-xs font-bold">✓ Ready</span>
              )}
            </label>
          );
        })}
      </div>

      {/* 100% Mastered Celebration Box */}
      {isAllComplete && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-300 text-center space-y-1 animate-fadeIn">
          <div className="flex items-center justify-center space-x-1.5 text-emerald-800 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>100% Mastery Achieved! 🎉</span>
          </div>
          <p className="text-xs text-emerald-900 leading-relaxed">
            You have verified all core skills for this topic. You are ready to move to the next lesson with confidence!
          </p>
        </div>
      )}
    </Card>
  );
};

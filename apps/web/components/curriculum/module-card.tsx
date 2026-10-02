import React from 'react';
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
            What you will master:
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

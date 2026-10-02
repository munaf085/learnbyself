import React from 'react';
import Link from 'next/link';
import type { Section } from '@learnbyself/types';
import { Card, Badge, ProgressBar } from '@learnbyself/ui';

interface SectionCardProps {
  section: Section;
  languageSlug: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({ section, languageSlug }) => {
  const isLocked = !!section.isLocked;
  const numStr = String(section.orderIndex).padStart(2, '0');

  const content = (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start space-x-4">
        <span className="font-mono text-xl sm:text-2xl font-extrabold text-slate-300">
          {numStr}
        </span>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {section.title}
            </h3>
            {isLocked ? (
              <Badge variant="slate" size="sm">🔒 Locked</Badge>
            ) : (
              section.progressPercent ? (
                <Badge variant="blue" size="sm">{section.progressPercent}% Complete</Badge>
              ) : (
                <Badge variant="green" size="sm">Ready to Start</Badge>
              )
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl">
            {section.summary}
          </p>
          <div className="text-xs text-slate-400 flex items-center space-x-3 pt-1">
            <span>{section.totalModules || section.modules.length} Modules</span>
            <span>•</span>
            <span>{section.totalLessons || 0} Lessons</span>
            <span>•</span>
            <span>~{section.estimatedHours || 5} Hours</span>
          </div>
        </div>
      </div>

      <div className="sm:self-center min-w-[120px] text-right">
        {!isLocked ? (
          <span className="inline-flex items-center text-xs font-bold text-brand-600 hover:text-brand-700">
            Open Section →
          </span>
        ) : (
          <span className="text-xs text-slate-400 italic">
            Prerequisites Required
          </span>
        )}
      </div>
    </div>
  );

  if (isLocked) {
    return (
      <Card variant="default" className="opacity-70 bg-slate-50/60 border-slate-200">
        {content}
      </Card>
    );
  }

  return (
    <Link href={`/${languageSlug}/${section.slug}`} className="block">
      <Card variant="interactive">
        {content}
      </Card>
    </Link>
  );
};

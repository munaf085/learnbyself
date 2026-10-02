import React from 'react';
import Link from 'next/link';
import { Button } from '@learnbyself/ui';

interface CompletionCardProps {
  type: 'lesson' | 'module' | 'section';
  title: string;
  nextTitle?: string;
  nextHref?: string;
}

export const CompletionCard: React.FC<CompletionCardProps> = ({
  type,
  title,
  nextTitle,
  nextHref
}) => {
  const configs = {
    lesson: {
      badge: '✓ LESSON COMPLETE',
      heading: title,
      sub: 'Great work! You have deconstructed the mental models and verified your understanding.',
      cta: 'Continue to Next Lesson →'
    },
    module: {
      badge: '🎉 MODULE COMPLETE',
      heading: title,
      sub: 'Outstanding achievement! You have mastered all topics and challenges in this module.',
      cta: 'Start Next Module →'
    },
    section: {
      badge: '🏆 SECTION MASTERED',
      heading: title,
      sub: 'Milestone reached! You have completed this foundational section and unlocked the next phase.',
      cta: 'Start Next Section →'
    }
  }[type];

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-subtle">
      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 tracking-wider">
        {configs.badge}
      </span>
      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
        {configs.heading}
      </h3>
      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
        {configs.sub}
      </p>

      {nextHref && nextTitle && (
        <div className="pt-2">
          <p className="text-xs text-slate-500 font-medium mb-2">Up Next: <span className="font-bold text-slate-800">{nextTitle}</span></p>
          <Link href={nextHref}>
            <Button variant="success" size="lg" className="font-semibold shadow-subtle">
              {configs.cta}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

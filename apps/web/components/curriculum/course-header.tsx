import React from 'react';
import Link from 'next/link';
import type { Course } from '@learnbyself/types';
import { Badge, ProgressBar, Button } from '@learnbyself/ui';

interface CourseHeaderProps {
  course: Course;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({ course }) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-subtle">
      {/* Quick, friendly meta badges */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <Badge variant="blue" size="sm">Java</Badge>
        <span className="text-slate-400">•</span>
        <span className="text-slate-500 font-medium">
          {course.sections.length} Sections
        </span>
        <span className="text-slate-400">•</span>
        <span className="text-slate-500 font-medium">Beginner Friendly</span>
        <span className="text-slate-400">•</span>
        <span className="text-slate-500 font-medium">Self-Paced</span>
      </div>

      {/* Clear, approachable title & description */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Java Programming
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Learn Java step-by-step from scratch. Build strong mental models, write clean code, and practice interactively.
        </p>
      </div>

      {/* Progress & Quick Action */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="w-full sm:w-64">
          <ProgressBar value={course.progressPercent || 25} label="Course Progress" />
        </div>
        <Link href={`/${course.languageSlug}/basics`}>
          <Button variant="primary" size="md" className="w-full sm:w-auto font-bold min-h-[40px]">
            Continue Learning →
          </Button>
        </Link>
      </div>
    </div>
  );
};

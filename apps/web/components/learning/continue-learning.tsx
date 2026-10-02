"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { storage } from '@/lib/storage';
import { Button, Card, Badge, ProgressBar } from '@learnbyself/ui';

export const ContinueLearning: React.FC = () => {
  const [lastLesson, setLastLesson] = useState<{
    languageSlug: string;
    languageName: string;
    moduleSlug: string;
    lessonSlug: string;
    lessonTitle: string;
    progressPercent: number;
  } | null>(null);

  useEffect(() => {
    // Check client storage for last accessed lesson
    const saved = storage.get('last_lesson', null);
    if (saved) {
      setLastLesson(saved);
    } else {
      // Default to ground zero Java start
      setLastLesson({
        languageSlug: 'java',
        languageName: 'Java',
        moduleSlug: 'fundamentals',
        lessonSlug: 'hello-world',
        lessonTitle: 'Deconstructing Hello World & The JVM Architecture',
        progressPercent: 25
      });
    }
  }, []);

  if (!lastLesson) return null;

  return (
    <Card variant="highlight" className="border-brand-200">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center space-x-2">
            <Badge variant="blue" size="sm">ACTIVE LESSON</Badge>
            <span className="text-xs text-slate-500 font-medium">
              {lastLesson.languageName} • Module 1
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {lastLesson.lessonTitle}
          </h3>
          <div className="w-48 sm:w-64 pt-1">
            <ProgressBar value={lastLesson.progressPercent} label="Lesson Progress" />
          </div>
        </div>

        <Link
          href={`/${lastLesson.languageSlug}/${lastLesson.moduleSlug}/${lastLesson.lessonSlug}`}
          className="w-full md:w-auto"
        >
          <Button variant="primary" size="md" className="w-full md:w-auto font-semibold">
            Resume Learning →
          </Button>
        </Link>
      </div>
    </Card>
  );
};

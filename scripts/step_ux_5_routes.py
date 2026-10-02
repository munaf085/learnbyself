# -*- coding: utf-8 -*-
import os

def write_file(path, content):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {path}")

# layout.tsx
write_file("apps/web/app/layout.tsx", """import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'LearnBySelf | Engineering-Grade Self Learning Platform',
  description: 'Zero-teacher dependency programming mastery for Indian B.Tech students, college graduates, and placement candidates.',
  openGraph: {
    title: 'LearnBySelf — From Ground Zero to Technical Interview Readiness',
    description: 'Structured programming education with deep mental models, line-by-line deconstruction, practice exercises, and real interview questions.'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-brand-500 selection:text-white">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
""")

# page.tsx (Home Page)
write_file("apps/web/app/page.tsx", """import Link from 'next/link';
import { curriculumProvider } from '@/lib/curriculum/provider';
import { Card, Badge, Button } from '@learnbyself/ui';
import { ContinueLearning } from '@/components/learning/continue-learning';

export default async function HomePage() {
  const languages = await curriculumProvider.getLanguages();

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* 1. Continue Learning Persistent Banner */}
      <section>
        <ContinueLearning />
      </section>

      {/* 2. Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-2 sm:pt-4">
        <Badge variant="blue" size="md" className="shadow-subtle">
          Zero-Teacher Dependency • Deep Mental Models
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Master Software Engineering from <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">Ground Zero</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Tailored for Indian B.Tech students, college graduates, and placement candidates.
          Progress smoothly from zero knowledge to deep fundamentals, code deconstruction, bug hunting, and company interview readiness.
        </p>
      </section>

      {/* 3. The 8-Step LearnBySelf Progression Engine */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            The LearnBySelf Progression Engine
          </h2>
          <span className="text-xs text-slate-500 font-medium">8 Guided Steps to Placement Mastery</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 text-center">
          {[
            { step: '1', title: 'Beginner', desc: 'No Prior Coding' },
            { step: '2', title: 'Mental Models', desc: 'Visual Analogies' },
            { step: '3', title: 'Deconstruction', desc: 'Line-by-Line' },
            { step: '4', title: 'Practice', desc: 'MCQ & Fixes' },
            { step: '5', title: 'Debugging', desc: 'Bug Hunting' },
            { step: '6', title: 'Projects', desc: 'Real Git Repos' },
            { step: '7', title: 'Interviews', desc: 'Company Tags' },
            { step: '8', title: 'Job Ready', desc: 'Confidence' },
          ].map((item, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-brand-200 hover:bg-brand-50/20 transition-all flex flex-col justify-between"
            >
              <span className="text-[11px] font-bold text-brand-600 font-mono">Step {item.step}</span>
              <p className="font-bold text-xs text-slate-900 mt-1">{item.title}</p>
              <span className="text-[10px] text-slate-500 mt-0.5">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Multi-Language Curriculum Catalog */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Supported Language Tracks</h2>
            <p className="text-xs sm:text-sm text-slate-500">Every track uses the exact same structured learning engine.</p>
          </div>
          <Badge variant="green" size="sm">Phase 1 Active</Badge>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {languages.map((lang) => (
            <Card key={lang.slug} variant={lang.isAvailable ? 'interactive' : 'default'} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl p-1 bg-slate-50 rounded-xl border border-slate-100">{lang.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{lang.name}</h3>
                      <span className="text-xs text-slate-400 font-mono">{lang.version}</span>
                    </div>
                  </div>
                  {lang.isAvailable ? (
                    <Badge variant="green" size="sm">Active Track</Badge>
                  ) : (
                    <Badge variant="slate" size="sm">Curriculum Roadmap</Badge>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">{lang.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {lang.paradigms.map((p, idx) => (
                    <span key={idx} className="text-[10px] sm:text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                {lang.isAvailable ? (
                  <Link href={`/${lang.slug}`} className="block">
                    <Button variant="primary" className="w-full font-semibold">
                      Explore {lang.name} Track →
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" disabled className="w-full">
                    Engine Ready • Curriculum Coming Soon
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
""")

# [language]/page.tsx (Course Dashboard)
write_file("apps/web/app/[language]/page.tsx", """import { notFound } from 'next/navigation';
import Link from 'next/link';
import { curriculumProvider } from '@/lib/curriculum/provider';
import type { LanguageSlug } from '@learnbyself/types';
import { Card, Badge, Button, ProgressBar } from '@learnbyself/ui';
import { Breadcrumbs } from '@/components/learning/breadcrumbs';

interface PageProps {
  params: Promise<{ language: string }>;
}

export default async function CoursePage({ params }: PageProps) {
  const { language } = await params;
  const course = await curriculumProvider.getCourse(language as LanguageSlug);

  if (!course) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Courses', href: '/' },
    { label: `${course.title.split(':')[0]}`, isCurrent: true }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumb */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Course Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-subtle">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="purple" size="sm">{course.level.toUpperCase()}</Badge>
          <Badge variant="blue" size="sm">{course.estimatedHours} Hours Total</Badge>
          <Badge variant="green" size="sm">Zero Prerequisites</Badge>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {course.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {course.headline}
        </p>

        {/* Action bar & Progress */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="w-full sm:w-72">
            <ProgressBar value={25} label="Overall Course Completion" />
          </div>
          <Link href={`/${course.languageSlug}/fundamentals/hello-world`}>
            <Button variant="primary" size="md">
              Continue Learning →
            </Button>
          </Link>
        </div>
      </div>

      {/* Course Sections and Modules */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Course Syllabus & Modules
          </h2>
          <span className="text-xs text-slate-500 font-medium">1 Module Ready</span>
        </div>

        {course.sections.map((section) => (
          <div key={section.id} className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {section.title}
            </h3>

            <div className="space-y-4">
              {section.modules.map((module) => (
                <Card key={module.id} className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{module.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {module.description}
                      </p>
                    </div>
                    <Badge variant="blue" size="sm" className="self-start">
                      ~{module.estimatedMinutes} Mins
                    </Badge>
                  </div>

                  {/* Learning Objectives */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Key Learning Objectives:
                    </p>
                    <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc list-inside">
                      {module.learningObjectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Lessons in this module */}
                  <div className="divide-y divide-slate-100 pt-1">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-brand-600">Lesson {lesson.orderIndex}</span>
                            <span className="text-xs text-slate-300">•</span>
                            <Badge variant="slate" size="sm">{lesson.difficulty}</Badge>
                            <span className="text-xs text-slate-400 font-mono">~{lesson.estimatedMinutes}m</span>
                          </div>
                          <p className="text-sm font-semibold text-slate-900">{lesson.title}</p>
                          <p className="text-xs text-slate-500">{lesson.summary}</p>
                        </div>
                        <Link href={`/${course.languageSlug}/${module.slug}/${lesson.slug}`} className="sm:self-center">
                          <Button size="sm" variant="primary" className="w-full sm:w-auto">
                            Start Lesson →
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
""")

# [language]/[module]/[lesson]/page.tsx (Lesson Workspace View)
write_file("apps/web/app/[language]/[module]/[lesson]/page.tsx", """import { notFound } from 'next/navigation';
import Link from 'next/link';
import { curriculumProvider } from '@/lib/curriculum/provider';
import type { LanguageSlug } from '@learnbyself/types';
import { Badge, Button } from '@learnbyself/ui';
import { Breadcrumbs } from '@/components/learning/breadcrumbs';
import { LessonWorkspace } from '@/components/learning/lesson-workspace';

interface LessonPageProps {
  params: Promise<{
    language: string;
    module: string;
    lesson: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { language, module: moduleSlug, lesson: lessonSlug } = await params;
  const lesson = await curriculumProvider.getLesson(
    language as LanguageSlug,
    moduleSlug,
    lessonSlug
  );

  if (!lesson) {
    notFound();
  }

  const breadcrumbs = [
    { label: `${language.toUpperCase()} Course`, href: `/${language}` },
    { label: moduleSlug.replace('-', ' '), href: `/${language}` },
    { label: lesson.title, isCurrent: true }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Lesson Header */}
      <div className="space-y-3 border-b border-slate-200 pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="blue" size="sm">Lesson {lesson.slug}</Badge>
          <Badge variant="slate" size="sm">{lesson.difficulty.toUpperCase()}</Badge>
          <span className="text-xs text-slate-400 font-mono">• Placement Focus</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {lesson.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {lesson.summary}
        </p>
      </div>

      {/* Focused 7-Stage Lesson Workspace */}
      <LessonWorkspace lesson={lesson} />

      {/* Bottom Sticky Action Bar */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <Link href={`/${language}`} className="w-full sm:w-auto">
          <Button variant="outline" size="md" className="w-full sm:w-auto">
            ← Back to Course Syllabus
          </Button>
        </Link>
        <Link href={`/${language}`} className="w-full sm:w-auto">
          <Button variant="success" size="md" className="w-full sm:w-auto font-semibold">
            Mark Lesson Complete & Continue ✓
          </Button>
        </Link>
      </div>
    </div>
  );
}
""")

# practice/page.tsx (Practice Hub)
write_file("apps/web/app/practice/page.tsx", """import React from 'react';
import Link from 'next/link';
import { Card, Badge, Button } from '@learnbyself/ui';

export default function PracticeHubPage() {
  const problems = [
    {
      id: 'p1',
      title: 'Java Compilation vs JVM Bytecode Execution',
      type: 'MCQ Check',
      language: 'Java',
      difficulty: 'Easy',
      time: '45s',
      href: '/java/fundamentals/hello-world'
    },
    {
      id: 'p2',
      title: 'Find Case-Sensitivity Syntax Bug in Main Method',
      type: 'Bug Hunting',
      language: 'Java',
      difficulty: 'Easy',
      time: '60s',
      href: '/java/fundamentals/hello-world'
    },
    {
      id: 'p3',
      title: 'Static Keyword Ambiguity in Entry Point Method',
      type: 'Interview Question',
      language: 'Java',
      difficulty: 'Medium',
      time: '120s',
      href: '/java/fundamentals/hello-world'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Practice & Interview Question Hub
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Test your mental models, debug common syntax pitfalls, and prepare for real software engineering placement rounds.
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
        <span className="px-3 py-1.5 rounded-lg bg-brand-600 text-white text-xs font-semibold">
          All Problems (3)
        </span>
        <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 cursor-pointer">
          Java Only
        </span>
        <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 cursor-pointer">
          MCQs
        </span>
        <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 cursor-pointer">
          Bug Hunting
        </span>
        <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 cursor-pointer">
          Interview Q&A
        </span>
      </div>

      {/* Problem list */}
      <div className="space-y-3">
        {problems.map((p) => (
          <Card key={p.id} variant="interactive" className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Badge variant="blue" size="sm">{p.type}</Badge>
                  <span className="text-xs text-slate-400 font-mono">• {p.language}</span>
                  <Badge variant="slate" size="sm">{p.difficulty}</Badge>
                  <span className="text-xs text-slate-400 font-mono">~{p.time}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
              </div>

              <Link href={p.href} className="sm:self-center">
                <Button size="sm" variant="primary">
                  Solve Now →
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
""")

# profile/page.tsx (Student Profile)
write_file("apps/web/app/profile/page.tsx", """import React from 'react';
import Link from 'next/link';
import { Card, Badge, Button, ProgressBar } from '@learnbyself/ui';

export default function ProfilePage() {
  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Profile Overview */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-subtle">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-2xl font-bold text-brand-700">
            S
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Student Learner</h1>
            <p className="text-xs text-slate-500 font-mono">B.Tech Software Engineering Track</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-center">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xl font-bold text-brand-600">1</span>
            <p className="text-xs text-slate-500 mt-0.5">Lesson Completed</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xl font-bold text-amber-600">1 Day</span>
            <p className="text-xs text-slate-500 mt-0.5">Active Streak</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xl font-bold text-emerald-600">100%</span>
            <p className="text-xs text-slate-500 mt-0.5">Quiz Accuracy</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xl font-bold text-purple-600">50 XP</span>
            <p className="text-xs text-slate-500 mt-0.5">Total Mastery XP</p>
          </div>
        </div>
      </div>

      {/* Track Progress */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Enrolled Tracks</h2>
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">☕</span>
              <div>
                <h3 className="font-bold text-slate-900">Java Mastery from Scratch</h3>
                <p className="text-xs text-slate-500">Module 1: Java Architecture</p>
              </div>
            </div>
            <Badge variant="blue" size="sm">In Progress</Badge>
          </div>

          <ProgressBar value={25} label="Track Progress" />

          <div className="flex justify-end pt-1">
            <Link href="/java/fundamentals/hello-world">
              <Button size="sm" variant="primary">Resume Java Lesson →</Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Next Recommended Topic */}
      <Card variant="highlight" className="border-brand-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <Badge variant="purple" size="sm" className="mb-1">RECOMMENDED REVISION</Badge>
            <h4 className="font-bold text-slate-900 text-base">Static Methods & JVM Entry Point</h4>
            <p className="text-xs text-slate-600 mt-0.5">Frequently asked in TCS Digital and Infosys technical interviews.</p>
          </div>
          <Link href="/java/fundamentals/hello-world">
            <Button size="sm" variant="outline">Review Interview Q&A</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
""")

# loading.tsx
write_file("apps/web/app/loading.tsx", """import React from 'react';
import { Skeleton } from '@learnbyself/ui';

export default function Loading() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-44 w-full rounded-2xl" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-28 w-full rounded-2xl" />
      </div>
    </div>
  );
}
""")

# error.tsx
write_file("apps/web/app/error.tsx", """"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button, Card } from '@learnbyself/ui';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error caught:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center p-8 space-y-4 shadow-elevated">
        <span className="text-4xl block">⚠️</span>
        <h2 className="text-xl font-bold text-slate-900">Something went wrong loading this content</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          We encountered an unexpected error while preparing your learning workspace.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
          <Button variant="primary" size="md" onClick={() => reset()}>
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" size="md" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
""")

# not-found.tsx
write_file("apps/web/app/not-found.tsx", """import React from 'react';
import Link from 'next/link';
import { Button, Card } from '@learnbyself/ui';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center p-8 space-y-4 shadow-elevated">
        <span className="text-4xl block">🔍</span>
        <h2 className="text-2xl font-bold text-slate-900">Topic Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          The curriculum page or lesson you are looking for does not exist or may have been moved.
        </p>
        <div className="pt-2">
          <Link href="/">
            <Button variant="primary" size="md">
              Return to Learning Tracks →
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
""")

print("Routes created and updated.")

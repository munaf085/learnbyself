# -*- coding: utf-8 -*-
import os

def write_file(path, content):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {path}")

# 1. Level 1: Course Page (app/[language]/page.tsx)
write_file("apps/web/app/[language]/page.tsx", """import { notFound } from 'next/navigation';
import { curriculumProvider } from '@/lib/curriculum/provider';
import type { LanguageSlug } from '@learnbyself/types';
import { CourseHeader } from '@/components/curriculum/course-header';
import { SectionCard } from '@/components/curriculum/section-card';
import { Breadcrumbs } from '@/components/learning/breadcrumbs';

interface CoursePageProps {
  params: Promise<{ language: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { language } = await params;
  const course = await curriculumProvider.getCourse(language as LanguageSlug);

  if (!course) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'All Courses', href: '/' },
    { label: `${course.title.split(':')[0]}`, isCurrent: true }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumb */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Course Banner */}
      <CourseHeader course={course} />

      {/* Section Roadmap */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              YOUR {course.languageSlug.toUpperCase()} JOURNEY
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              18 Guided Sections • From True Zero to Technical Interview Readiness
            </p>
          </div>
          <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
            Phase 1 Active Tracks
          </span>
        </div>

        <div className="space-y-3.5">
          {course.sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              languageSlug={course.languageSlug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
""")

# 2. Level 2: Section Page (app/[language]/[section]/page.tsx)
write_file("apps/web/app/[language]/[section]/page.tsx", """import { notFound } from 'next/navigation';
import { curriculumProvider } from '@/lib/curriculum/provider';
import type { LanguageSlug } from '@learnbyself/types';
import { Badge, ProgressBar } from '@learnbyself/ui';
import { Breadcrumbs } from '@/components/learning/breadcrumbs';
import { ModuleCard } from '@/components/curriculum/module-card';

interface SectionPageProps {
  params: Promise<{
    language: string;
    section: string;
  }>;
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { language, section: sectionSlug } = await params;
  const section = await curriculumProvider.getSection(language as LanguageSlug, sectionSlug);
  const course = await curriculumProvider.getCourse(language as LanguageSlug);

  if (!section || !course) {
    notFound();
  }

  const breadcrumbs = [
    { label: `${language.toUpperCase()} Course`, href: `/${language}` },
    { label: section.title, isCurrent: true }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumb */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Section Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-subtle">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="purple" size="sm">SECTION {String(section.orderIndex).padStart(2, '0')}</Badge>
          <Badge variant="blue" size="sm">{section.totalModules || section.modules.length} Modules</Badge>
          <Badge variant="green" size="sm">~{section.estimatedHours || 10} Hours</Badge>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {section.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            {section.summary}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 max-w-md">
          <ProgressBar value={section.progressPercent || 0} label="Section Progress" />
        </div>
      </div>

      {/* Vertical Journey of Modules */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            MODULES JOURNEY
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Step-by-step module progression
          </span>
        </div>

        <div className="space-y-4">
          {section.modules.map((mod) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              languageSlug={language}
              sectionSlug={section.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
""")

# 3. Level 3: Module Page (app/[language]/[section]/[module]/page.tsx)
write_file("apps/web/app/[language]/[section]/[module]/page.tsx", """import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { curriculumProvider } from '@/lib/curriculum/provider';
import type { LanguageSlug } from '@learnbyself/types';
import { Badge, Button, ProgressBar, Card } from '@learnbyself/ui';
import { Breadcrumbs } from '@/components/learning/breadcrumbs';

interface ModulePageProps {
  params: Promise<{
    language: string;
    section: string;
    module: string;
  }>;
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { language, section: sectionSlug, module: moduleSlug } = await params;

  // Handle legacy route fallback: /java/fundamentals/hello-world
  if (sectionSlug === 'fundamentals' && moduleSlug === 'hello-world') {
    redirect('/java/basics/getting-started/hello-world');
  }

  const moduleData = await curriculumProvider.getModule(language as LanguageSlug, sectionSlug, moduleSlug);
  const section = await curriculumProvider.getSection(language as LanguageSlug, sectionSlug);

  if (!moduleData || !section) {
    notFound();
  }

  const breadcrumbs = [
    { label: `${language.toUpperCase()}`, href: `/${language}` },
    { label: section.title, href: `/${language}/${section.slug}` },
    { label: moduleData.title, isCurrent: true }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Breadcrumb */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Module Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-5 shadow-subtle">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="blue" size="sm">MODULE {moduleData.orderIndex}</Badge>
          <Badge variant="purple" size="sm">{moduleData.lessons.length} Lessons</Badge>
          <span className="text-xs text-slate-400 font-mono">~{moduleData.estimatedMinutes} Minutes</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {moduleData.title}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            {moduleData.description}
          </p>
        </div>

        <div className="pt-2 max-w-md">
          <ProgressBar value={moduleData.progressPercent || 0} label="Module Mastery" />
        </div>

        {/* What you'll learn */}
        {moduleData.learningObjectives.length > 0 && (
          <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100 text-xs sm:text-sm text-slate-700">
            <span className="font-bold text-slate-800 uppercase tracking-wider block mb-2 text-xs">
              What you'll master:
            </span>
            <ul className="grid sm:grid-cols-2 gap-1.5 list-disc list-inside">
              {moduleData.learningObjectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Lessons Checklist */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold text-slate-900">
            LESSONS IN THIS MODULE
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            {moduleData.lessons.length} Lessons
          </span>
        </div>

        <div className="space-y-3">
          {moduleData.lessons.map((lesson, idx) => {
            const isCompleted = !!lesson.isCompleted;
            const isCurrent = !!lesson.isCurrent;

            return (
              <Card
                key={lesson.id}
                variant="interactive"
                className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isCurrent ? 'border-brand-300 ring-2 ring-brand-500/10 bg-brand-50/10' : ''
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <span className="mt-1 font-mono text-base select-none">
                    {isCompleted ? (
                      <span className="text-emerald-600 font-bold">✓</span>
                    ) : isCurrent ? (
                      <span className="text-brand-600 font-bold">●</span>
                    ) : (
                      <span className="text-slate-300 font-bold">○</span>
                    )}
                  </span>

                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-brand-600 font-mono">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xs text-slate-300">•</span>
                      <Badge variant="slate" size="sm">{lesson.difficulty}</Badge>
                      <span className="text-xs text-slate-400 font-mono">~{lesson.estimatedMinutes}m</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-slate-500 max-w-xl">
                      {lesson.summary}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/${language}/${sectionSlug}/${moduleSlug}/${lesson.slug}`}
                  className="sm:self-center"
                >
                  <Button size="sm" variant={isCurrent ? 'primary' : 'outline'}>
                    {isCurrent ? 'Continue Lesson →' : isCompleted ? 'Review Lesson' : 'Start Lesson →'}
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
""")

# 4. Level 4: Lesson Workspace Page (app/[language]/[section]/[module]/[lesson]/page.tsx)
write_file("apps/web/app/[language]/[section]/[module]/[lesson]/page.tsx", """import { notFound } from 'next/navigation';
import { curriculumProvider } from '@/lib/curriculum/provider';
import type { LanguageSlug } from '@learnbyself/types';
import { Breadcrumbs } from '@/components/learning/breadcrumbs';
import { LessonSidebar } from '@/components/curriculum/lesson-sidebar';
import { StepWorkspace } from '@/components/curriculum/step-workspace';

interface LessonPageProps {
  params: Promise<{
    language: string;
    section: string;
    module: string;
    lesson: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { language, section: sectionSlug, module: moduleSlug, lesson: lessonSlug } = await params;
  const lesson = await curriculumProvider.getLesson(
    language as LanguageSlug,
    sectionSlug,
    moduleSlug,
    lessonSlug
  );

  const section = await curriculumProvider.getSection(language as LanguageSlug, sectionSlug);

  if (!lesson || !section) {
    notFound();
  }

  const breadcrumbs = [
    { label: `${language.toUpperCase()}`, href: `/${language}` },
    { label: section.title, href: `/${language}/${section.slug}` },
    { label: lesson.currentModule?.title || moduleSlug, href: `/${language}/${section.slug}/${moduleSlug}` },
    { label: lesson.title, isCurrent: true }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={breadcrumbs} />

      {/* 2-Column Focused Layout: Left Module Sidebar + Main Step Workspace */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Module Sidebar (strictly current module only) */}
        {lesson.currentModule && (
          <LessonSidebar
            moduleTitle={lesson.currentModule.title}
            lessons={lesson.currentModule.lessons}
            languageSlug={language}
            sectionSlug={sectionSlug}
            currentLessonSlug={lesson.slug}
          />
        )}

        {/* Main Step-by-Step Lesson Workspace */}
        <main className="flex-1 w-full min-w-0">
          <StepWorkspace
            lesson={lesson}
            languageSlug={language}
            sectionSlug={sectionSlug}
          />
        </main>
      </div>
    </div>
  );
}
""")

print("Hierarchical route pages created.")

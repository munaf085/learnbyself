import { notFound } from 'next/navigation';
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

  const courseName = (course.title.includes(':') ? course.title.split(':')[0] : course.title) || 'Java';
  const breadcrumbs = [
    { label: 'All Courses', href: '/' },
    { label: courseName, isCurrent: true }
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Breadcrumb */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Course Banner */}
      <CourseHeader course={course} />

      {/* Section Roadmap */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Course Syllabus
            </h2>
            <p className="text-xs text-slate-500">
              {course.sections.length} structured sections from fundamentals to interview prep
            </p>
          </div>
        </div>

        <div className="space-y-3">
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

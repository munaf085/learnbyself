import { notFound } from 'next/navigation';
import { curriculumProvider } from '@/lib/curriculum/provider';
import type { LanguageSlug } from '@learnbyself/types';
import { LearningStudio } from '@/components/curriculum/learning-studio';

interface SectionPageProps {
  params: Promise<{
    language: string;
    section: string;
  }>;
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { language, section: sectionSlug } = await params;
  const section = await curriculumProvider.getSection(language as LanguageSlug, sectionSlug);

  if (!section || !section.modules || section.modules.length === 0) {
    notFound();
  }

  const firstModule = section.modules[0];
  if (!firstModule || !firstModule.lessons || firstModule.lessons.length === 0) {
    notFound();
  }

  const firstLessonSummary = firstModule.lessons[0];
  if (!firstLessonSummary) {
    notFound();
  }

  const initialLesson = await curriculumProvider.getLesson(
    language as LanguageSlug,
    section.slug,
    firstModule.slug,
    firstLessonSummary.slug
  );

  if (!initialLesson) {
    notFound();
  }

  return (
    <LearningStudio
      languageSlug={language}
      section={section}
      initialLesson={initialLesson}
    />
  );
}

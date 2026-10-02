import { notFound } from 'next/navigation';
import { curriculumProvider } from '@/lib/curriculum/provider';
import type { LanguageSlug } from '@learnbyself/types';
import { LearningStudio } from '@/components/curriculum/learning-studio';

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

  return (
    <LearningStudio
      languageSlug={language}
      section={section}
      initialLesson={lesson}
    />
  );
}

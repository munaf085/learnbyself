import { notFound, redirect } from 'next/navigation';
import { curriculumProvider } from '@/lib/curriculum/provider';
import type { LanguageSlug } from '@learnbyself/types';
import { LearningStudio } from '@/components/curriculum/learning-studio';

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

  if (!moduleData || !section || !moduleData.lessons || moduleData.lessons.length === 0) {
    notFound();
  }

  const firstLesson = moduleData.lessons[0];
  if (!firstLesson) {
    notFound();
  }

  const initialLesson = await curriculumProvider.getLesson(
    language as LanguageSlug,
    sectionSlug,
    moduleSlug,
    firstLesson.slug
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

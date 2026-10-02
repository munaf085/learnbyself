import { describe, it, expect } from 'vitest';
import type { Section, Module, LessonSummary } from '@learnbyself/types';
import { MobileCurriculumBottomBar } from '../components/curriculum/mobile-curriculum-bottom-bar';
import { CurriculumAccordionSidebar } from '../components/curriculum/curriculum-accordion-sidebar';

describe('Mobile Curriculum Navigation & Drawer Logic', () => {
  const mockModules: Module[] = [
    {
      id: 'mod-1',
      slug: 'intro',
      title: 'Introduction to Java',
      order: 1,
      estimatedMinutes: 30,
      lessons: [
        { id: 'les-1', slug: 'what-is-java', title: 'What is Java', order: 1, estimatedMinutes: 10, difficulty: 'easy' },
        { id: 'les-2', slug: 'installing-java', title: 'Installing Java', order: 2, estimatedMinutes: 20, difficulty: 'easy' }
      ]
    },
    {
      id: 'mod-2',
      slug: 'syntax',
      title: 'Java Basic Syntax',
      order: 2,
      estimatedMinutes: 45,
      lessons: [
        { id: 'les-3', slug: 'variables', title: 'Variables & Data Types', order: 1, estimatedMinutes: 15, difficulty: 'easy' },
        { id: 'les-4', slug: 'operators', title: 'Operators & Expressions', order: 2, estimatedMinutes: 30, difficulty: 'medium' }
      ]
    }
  ];

  const mockSection: Section = {
    id: 'sec-basics',
    slug: 'basics',
    title: 'Java Basics',
    order: 1,
    isLocked: false,
    modules: mockModules
  };

  // Helper mimicking studio Prev/Next flattening
  function computeSectionPointers(section: Section, currentModSlug: string, currentLesSlug: string) {
    const allLessons: { moduleSlug: string; lesson: LessonSummary }[] = [];
    section.modules.forEach(m => {
      m.lessons.forEach(l => {
        allLessons.push({ moduleSlug: m.slug, lesson: l });
      });
    });

    const currentIndex = allLessons.findIndex(
      item => item.moduleSlug === currentModSlug && item.lesson.slug === currentLesSlug
    );

    const prevItem = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    const nextItem = currentIndex < allLessons.length - 1 && currentIndex !== -1
      ? allLessons[currentIndex + 1]
      : null;

    return { allLessons, currentIndex, prevItem, nextItem };
  }

  it('correctly disables Prev on the first lesson in the curriculum', () => {
    const { prevItem, nextItem, currentIndex } = computeSectionPointers(mockSection, 'intro', 'what-is-java');
    expect(currentIndex).toBe(0);
    expect(prevItem).toBeNull();
    expect(nextItem).not.toBeNull();
    expect(nextItem?.lesson.slug).toBe('installing-java');
  });

  it('seamlessly traverses across module boundaries from Module 1 last lesson to Module 2 first lesson', () => {
    const { prevItem, nextItem, currentIndex } = computeSectionPointers(mockSection, 'intro', 'installing-java');
    expect(currentIndex).toBe(1);
    expect(prevItem?.lesson.slug).toBe('what-is-java');
    expect(nextItem).not.toBeNull();
    expect(nextItem?.moduleSlug).toBe('syntax');
    expect(nextItem?.lesson.slug).toBe('variables');
  });

  it('correctly disables Next on the very last lesson of the section', () => {
    const { prevItem, nextItem, currentIndex } = computeSectionPointers(mockSection, 'syntax', 'operators');
    expect(currentIndex).toBe(3);
    expect(prevItem?.lesson.slug).toBe('variables');
    expect(nextItem).toBeNull();
  });

  it('filters lessons accurately without breaking module hierarchy for the mobile search drawer', () => {
    const query = 'variable';
    const filtered = mockModules.map(mod => ({
      ...mod,
      lessons: mod.lessons.filter(l => l.title.toLowerCase().includes(query.toLowerCase()))
    })).filter(mod => mod.lessons.length > 0);

    expect(filtered.length).toBe(1);
    expect(filtered[0].slug).toBe('syntax');
    expect(filtered[0].lessons.length).toBe(1);
    expect(filtered[0].lessons[0].slug).toBe('variables');
  });

  it('exports MobileCurriculumBottomBar component function', () => {
    expect(typeof MobileCurriculumBottomBar).toBe('function');
  });

  it('exports CurriculumAccordionSidebar component function', () => {
    expect(typeof CurriculumAccordionSidebar).toBe('function');
  });
});

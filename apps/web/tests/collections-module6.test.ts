import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java Collections - Module 6: Iterators, Sorting & Ordering', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);

  const sectionSlug = 'collections';
  const moduleSlug = 'iterators-and-ordering-contracts';
  const expectedLessons = [
    'the-iterable-interface-and-the-enhanced-for-each-loop',
    'iterator-safe-in-flight-modification-and-traversal',
    'listiterator-bi-directional-traversal-and-list-mutation',
    'fail-fast-vs-fail-safe-iterators-and-concurrentmodificationexception',
    'comparable-interface-defining-natural-ordering',
    'comparator-interface-custom-sorting-and-lambda-chains',
    'the-collections-utility-class-algorithms-and-best-practices'
  ];

  it('verifies Module 6 has exactly 7 lessons with matching order and slugs', async () => {
    const mod = await provider.getModule('java', sectionSlug, moduleSlug);
    expect(mod).not.toBeNull();
    expect(mod?.title).toBe('06. Iterators, Sorting & Ordering');
    expect(mod?.lessons.length).toBe(7);
    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedLessons);
  });

  it('verifies all 7 lessons load full content, 6 activity types, and 5 practice problems', async () => {
    for (const slug of expectedLessons) {
      const lesson = await provider.getLesson('java', sectionSlug, moduleSlug, slug);
      expect(lesson).not.toBeNull();
      expect(lesson?.activities.length).toBe(6);

      const types = lesson?.activities.map(a => a.type);
      expect(types).toContain('analogy');
      expect(types).toContain('concept');
      expect(types).toContain('code_walkthrough');
      expect(types).toContain('mcq');
      expect(types).toContain('interview_qa');
      expect(types).toContain('self_evaluation');

      expect(lesson?.practiceProblems).toBeDefined();
      expect(lesson?.practiceProblems!.length).toBe(5);

      for (const p of lesson!.practiceProblems!) {
        expect(p.problemStatement.length).toBeGreaterThan(20);
        expect(p.expectedOutput.length).toBeGreaterThan(0);
        expect(p.solutionCode.length).toBeGreaterThan(20);
      }
    }
  });

  it('verifies Lesson 1 covers Iterable, Iterator, and enhanced for-each compilation', async () => {
    const les = await provider.getLesson('java', sectionSlug, moduleSlug, 'the-iterable-interface-and-the-enhanced-for-each-loop');
    expect(les?.title).toContain('Iterable');
    const concept = les?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('Iterable<T>');
    expect(concept?.content).toContain('iterator()');
  });

  it('verifies Lesson 2 covers Iterator in-flight remove() and cursor mechanics', async () => {
    const les = await provider.getLesson('java', sectionSlug, moduleSlug, 'iterator-safe-in-flight-modification-and-traversal');
    expect(les?.title).toContain('Iterator');
    const concept = les?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('remove()');
    expect(concept?.content).toContain('cursor');
  });

  it('verifies Lesson 3 covers ListIterator bi-directional traversal and list mutation', async () => {
    const les = await provider.getLesson('java', sectionSlug, moduleSlug, 'listiterator-bi-directional-traversal-and-list-mutation');
    expect(les?.title).toContain('ListIterator');
    const concept = les?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('hasPrevious');
    expect(concept?.content).toContain('previous()');
    expect(concept?.content).toContain('set(');
    expect(concept?.content).toContain('add(');
  });

  it('verifies Lesson 4 covers modCount, expectedModCount, fail-fast and fail-safe mechanics', async () => {
    const les = await provider.getLesson('java', sectionSlug, moduleSlug, 'fail-fast-vs-fail-safe-iterators-and-concurrentmodificationexception');
    expect(les?.title).toContain('ConcurrentModificationException');
    const concept = les?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('modCount');
    expect(concept?.content).toContain('expectedModCount');
    expect(concept?.content).toContain('Fail-Fast');
    expect(concept?.content).toContain('Fail-Safe');
  });

  it('verifies Lesson 5 covers Comparable natural ordering and compareTo contract', async () => {
    const les = await provider.getLesson('java', sectionSlug, moduleSlug, 'comparable-interface-defining-natural-ordering');
    expect(les?.title).toContain('Comparable');
    const concept = les?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('Comparable<T>');
    expect(concept?.content).toContain('compareTo');
  });

  it('verifies Lesson 6 covers Comparator, lambda chains, and thenComparing', async () => {
    const les = await provider.getLesson('java', sectionSlug, moduleSlug, 'comparator-interface-custom-sorting-and-lambda-chains');
    expect(les?.title).toContain('Comparator');
    const concept = les?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('Comparator<T>');
    expect(concept?.content).toContain('comparing');
    expect(concept?.content).toContain('thenComparing');
  });

  it('verifies Lesson 7 covers Collections algorithms, binarySearch, and unmodifiable wrappers', async () => {
    const les = await provider.getLesson('java', sectionSlug, moduleSlug, 'the-collections-utility-class-algorithms-and-best-practices');
    expect(les?.title).toContain('Collections');
    const concept = les?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('TimSort');
    expect(concept?.content).toContain('binarySearch');
    expect(concept?.content).toContain('unmodifiableList');
  });
});

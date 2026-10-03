import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java Collections - Module 7: Specialized Collections & Clean Design', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);

  const sectionSlug = 'collections';
  const moduleSlug = 'specialized-collections-and-clean-design';
  const expectedLessons = [
    'modern-unmodifiable-and-immutable-collections',
    'enumset-and-enummap-extreme-performance-collections',
    'synchronized-wrappers-vs-concurrent-collections',
    'the-java-collections-decision-tree',
    'practice-designing-a-generic-cache-and-repository',
    'debugging-and-placement-interview-gotchas-collections-and-generics'
  ];

  it('verifies Module 7 has exactly 6 lessons with matching order and slugs', async () => {
    const mod = await provider.getModule('java', sectionSlug, moduleSlug);
    expect(mod).not.toBeNull();
    expect(mod?.title).toBe('07. Specialized Collections & Clean Design');
    expect(mod?.lessons.length).toBe(6);
    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedLessons);
  });

  it('verifies all 6 lessons load full content, 6 activity types, and 5 practice problems', async () => {
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

  it('verifies Lesson 1 covers List.of, copyOf, and structural immutability vs unmodifiableList', async () => {
    const les = await provider.getLesson('java', sectionSlug, moduleSlug, 'modern-unmodifiable-and-immutable-collections');
    expect(les?.title).toContain('Immutable Collections');
    const concept = les?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('List.of');
    expect(concept?.content).toContain('copyOf');
    expect(concept?.content).toContain('unmodifiableList');
  });

  it('verifies Lesson 2 covers EnumSet bitmask (RegularEnumSet) and EnumMap array indexing', async () => {
    const les = await provider.getLesson('java', sectionSlug, moduleSlug, 'enumset-and-enummap-extreme-performance-collections');
    expect(les?.title).toContain('EnumSet & EnumMap');
    const concept = les?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('RegularEnumSet');
    expect(concept?.content).toContain('EnumMap');
    expect(concept?.content).toContain('ordinal()');
  });

  it('verifies Lesson 3 covers synchronized wrappers, external monitor synchronization, and ConcurrentHashMap', async () => {
    const les = await provider.getLesson('java', sectionSlug, moduleSlug, 'synchronized-wrappers-vs-concurrent-collections');
    expect(les?.title).toContain('Synchronized Wrappers');
    const concept = les?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('synchronizedList');
    expect(concept?.content).toContain('ConcurrentHashMap');
    expect(concept?.content).toContain('CopyOnWriteArrayList');
  });

  it('verifies Lesson 4 covers the decision tree, time complexity, and ArrayDeque over Stack', async () => {
    const les = await provider.getLesson('java', sectionSlug, moduleSlug, 'the-java-collections-decision-tree');
    expect(les?.title).toContain('Decision Tree');
    const concept = les?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('ArrayList');
    expect(concept?.content).toContain('ArrayDeque');
    expect(concept?.content).toContain('LinkedHashMap');
  });

  it('verifies Lesson 5 covers GenericRepository, dual-indexing, and Optional returns', async () => {
    const les = await provider.getLesson('java', sectionSlug, moduleSlug, 'practice-designing-a-generic-cache-and-repository');
    expect(les?.title).toContain('Generic Cache & Repository');
    const concept = les?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('GenericRepository');
    expect(concept?.content).toContain('Optional');
  });

  it('verifies Lesson 6 covers why new T[10] is banned, heap pollution, @SafeVarargs, and mutable map keys', async () => {
    const les = await provider.getLesson('java', sectionSlug, moduleSlug, 'debugging-and-placement-interview-gotchas-collections-and-generics');
    expect(les?.title).toContain('Debugging & Placement Interview Gotchas');
    const concept = les?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('new T[10]');
    expect(concept?.content).toContain('@SafeVarargs');
    expect(concept?.content).toContain('subList');
  });
});

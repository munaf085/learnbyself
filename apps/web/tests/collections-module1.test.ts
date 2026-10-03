import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java Collections - Module 1: Collections Framework & Lists', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);

  const sectionSlug = 'collections';
  const moduleSlug = 'collections-framework-and-lists';
  const expectedLessons = [
    'why-collections-and-arrays-vs-collections',
    'the-collection-hierarchy-and-root-interfaces',
    'the-list-contract-and-arraylist-internals',
    'linkedlist-doubly-linked-nodes-and-pointers',
    'arraylist-vs-linkedlist-performance-and-cpu-cache',
    'practice-list-operations-and-filtering',
    'debugging-and-bug-hunt-list-pitfalls'
  ];

  it('verifies Module 1 has exactly 7 lessons with matching order and slugs', async () => {
    const mod = await provider.getModule('java', sectionSlug, moduleSlug);
    expect(mod).not.toBeNull();
    expect(mod?.title).toBe('01. Collections Framework & Lists');
    expect(mod?.lessons.length).toBe(7);
    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedLessons);
  });

  it('verifies all 7 lessons load full content, 6 activity types, and practice problems', async () => {
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

  it('verifies Lesson 1 covers array limitations, resizing overhead, and JCF motivations', async () => {
    const les1 = await provider.getLesson('java', sectionSlug, moduleSlug, 'why-collections-and-arrays-vs-collections');
    expect(les1?.title).toBe('Why Collections? (Arrays vs Collections)');
    const concept = les1?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('The Core Limitation of Java Arrays');
    expect(concept?.content).toContain('The Heavy Burden of Manual Resizing');
    expect(concept?.content).toContain('System.arraycopy');
  });

  it('verifies Lesson 2 explains Iterable, Collection, and why Map does not extend Collection', async () => {
    const les2 = await provider.getLesson('java', sectionSlug, moduleSlug, 'the-collection-hierarchy-and-root-interfaces');
    expect(les2?.title).toBe('The Collection Hierarchy & Root Interfaces');
    const concept = les2?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('Why Doesn\'t `Map` Extend `Collection`?');
    expect(concept?.content).toContain('java.lang.Iterable');
    expect(concept?.content).toContain('Liskov Substitution Principle');
  });

  it('verifies Lesson 3 covers ArrayList 1.5x expansion formula and backing array', async () => {
    const les3 = await provider.getLesson('java', sectionSlug, moduleSlug, 'the-list-contract-and-arraylist-internals');
    expect(les3?.title).toBe('The List Contract & ArrayList Internals');
    const concept = les3?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('oldCapacity + (oldCapacity >> 1)');
    expect(concept?.content).toContain('DEFAULT_CAPACITY');
    expect(concept?.content).toContain('transient Object[] elementData');
  });

  it('verifies Lesson 4 covers LinkedList doubly-linked Node structure and Deque interface', async () => {
    const les4 = await provider.getLesson('java', sectionSlug, moduleSlug, 'linkedlist-doubly-linked-nodes-and-pointers');
    expect(les4?.title).toBe('LinkedList: Doubly-Linked Nodes & Pointers');
    const concept = les4?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('Node<E>');
    expect(concept?.content).toContain('prev');
    expect(concept?.content).toContain('next');
    expect(concept?.content).toContain('Deque');
  });

  it('verifies Lesson 5 covers CPU cache locality, cache lines, and hardware reality', async () => {
    const les5 = await provider.getLesson('java', sectionSlug, moduleSlug, 'arraylist-vs-linkedlist-performance-and-cpu-cache');
    expect(les5?.title).toBe('ArrayList vs LinkedList: Performance & CPU Caching');
    const concept = les5?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('Spatial Locality');
    expect(concept?.content).toContain('Cache Line');
    expect(concept?.content).toContain('Pointer Chasing');
  });

  it('verifies Lesson 6 covers removeIf, replaceAll, and subList views', async () => {
    const les6 = await provider.getLesson('java', sectionSlug, moduleSlug, 'practice-list-operations-and-filtering');
    expect(les6?.title).toBe('Practice: List Operations & Filtering');
    const concept = les6?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('removeIf');
    expect(concept?.content).toContain('replaceAll');
    expect(concept?.content).toContain('subList');
  });

  it('verifies Lesson 7 covers the 5 classic list pitfalls and bug hunts', async () => {
    const les7 = await provider.getLesson('java', sectionSlug, moduleSlug, 'debugging-and-bug-hunt-list-pitfalls');
    expect(les7?.title).toBe('Debugging & Bug Hunt: List Pitfalls');
    const concept = les7?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('ConcurrentModificationException');
    expect(concept?.content).toContain('remove(int index)');
    expect(concept?.content).toContain('Arrays.asList');
    expect(concept?.content).toContain('Memory Leak');
  });
});

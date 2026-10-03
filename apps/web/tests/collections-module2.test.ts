import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java Collections - Module 2: Sets & Uniqueness', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);

  const sectionSlug = 'collections';
  const moduleSlug = 'sets-and-uniqueness';
  const expectedLessons = [
    'the-set-contract-and-mathematical-uniqueness',
    'hashset-how-hash-buckets-guarantee-o1-lookups',
    'linkedhashset-predictable-insertion-order',
    'treeset-sorted-sets-and-red-black-trees',
    'the-critical-equals-and-hashcode-contract-in-sets',
    'set-operations-and-high-speed-deduplication',
    'practice-and-bug-hunt-set-pitfalls'
  ];

  it('verifies Module 2 has exactly 7 lessons with matching order and slugs', async () => {
    const mod = await provider.getModule('java', sectionSlug, moduleSlug);
    expect(mod).not.toBeNull();
    expect(mod?.title).toBe('02. Sets & Uniqueness');
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

  it('verifies Lesson 1 covers Set contract, uniqueness, duplicate rejection, and return false on add', async () => {
    const les1 = await provider.getLesson('java', sectionSlug, moduleSlug, 'the-set-contract-and-mathematical-uniqueness');
    expect(les1?.title).toBe('The Set Contract & Mathematical Uniqueness');
    const concept = les1?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('java.util.Set<E>');
    expect(concept?.content).toContain('Duplicate Rejection Mechanics');
    expect(concept?.content).toContain('contains');
  });

  it('verifies Lesson 2 covers HashSet internal HashMap, PRESENT dummy object, hash buckets, and O(1) lookups', async () => {
    const les2 = await provider.getLesson('java', sectionSlug, moduleSlug, 'hashset-how-hash-buckets-guarantee-o1-lookups');
    expect(les2?.title).toBe('HashSet: How Hash Buckets Guarantee O(1) Lookups');
    const concept = les2?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('PRESENT');
    expect(concept?.content).toContain('capacity');
    expect(concept?.content).toContain('Treeification');
  });

  it('verifies Lesson 3 covers LinkedHashSet doubly-linked list ordering, iteration predictability, and memory overhead', async () => {
    const les3 = await provider.getLesson('java', sectionSlug, moduleSlug, 'linkedhashset-predictable-insertion-order');
    expect(les3?.title).toBe('LinkedHashSet: Predictable Insertion-Order');
    const concept = les3?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('LinkedHashMap.Entry');
    expect(concept?.content).toContain('before, after');
    expect(concept?.content).toContain('FIFO');
  });

  it('verifies Lesson 4 covers TreeSet Red-Black tree mechanics, O(log N) operations, and NavigableSet methods', async () => {
    const les4 = await provider.getLesson('java', sectionSlug, moduleSlug, 'treeset-sorted-sets-and-red-black-trees');
    expect(les4?.title).toBe('TreeSet: Sorted Sets & Red-Black Trees');
    const concept = les4?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('Red-Black Tree');
    expect(concept?.content).toContain('ceiling');
    expect(concept?.content).toContain('floor');
    expect(concept?.content).toContain('NavigableSet');
  });

  it('verifies Lesson 5 covers equals() and hashCode() contract, vanishing elements, and mutable keys pitfall', async () => {
    const les5 = await provider.getLesson('java', sectionSlug, moduleSlug, 'the-critical-equals-and-hashcode-contract-in-sets');
    expect(les5?.title).toBe('The equals() and hashCode() Contract in Sets');
    const concept = les5?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('The Vanishing Element Disaster');
    expect(concept?.content).toContain('Bucket Recalculation Mismatch');
    expect(concept?.content).toContain('Immutable');
  });

  it('verifies Lesson 6 covers set operations addAll, retainAll, removeAll, and high-speed deduplication', async () => {
    const les6 = await provider.getLesson('java', sectionSlug, moduleSlug, 'set-operations-and-high-speed-deduplication');
    expect(les6?.title).toBe('Set Operations & High-Speed Deduplication');
    const concept = les6?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('addAll');
    expect(concept?.content).toContain('retainAll');
    expect(concept?.content).toContain('removeAll');
    expect(concept?.content).toContain('containsAll');
  });

  it('verifies Lesson 7 covers Set pitfalls, ClassCastException in TreeSet without Comparable, and null handling', async () => {
    const les7 = await provider.getLesson('java', sectionSlug, moduleSlug, 'practice-and-bug-hunt-set-pitfalls');
    expect(les7?.title).toBe('Practice & Bug Hunt: Set Pitfalls');
    const concept = les7?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('ClassCastException');
    expect(concept?.content).toContain('compareTo()');
    expect(concept?.content).toContain('Null Handling');
  });
});

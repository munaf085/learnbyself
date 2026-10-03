import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java Collections - Module 3: Maps & Key-Value Storage', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);

  const sectionSlug = 'collections';
  const moduleSlug = 'maps-and-key-value-storage';
  const expectedLessons = [
    'the-map-contract-associative-key-value-storage',
    'hashmap-architecture-buckets-collisions-and-treebins',
    'linkedhashmap-insertion-order-access-order-and-lru-caches',
    'treemap-sorted-maps-and-range-queries',
    'iterating-maps-cleanly-keyset-values-and-entryset',
    'practice-frequency-counters-and-grouping-with-maps',
    'debugging-and-bug-hunt-map-pitfalls'
  ];

  it('verifies Module 3 has exactly 7 lessons with matching order and slugs', async () => {
    const mod = await provider.getModule('java', sectionSlug, moduleSlug);
    expect(mod).not.toBeNull();
    expect(mod?.title).toBe('03. Maps & Key-Value Storage');
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

  it('verifies Lesson 1 explains why Map does not extend Collection and put() return contract', async () => {
    const les1 = await provider.getLesson('java', sectionSlug, moduleSlug, 'the-map-contract-associative-key-value-storage');
    expect(les1?.title).toBe('The Map Contract: Associative Key-Value Storage');
    const concept = les1?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('java.util.Map<K, V>');
    expect(concept?.content).toContain('Collection');
    expect(concept?.content).toContain('containsKey');
    expect(concept?.content).toContain('put');
  });

  it('verifies Lesson 2 covers HashMap capacity, load factor, bucket masking, and TreeBins', async () => {
    const les2 = await provider.getLesson('java', sectionSlug, moduleSlug, 'hashmap-architecture-buckets-collisions-and-treebins');
    expect(les2?.title).toBe('HashMap Architecture: Buckets, Collisions & TreeBins');
    const concept = les2?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('DEFAULT_INITIAL_CAPACITY');
    expect(concept?.content).toContain('TREEIFY_THRESHOLD');
    expect(concept?.content).toContain('MIN_TREEIFY_CAPACITY');
    expect(concept?.content).toContain('Bit-Split Rehashing');
  });

  it('verifies Lesson 3 covers access-order mode, removeEldestEntry, and LRU caches', async () => {
    const les3 = await provider.getLesson('java', sectionSlug, moduleSlug, 'linkedhashmap-insertion-order-access-order-and-lru-caches');
    expect(les3?.title).toBe('LinkedHashMap: Insertion/Access Order & LRU Caches');
    const concept = les3?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('accessOrder');
    expect(concept?.content).toContain('removeEldestEntry');
    expect(concept?.content).toContain('LRU');
  });

  it('verifies Lesson 4 covers TreeMap Red-Black tree mechanics, NavigableMap, and boundary queries', async () => {
    const les4 = await provider.getLesson('java', sectionSlug, moduleSlug, 'treemap-sorted-maps-and-range-queries');
    expect(les4?.title).toBe('TreeMap: Sorted Maps & Range Queries');
    const concept = les4?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('NavigableMap');
    expect(concept?.content).toContain('floorEntry');
    expect(concept?.content).toContain('subMap');
  });

  it('verifies Lesson 5 covers entrySet() efficiency, computeIfAbsent(), and merge()', async () => {
    const les5 = await provider.getLesson('java', sectionSlug, moduleSlug, 'iterating-maps-cleanly-keyset-values-and-entryset');
    expect(les5?.title).toBe('Iterating Maps: keySet, values & entrySet');
    const concept = les5?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('entrySet()');
    expect(concept?.content).toContain('computeIfAbsent');
    expect(concept?.content).toContain('merge');
  });

  it('verifies Lesson 6 covers frequency counters, multimap grouping, and anagram categorization', async () => {
    const les6 = await provider.getLesson('java', sectionSlug, moduleSlug, 'practice-frequency-counters-and-grouping-with-maps');
    expect(les6?.title).toBe('Practice: Frequency Counters & Grouping with Maps');
    const concept = les6?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('groupAnagrams');
    expect(concept?.content).toContain('computeIfAbsent');
    expect(concept?.content).toContain('merge');
  });

  it('verifies Lesson 7 covers the 4 classic Map traps including mutable keys and ConcurrentModificationException', async () => {
    const les7 = await provider.getLesson('java', sectionSlug, moduleSlug, 'debugging-and-bug-hunt-map-pitfalls');
    expect(les7?.title).toBe('Debugging & Bug Hunt: Map Pitfalls');
    const concept = les7?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('ConcurrentModificationException');
    expect(concept?.content).toContain('removeIf');
    expect(concept?.content).toContain('containsKey');
    expect(concept?.content).toContain('Mutable Key');
  });
});

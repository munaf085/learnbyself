import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java Collections - Module 4: Queues, Deques & Priority Queues', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);

  const sectionSlug = 'collections';
  const moduleSlug = 'queues-deques-and-priority-buffers';
  const expectedLessons = [
    'the-queue-contract-and-fifo-buffer-processing',
    'arraydeque-high-performance-resizable-array-queue',
    'the-deque-interface-double-ended-queues-and-stacks',
    'priorityqueue-min-heaps-and-priority-based-processing',
    'custom-priority-custom-comparators-with-priorityqueue',
    'practice-and-bug-hunt-queue-and-deque-real-world-challenges'
  ];

  it('verifies Module 4 has exactly 6 lessons with matching order and slugs', async () => {
    const mod = await provider.getModule('java', sectionSlug, moduleSlug);
    expect(mod).not.toBeNull();
    expect(mod?.title).toBe('04. Queues, Deques & Priority Queues');
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

  it('verifies Lesson 1 covers Queue FIFO contract, throwing vs special-value method pairs', async () => {
    const les1 = await provider.getLesson('java', sectionSlug, moduleSlug, 'the-queue-contract-and-fifo-buffer-processing');
    expect(les1?.title).toBe('The Queue Contract & FIFO Buffer Processing');
    const concept = les1?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('Queue');
    expect(concept?.content).toContain('offer');
    expect(concept?.content).toContain('poll');
    expect(concept?.content).toContain('peek');
  });

  it('verifies Lesson 2 covers ArrayDeque circular array mechanics, bitwise masking, and zero node allocation', async () => {
    const les2 = await provider.getLesson('java', sectionSlug, moduleSlug, 'arraydeque-high-performance-resizable-array-queue');
    expect(les2?.title).toBe('ArrayDeque: High-Performance Resizable Array Queue');
    const concept = les2?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('ArrayDeque');
    expect(concept?.content).toContain('circular array buffer');
    expect(concept?.content).toContain('head');
    expect(concept?.content).toContain('tail');
  });

  it('verifies Lesson 3 covers Deque double-ended contract, legacy Stack anti-patterns, and LIFO operations', async () => {
    const les3 = await provider.getLesson('java', sectionSlug, moduleSlug, 'the-deque-interface-double-ended-queues-and-stacks');
    expect(les3?.title).toBe('The Deque Interface: Double-Ended Queues & Stacks');
    const concept = les3?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('Deque');
    expect(concept?.content).toContain('java.util.Stack');
    expect(concept?.content).toContain('push');
    expect(concept?.content).toContain('pop');
  });

  it('verifies Lesson 4 covers PriorityQueue binary min-heap array indexing and O(log N) sift mechanics', async () => {
    const les4 = await provider.getLesson('java', sectionSlug, moduleSlug, 'priorityqueue-min-heaps-and-priority-based-processing');
    expect(les4?.title).toBe('PriorityQueue: Min-Heaps & Priority Processing');
    const concept = les4?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('PriorityQueue');
    expect(concept?.content).toContain('Min-Heap');
    expect(concept?.content).toContain('Sift-Up');
    expect(concept?.content).toContain('Sift-Down');
  });

  it('verifies Lesson 5 covers custom comparators, max-heaps, and multi-tier priority tie-breaking', async () => {
    const les5 = await provider.getLesson('java', sectionSlug, moduleSlug, 'custom-priority-custom-comparators-with-priorityqueue');
    expect(les5?.title).toBe('Custom Priority: PriorityQueue with Custom Comparators');
    const concept = les5?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('Comparator');
    expect(concept?.content).toContain('reverseOrder');
    expect(concept?.content).toContain('Overflow');
  });

  it('verifies Lesson 6 covers monotonic deque sliding window maximum and queue debugging challenges', async () => {
    const les6 = await provider.getLesson('java', sectionSlug, moduleSlug, 'practice-and-bug-hunt-queue-and-deque-real-world-challenges');
    expect(les6?.title).toBe('Practice & Bug Hunt: Queue & Deque Real-World Challenges');
    const concept = les6?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('Monotonic Deque');
    expect(concept?.content).toContain('sliding window');
    expect(concept?.content).toContain('NullPointerException');
  });
});

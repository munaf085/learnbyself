import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java Collections - Module 5: Generics & Type Safety', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);

  const sectionSlug = 'collections';
  const moduleSlug = 'generics-and-type-safety';
  const expectedLessons = [
    'why-generics-compile-time-safety-vs-classcastexception',
    'generic-classes-building-type-safe-containers',
    'generic-methods-and-method-level-type-inference',
    'bounded-type-parameters-enforcing-upper-bounds',
    'wildcards-the-unbounded-wildcard',
    'upper-bounded-wildcards-and-covariance',
    'lower-bounded-wildcards-and-contravariance',
    'the-pecs-principle-and-type-erasure-mechanics'
  ];

  it('verifies Module 5 has exactly 8 lessons with matching order and slugs', async () => {
    const mod = await provider.getModule('java', sectionSlug, moduleSlug);
    expect(mod).not.toBeNull();
    expect(mod?.title).toBe('05. Generics & Type Safety');
    expect(mod?.lessons.length).toBe(8);
    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedLessons);
  });

  it('verifies all 8 lessons load full content, 6 activity types, and 5 practice problems', async () => {
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

  it('verifies Lesson 1 covers raw types, ClassCastException runtime risk, and compile-time verification', async () => {
    const les1 = await provider.getLesson('java', sectionSlug, moduleSlug, 'why-generics-compile-time-safety-vs-classcastexception');
    expect(les1?.title).toBe('Why Generics? Safety vs ClassCastException');
    const concept = les1?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('Raw Types');
    expect(concept?.content).toContain('ClassCastException');
    expect(concept?.content).toContain('Parameterized Types');
  });

  it('verifies Lesson 2 covers generic classes, diamond operator, and static scope boundaries', async () => {
    const les2 = await provider.getLesson('java', sectionSlug, moduleSlug, 'generic-classes-building-type-safe-containers');
    expect(les2?.title).toBe('Generic Classes: Building Type-Safe Containers');
    const concept = les2?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('type parameter');
    expect(concept?.content).toContain('Static Context');
    expect(concept?.content).toContain('Pair');
  });

  it('verifies Lesson 3 covers generic methods, type inference, and explicit type witnesses', async () => {
    const les3 = await provider.getLesson('java', sectionSlug, moduleSlug, 'generic-methods-and-method-level-type-inference');
    expect(les3?.title).toBe('Generic Methods & Method-Level Type Inference');
    const concept = les3?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('Generic Method');
    expect(concept?.content).toContain('Type Inference');
    expect(concept?.content).toContain('Shadowing');
  });

  it('verifies Lesson 4 covers upper bounded type parameters and multiple bounds intersection syntax', async () => {
    const les4 = await provider.getLesson('java', sectionSlug, moduleSlug, 'bounded-type-parameters-enforcing-upper-bounds');
    expect(les4?.title).toBe('Bounded Type Parameters: Enforcing Upper Bounds');
    const concept = les4?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('Upper Bound');
    expect(concept?.content).toContain('Multiple Bounds');
    expect(concept?.content).toContain('extends');
  });

  it('verifies Lesson 5 covers invariance, array covariance defects, and unbounded wildcards', async () => {
    const les5 = await provider.getLesson('java', sectionSlug, moduleSlug, 'wildcards-the-unbounded-wildcard');
    expect(les5?.title).toBe('Wildcards: The Unbounded Wildcard (?)');
    const concept = les5?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('invariant');
    expect(concept?.content).toContain('ArrayStoreException');
    expect(concept?.content).toContain('Unbounded Wildcard');
  });

  it('verifies Lesson 6 covers upper bounded wildcards, covariance, and write prohibition', async () => {
    const les6 = await provider.getLesson('java', sectionSlug, moduleSlug, 'upper-bounded-wildcards-and-covariance');
    expect(les6?.title).toBe('Upper Bounded Wildcards (? extends T) & Covariance');
    const concept = les6?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('Covariance');
    expect(concept?.content).toContain('Prohibited');
    expect(concept?.content).toContain('Producer');
  });

  it('verifies Lesson 7 covers lower bounded wildcards, contravariance, and safe insertion', async () => {
    const les7 = await provider.getLesson('java', sectionSlug, moduleSlug, 'lower-bounded-wildcards-and-contravariance');
    expect(les7?.title).toBe('Lower Bounded Wildcards (? super T) & Contravariance');
    const concept = les7?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('Contravariance');
    expect(concept?.content).toContain('Consumer');
    expect(concept?.content).toContain('super');
  });

  it('verifies Lesson 8 covers the PECS rule, Collections.copy, and bytecode type erasure', async () => {
    const les8 = await provider.getLesson('java', sectionSlug, moduleSlug, 'the-pecs-principle-and-type-erasure-mechanics');
    expect(les8?.title).toBe('The PECS Principle & Type Erasure Mechanics');
    const concept = les8?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('PECS');
    expect(concept?.content).toContain('Collections.copy');
    expect(concept?.content).toContain('Type Erasure');
    expect(concept?.content).toContain('bridge methods');
  });
});

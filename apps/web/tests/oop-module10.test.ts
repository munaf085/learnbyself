import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java OOP - Module 10: References, Casting & Immutability', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);
  const moduleSlug = 'object-references-casting-and-immutability';

  const expectedLessons = [
    'reference-type-vs-actual-object-type',
    'instanceof-operator',
    'upcasting-revisited',
    'downcasting',
    'safe-type-checking',
    'field-hiding-vs-method-overriding',
    'immutable-objects',
    'how-to-design-an-immutable-class',
    'nested-classes-introduction',
    'oop-debugging-challenge'
  ];

  it('verifies Module 10 has exactly 10 lessons with matching slugs and order', async () => {
    const course = await provider.getCourse('java');
    const section = course?.sections.find(s => s.slug === 'oop');
    const mod = section?.modules.find(m => m.slug === moduleSlug);

    expect(mod).toBeDefined();
    expect(mod?.title).toBe('10. References, Casting & Immutability');
    expect(mod?.lessons.length).toBe(10);
    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedLessons);
  });

  it('verifies all 10 lessons load full interactive content, MCQs, and practice problems', async () => {
    for (const slug of expectedLessons) {
      const lesson = await provider.getLesson('java', 'oop', moduleSlug, slug);
      expect(lesson, `Lesson ${slug} must be resolved by provider`).not.toBeNull();
      expect(lesson?.title.length).toBeGreaterThan(3);
      expect(lesson?.summary.length).toBeGreaterThan(10);
      expect(lesson?.estimatedMinutes).toBeGreaterThanOrEqual(20);

      // Verify Activities
      const acts = lesson!.activities;
      expect(acts.some(a => a.type === 'analogy'), `${slug} must have an everyday analogy card`).toBe(true);
      expect(acts.some(a => a.type === 'concept'), `${slug} must have editorial concept section`).toBe(true);
      
      const codeWalkthroughs = acts.filter(a => a.type === 'code_walkthrough');
      expect(codeWalkthroughs.length, `${slug} must contain at least 2 runnable code walkthroughs`).toBeGreaterThanOrEqual(2);
      for (const cw of codeWalkthroughs) {
        expect(cw.codeSnippet, `${slug} walkthrough must define codeSnippet`).toBeDefined();
        expect((cw as any).code, `${slug} walkthrough must define code`).toBeDefined();
        expect(cw.codeSnippet.length).toBeGreaterThan(20);
      }

      // Verify MCQs
      const mcqAct = acts.find(a => a.type === 'mcq');
      expect(mcqAct, `${slug} must contain an MCQ quiz activity`).toBeDefined();
      expect(mcqAct?.questions.length, `${slug} must contain exactly 10 interactive MCQs`).toBe(10);
      for (const q of mcqAct!.questions) {
        expect(q.options.length).toBeGreaterThanOrEqual(4);
        expect(q.correctOptionIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctOptionIndex).toBeLessThan(q.options.length);
        expect(q.explanation.length).toBeGreaterThan(10);
      }

      // Verify Interview Q&A
      const interviewAct = acts.find(a => a.type === 'interview_qa');
      expect(interviewAct, `${slug} must have interview Q&A activity`).toBeDefined();
      expect(interviewAct?.interviewQA?.length, `${slug} must contain at least 6 company-tagged questions`).toBeGreaterThanOrEqual(6);
      for (const qa of interviewAct!.interviewQA!) {
        expect(qa.companyTag).toBeDefined();
        expect(qa.question.length).toBeGreaterThan(5);
        expect(qa.answer.length).toBeGreaterThan(15);
      }

      // Verify Self-Evaluation
      const checklistAct = acts.find(a => a.type === 'self_evaluation');
      expect(checklistAct, `${slug} must have a 10-point checklist`).toBeDefined();
      expect(checklistAct?.checklist.length).toBe(10);

      // Verify Practice Problems
      const problems = lesson!.practiceProblems || [];
      expect(problems.length, `${slug} must have at least 5 practice problems`).toBeGreaterThanOrEqual(5);

      // Problem 1 must have starter template
      expect(problems[0].initialCode, `${slug} P1 must have starter code`).toBeDefined();
      expect(problems[0].initialCode!.length).toBeGreaterThan(20);

      // Problem 2 must be from scratch (no starter code)
      expect(problems[1].initialCode, `${slug} P2 must NOT spoonfeed starter code`).toBeUndefined();

      // Problem 3 must be from scratch (no starter code)
      expect(problems[2].initialCode, `${slug} P3 must NOT spoonfeed starter code`).toBeUndefined();

      // Problem 4 must have buggy initialCode for bug hunting
      expect(problems[3].initialCode, `${slug} P4 must have buggy code to fix`).toBeDefined();

      // Problem 5 must be from scratch (no starter code)
      expect(problems[4].initialCode, `${slug} P5 must NOT spoonfeed starter code`).toBeUndefined();

      for (const prob of problems) {
        expect(prob.title.length).toBeGreaterThan(3);
        expect(prob.problemStatement.length).toBeGreaterThan(10);
        expect(prob.solutionCode.length).toBeGreaterThan(20);
        expect(prob.expectedOutput.length).toBeGreaterThan(1);
        expect(prob.hints?.length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it('verifies Lesson 1 teaches reference types vs actual object types', async () => {
    const les1 = await provider.getLesson('java', 'oop', moduleSlug, 'reference-type-vs-actual-object-type');
    const conceptAct = les1?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Reference Type');
    expect(conceptAct?.content).toContain('Actual Object');
  });

  it('verifies Lesson 2 teaches instanceof operator and pattern matching', async () => {
    const les2 = await provider.getLesson('java', 'oop', moduleSlug, 'instanceof-operator');
    const conceptAct = les2?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('instanceof');
  });

  it('verifies Lesson 3 teaches upcasting mechanics and widening', async () => {
    const les3 = await provider.getLesson('java', 'oop', moduleSlug, 'upcasting-revisited');
    const conceptAct = les3?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Upcasting');
  });

  it('verifies Lesson 4 teaches downcasting and ClassCastException prevention', async () => {
    const les4 = await provider.getLesson('java', 'oop', moduleSlug, 'downcasting');
    const conceptAct = les4?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Downcasting');
    expect(conceptAct?.content).toContain('ClassCastException');
  });

  it('verifies Lesson 5 teaches safe type checking and pattern matching', async () => {
    const les5 = await provider.getLesson('java', 'oop', moduleSlug, 'safe-type-checking');
    const conceptAct = les5?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('instanceof');
  });

  it('verifies Lesson 6 teaches field hiding vs method overriding', async () => {
    const les6 = await provider.getLesson('java', 'oop', moduleSlug, 'field-hiding-vs-method-overriding');
    const conceptAct = les6?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Hiding');
    expect(conceptAct?.content).toContain('override');
  });

  it('verifies Lesson 7 teaches immutable objects and thread safety', async () => {
    const les7 = await provider.getLesson('java', 'oop', moduleSlug, 'immutable-objects');
    const conceptAct = les7?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Immutable');
  });

  it('verifies Lesson 8 teaches how to design an immutable class', async () => {
    const les8 = await provider.getLesson('java', 'oop', moduleSlug, 'how-to-design-an-immutable-class');
    const conceptAct = les8?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('final');
  });

  it('verifies Lesson 9 teaches nested classes (static nested vs inner)', async () => {
    const les9 = await provider.getLesson('java', 'oop', moduleSlug, 'nested-classes-introduction');
    const conceptAct = les9?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Nested');
  });

  it('verifies Lesson 10 OOP Debugging Challenge has 10-point checklist and full diagnostic problems', async () => {
    const les10 = await provider.getLesson('java', 'oop', moduleSlug, 'oop-debugging-challenge');
    expect(les10?.title).toContain('OOP Debugging Challenge');
    const checklistAct = les10?.activities.find(a => a.type === 'self_evaluation');
    expect(checklistAct?.checklist.length).toBe(10);
    expect(les10?.practiceProblems?.length).toBe(5);
  });
});

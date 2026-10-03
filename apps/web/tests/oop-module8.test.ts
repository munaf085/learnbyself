import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java OOP - Module 8: Composition & Relationships', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);
  const moduleSlug = 'composition-and-relationships';

  const expectedLessons = [
    'has-a-vs-is-a',
    'objects-inside-objects',
    'association',
    'aggregation',
    'composition',
    'composition-vs-inheritance',
    'object-collaboration',
    'delegation',
    'designing-real-world-relationships',
    'library-management-project'
  ];

  it('verifies Module 8 has exactly 10 lessons with matching slugs and order', async () => {
    const course = await provider.getCourse('java');
    const section = course?.sections.find(s => s.slug === 'oop');
    const mod = section?.modules.find(m => m.slug === moduleSlug);

    expect(mod).toBeDefined();
    expect(mod?.title).toBe('08. Composition & Relationships');
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

  it('verifies Lesson 1 teaches Has-A vs Is-A decision boundaries', async () => {
    const les1 = await provider.getLesson('java', 'oop', moduleSlug, 'has-a-vs-is-a');
    const conceptAct = les1?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Is-A');
    expect(conceptAct?.content).toContain('Has-A');
    expect(conceptAct?.content).toContain('Inheritance');
    expect(conceptAct?.content).toContain('Composition');
  });

  it('verifies Lesson 2 teaches objects inside objects and reference storage', async () => {
    const les2 = await provider.getLesson('java', 'oop', moduleSlug, 'objects-inside-objects');
    const conceptAct = les2?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Reference');
    expect(conceptAct?.content).toContain('Heap');
  });

  it('verifies Lesson 3 teaches association with independent lifecycles', async () => {
    const les3 = await provider.getLesson('java', 'oop', moduleSlug, 'association');
    const conceptAct = les3?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Association');
    expect(conceptAct?.content).toContain('lifecycle');
  });

  it('verifies Lesson 4 teaches aggregation and loose coupling', async () => {
    const les4 = await provider.getLesson('java', 'oop', moduleSlug, 'aggregation');
    const conceptAct = les4?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Aggregation');
    expect(conceptAct?.content).toContain('weak Has-A');
  });

  it('verifies Lesson 5 teaches composition and cascading lifecycle ownership', async () => {
    const les5 = await provider.getLesson('java', 'oop', moduleSlug, 'composition');
    const conceptAct = les5?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Composition');
    expect(conceptAct?.content).toContain('whole-part');
  });

  it('verifies Lesson 6 teaches composition vs inheritance trade-offs', async () => {
    const les6 = await provider.getLesson('java', 'oop', moduleSlug, 'composition-vs-inheritance');
    const conceptAct = les6?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Fragile Base Class');
    expect(conceptAct?.content).toContain('Composition');
  });

  it('verifies Lesson 7 teaches object collaboration and orchestrators', async () => {
    const les7 = await provider.getLesson('java', 'oop', moduleSlug, 'object-collaboration');
    const conceptAct = les7?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Collaboration');
    expect(conceptAct?.content).toContain('Orchestrator');
  });

  it('verifies Lesson 8 teaches delegation pattern and helper objects', async () => {
    const les8 = await provider.getLesson('java', 'oop', moduleSlug, 'delegation');
    const conceptAct = les8?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Delegation');
    expect(conceptAct?.content).toContain('delegate');
  });

  it('verifies Lesson 9 teaches designing real-world relationships decision tree', async () => {
    const les9 = await provider.getLesson('java', 'oop', moduleSlug, 'designing-real-world-relationships');
    const conceptAct = les9?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Decision Tree');
    expect(conceptAct?.content).toContain('Composition');
    expect(conceptAct?.content).toContain('Aggregation');
  });

  it('verifies Lesson 10 Library Management Capstone project has 10-point checklist and full operations', async () => {
    const les10 = await provider.getLesson('java', 'oop', moduleSlug, 'library-management-project');
    expect(les10?.title).toContain('Library Management');
    const checklistAct = les10?.activities.find(a => a.type === 'self_evaluation');
    expect(checklistAct?.checklist.length).toBe(10);
    expect(checklistAct?.checklist[0]).toContain('Book');
    expect(les10?.practiceProblems?.length).toBe(5);
  });
});

import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java OOP - Module 6: Polymorphism & Overriding', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);
  const moduleSlug = 'polymorphism-and-overriding';

  const expectedLessons = [
    'what-is-polymorphism',
    'method-overriding',
    'the-override-annotation',
    'overloading-vs-overriding',
    'parent-reference-child-object',
    'upcasting',
    'dynamic-method-dispatch',
    'runtime-polymorphism',
    'super-with-overridden-methods',
    'payment-system-project'
  ];

  it('verifies Module 6 has exactly 10 lessons with matching slugs and order', async () => {
    const course = await provider.getCourse('java');
    const section = course?.sections.find(s => s.slug === 'oop');
    const mod = section?.modules.find(m => m.slug === moduleSlug);

    expect(mod).toBeDefined();
    expect(mod?.title).toBe('06. Polymorphism & Overriding');
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

      // Problem 4 must have buggy initialCode for bug hunting
      expect(problems[3].initialCode, `${slug} P4 must have buggy code to fix`).toBeDefined();

      for (const prob of problems) {
        expect(prob.title.length).toBeGreaterThan(3);
        expect(prob.problemStatement.length).toBeGreaterThan(10);
        expect(prob.solutionCode.length).toBeGreaterThan(20);
        expect(prob.expectedOutput.length).toBeGreaterThan(1);
        expect(prob.hints?.length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it('verifies Lesson 1 teaches static vs dynamic polymorphism', async () => {
    const les1 = await provider.getLesson('java', 'oop', moduleSlug, 'what-is-polymorphism');
    const conceptAct = les1?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Compile-Time');
    expect(conceptAct?.content).toContain('Runtime');
    expect(conceptAct?.content).toContain('Overloading');
    expect(conceptAct?.content).toContain('Overriding');
  });

  it('verifies Lesson 2 teaches method overriding rules and restrictions', async () => {
    const les2 = await provider.getLesson('java', 'oop', moduleSlug, 'method-overriding');
    const conceptAct = les2?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Signature');
    expect(conceptAct?.content).toContain('Return Type');
    expect(conceptAct?.content).toContain('Access Modifier');
    expect(conceptAct?.content).toContain('private');
    expect(conceptAct?.content).toContain('static');
  });

  it('verifies Lesson 3 teaches the @Override annotation and compile-time safety', async () => {
    const les3 = await provider.getLesson('java', 'oop', moduleSlug, 'the-override-annotation');
    const conceptAct = les3?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('@Override');
    expect(conceptAct?.content).toContain('compiler');
  });

  it('verifies Lesson 4 teaches overloading vs overriding distinctions', async () => {
    const les4 = await provider.getLesson('java', 'oop', moduleSlug, 'overloading-vs-overriding');
    const conceptAct = les4?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Overloading');
    expect(conceptAct?.content).toContain('Overriding');
  });

  it('verifies Lesson 5 teaches parent reference child object and member accessibility', async () => {
    const les5 = await provider.getLesson('java', 'oop', moduleSlug, 'parent-reference-child-object');
    const conceptAct = les5?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Reference Type');
    expect(conceptAct?.content).toContain('Object Type');
  });

  it('verifies Lesson 6 teaches upcasting mechanics and safety', async () => {
    const les6 = await provider.getLesson('java', 'oop', moduleSlug, 'upcasting');
    const conceptAct = les6?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Upcasting');
    expect(conceptAct?.content?.toLowerCase()).toContain('downcasting');
    expect(conceptAct?.content).toContain('ClassCastException');
  });

  it('verifies Lesson 7 teaches dynamic method dispatch and vtable execution', async () => {
    const les7 = await provider.getLesson('java', 'oop', moduleSlug, 'dynamic-method-dispatch');
    const conceptAct = les7?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('v-table');
    expect(conceptAct?.content).toContain('invokevirtual');
  });

  it('verifies Lesson 8 teaches runtime polymorphism and Open-Closed Principle', async () => {
    const les8 = await provider.getLesson('java', 'oop', moduleSlug, 'runtime-polymorphism');
    const conceptAct = les8?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Open-Closed');
    expect(conceptAct?.content).toContain('instanceof');
  });

  it('verifies Lesson 9 teaches super with overridden methods and augmentation', async () => {
    const les9 = await provider.getLesson('java', 'oop', moduleSlug, 'super-with-overridden-methods');
    const conceptAct = les9?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('super.');
    expect(conceptAct?.content).toContain('Augmentation');
    expect(conceptAct?.content).toContain('StackOverflowError');
  });

  it('verifies Lesson 10 Payment System Capstone project has 10-point checklist and full operations', async () => {
    const les10 = await provider.getLesson('java', 'oop', moduleSlug, 'payment-system-project');
    expect(les10?.title).toContain('Payment System');
    const checklistAct = les10?.activities.find(a => a.type === 'self_evaluation');
    expect(checklistAct?.checklist.length).toBe(10);
    expect(checklistAct?.checklist[0]).toContain('Payment');
    expect(les10?.practiceProblems?.length).toBe(5);
  });
});

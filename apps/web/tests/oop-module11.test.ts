import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java OOP - Module 11: OOP Mastery & Final Build', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);
  const moduleSlug = 'oop-mastery-and-code-tracing';

  const expectedLessons = [
    'reading-an-unfamiliar-oop-program',
    'tracing-object-creation-and-constructors',
    'tracing-inheritance-and-polymorphism',
    'finding-oop-design-problems',
    'fixing-broken-oop-code',
    'designing-classes-from-requirements',
    'choosing-inheritance-vs-composition',
    'building-a-multi-class-application',
    'employee-management-payroll-capstone'
  ];

  it('verifies Module 11 has exactly 9 lessons with matching slugs and order', async () => {
    const course = await provider.getCourse('java');
    const section = course?.sections.find(s => s.slug === 'oop');
    const mod = section?.modules.find(m => m.slug === moduleSlug);

    expect(mod).toBeDefined();
    expect(mod?.title).toBe('11. OOP Mastery & Final Build');
    expect(mod?.lessons.length).toBe(9);
    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedLessons);
  });

  it('verifies all 9 lessons load full interactive content, MCQs, and practice problems', async () => {
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

  it('verifies Lesson 1 teaches reading unfamiliar codebases top-down', async () => {
    const les1 = await provider.getLesson('java', 'oop', moduleSlug, 'reading-an-unfamiliar-oop-program');
    const conceptAct = les1?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Framework');
  });

  it('verifies Lesson 2 teaches 5-phase JVM object instantiation', async () => {
    const les2 = await provider.getLesson('java', 'oop', moduleSlug, 'tracing-object-creation-and-constructors');
    const conceptAct = les2?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Phase');
    expect(conceptAct?.content).toContain('Constructor');
  });

  it('verifies Lesson 3 teaches dynamic dispatch and super calls across hierarchies', async () => {
    const les3 = await provider.getLesson('java', 'oop', moduleSlug, 'tracing-inheritance-and-polymorphism');
    const conceptAct = les3?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Dynamic');
    expect(conceptAct?.content).toContain('Dispatch');
  });

  it('verifies Lesson 4 teaches finding OOP design smells', async () => {
    const les4 = await provider.getLesson('java', 'oop', moduleSlug, 'finding-oop-design-problems');
    const conceptAct = les4?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('God Class');
    expect(conceptAct?.content).toContain('Encapsulation');
  });

  it('verifies Lesson 5 teaches fixing broken OOP code and refactoring conditionals', async () => {
    const les5 = await provider.getLesson('java', 'oop', moduleSlug, 'fixing-broken-oop-code');
    const conceptAct = les5?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Refactoring');
    expect(conceptAct?.content).toContain('Polymorphic');
  });

  it('verifies Lesson 6 teaches designing classes from business requirements', async () => {
    const les6 = await provider.getLesson('java', 'oop', moduleSlug, 'designing-classes-from-requirements');
    const conceptAct = les6?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Entities');
    expect(conceptAct?.content).toContain('Value Object');
  });

  it('verifies Lesson 7 teaches choosing inheritance vs composition', async () => {
    const les7 = await provider.getLesson('java', 'oop', moduleSlug, 'choosing-inheritance-vs-composition');
    const conceptAct = les7?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('composition');
    expect(conceptAct?.content).toContain('inheritance');
  });

  it('verifies Lesson 8 teaches building layered multi-class applications', async () => {
    const les8 = await provider.getLesson('java', 'oop', moduleSlug, 'building-a-multi-class-application');
    const conceptAct = les8?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Architecture');
    expect(conceptAct?.content).toContain('Layer');
  });

  it('verifies Lesson 9 Capstone Employee Management & Payroll System is marked final/project with full operations', async () => {
    const les9 = await provider.getLesson('java', 'oop', moduleSlug, 'employee-management-payroll-capstone');
    expect(les9?.title).toContain('Employee Management & Payroll System');
    const checklistAct = les9?.activities.find(a => a.type === 'self_evaluation');
    expect(checklistAct?.checklist.length).toBe(10);
    expect(les9?.practiceProblems?.length).toBe(5);
  });
});

import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java OOP - Module 9: Object Class, Equality & Identity', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);
  const moduleSlug = 'object-class-and-equality';

  const expectedLessons = [
    'the-object-class',
    'to-string-method',
    'double-equals-and-references',
    'equals-method',
    'identity-vs-logical-equality',
    'hashcode-method',
    'equals-hashcode-contract',
    'common-equality-bugs',
    'product-customer-project'
  ];

  it('verifies Module 9 has exactly 9 lessons with matching slugs and order', async () => {
    const course = await provider.getCourse('java');
    const section = course?.sections.find(s => s.slug === 'oop');
    const mod = section?.modules.find(m => m.slug === moduleSlug);

    expect(mod).toBeDefined();
    expect(mod?.title).toBe('09. Object Class, Equality & Identity');
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

  it('verifies Lesson 1 teaches Object class hierarchy and methods', async () => {
    const les1 = await provider.getLesson('java', 'oop', moduleSlug, 'the-object-class');
    const conceptAct = les1?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Object');
    expect(conceptAct?.content).toContain('Universal Class Hierarchy');
  });

  it('verifies Lesson 2 teaches toString() method and overrides', async () => {
    const les2 = await provider.getLesson('java', 'oop', moduleSlug, 'to-string-method');
    const conceptAct = les2?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('toString()');
    expect(conceptAct?.content).toContain('System.out.println');
  });

  it('verifies Lesson 3 teaches == and reference equality', async () => {
    const les3 = await provider.getLesson('java', 'oop', moduleSlug, 'double-equals-and-references');
    const conceptAct = les3?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('==');
    expect(conceptAct?.content).toContain('Reference');
  });

  it('verifies Lesson 4 teaches equals() contract and 5 equivalence axioms', async () => {
    const les4 = await provider.getLesson('java', 'oop', moduleSlug, 'equals-method');
    const conceptAct = les4?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('equals');
    expect(conceptAct?.content).toContain('Reflexive');
    expect(conceptAct?.content).toContain('Symmetric');
  });

  it('verifies Lesson 5 teaches identity vs logical equality', async () => {
    const les5 = await provider.getLesson('java', 'oop', moduleSlug, 'identity-vs-logical-equality');
    const conceptAct = les5?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('equals()');
    expect(conceptAct?.content).toContain('Value Object');
  });

  it('verifies Lesson 6 teaches hashCode() and hashing distributions', async () => {
    const les6 = await provider.getLesson('java', 'oop', moduleSlug, 'hashcode-method');
    const conceptAct = les6?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('hashCode');
    expect(conceptAct?.content).toContain('hash');
  });

  it('verifies Lesson 7 teaches equals() and hashCode() contract', async () => {
    const les7 = await provider.getLesson('java', 'oop', moduleSlug, 'equals-hashcode-contract');
    const conceptAct = les7?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Contract');
    expect(conceptAct?.content).toContain('Golden Rule');
  });

  it('verifies Lesson 8 teaches common equality bugs and getClass vs instanceof', async () => {
    const les8 = await provider.getLesson('java', 'oop', moduleSlug, 'common-equality-bugs');
    const conceptAct = les8?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('getClass()');
    expect(conceptAct?.content).toContain('instanceof');
  });

  it('verifies Lesson 9 Product & Customer Capstone project has 10-point checklist and full operations', async () => {
    const les9 = await provider.getLesson('java', 'oop', moduleSlug, 'product-customer-project');
    expect(les9?.title).toContain('Product & Customer');
    const checklistAct = les9?.activities.find(a => a.type === 'self_evaluation');
    expect(checklistAct?.checklist.length).toBe(10);
    expect(checklistAct?.checklist[0]).toContain('equals()');
    expect(les9?.practiceProblems?.length).toBe(5);
  });
});

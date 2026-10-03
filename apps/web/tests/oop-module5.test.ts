import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java OOP - Module 5: Inheritance', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);
  const moduleSlug = 'inheritance';

  const expectedLessons = [
    'why-inheritance',
    'parent-and-child-classes',
    'the-extends-keyword',
    'single-inheritance',
    'multilevel-inheritance',
    'hierarchical-inheritance',
    'why-no-multiple-class-inheritance',
    'multiple-inheritance-through-interfaces',
    'the-super-keyword',
    'constructor-execution-in-inheritance',
    'employee-role-hierarchy-project'
  ];

  it('verifies Module 5 has exactly 11 lessons with matching slugs and order', async () => {
    const course = await provider.getCourse('java');
    const section = course?.sections.find(s => s.slug === 'oop');
    const mod = section?.modules.find(m => m.slug === moduleSlug);

    expect(mod).toBeDefined();
    expect(mod?.title).toBe('05. Inheritance');
    expect(mod?.lessons.length).toBe(11);
    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedLessons);
  });

  it('verifies all 11 lessons load full interactive content, MCQs, and practice problems', async () => {
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
        expect(prob.expectedOutput.length).toBeGreaterThan(3);
        expect(prob.hints?.length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it('verifies Lesson 1 teaches why inheritance exists and DRY code reuse', async () => {
    const les1 = await provider.getLesson('java', 'oop', moduleSlug, 'why-inheritance');
    const conceptAct = les1?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('DRY');
    expect(conceptAct?.content).toContain('duplication');
  });

  it('verifies Lesson 2 teaches parent and child taxonomy and the IS-A test', async () => {
    const les2 = await provider.getLesson('java', 'oop', moduleSlug, 'parent-and-child-classes');
    const conceptAct = les2?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Superclass');
    expect(conceptAct?.content).toContain('Subclass');
    expect(conceptAct?.content).toContain('IS-A');
    expect(conceptAct?.content).toContain('java.lang.Object');
  });

  it('verifies Lesson 3 teaches the extends keyword and member accessibility rules', async () => {
    const les3 = await provider.getLesson('java', 'oop', moduleSlug, 'the-extends-keyword');
    const conceptAct = les3?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('extends');
    expect(conceptAct?.content).toContain('protected');
    expect(conceptAct?.content).toContain('private');
  });

  it('verifies Lesson 4 teaches single inheritance and linear dispatch', async () => {
    const les4 = await provider.getLesson('java', 'oop', moduleSlug, 'single-inheritance');
    const conceptAct = les4?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Single Inheritance');
    expect(conceptAct?.content).toContain('one direct superclass');
  });

  it('verifies Lesson 5 teaches multilevel inheritance and transitivity', async () => {
    const les5 = await provider.getLesson('java', 'oop', moduleSlug, 'multilevel-inheritance');
    const conceptAct = les5?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Multilevel');
    expect(conceptAct?.content).toContain('Grandparent');
  });

  it('verifies Lesson 6 teaches hierarchical inheritance and sibling isolation', async () => {
    const les6 = await provider.getLesson('java', 'oop', moduleSlug, 'hierarchical-inheritance');
    const conceptAct = les6?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Hierarchical');
    expect(conceptAct?.content?.toLowerCase()).toContain('isolation');
  });

  it('verifies Lesson 7 teaches why Java omits multiple class inheritance (Diamond Problem)', async () => {
    const les7 = await provider.getLesson('java', 'oop', moduleSlug, 'why-no-multiple-class-inheritance');
    const conceptAct = les7?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Diamond Problem');
  });

  it('verifies Lesson 8 teaches multiple inheritance through interfaces safely', async () => {
    const les8 = await provider.getLesson('java', 'oop', moduleSlug, 'multiple-inheritance-through-interfaces');
    const conceptAct = les8?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('interface');
    expect(conceptAct?.content).toContain('implements');
  });

  it('verifies Lesson 9 teaches the 3 uses of the super keyword', async () => {
    const les9 = await provider.getLesson('java', 'oop', moduleSlug, 'the-super-keyword');
    const conceptAct = les9?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('super(');
    expect(conceptAct?.content).toContain('super.');
    expect(conceptAct?.content?.toLowerCase()).toContain('first statement');
  });

  it('verifies Lesson 10 teaches constructor execution order from Object downward', async () => {
    const les10 = await provider.getLesson('java', 'oop', moduleSlug, 'constructor-execution-in-inheritance');
    const conceptAct = les10?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Constructor');
    expect(conceptAct?.content?.toLowerCase()).toContain('implicit');
    expect(conceptAct?.content).toContain('Object');
  });

  it('verifies Lesson 11 guided Employee Role Hierarchy project has 10-point checklist and full operations', async () => {
    const les11 = await provider.getLesson('java', 'oop', moduleSlug, 'employee-role-hierarchy-project');
    expect(les11?.title).toContain('Employee Role Hierarchy');
    const checklistAct = les11?.activities.find(a => a.type === 'self_evaluation');
    expect(checklistAct?.checklist.length).toBe(10);
    expect(checklistAct?.checklist[0]).toContain('Employee');
    expect(les11?.practiceProblems?.length).toBe(5);
  });
});

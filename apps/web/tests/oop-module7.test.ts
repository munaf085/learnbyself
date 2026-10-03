import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java OOP - Module 7: Abstraction & Interfaces', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);
  const moduleSlug = 'abstraction-and-interfaces';

  const expectedLessons = [
    'why-abstraction',
    'abstract-classes',
    'abstract-methods',
    'abstract-class-constructors',
    'concrete-methods-in-abstract-classes',
    'interfaces',
    'implementing-interfaces',
    'multiple-interfaces',
    'default-and-static-interface-methods',
    'abstract-class-vs-interface',
    'functional-interface-introduction',
    'notification-system-project'
  ];

  it('verifies Module 7 has exactly 12 lessons with matching slugs and order', async () => {
    const course = await provider.getCourse('java');
    const section = course?.sections.find(s => s.slug === 'oop');
    const mod = section?.modules.find(m => m.slug === moduleSlug);

    expect(mod).toBeDefined();
    expect(mod?.title).toBe('07. Abstraction & Interfaces');
    expect(mod?.lessons.length).toBe(12);
    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedLessons);
  });

  it('verifies all 12 lessons load full interactive content, MCQs, and practice problems', async () => {
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

  it('verifies Lesson 1 teaches abstraction fundamentals vs encapsulation', async () => {
    const les1 = await provider.getLesson('java', 'oop', moduleSlug, 'why-abstraction');
    const conceptAct = les1?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Abstraction');
    expect(conceptAct?.content).toContain('Encapsulation');
    expect(conceptAct?.content).toContain('WHAT');
    expect(conceptAct?.content).toContain('HOW');
  });

  it('verifies Lesson 2 teaches abstract classes and instantiation restrictions', async () => {
    const les2 = await provider.getLesson('java', 'oop', moduleSlug, 'abstract-classes');
    const conceptAct = les2?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('abstract class');
    expect(conceptAct?.content).toContain('cannot be instantiated');
  });

  it('verifies Lesson 3 teaches abstract methods syntax and forbidden modifiers', async () => {
    const les3 = await provider.getLesson('java', 'oop', moduleSlug, 'abstract-methods');
    const conceptAct = les3?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('abstract method');
    expect(conceptAct?.content).toContain('semicolon');
    expect(conceptAct?.content).toContain('private abstract');
  });

  it('verifies Lesson 4 teaches abstract class constructors and chaining', async () => {
    const les4 = await provider.getLesson('java', 'oop', moduleSlug, 'abstract-class-constructors');
    const conceptAct = les4?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('constructor');
    expect(conceptAct?.content).toContain('super(');
  });

  it('verifies Lesson 5 teaches partial abstraction and the Template Method pattern', async () => {
    const les5 = await provider.getLesson('java', 'oop', moduleSlug, 'concrete-methods-in-abstract-classes');
    const conceptAct = les5?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Template Method');
    expect(conceptAct?.content).toContain('final');
  });

  it('verifies Lesson 6 teaches interfaces and compiler implicits', async () => {
    const les6 = await provider.getLesson('java', 'oop', moduleSlug, 'interfaces');
    const conceptAct = les6?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('interface');
    expect(conceptAct?.content).toContain('public static final');
    expect(conceptAct?.content).toContain('public abstract');
  });

  it('verifies Lesson 7 teaches implementing interfaces and visibility rules', async () => {
    const les7 = await provider.getLesson('java', 'oop', moduleSlug, 'implementing-interfaces');
    const conceptAct = les7?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('implements');
    expect(conceptAct?.content).toContain('public');
  });

  it('verifies Lesson 8 teaches multiple interfaces and collision resolution', async () => {
    const les8 = await provider.getLesson('java', 'oop', moduleSlug, 'multiple-interfaces');
    const conceptAct = les8?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Multiple Interfaces');
    expect(conceptAct?.content).toContain('Diamond Problem');
  });

  it('verifies Lesson 9 teaches default and static interface methods', async () => {
    const les9 = await provider.getLesson('java', 'oop', moduleSlug, 'default-and-static-interface-methods');
    const conceptAct = les9?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('default');
    expect(conceptAct?.content).toContain('static');
    expect(conceptAct?.content).toContain('Java 8');
  });

  it('verifies Lesson 10 teaches abstract class vs interface comparison matrix', async () => {
    const les10 = await provider.getLesson('java', 'oop', moduleSlug, 'abstract-class-vs-interface');
    const conceptAct = les10?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Abstract Class');
    expect(conceptAct?.content).toContain('Interface');
    expect(conceptAct?.content).toContain('IS-A');
    expect(conceptAct?.content).toContain('CAN-DO');
  });

  it('verifies Lesson 11 teaches functional interfaces and the SAM rule', async () => {
    const les11 = await provider.getLesson('java', 'oop', moduleSlug, 'functional-interface-introduction');
    const conceptAct = les11?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Functional Interface');
    expect(conceptAct?.content).toContain('Single Abstract Method');
    expect(conceptAct?.content).toContain('@FunctionalInterface');
  });

  it('verifies Lesson 12 Notification System Capstone project has 10-point checklist and full operations', async () => {
    const les12 = await provider.getLesson('java', 'oop', moduleSlug, 'notification-system-project');
    expect(les12?.title).toContain('Notification System');
    const checklistAct = les12?.activities.find(a => a.type === 'self_evaluation');
    expect(checklistAct?.checklist.length).toBe(10);
    expect(checklistAct?.checklist[0]).toContain('Notification');
    expect(les12?.practiceProblems?.length).toBe(5);
  });
});

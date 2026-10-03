import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java OOP - Module 2: Constructors & Initialization', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);

  const moduleSlug = 'constructors-and-initialization';
  const expectedLessons = [
    'what-is-a-constructor',
    'default-constructors',
    'parameterized-constructors',
    'constructor-overloading',
    'the-this-keyword',
    'constructor-chaining-with-this',
    'constructor-vs-method',
    'bank-account-project'
  ];

  it('verifies Module 2 has exactly 8 lessons with matching slugs and order', async () => {
    const mod = await provider.getModule('java', 'oop', moduleSlug);
    expect(mod).not.toBeNull();
    expect(mod?.title).toBe('02. Constructors & Initialization');
    expect(mod?.lessons.length).toBe(8);
    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedLessons);
  });

  it('verifies all 8 lessons load full interactive content, MCQs, and practice problems', async () => {
    for (const slug of expectedLessons) {
      const lesson = await provider.getLesson('java', 'oop', moduleSlug, slug);
      expect(lesson, `Lesson ${slug} should load successfully`).not.toBeNull();
      expect(lesson?.activities.length).toBeGreaterThanOrEqual(5);

      const types = lesson?.activities.map(a => a.type);
      expect(types).toContain('analogy');
      expect(types).toContain('concept');
      expect(types).toContain('code_walkthrough');
      expect(types).toContain('mcq');
      expect(types).toContain('interview_qa');
      expect(types).toContain('self_evaluation');

      // Verify MCQs (exactly 10 high-quality questions per lesson)
      const mcqActivity = lesson?.activities.find(a => a.type === 'mcq');
      const questions = mcqActivity?.mcq?.questions;
      expect(questions, `${slug} must have MCQs`).toBeDefined();
      expect(questions?.length).toBe(10);
      for (const q of questions!) {
        expect(q.prompt.length).toBeGreaterThan(10);
        expect(q.options.length).toBeGreaterThanOrEqual(2);
        expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(q.correctAnswer).toBeLessThan(q.options.length);
        expect(q.explanation.length).toBeGreaterThan(10);
      }

      // Verify Interview Questions
      expect(lesson?.interviewQuestions).toBeDefined();
      expect(lesson?.interviewQuestions!.length).toBeGreaterThanOrEqual(6);
      for (const qa of lesson!.interviewQuestions!) {
        expect(qa.question.length).toBeGreaterThan(10);
        expect(qa.expectedAnswer.length).toBeGreaterThan(20);
        expect(qa.companyTags?.length).toBeGreaterThan(0);
      }

      // Verify Practice Problems (mixture of starter/scaffold and from-scratch challenges)
      expect(lesson?.practiceProblems).toBeDefined();
      expect(lesson?.practiceProblems!.length).toBeGreaterThanOrEqual(5);
      const withStarter = lesson!.practiceProblems!.filter(p => !!p.initialCode);
      const fromScratch = lesson!.practiceProblems!.filter(p => !p.initialCode);
      expect(withStarter.length).toBeGreaterThanOrEqual(1); // Guided / Fix-bug problems
      expect(fromScratch.length).toBeGreaterThanOrEqual(2); // Independent from-scratch builds

      for (const prob of lesson!.practiceProblems!) {
        expect(prob.title.length).toBeGreaterThan(3);
        expect(prob.description.length).toBeGreaterThan(15);
        if (prob.initialCode) {
          expect(prob.initialCode.length).toBeGreaterThan(10);
          expect(prob.initialCode).toContain('\n'); // Ensure proper multi-line indentation
        }
        expect(prob.solutionCode).toBeDefined();
        expect(prob.solutionCode!.length).toBeGreaterThan(10);
        expect(prob.expectedOutput).toBeDefined();
      }
    }
  });

  it('verifies Lesson 1 teaches constructor naming rules and zero return type', async () => {
    const les1 = await provider.getLesson('java', 'oop', moduleSlug, 'what-is-a-constructor');
    const conceptAct = les1?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Exact same name as class');
    expect(conceptAct?.content).toContain('NO return type');
  });

  it('verifies Lesson 2 teaches default constructor vanishing rule', async () => {
    const les2 = await provider.getLesson('java', 'oop', moduleSlug, 'default-constructors');
    const conceptAct = les2?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('compiler silently created');
    expect(conceptAct?.content).toContain('The #1 Beginner Trap: The Vanishing Constructor');
  });

  it('verifies Lesson 3 teaches parameterized constructors with argument passing', async () => {
    const les3 = await provider.getLesson('java', 'oop', moduleSlug, 'parameterized-constructors');
    const codeAct = les3?.activities.find(a => a.type === 'code_walkthrough');
    expect(codeAct?.codeSnippet).toContain('Product(');
    expect(codeAct?.codeSnippet).toContain('new Product(');
  });

  it('verifies Lesson 4 teaches constructor overloading and signature differentiation', async () => {
    const les4 = await provider.getLesson('java', 'oop', moduleSlug, 'constructor-overloading');
    const conceptAct = les4?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('data types');
    expect(conceptAct?.content).toContain('Duplicate method');
  });

  it('verifies Lesson 5 teaches variable shadowing and the this keyword', async () => {
    const les5 = await provider.getLesson('java', 'oop', moduleSlug, 'the-this-keyword');
    const conceptAct = les5?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('this.name = name');
    expect(conceptAct?.content).toContain('The Shadowing Trap');
  });

  it('verifies Lesson 6 teaches constructor chaining and the first-statement rule', async () => {
    const les6 = await provider.getLesson('java', 'oop', moduleSlug, 'constructor-chaining-with-this');
    const conceptAct = les6?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('this(');
    expect(conceptAct?.content).toContain('FIRST line');
  });

  it('verifies Lesson 7 compares constructor vs method thoroughly', async () => {
    const les7 = await provider.getLesson('java', 'oop', moduleSlug, 'constructor-vs-method');
    const conceptAct = les7?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('void Student()');
    expect(conceptAct?.content).toContain('The 6 Core Distinctions');
  });

  it('verifies Lesson 8 guided Bank Account project has 10-point checklist and full operations', async () => {
    const les8 = await provider.getLesson('java', 'oop', moduleSlug, 'bank-account-project');
    expect(les8?.title).toContain('Bank Account');
    const checklistAct = les8?.activities.find(a => a.type === 'self_evaluation');
    expect(checklistAct?.checklist.length).toBe(10);
    expect(checklistAct?.checklist[0]).toContain('constructors');
    expect(les8?.practiceProblems?.length).toBe(6);
  });

  it('ensures clean pedagogical boundaries: no premature Module 3 concepts', async () => {
    const forbidden = ['private String', 'getter', 'setter', 'extends', 'implements', 'polymorphism', 'SOLID'];
    for (const slug of expectedLessons) {
      const lesson = await provider.getLesson('java', 'oop', moduleSlug, slug);
      for (const act of lesson!.activities) {
        if (act.type === 'concept') {
          for (const word of forbidden) {
            expect(act.content.toLowerCase()).not.toContain(word.toLowerCase());
          }
        }
      }
    }
  });
});

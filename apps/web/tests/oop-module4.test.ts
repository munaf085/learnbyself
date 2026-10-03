import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java OOP - Module 4: Instance, Static & Final', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);

  const moduleSlug = 'static-and-final';
  const expectedLessons = [
    'instance-vs-class-members',
    'static-variables',
    'static-methods',
    'static-initialization',
    'why-main-is-static',
    'final-variables',
    'final-methods-and-classes',
    'id-generator-project'
  ];

  it('verifies Module 4 has exactly 8 lessons with matching slugs and order', async () => {
    const mod = await provider.getModule('java', 'oop', moduleSlug);
    expect(mod).not.toBeNull();
    expect(mod?.title).toBe('04. Instance, Static & Final');
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
          expect(prob.initialCode).toContain('\n');
        }
        expect(prob.solutionCode).toBeDefined();
        expect(prob.solutionCode!.length).toBeGreaterThan(10);
        expect(prob.expectedOutput).toBeDefined();
      }
    }
  });

  it('verifies Lesson 1 teaches instance vs class members and Heap vs Metaspace', async () => {
    const les1 = await provider.getLesson('java', 'oop', moduleSlug, 'instance-vs-class-members');
    const conceptAct = les1?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Heap');
    expect(conceptAct?.content).toContain('Metaspace');
  });

  it('verifies Lesson 2 teaches static variables and sequential ID generation', async () => {
    const les2 = await provider.getLesson('java', 'oop', moduleSlug, 'static-variables');
    const conceptAct = les2?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('static');
    expect(conceptAct?.content).toContain('Metaspace');
  });

  it('verifies Lesson 3 teaches static methods and the absence of this', async () => {
    const les3 = await provider.getLesson('java', 'oop', moduleSlug, 'static-methods');
    const conceptAct = les3?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('this');
    expect(conceptAct?.content).toContain('Utility');
  });

  it('verifies Lesson 4 teaches static initialization blocks and execution order', async () => {
    const les4 = await provider.getLesson('java', 'oop', moduleSlug, 'static-initialization');
    const conceptAct = les4?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Static');
    expect(conceptAct?.content).toContain('Class Loading');
  });

  it('verifies Lesson 5 deconstructs public static void main(String[] args)', async () => {
    const les5 = await provider.getLesson('java', 'oop', moduleSlug, 'why-main-is-static');
    const conceptAct = les5?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('JVM');
    expect(conceptAct?.content).toContain('String[] args');
  });

  it('verifies Lesson 6 teaches final variables and blank final fields', async () => {
    const les6 = await provider.getLesson('java', 'oop', moduleSlug, 'final-variables');
    const conceptAct = les6?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('final');
    expect(conceptAct?.content).toContain('Blank final');
  });

  it('verifies Lesson 7 teaches final methods and final classes', async () => {
    const les7 = await provider.getLesson('java', 'oop', moduleSlug, 'final-methods-and-classes');
    const conceptAct = les7?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Security');
    expect(conceptAct?.content).toContain('java.lang.String');
  });

  it('verifies Lesson 8 guided ID Generator project has 10-point checklist and full operations', async () => {
    const les8 = await provider.getLesson('java', 'oop', moduleSlug, 'id-generator-project');
    expect(les8?.title).toContain('ID Generator');
    const checklistAct = les8?.activities.find(a => a.type === 'self_evaluation');
    expect(checklistAct?.checklist.length).toBe(10);
    expect(checklistAct?.checklist[0]).toContain('PREFIX');
    expect(les8?.practiceProblems?.length).toBe(5);
  });

  it('ensures clean pedagogical boundaries: no premature Module 5 concepts in Module 4', async () => {
    const forbidden = ['extends', 'implements', 'polymorphism', 'abstract class', 'SOLID'];
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

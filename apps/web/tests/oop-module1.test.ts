import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java OOP - Module 1: OOP Thinking — Classes & Objects', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);

  const moduleSlug = 'classes-and-objects';
  const expectedLessons = [
    'why-object-oriented-programming',
    'procedural-vs-object-oriented-thinking',
    'classes-as-blueprints',
    'objects-and-instances',
    'object-state-and-behavior',
    'creating-and-using-multiple-objects',
    'student-profile-practice'
  ];

  it('verifies Module 1 has exactly 7 lessons with matching order and titles', async () => {
    const mod = await provider.getModule('java', 'oop', moduleSlug);
    expect(mod).not.toBeNull();
    expect(mod?.title).toBe('01. OOP Thinking: Classes & Objects');
    expect(mod?.lessons.length).toBe(7);
    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedLessons);
  });

  it('verifies all 7 lessons load full interactive content, MCQs, and practice problems', async () => {
    for (const slug of expectedLessons) {
      const lesson = await provider.getLesson('java', 'oop', moduleSlug, slug);
      expect(lesson).not.toBeNull();
      expect(lesson?.activities.length).toBeGreaterThanOrEqual(5);

      const types = lesson?.activities.map(a => a.type);
      expect(types).toContain('analogy');
      expect(types).toContain('concept');
      expect(types).toContain('code_walkthrough');
      expect(types).toContain('mcq');
      expect(types).toContain('interview_qa');
      expect(types).toContain('self_evaluation');

      expect(lesson?.practiceProblems).toBeDefined();
      expect(lesson?.practiceProblems!.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('verifies Lesson 1 starts with relatable problem without formal jargon', async () => {
    const les1 = await provider.getLesson('java', 'oop', moduleSlug, 'why-object-oriented-programming');
    const conceptAct = les1?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('What happens when your school has 500 students?');
    expect(conceptAct?.content).toContain('1,500');
  });

  it('verifies Lesson 2 contains side-by-side comparison table and entity exercise', async () => {
    const les2 = await provider.getLesson('java', 'oop', moduleSlug, 'procedural-vs-object-oriented-thinking');
    const conceptAct = les2?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('Procedural Thinking');
    expect(conceptAct?.content).toContain('Object-Oriented Thinking');
    expect(conceptAct?.content).toContain('Food Delivery App');
  });

  it('verifies Lesson 3 teaches classes as blueprints without premature features', async () => {
    const les3 = await provider.getLesson('java', 'oop', moduleSlug, 'classes-as-blueprints');
    const codeAct = les3?.activities.find(a => a.type === 'code_walkthrough');
    expect(codeAct?.codeSnippet).toContain('class Book');
  });

  it('verifies Lesson 4 teaches object instantiation and dot notation', async () => {
    const les4 = await provider.getLesson('java', 'oop', moduleSlug, 'objects-and-instances');
    const codeAct = les4?.activities.find(a => a.type === 'code_walkthrough');
    expect(codeAct?.codeSnippet).toContain('new Student()');
    expect(codeAct?.codeSnippet).toContain('s1.displayProfile()');
  });

  it('verifies Lesson 5 teaches state and behavior with state changes over time', async () => {
    const les5 = await provider.getLesson('java', 'oop', moduleSlug, 'object-state-and-behavior');
    const conceptAct = les5?.activities.find(a => a.type === 'concept');
    expect(conceptAct?.content).toContain('STATE');
    expect(conceptAct?.content).toContain('BEHAVIOR');
    expect(conceptAct?.content).toContain('haveBirthday()');
  });

  it('verifies Lesson 6 proves independent state across multiple objects', async () => {
    const les6 = await provider.getLesson('java', 'oop', moduleSlug, 'creating-and-using-multiple-objects');
    const codeAct = les6?.activities.find(a => a.type === 'code_walkthrough');
    expect(codeAct?.codeSnippet).toContain('Student s1 = new Student();');
    expect(codeAct?.codeSnippet).toContain('Student s2 = new Student();');
    expect(codeAct?.codeSnippet).toContain('Student s3 = new Student();');
  });

  it('verifies Lesson 7 guided practice project has the 10-point checklist and solution', async () => {
    const les7 = await provider.getLesson('java', 'oop', moduleSlug, 'student-profile-practice');
    expect(les7?.title).toContain('Student Profile');
    const checklistAct = les7?.activities.find(a => a.type === 'self_evaluation');
    expect(checklistAct?.checklist.length).toBe(10);
    expect(checklistAct?.checklist[0]).toContain('blueprint');
  });

  it('ensures no advanced concepts or academic jargon are prematurely introduced', async () => {
    const forbidden = ['constructor', 'private String', 'getter', 'setter', 'extends', 'implements', 'polymorphism', 'stack vs heap', 'SOLID'];
    for (const slug of expectedLessons) {
      const lesson = await provider.getLesson('java', 'oop', moduleSlug, slug);
      const codeWalkthrough = lesson?.activities.find(a => a.type === 'code_walkthrough')?.codeSnippet || '';
      for (const f of forbidden) {
        expect(codeWalkthrough.toLowerCase()).not.toContain(f.toLowerCase());
      }
    }
  });
});

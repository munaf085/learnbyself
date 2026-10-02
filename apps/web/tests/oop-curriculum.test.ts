import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java OOP 11-Module Rhythm (Learn → Practice → Build → Move forward → Capstone)', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);

  it('loads exactly 11 modules in Java OOP section with 102 total learning units and projects', async () => {
    const section = await provider.getSection('java', 'oop');
    expect(section).not.toBeNull();
    expect(section?.slug).toBe('oop');
    expect(section?.isLocked).toBe(false);
    expect(section?.modules.length).toBe(11);
    expect(section?.totalModules).toBe(11);

    const totalLessons = section!.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    expect(totalLessons).toBe(102);
  });

  it('verifies module slugs match the 11-module progression', async () => {
    const section = await provider.getSection('java', 'oop');
    const expectedSlugs = [
      'classes-and-objects',
      'constructors-and-initialization',
      'encapsulation-and-access-control',
      'static-and-final',
      'inheritance',
      'polymorphism-and-overriding',
      'abstraction-and-interfaces',
      'composition-and-relationships',
      'object-class-and-equality',
      'object-references-casting-and-immutability',
      'oop-mastery-and-code-tracing'
    ];

    expect(section?.modules.map(m => m.slug)).toEqual(expectedSlugs);
  });

  it('verifies that no SOLID principles or design patterns are present in OOP beginner syllabus', async () => {
    const section = await provider.getSection('java', 'oop');
    const allTitles = section!.modules.flatMap(m => [m.title, ...m.lessons.map(l => l.title)]);
    const forbiddenKeywords = ['SOLID', 'Single Responsibility', 'Open Closed', 'Liskov', 'Interface Segregation', 'Dependency Inversion', 'Factory Pattern', 'Singleton Pattern'];

    for (const title of allTitles) {
      for (const kw of forbiddenKeywords) {
        expect(title.toLowerCase()).not.toContain(kw.toLowerCase());
      }
    }
  });

  it('resolves a normal concept lesson with standard activities and no miniProject', async () => {
    const lesson = await provider.getLesson('java', 'oop', 'classes-and-objects', 'why-object-oriented-programming');
    expect(lesson).not.toBeNull();
    expect(lesson?.title).toBe('Why Object-Oriented Programming?');
    expect(lesson?.isMiniProject).toBeFalsy();
    expect(lesson?.activities.length).toBeGreaterThan(0);
  });

  it('resolves an end-of-module project with isMiniProject: true and full GitHub studio metadata', async () => {
    const lesson = await provider.getLesson('java', 'oop', 'constructors-and-initialization', 'bank-account-project');
    expect(lesson).not.toBeNull();
    expect(lesson?.title).toBe('Mini Project: Bank Account');
    expect(lesson?.isMiniProject).toBe(true);
    expect(lesson?.miniProject).toBeDefined();
    expect(lesson?.miniProject?.gitHubReady.suggestedReadme).toContain('Bank Account');
  });

  it('resolves the final Capstone project in Module 11 as a portfolio challenge', async () => {
    const lesson = await provider.getLesson('java', 'oop', 'oop-mastery-and-code-tracing', 'employee-management-payroll-capstone');
    expect(lesson).not.toBeNull();
    expect(lesson?.title).toContain('Employee Management & Payroll System');
    expect(lesson?.isMiniProject).toBe(true);
    expect(lesson?.miniProject).toBeDefined();
  });
});

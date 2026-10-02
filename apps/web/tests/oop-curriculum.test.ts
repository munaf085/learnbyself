import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java OOP 11-Module Curriculum Structure', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);

  it('loads the unlocked OOP section with 11 modules and 102 lessons', async () => {
    const section = await provider.getSection('java', 'oop');
    expect(section).not.toBeNull();
    expect(section?.slug).toBe('oop');
    expect(section?.isLocked).toBe(false);
    expect(section?.modules.length).toBe(11);
    expect(section?.totalModules).toBe(11);

    const totalLessons = section!.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    expect(totalLessons).toBe(102);
  });

  it('verifies module slugs and titles match the revised 11-module breakdown', async () => {
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
      'oop-mastery-and-final-build'
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

  it('dynamically resolves an initial lesson in Module 01 seamlessly', async () => {
    const lesson = await provider.getLesson('java', 'oop', 'classes-and-objects', 'why-object-oriented-programming');
    expect(lesson).not.toBeNull();
    expect(lesson?.title).toBe('Why Object-Oriented Programming?');
    expect(lesson?.activities.length).toBeGreaterThan(0);
  });

  it('resolves final capstone project lesson in Module 11', async () => {
    const lesson = await provider.getLesson('java', 'oop', 'oop-mastery-and-final-build', 'employee-management-payroll-final-project');
    expect(lesson).not.toBeNull();
    expect(lesson?.title).toBe('Final Project: Employee Management & Payroll System');
    expect(lesson?.activities.length).toBeGreaterThan(0);
  });
});

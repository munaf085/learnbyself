import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java OOP 12-Module Curriculum Structure (11 Concepts + Dedicated Mini Projects Module)', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);

  it('loads the unlocked OOP section with 12 modules (11 concept modules + 1 mini-projects module)', async () => {
    const section = await provider.getSection('java', 'oop');
    expect(section).not.toBeNull();
    expect(section?.slug).toBe('oop');
    expect(section?.isLocked).toBe(false);
    expect(section?.modules.length).toBe(12);
    expect(section?.totalModules).toBe(12);

    const miniProjectsMod = section!.modules.find(m => m.slug === 'mini-projects');
    expect(miniProjectsMod).toBeDefined();
    expect(miniProjectsMod?.title).toContain('Mini Projects');
    expect(miniProjectsMod?.lessons.length).toBe(11);
  });

  it('verifies module slugs match the confirmed 12-module breakdown', async () => {
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
      'oop-mastery-and-code-tracing',
      'mini-projects'
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

  it('resolves the capstone project in the dedicated mini-projects module', async () => {
    const lesson = await provider.getLesson('java', 'oop', 'mini-projects', 'employee-management-payroll-capstone');
    expect(lesson).not.toBeNull();
    expect(lesson?.title).toBe('Capstone: Employee Management & Payroll System');
    expect(lesson?.moduleSlug).toBe('mini-projects');
  });
});

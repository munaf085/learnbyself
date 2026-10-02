import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java OOP 12-Module Curriculum & 11 GitHub Projects Portfolio', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);

  it('loads exactly 12 modules in Java OOP section with 113 total learning units and projects', async () => {
    const section = await provider.getSection('java', 'oop');
    expect(section).not.toBeNull();
    expect(section?.slug).toBe('oop');
    expect(section?.isLocked).toBe(false);
    expect(section?.modules.length).toBe(12);
    expect(section?.totalModules).toBe(12);

    const totalLessons = section!.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    expect(totalLessons).toBe(113);
  });

  it('verifies module slugs match the 12-module progression including mini-projects portfolio', async () => {
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

  it('verifies Module 12 contains all 11 GitHub Projects with required titles', async () => {
    const section = await provider.getSection('java', 'oop');
    const mod12 = section?.modules.find(m => m.slug === 'mini-projects');
    expect(mod12).toBeDefined();
    expect(mod12?.title).toBe('12. Java OOP Mini Projects & Portfolio (11 GitHub Projects)');
    expect(mod12?.lessons.length).toBe(11);

    const titles = mod12!.lessons.map(l => l.title);
    expect(titles[0]).toBe('Student Profile & Academic System (Level 1: Guided Build)');
    expect(titles[1]).toBe('Bank Account Management System (Level 1: Guided Build)');
    expect(titles[2]).toBe('Employee Profile & Salary Manager (Level 2: Requirement Build)');
    expect(titles[3]).toBe('Student ID & Course Registration (Level 2: Requirement Build)');
    expect(titles[4]).toBe('Employee Role Hierarchy System (Level 2: Requirement Build)');
    expect(titles[5]).toBe('Payment Processing Engine (Level 2: Requirement Build)');
    expect(titles[6]).toBe('Multi-Channel Notification Service (Level 2: Requirement Build)');
    expect(titles[7]).toBe('Library Management System (Level 2: Requirement Build)');
    expect(titles[8]).toBe('Product & Customer Identity System (Level 2: Requirement Build)');
    expect(titles[9]).toBe('Immutable Order & Cart System (Level 2: Requirement Build)');
    expect(titles[10]).toBe('Capstone: Employee Management & Payroll System (Level 3: Portfolio Capstone)');
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

  it('resolves projects from Module 12 with isMiniProject: true and full GitHub studio metadata', async () => {
    const lesson = await provider.getLesson('java', 'oop', 'mini-projects', 'bank-account-management-system');
    expect(lesson).not.toBeNull();
    expect(lesson?.title).toContain('Bank Account Management System');
    expect(lesson?.isMiniProject).toBe(true);
    expect(lesson?.miniProject).toBeDefined();
    expect(lesson?.miniProject?.gitHubReady.suggestedReadme).toContain('Bank Account');
  });

  it('resolves the final Capstone project in Module 12 as a portfolio capstone', async () => {
    const lesson = await provider.getLesson('java', 'oop', 'mini-projects', 'employee-management-payroll-capstone');
    expect(lesson).not.toBeNull();
    expect(lesson?.title).toContain('Capstone: Employee Management & Payroll System');
    expect(lesson?.isMiniProject).toBe(true);
    expect(lesson?.miniProject).toBeDefined();
  });
});

# -*- coding: utf-8 -*-
import os

def write_file(path, content):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {path}")

write_file("apps/web/tests/curriculum.test.ts", """import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('4-Level Curriculum Hierarchy Abstraction', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);

  it('loads language manifest correctly', async () => {
    const languages = await provider.getLanguages();
    expect(languages.length).toBeGreaterThan(0);
    const java = languages.find(l => l.slug === 'java');
    expect(java).toBeDefined();
    expect(java?.isAvailable).toBe(true);
  });

  it('loads full 18-section course roadmap for Java', async () => {
    const course = await provider.getCourse('java');
    expect(course).not.toBeNull();
    expect(course?.slug).toBe('java');
    expect(course?.sections.length).toBe(18);

    const basics = course?.sections.find(s => s.slug === 'basics');
    expect(basics).toBeDefined();
    expect(basics?.isLocked).toBe(false);

    const oop = course?.sections.find(s => s.slug === 'oop');
    expect(oop).toBeDefined();
    expect(oop?.isLocked).toBe(false);

    const collections = course?.sections.find(s => s.slug === 'collections');
    expect(collections).toBeDefined();
    expect(collections?.isLocked).toBe(true);
  });

  it('resolves section and module levels accurately', async () => {
    const section = await provider.getSection('java', 'basics');
    expect(section).not.toBeNull();
    expect(section?.slug).toBe('basics');
    expect(section?.modules.length).toBeGreaterThanOrEqual(1);

    const moduleData = await provider.getModule('java', 'basics', 'getting-started');
    expect(moduleData).not.toBeNull();
    expect(moduleData?.slug).toBe('getting-started');
    expect(moduleData?.lessons.length).toBeGreaterThanOrEqual(2);
  });

  it('resolves hierarchical lesson with module sidebar metadata and navigation pointers', async () => {
    const lesson = await provider.getLesson('java', 'basics', 'getting-started', 'hello-world');
    expect(lesson).not.toBeNull();
    expect(lesson?.slug).toBe('hello-world');
    expect(lesson?.currentModule).toBeDefined();
    expect(lesson?.currentModule?.title).toBe('Getting Started');
    expect(lesson?.currentModule?.lessons.length).toBeGreaterThanOrEqual(2);

    // Check that activities exist for step-by-step rendering
    expect(lesson?.activities.length).toBeGreaterThanOrEqual(5);
  });
});
""")

print("Curriculum tests updated.")

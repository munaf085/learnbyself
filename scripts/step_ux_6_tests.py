# -*- coding: utf-8 -*-
import os

def write_file(path, content):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {path}")

# tests/ui-components.test.ts
write_file("apps/web/tests/ui-components.test.ts", """import { describe, it, expect } from 'vitest';
import { MemoryStorageDriver } from '../lib/storage';

describe('UI Storage & Learning State Logic', () => {
  it('saves and retrieves active lesson state for ContinueLearning banner', () => {
    const mem = new MemoryStorageDriver();
    const lessonState = {
      languageSlug: 'java',
      languageName: 'Java',
      moduleSlug: 'fundamentals',
      lessonSlug: 'hello-world',
      lessonTitle: 'Deconstructing Hello World & The JVM Architecture',
      progressPercent: 35
    };

    mem.setItem('lbs:last_lesson', JSON.stringify(lessonState));
    const retrieved = JSON.parse(mem.getItem('lbs:last_lesson')!);

    expect(retrieved.languageSlug).toBe('java');
    expect(retrieved.lessonSlug).toBe('hello-world');
    expect(retrieved.progressPercent).toBe(35);
  });

  it('handles checklist self-evaluation multi-item state', () => {
    const mem = new MemoryStorageDriver();
    const checklistState = { 0: true, 1: true, 2: false };

    mem.setItem('lbs:checklist:les-hello-world', JSON.stringify(checklistState));
    const retrieved = JSON.parse(mem.getItem('lbs:checklist:les-hello-world')!);

    expect(retrieved['0']).toBe(true);
    expect(retrieved['1']).toBe(true);
    expect(retrieved['2']).toBe(false);
  });
});
""")

print("Tests created.")

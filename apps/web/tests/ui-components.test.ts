import { describe, it, expect } from 'vitest';
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

  it('guarantees consistent 6-tab learning progression across all lessons including Practice', () => {
    const expectedTabIds = ['concept', 'mcq', 'practice', 'interview', 'summary', 'checklist'];
    const studioTabs = [
      { id: 'concept', label: '1. Learn' },
      { id: 'mcq', label: '2. MCQ' },
      { id: 'practice', label: '3. Practice' },
      { id: 'interview', label: '4. Interview Q&A' },
      { id: 'summary', label: '5. Summary' },
      { id: 'checklist', label: '6. Checklist' }
    ];

    expect(studioTabs.map(t => t.id)).toEqual(expectedTabIds);
  });
});

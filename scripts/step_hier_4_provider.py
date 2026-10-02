# -*- coding: utf-8 -*-
import os

def write_file(path, content):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {path}")

# Enhanced Curriculum Provider
write_file("apps/web/lib/curriculum/provider.ts", """import fs from 'fs';
import path from 'path';
import type {
  Language,
  Course,
  Section,
  Module,
  LessonDetail,
  LessonSummary,
  LanguageSlug
} from '@learnbyself/types';

export interface ICurriculumProvider {
  getLanguages(): Promise<Language[]>;
  getCourse(languageSlug: LanguageSlug): Promise<Course | null>;
  getSection(languageSlug: LanguageSlug, sectionSlug: string): Promise<Section | null>;
  getModule(languageSlug: LanguageSlug, sectionSlug: string, moduleSlug: string): Promise<Module | null>;
  getLesson(
    languageSlug: LanguageSlug,
    sectionSlug: string,
    moduleSlug: string,
    lessonSlug: string
  ): Promise<LessonDetail | null>;
}

export class LocalCurriculumProvider implements ICurriculumProvider {
  private rootPath: string = '';

  constructor(rootPath?: string) {
    if (rootPath) {
      this.rootPath = rootPath;
    } else {
      let cur = process.cwd();
      let found = false;
      for (let i = 0; i < 5; i++) {
        const candidate = path.join(cur, 'data', 'curriculum');
        if (fs.existsSync(candidate)) {
          this.rootPath = candidate;
          found = true;
          break;
        }
        cur = path.dirname(cur);
      }
      if (!found) {
        this.rootPath = path.resolve(process.cwd(), '../../data/curriculum');
      }
    }
  }

  async getLanguages(): Promise<Language[]> {
    const manifestPath = path.join(this.rootPath, 'manifest.json');
    if (!fs.existsSync(manifestPath)) return [];
    const data = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    return data.languages || [];
  }

  async getCourse(languageSlug: LanguageSlug): Promise<Course | null> {
    const coursePath = path.join(this.rootPath, languageSlug, 'course.json');
    if (!fs.existsSync(coursePath)) return null;
    return JSON.parse(fs.readFileSync(coursePath, 'utf-8'));
  }

  async getSection(languageSlug: LanguageSlug, sectionSlug: string): Promise<Section | null> {
    const course = await this.getCourse(languageSlug);
    if (!course) return null;
    return course.sections.find(s => s.slug === sectionSlug) || null;
  }

  async getModule(
    languageSlug: LanguageSlug,
    sectionSlug: string,
    moduleSlug: string
  ): Promise<Module | null> {
    const section = await this.getSection(languageSlug, sectionSlug);
    if (!section) return null;
    return section.modules.find(m => m.slug === moduleSlug) || null;
  }

  async getLesson(
    languageSlug: LanguageSlug,
    sectionSlug: string,
    moduleSlug: string,
    lessonSlug: string
  ): Promise<LessonDetail | null> {
    // 1. Check hierarchical path: data/curriculum/{language}/{section}/{module}/{lesson}.json
    const hierarchicalPath = path.join(this.rootPath, languageSlug, sectionSlug, moduleSlug, `${lessonSlug}.json`);
    let rawContent: string | null = null;

    if (fs.existsSync(hierarchicalPath)) {
      rawContent = fs.readFileSync(hierarchicalPath, 'utf-8');
    } else {
      // 2. Fallback to flat path: data/curriculum/{language}/{module}/{lesson}.json
      const flatPath = path.join(this.rootPath, languageSlug, moduleSlug, `${lessonSlug}.json`);
      if (fs.existsSync(flatPath)) {
        rawContent = fs.readFileSync(flatPath, 'utf-8');
      }
    }

    if (!rawContent) return null;

    const lesson: LessonDetail = JSON.parse(rawContent);

    // Compute navigation metadata (previous, next, currentModule, nextModule, nextSection)
    const course = await this.getCourse(languageSlug);
    if (course) {
      const section = course.sections.find(s => s.slug === sectionSlug);
      if (section) {
        const mod = section.modules.find(m => m.slug === moduleSlug);
        if (mod && mod.lessons) {
          const currentIndex = mod.lessons.findIndex(l => l.slug === lessonSlug);
          lesson.currentModule = {
            slug: mod.slug,
            title: mod.title,
            lessons: mod.lessons.map((l, idx) => ({
              ...l,
              sectionSlug: section.slug,
              moduleSlug: mod.slug,
              isCurrent: idx === currentIndex,
              isCompleted: idx < currentIndex
            }))
          };

          if (currentIndex > 0) {
            lesson.prevLesson = mod.lessons[currentIndex - 1];
          }

          if (currentIndex < mod.lessons.length - 1 && currentIndex !== -1) {
            lesson.nextLesson = mod.lessons[currentIndex + 1];
          } else {
            // End of module: look for next module
            const currentModIdx = section.modules.findIndex(m => m.slug === moduleSlug);
            if (currentModIdx !== -1 && currentModIdx < section.modules.length - 1) {
              const nextMod = section.modules[currentModIdx + 1];
              if (nextMod) {
                lesson.nextModule = {
                  slug: nextMod.slug,
                  title: nextMod.title,
                  sectionSlug: section.slug
                };
              }
            } else {
              // End of section: look for next section
              const currentSecIdx = course.sections.findIndex(s => s.slug === sectionSlug);
              if (currentSecIdx !== -1 && currentSecIdx < course.sections.length - 1) {
                const nextSec = course.sections[currentSecIdx + 1];
                if (nextSec) {
                  lesson.nextSection = {
                    slug: nextSec.slug,
                    title: nextSec.title
                  };
                }
              }
            }
          }
        }
      }
    }

    return lesson;
  }
}

export const curriculumProvider: ICurriculumProvider = new LocalCurriculumProvider();
""")

print("Curriculum provider updated.")

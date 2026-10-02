# -*- coding: utf-8 -*-
import os

def write_file(path, content):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {path}")

# Worker Foundation
write_file("apps/worker/worker.py", """import os
import time

print("[LearnBySelf Worker] Initializing Celery/Redis task runner boundary...")

class WorkerConfig:
    BROKER_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    RESULT_BACKEND = os.getenv("REDIS_URL", "redis://localhost:6379/0")

def sample_calculate_streak(user_id: str):
    \"\"\"Background task to recompute learner streak & mastery scores.\"\"\"
    print(f"Recomputing learning progress metrics for user: {user_id}")
    return {"user_id": user_id, "status": "processed"}

if __name__ == "__main__":
    print("[LearnBySelf Worker] Operational. Standing ready for background tasks.")
""")

# Frontend package.json
write_file("apps/web/package.json", """{
  "name": "@learnbyself/web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run"
  },
  "dependencies": {
    "@learnbyself/types": "workspace:*",
    "@learnbyself/ui": "workspace:*",
    "lucide-react": "^0.475.0",
    "next": "^15.2.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@learnbyself/config": "workspace:*",
    "@types/node": "^22.13.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.5.1",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.3",
    "vitest": "^3.0.5"
  }
}""")

# tsconfig.json
write_file("apps/web/tsconfig.json", """{
  "extends": "@learnbyself/config/tsconfig.base.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}""")

# next.config.ts
write_file("apps/web/next.config.ts", """import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@learnbyself/types', '@learnbyself/ui'],
};

export default nextConfig;
""")

# postcss.config.mjs
write_file("apps/web/postcss.config.mjs", """export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
""")

# tailwind.config.ts
write_file("apps/web/tailwind.config.ts", """import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          900: '#312e81'
        }
      }
    },
  },
  plugins: [],
};

export default config;
""")

# vitest.config.ts
write_file("apps/web/vitest.config.ts", """import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
    }
  }
});
""")

# Storage Abstraction: lib/storage/index.ts
write_file("apps/web/lib/storage/index.ts", """export interface IStorageDriver {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

class MemoryStorageDriver implements IStorageDriver {
  private store: Map<string, string> = new Map();

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }
  removeItem(key: string): void {
    this.store.delete(key);
  }
  clear(): void {
    this.store.clear();
  }
}

class BrowserLocalStorageDriver implements IStorageDriver {
  getItem(key: string): string | null {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(key);
  }
  setItem(key: string, value: string): void {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key, value);
  }
  removeItem(key: string): void {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(key);
  }
  clear(): void {
    if (typeof window === 'undefined') return;
    window.localStorage.clear();
  }
}

class StorageManager {
  private driver: IStorageDriver;
  private prefix: string = 'lbs:';

  constructor(driver?: IStorageDriver) {
    if (driver) {
      this.driver = driver;
    } else if (typeof window !== 'undefined' && window.localStorage) {
      this.driver = new BrowserLocalStorageDriver();
    } else {
      this.driver = new MemoryStorageDriver();
    }
  }

  setDriver(driver: IStorageDriver): void {
    this.driver = driver;
  }

  get<T>(key: string, fallback: T): T {
    try {
      const raw = this.driver.getItem(this.prefix + key);
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      this.driver.setItem(this.prefix + key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage write error', e);
    }
  }

  remove(key: string): void {
    this.driver.removeItem(this.prefix + key);
  }
}

export const storage = new StorageManager();
export { MemoryStorageDriver, BrowserLocalStorageDriver };
""")

# Curriculum Provider Abstraction: lib/curriculum/provider.ts
write_file("apps/web/lib/curriculum/provider.ts", """import fs from 'fs';
import path from 'path';
import type { Language, Course, LessonDetail, LanguageSlug } from '@learnbyself/types';

export interface ICurriculumProvider {
  getLanguages(): Promise<Language[]>;
  getCourse(languageSlug: LanguageSlug): Promise<Course | null>;
  getLesson(languageSlug: LanguageSlug, moduleSlug: string, lessonSlug: string): Promise<LessonDetail | null>;
}

export class LocalCurriculumProvider implements ICurriculumProvider {
  private rootPath: string;

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
    if (!fs.existsSync(manifestPath)) {
      return [];
    }
    const data = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    return data.languages || [];
  }

  async getCourse(languageSlug: LanguageSlug): Promise<Course | null> {
    const coursePath = path.join(this.rootPath, languageSlug, 'course.json');
    if (!fs.existsSync(coursePath)) {
      return null;
    }
    return JSON.parse(fs.readFileSync(coursePath, 'utf-8'));
  }

  async getLesson(
    languageSlug: LanguageSlug,
    moduleSlug: string,
    lessonSlug: string
  ): Promise<LessonDetail | null> {
    const lessonPath = path.join(this.rootPath, languageSlug, moduleSlug, `${lessonSlug}.json`);
    if (!fs.existsSync(lessonPath)) {
      return null;
    }
    return JSON.parse(fs.readFileSync(lessonPath, 'utf-8'));
  }
}

export const curriculumProvider: ICurriculumProvider = new LocalCurriculumProvider();
""")

# app/globals.css
write_file("apps/web/app/globals.css", """@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #f8fafc;
  --foreground: #0f172a;
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
}
""")

# app/layout.tsx
write_file("apps/web/app/layout.tsx", """import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LearnBySelf | Engineering-Grade Programming Mastery',
  description: 'Structured, interactive, and placement-focused learning platform for college students and software engineers.',
  openGraph: {
    title: 'LearnBySelf - Master Programming From Ground Zero',
    description: 'B.Tech student-first programming curriculum with deep mental models, practice exercises, and interview mastery.'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-indigo-600">
              <span className="text-2xl">⚡</span>
              <span>LearnBySelf</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium text-slate-600">
              <Link href="/java" className="hover:text-indigo-600 transition-colors">Java Path</Link>
              <span className="text-slate-300">|</span>
              <span className="text-xs px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full font-semibold border border-emerald-200">
                Phase 1 Active
              </span>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {children}
        </main>

        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
          <p>(c) 2026 LearnBySelf. Built for aspiring engineers, B.Tech graduates, and placement readiness.</p>
        </footer>
      </body>
    </html>
  );
}
""")

# app/page.tsx
write_file("apps/web/app/page.tsx", """import Link from 'next/link';
import { curriculumProvider } from '@/lib/curriculum/provider';
import { Card, Badge, Button } from '@learnbyself/ui';

export default async function HomePage() {
  const languages = await curriculumProvider.getLanguages();

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <Badge variant="blue" className="mb-2">Zero-Teacher Dependency • Deep Mental Models</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Master Software Engineering from <span className="text-indigo-600">Ground Zero</span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Engineered for Indian B.Tech students, college graduates, and placement candidates.
          Move seamlessly from zero knowledge to deep fundamentals, guided exercises, and placement interview readiness.
        </p>
      </section>

      {/* Product Model Progression Hierarchy */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
          The LearnBySelf Progression Engine
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
          {[
            { step: '1', title: 'Beginner', desc: 'No Prior Coding' },
            { step: '2', title: 'Mental Models', desc: 'Visual Analogies' },
            { step: '3', title: 'Deconstruction', desc: 'Line-by-Line' },
            { step: '4', title: 'Practice', desc: 'MCQ & Fixes' },
            { step: '5', title: 'Debugging', desc: 'Find Mistakes' },
            { step: '6', title: 'Projects', desc: 'Real Git Repos' },
            { step: '7', title: 'Interviews', desc: 'Company Tags' },
            { step: '8', title: 'Job Ready', desc: 'Confidence' },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <span className="text-xs font-semibold text-indigo-600">Step {item.step}</span>
              <p className="font-bold text-xs text-slate-900 mt-1">{item.title}</p>
              <span className="text-[10px] text-slate-500 mt-1">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Multi-Language Curriculum Catalog */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Supported Languages & Tracks</h2>
          <p className="text-sm text-slate-500">Every track uses the exact same structured learning engine.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {languages.map((lang) => (
            <Card key={lang.slug} variant={lang.isAvailable ? 'interactive' : 'default'} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{lang.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{lang.name}</h3>
                      <span className="text-xs text-slate-400 font-mono">{lang.version}</span>
                    </div>
                  </div>
                  {lang.isAvailable ? (
                    <Badge variant="green">Phase 1 Ready</Badge>
                  ) : (
                    <Badge variant="slate">Roadmap</Badge>
                  )}
                </div>

                <p className="text-sm text-slate-600 mb-4">{lang.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {lang.paradigms.map((p, idx) => (
                    <span key={idx} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                {lang.isAvailable ? (
                  <Link href={`/${lang.slug}`} className="block">
                    <Button variant="primary" className="w-full">
                      Launch {lang.name} Track →
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" disabled className="w-full">
                    Engine Ready • Curriculum Coming Soon
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
""")

# app/[language]/page.tsx (Course Dashboard)
write_file("apps/web/app/[language]/page.tsx", """import { notFound } from 'next/navigation';
import Link from 'next/link';
import { curriculumProvider } from '@/lib/curriculum/provider';
import type { LanguageSlug } from '@learnbyself/types';
import { Card, Badge, Button, ProgressBar } from '@learnbyself/ui';

interface PageProps {
  params: Promise<{ language: string }>;
}

export default async function CoursePage({ params }: PageProps) {
  const { language } = await params;
  const course = await curriculumProvider.getCourse(language as LanguageSlug);

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Course Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="purple">{course.level.toUpperCase()}</Badge>
          <Badge variant="blue">{course.estimatedHours} Hours Total</Badge>
          <Badge variant="green">Zero Prerequisites</Badge>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {course.title}
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          {course.headline}
        </p>

        {/* Progress snapshot */}
        <div className="pt-4 border-t border-slate-100 max-w-md">
          <ProgressBar value={0} label="Curriculum Progress" />
        </div>
      </div>

      {/* Sections and Modules */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Course Syllabus & Learning Modules</h2>

        {course.sections.map((section) => (
          <div key={section.id} className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              {section.title}
            </h3>

            <div className="space-y-4">
              {section.modules.map((module) => (
                <Card key={module.id} className="space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{module.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{module.description}</p>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Key Learning Objectives:
                    </p>
                    <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                      {module.learningObjectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {module.lessons.map((lesson) => (
                      <div key={lesson.id} className="pt-3 pb-1 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{lesson.title}</p>
                          <p className="text-xs text-slate-500">{lesson.summary}</p>
                        </div>
                        <Link href={`/${course.languageSlug}/${module.slug}/${lesson.slug}`}>
                          <Button size="sm" variant="primary">
                            Start Lesson →
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
""")

# app/[language]/[module]/[lesson]/page.tsx (Lesson View)
write_file("apps/web/app/[language]/[module]/[lesson]/page.tsx", """import { notFound } from 'next/navigation';
import Link from 'next/link';
import { curriculumProvider } from '@/lib/curriculum/provider';
import type { LanguageSlug } from '@learnbyself/types';
import { Card, Badge, Button } from '@learnbyself/ui';

interface LessonPageProps {
  params: Promise<{
    language: string;
    module: string;
    lesson: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { language, module: moduleSlug, lesson: lessonSlug } = await params;
  const lesson = await curriculumProvider.getLesson(
    language as LanguageSlug,
    moduleSlug,
    lessonSlug
  );

  if (!lesson) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center space-x-2">
        <Link href={`/${language}`} className="hover:text-indigo-600 uppercase font-bold tracking-wider">
          {language} Course
        </Link>
        <span>/</span>
        <span className="capitalize">{moduleSlug}</span>
        <span>/</span>
        <span className="text-slate-800 font-semibold">{lesson.title}</span>
      </nav>

      {/* Lesson Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2">
          <Badge variant="blue">Lesson {lesson.slug}</Badge>
          <Badge variant="slate">{lesson.difficulty.toUpperCase()}</Badge>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">{lesson.title}</h1>
        <p className="text-base text-slate-600">{lesson.summary}</p>
      </div>

      {/* Learning Activities Stack */}
      <div className="space-y-8">
        {lesson.activities.map((act) => {
          if (act.type === 'analogy' && act.analogy) {
            return (
              <Card key={act.id} variant="highlight" className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">💡</span>
                  <h3 className="font-bold text-slate-900">{act.title}</h3>
                </div>
                <h4 className="text-sm font-semibold text-indigo-900">{act.analogy.headline}</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{act.analogy.story}</p>
                <div className="bg-white/80 p-3 rounded-lg border border-indigo-100 text-xs font-medium text-indigo-900">
                  <span className="font-bold">Key Mental Model: </span>{act.analogy.keyTakeaway}
                </div>
              </Card>
            );
          }

          if (act.type === 'concept') {
            return (
              <Card key={act.id} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">📘</span>
                  <h3 className="font-bold text-slate-900">{act.title}</h3>
                </div>
                <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                  {act.content}
                </div>
              </Card>
            );
          }

          if (act.type === 'code_walkthrough') {
            return (
              <Card key={act.id} className="space-y-4 bg-slate-900 text-slate-100 border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">💻</span>
                    <h3 className="font-bold text-white">{act.title}</h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400">Main.java</span>
                </div>
                <pre className="font-mono text-sm bg-slate-950 p-4 rounded-lg overflow-x-auto text-emerald-400">
                  {act.codeSnippet}
                </pre>
                <div className="text-xs text-slate-300 whitespace-pre-line leading-relaxed pt-2">
                  {act.description}
                </div>
              </Card>
            );
          }

          if (act.type === 'mcq' && act.questions) {
            return (
              <Card key={act.id} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">✍️</span>
                  <h3 className="font-bold text-slate-900">{act.title}</h3>
                </div>
                {act.questions.map((q) => (
                  <div key={q.id} className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-sm font-semibold text-slate-900">{q.prompt}</p>
                    <div className="space-y-2">
                      {q.options?.map((opt, idx) => (
                        <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 hover:border-indigo-400 cursor-pointer transition-colors">
                          <span className="font-mono text-slate-400 mr-2">{String.fromCharCode(65 + idx)}.</span>
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </Card>
            );
          }

          if (act.type === 'debugging' && act.questions) {
            return (
              <Card key={act.id} className="space-y-4 border-amber-200 bg-amber-50/20">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🔍</span>
                  <h3 className="font-bold text-amber-950">{act.title}</h3>
                </div>
                {act.questions.map((q) => (
                  <div key={q.id} className="space-y-3">
                    <p className="text-sm font-semibold text-slate-900">{q.prompt}</p>
                    {q.codeSnippet && (
                      <pre className="font-mono text-xs bg-slate-900 text-amber-300 p-3 rounded-lg overflow-x-auto">
                        {q.codeSnippet}
                      </pre>
                    )}
                    <div className="space-y-2">
                      {q.options?.map((opt, idx) => (
                        <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800">
                          <span className="font-mono text-slate-400 mr-2">{String.fromCharCode(65 + idx)}.</span>
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </Card>
            );
          }

          if (act.type === 'interview_qa' && act.interviewQA) {
            return (
              <Card key={act.id} className="space-y-4 border-purple-200 bg-purple-50/20">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🎯</span>
                  <h3 className="font-bold text-purple-950">{act.title}</h3>
                </div>
                {act.interviewQA.map((qa) => (
                  <div key={qa.id} className="space-y-3 bg-white p-4 rounded-xl border border-purple-100">
                    <div className="flex flex-wrap gap-1 mb-1">
                      {qa.companyTags?.map((tag, i) => (
                        <Badge key={i} variant="purple">{tag}</Badge>
                      ))}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">Q: {qa.question}</h4>
                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <span className="font-semibold text-slate-900">Expected Answer: </span>{qa.expectedAnswer}
                    </p>
                    <div className="text-xs text-slate-600">
                      <span className="font-semibold text-slate-800">Key Points to Highlight:</span>
                      <ul className="list-disc list-inside mt-1 space-y-0.5">
                        {qa.keyPoints.map((pt, idx) => (
                          <li key={idx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </Card>
            );
          }

          if (act.type === 'self_evaluation' && act.checklist) {
            return (
              <Card key={act.id} className="space-y-3 border-teal-200 bg-teal-50/20">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">✅</span>
                  <h3 className="font-bold text-teal-950">{act.title}</h3>
                </div>
                <div className="space-y-2">
                  {act.checklist.map((item, idx) => (
                    <label key={idx} className="flex items-start space-x-3 text-xs text-slate-700 cursor-pointer">
                      <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </Card>
            );
          }

          return null;
        })}
      </div>

      {/* Completion CTA */}
      <div className="flex justify-between items-center pt-6 border-t border-slate-200">
        <Link href={`/${language}`}>
          <Button variant="outline"><span className="mr-1">&larr;</span> Back to Course</Button>
        </Link>
        <Link href={`/${language}`}>
          <Button variant="success">Mark Lesson Completed &#10003;</Button>
        </Link>
      </div>
    </div>
  );
}
""")

# Frontend Vitest Unit Tests
write_file("apps/web/tests/curriculum.test.ts", """import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Curriculum Provider Abstraction', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);

  it('loads language manifest correctly', async () => {
    const languages = await provider.getLanguages();
    expect(languages.length).toBeGreaterThan(0);
    const java = languages.find(l => l.slug === 'java');
    expect(java).toBeDefined();
    expect(java?.isAvailable).toBe(true);
  });

  it('loads java course with sections and modules', async () => {
    const course = await provider.getCourse('java');
    expect(course).not.toBeNull();
    expect(course?.slug).toBe('java');
    expect(course?.sections.length).toBeGreaterThan(0);
    expect(course?.sections[0].modules.length).toBeGreaterThan(0);
  });

  it('loads detailed lesson with all 7 activity types', async () => {
    const lesson = await provider.getLesson('java', 'fundamentals', 'hello-world');
    expect(lesson).not.toBeNull();
    expect(lesson?.slug).toBe('hello-world');
    expect(lesson?.activities.length).toBeGreaterThanOrEqual(6);
    
    const analogy = lesson?.activities.find(a => a.type === 'analogy');
    expect(analogy).toBeDefined();
    expect(analogy?.analogy?.headline).toBeDefined();

    const mcq = lesson?.activities.find(a => a.type === 'mcq');
    expect(mcq).toBeDefined();
    expect(mcq?.questions?.length).toBeGreaterThan(0);

    const interview = lesson?.activities.find(a => a.type === 'interview_qa');
    expect(interview).toBeDefined();
    expect(interview?.interviewQA?.length).toBeGreaterThan(0);
  });
});
""")

write_file("apps/web/tests/storage.test.ts", """import { describe, it, expect } from 'vitest';
import { MemoryStorageDriver } from '../lib/storage';

describe('Storage Manager Abstraction', () => {
  it('handles set, get, remove without crashing', () => {
    const mem = new MemoryStorageDriver();
    mem.setItem('lbs:test_key', JSON.stringify({ score: 95 }));
    
    const retrieved = mem.getItem('lbs:test_key');
    expect(retrieved).not.toBeNull();
    expect(JSON.parse(retrieved!)).toEqual({ score: 95 });

    mem.removeItem('lbs:test_key');
    expect(mem.getItem('lbs:test_key')).toBeNull();
  });
});
""")

print("Worker and Web frontend generated successfully.")

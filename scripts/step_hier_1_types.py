# -*- coding: utf-8 -*-
import os

def write_file(path, content):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {path}")

# 1. Update packages/types/src/curriculum.ts
write_file("packages/types/src/curriculum.ts", """export type LanguageSlug =
  | 'java'
  | 'python'
  | 'csharp'
  | 'javascript'
  | 'typescript'
  | 'cpp'
  | 'c'
  | 'sql'
  | 'go'
  | 'kotlin';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'interview_prep';

export interface Language {
  slug: LanguageSlug;
  name: string;
  version: string;
  description: string;
  icon: string;
  isAvailable: boolean;
  paradigms: string[];
  primaryUseCases: string[];
}

export interface Course {
  id: string;
  slug: string;
  languageSlug: LanguageSlug;
  title: string;
  headline: string;
  summary: string;
  level: CourseLevel;
  estimatedHours: number;
  learningPathOrder: number;
  prerequisites: string[];
  outcomes: string[];
  progressPercent?: number;
  sections: Section[];
}

export interface Section {
  id: string;
  slug: string;
  title: string;
  orderIndex: number;
  summary: string;
  isLocked?: boolean;
  lockReason?: string;
  progressPercent?: number;
  totalModules?: number;
  totalLessons?: number;
  estimatedHours?: number;
  modules: Module[];
}

export interface Module {
  id: string;
  slug: string;
  sectionSlug?: string;
  title: string;
  description: string;
  orderIndex: number;
  estimatedMinutes: number;
  isLocked?: boolean;
  progressPercent?: number;
  prerequisites: string[];
  learningObjectives: string[];
  lessons: LessonSummary[];
}

export interface LessonSummary {
  id: string;
  slug: string;
  sectionSlug?: string;
  moduleSlug?: string;
  title: string;
  summary: string;
  orderIndex: number;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
  isCompleted?: boolean;
  isCurrent?: boolean;
}

export type LearningActivityType =
  | 'concept'
  | 'analogy'
  | 'code_walkthrough'
  | 'interactive_sandbox'
  | 'mcq'
  | 'output_prediction'
  | 'debugging'
  | 'fill_in_code'
  | 'reorder_code'
  | 'interview_qa'
  | 'mini_project'
  | 'self_evaluation';

export interface QuestionHint {
  step: number;
  hint: string;
}

export interface Question {
  id: string;
  type: 'mcq' | 'output_prediction' | 'debugging' | 'fill_in_code' | 'reorder_code';
  prompt: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: string | number | string[];
  explanation: string;
  hints: QuestionHint[];
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedSeconds: number;
}

export interface InterviewQA {
  id: string;
  question: string;
  companyTags?: string[];
  expectedAnswer: string;
  keyPoints: string[];
  commonMistakes: string[];
  followUpQuestions?: string[];
}

export interface ProjectMilestone {
  stepNumber: number;
  title: string;
  tasks: string[];
  acceptanceCriteria: string[];
}

export interface ProjectDefinition {
  id: string;
  title: string;
  objective: string;
  architecture: string;
  milestones: ProjectMilestone[];
  gitHubGuidance: string;
  skillsDemonstrated: string[];
}

export interface LearningActivity {
  id: string;
  orderIndex: number;
  type: LearningActivityType;
  title: string;
  description?: string;
  content?: string;
  codeSnippet?: string;
  analogy?: {
    headline: string;
    story: string;
    keyTakeaway: string;
  };
  questions?: Question[];
  interviewQA?: InterviewQA[];
  project?: ProjectDefinition;
  checklist?: string[];
}

export interface LessonDetail {
  id: string;
  slug: string;
  sectionSlug: string;
  moduleSlug: string;
  languageSlug: LanguageSlug;
  title: string;
  summary: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedMinutes?: number;
  prerequisites: string[];
  learningObjectives: string[];
  expectedOutcomes: string[];
  activities: LearningActivity[];
  prevLesson?: LessonSummary | null;
  nextLesson?: LessonSummary | null;
  currentModule?: { slug: string; title: string; lessons: LessonSummary[] } | null;
  nextModule?: { slug: string; title: string; sectionSlug: string } | null;
  nextSection?: { slug: string; title: string } | null;
}
""")

print("Types updated.")

import os

def write_file(path, content):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {path}")

# 1. packages/config
write_file("packages/config/package.json", """{
  "name": "@learnbyself/config",
  "version": "0.1.0",
  "private": true
}""")

write_file("packages/config/tsconfig.base.json", """{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "skipLibCheck": true,
    "esModuleInterop": true
  }
}""")

# 2. packages/types
write_file("packages/types/package.json", """{
  "name": "@learnbyself/types",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "@learnbyself/config": "workspace:*",
    "typescript": "^5.7.3"
  }
}""")

write_file("packages/types/tsconfig.json", """{
  "extends": "@learnbyself/config/tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist",
    "declaration": true
  },
  "include": ["src/**/*"]
}""")

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
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  orderIndex: number;
  summary: string;
  modules: Module[];
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  orderIndex: number;
  estimatedMinutes: number;
  prerequisites: string[];
  learningObjectives: string[];
  lessons: LessonSummary[];
}

export interface LessonSummary {
  id: string;
  slug: string;
  title: string;
  summary: string;
  orderIndex: number;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
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
  moduleSlug: string;
  languageSlug: LanguageSlug;
  title: string;
  summary: string;
  difficulty: 'easy' | 'medium' | 'hard';
  prerequisites: string[];
  learningObjectives: string[];
  expectedOutcomes: string[];
  activities: LearningActivity[];
}
""")

write_file("packages/types/src/progress.ts", """export type ProgressStatus =
  | 'not_started'
  | 'in_progress'
  | 'completed'
  | 'mastered';

export interface ProgressRecord {
  userId: string;
  entityType: 'course' | 'module' | 'lesson' | 'exercise' | 'project';
  entityId: string;
  status: ProgressStatus;
  score?: number;
  attempts: number;
  completedAt?: string;
  lastAccessedAt: string;
}

export interface CourseProgressSummary {
  courseId: string;
  languageSlug: string;
  completedLessons: number;
  totalLessons: number;
  percentComplete: number;
  currentModuleId: string;
  currentLessonId: string;
  streakDays: number;
  xpEarned: number;
}
""")

write_file("packages/types/src/auth.ts", """export type UserRole = 'STUDENT' | 'MENTOR' | 'ADMIN' | 'CONTENT_AUTHOR';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId?: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: 'bearer';
  expiresIn: number;
}

export interface Session {
  user: User;
  tokens: AuthTokens;
}
""")

write_file("packages/types/src/index.ts", """export * from './curriculum';
export * from './progress';
export * from './auth';
""")

# 3. packages/ui
write_file("packages/ui/package.json", """{
  "name": "@learnbyself/ui",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "peerDependencies": {
    "react": "^19.0.0 || ^18.2.0"
  },
  "devDependencies": {
    "@learnbyself/config": "workspace:*",
    "@types/react": "^19.0.0",
    "react": "^19.0.0",
    "typescript": "^5.7.3"
  }
}""")

write_file("packages/ui/tsconfig.json", """{
  "extends": "@learnbyself/config/tsconfig.base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "rootDir": "src",
    "outDir": "dist",
    "declaration": true
  },
  "include": ["src/**/*"]
}""")

write_file("packages/ui/src/button.tsx", """import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-sm',
    secondary: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-sm',
    outline: 'border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300',
    success: 'bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500 shadow-sm'
  }[variant];

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base'
  }[size];

  return (
    <button className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};
""")

write_file("packages/ui/src/card.tsx", """import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'highlight' | 'interactive';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const base = 'rounded-xl border transition-all';
  const variants = {
    default: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-5 shadow-xs',
    highlight: 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900 p-5 shadow-xs',
    interactive: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md cursor-pointer'
  }[variant];

  return (
    <div className={`${base} ${variants} ${className}`} {...props}>
      {children}
    </div>
  );
};
""")

write_file("packages/ui/src/badge.tsx", """import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'green' | 'amber' | 'purple' | 'slate';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  className = ''
}) => {
  const styles = {
    blue: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    purple: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    slate: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'
  }[variant];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles} ${className}`}>
      {children}
    </span>
  );
};
""")

write_file("packages/ui/src/progress-bar.tsx", """import React from 'react';

export interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showPercent?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showPercent = true,
  className = ''
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400 mb-1.5 font-medium">
          {label && <span>{label}</span>}
          {showPercent && <span>{Math.round(clamped)}%</span>}
        </div>
      )}
      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
""")

write_file("packages/ui/src/index.ts", """export * from './button';
export * from './card';
export * from './badge';
export * from './progress-bar';
""")

print("Packages created successfully.")

export type LanguageSlug =
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
  difficulty: 'beginner' | 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
  isCompleted?: boolean;
  isCurrent?: boolean;
  subtopics?: string[];
  learningOutcomes?: string[];
  prerequisites?: string[];
  practiceCategories?: string[];
  interviewCategories?: string[];
  projectDependencies?: string[];
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

export interface ConceptBreakdown {
  whatIsIt: string;
  whyItMatters: string;
  howItWorks: string[];
  keyTakeaways: string[];
}

export interface LearningActivity {
  id: string;
  orderIndex: number;
  type: LearningActivityType;
  title: string;
  description?: string;
  content?: string;
  codeSnippet?: string;
  outputSnippet?: string;
  breakdown?: ConceptBreakdown;
  analogy?: {
    headline: string;
    story: string;
    keyTakeaway: string;
  };
  questions?: Question[];
  interviewQA?: InterviewQA[];
  project?: ProjectDefinition;
  checklist?: string[];
  practice?: {
    title?: string;
    problemStatement: string;
    requirements: string[];
    initialCode: string;
    expectedOutput: string;
    hints?: string[];
  };
  practiceProblems?: PracticeProblem[];
}

export interface PracticeProblem {
  id: string;
  title: string;
  difficulty?: 'beginner' | 'easy' | 'medium' | 'hard';
  description: string;
  problemStatement?: string;
  expectedOutput?: string;
  hint?: string;
  hints?: string[];
  initialCode?: string;
  solutionCode?: string;
}

export interface LessonDetail {
  id: string;
  slug: string;
  sectionSlug: string;
  moduleSlug: string;
  languageSlug: LanguageSlug;
  title: string;
  summary: string;
  difficulty: 'beginner' | 'easy' | 'medium' | 'hard';
  estimatedMinutes?: number;
  prerequisites: string[];
  learningObjectives: string[];
  expectedOutcomes: string[];
  activities: LearningActivity[];
  practiceProblems?: PracticeProblem[];
  prevLesson?: LessonSummary | null;
  nextLesson?: LessonSummary | null;
  currentModule?: { slug: string; title: string; lessons: LessonSummary[] } | null;
  nextModule?: { slug: string; title: string; sectionSlug: string } | null;
  nextSection?: { slug: string; title: string } | null;
}

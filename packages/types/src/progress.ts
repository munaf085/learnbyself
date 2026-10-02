export type ProgressStatus =
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

# Curriculum Engine & Content Model

## 1. The 7-Stage Lesson Pedagogy

To guarantee that a beginner student progresses without feeling lost or requiring a teacher, every lesson in LearnBySelf adheres to a 7-stage learning journey:

1. **Analogy (`analogy`)**: Grounding the technical concept in a concrete, memorable mental model before introducing syntax.
2. **Concept Deconstruction (`concept`)**: Theoretical foundations clearly explaining 'why' and 'how'.
3. **Code Walkthrough (`code_walkthrough`)**: Concrete source code with line-by-line keyword explanation.
4. **Guided Practice MCQ (`mcq`)**: Formative question with stepped hints and instant reasoning feedback.
5. **Debugging Challenge (`debugging`)**: Practical code snippet containing common beginner syntax or runtime bugs.
6. **Placement Interview Q&A (`interview_qa`)**: Top interview questions tagged with hiring companies, expected answers, key points, and follow-up traps.
7. **Mastery Verification Checklist (`self_evaluation`)**: Actionable checklist allowing the learner to self-assess comprehension.

---

## 2. Content Abstraction Layer

The UI never reads filesystem paths directly. Instead, it relies on `ICurriculumProvider`:

```typescript
export interface ICurriculumProvider {
  getLanguages(): Promise<Language[]>;
  getCourse(languageSlug: LanguageSlug): Promise<Course | null>;
  getLesson(languageSlug: LanguageSlug, moduleSlug: string, lessonSlug: string): Promise<LessonDetail | null>;
}
```

This abstraction allows seamless swapping from local JSON files to a PostgreSQL database or headless CMS without changing UI components.

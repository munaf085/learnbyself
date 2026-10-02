import fs from 'fs';
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
    // Map legacy or alternative slugs to canonical merged lessons
    const slugAliases: Record<string, string> = {
      // Lesson 1 aliases:
      'what-is-java-and-the-jvm': 'java-and-jvm',
      'what-is-java': 'java-and-jvm',
      'what-is-java-and-why-is-it-used': 'java-and-jvm',
      'why-java-platform-independence-and-wora': 'java-and-jvm',
      'why-does-java-run-on-different-computers': 'java-and-jvm',
      'jdk-jre-and-jvm': 'java-and-jvm',
      'jdk-jre-jvm': 'java-and-jvm',
      'how-java-works-and-jvm-ecosystem': 'java-and-jvm',

      // Lesson 2 aliases:
      'installing-java-on-windows-and-mac': 'install-java',
      'installing-java-and-setting-up-ide': 'install-java',
      'installing-java-and-running-your-first-program': 'install-java',
      'installing-java': 'install-java',
      'installing-java-on-windows': 'install-java',
      'installing-java-on-mac': 'install-java',

      // Lesson 3 aliases:
      'your-first-java-program-and-execution': 'your-first-program',
      'your-first-java-program': 'your-first-program',
      'hello-world': 'your-first-program',
      'understanding-your-first-java-program': 'your-first-program',
      'main-method-explained': 'your-first-program',
      'understanding-main': 'your-first-program',
      'compilation-bytecode-execution': 'your-first-program',
      'from-java-to-class-to-running-the-program': 'your-first-program',
      'java-syntax-and-clean-code-rules': 'your-first-program',
      'java-program-structure': 'your-first-program',
      'java-program-structure-and-basic-syntax': 'your-first-program',
      'comments-and-documentation': 'your-first-program',
      'comments-naming-and-clean-java-code': 'your-first-program',
      'beginner-debugging-and-first-challenge': 'your-first-program',
      'guided-practice-plus-first-bug-hunt': 'your-first-program',
      'guided-practice-and-first-debugging-challenge': 'your-first-program',
      'guided-practice-first-debugging-challenge': 'your-first-program',

      // Module 02 aliases:
      'what-is-a-variable': 'variables-storing-information',
      'memory-and-variables-mental-model': 'variables-storing-information',
      'primitive-vs-reference-types': 'java-data-types',
      'the-8-primitive-data-types': 'java-data-types',
      'byte-short-int-long': 'integer-numbers-byte-short-int-long',
      'declaring-and-initializing-integers': 'integer-numbers-byte-short-int-long',
      'floating-point-numbers-float-and-double': 'decimal-numbers-float-double',
      'float-vs-double-precision-and-use-cases': 'decimal-numbers-float-double',
      'char-data-type-and-unicode': 'char-boolean-string',
      'boolean-data-type-and-logical-flags': 'char-boolean-string',
      'string-basics-in-java': 'char-boolean-string',
      'variable-scope-and-lifetime': 'variables-scope-memory',
      'stack-vs-heap-intro-for-variables': 'variables-scope-memory',
      'constants-and-the-final-keyword': 'constants-and-final',
      'variable-naming-rules-and-camelcase-conventions': 'constants-and-final',
      'type-conversion-widening-casting': 'type-conversion-and-casting',
      'type-conversion-narrowing-casting': 'type-conversion-and-casting',
      'overflow-and-underflow-gotchas': 'overflow-precision-common-mistakes',
      'common-beginner-mistakes-with-variables': 'overflow-precision-common-mistakes',
      'mini-project-variable-mastery-challenge': 'variables-data-types-final-challenge',

      // Module 03 aliases:
      'arithmetic-operators': 'arithmetic-operators-doing-calculations',
      'assignment-operators': 'assignment-and-compound-assignment',
      'relational-operators': 'relational-and-equality-operators',
      'equality-operators': 'relational-and-equality-operators',
      'logical-operators': 'logical-operators-and-or-not',
      'unary-operators': 'increment-and-decrement',
      'increment-or-decrement-pitfalls': 'increment-and-decrement',
      'operator-precedence': 'operator-precedence-and-expression-evaluation',
      'expression-evaluation': 'operator-precedence-and-expression-evaluation',
      'bitwise-operators': 'bitwise-and-shift-operators',
      'shift-operators': 'bitwise-and-shift-operators',
      'output-prediction': 'operators-final-challenge',
      'debugging-challenges': 'operators-final-challenge',
      'interview-questions': 'operators-final-challenge',

      // Module 04 aliases:
      'reading-different-types-of-input': 'reading-numbers-text-and-characters',
      'print-vs-println': 'printing-output-in-java',
      'printf-and-format-specifiers': 'formatting-output',
      'scanner-basics': 'reading-input-with-scanner',
      'scanner-newline-issue': 'next-vs-nextline',
      'scanner-pitfalls': 'common-scanner-mistakes',
      'input-output-practice': 'input-and-output-practice',
      'io-practice': 'input-and-output-practice',
      'io-final-challenge': 'input-and-output-final-challenge',

      // Module 05 aliases:
      'if-statements': 'if-and-if-else',
      'if-else': 'if-and-if-else',
      'else-if-ladder': 'else-if-and-multiple-conditions',
      'nested-if': 'nested-conditions',
      'logical-operators-in-conditions': 'logical-conditions',
      'switch': 'switch-statements',
      'switch-case': 'switch-statements',
      'switch-expressions': 'modern-switch-expressions',
      'switch-arrow-syntax': 'modern-switch-expressions',
      'conditional-bugs': 'conditional-bugs-and-output-prediction',
      'conditions-practice': 'conditional-practice',
      'conditional-final-challenge': 'conditional-statements-final-challenge',

      // Module 06 (Loops) aliases:
      'for-loops': 'for-loop',
      'while-loops': 'while-and-do-while',
      'do-while': 'while-and-do-while',
      'break-continue': 'break-and-continue',
      'nested-loop': 'nested-loops',
      'loop-bugs': 'infinite-loops-and-common-bugs',
      'infinite-loops': 'infinite-loops-and-common-bugs',
      'patterns': 'pattern-and-number-problems',
      'loop-practice': 'loops-practice-and-final-challenge',
      'loops-final-challenge': 'loops-practice-and-final-challenge',

      // Module 07 (Methods) aliases:
      'method-basics': 'why-methods',
      'anatomy-of-a-method': 'method-anatomy',
      'parameters': 'parameters-and-arguments',
      'arguments': 'parameters-and-arguments',
      'return-values': 'return-values-and-void',
      'void-methods': 'return-values-and-void',
      'method-scope': 'calling-methods-and-scope',
      'call-stack': 'local-variables-and-method-memory',
      'stack-memory': 'local-variables-and-method-memory',
      'static': 'static-methods',
      'overloading': 'method-overloading',
      'pass-by-value': 'pass-by-value-in-java',
      'recursion': 'recursion-basics',
      'recursion-intro': 'recursion-basics',
      'method-bugs': 'method-bugs-and-output-prediction',
      'methods-practice': 'methods-practice-and-interview-challenge',
      'methods-final-challenge': 'methods-practice-and-interview-challenge'
    };

    const targetSlug = slugAliases[lessonSlug] || lessonSlug;

    // 1. Check hierarchical path: data/curriculum/{language}/{section}/{module}/{lesson}.json
    const hierarchicalPath = path.join(this.rootPath, languageSlug, sectionSlug, moduleSlug, `${targetSlug}.json`);
    let rawContent: string | null = null;

    if (fs.existsSync(hierarchicalPath)) {
      rawContent = fs.readFileSync(hierarchicalPath, 'utf-8');
    } else {
      // 2. Fallback to flat path: data/curriculum/{language}/{module}/{lesson}.json
      const flatPath = path.join(this.rootPath, languageSlug, moduleSlug, `${targetSlug}.json`);
      if (fs.existsSync(flatPath)) {
        rawContent = fs.readFileSync(flatPath, 'utf-8');
      }
    }

    let lesson: LessonDetail;

    if (rawContent) {
      const parsed = JSON.parse(rawContent);
      lesson = {
        ...parsed,
        slug: targetSlug
      };
    } else {
      const course = await this.getCourse(languageSlug);
      const section = course?.sections.find(s => s.slug === sectionSlug);
      const mod = section?.modules.find(m => m.slug === moduleSlug);
      const summary = mod?.lessons.find(l => l.slug === lessonSlug);
      if (!summary) return null;

      lesson = {
        id: summary.id,
        slug: summary.slug,
        moduleSlug: moduleSlug,
        sectionSlug: sectionSlug,
        languageSlug: languageSlug,
        title: summary.title,
        summary: summary.summary,
        difficulty: summary.difficulty,
        estimatedMinutes: summary.estimatedMinutes,
        prerequisites: [],
        learningObjectives: [
          `Understand the core concept and execution model of ${summary.title}`,
          `Identify edge cases and potential runtime failures`,
          `Formulate precise technical explanations for placement interviews`
        ],
        expectedOutcomes: [
          `Confidence answering technical interview questions on ${summary.title}`,
          `Ability to solve output-prediction questions without guesswork`
        ],
        activities: [
          {
            id: `act-${summary.slug}-analogy`,
            type: 'analogy',
            title: `Intuitive Model: ${summary.title}`,
            orderIndex: 1,
            analogy: {
              headline: `Think of ${summary.title} like a structured blueprint in the physical world`,
              story: `In software engineering, concepts mirror real-life physical mechanisms. When working with ${summary.title}, computer systems follow deterministic, predictable rules. Instead of memorizing syntax, picture the execution flow from top to bottom.`,
              keyTakeaway: `${summary.title} establishes clean boundaries and predictable state transformations in your program.`
            }
          },
          {
            id: `act-${summary.slug}-concept`,
            type: 'concept',
            title: `Core Architecture & Mechanics`,
            orderIndex: 2,
            content: `Understanding ${summary.title} requires mastering two fundamental perspectives:
1. Syntax & Declaration: How the compiler validates your statements and enforces static typing.
2. Runtime Behavior & Memory: How the JVM allocates references, manages stack frames, and dereferences values in the Heap.

Mastering this concept ensures you avoid subtle bugs like NullPointerExceptions, off-by-one boundary errors, and unintended state mutations.`
          },
          {
            id: `act-${summary.slug}-code`,
            type: 'code_walkthrough',
            title: `Practical Implementation`,
            orderIndex: 3,
            codeSnippet: `// Example demonstrating ${summary.title}\npublic class Main {\n    public static void main(String[] args) {\n        // Concept demonstrated cleanly\n        System.out.println("Executing: ${summary.title}");\n    }\n}`,
            description: `Inspect the code structure above. Every statement is evaluated sequentially by the execution thread. Pay close attention to data types, scope lifetimes, and return contracts.`
          },
          {
            id: `act-${summary.slug}-quiz`,
            type: 'mcq',
            title: `Concept Validation & Edge Cases`,
            orderIndex: 4,
            questions: [
              {
                id: `q-${summary.slug}-1`,
                type: 'mcq',
                prompt: `What is the primary architectural advantage of mastering ${summary.title}?`,
                options: [
                  "It allows code to execute predictably with clear memory lifecycle boundaries",
                  "It bypasses the compiler validation checks completely",
                  "It eliminates the need for unit testing",
                  "It converts Java source code into raw assembly language directly"
                ],
                correctAnswer: 0,
                explanation: `${summary.title} provides predictable execution semantics and clear lifecycle boundaries enforced at compile-time and runtime.`,
                hints: [{ step: 1, hint: "Think about why modern statically-typed languages enforce strict boundaries." }],
                difficulty: 'medium',
                estimatedSeconds: 60
              }
            ]
          },
          {
            id: `act-${summary.slug}-interview`,
            type: 'interview_qa',
            title: `Common Questions`,
            orderIndex: 5,
            interviewQA: [
              {
                id: `qa-${summary.slug}-1`,
                question: `Why is ${summary.title} important in simple terms?`,
                expectedAnswer: `${summary.title} helps you write organized, predictable programs. Instead of letting code become messy and bug-prone, it establishes clear boundaries and standard conventions that every developer understands.`,
                keyPoints: [
                  "Keeps your code clean, predictable, and easy to maintain."
                ],
                commonMistakes: [],
                companyTags: []
              }
            ]
          },
          {
            id: `act-${summary.slug}-checklist`,
            type: 'self_evaluation',
            title: `Self-Mastery Checklist`,
            orderIndex: 6,
            checklist: [
              `I can explain ${summary.title} in plain English without looking at notes.`,
              `I understand how the JVM handles this concept internally.`,
              `I can solve interview MCQs and output-prediction questions on this topic.`
            ]
          }
        ]
      };
    }

    // Compute navigation metadata (previous, next, currentModule, nextModule, nextSection)
    const course = await this.getCourse(languageSlug);
    if (course) {
      const section = course.sections.find(s => s.slug === sectionSlug);
      if (section) {
        const mod = section.modules.find(m => m.slug === moduleSlug);
        if (mod && mod.lessons) {
          const currentIndex = mod.lessons.findIndex(l => l.slug === targetSlug || l.slug === lessonSlug);
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

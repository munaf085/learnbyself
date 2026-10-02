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
    const resolvedSlug =
      (sectionSlug === 'oop' && moduleSlug === 'oop-mini-projects')
        ? 'mini-projects'
        : moduleSlug;
    return section.modules.find(m => m.slug === resolvedSlug || m.slug === moduleSlug) || null;
  }

  async getLesson(
    languageSlug: LanguageSlug,
    sectionSlug: string,
    moduleSlug: string,
    lessonSlug: string
  ): Promise<LessonDetail | null> {
    const resolvedModuleSlug =
      (sectionSlug === 'oop' && moduleSlug === 'oop-mini-projects')
        ? 'mini-projects'
        : moduleSlug;
    // Map legacy or alternative slugs to canonical merged lessons
    const slugAliases: Record<string, string> = {
      // OOP Module 1 aliases:
      'procedural-vs-oop-thinking': 'procedural-vs-object-oriented-thinking',
      'creating-multiple-objects': 'creating-and-using-multiple-objects',

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
      'methods-final-challenge': 'methods-practice-and-interview-challenge',

      // Module 08 (Arrays) aliases:
      'indexes-and-accessing-elements': 'array-indexing-and-access',
      'array-indexing': 'array-indexing-and-access',
      'for-each-loop': 'enhanced-for-loop',
      'for-each': 'enhanced-for-loop',
      'updating-searching-and-counting': 'common-array-operations',
      'sum-average-min-max': 'common-array-operations',
      'array-operations': 'common-array-operations',
      'copying-arrays': 'updating-copying-and-comparing-arrays',
      'copying-and-arrays-utility-methods': 'the-arrays-utility-class',
      'arrays-utility': 'the-arrays-utility-class',
      '2d-arrays': 'multidimensional-arrays',
      'common-array-errors-and-output-prediction': 'array-bugs-and-output-prediction',
      'array-errors': 'array-bugs-and-output-prediction',
      'arrays-practice': 'array-practice',
      'arrays-practice-and-interview-challenge': 'arrays-final-challenge',

      // Module 09 (Strings) aliases:
      'string-memory-and-immutability': 'string-immutability',
      'immutability': 'string-immutability',
      'string-pool': 'string-pool-and-memory',
      'string-comparison': 'string-equals-vs-double-equals',
      'equals-vs-double-equals': 'string-equals-vs-double-equals',
      'reading-and-combining-strings': 'string-concatenation',
      'concatenation': 'string-concatenation',
      'finding-and-checking-text': 'essential-string-methods',
      'string-methods': 'essential-string-methods',
      'extracting-and-replacing-text': 'string-transformation-methods',
      'splitting-and-cleaning-strings': 'splitting-joining-and-parsing',
      'split-and-join': 'splitting-joining-and-parsing',
      'stringbuilder-and-stringbuffer': 'stringbuffer-and-stringbuilder',
      'string-buffer': 'stringbuffer-and-stringbuilder',
      'string-output-prediction-and-debugging': 'string-performance-and-common-bugs',
      'string-bugs': 'string-performance-and-common-bugs',
      'string-problem-solving': 'string-practice',
      'strings-practice-and-interview-challenge': 'strings-final-challenge',

      // Module 10 (Exception Basics) aliases:
      'exceptions': 'what-are-exceptions',
      'intro-to-exceptions': 'what-are-exceptions',
      'error-vs-exception': 'errors-vs-exceptions',
      'hierarchy': 'exception-hierarchy',
      'try-catch': 'try-catch-finally',
      'multiple-catch': 'multiple-catch-and-exception-flow',
      'throw-throws': 'throw-and-throws',
      'checked-unchecked': 'checked-vs-unchecked-exceptions',
      'common-exceptions': 'common-java-exceptions',
      'custom-exceptions': 'custom-exceptions-and-debugging',
      'exception-debugging': 'custom-exceptions-and-debugging',
      'exception-practice': 'exceptions-practice-and-interview-challenge',
      'exceptions-final-challenge': 'exceptions-practice-and-interview-challenge',

      // Module 11 (Packages & Access Control) aliases:
      'packages-intro': 'why-packages',
      'packages': 'why-packages',
      'creating-packages': 'creating-and-using-packages',
      'compiling-packages': 'creating-and-using-packages',
      'imports': 'import-and-fully-qualified-names',
      'static-imports': 'import-and-fully-qualified-names',
      'access-control': 'access-modifiers',
      'public-private': 'public-private-and-package-private',
      'encapsulation': 'public-private-and-package-private',
      'protected': 'protected-and-cross-package-access',
      'package-naming': 'naming-and-project-organization',
      'project-structure': 'naming-and-project-organization',
      'packages-practice': 'packages-practice-and-interview-challenge',
      'packages-final-challenge': 'packages-practice-and-interview-challenge',

      // Mini Projects aliases:
      'calculator': 'mini-project-calculator',
      'scientific-calculator': 'mini-project-calculator',
      'guessing-game': 'mini-project-number-guessing-game',
      'number-guessing-game': 'mini-project-number-guessing-game',
      'student-marks-analyzer': 'mini-project-student-marks-analyzer',
      'marks-analyzer': 'mini-project-student-marks-analyzer',
      'student-analyzer': 'mini-project-student-marks-analyzer',
      'atm': 'mini-project-atm-console-application',
      'atm-application': 'mini-project-atm-console-application',
      'atm-console-application': 'mini-project-atm-console-application',
      'billing-system': 'mini-project-billing-system',
      'ecommerce-billing': 'mini-project-billing-system',
      'employee-management': 'mini-project-final-java-basics-project',
      'payroll-system': 'mini-project-final-java-basics-project',
      'capstone-payroll': 'mini-project-final-java-basics-project',
      'capstone': 'mini-project-final-java-basics-project',
      'final-project': 'mini-project-final-java-basics-project'
    };

    const targetSlug = slugAliases[lessonSlug] || lessonSlug;

    // 1. Check hierarchical path: data/curriculum/{language}/{section}/{module}/{lesson}.json
    const hierarchicalPath = path.join(this.rootPath, languageSlug, sectionSlug, resolvedModuleSlug, `${targetSlug}.json`);
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
      const mod = section?.modules.find(m => m.slug === resolvedModuleSlug);
      const summary = mod?.lessons.find(l => l.slug === targetSlug || l.slug === lessonSlug);
      if (!summary) return null;

      const isProjectLesson =
        (summary as any).isMiniProject ||
        resolvedModuleSlug === 'mini-projects' ||
        summary.title.toLowerCase().includes('mini project') ||
        summary.title.toLowerCase().includes('capstone') ||
        summary.title.toLowerCase().includes('final project') ||
        summary.title.toLowerCase().includes('guided build') ||
        summary.title.toLowerCase().includes('requirement build');

      let miniProjectData: any = undefined;
      if (isProjectLesson) {
        miniProjectData = {
          id: `mp-${summary.slug}`,
          slug: summary.slug,
          title: summary.title,
          projectBrief: {
            problemItSolves: summary.summary,
            realWorldUse: `Applied in real-world Java engineering systems modeling domain logic with high reliability.`,
            estimatedTime: `${summary.estimatedMinutes || 35} mins`,
            difficulty: summary.difficulty || 'intermediate',
            motivatingQuote: `Building real projects is where syntax transforms into engineering confidence.`
          },
          realWorldScenario: {
            headline: `Professional Engineering Scenario: ${summary.title}`,
            story: `You have been tasked by your team lead with developing a robust, object-oriented component for ${summary.title}. The solution must be well-structured, follow strict encapsulation, and handle invalid inputs gracefully.`,
            context: `Java Enterprise / Core System Architecture`
          },
          requirements: {
            functional: [
              `Implement primary domain entities with appropriate state and behavior`,
              `Ensure all methods validate input arguments before mutating state`,
              `Provide clean console logging to verify program execution`
            ],
            technical: [
              `Compile without warnings using OpenJDK 21 LTS`,
              `Organize classes cleanly with appropriate access modifiers`,
              `Implement defensive state checks to prevent invalid object states`
            ],
            edgeCases: [
              `Null or empty string inputs`,
              `Negative numerical values or boundary overflow`,
              `Consecutive method invocations under varying states`
            ]
          },
          beforeYouCode: {
            mentalModel: `Sketch the class diagram on paper first: identify fields, access modifiers, constructors, and methods before opening your IDE.`,
            commonPitfalls: [
              `Directly exposing mutable fields with public access`,
              `Missing constructor parameter validation guards`,
              `Overcomplicating the class hierarchy unnecessarily`
            ],
            tips: [
              `Write and test one class at a time in isolation`,
              `Run with sample data and verify edge case outputs`
            ]
          },
          buildRoadmap: [
            {
              stepNumber: 1,
              title: "Scaffold Domain Classes",
              tasks: [
                "Define instance variables with private access",
                "Create parameterized constructors with validation",
                "Implement getter and business behavior methods"
              ]
            },
            {
              stepNumber: 2,
              title: "Implement Validation & Invariants",
              tasks: [
                "Add defensive guards for null or invalid inputs",
                "Return safe copies of mutable state if applicable",
                "Ensure clean error reporting upon violation"
              ]
            },
            {
              stepNumber: 3,
              title: "Build Driver & Test Suite",
              tasks: [
                "Instantiate multiple test instances in Main.java",
                "Simulate happy-path business workflows",
                "Execute negative test cases to confirm guard behavior"
              ]
            }
          ],
          thinkBeforeYouCode: [
            {
              question: "What real-world entity does each class represent?",
              hint: "Classes are nouns representing blueprints; methods are verbs representing behaviors."
            },
            {
              question: "How should invalid state transitions be prevented?",
              hint: "Validate inside constructors and mutator methods before modifying instance fields."
            }
          ],
          hintSystem: [
            {
              step: 1,
              hint: "Start with a clean Main.java file and write your class declarations sequentially or in separate files."
            },
            {
              step: 2,
              hint: "Keep fields private and use getters to inspect state from outside the class."
            },
            {
              step: 3,
              hint: "Use System.out.println() with descriptive prefixes to trace each operation in the console."
            }
          ],
          testYourProject: {
            normalCases: [
              "Create valid object instances with standard constructor parameters",
              "Execute core business methods and verify expected state updates",
              "Print formatted object status to console"
            ],
            boundaryCases: [
              "Pass minimum and maximum permissible numeric boundaries",
              "Test single-character or boundary length strings"
            ],
            invalidInputCases: [
              "Attempt object creation with null arguments",
              "Invoke operations that violate business invariants"
            ],
            edgeCases: [
              "Repeated operations in rapid sequence",
              "Zero-value operations where applicable"
            ]
          },
          debuggingGuide: [
            "NullPointerException: Check that all reference fields are initialized before dereferencing.",
            "Unexpected state values: Verify that your constructor assigns parameters to instance fields using this.field = param."
          ],
          projectPolish: [
            "Organize code with clean indentation and descriptive variable names.",
            "Add JavaDoc comments explaining method purpose and parameter constraints."
          ],
          gitHubReady: {
            repoName: summary.slug,
            commitMessages: [
              "feat: initialize domain entities and constructors",
              "feat: implement business methods and validation guards",
              "test: add comprehensive console test cases",
              "docs: add professional README with architecture overview"
            ],
            suggestedReadme: `# ${summary.title}\n\nA clean, robust Java application modeling ${summary.title} with solid object-oriented design principles.\n\n## Features\n- Encapsulated domain entities\n- Defensive input validation\n- Comprehensive console test driver\n\n## How to Run\n\`\`\`bash\njavac Main.java\njava Main\n\`\`\`\n`
          },
          portfolioChecklist: [
            "All classes follow clean OOP design principles",
            "Project compiles cleanly with zero warnings",
            "README.md explains the problem, architecture, and instructions",
            "Repository is committed and pushed to GitHub"
          ],
          explainYourProject: [
            "I built this project to master object-oriented modeling in Java.",
            "I prioritized encapsulation and state invariants to ensure runtime robustness.",
            "The architecture separates data fields from business operations cleanly."
          ],
          projectCompletion: {
            celebrationMessage: `Congratulations! You have completed ${summary.title}. You have an authentic, portfolio-ready Java project ready for GitHub!`,
            resumeBullets: [
              `Architected a modular Java application for ${summary.title} enforcing clean OOP design and input validation.`,
              `Designed and executed a multi-case test driver covering normal, boundary, and negative scenarios.`
            ],
            nextSteps: [
              "Push your code to a public GitHub repository.",
              "Add the repository link to your LinkedIn and developer resume.",
              "Proceed to the next module in your Java learning journey!"
            ]
          },
          scaffoldingCode: `// ${summary.title}\n// Starter Template\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("=== ${summary.title} ===");\n        // TODO: Instantiate and test your classes here\n    }\n}`,
          sampleConsoleRun: `=== ${summary.title} ===\nStatus: Initialized successfully\nExecuting test scenarios...\n✓ All operations completed with expected state.`
        };
      }

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
        isMiniProject: isProjectLesson,
        miniProject: miniProjectData,
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
        const mod = section.modules.find(m => m.slug === resolvedModuleSlug);
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
            const currentModIdx = section.modules.findIndex(m => m.slug === resolvedModuleSlug);
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

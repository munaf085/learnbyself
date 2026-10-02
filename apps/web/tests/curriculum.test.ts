import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('4-Level Curriculum Hierarchy Abstraction', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);

  it('loads language manifest correctly', async () => {
    const languages = await provider.getLanguages();
    expect(languages.length).toBeGreaterThan(0);
    const java = languages.find(l => l.slug === 'java');
    expect(java).toBeDefined();
    expect(java?.isAvailable).toBe(true);
  });

  it('loads full 18-section course roadmap for Java', async () => {
    const course = await provider.getCourse('java');
    expect(course).not.toBeNull();
    expect(course?.slug).toBe('java');
    expect(course?.sections.length).toBe(18);

    const basics = course?.sections.find(s => s.slug === 'basics');
    expect(basics).toBeDefined();
    expect(basics?.isLocked).toBe(false);

    const oop = course?.sections.find(s => s.slug === 'oop');
    expect(oop).toBeDefined();
    expect(oop?.isLocked).toBe(false);

    const collections = course?.sections.find(s => s.slug === 'collections');
    expect(collections).toBeDefined();
    expect(collections?.isLocked).toBe(true);
  });

  it('resolves section and module levels accurately', async () => {
    const section = await provider.getSection('java', 'basics');
    expect(section).not.toBeNull();
    expect(section?.slug).toBe('basics');
    expect(section?.modules.length).toBeGreaterThanOrEqual(1);

    const moduleData = await provider.getModule('java', 'basics', 'getting-started');
    expect(moduleData).not.toBeNull();
    expect(moduleData?.slug).toBe('getting-started');
    expect(moduleData?.lessons.length).toBeGreaterThanOrEqual(2);
  });

  it('resolves hierarchical lesson with module sidebar metadata and navigation pointers', async () => {
    const lesson = await provider.getLesson('java', 'basics', 'getting-started', 'hello-world');
    expect(lesson).not.toBeNull();
    expect(lesson?.slug).toBe('your-first-program');
    expect(lesson?.currentModule).toBeDefined();
    expect(lesson?.currentModule?.title).toBe('Getting Started');
    expect(lesson?.currentModule?.lessons.length).toBe(3);

    // Check that activities exist for step-by-step rendering
    expect(lesson?.activities.length).toBeGreaterThanOrEqual(5);
  });

  it('resolves all 10 legacy Module 01 Getting Started slugs seamlessly via aliases', async () => {
    const legacySlugs = [
      'what-is-java',
      'why-java-platform-independence-and-wora',
      'jdk-jre-and-jvm',
      'installing-java-and-setting-up-ide',
      'your-first-java-program',
      'main-method-explained',
      'compilation-bytecode-execution',
      'java-program-structure',
      'comments-and-documentation',
      'guided-practice-plus-first-bug-hunt'
    ];

    for (const slug of legacySlugs) {
      const lesson = await provider.getLesson('java', 'basics', 'getting-started', slug);
      expect(lesson, `Legacy slug ${slug} should resolve`).not.toBeNull();
      expect(lesson?.activities.length).toBeGreaterThanOrEqual(4);

      const concept = lesson?.activities.find(a => a.type === 'concept');
      const mcq = lesson?.activities.find(a => a.type === 'mcq');
      const checklist = lesson?.activities.find(a => a.type === 'self_evaluation');

      expect(concept, `Legacy slug ${slug} missing concept`).toBeDefined();
      expect(mcq, `Legacy slug ${slug} missing mcq`).toBeDefined();
      expect(checklist, `Legacy slug ${slug} missing checklist`).toBeDefined();
    }
  });

  it('resolves descriptive URL slugs without 404s', async () => {
    const descriptiveSlugs = [
      'what-is-java-and-why-is-it-used',
      'why-does-java-run-on-different-computers',
      'jdk-jre-and-jvm',
      'installing-java-and-running-your-first-program',
      'understanding-your-first-java-program',
      'understanding-main',
      'from-java-to-class-to-running-the-program',
      'java-program-structure-and-basic-syntax',
      'comments-naming-and-clean-java-code',
      'guided-practice-and-first-debugging-challenge'
    ];

    for (const slug of descriptiveSlugs) {
      const lesson = await provider.getLesson('java', 'basics', 'getting-started', slug);
      expect(lesson, `Descriptive slug ${slug} should resolve`).not.toBeNull();

      const concept = lesson?.activities.find(a => a.type === 'concept');
      expect(concept?.breakdown, `Lesson for ${slug} should have concept breakdown`).toBeDefined();
      expect(concept?.breakdown?.whatIsIt.length).toBeGreaterThan(10);
      expect(concept?.breakdown?.whyItMatters.length).toBeGreaterThan(10);
      expect(concept?.breakdown?.howItWorks.length).toBeGreaterThanOrEqual(3);
      expect(concept?.breakdown?.keyTakeaways.length).toBeGreaterThanOrEqual(3);
      expect(concept?.outputSnippet, `Lesson for ${slug} should have output preview`).toBeDefined();
    }
  });

  it('resolves the 3 canonical Getting Started lessons directly from module manifest', async () => {
    const mod = await provider.getModule('java', 'basics', 'getting-started');
    expect(mod).not.toBeNull();
    expect(mod?.lessons.length).toBe(3);

    const expectedSlugs = [
      'java-and-jvm',
      'install-java',
      'your-first-program'
    ];

    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedSlugs);

    for (const slug of expectedSlugs) {
      const lesson = await provider.getLesson('java', 'basics', 'getting-started', slug);
      expect(lesson).not.toBeNull();
      expect(lesson?.slug).toBe(slug);

      // Verify each consolidated lesson has high quality concept, mcq, interview, and checklist
      const concept = lesson?.activities.find(a => a.type === 'concept');
      const mcq = lesson?.activities.find(a => a.type === 'mcq');
      const interview = lesson?.activities.find(a => a.type === 'interview_qa');
      const checklist = lesson?.activities.find(a => a.type === 'self_evaluation');

      expect(concept?.content?.length).toBeGreaterThan(200);
      expect(mcq?.questions?.length).toBe(5); // 5 focused questions
      expect(interview?.interviewQA?.length).toBeGreaterThanOrEqual(2);
      expect(checklist?.checklist?.length).toBeGreaterThanOrEqual(4);

      // Check practice coding task for lesson 3 (your-first-program)
      if (slug === 'your-first-program') {
        const practice = lesson?.activities.find(a => a.practice);
        expect(practice?.practice?.problemStatement?.length).toBeGreaterThan(50);
        expect(practice?.practice?.expectedOutput).toBeDefined();
      }
    }
  });

  it('resolves the 10 canonical Variables & Data Types lessons with full activities', async () => {
    const mod = await provider.getModule('java', 'basics', 'variables-and-data-types');
    expect(mod).not.toBeNull();
    expect(mod?.lessons.length).toBe(10);

    const expectedSlugs = [
      'variables-storing-information',
      'java-data-types',
      'integer-numbers-byte-short-int-long',
      'decimal-numbers-float-double',
      'char-boolean-string',
      'variables-scope-memory',
      'constants-and-final',
      'type-conversion-and-casting',
      'overflow-precision-common-mistakes',
      'variables-data-types-final-challenge'
    ];

    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedSlugs);

    for (const slug of expectedSlugs) {
      const lesson = await provider.getLesson('java', 'basics', 'variables-and-data-types', slug);
      expect(lesson, `Lesson ${slug} should exist`).not.toBeNull();
      expect(lesson?.slug).toBe(slug);

      const concept = lesson?.activities.find(a => a.type === 'concept');
      const mcq = lesson?.activities.find(a => a.type === 'mcq');
      const practice = lesson?.activities.find(a => a.practice);
      const interview = lesson?.activities.find(a => a.type === 'interview_qa');
      const checklist = lesson?.activities.find(a => a.type === 'self_evaluation');

      expect(concept?.content?.length, `${slug} must have substantial concept content`).toBeGreaterThan(150);
      expect(mcq?.questions?.length, `${slug} must have exactly 5 MCQs`).toBe(5);
      expect(practice?.practice, `${slug} must have hands-on practice`).toBeDefined();
      expect(practice?.practice?.expectedOutput, `${slug} must have expectedOutput`).toBeDefined();
      expect(interview?.interviewQA?.length, `${slug} must have between 5 and 12 interview questions`).toBeGreaterThanOrEqual(5);
      expect(interview?.interviewQA?.length).toBeLessThanOrEqual(12);
      expect(lesson?.practiceProblems?.length, `${slug} must have 5 self-paced practice problems`).toBe(5);
      expect(checklist?.checklist?.length, `${slug} must have checklist`).toBeGreaterThanOrEqual(3);
    }
  });

  it('resolves legacy Module 02 skeleton slugs to canonical lessons via aliases', async () => {
    const legacyMap: Record<string, string> = {
      'what-is-a-variable': 'variables-storing-information',
      'primitive-vs-reference-types': 'java-data-types',
      'byte-short-int-long': 'integer-numbers-byte-short-int-long',
      'floating-point-numbers-float-and-double': 'decimal-numbers-float-double',
      'char-data-type-and-unicode': 'char-boolean-string',
      'variable-scope-and-lifetime': 'variables-scope-memory',
      'constants-and-the-final-keyword': 'constants-and-final',
      'type-conversion-widening-casting': 'type-conversion-and-casting',
      'overflow-and-underflow-gotchas': 'overflow-precision-common-mistakes',
      'mini-project-variable-mastery-challenge': 'variables-data-types-final-challenge'
    };

    for (const [legacySlug, expectedCanonical] of Object.entries(legacyMap)) {
      const lesson = await provider.getLesson('java', 'basics', 'variables-and-data-types', legacySlug);
      expect(lesson, `Legacy slug ${legacySlug} should resolve`).not.toBeNull();
      expect(lesson?.slug).toBe(expectedCanonical);
    }
  });

  it('resolves the 10 canonical Operators lessons with full activities', async () => {
    const mod = await provider.getModule('java', 'basics', 'operators');
    expect(mod).not.toBeNull();
    expect(mod?.lessons.length).toBe(10);

    const expectedSlugs = [
      'arithmetic-operators-doing-calculations',
      'assignment-and-compound-assignment',
      'relational-and-equality-operators',
      'logical-operators-and-or-not',
      'increment-and-decrement',
      'short-circuit-evaluation',
      'ternary-operator',
      'operator-precedence-and-expression-evaluation',
      'bitwise-and-shift-operators',
      'operators-final-challenge'
    ];

    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedSlugs);

    for (const slug of expectedSlugs) {
      const lesson = await provider.getLesson('java', 'basics', 'operators', slug);
      expect(lesson, `Lesson ${slug} should exist`).not.toBeNull();
      expect(lesson?.slug).toBe(slug);

      const concept = lesson?.activities.find(a => a.type === 'concept');
      const mcq = lesson?.activities.find(a => a.type === 'mcq');
      const practice = lesson?.activities.find(a => a.practice);
      const interview = lesson?.activities.find(a => a.type === 'interview_qa');
      const checklist = lesson?.activities.find(a => a.type === 'self_evaluation');

      expect(concept?.content?.length, `${slug} must have substantial concept content`).toBeGreaterThan(150);
      expect(mcq?.questions?.length, `${slug} must have at least 5 MCQs`).toBeGreaterThanOrEqual(5);
      expect(practice?.practice, `${slug} must have hands-on practice`).toBeDefined();
      expect(practice?.practice?.expectedOutput, `${slug} must have expectedOutput`).toBeDefined();
      expect(interview?.interviewQA?.length, `${slug} must have between 5 and 12 interview questions`).toBeGreaterThanOrEqual(5);
      expect(interview?.interviewQA?.length).toBeLessThanOrEqual(12);
      expect(lesson?.practiceProblems?.length, `${slug} must have 5 self-paced practice problems`).toBe(5);
      expect(checklist?.checklist?.length, `${slug} must have checklist`).toBeGreaterThanOrEqual(3);
    }
  });

  it('resolves legacy Module 03 skeleton slugs to canonical lessons via aliases', async () => {
    const legacyMap: Record<string, string> = {
      'arithmetic-operators': 'arithmetic-operators-doing-calculations',
      'assignment-operators': 'assignment-and-compound-assignment',
      'relational-operators': 'relational-and-equality-operators',
      'equality-operators': 'relational-and-equality-operators',
      'logical-operators': 'logical-operators-and-or-not',
      'unary-operators': 'increment-and-decrement',
      'increment-or-decrement-pitfalls': 'increment-and-decrement',
      'short-circuit-evaluation': 'short-circuit-evaluation',
      'ternary-operator': 'ternary-operator',
      'operator-precedence': 'operator-precedence-and-expression-evaluation',
      'expression-evaluation': 'operator-precedence-and-expression-evaluation',
      'bitwise-operators': 'bitwise-and-shift-operators',
      'shift-operators': 'bitwise-and-shift-operators'
    };

    for (const [legacySlug, expectedCanonical] of Object.entries(legacyMap)) {
      const lesson = await provider.getLesson('java', 'basics', 'operators', legacySlug);
      expect(lesson, `Legacy slug ${legacySlug} should resolve`).not.toBeNull();
      expect(lesson?.slug).toBe(expectedCanonical);
    }
  });

  it('resolves the 8 canonical Input & Output lessons with full activities', async () => {
    const mod = await provider.getModule('java', 'basics', 'input-and-output');
    expect(mod).not.toBeNull();
    expect(mod?.lessons.length).toBe(8);

    const expectedSlugs = [
      'printing-output-in-java',
      'formatting-output',
      'reading-input-with-scanner',
      'reading-numbers-text-and-characters',
      'next-vs-nextline',
      'common-scanner-mistakes',
      'input-and-output-practice',
      'input-and-output-final-challenge'
    ];

    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedSlugs);

    for (const slug of expectedSlugs) {
      const lesson = await provider.getLesson('java', 'basics', 'input-and-output', slug);
      expect(lesson, `Lesson ${slug} should exist`).not.toBeNull();
      expect(lesson?.slug).toBe(slug);

      const concept = lesson?.activities.find(a => a.type === 'concept');
      const mcq = lesson?.activities.find(a => a.type === 'mcq');
      const practice = lesson?.activities.find(a => a.practice);
      const interview = lesson?.activities.find(a => a.type === 'interview_qa');
      const checklist = lesson?.activities.find(a => a.type === 'self_evaluation');

      expect(concept?.content?.length, `${slug} must have substantial concept content`).toBeGreaterThan(150);
      expect(mcq?.questions?.length, `${slug} must have at least 7 MCQs`).toBeGreaterThanOrEqual(7);
      expect(practice?.practice, `${slug} must have hands-on practice`).toBeDefined();
      expect(practice?.practice?.expectedOutput, `${slug} must have expectedOutput`).toBeDefined();
      expect(interview?.interviewQA?.length, `${slug} must have between 5 and 12 interview questions`).toBeGreaterThanOrEqual(5);
      expect(interview?.interviewQA?.length).toBeLessThanOrEqual(12);
      expect(lesson?.practiceProblems?.length, `${slug} must have at least 5 self-paced practice problems`).toBeGreaterThanOrEqual(5);
      expect(checklist?.checklist?.length, `${slug} must have checklist`).toBeGreaterThanOrEqual(3);
    }
  });

  it('resolves legacy Module 04 slugs via aliases', async () => {
    const legacyMap: Record<string, string> = {
      'reading-different-types-of-input': 'reading-numbers-text-and-characters',
      'print-vs-println': 'printing-output-in-java',
      'printf-and-format-specifiers': 'formatting-output',
      'scanner-basics': 'reading-input-with-scanner',
      'scanner-newline-issue': 'next-vs-nextline',
      'scanner-pitfalls': 'common-scanner-mistakes',
      'input-output-practice': 'input-and-output-practice',
      'io-final-challenge': 'input-and-output-final-challenge'
    };

    for (const [legacySlug, expectedCanonical] of Object.entries(legacyMap)) {
      const lesson = await provider.getLesson('java', 'basics', 'input-and-output', legacySlug);
      expect(lesson, `Legacy slug ${legacySlug} should resolve`).not.toBeNull();
      expect(lesson?.slug).toBe(expectedCanonical);
    }
  });

  it('resolves the 10 canonical Conditional Statements lessons with full activities', async () => {
    const mod = await provider.getModule('java', 'basics', 'conditional-statements');
    expect(mod).not.toBeNull();
    expect(mod?.lessons.length).toBe(10);

    const expectedSlugs = [
      'thinking-in-conditions',
      'if-and-if-else',
      'else-if-and-multiple-conditions',
      'nested-conditions',
      'logical-conditions',
      'switch-statements',
      'modern-switch-expressions',
      'conditional-bugs-and-output-prediction',
      'conditional-practice',
      'conditional-statements-final-challenge'
    ];

    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedSlugs);

    for (const slug of expectedSlugs) {
      const lesson = await provider.getLesson('java', 'basics', 'conditional-statements', slug);
      expect(lesson, `Lesson ${slug} should exist`).not.toBeNull();
      expect(lesson?.slug).toBe(slug);

      const concept = lesson?.activities.find(a => a.type === 'concept');
      const mcq = lesson?.activities.find(a => a.type === 'mcq');
      const practice = lesson?.activities.find(a => a.practice);
      const interview = lesson?.activities.find(a => a.type === 'interview_qa');
      const checklist = lesson?.activities.find(a => a.type === 'self_evaluation');

      expect(concept?.content?.length, `${slug} must have substantial concept content`).toBeGreaterThan(150);
      expect(mcq?.questions?.length, `${slug} must have at least 7 MCQs`).toBeGreaterThanOrEqual(7);
      expect(practice?.practice, `${slug} must have hands-on practice`).toBeDefined();
      expect(practice?.practice?.expectedOutput, `${slug} must have expectedOutput`).toBeDefined();
      expect(interview?.interviewQA?.length, `${slug} must have between 5 and 12 interview questions`).toBeGreaterThanOrEqual(5);
      expect(interview?.interviewQA?.length).toBeLessThanOrEqual(12);
      expect(lesson?.practiceProblems?.length, `${slug} must have at least 5 self-paced practice problems`).toBeGreaterThanOrEqual(5);
      expect(checklist?.checklist?.length, `${slug} must have checklist`).toBeGreaterThanOrEqual(3);
    }
  });

  it('resolves legacy Module 05 slugs via aliases', async () => {
    const legacyMap: Record<string, string> = {
      'if-statements': 'if-and-if-else',
      'if-else': 'if-and-if-else',
      'else-if-ladder': 'else-if-and-multiple-conditions',
      'nested-if': 'nested-conditions',
      'logical-operators-in-conditions': 'logical-conditions',
      'switch': 'switch-statements',
      'switch-case': 'switch-statements',
      'switch-expressions': 'modern-switch-expressions',
      'conditional-bugs': 'conditional-bugs-and-output-prediction',
      'conditions-practice': 'conditional-practice',
      'conditional-final-challenge': 'conditional-statements-final-challenge'
    };

    for (const [legacySlug, expectedCanonical] of Object.entries(legacyMap)) {
      const lesson = await provider.getLesson('java', 'basics', 'conditional-statements', legacySlug);
      expect(lesson, `Legacy slug ${legacySlug} should resolve`).not.toBeNull();
      expect(lesson?.slug).toBe(expectedCanonical);
    }
  });

  it('resolves the 10 canonical Loops lessons with full activities', async () => {
    const mod = await provider.getModule('java', 'basics', 'loops');
    expect(mod).not.toBeNull();
    expect(mod?.lessons.length).toBe(10);

    const expectedSlugs = [
      'why-loops',
      'for-loop',
      'while-and-do-while',
      'understanding-loop-flow',
      'counters-and-accumulators',
      'nested-loops',
      'break-and-continue',
      'infinite-loops-and-common-bugs',
      'pattern-and-number-problems',
      'loops-practice-and-final-challenge'
    ];

    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedSlugs);

    for (const slug of expectedSlugs) {
      const lesson = await provider.getLesson('java', 'basics', 'loops', slug);
      expect(lesson, `Lesson ${slug} should exist`).not.toBeNull();
      expect(lesson?.slug).toBe(slug);

      const concept = lesson?.activities.find(a => a.type === 'concept');
      const mcq = lesson?.activities.find(a => a.type === 'mcq');
      const practice = lesson?.activities.find(a => a.practice);
      const interview = lesson?.activities.find(a => a.type === 'interview_qa');
      const checklist = lesson?.activities.find(a => a.type === 'self_evaluation');

      expect(concept?.content?.length, `${slug} must have substantial concept content`).toBeGreaterThan(150);
      expect(mcq?.questions?.length, `${slug} must have at least 7 MCQs`).toBeGreaterThanOrEqual(7);
      expect(practice?.practice, `${slug} must have hands-on practice`).toBeDefined();
      expect(practice?.practice?.expectedOutput, `${slug} must have expectedOutput`).toBeDefined();
      expect(interview?.interviewQA?.length, `${slug} must have between 5 and 12 interview questions`).toBeGreaterThanOrEqual(5);
      expect(interview?.interviewQA?.length).toBeLessThanOrEqual(12);
      expect(lesson?.practiceProblems?.length, `${slug} must have at least 5 self-paced practice problems`).toBeGreaterThanOrEqual(5);
      expect(checklist?.checklist?.length, `${slug} must have checklist`).toBeGreaterThanOrEqual(3);
    }
  });

  it('resolves legacy Module 06 slugs via aliases', async () => {
    const legacyMap: Record<string, string> = {
      'for-loops': 'for-loop',
      'while-loops': 'while-and-do-while',
      'do-while': 'while-and-do-while',
      'break-continue': 'break-and-continue',
      'nested-loop': 'nested-loops',
      'loop-bugs': 'infinite-loops-and-common-bugs',
      'infinite-loops': 'infinite-loops-and-common-bugs',
      'patterns': 'pattern-and-number-problems',
      'loop-practice': 'loops-practice-and-final-challenge',
      'loops-final-challenge': 'loops-practice-and-final-challenge'
    };

    for (const [legacySlug, expectedCanonical] of Object.entries(legacyMap)) {
      const lesson = await provider.getLesson('java', 'basics', 'loops', legacySlug);
      expect(lesson, `Legacy slug ${legacySlug} should resolve`).not.toBeNull();
      expect(lesson?.slug).toBe(expectedCanonical);
    }
  });

  it('resolves the 12 canonical Methods lessons with full activities', async () => {
    const mod = await provider.getModule('java', 'basics', 'methods');
    expect(mod).not.toBeNull();
    expect(mod?.lessons.length).toBe(12);

    const expectedSlugs = [
      'why-methods',
      'method-anatomy',
      'parameters-and-arguments',
      'return-values-and-void',
      'calling-methods-and-scope',
      'local-variables-and-method-memory',
      'static-methods',
      'method-overloading',
      'pass-by-value-in-java',
      'recursion-basics',
      'method-bugs-and-output-prediction',
      'methods-practice-and-interview-challenge'
    ];

    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedSlugs);

    for (const slug of expectedSlugs) {
      const lesson = await provider.getLesson('java', 'basics', 'methods', slug);
      expect(lesson, `Lesson ${slug} should exist`).not.toBeNull();
      expect(lesson?.slug).toBe(slug);

      const concept = lesson?.activities.find(a => a.type === 'concept');
      const mcq = lesson?.activities.find(a => a.type === 'mcq');
      const practice = lesson?.activities.find(a => a.practice);
      const interview = lesson?.activities.find(a => a.type === 'interview_qa');
      const checklist = lesson?.activities.find(a => a.type === 'self_evaluation');

      expect(concept?.content?.length, `${slug} must have substantial concept content`).toBeGreaterThan(150);
      expect(mcq?.questions?.length, `${slug} must have at least 7 MCQs`).toBeGreaterThanOrEqual(7);
      expect(practice?.practice, `${slug} must have hands-on practice`).toBeDefined();
      expect(practice?.practice?.expectedOutput, `${slug} must have expectedOutput`).toBeDefined();
      expect(interview?.interviewQA?.length, `${slug} must have between 5 and 12 interview questions`).toBeGreaterThanOrEqual(5);
      expect(interview?.interviewQA?.length).toBeLessThanOrEqual(12);
      expect(lesson?.practiceProblems?.length, `${slug} must have at least 5 self-paced practice problems`).toBeGreaterThanOrEqual(5);
      expect(checklist?.checklist?.length, `${slug} must have checklist`).toBeGreaterThanOrEqual(3);
    }
  });

  it('resolves legacy Module 07 slugs via aliases', async () => {
    const legacyMap: Record<string, string> = {
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

    for (const [legacySlug, expectedCanonical] of Object.entries(legacyMap)) {
      const lesson = await provider.getLesson('java', 'basics', 'methods', legacySlug);
      expect(lesson, `Legacy slug ${legacySlug} should resolve`).not.toBeNull();
      expect(lesson?.slug).toBe(expectedCanonical);
    }
  });

  it('resolves the 12 canonical Arrays lessons with full activities', async () => {
    const mod = await provider.getModule('java', 'basics', 'arrays');
    expect(mod).not.toBeNull();
    expect(mod?.lessons.length).toBe(12);

    const expectedSlugs = [
      'what-is-an-array',
      'creating-and-initializing-arrays',
      'array-indexing-and-access',
      'traversing-arrays',
      'enhanced-for-loop',
      'common-array-operations',
      'updating-copying-and-comparing-arrays',
      'the-arrays-utility-class',
      'multidimensional-arrays',
      'array-bugs-and-output-prediction',
      'array-practice',
      'arrays-final-challenge'
    ];

    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedSlugs);

    for (const slug of expectedSlugs) {
      const lesson = await provider.getLesson('java', 'basics', 'arrays', slug);
      expect(lesson, `Lesson ${slug} should exist`).not.toBeNull();
      expect(lesson?.slug).toBe(slug);

      const concept = lesson?.activities.find(a => a.type === 'concept');
      const mcq = lesson?.activities.find(a => a.type === 'mcq');
      const practice = lesson?.activities.find(a => a.practice);
      const interview = lesson?.activities.find(a => a.type === 'interview_qa');
      const checklist = lesson?.activities.find(a => a.type === 'self_evaluation');

      expect(concept?.content?.length, `${slug} must have substantial concept content`).toBeGreaterThan(150);
      expect(mcq?.questions?.length, `${slug} must have at least 8 MCQs`).toBeGreaterThanOrEqual(8);
      expect(practice?.practice, `${slug} must have hands-on practice`).toBeDefined();
      expect(practice?.practice?.expectedOutput, `${slug} must have expectedOutput`).toBeDefined();
      expect(interview?.interviewQA?.length, `${slug} must have between 5 and 12 interview questions`).toBeGreaterThanOrEqual(5);
      expect(interview?.interviewQA?.length).toBeLessThanOrEqual(12);
      expect(lesson?.practiceProblems?.length, `${slug} must have at least 6 self-paced practice problems`).toBeGreaterThanOrEqual(6);
      
      // Ensure all self-paced practice problems have both problemStatement and description
      for (const prob of lesson?.practiceProblems || []) {
        expect(prob.problemStatement || prob.description, `${slug} problem ${prob.id} must have description/problemStatement`).toBeDefined();
      }

      expect(checklist?.checklist?.length, `${slug} must have checklist`).toBeGreaterThanOrEqual(3);
    }
  });

  it('resolves legacy Module 08 slugs via aliases', async () => {
    const legacyMap: Record<string, string> = {
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
      'arrays-practice-and-interview-challenge': 'arrays-final-challenge'
    };

    for (const [legacySlug, expectedCanonical] of Object.entries(legacyMap)) {
      const lesson = await provider.getLesson('java', 'basics', 'arrays', legacySlug);
      expect(lesson, `Legacy slug ${legacySlug} should resolve`).not.toBeNull();
      expect(lesson?.slug).toBe(expectedCanonical);
    }
  });

  it('resolves the 14 canonical Strings lessons with full activities', async () => {
    const mod = await provider.getModule('java', 'basics', 'strings');
    expect(mod).not.toBeNull();
    expect(mod?.lessons.length).toBe(14);

    const expectedSlugs = [
      'what-is-a-string',
      'string-creation-and-literals',
      'string-immutability',
      'string-pool-and-memory',
      'string-equals-vs-double-equals',
      'essential-string-methods',
      'string-transformation-methods',
      'splitting-joining-and-parsing',
      'string-concatenation',
      'stringbuilder',
      'stringbuffer-and-stringbuilder',
      'string-performance-and-common-bugs',
      'string-practice',
      'strings-final-challenge'
    ];

    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedSlugs);

    for (const slug of expectedSlugs) {
      const lesson = await provider.getLesson('java', 'basics', 'strings', slug);
      expect(lesson, `Lesson ${slug} should exist`).not.toBeNull();
      expect(lesson?.slug).toBe(slug);

      const concept = lesson?.activities.find(a => a.type === 'concept');
      const mcq = lesson?.activities.find(a => a.type === 'mcq');
      const practice = lesson?.activities.find(a => a.practice);
      const interview = lesson?.activities.find(a => a.type === 'interview_qa');
      const checklist = lesson?.activities.find(a => a.type === 'self_evaluation');

      expect(concept?.content?.length, `${slug} must have substantial concept content`).toBeGreaterThan(150);
      expect(mcq?.questions?.length, `${slug} must have at least 8 MCQs`).toBeGreaterThanOrEqual(8);
      expect(practice?.practice, `${slug} must have hands-on practice`).toBeDefined();
      expect(practice?.practice?.expectedOutput, `${slug} must have expectedOutput`).toBeDefined();
      expect(interview?.interviewQA?.length, `${slug} must have between 5 and 15 interview questions`).toBeGreaterThanOrEqual(5);
      expect(interview?.interviewQA?.length).toBeLessThanOrEqual(15);
      expect(lesson?.practiceProblems?.length, `${slug} must have at least 6 self-paced practice problems`).toBeGreaterThanOrEqual(6);
      
      // Ensure all self-paced practice problems have both problemStatement and description
      for (const prob of lesson?.practiceProblems || []) {
        expect(prob.problemStatement || prob.description, `${slug} problem ${prob.id} must have description/problemStatement`).toBeDefined();
      }

      expect(checklist?.checklist?.length, `${slug} must have checklist`).toBeGreaterThanOrEqual(3);
    }
  });

  it('resolves legacy Module 09 slugs via aliases', async () => {
    const legacyMap: Record<string, string> = {
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
      'strings-practice-and-interview-challenge': 'strings-final-challenge'
    };

    for (const [legacySlug, expectedCanonical] of Object.entries(legacyMap)) {
      const lesson = await provider.getLesson('java', 'basics', 'strings', legacySlug);
      expect(lesson, `Legacy slug ${legacySlug} should resolve`).not.toBeNull();
      expect(lesson?.slug).toBe(expectedCanonical);
    }
  });
  it('resolves the 10 canonical Exception Basics lessons with full activities', async () => {
    const mod = await provider.getModule('java', 'basics', 'exception-basics');
    expect(mod).not.toBeNull();
    expect(mod?.lessons.length).toBe(10);

    const expectedSlugs = [
      'what-are-exceptions',
      'errors-vs-exceptions',
      'exception-hierarchy',
      'try-catch-finally',
      'multiple-catch-and-exception-flow',
      'throw-and-throws',
      'checked-vs-unchecked-exceptions',
      'common-java-exceptions',
      'custom-exceptions-and-debugging',
      'exceptions-practice-and-interview-challenge'
    ];

    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedSlugs);

    for (const slug of expectedSlugs) {
      const lesson = await provider.getLesson('java', 'basics', 'exception-basics', slug);
      expect(lesson, `Lesson ${slug} should exist`).not.toBeNull();
      expect(lesson?.slug).toBe(slug);

      const concept = lesson?.activities.find(a => a.type === 'concept');
      const mcq = lesson?.activities.find(a => a.type === 'mcq');
      const practice = lesson?.activities.find(a => a.practice);
      const interview = lesson?.activities.find(a => a.type === 'interview_qa');
      const checklist = lesson?.activities.find(a => a.type === 'self_evaluation');

      expect(concept?.content?.length, `${slug} must have substantial concept content`).toBeGreaterThan(150);
      expect(mcq?.questions?.length, `${slug} must have at least 8 MCQs`).toBeGreaterThanOrEqual(8);
      expect(practice?.practice, `${slug} must have hands-on practice`).toBeDefined();
      expect(practice?.practice?.expectedOutput, `${slug} must have expectedOutput`).toBeDefined();
      expect(interview?.interviewQA?.length, `${slug} must have between 5 and 15 interview questions`).toBeGreaterThanOrEqual(5);
      expect(interview?.interviewQA?.length).toBeLessThanOrEqual(15);
      expect(lesson?.practiceProblems?.length, `${slug} must have at least 6 self-paced practice problems`).toBeGreaterThanOrEqual(6);
      
      for (const prob of lesson?.practiceProblems || []) {
        expect(prob.problemStatement || prob.description, `${slug} problem ${prob.id} must have description/problemStatement`).toBeDefined();
      }

      expect(checklist?.checklist?.length, `${slug} must have checklist`).toBeGreaterThanOrEqual(3);
    }
  });

  it('resolves legacy Module 10 slugs via aliases', async () => {
    const legacyMap: Record<string, string> = {
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
      'exceptions-final-challenge': 'exceptions-practice-and-interview-challenge'
    };

    for (const [legacySlug, expectedCanonical] of Object.entries(legacyMap)) {
      const lesson = await provider.getLesson('java', 'basics', 'exception-basics', legacySlug);
      expect(lesson, `Legacy slug ${legacySlug} should resolve`).not.toBeNull();
      expect(lesson?.slug).toBe(expectedCanonical);
    }
  });

  it('resolves the 8 canonical Packages & Access Control lessons with full activities', async () => {
    const mod = await provider.getModule('java', 'basics', 'packages-and-access-control');
    expect(mod).not.toBeNull();
    expect(mod?.lessons.length).toBe(8);

    const expectedSlugs = [
      'why-packages',
      'creating-and-using-packages',
      'import-and-fully-qualified-names',
      'access-modifiers',
      'public-private-and-package-private',
      'protected-and-cross-package-access',
      'naming-and-project-organization',
      'packages-practice-and-interview-challenge'
    ];

    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedSlugs);

    for (const slug of expectedSlugs) {
      const lesson = await provider.getLesson('java', 'basics', 'packages-and-access-control', slug);
      expect(lesson, `Lesson ${slug} should exist`).not.toBeNull();
      expect(lesson?.slug).toBe(slug);

      const concept = lesson?.activities.find(a => a.type === 'concept');
      const mcq = lesson?.activities.find(a => a.type === 'mcq');
      const practice = lesson?.activities.find(a => a.practice);
      const interview = lesson?.activities.find(a => a.type === 'interview_qa');
      const checklist = lesson?.activities.find(a => a.type === 'self_evaluation');

      expect(concept?.content?.length, `${slug} must have substantial concept content`).toBeGreaterThan(150);
      expect(mcq?.questions?.length, `${slug} must have at least 8 MCQs`).toBeGreaterThanOrEqual(8);
      expect(practice?.practice, `${slug} must have hands-on practice`).toBeDefined();
      expect(practice?.practice?.expectedOutput, `${slug} must have expectedOutput`).toBeDefined();
      expect(interview?.interviewQA?.length, `${slug} must have between 5 and 15 interview questions`).toBeGreaterThanOrEqual(5);
      expect(interview?.interviewQA?.length).toBeLessThanOrEqual(15);
      expect(lesson?.practiceProblems?.length, `${slug} must have at least 6 self-paced practice problems`).toBeGreaterThanOrEqual(6);
      
      for (const prob of lesson?.practiceProblems || []) {
        expect(prob.problemStatement || prob.description, `${slug} problem ${prob.id} must have description/problemStatement`).toBeDefined();
      }

      expect(checklist?.checklist?.length, `${slug} must have checklist`).toBeGreaterThanOrEqual(3);
    }
  });

  it('resolves legacy Module 11 slugs via aliases', async () => {
    const legacyMap: Record<string, string> = {
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
      'packages-final-challenge': 'packages-practice-and-interview-challenge'
    };

    for (const [legacySlug, expectedCanonical] of Object.entries(legacyMap)) {
      const lesson = await provider.getLesson('java', 'basics', 'packages-and-access-control', legacySlug);
      expect(lesson, `Legacy slug ${legacySlug} should resolve`).not.toBeNull();
      expect(lesson?.slug).toBe(expectedCanonical);
    }
  });
});

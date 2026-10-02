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
});

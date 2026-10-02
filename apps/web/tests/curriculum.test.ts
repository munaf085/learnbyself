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
});


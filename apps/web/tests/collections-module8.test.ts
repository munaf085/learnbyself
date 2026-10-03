import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java Collections - Module 8: Collections Projects & Capstone', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);

  const sectionSlug = 'collections';
  const moduleSlug = 'collections-mini-projects-and-capstone';
  const expectedProjects = [
    'guided-build-in-memory-lru-cache-engine',
    'guided-build-university-course-ranker-and-waiting-list',
    'guided-build-ecommerce-shopping-cart-and-product-catalog',
    'guided-build-generic-rule-engine-and-filter-pipeline',
    'capstone-in-memory-stock-trading-and-order-matching-engine'
  ];

  it('verifies Module 8 exists with exactly 5 portfolio projects in correct progression order', async () => {
    const course = await provider.getCourse('java');
    const section = course?.sections.find(s => s.slug === sectionSlug);
    const mod = section?.modules.find(m => m.slug === moduleSlug);

    expect(mod).toBeDefined();
    expect(mod?.title).toBe('08. Collections Projects & Capstone');
    expect(mod?.lessons.length).toBe(5);
    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedProjects);
  });

  it('verifies all 5 projects resolve with isMiniProject: true and full GitHub studio metadata', async () => {
    for (const slug of expectedProjects) {
      const lesson = await provider.getLesson('java', sectionSlug, moduleSlug, slug);
      expect(lesson, `Project ${slug} must be resolved by curriculum provider`).not.toBeNull();
      expect(lesson?.isMiniProject).toBe(true);

      const mp = lesson?.miniProject;
      expect(mp, `Project ${slug} must have miniProject data`).toBeDefined();
      expect(mp?.slug).toBe(slug);
      expect(mp?.title).toBe(lesson?.title);

      // Project brief
      expect(mp?.projectBrief.problemItSolves.length, `${slug} problemItSolves`).toBeGreaterThanOrEqual(20);
      expect(mp?.projectBrief.whatAreWeBuilding.length, `${slug} whatAreWeBuilding`).toBeGreaterThanOrEqual(20);
      expect(mp?.projectBrief.finishedAppDescription.length, `${slug} finishedAppDescription`).toBeGreaterThanOrEqual(20);
      expect(mp?.projectBrief.javaFundamentals.length, `${slug} javaFundamentals`).toBeGreaterThanOrEqual(4);
      expect(mp?.projectBrief.motivatingQuote.length, `${slug} motivatingQuote`).toBeGreaterThanOrEqual(10);

      // Real world scenario
      expect(mp?.realWorldScenario.headline.length, `${slug} scenario headline`).toBeGreaterThanOrEqual(10);
      expect(mp?.realWorldScenario.story.length, `${slug} scenario story`).toBeGreaterThanOrEqual(50);
      expect(mp?.realWorldScenario.context.length, `${slug} scenario context`).toBeGreaterThanOrEqual(20);

      // Requirements
      expect(mp?.requirements.functional.length, `${slug} functional reqs`).toBeGreaterThanOrEqual(4);
      expect(mp?.requirements.technicalConstraints.length, `${slug} technicalConstraints`).toBeGreaterThanOrEqual(3);
      expect(mp?.requirements.userDecisions.length, `${slug} userDecisions`).toBeGreaterThanOrEqual(2);

      // Before you code
      expect(mp?.beforeYouCode.inputsRequired.length, `${slug} inputsRequired`).toBeGreaterThanOrEqual(2);
      expect(mp?.beforeYouCode.outputsRequired.length, `${slug} outputsRequired`).toBeGreaterThanOrEqual(2);
      expect(mp?.beforeYouCode.variablesNeeded.length, `${slug} variablesNeeded`).toBeGreaterThanOrEqual(3);
      expect(mp?.beforeYouCode.conditionalLogic.length, `${slug} conditionalLogic`).toBeGreaterThanOrEqual(2);
      expect(mp?.beforeYouCode.loopStructures.length, `${slug} loopStructures`).toBeGreaterThanOrEqual(1);
      expect(mp?.beforeYouCode.recommendedMethods.length, `${slug} recommendedMethods`).toBeGreaterThanOrEqual(3);

      // Build roadmap
      expect(mp?.buildRoadmap.length, `${slug} buildRoadmap milestones`).toBeGreaterThanOrEqual(4);
      for (const milestone of mp!.buildRoadmap) {
        expect(milestone.milestoneNumber).toBeGreaterThan(0);
        expect(milestone.title.length).toBeGreaterThan(3);
        expect(milestone.objective.length).toBeGreaterThan(10);
        expect(milestone.tasks.length).toBeGreaterThanOrEqual(2);
        expect(milestone.acceptanceCriteria.length).toBeGreaterThanOrEqual(1);
      }

      // Think before you code & hints
      expect(mp?.thinkBeforeYouCode.length, `${slug} thinkBeforeYouCode`).toBeGreaterThanOrEqual(3);
      for (const t of mp!.thinkBeforeYouCode) {
        expect(t.question.length).toBeGreaterThan(10);
        expect(t.mentorInsight.length).toBeGreaterThan(15);
      }

      expect(mp?.hintSystem.length, `${slug} hintSystem`).toBeGreaterThanOrEqual(2);
      for (const h of mp!.hintSystem) {
        expect(h.topic.length).toBeGreaterThan(3);
        expect(h.level1Conceptual.length).toBeGreaterThan(10);
        expect(h.level2Implementation.length).toBeGreaterThan(10);
        expect(h.level3JavaSyntax.length).toBeGreaterThan(10);
      }

      // Test cases
      expect(mp?.testYourProject.normalCases.length, `${slug} normalCases`).toBeGreaterThanOrEqual(2);
      expect(mp?.testYourProject.boundaryCases.length, `${slug} boundaryCases`).toBeGreaterThanOrEqual(2);
      expect(mp?.testYourProject.invalidInputCases.length, `${slug} invalidInputCases`).toBeGreaterThanOrEqual(2);
      expect(mp?.testYourProject.edgeCases.length, `${slug} edgeCases`).toBeGreaterThanOrEqual(1);

      // Debugging and polish
      expect(mp?.debuggingGuide.length, `${slug} debuggingGuide`).toBeGreaterThanOrEqual(3);
      expect(mp?.projectPolish.length, `${slug} projectPolish`).toBeGreaterThanOrEqual(2);

      // GitHub Portfolio Ready
      expect(mp?.gitHubReady.readmeTemplate, `${slug} readmeTemplate`).toBeDefined();
      expect(mp?.gitHubReady.suggestedReadme, `${slug} suggestedReadme`).toBeDefined();
      expect(mp?.gitHubReady.readmeTemplate).toContain('# ');
      expect(mp?.gitHubReady.readmeTemplate).toContain('## How to Run');
      expect(mp?.gitHubReady.gitCommands.length, `${slug} gitCommands`).toBeGreaterThanOrEqual(5);

      const gitCmds = mp!.gitHubReady.gitCommands.map(c => c.command);
      expect(gitCmds.some(c => c.startsWith('git init')), `${slug} must include git init`).toBe(true);
      expect(gitCmds.some(c => c.startsWith('git add')), `${slug} must include git add`).toBe(true);
      expect(gitCmds.some(c => c.startsWith('git commit')), `${slug} must include git commit`).toBe(true);
      expect(gitCmds.some(c => c.startsWith('git push')), `${slug} must include git push`).toBe(true);

      // Portfolio checklist & Explain your project
      expect(mp?.portfolioChecklist.length, `${slug} portfolioChecklist`).toBeGreaterThanOrEqual(6);
      expect(mp?.explainYourProject.length, `${slug} explainYourProject`).toBeGreaterThanOrEqual(3);

      // Scaffolding & sample run
      expect(mp?.scaffoldingCode.length, `${slug} scaffoldingCode`).toBeGreaterThanOrEqual(50);
      expect(mp?.sampleConsoleRun.length, `${slug} sampleConsoleRun`).toBeGreaterThanOrEqual(50);
    }
  });

  it('verifies all 5 projects contain 6 full activities and 5 practice problems', async () => {
    for (const slug of expectedProjects) {
      const lesson = await provider.getLesson('java', sectionSlug, moduleSlug, slug);
      expect(lesson).not.toBeNull();
      expect(lesson?.activities.length).toBe(6);

      const types = lesson?.activities.map(a => a.type);
      expect(types).toContain('analogy');
      expect(types).toContain('concept');
      expect(types).toContain('code_walkthrough');
      expect(types).toContain('mcq');
      expect(types).toContain('interview_qa');
      expect(types).toContain('self_evaluation');

      expect(lesson?.practiceProblems).toBeDefined();
      expect(lesson?.practiceProblems!.length).toBe(5);

      for (const p of lesson!.practiceProblems!) {
        expect(p.problemStatement.length).toBeGreaterThan(20);
        expect(p.expectedOutput.length).toBeGreaterThan(0);
        expect(p.solutionCode.length).toBeGreaterThan(20);
      }
    }
  });

  it('verifies Project 1 covers LinkedHashMap access-order, removeEldestEntry, and TTL', async () => {
    const p1 = await provider.getLesson('java', sectionSlug, moduleSlug, 'guided-build-in-memory-lru-cache-engine');
    expect(p1?.title).toContain('LRU Cache');
    const concept = p1?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('LinkedHashMap');
    expect(concept?.content).toContain('accessOrder');
    expect(concept?.content).toContain('removeEldestEntry');
  });

  it('verifies Project 2 covers TreeSet merit ranking, PriorityQueue waitlist, and tie-breaking', async () => {
    const p2 = await provider.getLesson('java', sectionSlug, moduleSlug, 'guided-build-university-course-ranker-and-waiting-list');
    expect(p2?.title).toContain('Course Ranker');
    const concept = p2?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('TreeSet');
    expect(concept?.content).toContain('PriorityQueue');
    expect(concept?.content.toLowerCase()).toContain('comparator');
  });

  it('verifies Project 3 covers Map.merge cart aggregation and LinkedHashSet recency', async () => {
    const p3 = await provider.getLesson('java', sectionSlug, moduleSlug, 'guided-build-ecommerce-shopping-cart-and-product-catalog');
    expect(p3?.title).toContain('Cart & Catalog');
    const concept = p3?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('Map.merge');
    expect(concept?.content).toContain('LinkedHashSet');
  });

  it('verifies Project 4 covers PECS wildcard rules and generic pipeline transformations', async () => {
    const p4 = await provider.getLesson('java', sectionSlug, moduleSlug, 'guided-build-generic-rule-engine-and-filter-pipeline');
    expect(p4?.title).toContain('Generic Rule Engine');
    const concept = p4?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('PECS');
    expect(concept?.content).toContain('? super T');
    expect(concept?.content).toContain('? extends T');
  });

  it('verifies Project 5 (Capstone) covers dual TreeMap order books and ArrayDeque FIFO matching', async () => {
    const p5 = await provider.getLesson('java', sectionSlug, moduleSlug, 'capstone-in-memory-stock-trading-and-order-matching-engine');
    expect(p5?.title).toContain('Stock Trading');
    const concept = p5?.activities.find(a => a.type === 'concept');
    expect(concept?.content).toContain('TreeMap');
    expect(concept?.content).toContain('ArrayDeque');
    expect(concept?.content.toLowerCase()).toContain('price-time priority');
  });
});

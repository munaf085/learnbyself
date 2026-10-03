import { describe, it, expect } from 'vitest';
import { LocalCurriculumProvider } from '../lib/curriculum/provider';
import path from 'path';

describe('Java OOP - Module 12: Java OOP Mini Projects & Portfolio (11 GitHub Projects)', () => {
  const rootPath = path.resolve(__dirname, '../../../data/curriculum');
  const provider = new LocalCurriculumProvider(rootPath);
  const moduleSlug = 'mini-projects';

  const expectedProjects = [
    'student-profile-academic-system',
    'bank-account-management-system',
    'employee-profile-salary-manager',
    'student-id-course-registration',
    'employee-role-hierarchy-system',
    'payment-processing-engine',
    'multichannel-notification-service',
    'library-management-system',
    'product-customer-identity-system',
    'immutable-order-cart-system',
    'employee-management-payroll-capstone'
  ];

  it('verifies Module 12 exists with exactly 11 portfolio projects in correct progression order', async () => {
    const course = await provider.getCourse('java');
    const section = course?.sections.find(s => s.slug === 'oop');
    const mod = section?.modules.find(m => m.slug === moduleSlug);

    expect(mod).toBeDefined();
    expect(mod?.title).toBe('12. Java OOP Mini Projects & Portfolio (11 GitHub Projects)');
    expect(mod?.lessons.length).toBe(11);
    expect(mod?.lessons.map(l => l.slug)).toEqual(expectedProjects);
  });

  it('verifies all 11 projects resolve with isMiniProject: true and full GitHub studio metadata', async () => {
    for (const slug of expectedProjects) {
      const lesson = await provider.getLesson('java', 'oop', moduleSlug, slug);
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

      // Portfolio checklist & Interview questions
      expect(mp?.portfolioChecklist.length, `${slug} portfolioChecklist`).toBeGreaterThanOrEqual(6);
      expect(mp?.explainYourProject.length, `${slug} explainYourProject`).toBeGreaterThanOrEqual(6);

      // Completion
      expect(mp?.projectCompletion.headline.length, `${slug} completion headline`).toBeGreaterThanOrEqual(5);
      expect(mp?.projectCompletion.congratulations.length, `${slug} completion message`).toBeGreaterThanOrEqual(20);
      expect(mp?.projectCompletion.skillsDemonstrated.length, `${slug} skillsDemonstrated`).toBeGreaterThanOrEqual(4);

      // Code and sample run
      expect(mp?.scaffoldingCode.length, `${slug} scaffoldingCode`).toBeGreaterThanOrEqual(50);
      expect(mp?.sampleConsoleRun.length, `${slug} sampleConsoleRun`).toBeGreaterThanOrEqual(50);
    }
  });

  it('verifies the final project is marked as the Capstone with isFinal: true', async () => {
    const capstone = await provider.getLesson('java', 'oop', moduleSlug, 'employee-management-payroll-capstone');
    expect(capstone).not.toBeNull();
    expect(capstone?.title).toContain('Capstone: Employee Management & Payroll System');
    expect(capstone?.isMiniProject).toBe(true);
    expect(capstone?.isFinal).toBe(true);
    expect(capstone?.miniProject?.gitHubReady.readmeTemplate).toContain('Capstone');
    expect(capstone?.miniProject?.gitHubReady.readmeTemplate).toContain('Payable');
  });

  it('verifies Level 1 guided projects model foundational classes and encapsulation', async () => {
    const p1 = await provider.getLesson('java', 'oop', moduleSlug, 'student-profile-academic-system');
    expect(p1?.title).toContain('Level 1: Guided Build');
    expect(p1?.miniProject?.scaffoldingCode).toContain('class Student');
    expect(p1?.miniProject?.scaffoldingCode).toContain('calculateGPA');

    const p2 = await provider.getLesson('java', 'oop', moduleSlug, 'bank-account-management-system');
    expect(p2?.title).toContain('Level 1: Guided Build');
    expect(p2?.miniProject?.scaffoldingCode).toContain('class BankAccount');
    expect(p2?.miniProject?.scaffoldingCode).toContain('this(');
  });

  it('verifies Level 2 requirement projects cover static, inheritance, polymorphism, abstraction, composition, equals, and immutability', async () => {
    const p4 = await provider.getLesson('java', 'oop', moduleSlug, 'student-id-course-registration');
    expect(p4?.miniProject?.scaffoldingCode).toContain('static int counter');
    expect(p4?.miniProject?.scaffoldingCode).toContain('MAX_CAPACITY');

    const p5 = await provider.getLesson('java', 'oop', moduleSlug, 'employee-role-hierarchy-system');
    expect(p5?.miniProject?.scaffoldingCode).toContain('extends Employee');
    expect(p5?.miniProject?.scaffoldingCode).toContain('super(');

    const p6 = await provider.getLesson('java', 'oop', moduleSlug, 'payment-processing-engine');
    expect(p6?.miniProject?.scaffoldingCode).toContain('interface PaymentMethod');
    expect(p6?.miniProject?.scaffoldingCode).toContain('class PaymentGateway');

    const p7 = await provider.getLesson('java', 'oop', moduleSlug, 'multichannel-notification-service');
    expect(p7?.miniProject?.scaffoldingCode).toContain('interface NotificationSender');
    expect(p7?.miniProject?.scaffoldingCode).toContain('abstract class BaseSender');

    const p8 = await provider.getLesson('java', 'oop', moduleSlug, 'library-management-system');
    expect(p8?.miniProject?.scaffoldingCode).toContain('class Library');
    expect(p8?.miniProject?.scaffoldingCode).toContain('class Book');
    expect(p8?.miniProject?.scaffoldingCode).toContain('class Member');

    const p9 = await provider.getLesson('java', 'oop', moduleSlug, 'product-customer-identity-system');
    expect(p9?.miniProject?.scaffoldingCode).toContain('boolean equals(Object o)');
    expect(p9?.miniProject?.scaffoldingCode).toContain('int hashCode()');

    const p10 = await provider.getLesson('java', 'oop', moduleSlug, 'immutable-order-cart-system');
    expect(p10?.miniProject?.scaffoldingCode).toContain('final class Order');
    expect(p10?.miniProject?.scaffoldingCode).toContain('Collections.unmodifiableList');
  });
});

"use client";

import React, { useState, useEffect } from 'react';
import type { LessonDetail, MiniProjectDetail } from '@learnbyself/types';
import { Card, Badge, Button } from '@learnbyself/ui';
import {
  Rocket,
  Sparkles,
  Terminal,
  CheckCircle2,
  ChevronDown,
  Copy,
  Check,
  FolderGit2,
  Bug,
  HelpCircle,
  Lightbulb,
  Layers,
  ListChecks,
  FileText,
  Flame,
  ShieldAlert,
  Clock,
  Award,
  ArrowRight,
  Code2,
  CheckSquare,
  Square,
  Wrench,
  BookOpen,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';

interface MiniProjectStudioProps {
  lesson: LessonDetail;
}

export const MiniProjectStudio: React.FC<MiniProjectStudioProps> = ({ lesson }) => {
  const project: MiniProjectDetail = (lesson as any).miniProject || (lesson as any).project;

  const [activeStage, setActiveStage] = useState<'overview' | 'blueprint' | 'roadmap' | 'testing' | 'launch'>('overview');
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [verifiedTests, setVerifiedTests] = useState<Record<string, boolean>>({});
  const [portfolioChecked, setPortfolioChecked] = useState<Record<string, boolean>>({});
  const [expandedHints, setExpandedHints] = useState<Record<string, number>>({});
  const [expandedMentors, setExpandedMentors] = useState<Record<number, boolean>>({});
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Load progress from localStorage
  useEffect(() => {
    if (!project?.slug) return;
    try {
      const savedTasks = localStorage.getItem(`lbs_mp_tasks_${project.slug}`);
      if (savedTasks) setCompletedTasks(JSON.parse(savedTasks));

      const savedTests = localStorage.getItem(`lbs_mp_tests_${project.slug}`);
      if (savedTests) setVerifiedTests(JSON.parse(savedTests));

      const savedPortfolio = localStorage.getItem(`lbs_mp_portfolio_${project.slug}`);
      if (savedPortfolio) setPortfolioChecked(JSON.parse(savedPortfolio));
    } catch {
      // Ignore localStorage errors
    }
  }, [project?.slug]);

  // Save progress helpers
  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => {
      const next = { ...prev, [taskId]: !prev[taskId] };
      try {
        localStorage.setItem(`lbs_mp_tasks_${project.slug}`, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const toggleTest = (testId: string) => {
    setVerifiedTests(prev => {
      const next = { ...prev, [testId]: !prev[testId] };
      try {
        localStorage.setItem(`lbs_mp_tests_${project.slug}`, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const togglePortfolioItem = (itemId: string) => {
    setPortfolioChecked(prev => {
      const next = { ...prev, [itemId]: !prev[itemId] };
      try {
        localStorage.setItem(`lbs_mp_portfolio_${project.slug}`, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleCopy = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  if (!project) {
    return (
      <Card className="p-8 text-center">
        <p className="text-slate-600">Project specifications are loading...</p>
      </Card>
    );
  }

  const {
    projectBrief,
    realWorldScenario,
    requirements,
    beforeYouCode,
    buildRoadmap,
    thinkBeforeYouCode,
    hintSystem,
    testYourProject,
    debuggingGuide,
    projectPolish,
    gitHubReady,
    portfolioChecklist,
    explainYourProject,
    projectCompletion,
    scaffoldingCode,
    sampleConsoleRun
  } = project;

  // Calculate stats
  const totalTasks = buildRoadmap.reduce((acc, m) => acc + m.tasks.length, 0);
  const doneTasks = Object.values(completedTasks).filter(Boolean).length;
  const totalTests =
    testYourProject.normalCases.length +
    testYourProject.boundaryCases.length +
    testYourProject.invalidInputCases.length +
    testYourProject.edgeCases.length;
  const doneTests = Object.values(verifiedTests).filter(Boolean).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. HERO BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-indigo-900/50">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 uppercase tracking-wider text-xs font-bold">
              Java Basics Portfolio Project
            </Badge>
            <Badge variant="outline" className="border-slate-700 text-slate-300 text-xs flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-indigo-400" />
              {projectBrief.estimatedTime}
            </Badge>
            <Badge
              variant={projectBrief.difficulty === 'advanced' ? 'danger' : projectBrief.difficulty === 'intermediate' ? 'warning' : 'success'}
              className="text-xs font-semibold capitalize"
            >
              {projectBrief.difficulty}
            </Badge>
            <span className="text-xs text-amber-300/90 font-medium px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              Strictly No OOP • Core Java Fundamentals
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {project.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              {projectBrief.problemItSolves}
            </p>
          </div>

          {/* Motivating Quote Callout */}
          <div className="bg-slate-800/60 backdrop-blur-xs border-l-4 border-indigo-400 p-3 sm:p-4 rounded-r-xl max-w-2xl">
            <p className="text-xs sm:text-sm text-indigo-100 italic">
              &ldquo;{projectBrief.motivatingQuote}&rdquo;
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-300 border-t border-slate-800/80">
            <div>
              <span className="text-slate-400">Milestone Progress: </span>
              <span className="font-bold text-white">{doneTasks} / {totalTasks} tasks</span>
            </div>
            <div>
              <span className="text-slate-400">Tests Verified: </span>
              <span className="font-bold text-white">{doneTests} / {totalTests} verified</span>
            </div>
            <div>
              <span className="text-slate-400">Architecture: </span>
              <span className="font-bold text-emerald-400">Standard Output CLI</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FIVE-STAGE WORKFLOW NAVIGATION TABS */}
      <div className="sticky top-16 z-30 bg-slate-50/95 backdrop-blur-md py-2 border-b border-slate-200/80">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-1 scrollbar-none" aria-label="Project Stages">
          {[
            { id: 'overview', label: '1. Overview & Scenario', icon: BookOpen },
            { id: 'blueprint', label: '2. Requirements & Blueprint', icon: Layers },
            { id: 'roadmap', label: '3. Build Roadmap & Hints', icon: Wrench },
            { id: 'testing', label: '4. Testing & Debugging', icon: Bug },
            { id: 'launch', label: '5. GitHub & Portfolio Launch', icon: FolderGit2 },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeStage === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveStage(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 3. STAGE CONTENTS */}

      {/* STAGE 1: OVERVIEW & SCENARIO */}
      {activeStage === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Real-World Context Card */}
          <Card className="p-6 space-y-4 border-l-4 border-l-blue-500 shadow-sm">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Real-World Engineering Scenario
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {realWorldScenario.headline}
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed whitespace-pre-line">
              {realWorldScenario.story}
            </div>
            <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-xs sm:text-sm text-blue-900">
              <span className="font-bold">Scenario Context: </span>
              {realWorldScenario.context}
            </div>
          </Card>

          {/* Project Overview Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
                <Rocket className="w-4 h-4" />
                What You Are Building
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {projectBrief.whatAreWeBuilding}
              </p>
            </Card>

            <Card className="p-6 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Finished App Experience
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {projectBrief.finishedAppDescription}
              </p>
            </Card>
          </div>

          {/* Core Java Fundamentals Exercised */}
          <Card className="p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              Java Basics Fundamentals Exercised
            </h3>
            <p className="text-xs text-slate-600">
              This project is specifically engineered to test your mastery of these foundational Java topics without needing OOP:
            </p>
            <div className="flex flex-wrap gap-2">
              {projectBrief.javaFundamentals.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  {item}
                </span>
              ))}
            </div>
          </Card>

          {/* Terminal Console Execution Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <Terminal className="w-4 h-4 text-slate-900" />
                Verified Terminal Console Run Preview
              </div>
              <button
                onClick={() => handleCopy(sampleConsoleRun, 'sampleConsoleRun')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-2.5 py-1 rounded-md transition cursor-pointer"
              >
                {copiedSection === 'sampleConsoleRun' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-500" />
                    <span>Copy Output</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800/80 text-xs text-slate-400 font-mono">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span>Terminal Output Preview</span>
                <span className="text-[11px] text-slate-500">bash / zsh</span>
              </div>
              <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-emerald-400 overflow-x-auto leading-relaxed max-h-96 whitespace-pre">
                {sampleConsoleRun}
              </pre>
            </div>
          </div>

          {/* Call to Action to Next Stage */}
          <div className="flex justify-end pt-4">
            <Button
              variant="primary"
              onClick={() => setActiveStage('blueprint')}
              className="inline-flex items-center gap-2 cursor-pointer"
            >
              Continue to Requirements & Blueprint
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STAGE 2: REQUIREMENTS & BLUEPRINT */}
      {activeStage === 'blueprint' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Functional Requirements */}
          <Card className="p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
              <ListChecks className="w-4 h-4" />
              Functional Specifications
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              What Your Program Must Implement
            </h3>
            <p className="text-xs text-slate-600">
              Build each requirement cleanly. Notice that these specify <em>what</em> to build, giving you the freedom to choose your internal variable names and method organization:
            </p>
            <div className="space-y-2.5">
              {requirements.functional.map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-sm text-slate-800"
                >
                  <span className="font-mono font-bold text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded shrink-0 mt-0.5">
                    REQ-{idx + 1}
                  </span>
                  <span className="leading-relaxed">{req}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Technical Constraints & Learner Decisions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 space-y-3 border-l-4 border-l-rose-500 shadow-sm">
              <div className="flex items-center gap-2 text-rose-600 font-semibold text-sm">
                <ShieldAlert className="w-4 h-4" />
                Strict Technical Constraints
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc pl-4">
                {requirements.technicalConstraints.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 space-y-3 border-l-4 border-l-emerald-500 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                <Lightbulb className="w-4 h-4" />
                Your Architectural Decisions
              </div>
              <p className="text-xs text-slate-600">
                As the software engineer, you make these product and implementation decisions:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc pl-4">
                {requirements.userDecisions.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Before You Code Planning Blueprint */}
          <Card className="p-6 space-y-6 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                Architecture Blueprint (Before You Code)
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Plan Your Data & Flow Before Writing a Single Line
              </h3>
              <p className="text-xs text-slate-600">
                Professional developers never write code immediately. Use this blueprint to visualize your state, methods, and loops:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                  Required Inputs
                </h4>
                <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc pl-4">
                  {beforeYouCode.inputsRequired.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  Expected Outputs
                </h4>
                <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc pl-4">
                  {beforeYouCode.outputsRequired.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                Variables & State Management
              </h4>
              <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc pl-4">
                {beforeYouCode.variablesNeeded.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {beforeYouCode.arrayUsage && (
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1.5">
                <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                  Array Architecture (Zero OOP Storage)
                </h4>
                <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed">
                  {beforeYouCode.arrayUsage}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Conditional Logic
                </h4>
                <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc pl-4">
                  {beforeYouCode.conditionalLogic.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Loop & Control Flow
                </h4>
                <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc pl-4">
                  {beforeYouCode.loopStructures.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Recommended Static Methods Decomposition
              </h4>
              <p className="text-xs text-slate-600">
                Break your program down into small, single-purpose static methods:
              </p>
              <div className="space-y-1.5 pt-1">
                {beforeYouCode.recommendedMethods.map((m, i) => (
                  <div key={i} className="font-mono text-xs bg-white p-2 rounded border border-slate-200 text-slate-800">
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Think Before You Code (Mentor Questions) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              Think Before You Code (Mentor Questions)
            </div>
            <p className="text-xs text-slate-600">
              Software design interview questions for your architecture: reflect on each question before opening the mentor insight:
            </p>

            <div className="space-y-3">
              {thinkBeforeYouCode.map((item, idx) => {
                const isOpen = !!expandedMentors[idx];
                return (
                  <Card key={idx} className="overflow-hidden shadow-sm border border-slate-200">
                    <button
                      onClick={() => setExpandedMentors(p => ({ ...p, [idx]: !p[idx] }))}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3 pr-4">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-sm text-slate-900">
                          {item.question}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="p-4 bg-indigo-50/40 border-t border-indigo-100 text-xs sm:text-sm text-slate-800 space-y-2 animate-fadeIn">
                        <div className="font-semibold text-indigo-900 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-indigo-600" />
                          Mentor Insight & Architectural Recommendation:
                        </div>
                        <p className="leading-relaxed text-slate-700">
                          {item.mentorInsight}
                        </p>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setActiveStage('overview')} className="cursor-pointer">
              Back to Overview
            </Button>
            <Button variant="primary" onClick={() => setActiveStage('roadmap')} className="inline-flex items-center gap-2 cursor-pointer">
              Continue to Build Roadmap & Hints
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STAGE 3: BUILD ROADMAP & HINTS */}
      {activeStage === 'roadmap' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Milestone-by-Milestone Build Roadmap */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-indigo-600" />
                  Progressive Build Milestones
                </h3>
                <p className="text-xs text-slate-600">
                  Build your application step by step. Test each milestone before moving to the next:
                </p>
              </div>
              <div className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200/80 px-3 py-1.5 rounded-lg">
                {doneTasks} / {totalTasks} Tasks Completed
              </div>
            </div>

            <div className="space-y-4">
              {buildRoadmap.map((m) => (
                <Card key={m.milestoneNumber} className="p-5 space-y-4 shadow-sm border border-slate-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                        M{m.milestoneNumber}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-slate-900">
                        {m.title}
                      </h4>
                    </div>
                    <span className="text-xs text-slate-500 font-medium italic">
                      {m.objective}
                    </span>
                  </div>

                  {/* Tasks List with Checkboxes */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Implementation Tasks:
                    </span>
                    <div className="space-y-1.5">
                      {m.tasks.map((task, tIdx) => {
                        const taskId = `${project.slug}_m${m.milestoneNumber}_t${tIdx}`;
                        const isDone = !!completedTasks[taskId];
                        return (
                          <div
                            key={tIdx}
                            onClick={() => toggleTask(taskId)}
                            className={`flex items-start gap-3 p-2.5 rounded-lg border text-xs sm:text-sm cursor-pointer transition select-none ${
                              isDone
                                ? 'bg-emerald-50/70 border-emerald-200 text-slate-700 line-through decoration-slate-400'
                                : 'bg-slate-50/80 border-slate-200/70 text-slate-800 hover:bg-slate-100/80'
                            }`}
                          >
                            {isDone ? (
                              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                            )}
                            <span className="leading-relaxed">{task}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Acceptance Criteria */}
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900 space-y-1.5">
                    <span className="font-bold uppercase tracking-wider text-[11px] text-amber-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                      Milestone Acceptance Criteria:
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-700">
                      {m.acceptanceCriteria.map((crit, cIdx) => (
                        <li key={cIdx}>{crit}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Starter Scaffolding Code */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-indigo-600" />
                  Starter Scaffolding Code
                </h3>
                <p className="text-xs text-slate-600">
                  Copy this skeleton into your local Java file (`Main.java`) to get the imports, method signatures, and structure ready:
                </p>
              </div>
              <button
                onClick={() => handleCopy(scaffoldingCode, 'scaffoldingCode')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-xs transition cursor-pointer"
              >
                {copiedSection === 'scaffoldingCode' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Scaffolding</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-950 text-xs text-slate-400 font-mono border-b border-slate-800">
                <span>Main.java</span>
                <span>Java 17+</span>
              </div>
              <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-96 whitespace-pre">
                {scaffoldingCode}
              </pre>
            </div>
          </div>

          {/* Progressive 3-Tier Hint System */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Progressive 3-Tier Hint System
              </h3>
              <p className="text-xs text-slate-600">
                Never get stuck. Uncover hints gradually so you can solve problems on your own before looking at syntax:
              </p>
            </div>

            <div className="space-y-3">
              {hintSystem.map((hint, hIdx) => {
                const activeLevel = expandedHints[hint.topic] || 0;
                return (
                  <Card key={hIdx} className="p-4 space-y-3 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <Flame className="w-4 h-4 text-indigo-500" />
                        {hint.topic}
                      </span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3].map(lvl => (
                          <button
                            key={lvl}
                            onClick={() =>
                              setExpandedHints(prev => ({
                                ...prev,
                                [hint.topic]: prev[hint.topic] === lvl ? 0 : lvl
                              }))
                            }
                            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition cursor-pointer ${
                              activeLevel >= lvl
                                ? 'bg-indigo-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Level {lvl}
                          </button>
                        ))}
                      </div>
                    </div>

                    {activeLevel === 0 && (
                      <p className="text-xs text-slate-500 italic">
                        Click Level 1 (Concept), Level 2 (Implementation), or Level 3 (Java Syntax) when you need guidance.
                      </p>
                    )}

                    {activeLevel >= 1 && (
                      <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-100 text-xs sm:text-sm text-blue-950 space-y-1 animate-fadeIn">
                        <span className="font-bold text-xs uppercase tracking-wider text-blue-800">
                          Level 1: Conceptual Direction
                        </span>
                        <p className="leading-relaxed">{hint.level1Conceptual}</p>
                      </div>
                    )}

                    {activeLevel >= 2 && (
                      <div className="p-3 rounded-lg bg-indigo-50/70 border border-indigo-100 text-xs sm:text-sm text-indigo-950 space-y-1 animate-fadeIn">
                        <span className="font-bold text-xs uppercase tracking-wider text-indigo-800">
                          Level 2: Implementation Architecture
                        </span>
                        <p className="leading-relaxed">{hint.level2Implementation}</p>
                      </div>
                    )}

                    {activeLevel >= 3 && (
                      <div className="p-3 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 text-xs sm:text-sm space-y-1 animate-fadeIn">
                        <span className="font-bold text-xs uppercase tracking-wider text-emerald-400 font-mono">
                          Level 3: Java Syntax & Code Snippet
                        </span>
                        <pre className="font-mono text-xs overflow-x-auto text-emerald-300 pt-1 leading-relaxed whitespace-pre-wrap">
                          {hint.level3JavaSyntax}
                        </pre>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Project Polish Rules */}
          <Card className="p-5 space-y-3 shadow-sm border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Project Polish & Clean Code Standards
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {projectPolish.map((p, pIdx) => (
                <div key={pIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 space-y-1">
                  <span className="font-bold text-indigo-700 block">
                    ✓ {p}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setActiveStage('blueprint')} className="cursor-pointer">
              Back to Blueprint
            </Button>
            <Button variant="primary" onClick={() => setActiveStage('testing')} className="inline-flex items-center gap-2 cursor-pointer">
              Continue to Testing & Debugging
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STAGE 4: TESTING & DEBUGGING */}
      {activeStage === 'testing' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Testing Matrix Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Bug className="w-5 h-5 text-indigo-600" />
                Quality Assurance & Test Matrix
              </h3>
              <p className="text-xs text-slate-600">
                Run your application locally and test all categories. Check off each test case as you verify it:
              </p>
            </div>
            <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
              {doneTests} / {totalTests} Tests Verified
            </div>
          </div>

          {/* 4 Test Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Normal Cases */}
            <Card className="p-5 space-y-3 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-xs uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  1. Normal Happy Path Cases
                </span>
                <span className="text-xs text-slate-500">
                  {testYourProject.normalCases.length} tests
                </span>
              </div>
              <div className="space-y-2">
                {testYourProject.normalCases.map((tc, idx) => {
                  const testId = `${project.slug}_norm_${idx}`;
                  const isDone = !!verifiedTests[testId];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleTest(testId)}
                      className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer select-none transition ${
                        isDone ? 'bg-emerald-50/70 border-emerald-200 text-slate-700' : 'bg-slate-50 border-slate-200/70 text-slate-800 hover:bg-slate-100/70'
                      }`}
                    >
                      {isDone ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-relaxed">{tc}</span>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* 2. Boundary Cases */}
            <Card className="p-5 space-y-3 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-xs uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  2. Boundary Value Cases
                </span>
                <span className="text-xs text-slate-500">
                  {testYourProject.boundaryCases.length} tests
                </span>
              </div>
              <div className="space-y-2">
                {testYourProject.boundaryCases.map((tc, idx) => {
                  const testId = `${project.slug}_bound_${idx}`;
                  const isDone = !!verifiedTests[testId];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleTest(testId)}
                      className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer select-none transition ${
                        isDone ? 'bg-emerald-50/70 border-emerald-200 text-slate-700' : 'bg-slate-50 border-slate-200/70 text-slate-800 hover:bg-slate-100/70'
                      }`}
                    >
                      {isDone ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-relaxed">{tc}</span>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* 3. Invalid Input Cases */}
            <Card className="p-5 space-y-3 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-xs uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  3. Invalid Input Cases
                </span>
                <span className="text-xs text-slate-500">
                  {testYourProject.invalidInputCases.length} tests
                </span>
              </div>
              <div className="space-y-2">
                {testYourProject.invalidInputCases.map((tc, idx) => {
                  const testId = `${project.slug}_inv_${idx}`;
                  const isDone = !!verifiedTests[testId];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleTest(testId)}
                      className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer select-none transition ${
                        isDone ? 'bg-emerald-50/70 border-emerald-200 text-slate-700' : 'bg-slate-50 border-slate-200/70 text-slate-800 hover:bg-slate-100/70'
                      }`}
                    >
                      {isDone ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-relaxed">{tc}</span>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* 4. Edge Cases */}
            <Card className="p-5 space-y-3 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-xs uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-indigo-600" />
                  4. Zero, Negative & Edge Cases
                </span>
                <span className="text-xs text-slate-500">
                  {testYourProject.edgeCases.length} tests
                </span>
              </div>
              <div className="space-y-2">
                {testYourProject.edgeCases.map((tc, idx) => {
                  const testId = `${project.slug}_edge_${idx}`;
                  const isDone = !!verifiedTests[testId];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleTest(testId)}
                      className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer select-none transition ${
                        isDone ? 'bg-emerald-50/70 border-emerald-200 text-slate-700' : 'bg-slate-50 border-slate-200/70 text-slate-800 hover:bg-slate-100/70'
                      }`}
                    >
                      {isDone ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-relaxed">{tc}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Diagnostic Debugging Guide */}
          <Card className="p-6 space-y-4 shadow-sm border-l-4 border-l-indigo-600">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Bug className="w-4 h-4 text-indigo-600" />
                Diagnostic Debugging Guide: When Something Breaks
              </h4>
              <p className="text-xs text-slate-600">
                Don&apos;t guess when a bug occurs. Apply this scientific troubleshooting procedure:
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              {debuggingGuide.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {sIdx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setActiveStage('roadmap')} className="cursor-pointer">
              Back to Roadmap
            </Button>
            <Button variant="primary" onClick={() => setActiveStage('launch')} className="inline-flex items-center gap-2 cursor-pointer">
              Continue to GitHub & Portfolio Launch
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STAGE 5: GITHUB & PORTFOLIO LAUNCH */}
      {activeStage === 'launch' && (
        <div className="space-y-6 animate-fadeIn">
          {/* GitHub Ready README Template */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  Production README.md Template
                </h3>
                <p className="text-xs text-slate-600">
                  Copy and commit this professional README to your GitHub repo to showcase your project to recruiters:
                </p>
              </div>
              <button
                onClick={() => handleCopy(gitHubReady.readmeTemplate, 'readmeTemplate')}
                className="inline-flex items-center gap-1.5 text-xs text-white bg-indigo-600 hover:bg-indigo-700 px-3.5 py-2 rounded-xl shadow-sm transition cursor-pointer font-semibold"
              >
                {copiedSection === 'readmeTemplate' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>README Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy README.md</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-950 text-xs text-slate-400 font-mono border-b border-slate-800">
                <span>README.md</span>
                <span>Markdown</span>
              </div>
              <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-96 whitespace-pre">
                {gitHubReady.readmeTemplate}
              </pre>
            </div>
          </div>

          {/* Beginner Git CLI Command Guide */}
          <Card className="p-6 space-y-4 shadow-sm border border-slate-200">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-indigo-600" />
                Publish to GitHub — Beginner Git CLI Guide
              </h3>
              <p className="text-xs text-slate-600">
                Run these commands in your project folder one by one to publish your work:
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {gitHubReady.gitCommands.map((cmd, cIdx) => (
                <div key={cIdx} className="rounded-xl bg-slate-900 p-4 border border-slate-800 text-xs sm:text-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-emerald-400 font-semibold">
                      <span className="text-slate-500">$</span>
                      <span>{cmd.command}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(cmd.command, `gitCmd_${cIdx}`)}
                      className="text-slate-400 hover:text-white transition p-1 cursor-pointer"
                    >
                      {copiedSection === `gitCmd_${cIdx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <p className="text-slate-400 text-xs border-t border-slate-800 pt-2">
                    {cmd.explanation}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Can You Explain Your Project? Interview Reflection */}
          <Card className="p-6 space-y-4 shadow-sm border border-slate-200">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                &ldquo;Can You Explain Your Project?&rdquo; — Portfolio Interview Prep
              </h3>
              <p className="text-xs text-slate-600">
                Recruiters and senior engineers will ask you these exact questions about your code. Practice explaining them out loud:
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              {explainYourProject.map((q, qIdx) => (
                <div
                  key={qIdx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800"
                >
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{q}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Portfolio Launch Readiness Checklist */}
          <Card className="p-6 space-y-4 shadow-sm border border-slate-200">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Portfolio Readiness Checklist
              </h3>
              <p className="text-xs text-slate-600">
                Confirm every standard before adding this project link to your resume:
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {portfolioChecklist.map((item, pIdx) => {
                const checkId = `${project.slug}_port_${pIdx}`;
                const isChecked = !!portfolioChecked[checkId];
                return (
                  <div
                    key={pIdx}
                    onClick={() => togglePortfolioItem(checkId)}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer select-none transition ${
                      isChecked
                        ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                        : 'bg-slate-50 border-slate-200/80 text-slate-800 hover:bg-slate-100/80'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <span className="leading-relaxed">{item}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Project Completion & Skills Demonstrated Banner */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-900 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white space-y-4 border border-emerald-700/50 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Award className="w-5 h-5" />
              {projectCompletion.headline}
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {projectCompletion.congratulations}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Proven Skills Demonstrated in this Project:
              </span>
              <div className="flex flex-wrap gap-2">
                {projectCompletion.skillsDemonstrated.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-indigo-300 font-medium">
                🚀 {projectCompletion.nextStepAction}
              </p>
            </div>
          </div>

          <div className="flex justify-start pt-4">
            <Button variant="outline" onClick={() => setActiveStage('testing')} className="cursor-pointer">
              Back to Testing & Debugging
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

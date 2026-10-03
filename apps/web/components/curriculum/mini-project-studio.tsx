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
  Clock,
  ArrowRight,
  Code2,
  CheckSquare,
  Square,
  Wrench,
  BookOpen,
  MessageSquare,
  Laptop
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

  // Load saved progress from localStorage
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
      <Card className="p-8 text-center bg-white border border-slate-200/90 rounded-2xl shadow-subtle">
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
    <div className="space-y-6 animate-fadeIn">
      {/* 1. PROJECT MISSION & PROGRESS STRIP (Clean, premium, non-redundant) */}
      <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/60">
                <Rocket className="w-3.5 h-3.5 text-brand-600" />
                Project Mission
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium text-slate-600 bg-slate-100/80">
                <Laptop className="w-3 h-3 text-slate-500" />
                VS Code / IntelliJ
              </span>
            </div>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              {projectBrief.problemItSolves}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-2xs text-xs font-medium text-slate-600 self-start md:self-auto">
            <div>
              <span className="text-slate-400">Tasks </span>
              <span className="font-semibold text-slate-900">{doneTasks}/{totalTasks}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div>
              <span className="text-slate-400">Tests </span>
              <span className="font-semibold text-slate-900">{doneTests}/{totalTests}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FIVE-STAGE WORKFLOW NAVIGATION */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-2 shadow-subtle">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-0.5 scrollbar-none" aria-label="Project Steps">
          {[
            { id: 'overview', label: '1. Overview', icon: BookOpen },
            { id: 'blueprint', label: '2. Plan & Requirements', icon: Layers },
            { id: 'roadmap', label: '3. Build & Hints', icon: Wrench },
            { id: 'testing', label: '4. Test & Debug', icon: Bug },
            { id: 'launch', label: '5. GitHub & Portfolio', icon: FolderGit2 },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeStage === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveStage(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 min-h-[44px] ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-subtle'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
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

      {/* STAGE 1: OVERVIEW */}
      {activeStage === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Story & Context */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-subtle space-y-2.5">
            <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              The Scenario
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {realWorldScenario.headline}
            </h2>
            <div className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {realWorldScenario.story}
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700">
              <strong>Context: </strong>{realWorldScenario.context}
            </div>
          </div>

          {/* What you are building & finished app */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-subtle space-y-2">
              <div className="flex items-center gap-2 text-brand-600 font-semibold text-xs sm:text-sm">
                <Rocket className="w-4 h-4" />
                What You Will Build
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {projectBrief.whatAreWeBuilding}
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-subtle space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4" />
                What the Finished App Does
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {projectBrief.finishedAppDescription}
              </p>
            </div>
          </div>

          {/* Concepts Used */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-subtle space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-600" />
              Key Concepts You Will Practice
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectBrief.javaFundamentals.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Terminal Console Output Demo */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <Terminal className="w-4 h-4 text-slate-700" />
                Sample Terminal Run
              </div>
              <button
                onClick={() => handleCopy(sampleConsoleRun, 'sampleConsoleRun')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-2.5 py-1 rounded-lg transition cursor-pointer"
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

            <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-elevated border border-slate-800">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-slate-800 text-xs text-slate-400 font-mono">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span>Terminal Output</span>
                <span className="text-[11px] text-slate-500">bash / powershell</span>
              </div>
              <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-emerald-400 overflow-x-auto leading-relaxed max-h-96 whitespace-pre">
                {sampleConsoleRun}
              </pre>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              variant="primary"
              onClick={() => setActiveStage('blueprint')}
              className="inline-flex items-center gap-2 cursor-pointer font-semibold"
            >
              Next: Plan & Requirements
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STAGE 2: REQUIREMENTS & BLUEPRINT */}
      {activeStage === 'blueprint' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Feature Requirements */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-subtle space-y-3">
            <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider">
              <ListChecks className="w-4 h-4" />
              Feature Requirements
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              What Your Program Needs to Do
            </h3>
            <div className="space-y-2.5 pt-1">
              {requirements.functional.map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-sm text-slate-800"
                >
                  <span className="font-mono font-bold text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded shrink-0 mt-0.5">
                    #{idx + 1}
                  </span>
                  <span className="leading-relaxed">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines & Your Decisions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-subtle space-y-2">
              <h4 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Project Guidelines
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-4">
                {requirements.technicalConstraints.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-subtle space-y-2">
              <h4 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Decisions You Can Make
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-4">
                {requirements.userDecisions.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Planning Blueprint */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-subtle space-y-5">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-600" />
                Planning Your Program Before Writing Code
              </h3>
              <p className="text-xs text-slate-500">
                Review this quick checklist of variables, methods, and loops to make coding straightforward:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Inputs to Read
                </h4>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1 list-disc pl-4">
                  {beforeYouCode.inputsRequired.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Outputs to Display
                </h4>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1 list-disc pl-4">
                  {beforeYouCode.outputsRequired.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Variables to Track
              </h4>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1 list-disc pl-4">
                {beforeYouCode.variablesNeeded.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {beforeYouCode.arrayUsage && (
              <div className="p-4 rounded-xl bg-brand-50/50 border border-brand-200/70 space-y-1">
                <h4 className="text-xs font-bold text-brand-900 uppercase tracking-wider">
                  Array Storage Tip
                </h4>
                <p className="text-xs sm:text-sm text-brand-950 leading-relaxed">
                  {beforeYouCode.arrayUsage}
                </p>
              </div>
            )}

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Suggested Helper Methods
              </h4>
              <div className="space-y-1.5 pt-1">
                {beforeYouCode.recommendedMethods.map((m, i) => (
                  <div key={i} className="font-mono text-xs bg-white p-2 rounded-lg border border-slate-200 text-slate-800">
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Questions to Consider */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              Questions to Consider
            </div>
            <p className="text-xs text-slate-500">
              Think through these practical questions before you start coding:
            </p>

            <div className="space-y-2.5">
              {thinkBeforeYouCode.map((item, idx) => {
                const isOpen = !!expandedMentors[idx];
                return (
                  <div key={idx} className="bg-white rounded-xl border border-slate-200/90 shadow-subtle overflow-hidden">
                    <button
                      onClick={() => setExpandedMentors(p => ({ ...p, [idx]: !p[idx] }))}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3 pr-4">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-sm text-slate-800">
                          {item.question}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1.5 animate-fadeIn">
                        <div className="font-semibold text-brand-700 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5" />
                          Tip:
                        </div>
                        <p className="leading-relaxed">{item.mentorInsight}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={() => setActiveStage('overview')} className="cursor-pointer">
              Back
            </Button>
            <Button variant="primary" onClick={() => setActiveStage('roadmap')} className="inline-flex items-center gap-2 cursor-pointer font-semibold">
              Next: Build & Hints
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STAGE 3: BUILD & HINTS */}
      {activeStage === 'roadmap' && (
        <div className="space-y-6 animate-fadeIn">
          {/* How to run in IDEs */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-subtle space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Laptop className="w-4 h-4 text-brand-600" />
              How to Set Up in Your Favorite IDE
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <strong className="text-slate-800 block font-semibold">VS Code</strong>
                <p className="text-slate-600">Create `Main.java` in any folder and click the <strong>Run</strong> button at top right.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <strong className="text-slate-800 block font-semibold">IntelliJ IDEA</strong>
                <p className="text-slate-600">Create a New Java Project, paste into `src/Main.java`, and press <kbd className="px-1 py-0.5 bg-white border rounded text-[10px]">Shift + F10</kbd>.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <strong className="text-slate-800 block font-semibold">Eclipse</strong>
                <p className="text-slate-600">New Java Project &rarr; create class `Main` &rarr; press <kbd className="px-1 py-0.5 bg-white border rounded text-[10px]">Ctrl + F11</kbd> to run.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <strong className="text-slate-800 block font-semibold">Terminal / CLI</strong>
                <p className="text-slate-600">Run `javac Main.java` to compile, then `java Main` to run in any terminal.</p>
              </div>
            </div>
          </div>

          {/* Starter Code */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-brand-600" />
                  Starter Code Template
                </h3>
                <p className="text-xs text-slate-500">
                  Copy this starter template into your `Main.java` file to begin:
                </p>
              </div>
              <button
                onClick={() => handleCopy(scaffoldingCode, 'scaffoldingCode')}
                className="inline-flex items-center gap-1.5 text-xs text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 px-3 py-1.5 rounded-lg transition cursor-pointer font-medium"
              >
                {copiedSection === 'scaffoldingCode' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-brand-600" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-elevated border border-slate-800">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-950 text-xs text-slate-400 font-mono border-b border-slate-800">
                <span>Main.java</span>
                <span>Java</span>
              </div>
              <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-96 whitespace-pre">
                {scaffoldingCode}
              </pre>
            </div>
          </div>

          {/* Step-by-Step Milestones */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-brand-600" />
                  Step-by-Step Build Steps
                </h3>
                <p className="text-xs text-slate-500">
                  Build in small pieces. Check each step off as you complete it:
                </p>
              </div>
              <span className="text-xs font-semibold text-brand-700 bg-brand-50 border border-brand-200/80 px-2.5 py-1 rounded-lg">
                {doneTasks}/{totalTasks} Completed
              </span>
            </div>

            <div className="space-y-3">
              {buildRoadmap.map((m) => (
                <div key={m.milestoneNumber} className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-brand-600 text-white font-bold text-xs flex items-center justify-center">
                        {m.milestoneNumber}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900">
                        {m.title}
                      </h4>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      {m.objective}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {m.tasks.map((task, tIdx) => {
                      const taskId = `${project.slug}_m${m.milestoneNumber}_t${tIdx}`;
                      const isDone = !!completedTasks[taskId];
                      return (
                        <div
                          key={tIdx}
                          onClick={() => toggleTask(taskId)}
                          className={`flex items-start gap-2.5 p-2 rounded-lg border text-xs sm:text-sm cursor-pointer transition select-none ${
                            isDone
                              ? 'bg-emerald-50/70 border-emerald-200 text-slate-700 line-through decoration-slate-400'
                              : 'bg-slate-50/70 border-slate-200/70 text-slate-800 hover:bg-slate-100/70'
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

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 space-y-1">
                    <span className="font-bold text-slate-800 block">
                      Done when:
                    </span>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                      {m.acceptanceCriteria.map((crit, cIdx) => (
                        <li key={cIdx}>{crit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progressive Hints */}
          <div className="space-y-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Need a Hint?
              </h3>
              <p className="text-xs text-slate-500">
                Try solving it on your own first. Open these hints if you get stuck:
              </p>
            </div>

            <div className="space-y-2.5">
              {hintSystem.map((hint, hIdx) => {
                const activeLevel = expandedHints[hint.topic] || 0;
                return (
                  <div key={hIdx} className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-subtle space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-slate-800">
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
                            className={`px-2 py-0.5 text-xs font-medium rounded-md transition cursor-pointer ${
                              activeLevel >= lvl
                                ? 'bg-brand-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Hint {lvl}
                          </button>
                        ))}
                      </div>
                    </div>

                    {activeLevel === 0 && (
                      <p className="text-xs text-slate-400 italic">
                        Click Hint 1 for an idea, Hint 2 for logic, or Hint 3 for syntax.
                      </p>
                    )}

                    {activeLevel >= 1 && (
                      <div className="p-2.5 rounded-lg bg-blue-50/80 border border-blue-100 text-xs text-blue-900 space-y-0.5 animate-fadeIn">
                        <strong className="block font-semibold">Idea:</strong>
                        <p>{hint.level1Conceptual}</p>
                      </div>
                    )}

                    {activeLevel >= 2 && (
                      <div className="p-2.5 rounded-lg bg-indigo-50/80 border border-indigo-100 text-xs text-indigo-900 space-y-0.5 animate-fadeIn">
                        <strong className="block font-semibold">Logic:</strong>
                        <p>{hint.level2Implementation}</p>
                      </div>
                    )}

                    {activeLevel >= 3 && (
                      <div className="p-3 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 text-xs space-y-1 animate-fadeIn">
                        <span className="font-mono text-emerald-400 text-[11px] block">Code Snippet:</span>
                        <pre className="font-mono overflow-x-auto text-emerald-300 leading-relaxed whitespace-pre-wrap">
                          {hint.level3JavaSyntax}
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Clean Code Tips */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600" />
              Clean Code Habits
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
              {projectPolish.map((p, pIdx) => (
                <div key={pIdx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                  ✓ {p}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={() => setActiveStage('blueprint')} className="cursor-pointer">
              Back
            </Button>
            <Button variant="primary" onClick={() => setActiveStage('testing')} className="inline-flex items-center gap-2 cursor-pointer font-semibold">
              Next: Test & Debug
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STAGE 4: TESTING & DEBUGGING */}
      {activeStage === 'testing' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Bug className="w-5 h-5 text-brand-600" />
                Testing Checklist
              </h3>
              <p className="text-xs text-slate-500">
                Run your program locally in your IDE and test these cases:
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
              {doneTests}/{totalTests} Verified
            </span>
          </div>

          {/* Test cases grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Normal Cases */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-xs uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  1. Normal Inputs
                </span>
                <span className="text-xs text-slate-400">{testYourProject.normalCases.length} tests</span>
              </div>
              <div className="space-y-1.5">
                {testYourProject.normalCases.map((tc, idx) => {
                  const testId = `${project.slug}_norm_${idx}`;
                  const isDone = !!verifiedTests[testId];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleTest(testId)}
                      className={`flex items-start gap-2.5 p-2 rounded-lg border text-xs cursor-pointer select-none transition ${
                        isDone ? 'bg-emerald-50/70 border-emerald-200 text-slate-700' : 'bg-slate-50 border-slate-200/70 text-slate-700 hover:bg-slate-100/70'
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
            </div>

            {/* 2. Boundary Cases */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-xs uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  2. Boundary Limits
                </span>
                <span className="text-xs text-slate-400">{testYourProject.boundaryCases.length} tests</span>
              </div>
              <div className="space-y-1.5">
                {testYourProject.boundaryCases.map((tc, idx) => {
                  const testId = `${project.slug}_bound_${idx}`;
                  const isDone = !!verifiedTests[testId];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleTest(testId)}
                      className={`flex items-start gap-2.5 p-2 rounded-lg border text-xs cursor-pointer select-none transition ${
                        isDone ? 'bg-emerald-50/70 border-emerald-200 text-slate-700' : 'bg-slate-50 border-slate-200/70 text-slate-700 hover:bg-slate-100/70'
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
            </div>

            {/* 3. Invalid Inputs */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-xs uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-rose-600" />
                  3. Invalid Inputs
                </span>
                <span className="text-xs text-slate-400">{testYourProject.invalidInputCases.length} tests</span>
              </div>
              <div className="space-y-1.5">
                {testYourProject.invalidInputCases.map((tc, idx) => {
                  const testId = `${project.slug}_inv_${idx}`;
                  const isDone = !!verifiedTests[testId];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleTest(testId)}
                      className={`flex items-start gap-2.5 p-2 rounded-lg border text-xs cursor-pointer select-none transition ${
                        isDone ? 'bg-emerald-50/70 border-emerald-200 text-slate-700' : 'bg-slate-50 border-slate-200/70 text-slate-700 hover:bg-slate-100/70'
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
            </div>

            {/* 4. Edge Cases */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-xs uppercase tracking-wider text-brand-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  4. Edge Cases
                </span>
                <span className="text-xs text-slate-400">{testYourProject.edgeCases.length} tests</span>
              </div>
              <div className="space-y-1.5">
                {testYourProject.edgeCases.map((tc, idx) => {
                  const testId = `${project.slug}_edge_${idx}`;
                  const isDone = !!verifiedTests[testId];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleTest(testId)}
                      className={`flex items-start gap-2.5 p-2 rounded-lg border text-xs cursor-pointer select-none transition ${
                        isDone ? 'bg-emerald-50/70 border-emerald-200 text-slate-700' : 'bg-slate-50 border-slate-200/70 text-slate-700 hover:bg-slate-100/70'
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
            </div>
          </div>

          {/* Debugging Tips */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-3">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Bug className="w-4 h-4 text-brand-600" />
                Debugging Tips: When Something Doesn&apos;t Work
              </h4>
              <p className="text-xs text-slate-500">
                Follow these simple steps when tracking down a bug:
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {debuggingGuide.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {sIdx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={() => setActiveStage('roadmap')} className="cursor-pointer">
              Back
            </Button>
            <Button variant="primary" onClick={() => setActiveStage('launch')} className="inline-flex items-center gap-2 cursor-pointer font-semibold">
              Next: GitHub & Portfolio
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STAGE 5: GITHUB & PORTFOLIO */}
      {activeStage === 'launch' && (
        <div className="space-y-6 animate-fadeIn">
          {/* README Template */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-600" />
                  Sample README.md for Your Repository
                </h3>
                <p className="text-xs text-slate-500">
                  Copy and add this to your GitHub repository:
                </p>
              </div>
              <button
                onClick={() => handleCopy(gitHubReady.readmeTemplate, 'readmeTemplate')}
                className="inline-flex items-center gap-1.5 text-xs text-white bg-brand-600 hover:bg-brand-700 px-3 py-1.5 rounded-lg shadow-subtle transition cursor-pointer font-medium"
              >
                {copiedSection === 'readmeTemplate' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy README</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-elevated border border-slate-800">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-950 text-xs text-slate-400 font-mono border-b border-slate-800">
                <span>README.md</span>
                <span>Markdown</span>
              </div>
              <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-96 whitespace-pre">
                {gitHubReady.readmeTemplate}
              </pre>
            </div>
          </div>

          {/* Simple Git Commands */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-3">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-brand-600" />
                Publishing to GitHub (Step-by-Step)
              </h3>
              <p className="text-xs text-slate-500">
                Open your terminal in your project folder and run these commands:
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {gitHubReady.gitCommands.map((cmd, cIdx) => (
                <div key={cIdx} className="rounded-xl bg-slate-900 p-3.5 border border-slate-800 text-xs sm:text-sm space-y-1.5">
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
                  <p className="text-slate-400 text-xs border-t border-slate-800/80 pt-1.5">
                    {cmd.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Explaining Your Project */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-3">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-brand-600" />
                Can You Explain Your Code?
              </h3>
              <p className="text-xs text-slate-500">
                Practice answering these questions out loud so you can speak about your project with confidence:
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {explainYourProject.map((q, qIdx) => (
                <div
                  key={qIdx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>
                  <span className="leading-relaxed">{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-3">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Portfolio Checklist
              </h3>
              <p className="text-xs text-slate-500">
                Check these off before adding the project to your resume or portfolio:
              </p>
            </div>

            <div className="space-y-1.5 pt-1">
              {portfolioChecklist.map((item, pIdx) => {
                const checkId = `${project.slug}_port_${pIdx}`;
                const isChecked = !!portfolioChecked[checkId];
                return (
                  <div
                    key={pIdx}
                    onClick={() => togglePortfolioItem(checkId)}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs sm:text-sm cursor-pointer select-none transition ${
                      isChecked
                        ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                        : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100/80'
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
          </div>

          {/* Completion Card */}
          <div className="rounded-2xl bg-white border border-emerald-200 p-6 sm:p-7 shadow-subtle space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              {projectCompletion.headline}
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {projectCompletion.congratulations}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                What you practiced:
              </span>
              <div className="flex flex-wrap gap-2">
                {projectCompletion.skillsDemonstrated.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 font-medium">
              👉 {projectCompletion.nextStepAction}
            </div>
          </div>

          <div className="flex justify-start pt-2">
            <Button variant="outline" onClick={() => setActiveStage('testing')} className="cursor-pointer">
              Back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

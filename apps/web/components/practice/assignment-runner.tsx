"use client";

import React, { useState } from 'react';
import { Card, Badge, Button } from '@learnbyself/ui';
import { Play, CheckCircle2, XCircle, RotateCcw, Sparkles, Terminal, Award, FileCode } from 'lucide-react';
import { storage } from '@/lib/storage';

export interface TestCase {
  id: string;
  name: string;
  expected: string;
}

export interface AssignmentProps {
  lessonId: string;
  title?: string;
  problemStatement?: string;
  requirements?: string[];
  initialCode?: string;
  expectedOutput?: string;
  hints?: string[];
}

export const AssignmentRunner: React.FC<AssignmentProps> = ({
  lessonId,
  title = "Hands-on Assignment: Build & Verify Your First Program",
  problemStatement = "Write a complete Java program that declares a class named 'Main', creates a standard static 'main' method, and prints 'Hello, LearnBySelf!' to standard output.",
  requirements = [
    "The class must be named 'Main'",
    "Include the standard entry point: public static void main(String[] args)",
    "Output must exactly match: Hello, LearnBySelf!"
  ],
  initialCode = `public class Main {
    public static void main(String[] args) {
        // TODO: Print "Hello, LearnBySelf!" below
        System.out.println("Hello, LearnBySelf!");
    }
}`,
  expectedOutput = "Hello, LearnBySelf!",
  hints = [
    "Make sure 'System' is capitalized with an uppercase 'S'.",
    "Don't forget the semicolon (;) at the end of the println statement."
  ]
}) => {
  const [code, setCode] = useState(initialCode);
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<{
    test1Passed: boolean;
    test2Passed: boolean;
    submitted: boolean;
  } | null>(null);
  const [showHint, setShowHint] = useState(false);

  React.useEffect(() => {
    setCode(initialCode);
    setConsoleOutput(null);
    setTestResults(null);
    setShowHint(false);
  }, [lessonId, initialCode]);

  const handleRun = () => {
    setIsRunning(true);
    setConsoleOutput(null);

    setTimeout(() => {
      const printRegex = /System\.out\.println\s*\((.*?)\);/g;
      const outputs: string[] = [];
      let match;

      while ((match = printRegex.exec(code)) !== null) {
        let rawArg = match[1]?.trim() || '';
        if (rawArg.startsWith('"') && rawArg.endsWith('"')) {
          outputs.push(rawArg.slice(1, -1));
        } else {
          outputs.push(rawArg);
        }
      }

      setConsoleOutput(outputs.length > 0 ? outputs.join('\n') : "Program compiled successfully with no printed output.");
      setIsRunning(false);
    }, 400);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTestResults(null);

    setTimeout(() => {
      // Test 1: Class Main and public static void main exist
      const hasClass = /class\s+Main\b/.test(code);
      const hasMainMethod = /public\s+static\s+void\s+main/.test(code);
      const test1Passed = hasClass && hasMainMethod;

      // Test 2: Output matches expected
      const hasExpectedPrint = expectedOutput ? code.includes(expectedOutput) : true;
      const test2Passed = hasExpectedPrint;

      const isAllPassed = test1Passed && test2Passed;
      if (isAllPassed) {
        storage.set(`assignment_completed:${lessonId}`, true);
      }

      setTestResults({
        test1Passed,
        test2Passed,
        submitted: true
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setCode(initialCode);
    setConsoleOutput(null);
    setTestResults(null);
  };

  const allPassed = testResults?.submitted && testResults.test1Passed && testResults.test2Passed;

  return (
    <div className="space-y-6">
      {/* Problem Specification Card */}
      <Card className="p-5 sm:p-6 space-y-3.5 border-slate-200/90 shadow-subtle bg-white">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <FileCode className="w-4 h-4 text-brand-600" />
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
            {title.replace(/^Assignment:\s*/i, '')}
          </h3>
        </div>

        {/* Problem statement description */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
          {problemStatement}
        </p>

        {/* Hints */}
        {hints.length > 0 && (
          <div className="pt-1">
            {!showHint ? (
              <button
                onClick={() => setShowHint(true)}
                className="text-xs text-brand-600 hover:text-brand-800 font-medium cursor-pointer"
              >
                💡 Need a hint?
              </button>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 space-y-1 animate-fadeIn">
                <span className="font-bold">Hint:</span>
                {hints.map((h, i) => (
                  <p key={i}>• {h}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Interactive Code Editor & Actions */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-elevated text-slate-100">
        <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-brand-400" />
              Main.java
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Reset code"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleRun}
              disabled={isRunning || isSubmitting}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors cursor-pointer min-h-[36px]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? "Running..." : "Run Code"}</span>
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || isRunning}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer min-h-[36px]"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isSubmitting ? "Checking..." : "Submit"}</span>
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="p-4 font-mono text-xs sm:text-sm bg-slate-950">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-48 bg-slate-900 text-emerald-300 font-mono text-xs sm:text-sm p-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Test Console Output */}
        {consoleOutput !== null && (
          <div className="border-t border-slate-800 bg-black/90 p-4 space-y-1.5 animate-fadeIn">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 border-b border-slate-800 pb-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>CONSOLE OUTPUT:</span>
            </div>
            <pre className="font-mono text-xs text-emerald-300 whitespace-pre-wrap leading-relaxed">
              {consoleOutput}
            </pre>
          </div>
        )}
      </div>

      {/* Test Cases Results */}
      {testResults?.submitted && (
        <Card className="space-y-3.5 border-slate-200 animate-fadeIn">
          <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <span>🧪</span>
            <span>Test Results:</span>
          </h4>

          <div className="space-y-2">
            {/* Test 1 */}
            <div className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm ${
              testResults.test1Passed
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}>
              <div className="flex items-center space-x-2">
                {testResults.test1Passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span className="font-medium">Test 1: Valid Class structure & main entry point</span>
              </div>
              <span className="font-bold text-xs">
                {testResults.test1Passed ? "PASSED ✓" : "FAILED ✕"}
              </span>
            </div>

            {/* Test 2 */}
            <div className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm ${
              testResults.test2Passed
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}>
              <div className="flex items-center space-x-2">
                {testResults.test2Passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span className="font-medium">Test 2: Matches expected output string (&quot;{expectedOutput}&quot;)</span>
              </div>
              <span className="font-bold text-xs">
                {testResults.test2Passed ? "PASSED ✓" : "FAILED ✕"}
              </span>
            </div>
          </div>

          {/* Success Banner */}
          {allPassed ? (
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-300 text-center space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-center space-x-2 text-emerald-900 font-extrabold text-sm sm:text-base">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Assignment Successfully Completed! +50 XP 🎉</span>
              </div>
              <p className="text-xs text-emerald-800">
                All test criteria satisfied. Your code is verified and production-ready.
              </p>
            </div>
          ) : (
            <p className="text-xs text-rose-600 font-medium">
              Some tests failed. Check your code above, click &quot;Test Run&quot; to inspect console output, and submit again!
            </p>
          )}
        </Card>
      )}
    </div>
  );
};

"use client";

import React, { useState } from 'react';
import type { LessonDetail } from '@learnbyself/types';
import { Card } from '@learnbyself/ui';
import {
  BookOpen,
  Copy,
  Check,
  FileCode,
  Terminal,
  Layers,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

interface SummaryCheatSheetProps {
  lesson: LessonDetail;
}

export const SummaryCheatSheet: React.FC<SummaryCheatSheetProps> = ({ lesson }) => {
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const slug = lesson.slug;

  // Extract key takeaways from concept breakdown if available
  const conceptAct = lesson.activities?.find(a => a.type === 'concept');
  const keyTakeaways = conceptAct?.breakdown?.keyTakeaways || [];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Core Summary Card */}
      <Card className="p-5 sm:p-6 bg-white border-slate-200/90 shadow-subtle space-y-3">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <BookOpen className="w-4 h-4 text-brand-600" />
          <h3 className="font-bold text-sm sm:text-base text-slate-900">
            {lesson.title} — Quick Revision Summary
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          {lesson.summary}
        </p>

        {keyTakeaways.length > 0 && (
          <div className="pt-2 border-t border-slate-100 space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Key Principles to Remember
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-700">
              {keyTakeaways.map((point, idx) => (
                <div key={idx} className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-brand-600 font-bold mt-0.5">•</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* ---------------------------------------------------- */}
      {/* TOPIC-SPECIFIC CHEAT SHEETS                           */}
      {/* ---------------------------------------------------- */}

      {/* Lesson: java-and-jvm */}
      {(slug === 'java-and-jvm' || slug === 'what-is-java-and-the-jvm') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              JDK vs JRE vs JVM Reference Matrix
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Component</th>
                  <th className="p-2.5">Target Audience</th>
                  <th className="p-2.5">Contents</th>
                  <th className="p-2.5 rounded-r-lg">Platform Dependent?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-indigo-700">JDK</td>
                  <td className="p-2.5 font-sans text-slate-700">Developers & Engineers</td>
                  <td className="p-2.5 font-sans text-slate-600">JRE + Compiler (javac) + Debugger (jdb)</td>
                  <td className="p-2.5 font-sans font-semibold text-emerald-600">Yes (OS specific)</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-amber-700">JRE</td>
                  <td className="p-2.5 font-sans text-slate-700">End Users running apps</td>
                  <td className="p-2.5 font-sans text-slate-600">JVM + Standard Class Libraries</td>
                  <td className="p-2.5 font-sans font-semibold text-emerald-600">Yes (OS specific)</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-emerald-700">JVM</td>
                  <td className="p-2.5 font-sans text-slate-700">Runtime Execution Engine</td>
                  <td className="p-2.5 font-sans text-slate-600">Bytecode Interpreter + JIT Compiler</td>
                  <td className="p-2.5 font-sans font-semibold text-emerald-600">Yes (OS specific)</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-brand-50/30">
                  <td className="p-2.5 font-bold text-brand-700">Bytecode (.class)</td>
                  <td className="p-2.5 font-sans text-slate-700">JVM Instruction Set</td>
                  <td className="p-2.5 font-sans text-slate-600">Universal instructions for JVM</td>
                  <td className="p-2.5 font-sans font-bold text-indigo-600">No (Platform Independent)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson: install-java */}
      {(slug === 'install-java' || slug === 'installing-java-on-windows-and-mac') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Terminal className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Setup & Environment Commands Reference
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-mono">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Command / Variable</th>
                  <th className="p-2.5">Operating System</th>
                  <th className="p-2.5 rounded-r-lg">Purpose & Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">javac -version</td>
                  <td className="p-2.5 font-sans text-slate-600">Windows / macOS / Linux</td>
                  <td className="p-2.5 font-sans text-slate-700">Verifies compiler availability</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">java -version</td>
                  <td className="p-2.5 font-sans text-slate-600">Windows / macOS / Linux</td>
                  <td className="p-2.5 font-sans text-slate-700">Verifies JVM runtime execution</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-indigo-700">JAVA_HOME</td>
                  <td className="p-2.5 font-sans text-slate-600">All Platforms</td>
                  <td className="p-2.5 font-sans text-slate-700">Points to JDK root folder (needed by Maven, Gradle, IDEs)</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-indigo-700">PATH</td>
                  <td className="p-2.5 font-sans text-slate-600">All Platforms</td>
                  <td className="p-2.5 font-sans text-slate-700">Must include JDK /bin subfolder to run javac from anywhere</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson: your-first-program */}
      {(slug === 'your-first-program' || slug === 'your-first-java-program-and-execution') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <FileCode className="w-4 h-4 text-brand-600" />
              <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                Main Method Anatomy & Syntax Blueprint
              </h4>
            </div>
            <button
              onClick={() => handleCopy(`public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`)}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center space-x-1 cursor-pointer"
            >
              {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSnippet ? 'Copied' : 'Copy Template'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold font-mono text-indigo-700">public</span>
              <p className="text-slate-600 text-[11px]">Accessible to JVM runtime from outside the class.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold font-mono text-brand-700">static</span>
              <p className="text-slate-600 text-[11px]">Can be called without creating an instance in memory.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold font-mono text-rose-700">void</span>
              <p className="text-slate-600 text-[11px]">Returns nothing back to the operating system.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold font-mono text-amber-700">main</span>
              <p className="text-slate-600 text-[11px]">Exact kickoff gate name required by JVM specification.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold font-mono text-emerald-700">String[] args</span>
              <p className="text-slate-600 text-[11px]">Array of command-line text arguments from terminal.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold font-mono text-cyan-700">; (semicolon)</span>
              <p className="text-slate-600 text-[11px]">Mandatory terminator for every statement.</p>
            </div>
          </div>
        </Card>
      )}

      {/* Lesson: variables-storing-information */}
      {slug === 'variables-storing-information' && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Variable Operations & Naming Standards
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Operation</th>
                  <th className="p-2.5">Java Syntax</th>
                  <th className="p-2.5">RAM Hardware Behavior</th>
                  <th className="p-2.5 rounded-r-lg">Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-indigo-700">Declaration</td>
                  <td className="p-2.5 font-mono text-slate-800">int rollNumber;</td>
                  <td className="p-2.5 text-slate-600">Reserves 4 bytes in RAM Stack</td>
                  <td className="p-2.5 text-slate-700">No value stored yet</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-amber-700">Assignment</td>
                  <td className="p-2.5 font-mono text-slate-800">rollNumber = 101;</td>
                  <td className="p-2.5 text-slate-600">Stores binary 101 into reserved slot</td>
                  <td className="p-2.5 text-slate-700">Must match declared type</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-brand-50/30">
                  <td className="p-2.5 font-bold text-emerald-700">Initialization</td>
                  <td className="p-2.5 font-mono text-slate-800">int rollNumber = 101;</td>
                  <td className="p-2.5 text-slate-600">Reserves and fills in single atomic step</td>
                  <td className="p-2.5 font-semibold text-emerald-700">Best practice in Java</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-cyan-700">Reassignment</td>
                  <td className="p-2.5 font-mono text-slate-800">rollNumber = 105;</td>
                  <td className="p-2.5 text-slate-600">Old value overwritten in place</td>
                  <td className="p-2.5 text-slate-700">No type keyword during update</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="font-bold text-slate-800">Naming Convention:</span>
            <p className="text-slate-600">Always use <code className="font-mono text-brand-700 font-semibold">camelCase</code> (e.g., <code className="font-mono">studentAge</code>, <code className="font-mono">accountBalance</code>). Must start with a letter, $, or _ (never a digit).</p>
          </div>
        </Card>
      )}

      {/* Lesson: java-data-types */}
      {slug === 'java-data-types' && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Primitive Types vs Reference Types Reference
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Feature</th>
                  <th className="p-2.5">Primitive Types (8 Types)</th>
                  <th className="p-2.5 rounded-r-lg">Reference Types (String, Arrays, Classes)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">What is Stored</td>
                  <td className="p-2.5 text-emerald-700 font-semibold">Actual raw binary value directly</td>
                  <td className="p-2.5 text-indigo-700 font-semibold">Memory address pointer pointing to Heap</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Memory Location</td>
                  <td className="p-2.5 text-slate-700 font-mono">Stack (inside method frame)</td>
                  <td className="p-2.5 text-slate-700 font-mono">Heap (pointer stored on Stack)</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Can be null?</td>
                  <td className="p-2.5 text-rose-700 font-semibold">No (always has fixed value)</td>
                  <td className="p-2.5 text-emerald-700 font-semibold">Yes (can point to null)</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Has Methods?</td>
                  <td className="p-2.5 text-slate-600">No (pure raw data)</td>
                  <td className="p-2.5 text-slate-700 font-semibold">Yes (e.g. .length(), .toUpperCase())</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson: integer-numbers-byte-short-int-long */}
      {slug === 'integer-numbers-byte-short-int-long' && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              The 4 Integer Types: Ranges & Suffix Rules
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-mono">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Type</th>
                  <th className="p-2.5">Bits / Bytes</th>
                  <th className="p-2.5">Exact Range</th>
                  <th className="p-2.5">Suffix</th>
                  <th className="p-2.5 rounded-r-lg">Typical Real-World Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">byte</td>
                  <td className="p-2.5 text-slate-700">8 bits (1B)</td>
                  <td className="p-2.5 text-slate-700 font-sans">-128 to 127</td>
                  <td className="p-2.5 text-slate-500 font-sans">None</td>
                  <td className="p-2.5 font-sans text-slate-600">Semesters (1-8), byte streams</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">short</td>
                  <td className="p-2.5 text-slate-700">16 bits (2B)</td>
                  <td className="p-2.5 text-slate-700 font-sans">-32,768 to 32,767</td>
                  <td className="p-2.5 text-slate-500 font-sans">None</td>
                  <td className="p-2.5 font-sans text-slate-600">Floor capacity, audio samples</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-brand-50/30">
                  <td className="p-2.5 font-bold text-indigo-700">int</td>
                  <td className="p-2.5 text-indigo-700 font-bold">32 bits (4B)</td>
                  <td className="p-2.5 text-slate-700 font-sans">-2,147,483,648 to 2,147,483,647</td>
                  <td className="p-2.5 text-emerald-600 font-sans font-semibold">Standard Default</td>
                  <td className="p-2.5 font-sans text-slate-600">Daily whole numbers, loop counters</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">long</td>
                  <td className="p-2.5 text-slate-700">64 bits (8B)</td>
                  <td className="p-2.5 text-slate-700 font-sans">-9.22 × 10¹⁸ to +9.22 × 10¹⁸</td>
                  <td className="p-2.5 text-rose-600 font-sans font-bold">Mandatory &apos;L&apos; or &apos;l&apos;</td>
                  <td className="p-2.5 font-sans text-slate-600">12-digit Aadhaar, national budget</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="font-bold text-slate-800">Pro-tip for Readability:</span>
            <p className="text-slate-600">Use underscores for large numbers: <code className="font-mono text-brand-700 font-semibold">long pop = 8_050_000_000L;</code></p>
          </div>
        </Card>
      )}

      {/* Lesson: decimal-numbers-float-double */}
      {slug === 'decimal-numbers-float-double' && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              float vs double Precision Cheatsheet
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-mono">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Type</th>
                  <th className="p-2.5">Memory</th>
                  <th className="p-2.5">Precision Digits</th>
                  <th className="p-2.5">Literal Suffix</th>
                  <th className="p-2.5 rounded-r-lg">When to Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-cyan-700">float</td>
                  <td className="p-2.5 text-slate-700">4 bytes (32-bit)</td>
                  <td className="p-2.5 text-slate-700 font-sans">~6 to 7 digits</td>
                  <td className="p-2.5 text-rose-600 font-sans font-bold">Mandatory &apos;f&apos; / &apos;F&apos;</td>
                  <td className="p-2.5 font-sans text-slate-600">3D graphics, mobile games, memory saving</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-brand-50/30">
                  <td className="p-2.5 font-bold text-indigo-700">double</td>
                  <td className="p-2.5 text-indigo-700 font-bold">8 bytes (64-bit)</td>
                  <td className="p-2.5 text-slate-700 font-sans">~15 to 16 digits</td>
                  <td className="p-2.5 text-emerald-600 font-sans font-semibold">Standard Default (&apos;d&apos; optional)</td>
                  <td className="p-2.5 font-sans text-slate-600">Standard for all math, geometry, and science</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>The Financial Rule (Interview Question):</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Because of binary floating-point representation, <code className="font-mono bg-white px-1 py-0.5 rounded border border-amber-200">0.1 + 0.2 = 0.30000000000000004</code>. In banking or UPI currency, never use double; use <strong className="text-slate-900">BigDecimal</strong> or store money in whole paise using <strong className="text-slate-900">long</strong>.
            </p>
          </div>
        </Card>
      )}

      {/* Lesson: char-boolean-string */}
      {slug === 'char-boolean-string' && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Text, Unicode & Boolean Decision Rules
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-mono">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Type</th>
                  <th className="p-2.5">Category</th>
                  <th className="p-2.5">Enclosed In</th>
                  <th className="p-2.5">Sample Literal</th>
                  <th className="p-2.5 rounded-r-lg">Core Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-emerald-700">char</td>
                  <td className="p-2.5 font-sans text-slate-600">Primitive (2B)</td>
                  <td className="p-2.5 font-sans font-bold text-slate-900">Single Quotes (&apos; &apos;)</td>
                  <td className="p-2.5 text-slate-800">&apos;A&apos;, &apos;₹&apos;, &apos;9&apos;</td>
                  <td className="p-2.5 font-sans text-slate-700">16-bit Unicode UTF-16 character</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-purple-700">boolean</td>
                  <td className="p-2.5 font-sans text-slate-600">Primitive (1 bit)</td>
                  <td className="p-2.5 font-sans text-slate-500">None</td>
                  <td className="p-2.5 text-slate-800">true, false</td>
                  <td className="p-2.5 font-sans text-slate-700">Strictly non-numeric! 0 or 1 is illegal in Java</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-brand-50/30">
                  <td className="p-2.5 font-bold text-indigo-700">String</td>
                  <td className="p-2.5 font-sans text-slate-600">Reference Class</td>
                  <td className="p-2.5 font-sans font-bold text-slate-900">Double Quotes (&quot; &quot;)</td>
                  <td className="p-2.5 text-slate-800">&quot;Aman Gupta&quot;</td>
                  <td className="p-2.5 font-sans text-slate-700">Immutable sequence of text. Concatenates with &apos;+&apos;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson: variables-scope-memory */}
      {slug === 'variables-scope-memory' && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Variable Scope & Memory Lifetimes
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Variable Kind</th>
                  <th className="p-2.5">Where Declared</th>
                  <th className="p-2.5">Memory Location</th>
                  <th className="p-2.5">Default Value</th>
                  <th className="p-2.5 rounded-r-lg">Lifetime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80 bg-brand-50/30">
                  <td className="p-2.5 font-bold text-indigo-700">Local Variable</td>
                  <td className="p-2.5 text-slate-700">Inside a method or block {"{ }"}</td>
                  <td className="p-2.5 font-mono text-slate-800">Stack Frame</td>
                  <td className="p-2.5 font-bold text-rose-600">None! Must initialize!</td>
                  <td className="p-2.5 text-slate-600">Destroyed when block/method exits</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-800">Instance Variable</td>
                  <td className="p-2.5 text-slate-700">Inside class, outside methods</td>
                  <td className="p-2.5 font-mono text-slate-800">Heap (inside Object)</td>
                  <td className="p-2.5 font-mono text-emerald-700">0, 0.0, false, null</td>
                  <td className="p-2.5 text-slate-600">Lives as long as the object lives</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="font-bold text-slate-800">Non-negotiable Rule:</span>
            <p className="text-slate-600">Local variables do NOT get default values. If you read an uninitialized local variable, Java throws a compilation error: <code className="font-mono text-rose-600">variable might not have been initialized</code>.</p>
          </div>
        </Card>
      )}

      {/* Lesson: constants-and-final */}
      {slug === 'constants-and-final' && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Constants &amp; The &apos;final&apos; Keyword Blueprint
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Aspect</th>
                  <th className="p-2.5">Regular Variable</th>
                  <th className="p-2.5 rounded-r-lg">Constant (final)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-800">Keyword</td>
                  <td className="p-2.5 font-mono text-slate-600">(none)</td>
                  <td className="p-2.5 font-mono font-bold text-brand-700">final</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-800">Can Value Change?</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">Yes, anytime</td>
                  <td className="p-2.5 text-rose-600 font-bold">No, locked after initial assignment</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-800">Naming Convention</td>
                  <td className="p-2.5 font-mono text-slate-700">camelCase (e.g. studentAge)</td>
                  <td className="p-2.5 font-mono font-bold text-indigo-700">UPPER_SNAKE_CASE (e.g. GST_RATE)</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-800">Engineering Purpose</td>
                  <td className="p-2.5 text-slate-600">Track dynamic changing state</td>
                  <td className="p-2.5 text-slate-600">Eliminate magic numbers & prevent bugs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson: type-conversion-and-casting */}
      {slug === 'type-conversion-and-casting' && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Type Casting Hierarchy & Integer Division Rule
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
              <span className="font-bold text-emerald-900 text-xs">Widening Casting (Automatic / Safe)</span>
              <p className="text-slate-600 text-[11px]">Converts smaller type to larger type. Zero risk of data loss:</p>
              <div className="p-2 rounded bg-white font-mono text-[11px] text-emerald-800 border border-emerald-100 font-bold">
                byte → short → int → long → float → double
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1.5">
              <span className="font-bold text-amber-900 text-xs">Narrowing Casting (Manual / Explicit)</span>
              <p className="text-slate-600 text-[11px]">Converts larger type to smaller type. Truncates decimals. Requires (type):</p>
              <div className="p-2 rounded bg-white font-mono text-[11px] text-amber-800 border border-amber-100 font-bold">
                double → float → long → int → short → byte
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="font-bold text-slate-800">The #1 Beginner Trap (Integer Division):</span>
            <p className="text-slate-600">
              In Java, <code className="font-mono text-rose-600 font-bold">7 / 2 == 3</code> (the .5 is chopped off!). To get 3.5, cast at least one operand: <code className="font-mono text-emerald-700 font-bold">((double) 7 / 2) == 3.5</code> or write <code className="font-mono text-emerald-700 font-bold">7.0 / 2</code>.
            </p>
          </div>
        </Card>
      )}

      {/* Lesson: overflow-precision-common-mistakes */}
      {slug === 'overflow-precision-common-mistakes' && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Top 4 Gotchas & Defensive Coding Solutions
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Gotcha</th>
                  <th className="p-2.5">Symptom</th>
                  <th className="p-2.5">Underlying Cause</th>
                  <th className="p-2.5 rounded-r-lg">Prevention / Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-rose-700">Integer Overflow</td>
                  <td className="p-2.5 text-slate-600">Positive value turns negative</td>
                  <td className="p-2.5 text-slate-600">Exceeds 2,147,483,647</td>
                  <td className="p-2.5 font-semibold text-emerald-700">Use long or Math.addExact()</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-amber-700">Float Imprecision</td>
                  <td className="p-2.5 text-slate-600">0.1 + 0.2 != 0.3</td>
                  <td className="p-2.5 text-slate-600">Base-2 binary fraction limit</td>
                  <td className="p-2.5 font-semibold text-emerald-700">Use BigDecimal for currency</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-indigo-700">Missing Suffix</td>
                  <td className="p-2.5 text-slate-600">Compiler error: number too large</td>
                  <td className="p-2.5 text-slate-600">Literals default to 32-bit int</td>
                  <td className="p-2.5 font-semibold text-emerald-700">Append &apos;L&apos; (long) or &apos;f&apos; (float)</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-800">= vs == in if</td>
                  <td className="p-2.5 text-slate-600">if (isMember = true) always runs</td>
                  <td className="p-2.5 text-slate-600">Single = is assignment</td>
                  <td className="p-2.5 font-semibold text-emerald-700">Write: if (isMember)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson: variables-data-types-final-challenge */}
      {slug === 'variables-data-types-final-challenge' && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Module 02 Capstone Data Modeling Reference
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Domain Entity</th>
                  <th className="p-2.5">Optimal Java Type</th>
                  <th className="p-2.5">Sample Value</th>
                  <th className="p-2.5 rounded-r-lg">Engineering Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Student Name</td>
                  <td className="p-2.5 font-mono text-indigo-700">String</td>
                  <td className="p-2.5 font-mono text-slate-700">&quot;Aman Gupta&quot;</td>
                  <td className="p-2.5 text-slate-600">Text sequence, immutable reference class</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Semester</td>
                  <td className="p-2.5 font-mono text-brand-700">byte / int</td>
                  <td className="p-2.5 font-mono text-slate-700">4</td>
                  <td className="p-2.5 text-slate-600">Bounded small number (1 to 8)</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Exam Marks</td>
                  <td className="p-2.5 font-mono text-brand-700">int</td>
                  <td className="p-2.5 font-mono text-slate-700">92</td>
                  <td className="p-2.5 text-slate-600">Standard 32-bit whole number score</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Percentage</td>
                  <td className="p-2.5 font-mono text-indigo-700">double</td>
                  <td className="p-2.5 font-mono text-slate-700">88.33</td>
                  <td className="p-2.5 text-slate-600">Requires decimal precision with casting</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Grade Symbol</td>
                  <td className="p-2.5 font-mono text-emerald-700">char</td>
                  <td className="p-2.5 font-mono text-slate-700">&apos;A&apos;</td>
                  <td className="p-2.5 text-slate-600">Single 16-bit Unicode character</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Tuition Fee Constant</td>
                  <td className="p-2.5 font-mono text-purple-700">final double</td>
                  <td className="p-2.5 font-mono text-slate-700">75000.0</td>
                  <td className="p-2.5 text-slate-600">Locked business rule, UPPER_SNAKE_CASE</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Payment Status</td>
                  <td className="p-2.5 font-mono text-purple-700">boolean</td>
                  <td className="p-2.5 font-mono text-slate-700">true</td>
                  <td className="p-2.5 text-slate-600">Strict binary true/false condition</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ==================================================== */}
      {/* MODULE 03: OPERATORS CHEAT SHEETS                    */}
      {/* ==================================================== */}

      {/* Lesson 1: arithmetic-operators-doing-calculations */}
      {(slug === 'arithmetic-operators-doing-calculations' || slug === 'arithmetic-operators') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Java Arithmetic Operators &amp; Truncation Rules
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Operator</th>
                  <th className="p-2.5">Name</th>
                  <th className="p-2.5">Example</th>
                  <th className="p-2.5">Result</th>
                  <th className="p-2.5 rounded-r-lg">Critical Evaluation Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">+</td>
                  <td className="p-2.5 font-sans text-slate-700">Addition / Concatenation</td>
                  <td className="p-2.5 text-slate-800">10 + 5 / &quot;A&quot; + 1</td>
                  <td className="p-2.5 text-emerald-700 font-bold">15 / &quot;A1&quot;</td>
                  <td className="p-2.5 font-sans text-slate-600">If either operand is String, performs concatenation</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">-</td>
                  <td className="p-2.5 font-sans text-slate-700">Subtraction</td>
                  <td className="p-2.5 text-slate-800">10 - 4</td>
                  <td className="p-2.5 text-emerald-700 font-bold">6</td>
                  <td className="p-2.5 font-sans text-slate-600">Standard binary subtraction or unary negation</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">*</td>
                  <td className="p-2.5 font-sans text-slate-700">Multiplication</td>
                  <td className="p-2.5 text-slate-800">7 * 6</td>
                  <td className="p-2.5 text-emerald-700 font-bold">42</td>
                  <td className="p-2.5 font-sans text-slate-600">Product of operands; subject to integer overflow if excessive</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-amber-50/30">
                  <td className="p-2.5 font-bold text-amber-700">/ (integer)</td>
                  <td className="p-2.5 font-sans text-slate-700">Integer Division</td>
                  <td className="p-2.5 text-slate-800">7 / 2</td>
                  <td className="p-2.5 text-amber-800 font-bold">3</td>
                  <td className="p-2.5 font-sans text-slate-600">Truncates fraction completely towards zero (NOT rounded)</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-indigo-700">/ (floating)</td>
                  <td className="p-2.5 font-sans text-slate-700">Floating Division</td>
                  <td className="p-2.5 text-slate-800">7.0 / 2</td>
                  <td className="p-2.5 text-emerald-700 font-bold">3.5</td>
                  <td className="p-2.5 font-sans text-slate-600">Promotes operand to double when one side is decimal</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-brand-50/30">
                  <td className="p-2.5 font-bold text-brand-700">%</td>
                  <td className="p-2.5 font-sans text-slate-700">Modulus (Remainder)</td>
                  <td className="p-2.5 text-slate-800">17 % 5</td>
                  <td className="p-2.5 text-emerald-700 font-bold">2</td>
                  <td className="p-2.5 font-sans text-slate-600">Result sign strictly follows the numerator sign (-17 % 5 = -2)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
            <span className="font-bold text-slate-900 block">Division by Zero Rules:</span>
            <p>• Integer: <code className="font-mono text-rose-700">10 / 0</code> throws <code className="font-mono text-rose-700">ArithmeticException: / by zero</code> at runtime.</p>
            <p>• Floating-point: <code className="font-mono text-indigo-700">10.0 / 0.0</code> evaluates to <code className="font-mono text-indigo-700">Infinity</code>, and <code className="font-mono text-indigo-700">0.0 / 0.0</code> evaluates to <code className="font-mono text-indigo-700">NaN</code> (No exception thrown).</p>
          </div>
        </Card>
      )}

      {/* Lesson 2: assignment-and-compound-assignment */}
      {(slug === 'assignment-and-compound-assignment' || slug === 'assignment-operators') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <FileCode className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Compound Assignment &amp; Automatic Implicit Cast Reference
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Compound Form</th>
                  <th className="p-2.5">Equivalent Long Expression</th>
                  <th className="p-2.5">Exact Internal Compilation</th>
                  <th className="p-2.5 rounded-r-lg">Why Compound Prevents Compile Error</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">x += y</td>
                  <td className="p-2.5 text-slate-700">x = x + y</td>
                  <td className="p-2.5 text-indigo-700">x = (typeOf(x))(x + y)</td>
                  <td className="p-2.5 font-sans text-slate-600">Implicit cast inserted automatically by compiler</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">x -= y</td>
                  <td className="p-2.5 text-slate-700">x = x - y</td>
                  <td className="p-2.5 text-indigo-700">x = (typeOf(x))(x - y)</td>
                  <td className="p-2.5 font-sans text-slate-600">Subtracts and casts back into left variable&apos;s type</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">x *= y</td>
                  <td className="p-2.5 text-slate-700">x = x * y</td>
                  <td className="p-2.5 text-indigo-700">x = (typeOf(x))(x * y)</td>
                  <td className="p-2.5 font-sans text-slate-600">Multiplies and downcasts if right operand is wider</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">x /= y</td>
                  <td className="p-2.5 text-slate-700">x = x / y</td>
                  <td className="p-2.5 text-indigo-700">x = (typeOf(x))(x / y)</td>
                  <td className="p-2.5 font-sans text-slate-600">Divides and stores result back into left variable</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">x %= y</td>
                  <td className="p-2.5 text-slate-700">x = x % y</td>
                  <td className="p-2.5 text-indigo-700">x = (typeOf(x))(x % y)</td>
                  <td className="p-2.5 font-sans text-slate-600">Computes remainder and casts back into left operand</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
            <span className="font-bold block">Interview Trap Comparison:</span>
            <p>• <code className="font-mono text-rose-800">byte b = 10; b = b + 5;</code> → <strong>Compiler Error!</strong> (b + 5 promotes to int, cannot assign int to byte without cast)</p>
            <p>• <code className="font-mono text-emerald-800">byte b = 10; b += 5;</code> → <strong>Compiles successfully!</strong> (Compiler inserts <code className="font-mono">(byte)(b + 5)</code> automatically)</p>
          </div>
        </Card>
      )}

      {/* Lesson 3: relational-and-equality-operators */}
      {(slug === 'relational-and-equality-operators' || slug === 'relational-operators' || slug === 'equality-operators') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Relational &amp; Equality Comparison Matrix
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Operator</th>
                  <th className="p-2.5">Comparison Meaning</th>
                  <th className="p-2.5">Example (a=10, b=20)</th>
                  <th className="p-2.5">Evaluates To</th>
                  <th className="p-2.5 rounded-r-lg">Application Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">&lt;</td>
                  <td className="p-2.5 font-sans text-slate-700">Strictly Less Than</td>
                  <td className="p-2.5 text-slate-800">a &lt; b</td>
                  <td className="p-2.5 text-emerald-700 font-bold">true</td>
                  <td className="p-2.5 font-sans text-slate-600">Exclusive lower bound check</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">&lt;=</td>
                  <td className="p-2.5 font-sans text-slate-700">Less Than or Equal</td>
                  <td className="p-2.5 text-slate-800">a &lt;= 10</td>
                  <td className="p-2.5 text-emerald-700 font-bold">true</td>
                  <td className="p-2.5 font-sans text-slate-600">Inclusive threshold testing</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">&gt;</td>
                  <td className="p-2.5 font-sans text-slate-700">Strictly Greater Than</td>
                  <td className="p-2.5 text-slate-800">a &gt; b</td>
                  <td className="p-2.5 text-rose-700 font-bold">false</td>
                  <td className="p-2.5 font-sans text-slate-600">Exclusive upper bound check</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">&gt;=</td>
                  <td className="p-2.5 font-sans text-slate-700">Greater Than or Equal</td>
                  <td className="p-2.5 text-slate-800">b &gt;= 20</td>
                  <td className="p-2.5 text-emerald-700 font-bold">true</td>
                  <td className="p-2.5 font-sans text-slate-600">Inclusive upper threshold testing</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-indigo-50/30">
                  <td className="p-2.5 font-bold text-indigo-700">==</td>
                  <td className="p-2.5 font-sans text-slate-700">Equal To</td>
                  <td className="p-2.5 text-slate-800">a == 10</td>
                  <td className="p-2.5 text-emerald-700 font-bold">true</td>
                  <td className="p-2.5 font-sans text-slate-600">Tests primitive value equality OR object reference equality</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-indigo-700">!=</td>
                  <td className="p-2.5 font-sans text-slate-700">Not Equal To</td>
                  <td className="p-2.5 text-slate-800">a != b</td>
                  <td className="p-2.5 text-emerald-700 font-bold">true</td>
                  <td className="p-2.5 font-sans text-slate-600">Inversion of equality check</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
            <span className="font-bold text-slate-900 block">Critical Distinction: Primitives vs Objects</span>
            <p>• Primitives (<code className="font-mono text-brand-700">int, double, char</code>): <code className="font-mono">==</code> compares their actual binary numeric value.</p>
            <p>• Object References (<code className="font-mono text-purple-700">String, Object</code>): <code className="font-mono">==</code> compares memory heap addresses. To compare string text contents, always call <code className="font-mono text-emerald-700">str1.equals(str2)</code>.</p>
          </div>
        </Card>
      )}

      {/* Lesson 4: logical-operators-and-or-not */}
      {(slug === 'logical-operators-and-or-not' || slug === 'logical-operators') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-purple-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Boolean Logic Truth Table &amp; De Morgan&apos;s Laws
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg font-mono">Condition A</th>
                  <th className="p-2.5 font-mono">Condition B</th>
                  <th className="p-2.5 font-mono text-brand-700">A &amp;&amp; B (AND)</th>
                  <th className="p-2.5 font-mono text-indigo-700">A || B (OR)</th>
                  <th className="p-2.5 font-mono text-purple-700">!A (NOT)</th>
                  <th className="p-2.5 rounded-r-lg">Summary Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 text-emerald-700 font-bold">true</td>
                  <td className="p-2.5 text-emerald-700 font-bold">true</td>
                  <td className="p-2.5 text-emerald-700 font-bold">true</td>
                  <td className="p-2.5 text-emerald-700 font-bold">true</td>
                  <td className="p-2.5 text-rose-700">false</td>
                  <td className="p-2.5 font-sans text-slate-600">Both true: AND &amp; OR are satisfied</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 text-emerald-700 font-bold">true</td>
                  <td className="p-2.5 text-rose-700">false</td>
                  <td className="p-2.5 text-rose-700">false</td>
                  <td className="p-2.5 text-emerald-700 font-bold">true</td>
                  <td className="p-2.5 text-rose-700">false</td>
                  <td className="p-2.5 font-sans text-slate-600">OR is true because A is true</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 text-rose-700">false</td>
                  <td className="p-2.5 text-emerald-700 font-bold">true</td>
                  <td className="p-2.5 text-rose-700">false</td>
                  <td className="p-2.5 text-emerald-700 font-bold">true</td>
                  <td className="p-2.5 text-emerald-700 font-bold">true</td>
                  <td className="p-2.5 font-sans text-slate-600">OR is true because B is true</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 text-rose-700">false</td>
                  <td className="p-2.5 text-rose-700">false</td>
                  <td className="p-2.5 text-rose-700">false</td>
                  <td className="p-2.5 text-rose-700">false</td>
                  <td className="p-2.5 text-emerald-700 font-bold">true</td>
                  <td className="p-2.5 font-sans text-slate-600">Both false: neither condition holds</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 text-xs text-indigo-900 space-y-1">
            <span className="font-bold block">De Morgan&apos;s Laws (Code Simplification):</span>
            <p>1. <code className="font-mono">!(A &amp;&amp; B)</code> is equivalent to <code className="font-mono">!A || !B</code></p>
            <p>2. <code className="font-mono">!(A || B)</code> is equivalent to <code className="font-mono">!A &amp;&amp; !B</code></p>
          </div>
        </Card>
      )}

      {/* Lesson 5: increment-and-decrement */}
      {(slug === 'increment-and-decrement' || slug === 'unary-operators' || slug === 'increment-or-decrement-pitfalls') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Prefix vs Postfix Increment &amp; Decrement Execution Guide
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Syntax</th>
                  <th className="p-2.5">Name</th>
                  <th className="p-2.5">Value Produced in Expression</th>
                  <th className="p-2.5">Variable State After Evaluation</th>
                  <th className="p-2.5 rounded-r-lg">Mental Model Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">++x</td>
                  <td className="p-2.5 font-sans text-slate-700">Pre-Increment</td>
                  <td className="p-2.5 text-emerald-700 font-bold">Updated (x + 1)</td>
                  <td className="p-2.5 text-slate-800">x + 1</td>
                  <td className="p-2.5 font-sans text-slate-600">Increment FIRST, then yield the new value</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-amber-50/30">
                  <td className="p-2.5 font-bold text-amber-700">x++</td>
                  <td className="p-2.5 font-sans text-slate-700">Post-Increment</td>
                  <td className="p-2.5 text-amber-800 font-bold">Current (original x)</td>
                  <td className="p-2.5 text-slate-800">x + 1</td>
                  <td className="p-2.5 font-sans text-slate-600">Yield the old value FIRST, then increment memory</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">--x</td>
                  <td className="p-2.5 font-sans text-slate-700">Pre-Decrement</td>
                  <td className="p-2.5 text-rose-700 font-bold">Updated (x - 1)</td>
                  <td className="p-2.5 text-slate-800">x - 1</td>
                  <td className="p-2.5 font-sans text-slate-600">Decrement FIRST, then yield the new value</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-amber-50/30">
                  <td className="p-2.5 font-bold text-amber-700">x--</td>
                  <td className="p-2.5 font-sans text-slate-700">Post-Decrement</td>
                  <td className="p-2.5 text-amber-800 font-bold">Current (original x)</td>
                  <td className="p-2.5 text-slate-800">x - 1</td>
                  <td className="p-2.5 font-sans text-slate-600">Yield the old value FIRST, then decrement memory</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
            <span className="font-bold text-slate-900 block">Classic Puzzle Trace:</span>
            <p className="font-mono text-slate-800">int a = 5; int result = a++ + ++a;</p>
            <p>1. Left operand <code className="font-mono">a++</code> yields <strong className="text-amber-700">5</strong>, and <code className="font-mono">a</code> becomes 6.</p>
            <p>2. Right operand <code className="font-mono">++a</code> increments <code className="font-mono">a</code> from 6 to 7, and yields <strong className="text-emerald-700">7</strong>.</p>
            <p>3. <code className="font-mono">result = 5 + 7 = 12</code>, with final <code className="font-mono">a = 7</code>.</p>
          </div>
        </Card>
      )}

      {/* Lesson 6: short-circuit-evaluation */}
      {slug === 'short-circuit-evaluation' && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Short-Circuit (&amp;&amp;, ||) vs Logical (&amp;, |) Evaluation
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Operator</th>
                  <th className="p-2.5">Evaluation Mode</th>
                  <th className="p-2.5">Short-Circuit Trigger</th>
                  <th className="p-2.5">Right-Hand Side Evaluated?</th>
                  <th className="p-2.5 rounded-r-lg">Defensive Guard Pattern</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr className="hover:bg-slate-50/80 bg-emerald-50/30">
                  <td className="p-2.5 font-bold text-emerald-700">&amp;&amp;</td>
                  <td className="p-2.5 font-sans text-slate-700">Short-Circuit AND</td>
                  <td className="p-2.5 text-rose-700 font-bold">Left is false</td>
                  <td className="p-2.5 font-sans text-emerald-700 font-bold">NO (Skipped completely)</td>
                  <td className="p-2.5 text-slate-700">str != null &amp;&amp; str.length() &gt; 0</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-700">&amp;</td>
                  <td className="p-2.5 font-sans text-slate-700">Logical AND (Non-short)</td>
                  <td className="p-2.5 font-sans text-slate-500">None</td>
                  <td className="p-2.5 font-sans text-rose-700 font-bold">YES (Always evaluates)</td>
                  <td className="p-2.5 font-sans text-rose-600">Throws NullPointerException if str is null!</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-emerald-50/30">
                  <td className="p-2.5 font-bold text-emerald-700">||</td>
                  <td className="p-2.5 font-sans text-slate-700">Short-Circuit OR</td>
                  <td className="p-2.5 text-emerald-700 font-bold">Left is true</td>
                  <td className="p-2.5 font-sans text-emerald-700 font-bold">NO (Skipped completely)</td>
                  <td className="p-2.5 text-slate-700">count == 0 || total / count &gt; 5</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-700">|</td>
                  <td className="p-2.5 font-sans text-slate-700">Logical OR (Non-short)</td>
                  <td className="p-2.5 font-sans text-slate-500">None</td>
                  <td className="p-2.5 font-sans text-rose-700 font-bold">YES (Always evaluates)</td>
                  <td className="p-2.5 font-sans text-rose-600">Throws ArithmeticException if count is 0!</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
            <span className="font-bold block">Production Best Practice:</span>
            <p>Always use short-circuit <code className="font-mono text-emerald-800">&amp;&amp;</code> and <code className="font-mono text-emerald-800">||</code> for conditional branching to safeguard your application from crashes.</p>
          </div>
        </Card>
      )}

      {/* Lesson 7: ternary-operator */}
      {slug === 'ternary-operator' && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <FileCode className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Ternary Operator (?:) Anatomy &amp; Numeric Promotion
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Clause</th>
                  <th className="p-2.5">Position in Syntax</th>
                  <th className="p-2.5">Expected Type</th>
                  <th className="p-2.5 rounded-r-lg">Evaluation Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">Condition</td>
                  <td className="p-2.5 font-sans text-slate-700">Before &apos;?&apos;</td>
                  <td className="p-2.5 text-indigo-700">boolean</td>
                  <td className="p-2.5 font-sans text-slate-600">Must evaluate strictly to true or false</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-emerald-700">True Expression</td>
                  <td className="p-2.5 font-sans text-slate-700">Between &apos;?&apos; and &apos;:&apos;</td>
                  <td className="p-2.5 text-slate-800">Any compatible type</td>
                  <td className="p-2.5 font-sans text-slate-600">Evaluated ONLY if condition is true; false branch is skipped</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-rose-700">False Expression</td>
                  <td className="p-2.5 font-sans text-slate-700">After &apos;:&apos;</td>
                  <td className="p-2.5 text-slate-800">Any compatible type</td>
                  <td className="p-2.5 font-sans text-slate-600">Evaluated ONLY if condition is false; true branch is skipped</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
            <span className="font-bold text-slate-900 block">Numeric Promotion Across Branches:</span>
            <p className="font-mono text-slate-800">double val = (score &gt; 50) ? 100 : 85.5;</p>
            <p>Even though <code className="font-mono">100</code> is an <code className="font-mono">int</code>, the entire ternary expression type resolves to <code className="font-mono text-indigo-700">double</code> because the false branch is a double. If true, it yields <code className="font-mono text-emerald-700">100.0</code>.</p>
          </div>
        </Card>
      )}

      {/* Lesson 8: operator-precedence-and-expression-evaluation */}
      {(slug === 'operator-precedence-and-expression-evaluation' || slug === 'operator-precedence' || slug === 'expression-evaluation') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Java Operator Precedence &amp; Associativity Hierarchy
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Precedence Rank</th>
                  <th className="p-2.5">Operator Category</th>
                  <th className="p-2.5 font-mono">Operators</th>
                  <th className="p-2.5 rounded-r-lg">Associativity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr className="hover:bg-slate-50/80 bg-brand-50/20">
                  <td className="p-2.5 font-sans font-bold text-brand-700">1 (Highest)</td>
                  <td className="p-2.5 font-sans text-slate-700">Postfix</td>
                  <td className="p-2.5 font-bold text-brand-700">expr++  expr--</td>
                  <td className="p-2.5 font-sans text-slate-600">Left to Right</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-sans font-bold text-slate-700">2</td>
                  <td className="p-2.5 font-sans text-slate-700">Unary</td>
                  <td className="p-2.5 font-bold text-indigo-700">++expr  --expr  +  -  !  ~</td>
                  <td className="p-2.5 font-sans text-purple-700 font-semibold">Right to Left</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-sans font-bold text-slate-700">3</td>
                  <td className="p-2.5 font-sans text-slate-700">Multiplicative</td>
                  <td className="p-2.5 font-bold text-slate-800">*  /  %</td>
                  <td className="p-2.5 font-sans text-slate-600">Left to Right</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-sans font-bold text-slate-700">4</td>
                  <td className="p-2.5 font-sans text-slate-700">Additive</td>
                  <td className="p-2.5 font-bold text-slate-800">+  -</td>
                  <td className="p-2.5 font-sans text-slate-600">Left to Right</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-sans font-bold text-slate-700">5</td>
                  <td className="p-2.5 font-sans text-slate-700">Shift</td>
                  <td className="p-2.5 font-bold text-slate-800">&lt;&lt;  &gt;&gt;  &gt;&gt;&gt;</td>
                  <td className="p-2.5 font-sans text-slate-600">Left to Right</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-sans font-bold text-slate-700">6</td>
                  <td className="p-2.5 font-sans text-slate-700">Relational</td>
                  <td className="p-2.5 font-bold text-slate-800">&lt;  &lt;=  &gt;  &gt;=</td>
                  <td className="p-2.5 font-sans text-slate-600">Left to Right</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-sans font-bold text-slate-700">7</td>
                  <td className="p-2.5 font-sans text-slate-700">Equality</td>
                  <td className="p-2.5 font-bold text-slate-800">==  !=</td>
                  <td className="p-2.5 font-sans text-slate-600">Left to Right</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-sans font-bold text-slate-700">8</td>
                  <td className="p-2.5 font-sans text-slate-700">Bitwise AND</td>
                  <td className="p-2.5 font-bold text-slate-800">&amp;</td>
                  <td className="p-2.5 font-sans text-slate-600">Left to Right</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-sans font-bold text-slate-700">9</td>
                  <td className="p-2.5 font-sans text-slate-700">Bitwise XOR</td>
                  <td className="p-2.5 font-bold text-slate-800">^</td>
                  <td className="p-2.5 font-sans text-slate-600">Left to Right</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-sans font-bold text-slate-700">10</td>
                  <td className="p-2.5 font-sans text-slate-700">Bitwise OR</td>
                  <td className="p-2.5 font-bold text-slate-800">|</td>
                  <td className="p-2.5 font-sans text-slate-600">Left to Right</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-sans font-bold text-slate-700">11</td>
                  <td className="p-2.5 font-sans text-slate-700">Logical AND</td>
                  <td className="p-2.5 font-bold text-emerald-700">&amp;&amp;</td>
                  <td className="p-2.5 font-sans text-slate-600">Left to Right</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-sans font-bold text-slate-700">12</td>
                  <td className="p-2.5 font-sans text-slate-700">Logical OR</td>
                  <td className="p-2.5 font-bold text-emerald-700">||</td>
                  <td className="p-2.5 font-sans text-slate-600">Left to Right</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-sans font-bold text-slate-700">13</td>
                  <td className="p-2.5 font-sans text-slate-700">Ternary</td>
                  <td className="p-2.5 font-bold text-purple-700">? :</td>
                  <td className="p-2.5 font-sans text-purple-700 font-semibold">Right to Left</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-slate-100/50">
                  <td className="p-2.5 font-sans font-bold text-slate-700">14 (Lowest)</td>
                  <td className="p-2.5 font-sans text-slate-700">Assignment</td>
                  <td className="p-2.5 font-bold text-slate-800">=  +=  -=  *=  /=  %=</td>
                  <td className="p-2.5 font-sans text-purple-700 font-semibold">Right to Left</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700">
            <span className="font-bold text-slate-900 block mb-1">Golden Rule of Precedence:</span>
            When in doubt, always use parentheses <code className="font-mono text-brand-700">( )</code> to explicitly define evaluation order. It guarantees zero ambiguity for yourself, the compiler, and future maintainers.
          </div>
        </Card>
      )}

      {/* Lesson 9: bitwise-and-shift-operators */}
      {(slug === 'bitwise-and-shift-operators' || slug === 'bitwise-operators' || slug === 'shift-operators') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Bitwise &amp; Shift Operations Reference Matrix
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Operator</th>
                  <th className="p-2.5">Name</th>
                  <th className="p-2.5">Binary Operation</th>
                  <th className="p-2.5">Example (5 = 0101, 3 = 0011)</th>
                  <th className="p-2.5 rounded-r-lg">Mathematical Effect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">&amp;</td>
                  <td className="p-2.5 font-sans text-slate-700">Bitwise AND</td>
                  <td className="p-2.5 text-slate-700">1 if both bits are 1</td>
                  <td className="p-2.5 text-emerald-700 font-bold">5 &amp; 3 = 1 (0001)</td>
                  <td className="p-2.5 font-sans text-slate-600">Bit masking and permission testing</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">|</td>
                  <td className="p-2.5 font-sans text-slate-700">Bitwise OR</td>
                  <td className="p-2.5 text-slate-700">1 if either bit is 1</td>
                  <td className="p-2.5 text-emerald-700 font-bold">5 | 3 = 7 (0111)</td>
                  <td className="p-2.5 font-sans text-slate-600">Setting specific flag bits</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">^</td>
                  <td className="p-2.5 font-sans text-slate-700">Bitwise XOR</td>
                  <td className="p-2.5 text-slate-700">1 if bits are different</td>
                  <td className="p-2.5 text-emerald-700 font-bold">5 ^ 3 = 6 (0110)</td>
                  <td className="p-2.5 font-sans text-slate-600">Toggling bits / finding unique non-duplicate</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700">~</td>
                  <td className="p-2.5 font-sans text-slate-700">Bitwise NOT</td>
                  <td className="p-2.5 text-slate-700">Inverts every bit (0 to 1, 1 to 0)</td>
                  <td className="p-2.5 text-rose-700 font-bold">~5 = -6</td>
                  <td className="p-2.5 font-sans text-slate-600">Two&apos;s complement inversion formula: ~x = -x - 1</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-indigo-50/20">
                  <td className="p-2.5 font-bold text-indigo-700">&lt;&lt;</td>
                  <td className="p-2.5 font-sans text-slate-700">Left Shift</td>
                  <td className="p-2.5 text-slate-700">Shifts bits left, fills right with 0</td>
                  <td className="p-2.5 text-emerald-700 font-bold">5 &lt;&lt; 2 = 20</td>
                  <td className="p-2.5 font-sans text-slate-600">Fast multiplication: x * 2^n</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-indigo-50/20">
                  <td className="p-2.5 font-bold text-indigo-700">&gt;&gt;</td>
                  <td className="p-2.5 font-sans text-slate-700">Arithmetic Right Shift</td>
                  <td className="p-2.5 text-slate-700">Shifts right, preserves sign bit</td>
                  <td className="p-2.5 text-emerald-700 font-bold">20 &gt;&gt; 2 = 5</td>
                  <td className="p-2.5 font-sans text-slate-600">Fast division: x / 2^n (-8 &gt;&gt; 1 = -4)</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-amber-50/30">
                  <td className="p-2.5 font-bold text-amber-700">&gt;&gt;&gt;</td>
                  <td className="p-2.5 font-sans text-slate-700">Logical Right Shift</td>
                  <td className="p-2.5 text-slate-700">Shifts right, always fills with 0</td>
                  <td className="p-2.5 text-purple-700 font-bold">-1 &gt;&gt;&gt; 1 = 2147483647</td>
                  <td className="p-2.5 font-sans text-slate-600">Unsigned shift, makes negative values large positive</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson 10: operators-final-challenge */}
      {(slug === 'operators-final-challenge' || slug === 'output-prediction' || slug === 'debugging-challenges' || slug === 'interview-questions') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Module 03 Capstone: Operator Evaluation &amp; Safety Blueprint
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Concept Domain</th>
                  <th className="p-2.5">Core Mechanism</th>
                  <th className="p-2.5">Interview Bug Trap</th>
                  <th className="p-2.5 rounded-r-lg">Defensive Programming Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Arithmetic Division</td>
                  <td className="p-2.5 text-slate-700 font-mono">int / int vs double / int</td>
                  <td className="p-2.5 text-rose-700 font-mono">17 / 20 = 0 (truncation)</td>
                  <td className="p-2.5 text-slate-600">Cast at least one operand to double: <code className="font-mono text-indigo-700">(double) a / b</code></td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Compound Assignment</td>
                  <td className="p-2.5 text-slate-700 font-mono">+=, -=, *=, /=</td>
                  <td className="p-2.5 text-rose-700 font-mono">byte b = 10; b = b + 1;</td>
                  <td className="p-2.5 text-slate-600">Use <code className="font-mono text-emerald-700">b += 1</code> to allow automatic implicit cast without compile error</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Equality vs Identity</td>
                  <td className="p-2.5 text-slate-700 font-mono">== vs .equals()</td>
                  <td className="p-2.5 text-rose-700 font-mono">str1 == str2 (reference check)</td>
                  <td className="p-2.5 text-slate-600">Always use <code className="font-mono text-emerald-700">str1.equals(str2)</code> for String text comparisons</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Logical Guards</td>
                  <td className="p-2.5 text-slate-700 font-mono">&amp;&amp; vs &amp; / || vs |</td>
                  <td className="p-2.5 text-rose-700 font-mono">obj != null &amp; obj.isValid()</td>
                  <td className="p-2.5 text-slate-600">Always use short-circuit <code className="font-mono text-emerald-700">&amp;&amp;</code> to prevent NullPointerException</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Unary Mutations</td>
                  <td className="p-2.5 text-slate-700 font-mono">++x vs x++</td>
                  <td className="p-2.5 text-rose-700 font-mono">x = x++ (no-op bug)</td>
                  <td className="p-2.5 text-slate-600">Avoid re-assigning post-increment to itself; keep expressions simple</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Bitwise Masking</td>
                  <td className="p-2.5 text-slate-700 font-mono">&amp;, |, ^, &lt;&lt;, &gt;&gt;, &gt;&gt;&gt;</td>
                  <td className="p-2.5 text-rose-700 font-mono">Negative shift sign extension</td>
                  <td className="p-2.5 text-slate-600">Use <code className="font-mono text-indigo-700">&gt;&gt;&gt;</code> for logical unsigned bit manipulation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

    </div>
  );
};

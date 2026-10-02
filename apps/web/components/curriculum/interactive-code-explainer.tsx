"use client";

import React, { useState } from 'react';
import { Card, Badge, Button } from '@learnbyself/ui';
import {
  Code2,
  Terminal,
  Play,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface CodeToken {
  id: string;
  token: string;
  name: string;
  type: 'keyword' | 'class' | 'method' | 'param' | 'call' | 'string' | 'punct';
  whatIsIt: string;
  whyRequired: string;
  interviewTip: string;
}

export const InteractiveCodeExplainer: React.FC = () => {
  const [selectedTokenId, setSelectedTokenId] = useState<string>('static');
  const [customText, setCustomText] = useState<string>('Hello, LearnBySelf!');
  const [simulatedOutput, setSimulatedOutput] = useState<string>('Hello, LearnBySelf!');
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const tokens: CodeToken[] = [
    {
      id: 'public_class',
      token: 'public',
      name: 'Access Modifier',
      type: 'keyword',
      whatIsIt: 'Declares this class is accessible by any code, including the JVM from outside.',
      whyRequired: 'The JVM launches from outside your package and needs unrestricted access to load the class.',
      interviewTip: 'Only one public class is allowed per .java file!'
    },
    {
      id: 'class',
      token: 'class',
      name: 'Class Keyword',
      type: 'keyword',
      whatIsIt: 'The fundamental keyword used to declare a class blueprint in Java.',
      whyRequired: 'In Java, 100% of executable code must reside inside a class container.',
      interviewTip: 'Java has no global functions outside classes, unlike C++ or Python.'
    },
    {
      id: 'main_class',
      token: 'Main',
      name: 'Class Identifier',
      type: 'class',
      whatIsIt: 'The name of the class blueprint.',
      whyRequired: 'Because it is marked public, the file on disk MUST match exactly: Main.java.',
      interviewTip: 'Case sensitivity matters: main.java will fail to compile!'
    },
    {
      id: 'static',
      token: 'static',
      name: 'Static Modifier',
      type: 'keyword',
      whatIsIt: 'Belongs to the class blueprint directly, rather than an individual instance.',
      whyRequired: 'When a Java program boots, zero objects exist in memory! The JVM must invoke main without instantiating an object first.',
      interviewTip: 'Top Interview Question: If you remove static, it compiles fine, but throws NoSuchMethodError at runtime!'
    },
    {
      id: 'void',
      token: 'void',
      name: 'Return Type',
      type: 'keyword',
      whatIsIt: 'Specifies that this method returns nothing when it finishes.',
      whyRequired: 'When main finishes, the program terminates. No value needs to be passed back to Java runtime.',
      interviewTip: 'In C/C++, main returns int (0 for success). In Java, main always returns void.'
    },
    {
      id: 'main_method',
      token: 'main',
      name: 'Entry Point Identifier',
      type: 'method',
      whatIsIt: 'The designated entry point method name that the JVM specifically looks for.',
      whyRequired: 'The JVM hardcodes this signature as the official kickoff gate for any standalone Java app.',
      interviewTip: 'Changing the name to Main or start will cause the JVM to reject the launch.'
    },
    {
      id: 'args',
      token: 'String[] args',
      name: 'Command-Line Arguments',
      type: 'param',
      whatIsIt: 'An array of text strings passed into the program when executed from terminal.',
      whyRequired: 'Allows users to supply parameters like: java Main user123 production.',
      interviewTip: 'Even if your program does not use arguments, String[] args is still mandatory.'
    },
    {
      id: 'println',
      token: 'System.out.println',
      name: 'Standard Output Method',
      type: 'call',
      whatIsIt: 'Prints text to standard console output and automatically appends a newline character.',
      whyRequired: 'Provides communication between the running program and the terminal user.',
      interviewTip: 'System.out.print prints without a newline; System.out.println prints and moves cursor down.'
    },
    {
      id: 'semicolon',
      token: ';',
      name: 'Statement Terminator',
      type: 'punct',
      whatIsIt: 'The non-negotiable punctuation mark that terminates every Java statement.',
      whyRequired: 'Tells the javac parser that an instruction has ended, allowing multi-line formatting.',
      interviewTip: 'Missing a semicolon is the #1 most common compiler error for beginners.'
    }
  ];

  const activeToken = tokens.find(t => t.id === selectedTokenId) || tokens[3];

  const handleRunCustomCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setSimulatedOutput(customText.trim() || 'Hello, LearnBySelf!');
      setIsRunning(false);
    }, 400);
  };

  const presets = [
    'Hello, LearnBySelf!',
    'Java Backend Developer Ready',
    'Placement Season 2026',
    'Write Once, Run Anywhere'
  ];

  return (
    <div className="space-y-6">
      {/* 1. Interactive Token-by-Token Code Inspector */}
      <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="space-y-0.5">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Interactive Code Token Inspector</span>
            </h3>
            <p className="text-xs text-slate-600">
              Click any highlighted keyword in the program to see why Java requires it.
            </p>
          </div>
          <Badge variant="blue" size="sm">Click Any Keyword</Badge>
        </div>

        {/* Code Canvas with Clickable Tokens */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto shadow-inner leading-loose">
          <div>
            <button
              onClick={() => setSelectedTokenId('public_class')}
              className={`px-1.5 py-0.5 rounded transition-all cursor-pointer font-bold ${
                selectedTokenId === 'public_class'
                  ? 'bg-brand-500 text-white ring-2 ring-brand-300'
                  : 'text-indigo-400 hover:bg-slate-800'
              }`}
            >
              public
            </button>{' '}
            <button
              onClick={() => setSelectedTokenId('class')}
              className={`px-1.5 py-0.5 rounded transition-all cursor-pointer font-bold ${
                selectedTokenId === 'class'
                  ? 'bg-brand-500 text-white ring-2 ring-brand-300'
                  : 'text-indigo-400 hover:bg-slate-800'
              }`}
            >
              class
            </button>{' '}
            <button
              onClick={() => setSelectedTokenId('main_class')}
              className={`px-1.5 py-0.5 rounded transition-all cursor-pointer font-bold ${
                selectedTokenId === 'main_class'
                  ? 'bg-brand-500 text-white ring-2 ring-brand-300'
                  : 'text-amber-300 hover:bg-slate-800'
              }`}
            >
              Main
            </button>{' '}
            <span className="text-slate-500">{'{'}</span>
          </div>

          <div className="pl-4 sm:pl-6">
            <span className="text-slate-500">public </span>
            <button
              onClick={() => setSelectedTokenId('static')}
              className={`px-1.5 py-0.5 rounded transition-all cursor-pointer font-bold ${
                selectedTokenId === 'static'
                  ? 'bg-brand-500 text-white ring-2 ring-brand-300'
                  : 'text-brand-400 hover:bg-slate-800'
              }`}
            >
              static
            </button>{' '}
            <button
              onClick={() => setSelectedTokenId('void')}
              className={`px-1.5 py-0.5 rounded transition-all cursor-pointer font-bold ${
                selectedTokenId === 'void'
                  ? 'bg-brand-500 text-white ring-2 ring-brand-300'
                  : 'text-rose-400 hover:bg-slate-800'
              }`}
            >
              void
            </button>{' '}
            <button
              onClick={() => setSelectedTokenId('main_method')}
              className={`px-1.5 py-0.5 rounded transition-all cursor-pointer font-bold ${
                selectedTokenId === 'main_method'
                  ? 'bg-brand-500 text-white ring-2 ring-brand-300'
                  : 'text-amber-400 hover:bg-slate-800'
              }`}
            >
              main
            </button>
            <span className="text-slate-400">(</span>
            <button
              onClick={() => setSelectedTokenId('args')}
              className={`px-1.5 py-0.5 rounded transition-all cursor-pointer font-bold ${
                selectedTokenId === 'args'
                  ? 'bg-brand-500 text-white ring-2 ring-brand-300'
                  : 'text-emerald-400 hover:bg-slate-800'
              }`}
            >
              String[] args
            </button>
            <span className="text-slate-400">) {'{'}</span>
          </div>

          <div className="pl-8 sm:pl-12">
            <button
              onClick={() => setSelectedTokenId('println')}
              className={`px-1.5 py-0.5 rounded transition-all cursor-pointer font-bold ${
                selectedTokenId === 'println'
                  ? 'bg-brand-500 text-white ring-2 ring-brand-300'
                  : 'text-cyan-400 hover:bg-slate-800'
              }`}
            >
              System.out.println
            </button>
            <span className="text-slate-400">(</span>
            <span className="text-emerald-300">&quot;{customText}&quot;</span>
            <span className="text-slate-400">)</span>
            <button
              onClick={() => setSelectedTokenId('semicolon')}
              className={`px-1.5 py-0.5 rounded transition-all cursor-pointer font-bold ${
                selectedTokenId === 'semicolon'
                  ? 'bg-rose-500 text-white ring-2 ring-rose-300'
                  : 'text-rose-400 hover:bg-slate-800'
              }`}
            >
              ;
            </button>
          </div>

          <div className="pl-4 sm:pl-6 text-slate-500">{'}'}</div>
          <div className="text-slate-500">{'}'}</div>
        </div>

        {/* Selected Token Inspector Card */}
        {activeToken && (
          <div className="p-4 sm:p-5 rounded-2xl bg-brand-50/50 border border-brand-200/80 space-y-3 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-100 pb-2.5">
              <div className="flex items-center space-x-2">
                <code className="text-xs sm:text-sm font-mono font-bold bg-white px-2 py-0.5 rounded border border-brand-200 text-brand-900">
                  {activeToken.token}
                </code>
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  {activeToken.name}
                </span>
              </div>
              <Badge variant="blue" size="sm">{activeToken.type}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-white border border-brand-100 space-y-1">
                <span className="font-bold text-slate-900 block">Why Java Requires It:</span>
                <p className="text-slate-600 leading-relaxed text-xs">
                  {activeToken.whyRequired}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                <span className="font-bold text-amber-950 block">Placement Trap / Tip:</span>
                <p className="text-amber-900 leading-relaxed text-xs">
                  {activeToken.interviewTip}
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* 2. Playful Live Console Tester */}
      <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="space-y-0.5">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-emerald-600" />
              <span>Playful Output Tester</span>
            </h4>
            <p className="text-xs text-slate-600">
              Change the print text and run to see the terminal output update live.
            </p>
          </div>
          <Badge variant="green" size="sm">Live Sandbox</Badge>
        </div>

        {/* Preset Chips */}
        <div className="flex flex-wrap gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCustomText(p);
                setSimulatedOutput(p);
              }}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Type anything to print..."
            className="flex-1 text-xs font-mono bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-brand-500"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={handleRunCustomCode}
            disabled={isRunning}
            className="font-semibold text-xs min-h-[38px] flex items-center space-x-1.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Running...' : 'Run Program'}</span>
          </Button>
        </div>

        <div className="rounded-xl bg-slate-950 p-3.5 text-xs font-mono text-emerald-400 flex items-center justify-between shadow-inner">
          <div className="flex items-center space-x-2">
            <span className="text-slate-500">$ java Main</span>
            <span className="text-white font-bold">{simulatedOutput}</span>
          </div>
          <span className="text-[10px] text-slate-500">Exit code: 0</span>
        </div>
      </Card>
    </div>
  );
};

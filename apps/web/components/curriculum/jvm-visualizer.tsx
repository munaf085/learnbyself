"use client";

import React, { useState } from 'react';
import { Card, Badge, Button } from '@learnbyself/ui';
import {
  Cpu,
  Layers,
  FileCode,
  Binary,
  Monitor,
  Play,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';

export const JvmArchitectureVisualizer: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [simulating, setSimulating] = useState<boolean>(false);
  const [activeTier, setActiveTier] = useState<'jvm' | 'jre' | 'jdk'>('jdk');

  const stages = [
    {
      id: 'source',
      title: '1. Source Code',
      badge: 'Main.java',
      icon: FileCode,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      description: 'Human-readable Java instructions written in standard text files ending in .java.',
      sample: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello!");\n  }\n}',
      note: 'Written once by the software engineer on any laptop.'
    },
    {
      id: 'compiler',
      title: '2. javac Compiler',
      badge: 'javac Main.java',
      icon: Cpu,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      description: 'The Java Compiler parses syntax, checks strict data types, and compiles to intermediate bytecode.',
      sample: '$ javac Main.java\n// Checks syntax, braces & semicolons\n// Output: Main.class generated',
      note: 'Catches compile-time syntax errors before code ever runs.'
    },
    {
      id: 'bytecode',
      title: '3. Universal Bytecode',
      badge: 'Main.class',
      icon: Binary,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      description: 'Universal instruction set for the virtual machine. Not native machine code, not plain text.',
      sample: 'CA FE BA BE 00 00 00 3D\n[00 1f] invokevirtual #7\n[00 24] return',
      note: 'This same .class file runs identically on Windows, Mac, or Linux!'
    },
    {
      id: 'jvm',
      title: '4. JVM on Target OS',
      badge: 'java Main',
      icon: Monitor,
      color: 'text-brand-600',
      bgColor: 'bg-brand-50',
      borderColor: 'border-brand-200',
      description: 'The platform-specific Java Virtual Machine translates universal bytecode into native CPU instructions on the fly.',
      sample: 'Windows JVM  -> Intel x86 binary -> "Hello!"\nmacOS JVM    -> Apple Silicon M3 -> "Hello!"\nLinux JVM    -> AMD64 CPU        -> "Hello!"',
      note: 'WORA in action: JVM is platform-dependent; Bytecode is platform-independent!'
    }
  ];

  const handleRunSimulation = () => {
    setSimulating(true);
    setActiveStage(0);
    let s = 0;
    const interval = setInterval(() => {
      s++;
      if (s < 4) {
        setActiveStage(s);
      } else {
        clearInterval(interval);
        setSimulating(false);
      }
    }, 900);
  };

  const current = stages[activeStage] || stages[0]!;

  return (
    <div className="space-y-6">
      {/* 1. Interactive Pipeline Stepper */}
      <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900">
                Interactive JVM Execution Pipeline
              </h3>
            </div>
            <p className="text-xs text-slate-600">
              Click each stage or simulate the end-to-end journey from source code to screen.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={handleRunSimulation}
            disabled={simulating}
            className="flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer font-semibold text-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{simulating ? 'Simulating...' : 'Run Simulation'}</span>
          </Button>
        </div>

        {/* Pipeline Stage Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {stages.map((stg, idx) => {
            const Icon = stg.icon;
            const isActive = activeStage === idx;
            return (
              <button
                key={stg.id}
                onClick={() => {
                  if (!simulating) setActiveStage(idx);
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'border-brand-500 bg-brand-50/50 shadow-xs ring-2 ring-brand-400/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className={`p-1.5 rounded-lg ${stg.bgColor} ${stg.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 font-semibold">
                    {stg.badge}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-slate-800 truncate">
                  {stg.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-brand-600" />
              <span>Stage {activeStage + 1}: {current.title}</span>
            </h4>
            <Badge variant="blue" size="sm">{current.badge}</Badge>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {current.description}
          </p>

          <div className="rounded-xl bg-slate-950 p-3 text-xs font-mono text-emerald-400 overflow-x-auto shadow-inner leading-relaxed">
            <pre>{current.sample}</pre>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-600 pt-1">
            <Info className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
            <span className="font-medium">{current.note}</span>
          </div>
        </div>
      </Card>

      {/* 2. Interactive JDK vs JRE vs JVM Explorer */}
      <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h4 className="font-bold text-sm sm:text-base text-slate-900 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>The Triad: JDK vs JRE vs JVM</span>
          </h4>
          <p className="text-xs text-slate-600 mt-1">
            Select an ecosystem tier to inspect which tools and libraries it provides.
          </p>
        </div>

        {/* Tier Selector Tabs */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setActiveTier('jdk')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              activeTier === 'jdk'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            1. JDK (Developer)
          </button>
          <button
            onClick={() => setActiveTier('jre')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              activeTier === 'jre'
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            2. JRE (Runtime)
          </button>
          <button
            onClick={() => setActiveTier('jvm')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              activeTier === 'jvm'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            3. JVM (Engine)
          </button>
        </div>

        {/* Active Tier Content */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
          {activeTier === 'jdk' && (
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-900 text-sm">Java Development Kit (JDK)</span>
                <Badge variant="blue" size="sm">Always Install This</Badge>
              </div>
              <p className="text-slate-700 leading-relaxed">
                The comprehensive bundle for software developers. Contains the <strong>JRE</strong>, the <strong>javac</strong> compiler, the <strong>jdb</strong> debugger, and packaging utilities.
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-indigo-100 text-xs font-mono text-indigo-950">
                Formula: JDK = JRE + Development Tools (javac, jdb, jar)
              </div>
            </div>
          )}

          {activeTier === 'jre' && (
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 text-sm">Java Runtime Environment (JRE)</span>
                <Badge variant="amber" size="sm">For End Users</Badge>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Everything required to run an existing compiled Java application. Contains the <strong>JVM</strong> plus the official Java Class Libraries (<code className="font-mono text-amber-900">java.util</code>, <code className="font-mono text-amber-900">java.lang</code>, <code className="font-mono text-amber-900">java.io</code>).
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-amber-100 text-xs font-mono text-amber-950">
                Formula: JRE = JVM + Standard Java Libraries
              </div>
            </div>
          )}

          {activeTier === 'jvm' && (
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900 text-sm">Java Virtual Machine (JVM)</span>
                <Badge variant="green" size="sm">Platform-Specific Engine</Badge>
              </div>
              <p className="text-slate-700 leading-relaxed">
                The abstract computing engine that loads bytecode, verifies memory safety, and executes instructions using an Interpreter and JIT (Just-In-Time) compiler.
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-emerald-100 text-xs font-mono text-emerald-950">
                Role: Loads .class files & translates bytecode to native CPU instructions
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

"use client";

import React, { useState, useEffect } from 'react';
import { Layers, Database, Cpu, ArrowRight, RotateCcw, Sparkles, Play, Pause } from 'lucide-react';
import { Card, Badge, Button } from '@learnbyself/ui';

interface MemoryStep {
  title: string;
  summary: string;
  activeRegion: 'method' | 'stack' | 'heap' | 'all';
  stackContent: string[];
  heapContent: string[];
  methodContent: string[];
  ahaMoment: string;
}

const STEPS: MemoryStep[] = [
  {
    title: "1. Reading the Class Blueprint",
    summary: "Java reads your Main.java file and saves the blueprint into the Blueprint Area (Method Area) so it knows all methods and constants.",
    activeRegion: 'method',
    methodContent: ["Main.class (Blueprint)", "main(String[] args)", "Constant: \"Hello, World!\""],
    stackContent: ["[Waiting for program to start]"],
    heapContent: ["[No objects created yet]"],
    ahaMoment: "The Blueprint Area is loaded just once and shared across your entire program."
  },
  {
    title: "2. Entering the Front Door",
    summary: "Java enters public static void main(). It places a new Task Card (Stack Frame) onto the Active Task Stack.",
    activeRegion: 'stack',
    methodContent: ["Main.class (Blueprint)", "main(String[] args)", "Constant: \"Hello, World!\""],
    stackContent: ["[Task Card: main()]", "args: String[] (ready)", "Local variables ready"],
    heapContent: ["[Ready for objects]"],
    ahaMoment: "Each task runs on its own stack. When a method finishes, its card is automatically removed!"
  },
  {
    title: "3. Storing Data in the Warehouse",
    summary: "When messages, texts, or objects are created, Java stores them in the Memory Warehouse (Heap) and gives your task card an address tag to find it.",
    activeRegion: 'heap',
    methodContent: ["Main.class (Blueprint)", "main(String[] args)"],
    stackContent: ["[Task Card: main()]", "msgTag ───────▶ (Points to Warehouse #01)", "int counter = 1"],
    heapContent: ["Warehouse Item #01: \"Hello, World!\"", "String Memory Pool"],
    ahaMoment: "Data lives in the warehouse (Heap); your variables just hold the address slips (Stack)!"
  },
  {
    title: "4. Wrapping Up & Cleaning Up",
    summary: "Your program finishes! The task card is instantly popped off the stack, and Java automatically recycles any leftover memory.",
    activeRegion: 'all',
    methodContent: ["Main.class (Blueprint cached)"],
    stackContent: ["[Task Card Popped - Clean & Fast!]"],
    heapContent: ["Item #01 [Unused] ──▶ Automatically Recycled"],
    ahaMoment: "In Java, you never have to manually delete memory. Java's Garbage Collector cleans it up for you!"
  }
];

export const JvmMemoryVisualizer: React.FC = () => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = STEPS[currentStepIdx] || STEPS[0]!;

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev >= STEPS.length - 1) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 2800);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = () => {
    setIsPlaying(false);
    if (currentStepIdx < STEPS.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setIsPlaying(false);
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  return (
    <Card className="space-y-5 border-indigo-200/80 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/20 shadow-subtle overflow-hidden">
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-100 pb-3">
        <div className="flex items-center space-x-2.5">
          <span className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
            <Cpu className="w-5 h-5" />
          </span>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                Interactive Memory Visualizer
              </h3>
              <Badge variant="purple" size="sm">LIVE TOUR</Badge>
            </div>
            <p className="text-xs text-slate-500">
              See what happens inside your computer when Java runs code
            </p>
          </div>
        </div>

        {/* Stepper Controls & Auto-play */}
        <div className="flex items-center space-x-2 self-start sm:self-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer min-h-[36px] ${
              isPlaying
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Auto-Play</span>
              </>
            )}
          </button>

          <Button
            variant="outline"
            size="sm"
            disabled={currentStepIdx === 0}
            onClick={handlePrev}
            className="text-xs min-h-[36px]"
          >
            ← Prev
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={currentStepIdx === STEPS.length - 1}
            onClick={handleNext}
            className="text-xs min-h-[36px]"
          >
            Next →
          </Button>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Reset tour"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Step Header & Explanation */}
      <div className="bg-white p-3.5 rounded-xl border border-indigo-100 space-y-1.5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="blue" size="sm">STEP {currentStepIdx + 1} OF {STEPS.length}</Badge>
            <span className="text-xs font-bold text-slate-800">{step.title}</span>
          </div>
          {/* Progress dots */}
          <div className="flex items-center space-x-1">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentStepIdx ? 'bg-indigo-600 w-4' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {step.summary}
        </p>
      </div>

      {/* 3-Column Memory Model Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* 1. Method Area */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            step.activeRegion === 'method' || step.activeRegion === 'all'
              ? 'border-blue-400 bg-blue-50/70 ring-2 ring-blue-500/20 shadow-sm'
              : 'border-slate-200 bg-slate-50/50 opacity-80'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-blue-200/60 mb-2.5">
            <span className="flex items-center space-x-1.5 text-xs font-bold text-blue-950">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>1. Blueprint Area</span>
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-200/60 text-blue-800 font-semibold">Method Area</span>
          </div>
          <div className="space-y-1.5 font-mono text-[11px]">
            {step.methodContent.map((item, i) => (
              <div key={i} className="p-2 rounded-lg bg-white border border-blue-100 text-slate-800 shadow-2xs">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Call Stack */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            step.activeRegion === 'stack' || step.activeRegion === 'all'
              ? 'border-indigo-400 bg-indigo-50/70 ring-2 ring-indigo-500/20 shadow-sm'
              : 'border-slate-200 bg-slate-50/50 opacity-80'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-indigo-200/60 mb-2.5">
            <span className="flex items-center space-x-1.5 text-xs font-bold text-indigo-950">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              <span>2. Active Task Stack</span>
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-200/60 text-indigo-800 font-semibold">Call Stack</span>
          </div>
          <div className="space-y-1.5 font-mono text-[11px]">
            {step.stackContent.map((item, i) => (
              <div key={i} className="p-2 rounded-lg bg-white border border-indigo-100 text-indigo-950 font-medium shadow-2xs">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Heap Memory */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            step.activeRegion === 'heap' || step.activeRegion === 'all'
              ? 'border-emerald-400 bg-emerald-50/70 ring-2 ring-emerald-500/20 shadow-sm'
              : 'border-slate-200 bg-slate-50/50 opacity-80'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60 mb-2.5">
            <span className="flex items-center space-x-1.5 text-xs font-bold text-emerald-950">
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>3. Memory Warehouse</span>
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-200/60 text-emerald-800 font-semibold">Heap Space</span>
          </div>
          <div className="space-y-1.5 font-mono text-[11px]">
            {step.heapContent.map((item, i) => (
              <div key={i} className="p-2 rounded-lg bg-white border border-emerald-100 text-emerald-950 font-medium shadow-2xs">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Friendly Aha! Moment Callout */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3 flex items-start space-x-2.5 text-xs text-amber-900 shadow-2xs">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">💡 Aha! Moment: </span>
          {step.ahaMoment}
        </div>
      </div>
    </Card>
  );
};

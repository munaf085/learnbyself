import React from 'react';
import Link from 'next/link';
import { Card, Badge, Button } from '@learnbyself/ui';

export default function PracticeHubPage() {
  const problems = [
    {
      id: 'p1',
      title: 'Java Compilation vs JVM Bytecode Execution',
      type: 'MCQ Check',
      language: 'Java',
      difficulty: 'Easy',
      time: '45s',
      href: '/java/fundamentals/hello-world'
    },
    {
      id: 'p2',
      title: 'Find Case-Sensitivity Syntax Bug in Main Method',
      type: 'Bug Hunting',
      language: 'Java',
      difficulty: 'Easy',
      time: '60s',
      href: '/java/fundamentals/hello-world'
    },
    {
      id: 'p3',
      title: 'Static Keyword Ambiguity in Entry Point Method',
      type: 'Interview Question',
      language: 'Java',
      difficulty: 'Medium',
      time: '120s',
      href: '/java/fundamentals/hello-world'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Practice & Interview Question Hub
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Test your mental models, debug common syntax pitfalls, and prepare for real software engineering placement rounds.
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
        <span className="px-3 py-1.5 rounded-lg bg-brand-600 text-white text-xs font-semibold">
          All Problems (3)
        </span>
        <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 cursor-pointer">
          Java Only
        </span>
        <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 cursor-pointer">
          MCQs
        </span>
        <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 cursor-pointer">
          Bug Hunting
        </span>
        <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 cursor-pointer">
          Interview Q&A
        </span>
      </div>

      {/* Problem list */}
      <div className="space-y-3">
        {problems.map((p) => (
          <Card key={p.id} variant="interactive" className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Badge variant="blue" size="sm">{p.type}</Badge>
                  <span className="text-xs text-slate-400 font-mono">• {p.language}</span>
                  <Badge variant="slate" size="sm">{p.difficulty}</Badge>
                  <span className="text-xs text-slate-400 font-mono">~{p.time}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
              </div>

              <Link href={p.href} className="sm:self-center">
                <Button size="sm" variant="primary">
                  Solve Now →
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

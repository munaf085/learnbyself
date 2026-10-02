import React from 'react';
import Link from 'next/link';
import { Card, Badge, Button, ProgressBar } from '@learnbyself/ui';

export default function ProfilePage() {
  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Profile Overview */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-subtle">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-2xl font-bold text-brand-700">
            S
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Student Learner</h1>
            <p className="text-xs text-slate-500 font-mono">Java Programming Track</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-center">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xl font-bold text-brand-600">1</span>
            <p className="text-xs text-slate-500 mt-0.5">Lesson Completed</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xl font-bold text-amber-600">1 Day</span>
            <p className="text-xs text-slate-500 mt-0.5">Active Streak</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xl font-bold text-emerald-600">100%</span>
            <p className="text-xs text-slate-500 mt-0.5">Quiz Accuracy</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xl font-bold text-purple-600">50 XP</span>
            <p className="text-xs text-slate-500 mt-0.5">Total Mastery XP</p>
          </div>
        </div>
      </div>

      {/* Track Progress */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Enrolled Tracks</h2>
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">☕</span>
              <div>
                <h3 className="font-bold text-slate-900">Java Mastery from Scratch</h3>
                <p className="text-xs text-slate-500">Module 1: Java Architecture</p>
              </div>
            </div>
            <Badge variant="blue" size="sm">In Progress</Badge>
          </div>

          <ProgressBar value={25} label="Track Progress" />

          <div className="flex justify-end pt-1">
            <Link href="/java/fundamentals/hello-world">
              <Button size="sm" variant="primary">Resume Java Lesson →</Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Next Recommended Topic */}
      <Card variant="highlight" className="border-brand-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <Badge variant="purple" size="sm" className="mb-1">RECOMMENDED REVISION</Badge>
            <h4 className="font-bold text-slate-900 text-base">Static Methods & JVM Entry Point</h4>
            <p className="text-xs text-slate-600 mt-0.5">Master core entry point concepts to build programming confidence.</p>
          </div>
          <Link href="/java/fundamentals/hello-world">
            <Button size="sm" variant="outline">Review Lesson →</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

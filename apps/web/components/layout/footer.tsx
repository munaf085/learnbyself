import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white mt-16 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Learning Paths
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/java" className="hover:text-brand-600">Java Foundations</Link></li>
              <li className="text-slate-400">Python Mastery (Roadmap)</li>
              <li className="text-slate-400">C# .NET (Roadmap)</li>
              <li className="text-slate-400">Fullstack TS (Roadmap)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Practice & Prep
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/practice" className="hover:text-brand-600">MCQ Challenges</Link></li>
              <li><Link href="/practice" className="hover:text-brand-600">Bug Hunting</Link></li>
              <li><Link href="/practice" className="hover:text-brand-600">Output Prediction</Link></li>
              <li><Link href="/java/fundamentals/hello-world" className="hover:text-brand-600">Interview Q&A</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Student Hub
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/profile" className="hover:text-brand-600">Learner Profile</Link></li>
              <li><Link href="/profile" className="hover:text-brand-600">Mastery Milestones</Link></li>
              <li><Link href="/java" className="hover:text-brand-600">Course Syllabus</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Engineering Standard
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              LearnBySelf is built with zero-teacher dependency to take ambitious students from ground zero to placement readiness.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© 2026 LearnBySelf. Built for aspiring engineers and college graduates.</p>
          <div className="flex space-x-4 mt-3 sm:mt-0 font-medium">
            <span>WCAG Accessible</span>
            <span>•</span>
            <span>Zero Tracking</span>
            <span>•</span>
            <span>Server Components</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

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
  Lightbulb,
  Lock,
  CheckCircle2,
  AlertCircle
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

      {/* ==================================================== */}
      {/* OOP MODULE 1 CHEAT SHEETS: CLASSES & OBJECTS        */}
      {/* ==================================================== */}

      {/* Lesson 1: Why Object-Oriented Programming? */}
      {(slug === 'why-object-oriented-programming' || slug === 'why-oop') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Scattered Variables vs OOP Bundled Entity Matrix
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Dimension</th>
                  <th className="p-2.5">Loose Variables Approach</th>
                  <th className="p-2.5">Object-Oriented Approach</th>
                  <th className="p-2.5 rounded-r-lg">Engineering Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Managing 100 Records</td>
                  <td className="p-2.5 text-rose-700 font-mono text-[11px]">300-500 loose variables (name1, age1, etc.)</td>
                  <td className="p-2.5 text-emerald-700 font-mono text-[11px]">100 Student objects</td>
                  <td className="p-2.5 text-slate-600">Zero variable collision; data cannot accidentally mix up</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Passing to Methods</td>
                  <td className="p-2.5 text-slate-600">Must pass 4-6 arguments into every function call</td>
                  <td className="p-2.5 text-slate-600">Pass 1 student reference: <code className="text-brand-700">display(s)</code></td>
                  <td className="p-2.5 text-slate-600">Clean, concise method signatures</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Adding a New Property</td>
                  <td className="p-2.5 text-rose-700">Must manually create 100 new variables across your code</td>
                  <td className="p-2.5 text-emerald-700">Add 1 field to the <code className="text-brand-700">Student</code> class</td>
                  <td className="p-2.5 text-slate-600">Instant updates for every current and future student object</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Mental Model</td>
                  <td className="p-2.5 text-slate-600">Disconnected data points in memory</td>
                  <td className="p-2.5 text-slate-600">Unified entity reflecting real-world concepts</td>
                  <td className="p-2.5 text-emerald-700 font-semibold">Code mirrors reality naturally</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3.5 bg-brand-50/60 rounded-xl border border-brand-100 flex items-start space-x-2 text-xs text-brand-900">
            <Lightbulb className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Golden Principle: </span>
              An <strong>entity</strong> is any real-world thing (like a Student, Order, or Product). In OOP, we bundle everything that entity knows (its data) and does (its actions) into one clean container.
            </div>
          </div>
        </Card>
      )}

      {/* Lesson 2: Procedural Thinking vs Object-Oriented Thinking */}
      {(slug === 'procedural-vs-object-oriented-thinking' || slug === 'procedural-vs-oop-thinking') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Procedural vs Object-Oriented Paradigm Master Table
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Dimension</th>
                  <th className="p-2.5">Procedural Thinking</th>
                  <th className="p-2.5 rounded-r-lg">Object-Oriented Thinking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Primary Focus</td>
                  <td className="p-2.5 text-slate-600">Step-by-step algorithms &amp; procedures (verbs)</td>
                  <td className="p-2.5 text-brand-700 font-semibold">Autonomous entities &amp; actors (nouns)</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Data &amp; Function Relationship</td>
                  <td className="p-2.5 text-rose-700">Separated: Data sits in variables; functions operate from outside</td>
                  <td className="p-2.5 text-emerald-700 font-semibold">Bundled: Objects own their own data and their own behaviors</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">How Methods Execute</td>
                  <td className="p-2.5 font-mono text-[11px] text-slate-700">printStudent(name, age, course)</td>
                  <td className="p-2.5 font-mono text-[11px] text-emerald-700 font-bold">student.printProfile()</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Best Suited For</td>
                  <td className="p-2.5 text-slate-600">Mathematical computations, short scripts, pipeline tasks</td>
                  <td className="p-2.5 text-slate-600">Business systems, multi-actor apps, interactive domains</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
              <span className="font-bold text-slate-900 block">🛍️ Real-World Objects (Things)</span>
              <p className="text-slate-600">User, Restaurant, FoodItem, DeliveryDriver, BankAccount, Book</p>
            </div>
            <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-100 text-xs space-y-1">
              <span className="font-bold text-brand-900 block">⚡ Real-World Behaviors (Actions)</span>
              <p className="text-brand-800">calculateTotal(), placeOrder(), depositMoney(), displayCard()</p>
            </div>
          </div>
        </Card>
      )}

      {/* Lesson 3: Classes as Blueprints */}
      {(slug === 'classes-as-blueprints') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <FileCode className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Class Blueprint Architecture &amp; Anatomy
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-sans">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Class Element</th>
                  <th className="p-2.5">Java Syntax Pattern</th>
                  <th className="p-2.5">What It Represents</th>
                  <th className="p-2.5 rounded-r-lg">Crucial Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900 font-sans">Class Header</td>
                  <td className="p-2.5 text-brand-700 font-bold">class Student &#123; ... &#125;</td>
                  <td className="p-2.5 font-sans text-slate-600">Defines the reusable blueprint</td>
                  <td className="p-2.5 font-sans text-slate-700">Use PascalCase for class names</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900 font-sans">Properties (Fields)</td>
                  <td className="p-2.5 text-indigo-700">String name; int age;</td>
                  <td className="p-2.5 font-sans text-slate-600">The state/data each object will hold</td>
                  <td className="p-2.5 font-sans text-slate-700">Declared directly inside class curly braces</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900 font-sans">Behaviors (Methods)</td>
                  <td className="p-2.5 text-emerald-700">void display() &#123; ... &#125;</td>
                  <td className="p-2.5 font-sans text-slate-600">Actions the object can perform</td>
                  <td className="p-2.5 font-sans text-slate-700">Can directly access fields without parameters</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-950 flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Golden Blueprint Rule: </span>
              Declaring a class allocates <strong>ZERO object memory</strong>. A class is just a design document on paper. No actual student exists until you say <code className="font-mono bg-amber-100/80 px-1 py-0.5 rounded">new Student()</code>!
            </div>
          </div>
        </Card>
      )}

      {/* Lesson 4: Objects and Instances */}
      {(slug === 'objects-and-instances') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Terminal className="w-4 h-4 text-purple-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              The &apos;new&apos; Keyword &amp; Dot Operator Quick Reference
            </h4>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl text-slate-100 font-mono text-xs overflow-x-auto space-y-2">
            <div className="text-slate-400">{'// Anatomy of Object Creation:'}</div>
            <div>
              <span className="text-purple-400 font-bold">Student</span>{' '}
              <span className="text-amber-300">s1</span> ={' '}
              <span className="text-rose-400 font-bold">new</span>{' '}
              <span className="text-purple-400 font-bold">Student</span>();
            </div>
            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 space-y-1">
              <div>• <span className="text-purple-300 font-bold">Student</span>: The Class / Type (which blueprint to use)</div>
              <div>• <span className="text-amber-300 font-bold">s1</span>: Reference variable name (how we talk to this object)</div>
              <div>• <span className="text-rose-400 font-bold">new</span>: Memory allocator (creates the actual object)</div>
              <div>• <span className="text-purple-300 font-bold">Student()</span>: Prepares the fresh object</div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Dot Operator Action</th>
                  <th className="p-2.5">Java Syntax</th>
                  <th className="p-2.5 rounded-r-lg">What Happens</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-sans font-bold text-slate-900">Setting a Field</td>
                  <td className="p-2.5 text-brand-700">s1.name = &quot;Rahul&quot;;</td>
                  <td className="p-2.5 font-sans text-slate-600">Assigns &quot;Rahul&quot; into s1&apos;s private copy of name</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-sans font-bold text-slate-900">Reading a Field</td>
                  <td className="p-2.5 text-brand-700">System.out.println(s1.name);</td>
                  <td className="p-2.5 font-sans text-slate-600">Retrieves the current value stored in s1.name</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-sans font-bold text-slate-900">Invoking a Method</td>
                  <td className="p-2.5 text-emerald-700 font-bold">s1.displayProfile();</td>
                  <td className="p-2.5 font-sans text-slate-600">Executes the method using s1&apos;s internal state</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson 5: Object State and Behavior */}
      {(slug === 'object-state-and-behavior') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              State vs Behavior &amp; Dynamic Mutation Tracing
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200/80 space-y-2">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
                📦 STATE (What It Knows)
              </span>
              <p className="text-xs text-blue-950 leading-relaxed">
                Stored in <strong>instance variables (fields)</strong>. Describes the object&apos;s current condition at any point in time.
              </p>
              <div className="p-2.5 bg-white rounded-lg font-mono text-[11px] text-blue-900 border border-blue-100">
                name = &quot;Rahul&quot;;<br />
                age = 20;<br />
                marks = 85.5;
              </div>
            </div>

            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80 space-y-2">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                ⚡ BEHAVIOR (What It Does)
              </span>
              <p className="text-xs text-emerald-950 leading-relaxed">
                Defined in <strong>instance methods</strong>. Actions the object executes, often reading or changing its own state!
              </p>
              <div className="p-2.5 bg-white rounded-lg font-mono text-[11px] text-emerald-900 border border-emerald-100">
                haveBirthday() &#123; age++; &#125;<br />
                updateMarks(90.0);<br />
                displayProfile();
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
            <span className="font-bold text-slate-900 block">🔄 State Mutation Lifecycle Example:</span>
            <div className="font-mono text-[11px] text-slate-700 space-y-1">
              <div>1. <span className="text-brand-700">Student s = new Student(); s.age = 20;</span> → State is 20</div>
              <div>2. <span className="text-emerald-700">s.haveBirthday();</span> → Behavior runs and updates age to 21</div>
              <div>3. <span className="text-slate-900">System.out.println(s.age);</span> → Output is 21 (Identity preserved, state updated!)</div>
            </div>
          </div>
        </Card>
      )}

      {/* Lesson 6: Creating and Using Multiple Objects */}
      {(slug === 'creating-and-using-multiple-objects' || slug === 'creating-multiple-objects') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Multiple Objects Memory Isolation Matrix
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Execution Statement</th>
                  <th className="p-2.5">s1 Object State</th>
                  <th className="p-2.5">s2 Object State</th>
                  <th className="p-2.5 rounded-r-lg">Isolation Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 text-purple-700 font-bold">Student s1 = new Student();</td>
                  <td className="p-2.5 text-emerald-700">Created (name: null)</td>
                  <td className="p-2.5 text-slate-400">Not created yet</td>
                  <td className="p-2.5 font-sans text-slate-600">s1 gets its own memory</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 text-purple-700 font-bold">Student s2 = new Student();</td>
                  <td className="p-2.5 text-slate-600">name: null</td>
                  <td className="p-2.5 text-emerald-700">Created (name: null)</td>
                  <td className="p-2.5 font-sans text-slate-600">Two completely separate objects exist</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 text-brand-700">s1.name = &quot;Rahul&quot;;</td>
                  <td className="p-2.5 text-brand-700 font-bold">name = &quot;Rahul&quot;</td>
                  <td className="p-2.5 text-slate-400">name = null</td>
                  <td className="p-2.5 font-sans text-slate-600">Setting s1 has zero effect on s2</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 text-brand-700">s2.name = &quot;Priya&quot;;</td>
                  <td className="p-2.5 text-brand-700 font-bold">name = &quot;Rahul&quot;</td>
                  <td className="p-2.5 text-emerald-700 font-bold">name = &quot;Priya&quot;</td>
                  <td className="p-2.5 font-sans text-slate-600">Both hold their own distinct values</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-brand-50/30">
                  <td className="p-2.5 text-rose-700 font-bold">s1.name = &quot;Vikram&quot;;</td>
                  <td className="p-2.5 text-rose-700 font-bold">name = &quot;Vikram&quot;</td>
                  <td className="p-2.5 text-emerald-700 font-bold">name = &quot;Priya&quot;</td>
                  <td className="p-2.5 font-sans text-slate-900 font-semibold">s2.name STILL equals &quot;Priya&quot;!</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950">
            <strong>Key Rule: </strong> Every object created with <code className="font-mono bg-white px-1 py-0.5 rounded border border-emerald-200">new</code> gets its own private, isolated set of instance variables. Modifying one object will never accidentally modify another.
          </div>
        </Card>
      )}

      {/* Lesson 7: Practice Project: Student Profile */}
      {(slug === 'student-profile-practice') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Student Profile Project Architecture &amp; 10-Point Mastery Checklist
            </h4>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl text-slate-100 font-mono text-xs space-y-3">
            <div className="text-amber-400 font-bold">{'// Canonical Student Profile Project Architecture:'}</div>
            <pre className="text-slate-300 text-[11px] leading-relaxed">
{`class Student {
    String name;
    int age;
    String course;
    double marks;

    void displayProfile() {
        System.out.println("--- Student Profile ---");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Course: " + course);
        System.out.println("Marks: " + marks);
        System.out.println();
    }
}`}
            </pre>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Check #</th>
                  <th className="p-2.5">Module 1 Mastery Milestone</th>
                  <th className="p-2.5 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">01</td><td className="p-2.5">Explain what a class is without jargon (Blueprint/Template)</td><td className="p-2.5 text-emerald-600 font-bold">✓ Mastered</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">02</td><td className="p-2.5">Explain what an object is (Real instance created from blueprint)</td><td className="p-2.5 text-emerald-600 font-bold">✓ Mastered</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">03</td><td className="p-2.5">Differentiate class vs object using real-world analogies</td><td className="p-2.5 text-emerald-600 font-bold">✓ Mastered</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">04</td><td className="p-2.5">Define object state (The data/fields it currently holds)</td><td className="p-2.5 text-emerald-600 font-bold">✓ Mastered</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">05</td><td className="p-2.5">Define object behavior (The actions/methods it can perform)</td><td className="p-2.5 text-emerald-600 font-bold">✓ Mastered</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">06</td><td className="p-2.5">Understand that 1 class can create infinite independent objects</td><td className="p-2.5 text-emerald-600 font-bold">✓ Mastered</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">07</td><td className="p-2.5">Understand that modifying s1 never alters s2</td><td className="p-2.5 text-emerald-600 font-bold">✓ Mastered</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">08</td><td className="p-2.5">Identify entities from real-world requirements (User, Order)</td><td className="p-2.5 text-emerald-600 font-bold">✓ Mastered</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">09</td><td className="p-2.5">Predict the output of multi-object programs accurately</td><td className="p-2.5 text-emerald-600 font-bold">✓ Mastered</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">10</td><td className="p-2.5">Write a class and create objects completely from scratch</td><td className="p-2.5 text-emerald-600 font-bold">✓ Mastered</td></tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ==================================================== */}
      {/* OOP MODULE 2 CHEAT SHEETS: CONSTRUCTORS & INIT      */}
      {/* ==================================================== */}

      {/* Lesson 1: What Is a Constructor? */}
      {(slug === 'what-is-a-constructor') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Constructor Anatomy &amp; Execution Sequence
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Phase</th>
                  <th className="p-2.5">What Happens in Memory</th>
                  <th className="p-2.5">Actor</th>
                  <th className="p-2.5 rounded-r-lg">Rule to Remember</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-brand-700 font-mono">1. new Class()</td>
                  <td className="p-2.5 text-slate-700">Allocates blank heap memory; sets default values (null, 0, false)</td>
                  <td className="p-2.5 text-indigo-600 font-semibold">JVM Runtime</td>
                  <td className="p-2.5 text-slate-600">&apos;new&apos; allocates space; constructor does NOT allocate memory</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-emerald-700 font-mono">2. Constructor()</td>
                  <td className="p-2.5 text-slate-700">Executes initialization block; populates initial instance fields</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">Constructor Code</td>
                  <td className="p-2.5 text-slate-600">Must match class name; NEVER has a return type (not even void)</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-indigo-700 font-mono">3. Assignment</td>
                  <td className="p-2.5 text-slate-700">Memory address of ready object returned to reference variable</td>
                  <td className="p-2.5 text-indigo-600 font-semibold">Stack Variable</td>
                  <td className="p-2.5 text-slate-600">Object is 100% ready for method invocation immediately</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson 2: Default Constructors */}
      {(slug === 'default-constructors') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Compiler Default vs Explicit No-Arg Constructor Rules
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Scenario in Code</th>
                  <th className="p-2.5">Does javac create Default?</th>
                  <th className="p-2.5">Does new ClassName() work?</th>
                  <th className="p-2.5 rounded-r-lg">Architectural Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Zero constructors written</td>
                  <td className="p-2.5 text-emerald-600 font-bold font-mono">YES (Automatic)</td>
                  <td className="p-2.5 text-emerald-600 font-bold font-mono">YES</td>
                  <td className="p-2.5 text-slate-600">Javac synthesizes invisible empty ClassName() &#123;&#125; in bytecode</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-rose-50/40">
                  <td className="p-2.5 font-bold text-rose-800">Only Parameterized written</td>
                  <td className="p-2.5 text-rose-600 font-bold font-mono">NO (Vanished!)</td>
                  <td className="p-2.5 text-rose-600 font-bold font-mono">NO (Compile Error!)</td>
                  <td className="p-2.5 text-rose-700 font-semibold">Java assumes you want mandatory parameters; removes default</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-emerald-50/30">
                  <td className="p-2.5 font-bold text-emerald-900">Explicit No-arg + Parameterized</td>
                  <td className="p-2.5 text-indigo-600 font-mono">Developer provided</td>
                  <td className="p-2.5 text-emerald-600 font-bold font-mono">YES</td>
                  <td className="p-2.5 text-slate-600">Best practice: gives callers flexibility for default or custom initialization</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson 3: Parameterized Constructors */}
      {(slug === 'parameterized-constructors') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Parameterized Constructor Heap Flow &amp; Best Practices
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-brand-700 font-mono">1. Atomic Creation</span>
              <p className="text-slate-600 text-[11px]">Object is born with all required data populated in 1 atomic statement. No half-initialized states.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-indigo-700 font-mono">2. Type Enforcement</span>
              <p className="text-slate-600 text-[11px]">Compiler enforces data types at compile time (e.g. string cannot be passed where double is expected).</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-emerald-700 font-mono">3. Gatekeeper Validation</span>
              <p className="text-slate-600 text-[11px]">Constructors can sanitize input (clamp negative prices, reject null names) before object enters memory.</p>
            </div>
          </div>
        </Card>
      )}

      {/* Lesson 4: Constructor Overloading */}
      {(slug === 'constructor-overloading') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Constructor Overloading Signature Resolution Matrix
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Variation Factor</th>
                  <th className="p-2.5">Example Signatures</th>
                  <th className="p-2.5">Valid Overload?</th>
                  <th className="p-2.5 rounded-r-lg">Compiler Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Different Parameter Count</td>
                  <td className="p-2.5 font-mono text-[11px] text-brand-700">Student() vs Student(String)</td>
                  <td className="p-2.5 font-bold text-emerald-600 font-mono">VALID ✓</td>
                  <td className="p-2.5 text-slate-600">Different parameter counts are unambiguous</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Different Parameter Types</td>
                  <td className="p-2.5 font-mono text-[11px] text-brand-700">Item(int id) vs Item(String id)</td>
                  <td className="p-2.5 font-bold text-emerald-600 font-mono">VALID ✓</td>
                  <td className="p-2.5 text-slate-600">Javac matches argument type at compile time</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Different Parameter Order</td>
                  <td className="p-2.5 font-mono text-[11px] text-brand-700">Pair(int, String) vs Pair(String, int)</td>
                  <td className="p-2.5 font-bold text-emerald-600 font-mono">VALID ✓</td>
                  <td className="p-2.5 text-slate-600">Parameter type sequence forms part of signature</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-rose-50/40">
                  <td className="p-2.5 font-bold text-rose-800">Only Parameter Names Differ</td>
                  <td className="p-2.5 font-mono text-[11px] text-rose-700">User(String name) vs User(String email)</td>
                  <td className="p-2.5 font-bold text-rose-600 font-mono">INVALID ✗</td>
                  <td className="p-2.5 text-rose-700">Variable names are discarded; signatures are identical</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson 5: The this Keyword */}
      {(slug === 'the-this-keyword') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Variable Shadowing &amp; &apos;this&apos; Reference Cheat Sheet
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200 space-y-2">
              <span className="font-bold text-rose-800 font-mono">❌ Shadowing Trap: name = name;</span>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                When parameter has the same name as the instance field, local parameter takes priority.
                <code className="block mt-1 p-1 bg-white rounded font-mono text-[11px] text-rose-700 border border-rose-200">
                  name = name; // Writes parameter into parameter! Field stays null!
                </code>
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <span className="font-bold text-emerald-800 font-mono">✓ Idiomatic Fix: this.name = name;</span>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                &apos;this&apos; points to the current heap instance, explicitly anchoring the assignment to the field.
                <code className="block mt-1 p-1 bg-white rounded font-mono text-[11px] text-emerald-700 border border-emerald-200">
                  this.name = name; // Stored directly in instance memory!
                </code>
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Lesson 6: Constructor Chaining with this() */}
      {(slug === 'constructor-chaining-with-this') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Constructor Chaining Flow &amp; Inviolable Rules
            </h4>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-amber-200 border border-slate-800/80 leading-relaxed">
            <pre>&#47;&#47; Chaining Architecture: Small Constructors forward to Master Constructor
Student()                      ──► this(&quot;Unknown&quot;, 18, &quot;General&quot;);
Student(String name)           ──► this(name, 18, &quot;General&quot;);
Student(name, age, course)     ──► [MASTER CONSTRUCTOR performs actual assignments]</pre>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-rose-700 font-mono">Rule 1: First Line Only</span>
              <p className="text-slate-600 text-[11px]">this(...) MUST be line 1. Any code before it causes a compile error.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-indigo-700 font-mono">Rule 2: At Most One</span>
              <p className="text-slate-600 text-[11px]">An object cannot be initialized twice; you cannot call this(...) twice.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-amber-700 font-mono">Rule 3: No Cycles</span>
              <p className="text-slate-600 text-[11px]">A calling B and B calling A is detected as recursive invocation error.</p>
            </div>
          </div>
        </Card>
      )}

      {/* Lesson 7: Constructor vs Method */}
      {(slug === 'constructor-vs-method') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <BookOpen className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Master Comparison Matrix: Constructor vs Method
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Feature</th>
                  <th className="p-2.5">Constructor</th>
                  <th className="p-2.5">Regular Method</th>
                  <th className="p-2.5 rounded-r-lg">Key Interview Distinction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Primary Purpose</td>
                  <td className="p-2.5 text-brand-700 font-semibold">Initialize instance fields at birth</td>
                  <td className="p-2.5 text-indigo-700 font-semibold">Perform actions &amp; return results</td>
                  <td className="p-2.5 text-slate-600">Birth vs Daily Life</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Name Rule</td>
                  <td className="p-2.5 text-emerald-700 font-mono">MUST match class name exactly</td>
                  <td className="p-2.5 font-mono text-slate-700">Any valid identifier (camelCase)</td>
                  <td className="p-2.5 text-slate-600">PascalCase vs camelCase verb</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-rose-50/30">
                  <td className="p-2.5 font-bold text-slate-900">Return Type</td>
                  <td className="p-2.5 font-bold text-rose-700 font-mono">NO return type (not even void!)</td>
                  <td className="p-2.5 text-emerald-700 font-mono font-semibold">MUST specify type or void</td>
                  <td className="p-2.5 text-rose-700 font-semibold">Writing &apos;void Student()&apos; turns it into a method!</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Invocation</td>
                  <td className="p-2.5 text-slate-700">Automatically during <code className="text-brand-700 font-mono">new</code></td>
                  <td className="p-2.5 text-slate-700">Explicitly via dot: <code className="text-indigo-700 font-mono">obj.action()</code></td>
                  <td className="p-2.5 text-slate-600">Cannot call constructor with dot notation later</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Call Frequency</td>
                  <td className="p-2.5 font-bold text-indigo-700">Exactly ONCE per object</td>
                  <td className="p-2.5 text-slate-700">0, 1, or thousands of times</td>
                  <td className="p-2.5 text-slate-600">Objects are born once, but act repeatedly</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson 8: Mini Project: Bank Account */}
      {(slug === 'bank-account-project') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Bank Account Guided Architecture &amp; 10-Point Production Checklist
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Check #</th>
                  <th className="p-2.5">Architecture Requirement</th>
                  <th className="p-2.5 rounded-r-lg">Implementation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">01</td><td className="p-2.5">BankAccount class with accountHolder, accountNumber, balance</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">02</td><td className="p-2.5">Master Constructor initializes all 3 fields using &apos;this&apos;</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">03</td><td className="p-2.5">Validation clamps negative starting balances to 0.0</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">04</td><td className="p-2.5">2-arg constructor chains to Master via this(holder, number, 0.0)</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">05</td><td className="p-2.5">No-arg constructor chains with default Guest User credentials</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">06</td><td className="p-2.5">All this(...) calls are strictly the FIRST statement</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">07</td><td className="p-2.5">deposit(amount) mutates balance cleanly without re-running constructor</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">08</td><td className="p-2.5">withdraw(amount) guards against overdrafts</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">09</td><td className="p-2.5">Independent heap state verified across 3 distinct customer accounts</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">10</td><td className="p-2.5">Zero premature Module 3 concepts (no private, getters, setters)</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}


      {/* ======================================================== */}
      {/* MODULE 3: ENCAPSULATION & ACCESS CONTROL CHEAT SHEETS    */}
      {/* ======================================================== */}

      {/* Lesson 1: Why Encapsulation */}
      {(slug === 'why-encapsulation') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Direct Field Access vs Encapsulation Matrix
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Dimension</th>
                  <th className="p-2.5">Public Unprotected Fields</th>
                  <th className="p-2.5 rounded-r-lg">Encapsulated Design (Private + Guards)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Data Integrity</td>
                  <td className="p-2.5 text-rose-700 font-semibold">Zero protection; outside code can set negative/corrupt values</td>
                  <td className="p-2.5 text-emerald-700 font-semibold">100% enforced; invalid data intercepted by perimeter guards</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Refactoring Safety</td>
                  <td className="p-2.5 text-rose-700">Changing a field name breaks all callers across the entire codebase</td>
                  <td className="p-2.5 text-emerald-700">Internal representation can change freely without altering public contracts</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Debugging &amp; Breakpoints</td>
                  <td className="p-2.5 text-slate-600">Impossible to place breakpoints on direct variable writes</td>
                  <td className="p-2.5 text-emerald-700">Breakpoints in setters intercept every mutation instantly</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Read-Only Control</td>
                  <td className="p-2.5 text-slate-600">Impossible; public fields can always be written to</td>
                  <td className="p-2.5 text-emerald-700 font-semibold">Trivial; provide getters without setters</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson 2: Access Modifiers */}
      {(slug === 'access-modifiers') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Lock className="w-4 h-4 text-purple-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              The 4 Visibility Levels Scoping Matrix
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Access Modifier</th>
                  <th className="p-2.5">Same Class</th>
                  <th className="p-2.5">Same Package</th>
                  <th className="p-2.5">Subclass (Different Pkg)</th>
                  <th className="p-2.5 rounded-r-lg">World (Anywhere)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-rose-700">private</td>
                  <td className="p-2.5 text-emerald-600 font-bold">YES</td>
                  <td className="p-2.5 text-rose-500">NO</td>
                  <td className="p-2.5 text-rose-500">NO</td>
                  <td className="p-2.5 text-rose-500">NO</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-amber-700">default (package-private)</td>
                  <td className="p-2.5 text-emerald-600 font-bold">YES</td>
                  <td className="p-2.5 text-emerald-600 font-bold">YES</td>
                  <td className="p-2.5 text-rose-500">NO</td>
                  <td className="p-2.5 text-rose-500">NO</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-indigo-700">protected</td>
                  <td className="p-2.5 text-emerald-600 font-bold">YES</td>
                  <td className="p-2.5 text-emerald-600 font-bold">YES</td>
                  <td className="p-2.5 text-emerald-600 font-bold">YES</td>
                  <td className="p-2.5 text-rose-500">NO</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-emerald-700">public</td>
                  <td className="p-2.5 text-emerald-600 font-bold">YES</td>
                  <td className="p-2.5 text-emerald-600 font-bold">YES</td>
                  <td className="p-2.5 text-emerald-600 font-bold">YES</td>
                  <td className="p-2.5 text-emerald-600 font-bold">YES</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson 3: Getters and Setters */}
      {(slug === 'getters-and-setters') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <CheckCircle2 className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              JavaBeans Accessor &amp; Mutator Conventions
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/80 space-y-2">
              <span className="font-bold text-blue-900 block">Standard Naming Rules</span>
              <ul className="text-slate-700 space-y-1 list-disc pl-4 text-[11px]">
                <li><strong>Getter:</strong> <code>get + PropertyName</code> (e.g. <code>getName()</code>)</li>
                <li><strong>Boolean Getter:</strong> <code>is + PropertyName</code> (e.g. <code>isActive()</code>)</li>
                <li><strong>Setter:</strong> <code>set + PropertyName</code> (e.g. <code>setName(String name)</code>)</li>
                <li><strong>Setter Return:</strong> Always returns <code>void</code></li>
              </ul>
            </div>
            <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200/80 space-y-2">
              <span className="font-bold text-emerald-900 block">Computed / Virtual Getters</span>
              <p className="text-slate-700 text-[11px] leading-relaxed">
                Derives values dynamically from existing fields (e.g. <code>getFullName()</code> returning <code>firstName + &quot; &quot; + lastName</code>). Eliminates redundant variables and prevents out-of-sync bugs.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Lesson 4: Validating Object State */}
      {(slug === 'validating-object-state') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Guard Clauses &amp; Fail-Fast Perimeter Defense
            </h4>
          </div>

          <div className="p-3.5 bg-slate-950 font-mono text-xs text-emerald-300 rounded-xl space-y-2 border border-slate-800">
            <div className="text-slate-400">{'// Golden Pattern: Fail-Fast Guard Clause at the Top'}</div>
            <div>public void setAge(int age) &#123;</div>
            <div className="pl-4 text-rose-400">if (age &lt; 0 || age &gt; 120) &#123;</div>
            <div className="pl-8 text-slate-400">{'// Reject invalid state immediately'}</div>
            <div className="pl-8 text-rose-300">return;</div>
            <div className="pl-4 text-rose-400">&#125;</div>
            <div className="pl-4 text-emerald-400">this.age = age; {'// Safe assignment'}</div>
            <div>&#125;</div>
          </div>
        </Card>
      )}

      {/* Lesson 5: Read-Only Objects */}
      {(slug === 'read-only-objects') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Read-Only Pattern vs Mutable Objects Architecture
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Feature</th>
                  <th className="p-2.5">Read-Only Object</th>
                  <th className="p-2.5 rounded-r-lg">Standard Mutable Bean</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Setters Excluded?</td>
                  <td className="p-2.5 text-emerald-700 font-semibold">YES — zero setters provided</td>
                  <td className="p-2.5 text-slate-600">NO — setters exposed for all fields</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">State Assignment</td>
                  <td className="p-2.5 text-indigo-700 font-semibold">Exclusively during constructor birth</td>
                  <td className="p-2.5 text-slate-600">Anytime throughout application lifetime</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Concurrency Safety</td>
                  <td className="p-2.5 text-emerald-700 font-semibold">Inherently thread-safe (readers only)</td>
                  <td className="p-2.5 text-rose-700 font-semibold">Prone to race conditions without locks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson 6: Encapsulation in Real Applications */}
      {(slug === 'encapsulation-in-real-applications') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Rich Domain Models vs Anemic Data Holders
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-200/80 space-y-1.5">
              <span className="font-bold text-rose-900 block font-mono">❌ Anemic Data Bag</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Naked setters allow inconsistent states: calling <code>setItemCount(5)</code> while leaving <code>setTotal(0.0)</code> creates contradictory business data.
              </p>
            </div>
            <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200/80 space-y-1.5">
              <span className="font-bold text-emerald-900 block font-mono">✓ Rich Domain Method</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Calling <code>cart.addItem(price)</code> atomically increments count, updates subtotal, and recalculates tax together in one safe operation.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Lesson 7: Common Encapsulation Mistakes */}
      {(slug === 'common-encapsulation-mistakes') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Mutable Reference Leaks &amp; Defensive Copying Checklist
            </h4>
          </div>

          <div className="p-3.5 bg-slate-950 font-mono text-xs rounded-xl space-y-2 border border-slate-800 text-slate-100">
            <div className="text-rose-400 font-bold">{'// Trap: Leaking direct reference to private array'}</div>
            <div className="text-slate-400">public int[] getScores() &#123; return this.scores; &#125; {'// DANGER!'}</div>
            <div className="text-emerald-400 font-bold pt-2">{'// Fix: Defensive clone preserves encapsulation'}</div>
            <div className="text-emerald-300">public int[] getScores() &#123; return this.scores.clone(); &#125;</div>
          </div>
        </Card>
      )}

      {/* Lesson 8: Employee Profile Mini Project */}
      {(slug === 'employee-profile-project') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Employee Profile Guided Architecture &amp; 10-Point Production Checklist
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Check #</th>
                  <th className="p-2.5">Architecture Requirement</th>
                  <th className="p-2.5 rounded-r-lg">Implementation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">01</td><td className="p-2.5">All 5 fields (id, name, department, salary, rating) strictly private</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">02</td><td className="p-2.5">employeeId is permanently read-only (getter only, no setter)</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">03</td><td className="p-2.5">Constructor delegates to setters to enforce validation at birth</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">04</td><td className="p-2.5">baseSalary clamps minimum $1,000 and maximum $50,000 bounds</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">05</td><td className="p-2.5">giveRaise(percent) rejects negative or raises above 30.0%</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">06</td><td className="p-2.5">calculateAnnualBonus() derives bonus dynamically from rating</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">07</td><td className="p-2.5">calculateAnnualGrossPay() reuses bonus without duplicate logic</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">08</td><td className="p-2.5">Strings sanitized against null and blank spaces</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">09</td><td className="p-2.5">Independent heap state verified across distinct employee instances</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">10</td><td className="p-2.5">Zero premature Module 4/5 concepts (no static, final, extends)</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ======================================================== */}
      {/* MODULE 4: INSTANCE, STATIC & FINAL CHEAT SHEETS          */}
      {/* ======================================================== */}

      {/* Lesson 1: Instance vs Class Members */}
      {(slug === 'instance-vs-class-members') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Instance Members (Heap) vs Class Members (Metaspace)
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Dimension</th>
                  <th className="p-2.5">Instance Member (Non-Static)</th>
                  <th className="p-2.5 rounded-r-lg">Class Member (Static)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Memory Location</td>
                  <td className="p-2.5 text-indigo-700 font-mono">Heap Memory (per object)</td>
                  <td className="p-2.5 text-emerald-700 font-mono">Metaspace (Class Metadata)</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Copies in Memory</td>
                  <td className="p-2.5 text-slate-700">N copies (one per object instance)</td>
                  <td className="p-2.5 text-emerald-700 font-bold">Exactly 1 shared copy per class</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Access Syntax</td>
                  <td className="p-2.5 font-mono text-brand-700">objectReference.member</td>
                  <td className="p-2.5 font-mono text-emerald-700 font-bold">ClassName.member</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Existence without Objects</td>
                  <td className="p-2.5 text-rose-600">Does not exist until &apos;new&apos; is called</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">Exists as soon as class is loaded</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson 2: Static Variables */}
      {(slug === 'static-variables') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Static Variable Lifecycle &amp; Counter Architecture
            </h4>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl font-mono text-xs text-amber-200 space-y-2 border border-slate-800">
            <div className="text-slate-400">{'// Auto-incrementing sequential ID generator architecture'}</div>
            <div>class BankAccount &#123;</div>
            <div className="pl-4 text-emerald-300">private static int nextId = 1000; {'// 1 shared counter'}</div>
            <div className="pl-4 text-indigo-300">private int accountId;            {'// Unique per instance'}</div>
            <div className="pl-4 pt-1">public BankAccount() &#123;</div>
            <div className="pl-8 text-amber-300">this.accountId = ++nextId; {'// 1001, 1002, 1003...'}</div>
            <div className="pl-4">&#125;</div>
            <div>&#125;</div>
          </div>
        </Card>
      )}

      {/* Lesson 3: Static Methods */}
      {(slug === 'static-methods') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Terminal className="w-4 h-4 text-purple-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Static Methods Rules &amp; The Absence of &apos;this&apos;
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-200 space-y-1">
              <span className="font-bold text-rose-800 font-mono">❌ Forbidden in Static Methods</span>
              <ul className="text-slate-600 text-[11px] list-disc pl-4 space-y-1">
                <li>Using <code>this</code> or <code>super</code> keywords</li>
                <li>Accessing non-static instance fields directly</li>
                <li>Invoking non-static instance methods directly</li>
              </ul>
            </div>
            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1">
              <span className="font-bold text-emerald-800 font-mono">✓ Permitted in Static Methods</span>
              <ul className="text-slate-600 text-[11px] list-disc pl-4 space-y-1">
                <li>Reading and mutating static variables</li>
                <li>Calling other static methods in the class</li>
                <li>Operating on arguments passed into parameters</li>
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Lesson 4: Static Initialization */}
      {(slug === 'static-initialization') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Execution Sequence: Class Load vs Object Instantiation
            </h4>
          </div>

          <div className="p-3.5 bg-slate-950 font-mono text-xs text-slate-200 rounded-xl space-y-2 border border-slate-800">
            <div className="text-amber-300 font-bold">[Phase 1: Class Loaded by JVM (Runs ONCE)]</div>
            <div className="pl-4 text-slate-300">1. Static variables initialized to default values</div>
            <div className="pl-4 text-slate-300">2. Static blocks <code className="text-emerald-400">static &#123; ... &#125;</code> execute top-to-bottom</div>
            <div className="text-indigo-300 font-bold pt-2">[Phase 2: Object Creation &apos;new&apos; (Runs on EVERY instance)]</div>
            <div className="pl-4 text-slate-300">3. Heap memory allocated; instance fields default-initialized</div>
            <div className="pl-4 text-slate-300">4. Instance initializers execute</div>
            <div className="pl-4 text-slate-300">5. Constructor body executes</div>
          </div>
        </Card>
      )}

      {/* Lesson 5: Why main() Is Static */}
      {(slug === 'why-main-is-static') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Terminal className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Deconstructing &apos;public static void main(String[] args)&apos;
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Keyword</th>
                  <th className="p-2.5">Architectural Role</th>
                  <th className="p-2.5 rounded-r-lg">What happens if omitted / changed?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-bold font-mono text-purple-700">public</td><td className="p-2.5">Accessible by the JVM runtime outside the application package</td><td className="p-2.5 text-rose-600">JVM cannot invoke entry point; launch fails</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-bold font-mono text-emerald-700">static</td><td className="p-2.5">Allows execution before any object of the class exists on the heap</td><td className="p-2.5 text-rose-600">JVM doesn&apos;t know which constructor to call; rejects launch</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-bold font-mono text-indigo-700">void</td><td className="p-2.5">Entry point returns no value to Java (OS exit codes use System.exit)</td><td className="p-2.5 text-rose-600">Signature mismatch; JVM refuses to start</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-bold font-mono text-amber-700">String[] args</td><td className="p-2.5">Accepts command-line configuration arguments from operating system</td><td className="p-2.5 text-rose-600">Must be String array (or String... varargs)</td></tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson 6: final Variables */}
      {(slug === 'final-variables') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Lock className="w-4 h-4 text-purple-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              The 3 Scopes of &apos;final&apos; Variables in Java
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Scope</th>
                  <th className="p-2.5">Declaration Example</th>
                  <th className="p-2.5">Where Initialized</th>
                  <th className="p-2.5 rounded-r-lg">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900 font-sans">Local Final</td>
                  <td className="p-2.5 text-brand-700">final int x = 10;</td>
                  <td className="p-2.5 font-sans text-slate-600">Inside method body</td>
                  <td className="p-2.5 font-sans text-slate-600">Prevents accidental variable reassignment in algorithms</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900 font-sans">Blank Final Instance</td>
                  <td className="p-2.5 text-purple-700">private final String ssn;</td>
                  <td className="p-2.5 font-sans text-slate-600">In EVERY constructor</td>
                  <td className="p-2.5 font-sans text-slate-600">Enforces permanent, immutable per-object identity</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900 font-sans">Static Final Constant</td>
                  <td className="p-2.5 text-emerald-700">public static final double PI;</td>
                  <td className="p-2.5 font-sans text-slate-600">At declaration or static block</td>
                  <td className="p-2.5 font-sans text-slate-600">Universal compile-time constants (ALL_CAPS naming)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson 7: final Methods & Classes */}
      {(slug === 'final-methods-and-classes') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              final Method vs final Class Architectural Matrix
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-200 space-y-2">
              <span className="font-bold text-indigo-900 block font-mono">final Method</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Prevents subclasses from <strong>overriding</strong> the method. Used for critical security checks, encryption routines, and template algorithms that must not be altered.
              </p>
            </div>
            <div className="p-3.5 bg-purple-50/60 rounded-xl border border-purple-200 space-y-2">
              <span className="font-bold text-purple-900 block font-mono">final Class</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Prevents the class from being <strong>extended (inherited)</strong> by any other class. Used for immutable types like <code>java.lang.String</code> and value objects.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Lesson 8: ID Generator Mini Project */}
      {(slug === 'id-generator-project') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              ID Generator Guided Architecture &amp; 10-Point Production Checklist
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Check #</th>
                  <th className="p-2.5">Architecture Requirement</th>
                  <th className="p-2.5 rounded-r-lg">Implementation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">01</td><td className="p-2.5">Universal constant prefix (public static final String PREFIX = &quot;TX-&quot;)</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">02</td><td className="p-2.5">Private static sequence counter prevents duplicate or manual IDs</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">03</td><td className="p-2.5">Private constructor enforces usage of static factory methods</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">04</td><td className="p-2.5">Entity ID is declared private final String to guarantee immutability</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">05</td><td className="p-2.5">Static factory method create() validates inputs and generates monotonic IDs</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">06</td><td className="p-2.5">Captures creation epoch timestamp in private final long field</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">07</td><td className="p-2.5">Static query method getTotalTransactionsIssued() inspects volume</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">08</td><td className="p-2.5">All getters exposed with ZERO setters provided (tamper-proof)</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">09</td><td className="p-2.5">Independent heap state verified across multiple transactions</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">10</td><td className="p-2.5">Zero premature Module 5 concepts (no extends or super)</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* MODULE 5: INHERITANCE (11 CHEAT SHEETS) */}

      {/* Lesson 1: why-inheritance */}
      {(slug === 'why-inheritance') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Why Inheritance? — Architecture &amp; Reusability Matrix
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Aspect</th>
                  <th className="p-2.5">Without Inheritance (Copy-Paste)</th>
                  <th className="p-2.5 rounded-r-lg">With Inheritance (OOP Superclass)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Code Duplication</td>
                  <td className="p-2.5 text-rose-600">High: Identical fields and methods copied across N classes</td>
                  <td className="p-2.5 text-emerald-600 font-bold">Zero: Shared code centralized in 1 superclass</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Bug Fixes</td>
                  <td className="p-2.5 text-rose-600">Must manually find and patch in every copied file</td>
                  <td className="p-2.5 text-emerald-600 font-bold">Fix once in superclass; propagates to all subclasses</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Architecture</td>
                  <td className="p-2.5 text-rose-600">Disjointed, uncoordinated, high maintenance debt</td>
                  <td className="p-2.5 text-emerald-600 font-bold">Structured IS-A hierarchy modeling real-world domains</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Core Principle</td>
                  <td className="p-2.5 text-rose-600">WET (Write Everything Twice)</td>
                  <td className="p-2.5 text-emerald-600 font-bold">DRY (Don&apos;t Repeat Yourself)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson 2: parent-and-child-classes */}
      {(slug === 'parent-and-child-classes') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Superclass vs Subclass Terminology &amp; The IS-A Test
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                Superclass (Base / Parent)
              </span>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li>Represents <strong>Generalization</strong> (shared concepts)</li>
                <li>Root ancestor of all Java classes is <code className="font-mono text-brand-600 font-bold">java.lang.Object</code></li>
                <li>Holds universal state: <code className="font-mono text-slate-700">id, name, speed</code></li>
                <li>Has zero compile-time awareness of subclass fields</li>
              </ul>
            </div>

            <div className="p-3.5 bg-brand-50/40 border border-brand-200/70 rounded-xl space-y-2">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Subclass (Derived / Child)
              </span>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li>Represents <strong>Specialization</strong> (unique refinements)</li>
                <li>Created using the <code className="font-mono text-brand-600 font-bold">extends</code> keyword</li>
                <li>Inherits all accessible members of the superclass</li>
                <li>Single contiguous object allocated in heap memory</li>
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Lesson 3: the-extends-keyword */}
      {(slug === 'the-extends-keyword') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <FileCode className="w-4 h-4 text-blue-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              The extends Keyword — Member Accessibility Matrix
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Superclass Modifier</th>
                  <th className="p-2.5">Subclass in Same Package</th>
                  <th className="p-2.5">Subclass in Different Package</th>
                  <th className="p-2.5 rounded-r-lg">Direct Access in Child?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-brand-700 font-bold">public</td><td className="p-2.5 text-emerald-600 font-bold">✓ Accessible</td><td className="p-2.5 text-emerald-600 font-bold">✓ Accessible</td><td className="p-2.5 text-emerald-600 font-bold">YES everywhere</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-brand-700 font-bold">protected</td><td className="p-2.5 text-emerald-600 font-bold">✓ Accessible</td><td className="p-2.5 text-emerald-600 font-bold">✓ Accessible (via inheritance)</td><td className="p-2.5 text-emerald-600 font-bold">YES in subclasses</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-700">package-private (default)</td><td className="p-2.5 text-emerald-600 font-bold">✓ Accessible</td><td className="p-2.5 text-rose-600">✗ Blocked</td><td className="p-2.5 text-amber-600">Only within package</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-rose-600 font-bold">private</td><td className="p-2.5 text-rose-600">✗ Blocked</td><td className="p-2.5 text-rose-600">✗ Blocked</td><td className="p-2.5 text-rose-600 font-bold">NO (Use getters/setters)</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-purple-700 font-bold">Constructors</td><td className="p-2.5 text-rose-600">Not inherited</td><td className="p-2.5 text-rose-600">Not inherited</td><td className="p-2.5 text-amber-600">Must invoke via super()</td></tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson 4: single-inheritance */}
      {(slug === 'single-inheritance') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Single Inheritance Architecture &amp; Call Graph Simplicity
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
              <span className="font-bold text-slate-900">Rule of One</span>
              <p className="text-slate-600 leading-relaxed">
                A class can have <strong>at most one</strong> direct parent class. Commas in extends cause a compiler syntax error.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
              <span className="font-bold text-slate-900">Linear Method Lookup</span>
              <p className="text-slate-600 leading-relaxed">
                Method resolution is a straight path: <code className="font-mono text-brand-600">Child -&gt; Parent -&gt; Object</code> with zero branching ambiguity.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
              <span className="font-bold text-slate-900">Contiguous Heap Layout</span>
              <p className="text-slate-600 leading-relaxed">
                The JVM lays out parent fields directly followed by child fields in one contiguous block in memory.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Lesson 5: multilevel-inheritance */}
      {(slug === 'multilevel-inheritance') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Multilevel Inheritance — Cumulative State &amp; Transitivity
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Tier Level</th>
                  <th className="p-2.5">Example Class</th>
                  <th className="p-2.5">Introduced State</th>
                  <th className="p-2.5 rounded-r-lg">Cumulative Access in Leaf</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-bold text-slate-900">Grandparent</td><td className="p-2.5 font-mono text-brand-700">Device</td><td className="p-2.5">brand, powerOn()</td><td className="p-2.5 text-emerald-600 font-bold">✓ Accessible</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-bold text-slate-900">Parent</td><td className="p-2.5 font-mono text-brand-700">Computer</td><td className="p-2.5">ramGb, loadOS()</td><td className="p-2.5 text-emerald-600 font-bold">✓ Accessible</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-bold text-slate-900">Child (Leaf)</td><td className="p-2.5 font-mono text-brand-700">Laptop</td><td className="p-2.5">weightKg, openLid()</td><td className="p-2.5 text-emerald-600 font-bold">Own members</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-500 italic">
            * Best Practice: Keep hierarchy depth between 2 to 3 tiers to prevent the Fragile Base Class problem.
          </p>
        </Card>
      )}

      {/* Lesson 6: hierarchical-inheritance */}
      {(slug === 'hierarchical-inheritance') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-cyan-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Hierarchical Inheritance — Branching &amp; Strict Sibling Isolation
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
              <span className="font-bold text-slate-900">Shared Base (Vertical)</span>
              <p className="text-slate-600 leading-relaxed">
                One superclass (<code className="font-mono text-brand-600">BankAccount</code>) provides core state (<code className="font-mono text-slate-700">balance</code>) to all siblings: <code className="font-mono text-slate-700">SavingsAccount</code>, <code className="font-mono text-slate-700">CheckingAccount</code>.
              </p>
            </div>

            <div className="p-3 bg-rose-50/40 border border-rose-200/70 rounded-xl space-y-2">
              <span className="font-bold text-slate-900">Strict Sibling Isolation (Horizontal)</span>
              <p className="text-slate-600 leading-relaxed">
                Siblings cannot see each other&apos;s fields. <code className="font-mono text-rose-700">SavingsAccount</code> cannot call <code className="font-mono text-rose-700">CheckingAccount.writeCheck()</code>.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Lesson 7: why-no-multiple-class-inheritance */}
      {(slug === 'why-no-multiple-class-inheritance') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              The Diamond Problem &amp; Why Java Forbids Multiple Class Inheritance
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Pitfall in C++ Multiple Inheritance</th>
                  <th className="p-2.5">Root Cause</th>
                  <th className="p-2.5 rounded-r-lg">Java&apos;s Architectural Solution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-bold text-slate-900">The Diamond Problem</td><td className="p-2.5">Two parents override method() from common grandparent</td><td className="p-2.5 text-emerald-600 font-bold">Prohibit multiple class inheritance entirely</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-bold text-slate-900">Field Duplication</td><td className="p-2.5">Child inherits 2 separate copies of grandparent fields</td><td className="p-2.5 text-emerald-600 font-bold">Single parent ensures 1 copy of state in heap</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-bold text-slate-900">Multiple Capabilities</td><td className="p-2.5">Need for a class to wear multiple hats</td><td className="p-2.5 text-emerald-600 font-bold">Interfaces: multiple inheritance of type without state</td></tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson 8: multiple-inheritance-through-interfaces */}
      {(slug === 'multiple-inheritance-through-interfaces') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Class Extension vs Interface Implementation Comparison
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Feature</th>
                  <th className="p-2.5">Class Inheritance (extends)</th>
                  <th className="p-2.5 rounded-r-lg">Interface Implementation (implements)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-bold text-slate-900">Relationship</td><td className="p-2.5">IS-A (Core Identity)</td><td className="p-2.5 text-emerald-600 font-bold">CAN-DO (Behavioral Contract)</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-bold text-slate-900">Allowed Count</td><td className="p-2.5 text-amber-700 font-bold">At most ONE class</td><td className="p-2.5 text-emerald-600 font-bold">UNLIMITED interfaces</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-bold text-slate-900">Instance Variables</td><td className="p-2.5">Can declare state fields</td><td className="p-2.5 text-emerald-600 font-bold">ZERO instance fields (only static constants)</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-bold text-slate-900">Constructors</td><td className="p-2.5">Has constructors</td><td className="p-2.5 text-emerald-600 font-bold">ZERO constructors</td></tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson 9: the-super-keyword */}
      {(slug === 'the-super-keyword') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <FileCode className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              The 3 Powers of super — Complete Reference Matrix
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Use Case</th>
                  <th className="p-2.5">Syntax</th>
                  <th className="p-2.5">Strict Rule</th>
                  <th className="p-2.5 rounded-r-lg">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-bold text-slate-900">1. Constructor</td><td className="p-2.5 font-mono text-brand-700 font-bold">super(...)</td><td className="p-2.5 text-rose-600 font-bold">MUST be Line 1</td><td className="p-2.5">Executes parent constructor before child logic</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-bold text-slate-900">2. Method Call</td><td className="p-2.5 font-mono text-brand-700 font-bold">super.method()</td><td className="p-2.5">Any non-static method</td><td className="p-2.5">Invokes parent&apos;s method implementation</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-bold text-slate-900">3. Shadowed Field</td><td className="p-2.5 font-mono text-brand-700 font-bold">super.field</td><td className="p-2.5">Any non-static scope</td><td className="p-2.5">Reads parent variable hidden by child variable</td></tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson 10: constructor-execution-in-inheritance */}
      {(slug === 'constructor-execution-in-inheritance') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Constructor Execution Order — Step-by-Step Chaining Sequence
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Step #</th>
                  <th className="p-2.5">Phase</th>
                  <th className="p-2.5 rounded-r-lg">Action Performed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">01</td><td className="p-2.5 font-bold text-slate-900">Memory Allocation</td><td className="p-2.5">JVM allocates unified heap object with default values (0, null, false)</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">02</td><td className="p-2.5 font-bold text-slate-900">Call Propagation (Up)</td><td className="p-2.5">Child calls super(), Parent calls super() until java.lang.Object is reached</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">03</td><td className="p-2.5 font-bold text-slate-900">Execution Phase (Down)</td><td className="p-2.5">Object constructor runs first, then Grandparent, then Parent, then Child</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">04</td><td className="p-2.5 font-bold text-slate-900">Implicit super()</td><td className="p-2.5">Compiler automatically inserts super(); if no explicit super() or this() is written</td></tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lesson 11: employee-role-hierarchy-project */}
      {(slug === 'employee-role-hierarchy-project') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Employee Role Hierarchy — 10-Point Architectural Checklist
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Check #</th>
                  <th className="p-2.5">Architecture Requirement</th>
                  <th className="p-2.5 rounded-r-lg">Implementation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">01</td><td className="p-2.5">Base Employee class encapsulates id, name, and baseSalary with validation</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">02</td><td className="p-2.5">Developer extends Employee as a sibling subclass with isolated state</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">03</td><td className="p-2.5">Manager extends Employee as a sibling subclass adding team size and budget</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">04</td><td className="p-2.5">Director extends Manager as a multilevel subclass accumulating all state</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">05</td><td className="p-2.5">All constructors invoke super(...) on line 1 without compilation errors</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">06</td><td className="p-2.5">calculateTotalCompensation computes role-specific performance packages</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">07</td><td className="p-2.5">Sibling isolation strictly preserved (Developer cannot see Manager fields)</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">08</td><td className="p-2.5">Shadowed fields resolved cleanly using super where appropriate</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">09</td><td className="p-2.5">Inheritance tree remains shallow (3 levels max) to prevent fragile bases</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
                <tr className="hover:bg-slate-50/80"><td className="p-2.5 font-mono text-slate-500">10</td><td className="p-2.5">Clean pedagogical boundaries: zero abstract classes or interfaces</td><td className="p-2.5 text-emerald-600 font-bold">✓ Verified</td></tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}


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

      {/* ========================================================= */}
      {/* MODULE 04: INPUT & OUTPUT CHEATSHEETS                     */}
      {/* ========================================================= */}

      {/* Module 04: Print vs Println vs Printf */}
      {(slug === 'printing-output-in-java' || slug === 'formatting-output' || slug === 'print-vs-println' || slug === 'printf-and-format-specifiers') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Terminal className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Java Output Methods &amp; printf Format Specifiers Reference
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Method / Specifier</th>
                  <th className="p-2.5">Behavior &amp; Syntax</th>
                  <th className="p-2.5">Example Snippet</th>
                  <th className="p-2.5 rounded-r-lg">Rendered Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold font-mono text-slate-900">System.out.print()</td>
                  <td className="p-2.5 text-slate-600">Prints characters without appending a newline; cursor stays on same line</td>
                  <td className="p-2.5 font-mono text-indigo-700">print(&quot;Hello &quot;); print(&quot;World&quot;);</td>
                  <td className="p-2.5 font-mono text-emerald-700">Hello World</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold font-mono text-slate-900">System.out.println()</td>
                  <td className="p-2.5 text-slate-600">Prints characters and appends a platform newline (
 or 
)</td>
                  <td className="p-2.5 font-mono text-indigo-700">println(&quot;Line 1&quot;); println(&quot;Line 2&quot;);</td>
                  <td className="p-2.5 font-mono text-emerald-700">Line 1
Line 2</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold font-mono text-slate-900">%d / %,d</td>
                  <td className="p-2.5 text-slate-600">Decimal integer with optional locale thousands comma grouping</td>
                  <td className="p-2.5 font-mono text-indigo-700">printf(&quot;Balance: %,d&quot;, 1000000);</td>
                  <td className="p-2.5 font-mono text-emerald-700">Balance: 1,000,000</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold font-mono text-slate-900">%f / %.2f</td>
                  <td className="p-2.5 text-slate-600">Floating-point decimal rounded to specified decimal places</td>
                  <td className="p-2.5 font-mono text-indigo-700">printf(&quot;Price: $%.2f&quot;, 19.998);</td>
                  <td className="p-2.5 font-mono text-emerald-700">Price: $20.00</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold font-mono text-slate-900">%s / %c / %b</td>
                  <td className="p-2.5 text-slate-600">String text (%s), single char (%c), boolean flag (%b)</td>
                  <td className="p-2.5 font-mono text-indigo-700">printf(&quot;%s %c %b&quot;, &quot;OK&quot;, &apos;A&apos;, true);</td>
                  <td className="p-2.5 font-mono text-emerald-700">OK A true</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold font-mono text-slate-900">%n</td>
                  <td className="p-2.5 text-slate-600">Platform-independent newline (preferred over 
 in printf)</td>
                  <td className="p-2.5 font-mono text-indigo-700">printf(&quot;Row 1%nRow 2%n&quot;);</td>
                  <td className="p-2.5 font-mono text-emerald-700">Row 1
Row 2</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold font-mono text-slate-900">%-15s %8.2f</td>
                  <td className="p-2.5 text-slate-600">Left-aligned 15-width column (%-15s) and right-aligned 8-width float</td>
                  <td className="p-2.5 font-mono text-indigo-700">printf(&quot;%-15s %8.2f%n&quot;, &quot;Laptop&quot;, 899.5);</td>
                  <td className="p-2.5 font-mono text-emerald-700">Laptop            899.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Module 04: Scanner Methods & The Buffer Trap */}
      {(slug === 'reading-input-with-scanner' || slug === 'reading-different-types-of-input' || slug === 'next-vs-nextline' || slug === 'common-scanner-mistakes' || slug === 'scanner-basics' || slug === 'scanner-newline-issue' || slug === 'scanner-pitfalls') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Scanner Token vs Line Parsing &amp; The Legendary Buffer Bug
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
              <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
                Token Reading Methods (Whitespace Delimited)
              </span>
              <ul className="space-y-1.5 text-slate-600">
                <li><code className="font-mono text-indigo-700 font-bold">next()</code>: Reads up to the next whitespace delimiter.</li>
                <li><code className="font-mono text-indigo-700 font-bold">nextInt()</code>: Parses next token as 32-bit int. Leaves trailing <code className="font-mono text-rose-700">
</code> in buffer!</li>
                <li><code className="font-mono text-indigo-700 font-bold">nextDouble()</code>: Parses next token as 64-bit double using locale decimal separator.</li>
                <li><code className="font-mono text-indigo-700 font-bold">next().charAt(0)</code>: Standard idiomatic idiom to read a single <code className="font-mono">char</code>.</li>
              </ul>
            </div>
            <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/80 space-y-2">
              <span className="font-bold text-amber-900 block text-xs uppercase tracking-wider">
                The Scanner Buffer Trap &amp; Clean Fix
              </span>
              <p className="text-amber-800 leading-relaxed">
                When a user types <code className="font-mono text-rose-800">42 [Enter]</code>, <code className="font-mono text-indigo-800">nextInt()</code> extracts <code className="font-mono">42</code> but leaves the invisible <code className="font-mono text-rose-800">
</code> in the stream. A subsequent <code className="font-mono text-indigo-800">nextLine()</code> instantly consumes that newline and returns an empty string!
              </p>
              <div className="bg-white/80 p-2.5 rounded border border-amber-300 font-mono text-[11px] text-slate-800">
                int age = sc.nextInt();<br />
                <span className="text-emerald-700 font-bold">sc.nextLine(); &#47;&#47; Mandatory buffer clear!</span><br />
                String address = sc.nextLine();
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Module 04: Capstone Summary */}
      {(slug === 'input-and-output-practice' || slug === 'input-and-output-final-challenge' || slug === 'input-output-practice' || slug === 'io-final-challenge') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Module 04 Capstone: Input &amp; Output Architecture Blueprint
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">I/O Operation</th>
                  <th className="p-2.5">Standard Java Tool</th>
                  <th className="p-2.5">Failure / Edge Trap</th>
                  <th className="p-2.5 rounded-r-lg">Defensive Coding Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Keyboard Input</td>
                  <td className="p-2.5 font-mono text-slate-700">Scanner(System.in)</td>
                  <td className="p-2.5 text-rose-700 font-mono">InputMismatchException</td>
                  <td className="p-2.5 text-slate-600">Validate with <code className="font-mono text-indigo-700">hasNextInt()</code> before reading</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Line Reading after Numbers</td>
                  <td className="p-2.5 font-mono text-slate-700">scanner.nextLine()</td>
                  <td className="p-2.5 text-rose-700 font-mono">Consumes leftover 
 silently</td>
                  <td className="p-2.5 text-slate-600">Insert an extra <code className="font-mono text-emerald-700">scanner.nextLine()</code> to flush buffer</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Structured Tabular Output</td>
                  <td className="p-2.5 font-mono text-slate-700">System.out.printf()</td>
                  <td className="p-2.5 text-rose-700 font-mono">Misaligned manual string concatenation</td>
                  <td className="p-2.5 text-slate-600">Use fixed column specifiers: <code className="font-mono text-indigo-700">%-20s %10.2f%n</code></td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Resource Teardown</td>
                  <td className="p-2.5 font-mono text-slate-700">scanner.close()</td>
                  <td className="p-2.5 text-rose-700 font-mono">Closing System.in prevents future console reads</td>
                  <td className="p-2.5 text-slate-600">Keep single Scanner across application or close at program exit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ========================================================= */}
      {/* MODULE 05: CONDITIONAL STATEMENTS CHEATSHEETS             */}
      {/* ========================================================= */}

      {/* Module 05: if vs else-if vs Guard Clauses */}
      {(slug === 'thinking-in-conditions' || slug === 'if-and-if-else' || slug === 'else-if-and-multiple-conditions' || slug === 'nested-conditions' || slug === 'logical-conditions' || slug === 'if-statements' || slug === 'if-else' || slug === 'else-if-ladder' || slug === 'nested-if') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Conditional Architecture: If-Else vs Guard Clauses &amp; Ladder Hierarchy
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2">
              <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
                1. Binary if-else
              </span>
              <p className="text-slate-600 leading-relaxed">
                Mutually exclusive split. Exactly one branch executes. Never omit curly braces <code className="font-mono text-indigo-700">&#123;&#125;</code> to avoid single-statement omission bugs.
              </p>
              <div className="bg-white p-2 rounded border border-slate-200 font-mono text-[11px] text-slate-700">
                if (isValid) &#123;<br />
                &nbsp;&nbsp;proceed();<br />
                &#125; else &#123;<br />
                &nbsp;&nbsp;reject();<br />
                &#125;
              </div>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2">
              <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
                2. else-if Ladder Hierarchy
              </span>
              <p className="text-slate-600 leading-relaxed">
                Evaluates top-to-bottom sequentially. Stop at first true condition. Order from most specific to general to avoid dead branches.
              </p>
              <div className="bg-white p-2 rounded border border-slate-200 font-mono text-[11px] text-slate-700">
                if (score &gt;= 90) A();<br />
                else if (score &gt;= 80) B();<br />
                else if (score &gt;= 70) C();<br />
                else F();
              </div>
            </div>
            <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200/80 space-y-2">
              <span className="font-bold text-emerald-900 block text-xs uppercase tracking-wider">
                3. Guard Clauses (Bouncers)
              </span>
              <p className="text-emerald-800 leading-relaxed">
                Replaces deeply nested &quot;arrow anti-pattern&quot; pyramids. Test failure preconditions early at the method top and return immediately.
              </p>
              <div className="bg-white p-2 rounded border border-emerald-300 font-mono text-[11px] text-slate-700">
                if (user == null) return;<br />
                if (!user.isActive()) return;<br />
                &#47;&#47; Clean happy path!
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Module 05: Classic switch vs Modern switch expressions */}
      {(slug === 'switch-statements' || slug === 'modern-switch-expressions' || slug === 'switch' || slug === 'switch-case' || slug === 'switch-expressions' || slug === 'switch-arrow-syntax') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Classic switch vs Java 14+ Modern switch Expressions
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Feature Dimension</th>
                  <th className="p-2.5">Classic switch Statement (Java 1.0 - 13)</th>
                  <th className="p-2.5 rounded-r-lg">Modern switch Expression (Java 14+)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Label Syntax</td>
                  <td className="p-2.5 font-mono text-slate-700">case 1:</td>
                  <td className="p-2.5 font-mono text-emerald-700 font-bold">case 1 -&gt;</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Fallthrough Behavior</td>
                  <td className="p-2.5 text-rose-700 font-semibold">Automatic fallthrough unless explicit <code className="font-mono">break;</code> is written</td>
                  <td className="p-2.5 text-emerald-700 font-semibold">Zero fallthrough risk. Only target branch executes.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Return Value</td>
                  <td className="p-2.5 text-slate-600">Statement only; cannot evaluate or return a value directly</td>
                  <td className="p-2.5 text-emerald-700 font-semibold">Can return value directly: <code className="font-mono">String s = switch(x) &#123; ... &#125;;</code></td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Multi-Value Labels</td>
                  <td className="p-2.5 font-mono text-slate-600">case 1: case 2: case 3:</td>
                  <td className="p-2.5 font-mono text-emerald-700 font-bold">case 1, 2, 3 -&gt;</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Multi-Line Block Return</td>
                  <td className="p-2.5 text-slate-600">Assigns to outer variable, then break</td>
                  <td className="p-2.5 text-indigo-700 font-mono font-bold">&#123; int temp = 10; yield temp * 2; &#125;</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Exhaustiveness Check</td>
                  <td className="p-2.5 text-slate-600">Optional default branch</td>
                  <td className="p-2.5 text-slate-800 font-bold">Compiler-enforced exhaustiveness (default mandatory unless exhaustive enum)</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Supported Data Types</td>
                  <td className="p-2.5 text-slate-700 font-mono" colSpan={2}>byte, short, char, int (and wrappers), String, enum</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Module 05: Capstone Summary & Bug Traps */}
      {(slug === 'conditional-bugs-and-output-prediction' || slug === 'conditional-practice' || slug === 'conditional-statements-final-challenge' || slug === 'conditional-bugs' || slug === 'conditions-practice' || slug === 'conditional-final-challenge') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Module 05 Capstone: Conditional Bug Elimination &amp; Diagnostic Traps
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Bug Pattern</th>
                  <th className="p-2.5">Symptom / Flaw</th>
                  <th className="p-2.5">Buggy Code Sample</th>
                  <th className="p-2.5 rounded-r-lg">Bulletproof Solution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Accidental Assignment</td>
                  <td className="p-2.5 text-rose-700 font-medium">Assigns true and always enters branch</td>
                  <td className="p-2.5 font-mono text-rose-700">if (isBlocked = true)</td>
                  <td className="p-2.5 text-slate-600">Write boolean directly: <code className="font-mono text-emerald-700">if (isBlocked)</code></td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Stray Semicolon</td>
                  <td className="p-2.5 text-rose-700 font-medium">Condition guards empty statement; block runs unconditionally</td>
                  <td className="p-2.5 font-mono text-rose-700">if (score &gt; 50); &#123; grant(); &#125;</td>
                  <td className="p-2.5 text-slate-600">Remove semicolon: <code className="font-mono text-emerald-700">if (score &gt; 50) &#123; grant(); &#125;</code></td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Dangling Else</td>
                  <td className="p-2.5 text-rose-700 font-medium">Else binds to closest unmatched if, not outermost</td>
                  <td className="p-2.5 font-mono text-rose-700">if (a) if (b) X; else Y;</td>
                  <td className="p-2.5 text-slate-600">Always use explicit curly braces <code className="font-mono text-emerald-700">&#123;&#125;</code> around every block</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Floating-Point ==</td>
                  <td className="p-2.5 text-rose-700 font-medium">IEEE 754 precision rounding fails exact equality</td>
                  <td className="p-2.5 font-mono text-rose-700">0.1 + 0.2 == 0.3 (false!)</td>
                  <td className="p-2.5 text-slate-600">Compare with epsilon tolerance: <code className="font-mono text-indigo-700">Math.abs(a - b) &lt; 1e-9</code></td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">String Reference ==</td>
                  <td className="p-2.5 text-rose-700 font-medium">Compares heap memory address, not character text</td>
                  <td className="p-2.5 font-mono text-rose-700">new String(&quot;VIP&quot;) == &quot;VIP&quot; (false!)</td>
                  <td className="p-2.5 text-slate-600">Always compare text using <code className="font-mono text-emerald-700">&quot;VIP&quot;.equals(str)</code></td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Leap Year Logic</td>
                  <td className="p-2.5 text-rose-700 font-medium">Years like 1900 incorrectly treated as leap years</td>
                  <td className="p-2.5 font-mono text-rose-700">year % 4 == 0</td>
                  <td className="p-2.5 text-slate-600"><code className="font-mono text-emerald-700">(y % 4 == 0 &amp;&amp; y % 100 != 0) || (y % 400 == 0)</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}


      {/* ---------------------------------------------------- */}
      {/* MODULE 06: LOOPS CHEAT SHEETS                        */}
      {/* ---------------------------------------------------- */}

      {/* Module 06: Loops Selection Matrix */}
      {(slug === 'why-loops' || slug === 'for-loop' || slug === 'while-and-do-while' || slug === 'understanding-loop-flow' || slug === 'for-loops' || slug === 'while-loops' || slug === 'do-while') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Java Loop Constructs &mdash; Comparison Matrix
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Loop Type</th>
                  <th className="p-2.5">Condition Check Timing</th>
                  <th className="p-2.5">Min. Iterations</th>
                  <th className="p-2.5">Idiomatic Use Case</th>
                  <th className="p-2.5 rounded-r-lg">Syntax Blueprint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold font-mono text-brand-700">for loop</td>
                  <td className="p-2.5 text-slate-700">Pre-test (before loop body)</td>
                  <td className="p-2.5 text-slate-700 font-semibold">0</td>
                  <td className="p-2.5 text-slate-600">Fixed number of iterations known in advance</td>
                  <td className="p-2.5 font-mono text-slate-800 text-[11px]">for (int i=0; i&lt;n; i++) &#123;...&#125;</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold font-mono text-indigo-700">while loop</td>
                  <td className="p-2.5 text-slate-700">Pre-test (before loop body)</td>
                  <td className="p-2.5 text-slate-700 font-semibold">0</td>
                  <td className="p-2.5 text-slate-600">Condition-driven where iteration count is unknown</td>
                  <td className="p-2.5 font-mono text-slate-800 text-[11px]">while (condition) &#123;...&#125;</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold font-mono text-amber-700">do-while loop</td>
                  <td className="p-2.5 text-slate-700">Post-test (after loop body)</td>
                  <td className="p-2.5 text-emerald-700 font-bold">1 (guaranteed)</td>
                  <td className="p-2.5 text-slate-600">Menu prompts, user input validation</td>
                  <td className="p-2.5 font-mono text-slate-800 text-[11px]">do &#123;...&#125; while (cond);</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Module 06: Jump Statements & Common Traps */}
      {(slug === 'break-and-continue' || slug === 'infinite-loops-and-common-bugs' || slug === 'pattern-and-number-problems' || slug === 'loops-practice-and-final-challenge' || slug === 'break-continue' || slug === 'loop-bugs' || slug === 'infinite-loops') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Loops Diagnostic &amp; Bug Prevention Reference
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Concept / Pitfall</th>
                  <th className="p-2.5">Behavior / Cause</th>
                  <th className="p-2.5">Flawed Code</th>
                  <th className="p-2.5 rounded-r-lg">Correct Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">break statement</td>
                  <td className="p-2.5 text-slate-700">Immediately exits innermost loop; skips all remaining iterations</td>
                  <td className="p-2.5 font-mono text-slate-600">for (...) &#123; if (found) break; &#125;</td>
                  <td className="p-2.5 text-emerald-700 font-medium">Use for early termination (linear search, threshold stop)</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">continue statement</td>
                  <td className="p-2.5 text-slate-700">Skips remainder of CURRENT iteration; jumps straight to next step</td>
                  <td className="p-2.5 font-mono text-slate-600">while (i &lt; n) &#123; if (x) continue; i++; &#125;</td>
                  <td className="p-2.5 text-rose-700 font-medium">In while loops, update counter BEFORE continue to avoid infinite freeze!</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Stray Semicolon on Loop</td>
                  <td className="p-2.5 text-rose-700 font-medium">Loop body becomes empty statement; curly block runs once after loop finishes</td>
                  <td className="p-2.5 font-mono text-rose-700">for (int i=0; i&lt;5; i++); &#123;...&#125;</td>
                  <td className="p-2.5 text-slate-700">Never place a semicolon directly after for(...) or while(...) headers</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Off-By-One Boundary</td>
                  <td className="p-2.5 text-rose-700 font-medium">Loop runs one time too many or too few (e.g. &lt;= vs &lt;)</td>
                  <td className="p-2.5 font-mono text-rose-700">for (int i=0; i &lt;= n; i++) (runs n+1 times)</td>
                  <td className="p-2.5 text-slate-700">Use <code className="font-mono text-emerald-700">i = 0; i &lt; n</code> for zero-indexed runs of size n</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Nested Loop Complexity</td>
                  <td className="p-2.5 text-slate-700">Outer loop runs N times; inner loop runs M times per outer iteration</td>
                  <td className="p-2.5 font-mono text-slate-600">Total iterations = N &times; M</td>
                  <td className="p-2.5 text-indigo-700 font-medium">Ensure inner loop variable resets on every outer iteration (j = 0)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODULE 07: METHODS CHEAT SHEETS                      */}
      {/* ---------------------------------------------------- */}

      {/* Module 07: Method Anatomy & Scope */}
      {(slug === 'why-methods' || slug === 'method-anatomy' || slug === 'parameters-and-arguments' || slug === 'return-values-and-void' || slug === 'calling-methods-and-scope' || slug === 'local-variables-and-method-memory' || slug === 'method-basics' || slug === 'anatomy-of-a-method') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <FileCode className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Java Method Anatomy &amp; Call Stack Reference
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Component</th>
                  <th className="p-2.5">Example Token</th>
                  <th className="p-2.5">Purpose &amp; Compiler Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Access Modifier</td>
                  <td className="p-2.5 font-mono text-indigo-700">public</td>
                  <td className="p-2.5 text-slate-700">Determines visibility. public allows invocation from any class in any package.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">static Modifier</td>
                  <td className="p-2.5 font-mono text-indigo-700">static</td>
                  <td className="p-2.5 text-slate-700">Binds method to the class itself. Invoked directly without creating an object instance.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Return Type</td>
                  <td className="p-2.5 font-mono text-emerald-700">double / void</td>
                  <td className="p-2.5 text-slate-700">Declared data type returned to caller. Use void if method returns no data.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Method Signature</td>
                  <td className="p-2.5 font-mono text-brand-700">calcArea(double, int)</td>
                  <td className="p-2.5 text-slate-700">Strictly: Method Name + Parameter Types (in order). Return type is NOT part of the signature!</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Stack Frame (LIFO)</td>
                  <td className="p-2.5 font-mono text-slate-700">Call Stack Frame</td>
                  <td className="p-2.5 text-slate-700">Pushed onto Call Stack when method is called; popped and destroyed immediately upon return.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Module 07: Overloading, Pass-by-Value & Recursion */}
      {(slug === 'static-methods' || slug === 'method-overloading' || slug === 'pass-by-value-in-java' || slug === 'recursion-basics' || slug === 'method-bugs-and-output-prediction' || slug === 'methods-practice-and-interview-challenge' || slug === 'overloading' || slug === 'pass-by-value' || slug === 'recursion') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Advanced Method Mechanics: Overloading, Pass-by-Value &amp; Recursion
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Concept</th>
                  <th className="p-2.5">Key Java Rule</th>
                  <th className="p-2.5">Classic Interview Trap</th>
                  <th className="p-2.5 rounded-r-lg">Golden Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Method Overloading</td>
                  <td className="p-2.5 text-slate-700">Same name, different parameter lists (count, types, or order)</td>
                  <td className="p-2.5 text-rose-700 font-medium">Changing ONLY the return type is a compile error!</td>
                  <td className="p-2.5 text-emerald-700 font-medium">Resolved at compile time (Static Binding / Compile-Time Polymorphism)</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Pass-by-Value</td>
                  <td className="p-2.5 text-slate-700">Java ALWAYS copies the bits of values into parameter slots</td>
                  <td className="p-2.5 text-rose-700 font-medium">Primitive swap(int a, int b) fails to alter caller variables</td>
                  <td className="p-2.5 text-emerald-700 font-medium">Return the updated value from method and reassign in caller: x = update(x)</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Recursion</td>
                  <td className="p-2.5 text-slate-700">Method solving problem by calling a smaller instance of itself</td>
                  <td className="p-2.5 text-rose-700 font-medium">Missing base case causes StackOverflowError</td>
                  <td className="p-2.5 text-emerald-700 font-medium">Every recursive call MUST strictly progress closer toward the base case</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Parameter Shadowing</td>
                  <td className="p-2.5 text-slate-700">Local parameter hides class field of the same name</td>
                  <td className="p-2.5 text-rose-700 font-medium">count = count assigns parameter to itself; class field untouched</td>
                  <td className="p-2.5 text-indigo-700 font-medium">Qualify with ClassName (ClassName.count) or use this for instance fields</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}


      {/* Module 08: Array Fundamentals & Syntax */}
      {(slug === 'what-is-an-array' || slug === 'creating-and-initializing-arrays' || slug === 'array-indexing-and-access' || slug === 'traversing-arrays' || slug === 'indexes-and-accessing-elements') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Java Array Core Architecture &amp; Index Rules
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Feature</th>
                  <th className="p-2.5">Java Syntax</th>
                  <th className="p-2.5">Memory Model / Behavior</th>
                  <th className="p-2.5 rounded-r-lg">Rule / Interview Alert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Allocation</td>
                  <td className="p-2.5 font-mono text-slate-800">int[] arr = new int[5];</td>
                  <td className="p-2.5 text-slate-600">Continuous Heap memory block. Stack stores 8-byte reference.</td>
                  <td className="p-2.5 text-slate-700">Size is fixed at creation time; cannot grow or shrink.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Default Values</td>
                  <td className="p-2.5 font-mono text-slate-800">0, 0.0, false, null</td>
                  <td className="p-2.5 text-slate-600">Primitive numbers default to 0; booleans false; objects null.</td>
                  <td className="p-2.5 text-slate-700">Arrays are objects, auto-cleared in heap with type defaults.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Valid Indices</td>
                  <td className="p-2.5 font-mono text-slate-800">0 to arr.length - 1</td>
                  <td className="p-2.5 text-slate-600">Base-pointer arithmetic: address = base + index * elemSize.</td>
                  <td className="p-2.5 text-rose-700 font-medium">Accessing arr[arr.length] throws ArrayIndexOutOfBoundsException!</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Property vs Method</td>
                  <td className="p-2.5 font-mono text-indigo-700">arr.length</td>
                  <td className="p-2.5 text-slate-600">Final immutable public field of array object.</td>
                  <td className="p-2.5 text-amber-700 font-medium">Do NOT call arr.length() &mdash; that is only for Strings!</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Module 08: Loops, Utility Class, 2D Arrays & Common Pitfalls */}
      {(slug === 'enhanced-for-loop' || slug === 'common-array-operations' || slug === 'updating-copying-and-comparing-arrays' || slug === 'the-arrays-utility-class' || slug === 'multidimensional-arrays' || slug === 'array-bugs-and-output-prediction' || slug === 'array-practice' || slug === 'arrays-final-challenge' || slug === 'for-each-loop' || slug === '2d-arrays') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Array Operations, Arrays Utilities &amp; 2D Mechanics
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Operation / Class</th>
                  <th className="p-2.5">Syntax Example</th>
                  <th className="p-2.5">Key Characteristic</th>
                  <th className="p-2.5 rounded-r-lg">Critical Trap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Enhanced for</td>
                  <td className="p-2.5 font-mono text-slate-800">for (int n : arr)</td>
                  <td className="p-2.5 text-slate-600">Read-only iteration from index 0 to end; no index tracking.</td>
                  <td className="p-2.5 text-rose-700 font-medium">Assigning n = 99 only updates loop variable; arr is unchanged!</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Deep vs Shallow Copy</td>
                  <td className="p-2.5 font-mono text-slate-800">int[] b = Arrays.copyOf(a, a.length);</td>
                  <td className="p-2.5 text-slate-600">Creates a fresh Heap array copying elements.</td>
                  <td className="p-2.5 text-rose-700 font-medium">int[] b = a; only copies reference address &mdash; both mutate together!</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Printing Arrays</td>
                  <td className="p-2.5 font-mono text-indigo-700">Arrays.toString(arr)</td>
                  <td className="p-2.5 text-slate-600">Returns bracketed comma-separated string: [10, 20, 30].</td>
                  <td className="p-2.5 text-amber-700 font-medium">System.out.println(arr) prints cryptic type-hashcode ([I@15db9742).</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Binary Search</td>
                  <td className="p-2.5 font-mono text-slate-800">Arrays.binarySearch(arr, key)</td>
                  <td className="p-2.5 text-slate-600">O(log N) lookup; returns index or negative insertion point.</td>
                  <td className="p-2.5 text-rose-700 font-medium">Array MUST be sorted with Arrays.sort(arr) first or output is undefined!</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">2D Matrix Access</td>
                  <td className="p-2.5 font-mono text-slate-800">matrix[row][col]</td>
                  <td className="p-2.5 text-slate-600">matrix.length = row count; matrix[r].length = col count.</td>
                  <td className="p-2.5 text-slate-700">Java supports ragged/jagged arrays where rows have variable lengths.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}


      {/* Module 09: String Fundamentals, Immutability & == vs .equals() */}
      {(slug === 'what-is-a-string' || slug === 'string-creation-and-literals' || slug === 'string-immutability' || slug === 'string-pool-and-memory' || slug === 'string-equals-vs-double-equals' || slug === 'string-memory-and-immutability' || slug === 'string-comparison') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Java String Core Architecture, Pool &amp; Equality Rules
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Concept</th>
                  <th className="p-2.5">Java Syntax</th>
                  <th className="p-2.5">Memory Behavior</th>
                  <th className="p-2.5 rounded-r-lg">Golden Rule / Trap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">String Literal</td>
                  <td className="p-2.5 font-mono text-slate-800">String s = &quot;Java&quot;;</td>
                  <td className="p-2.5 text-slate-600">Reuses shared instance from String Constant Pool on Heap.</td>
                  <td className="p-2.5 text-emerald-700 font-medium">Always preferred over new String() to save memory.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">The new Keyword</td>
                  <td className="p-2.5 font-mono text-slate-800">new String(&quot;Java&quot;)</td>
                  <td className="p-2.5 text-slate-600">Forces allocation of a separate object in regular Heap memory.</td>
                  <td className="p-2.5 text-rose-700 font-medium">Bypasses pool sharing &mdash; creates redundant memory overhead!</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Immutability</td>
                  <td className="p-2.5 font-mono text-slate-800">s = s.toUpperCase();</td>
                  <td className="p-2.5 text-slate-600">Internal characters cannot change; methods return new String.</td>
                  <td className="p-2.5 text-amber-700 font-medium">Calling s.toUpperCase() without reassigning discards the result!</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">== vs .equals()</td>
                  <td className="p-2.5 font-mono text-slate-800">a == b vs a.equals(b)</td>
                  <td className="p-2.5 text-slate-600">== compares Heap address; .equals() compares character sequence.</td>
                  <td className="p-2.5 text-rose-700 font-medium">Never use == on user input or scanner strings!</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Yoda Condition</td>
                  <td className="p-2.5 font-mono text-indigo-700">&quot;TARGET&quot;.equals(var)</td>
                  <td className="p-2.5 text-slate-600">Invokes .equals() on guaranteed non-null literal constant.</td>
                  <td className="p-2.5 text-emerald-700 font-medium">Defends against NullPointerException if var is null.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Module 09: String Methods, Transformations & Splitting */}
      {(slug === 'essential-string-methods' || slug === 'string-transformation-methods' || slug === 'splitting-joining-and-parsing' || slug === 'finding-and-checking-text' || slug === 'extracting-and-replacing-text' || slug === 'splitting-and-cleaning-strings') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Essential String Inspection, Transformation &amp; Parsing Methods
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Method</th>
                  <th className="p-2.5">Example Call</th>
                  <th className="p-2.5">Behavior &amp; Return</th>
                  <th className="p-2.5 rounded-r-lg">Key Note / Boundary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">substring</td>
                  <td className="p-2.5 font-mono text-slate-800">s.substring(0, 4)</td>
                  <td className="p-2.5 text-slate-600">Extracts slice in range [begin, end). Returns String.</td>
                  <td className="p-2.5 text-slate-700">Length = end - begin. begin is inclusive, end is exclusive.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">indexOf</td>
                  <td className="p-2.5 font-mono text-slate-800">s.indexOf(&apos;@&apos;)</td>
                  <td className="p-2.5 text-slate-600">Scans left-to-right. Returns 0-based index or -1 if absent.</td>
                  <td className="p-2.5 text-amber-700 font-medium">Index 0 means found at first char; only -1 means not found!</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">trim vs strip</td>
                  <td className="p-2.5 font-mono text-slate-800">s.strip()</td>
                  <td className="p-2.5 text-slate-600">strip() (Java 11+) removes all Unicode whitespace.</td>
                  <td className="p-2.5 text-emerald-700 font-medium">strip() is preferred over legacy trim() which only handles ASCII &lt;= 32.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">replace vs replaceAll</td>
                  <td className="p-2.5 font-mono text-slate-800">s.replace(&quot;.&quot;, &quot;:&quot;)</td>
                  <td className="p-2.5 text-slate-600">replace() matches literal strings; replaceAll() compiles regex.</td>
                  <td className="p-2.5 text-rose-700 font-medium">replaceAll(&quot;.&quot;, &quot;:&quot;) matches EVERY char! Always use replace() for literals.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">split &amp; join</td>
                  <td className="p-2.5 font-mono text-slate-800">s.split(&quot;\\.&quot;) / String.join(&quot;, &quot;, arr)</td>
                  <td className="p-2.5 text-slate-600">split() divides string to String[]; String.join() combines without trailing commas.</td>
                  <td className="p-2.5 text-rose-700 font-medium">Must escape regex delimiters like dot (\\.) and pipe (\\|).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Module 09: String vs StringBuilder vs StringBuffer & Performance */}
      {(slug === 'string-concatenation' || slug === 'stringbuilder' || slug === 'stringbuffer-and-stringbuilder' || slug === 'string-performance-and-common-bugs' || slug === 'string-practice' || slug === 'strings-final-challenge' || slug === 'stringbuilder-and-stringbuffer' || slug === 'string-problem-solving') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              String vs StringBuilder vs StringBuffer Performance Matrix
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Class / Pattern</th>
                  <th className="p-2.5">Mutability</th>
                  <th className="p-2.5">Thread Safety</th>
                  <th className="p-2.5">Performance</th>
                  <th className="p-2.5 rounded-r-lg">Standard Usage Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900 font-mono">String</td>
                  <td className="p-2.5 text-rose-700 font-medium">Immutable</td>
                  <td className="p-2.5 text-emerald-700 font-medium">Yes (Inherently)</td>
                  <td className="p-2.5 text-slate-600">Slow for repeated concatenation</td>
                  <td className="p-2.5 text-slate-700">Constants, DTOs, HashMap keys, API contracts.</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-brand-50/30">
                  <td className="p-2.5 font-bold text-brand-700 font-mono">StringBuilder</td>
                  <td className="p-2.5 text-emerald-700 font-medium">Mutable</td>
                  <td className="p-2.5 text-rose-700 font-medium">No (Unsynchronized)</td>
                  <td className="p-2.5 text-emerald-700 font-bold">Fastest</td>
                  <td className="p-2.5 text-slate-700">Default choice for local text assembly &amp; loops.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900 font-mono">StringBuffer</td>
                  <td className="p-2.5 text-emerald-700 font-medium">Mutable</td>
                  <td className="p-2.5 text-emerald-700 font-medium">Yes (Synchronized)</td>
                  <td className="p-2.5 text-slate-600">Moderate (Lock overhead)</td>
                  <td className="p-2.5 text-slate-700">Shared multi-threaded text mutation buffers.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Loop Concatenation (+)</td>
                  <td className="p-2.5 text-slate-600">Creates N objects</td>
                  <td className="p-2.5 text-slate-600">N/A</td>
                  <td className="p-2.5 text-rose-700 font-bold">O(N&sup2;) Quadratic Disaster</td>
                  <td className="p-2.5 text-rose-700 font-medium">Anti-pattern in loops! Always replace with StringBuilder.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Compact Strings</td>
                  <td className="p-2.5 text-slate-600">byte[] value + coder</td>
                  <td className="p-2.5 text-slate-600">N/A</td>
                  <td className="p-2.5 text-emerald-700 font-medium">Halves memory usage</td>
                  <td className="p-2.5 text-slate-700">Automatic in Java 9+ for Latin-1 (ASCII) text.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}


      {/* ---------------------------------------------------- */}
      {/* MODULE 10: EXCEPTION BASICS CHEAT SHEETS             */}
      {/* ---------------------------------------------------- */}

      {/* Module 10: Exception Hierarchy & Classification Matrix */}
      {(slug === 'what-are-exceptions' || slug === 'errors-vs-exceptions' || slug === 'exception-hierarchy' || slug === 'checked-vs-unchecked-exceptions' || slug === 'exceptions-practice-and-interview-challenge') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-rose-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Java Throwable Hierarchy &amp; Classification Matrix
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Branch / Class</th>
                  <th className="p-2.5">Category</th>
                  <th className="p-2.5">Compiler Checked?</th>
                  <th className="p-2.5">Typical Root Cause</th>
                  <th className="p-2.5 rounded-r-lg">Standard Action / Policy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold font-mono text-rose-700">java.lang.Error</td>
                  <td className="p-2.5 font-medium text-slate-800">JVM System Fault</td>
                  <td className="p-2.5 font-semibold text-slate-500">No (Unchecked)</td>
                  <td className="p-2.5 text-slate-600">OutOfMemoryError, StackOverflowError</td>
                  <td className="p-2.5 text-rose-700 font-medium">Do NOT catch! Allow JVM to terminate gracefully.</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-brand-50/30">
                  <td className="p-2.5 font-bold font-mono text-brand-700">java.lang.Exception</td>
                  <td className="p-2.5 font-medium text-slate-800">Checked Exception</td>
                  <td className="p-2.5 font-semibold text-emerald-700">Yes (Mandatory)</td>
                  <td className="p-2.5 text-slate-600">IOException, SQLException, FileNotFoundException</td>
                  <td className="p-2.5 text-brand-700 font-medium">Must handle with try-catch or declare with throws.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold font-mono text-amber-700">RuntimeException</td>
                  <td className="p-2.5 font-medium text-slate-800">Unchecked Exception</td>
                  <td className="p-2.5 font-semibold text-slate-500">No (Optional)</td>
                  <td className="p-2.5 text-slate-600">NullPointerException, ArithmeticException, IndexOutOfBounds</td>
                  <td className="p-2.5 text-amber-700 font-medium">Fix with defensive programming (null checks, range validation).</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold font-mono text-purple-700">Custom Exception</td>
                  <td className="p-2.5 font-medium text-slate-800">Domain Business Failure</td>
                  <td className="p-2.5 font-semibold text-slate-700">Depends on parent</td>
                  <td className="p-2.5 text-slate-600">InsufficientFundsException, UserNotFoundException</td>
                  <td className="p-2.5 text-purple-700 font-medium">Extend Exception for checked; extend RuntimeException for unchecked.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Module 10: Exception Flow & Handling Mechanics */}
      {(slug === 'try-catch-finally' || slug === 'multiple-catch-and-exception-flow' || slug === 'throw-and-throws' || slug === 'custom-exceptions-and-debugging' || slug === 'exceptions-practice-and-interview-challenge') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Java Exception Control Flow &amp; Handling Rules
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Concept / Mechanism</th>
                  <th className="p-2.5">Syntax / Signature</th>
                  <th className="p-2.5">Execution Rule</th>
                  <th className="p-2.5 rounded-r-lg">Key Interview Pitfall</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">try-catch-finally</td>
                  <td className="p-2.5 font-mono text-slate-800">try &#123; ... &#125; catch (E e) &#123; ... &#125; finally &#123; ... &#125;</td>
                  <td className="p-2.5 text-slate-600">finally ALWAYS executes (unless System.exit(0) is called).</td>
                  <td className="p-2.5 text-rose-700 font-medium">Returning in finally overrides any return value or thrown exception from try/catch!</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Multiple Catch Blocks</td>
                  <td className="p-2.5 font-mono text-slate-800">catch (FileNotFound e) / catch (IOException e)</td>
                  <td className="p-2.5 text-slate-600">Must order from most specific subclass to broadest superclass.</td>
                  <td className="p-2.5 text-rose-700 font-medium">Putting catch (Exception e) before subclass produces a compile error: unreachable code.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Multi-Catch (Java 7+)</td>
                  <td className="p-2.5 font-mono text-slate-800">catch (IOException | SQLException e)</td>
                  <td className="p-2.5 text-slate-600">Combines unrelated exceptions; variable e is implicitly final.</td>
                  <td className="p-2.5 text-amber-700 font-medium">Cannot combine parent and child in same pipe: catch (IOException | FileNotFoundException e) fails!</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">throw vs throws</td>
                  <td className="p-2.5 font-mono text-slate-800">throw new Ex(); / void f() throws Ex</td>
                  <td className="p-2.5 text-slate-600">throw instantiates and fires an exception; throws declares it on signature.</td>
                  <td className="p-2.5 text-slate-700">Checked exceptions require throws declaration; unchecked exceptions do not.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Exception Chaining</td>
                  <td className="p-2.5 font-mono text-slate-800">throw new DomainEx(&quot;failed&quot;, cause);</td>
                  <td className="p-2.5 text-slate-600">Preserves original low-level exception stack trace inside higher-level domain exception.</td>
                  <td className="p-2.5 text-amber-700 font-medium">Omitting cause loses the original SQL or IO stack trace forever.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Module 10: Common Exceptions & Defensive Patterns */}
      {(slug === 'common-java-exceptions' || slug === 'exceptions-practice-and-interview-challenge') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Standard Java Exceptions Diagnostic &amp; Defensive Coding Guide
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Exception Class</th>
                  <th className="p-2.5">Typical Trigger</th>
                  <th className="p-2.5">Defensive Prevention Pattern</th>
                  <th className="p-2.5 rounded-r-lg">Interview Insight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-rose-700">NullPointerException</td>
                  <td className="p-2.5 font-sans text-slate-700">Calling method on null; unboxing null wrapper (Integer val = null; int x = val;)</td>
                  <td className="p-2.5 font-mono text-emerald-700">&quot;VAL&quot;.equals(str); Objects.requireNonNull(x); Optional</td>
                  <td className="p-2.5 font-sans text-slate-700">Unboxing null wrapper throws NPE at runtime, not compile error!</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-amber-700">ArrayIndexOutOfBounds</td>
                  <td className="p-2.5 font-sans text-slate-700">Index &lt; 0 or Index &gt;= arr.length (often in loop boundary i &lt;= len)</td>
                  <td className="p-2.5 font-mono text-emerald-700">for (int i = 0; i &lt; arr.length; i++) or enhanced for</td>
                  <td className="p-2.5 font-sans text-slate-700">Arrays are 0-indexed; highest valid index is always length - 1.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-indigo-700">NumberFormatException</td>
                  <td className="p-2.5 font-sans text-slate-700">Integer.parseInt(&quot; 42 &quot;), currency symbols, empty strings</td>
                  <td className="p-2.5 font-mono text-emerald-700">Integer.parseInt(input.trim()) wrapped in safe try-catch helper</td>
                  <td className="p-2.5 font-sans text-slate-700">Subclass of IllegalArgumentException. Whitespace must be trimmed!</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-purple-700">ClassCastException</td>
                  <td className="p-2.5 font-sans text-slate-700">Downcasting reference to incompatible type</td>
                  <td className="p-2.5 font-mono text-emerald-700">if (obj instanceof String s) &#123; ... &#125; (Java 16 pattern matching)</td>
                  <td className="p-2.5 font-sans text-slate-700">Pattern matching for instanceof combines type check and cast safely.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODULE 11: PACKAGES & ACCESS CONTROL CHEAT SHEETS    */}
      {/* ---------------------------------------------------- */}

      {/* Module 11: The Definitive Access Control Matrix */}
      {(slug === 'access-modifiers' || slug === 'public-private-and-package-private' || slug === 'protected-and-cross-package-access' || slug === 'packages-practice-and-interview-challenge') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              The Definitive Java 4x5 Access Control Matrix
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Access Context</th>
                  <th className="p-2.5 text-center">public</th>
                  <th className="p-2.5 text-center">protected</th>
                  <th className="p-2.5 text-center">default (package-private)</th>
                  <th className="p-2.5 text-center rounded-r-lg">private</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-center font-bold">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 text-left font-sans text-slate-800">Same Class</td>
                  <td className="p-2.5 text-emerald-600">YES</td>
                  <td className="p-2.5 text-emerald-600">YES</td>
                  <td className="p-2.5 text-emerald-600">YES</td>
                  <td className="p-2.5 text-emerald-600">YES</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 text-left font-sans text-slate-800">Same Package (Non-subclass)</td>
                  <td className="p-2.5 text-emerald-600">YES</td>
                  <td className="p-2.5 text-emerald-600">YES</td>
                  <td className="p-2.5 text-emerald-600">YES</td>
                  <td className="p-2.5 text-rose-600">NO</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 text-left font-sans text-slate-800">Same Package (Subclass)</td>
                  <td className="p-2.5 text-emerald-600">YES</td>
                  <td className="p-2.5 text-emerald-600">YES</td>
                  <td className="p-2.5 text-emerald-600">YES</td>
                  <td className="p-2.5 text-rose-600">NO</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-brand-50/20">
                  <td className="p-2.5 text-left font-sans text-brand-900">Different Package (Subclass)</td>
                  <td className="p-2.5 text-emerald-600">YES</td>
                  <td className="p-2.5 text-emerald-600">YES (via inheritance only)</td>
                  <td className="p-2.5 text-rose-600">NO</td>
                  <td className="p-2.5 text-rose-600">NO</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 text-left font-sans text-slate-800">Different Package (World)</td>
                  <td className="p-2.5 text-emerald-600">YES</td>
                  <td className="p-2.5 text-rose-600">NO</td>
                  <td className="p-2.5 text-rose-600">NO</td>
                  <td className="p-2.5 text-rose-600">NO</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
            <p><strong>Note 1:</strong> Top-level classes can ONLY be <code>public</code> or package-private (no modifier). Marking a top-level class <code>private</code> or <code>protected</code> triggers a compilation error.</p>
            <p><strong>Note 2:</strong> An overriding method CANNOT reduce visibility (e.g. public method cannot be overridden as protected or private).</p>
          </div>
        </Card>
      )}

      {/* Module 11: Package Commands & Architecture Cheat Sheet */}
      {(slug === 'why-packages' || slug === 'creating-and-using-packages' || slug === 'import-and-fully-qualified-names' || slug === 'naming-and-project-organization' || slug === 'packages-practice-and-interview-challenge') && (
        <Card className="p-5 sm:p-6 border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Terminal className="w-4 h-4 text-indigo-600" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Java Package Architecture, CLI Compilation &amp; Import Rules
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 rounded-l-lg">Topic / Command</th>
                  <th className="p-2.5">CLI / Syntax Example</th>
                  <th className="p-2.5">Operating Mechanics</th>
                  <th className="p-2.5 rounded-r-lg">Crucial Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Compile with -d</td>
                  <td className="p-2.5 font-mono text-indigo-700">javac -d bin src/com/app/Main.java</td>
                  <td className="p-2.5 text-slate-600">Creates directory folders matching package declaration automatically.</td>
                  <td className="p-2.5 text-amber-700 font-medium">Without -d, .class is placed in current directory without package folders.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Run with Classpath</td>
                  <td className="p-2.5 font-mono text-indigo-700">java -cp bin com.app.Main</td>
                  <td className="p-2.5 text-slate-600">Launches class using its Fully Qualified Name (FQN) from classpath root.</td>
                  <td className="p-2.5 text-rose-700 font-medium">Do NOT append .class (java com.app.Main.class fails!).</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Wildcard Imports</td>
                  <td className="p-2.5 font-mono text-slate-800">import java.util.*;</td>
                  <td className="p-2.5 text-slate-600">Imports classes in java.util on demand. ZERO runtime performance overhead.</td>
                  <td className="p-2.5 text-rose-700 font-medium">Wildcards are NOT recursive! Does NOT import java.util.concurrent.*.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Disambiguating Collisions</td>
                  <td className="p-2.5 font-mono text-slate-800">java.util.Date / java.sql.Date</td>
                  <td className="p-2.5 text-slate-600">Use fully qualified class name at declaration site to resolve ambiguity.</td>
                  <td className="p-2.5 text-slate-700">Single-type import takes precedence over wildcard imports.</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-2.5 font-bold text-slate-900">Package-by-Feature</td>
                  <td className="p-2.5 font-mono text-slate-800">com.store.order / com.store.billing</td>
                  <td className="p-2.5 text-slate-600">Groups classes by domain capability rather than technical layer.</td>
                  <td className="p-2.5 text-emerald-700 font-medium">Allows DAOs and internal helpers to remain package-private (hidden).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

    </div>
  );
};

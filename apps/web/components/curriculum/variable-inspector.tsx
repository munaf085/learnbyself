"use client";

import React, { useState } from 'react';
import { Card, Badge } from '@learnbyself/ui';
import { Cpu, Copy, Check } from 'lucide-react';

interface PrimitiveInfo {
  name: string;
  category: 'Integer' | 'Floating Point' | 'Character' | 'Boolean';
  bits: number;
  bytes: number;
  minStr: string;
  maxStr: string;
  defaultVal: string;
  exampleLiteral: string;
  sampleVar: string;
  description: string;
  analogy: string;
}

const PRIMITIVES: Record<string, PrimitiveInfo> = {
  byte: {
    name: 'byte',
    category: 'Integer',
    bits: 8,
    bytes: 1,
    minStr: '-128',
    maxStr: '127',
    defaultVal: '0',
    exampleLiteral: '100',
    sampleVar: 'byte studentAge = 20;',
    description: 'Ultra-compact 8-bit integer. Ideal for saving memory in massive data arrays or network byte streams.',
    analogy: 'A small pocket diary: holds small counts, but fits anywhere.'
  },
  short: {
    name: 'short',
    category: 'Integer',
    bits: 16,
    bytes: 2,
    minStr: '-32,768',
    maxStr: '32,767',
    defaultVal: '0',
    exampleLiteral: '1500',
    sampleVar: 'short collegeFloorCapacity = 350;',
    description: '16-bit integer twice the capacity of byte. Rarely used in modern code except for audio/graphics buffers.',
    analogy: 'A classroom register: enough for hundreds or thousands of students.'
  },
  int: {
    name: 'int',
    category: 'Integer',
    bits: 32,
    bytes: 4,
    minStr: '-2,147,483,648',
    maxStr: '2,147,483,647',
    defaultVal: '0',
    exampleLiteral: '45000',
    sampleVar: 'int annualTuition = 125000;',
    description: 'The standard workhorse integer in Java. Modern 64-bit CPUs execute 32-bit int arithmetic at peak hardware speed.',
    analogy: 'The universal notebook: fits virtually every whole number you encounter in daily life (up to 2 billion).'
  },
  long: {
    name: 'long',
    category: 'Integer',
    bits: 64,
    bytes: 8,
    minStr: '-9,223,372,036,854,775,808',
    maxStr: '9,223,372,036,854,775,807',
    defaultVal: '0L',
    exampleLiteral: '9876543210L',
    sampleVar: 'long aadhaarNumber = 567812349012L;',
    description: 'Massive 64-bit integer for numbers exceeding 2 billion. Literals MUST end with an uppercase L suffix.',
    analogy: 'A national archive: holds numbers as immense as national population or bank transactions.'
  },
  float: {
    name: 'float',
    category: 'Floating Point',
    bits: 32,
    bytes: 4,
    minStr: '~1.4E-45',
    maxStr: '~3.4E+38 (6-7 digits precision)',
    defaultVal: '0.0f',
    exampleLiteral: '8.75f',
    sampleVar: 'float semesterGpa = 8.75f;',
    description: 'Single-precision 32-bit decimal. Literals require an f suffix. Great for 3D graphics and mobile gaming.',
    analogy: 'A quick tape measure: great for graphics and games where 6 digits of precision are plenty.'
  },
  double: {
    name: 'double',
    category: 'Floating Point',
    bits: 64,
    bytes: 8,
    minStr: '~4.9E-324',
    maxStr: '~1.8E+308 (15-16 digits precision)',
    defaultVal: '0.0d',
    exampleLiteral: '99.85',
    sampleVar: 'double latitude = 28.613939;',
    description: 'Double-precision 64-bit decimal. The default choice for all math formulas, science, and engineering calculations.',
    analogy: 'A high-precision laser caliper: exact enough for aerospace telemetry and GPS coordinates.'
  },
  char: {
    name: 'char',
    category: 'Character',
    bits: 16,
    bytes: 2,
    minStr: "0 ('\\u0000')",
    maxStr: "65,535 ('\\uffff')",
    defaultVal: "'\\u0000'",
    exampleLiteral: "'A'",
    sampleVar: "char grade = 'A';",
    description: '16-bit Unicode UTF-16 character. Enclosed in single quotes. Supports all world languages and symbols.',
    analogy: 'A stamp of any alphabet: from Hindi अ to English A to Rupee symbol ₹.'
  },
  boolean: {
    name: 'boolean',
    category: 'Boolean',
    bits: 1,
    bytes: 1,
    minStr: 'false',
    maxStr: 'true',
    defaultVal: 'false',
    exampleLiteral: 'true',
    sampleVar: 'boolean isFeePaid = true;',
    description: 'Pure binary true or false condition. Cannot be assigned 0 or 1. Used in loops and if statements.',
    analogy: 'A light switch: strictly ON or OFF, no halfway state.'
  }
};

export const VariableInspector: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('int');
  const [copied, setCopied] = useState(false);

  const info = PRIMITIVES[selectedType] || PRIMITIVES['int']!;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-4 sm:p-5 rounded-2xl bg-white border-slate-200/90 shadow-subtle space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-brand-600" />
          <h3 className="font-bold text-xs sm:text-sm text-slate-900">
            Interactive Java Memory & Variable Inspector
          </h3>
        </div>
        <Badge variant="blue" size="sm">Memory Lab</Badge>
      </div>

      {/* Type Selector Pills */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {Object.keys(PRIMITIVES).map(typeKey => {
          const isSelected = selectedType === typeKey;
          return (
            <button
              key={typeKey}
              onClick={() => setSelectedType(typeKey)}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-xs scale-102'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {typeKey}
            </button>
          );
        })}
      </div>

      {/* Selected Type Specs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-500">Category</span>
          <p className="font-bold text-xs text-slate-900 mt-0.5">{info.category}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-500">Memory Footprint</span>
          <p className="font-bold text-xs text-indigo-700 mt-0.5">
            {info.bits} bits ({info.bytes} {info.bytes === 1 ? 'byte' : 'bytes'})
          </p>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-500">Default Value</span>
          <p className="font-mono font-bold text-xs text-amber-700 mt-0.5">{info.defaultVal}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-500">Literal Example</span>
          <p className="font-mono font-bold text-xs text-emerald-700 mt-0.5">{info.exampleLiteral}</p>
        </div>
      </div>

      {/* Memory Bit Visualization */}
      <div className="p-3 sm:p-4 rounded-xl bg-slate-900 text-white space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono">RAM Hardware Allocation:</span>
          <span className="text-indigo-400 font-mono font-bold">{info.bits} Bits Allocated</span>
        </div>
        <div className="grid grid-cols-8 sm:grid-cols-16 gap-1 pt-1">
          {Array.from({ length: Math.min(info.bits, 32) }).map((_, i) => (
            <div
              key={i}
              className="h-5 sm:h-6 rounded bg-slate-800 border border-slate-700/80 flex items-center justify-center text-[10px] font-mono text-slate-300 font-bold"
            >
              {i === 0 ? '±' : '0'}
            </div>
          ))}
          {info.bits === 64 && (
            <div className="col-span-8 sm:col-span-16 text-center text-[10px] text-slate-400 pt-1 italic">
              + 32 more bits (Total 64 bits across two 32-bit CPU words)
            </div>
          )}
        </div>
      </div>

      {/* Description & Analogy */}
      <div className="space-y-1.5 text-xs text-slate-700">
        <p className="leading-relaxed">{info.description}</p>
        <p className="text-indigo-900 font-medium bg-indigo-50/60 p-2 rounded-lg border border-indigo-100">
          <strong className="text-indigo-700">Mental Picture:</strong> {info.analogy}
        </p>
      </div>

      {/* Code Snippet */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-200">
        <span>{info.sampleVar}</span>
        <button
          onClick={() => handleCopyCode(info.sampleVar)}
          className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </Card>
  );
};

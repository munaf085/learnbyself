"use client";

import React from 'react';
import { Card, Badge, Alert } from '@learnbyself/ui';
import {
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  Code2,
  Terminal,
  Server,
  Zap,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  Info
} from 'lucide-react';

interface EditorialArticleProps {
  title: string;
  content: string;
}

// Helper to format inline markdown (bold **text**, inline code `code`, italic *text*)
export const formatInlineText = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  // Regex to split by `code` and **bold**
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={match.index}
          className="font-mono text-xs font-semibold bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded border border-slate-200/80"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-bold text-slate-900">
          {token.slice(2, -2)}
        </strong>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};

export const EditorialArticle: React.FC<EditorialArticleProps> = ({ title, content }) => {
  // Split raw markdown content into sections by ### or ####
  const lines = content.split('\n');
  const sections: { title?: string; level: number; items: string[] }[] = [];
  let currentSection: { title?: string; level: number; items: string[] } = { level: 2, items: [] };
  let inFencedCode = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      inFencedCode = !inFencedCode;
      currentSection.items.push(line);
      continue;
    }

    if (inFencedCode) {
      // Preserve exact indentation and blank lines inside code blocks
      currentSection.items.push(line);
      continue;
    }

    if (trimmed.startsWith('### ')) {
      if (currentSection.items.length > 0 || currentSection.title) {
        sections.push(currentSection);
      }
      currentSection = { title: trimmed.replace(/^###\s+/, ''), level: 3, items: [] };
    } else if (trimmed.startsWith('#### ')) {
      if (currentSection.items.length > 0 || currentSection.title) {
        sections.push(currentSection);
      }
      currentSection = { title: trimmed.replace(/^####\s+/, ''), level: 4, items: [] };
    } else if (trimmed.length > 0) {
      currentSection.items.push(trimmed);
    }
  }
  if (currentSection.items.length > 0 || currentSection.title) {
    sections.push(currentSection);
  }

  // If first section has no title and a title prop was provided, use it
  const firstSection = sections[0];
  if (firstSection && !firstSection.title && title) {
    firstSection.title = title;
  }

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Article Content Card */}
      <div className="p-5 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-subtle space-y-6">
        {/* Render Formatted Sections */}
        <div className="space-y-6">
          {sections.map((sec, secIdx) => {
            const steps: { num: string; title: string; desc: string }[] = [];
            const bullets: { title: string; desc: string }[] = [];
            const paragraphs: string[] = [];
            const tables: { headers: string[]; rows: string[][] }[] = [];
            const callouts: { type: 'note' | 'warning' | 'important'; title: string; text: string }[] = [];
            
            let inCodeBlock = false;
            let codeLines: string[] = [];
            const codeBlocks: string[] = [];
            
            let currentTableLines: string[] = [];
            let inCallout = false;
            let calloutType: 'note' | 'warning' | 'important' = 'note';
            let calloutLines: string[] = [];

            const flushTable = () => {
              const firstLine = currentTableLines[0];
              if (currentTableLines.length >= 2 && firstLine) {
                const parseRow = (row: string) =>
                  row.split('|').slice(1, -1).map(c => c.trim());
                const headers = parseRow(firstLine);
                // Skip separator row (index 1)
                const rows = currentTableLines.slice(2).map(parseRow);
                tables.push({ headers, rows });
              }
              currentTableLines = [];
            };

            const flushCallout = () => {
              if (calloutLines.length > 0) {
                const fullText = calloutLines.join(' ');
                callouts.push({
                  type: calloutType,
                  title: calloutType === 'warning' ? 'Important Warning' : calloutType === 'important' ? 'Key Principle' : 'Note',
                  text: fullText
                });
              }
              calloutLines = [];
              inCallout = false;
            };

            for (const item of sec.items) {
              if (item.startsWith('```')) {
                flushTable();
                flushCallout();
                if (inCodeBlock) {
                  inCodeBlock = false;
                  codeBlocks.push(codeLines.join('\n'));
                  codeLines = [];
                } else {
                  inCodeBlock = true;
                }
                continue;
              }
              if (inCodeBlock) {
                codeLines.push(item);
                continue;
              }

              // Check for Markdown table row
              if (item.startsWith('|') && item.endsWith('|')) {
                flushCallout();
                currentTableLines.push(item);
                continue;
              } else if (currentTableLines.length > 0) {
                flushTable();
              }

              // Check for Callout (> [!WARNING], > [!NOTE], > [!IMPORTANT], > [!CAUTION])
              const calloutHeaderMatch = item.match(/^>\s+\[!(NOTE|WARNING|IMPORTANT|CAUTION)\]/i);
              if (calloutHeaderMatch && calloutHeaderMatch[1]) {
                flushCallout();
                inCallout = true;
                const kind = calloutHeaderMatch[1].toUpperCase();
                calloutType = (kind === 'WARNING' || kind === 'CAUTION') ? 'warning' : kind === 'IMPORTANT' ? 'important' : 'note';
                continue;
              }
              if (inCallout && item.startsWith('>')) {
                calloutLines.push(item.replace(/^>\s*/, ''));
                continue;
              } else if (inCallout) {
                flushCallout();
              }

              // Check for Step: 1. **Step Name**: Description
              const stepMatch = item.match(/^(\d+)\.\s+\*\*([^*]+)\*\*:\s*(.*)$/);
              if (stepMatch && stepMatch[1] && stepMatch[2] && stepMatch[3]) {
                steps.push({ num: stepMatch[1], title: stepMatch[2], desc: stepMatch[3] });
                continue;
              }

              // Check for Bullet: * **Bullet Title**: Description
              const bulletMatch = item.match(/^[*-]\s+\*\*([^*]+)\*\*:\s*(.*)$/);
              if (bulletMatch && bulletMatch[1] && bulletMatch[2]) {
                bullets.push({ title: bulletMatch[1], desc: bulletMatch[2] });
                continue;
              }

              paragraphs.push(item);
            }
            flushTable();
            flushCallout();

            return (
              <div key={secIdx} className="space-y-3 pt-2 first:pt-0">
                {/* Section Header */}
                {sec.title && (
                  <div className="flex items-center space-x-2.5 pb-1">
                    <span className="w-1.5 h-4 rounded-full bg-brand-500" />
                    <h3 className="font-bold text-base sm:text-lg text-slate-900">
                      {sec.title}
                    </h3>
                  </div>
                )}

                {/* Paragraphs */}
                {paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {formatInlineText(para)}
                  </p>
                ))}

                {/* Tables */}
                {tables.map((tbl, tIdx) => (
                  <div key={tIdx} className="overflow-x-auto rounded-xl border border-slate-200/90 shadow-2xs">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-800 uppercase font-bold text-[10px]">
                          {tbl.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-2.5 border-b border-slate-200">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {tbl.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-2.5 text-slate-700">
                                {formatInlineText(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}

                {/* Callout Banners */}
                {callouts.map((co, coIdx) => (
                  <div
                    key={coIdx}
                    className={`p-3.5 sm:p-4 rounded-xl border space-y-1 ${
                      co.type === 'warning'
                        ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                        : co.type === 'important'
                        ? 'bg-purple-50/70 border-purple-200 text-purple-900'
                        : 'bg-indigo-50/70 border-indigo-200 text-indigo-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2 font-bold text-xs">
                      {co.type === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      ) : (
                        <Info className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      )}
                      <span>{co.title}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed pl-6">
                      {formatInlineText(co.text)}
                    </p>
                  </div>
                ))}

                {/* Code Blocks */}
                {codeBlocks.map((code, cIdx) => (
                  <div key={cIdx} className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-subtle my-3">
                    <div className="bg-slate-900 px-3.5 py-2 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <div className="flex items-center space-x-1.5">
                        <Code2 className="w-3.5 h-3.5 text-brand-400" />
                        <span className="font-semibold text-slate-300">Java Code Example</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">Clean Indentation</span>
                    </div>
                    <div className="p-4 overflow-x-auto text-xs font-mono text-slate-100 leading-relaxed">
                      <pre className="font-mono whitespace-pre">{code}</pre>
                    </div>
                  </div>
                ))}

                {/* Visual Step Cards (Step 1, Step 2) */}
                {steps.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {steps.map((st, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/40 space-y-2 hover:border-indigo-200 transition-all shadow-2xs"
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="w-6 h-6 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                            {st.num}
                          </span>
                          <span className="font-bold text-xs sm:text-sm text-slate-900">
                            {st.title}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed pl-8">
                          {formatInlineText(st.desc)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Visual Feature / Concept Cards */}
                {bullets.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    {bullets.map((b, bIdx) => {
                      const isJvm = b.title.toLowerCase().includes('jvm');
                      const isJre = b.title.toLowerCase().includes('jre');
                      const isJdk = b.title.toLowerCase().includes('jdk');

                      const borderClass = isJdk
                        ? 'border-indigo-200 bg-indigo-50/50'
                        : isJre
                        ? 'border-amber-200 bg-amber-50/50'
                        : isJvm
                        ? 'border-emerald-200 bg-emerald-50/50'
                        : 'border-slate-200 bg-slate-50/80';

                      const badgeVariant: 'blue' | 'amber' | 'green' | 'slate' = isJdk ? 'blue' : isJre ? 'amber' : isJvm ? 'green' : 'slate';

                      return (
                        <div
                          key={bIdx}
                          className={`p-4 rounded-xl border space-y-2 transition-all shadow-2xs ${borderClass}`}
                        >
                          <div className="flex items-center justify-between gap-1 border-b border-black/5 pb-2">
                            <span className="font-bold text-xs text-slate-900">
                              {b.title}
                            </span>
                            <Badge variant={badgeVariant as any} size="sm">
                              {isJdk ? 'Dev Kit' : isJre ? 'Runtime' : isJvm ? 'Engine' : 'Core'}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {formatInlineText(b.desc)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

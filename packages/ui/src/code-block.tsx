"use client";

import React, { useState } from 'react';

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'java',
  filename,
  showLineNumbers = false,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className={`rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 shadow-elevated ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center space-x-2">
          <span className="flex space-x-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </span>
          <span className="font-mono text-slate-300 font-medium">
            {filename || `${language.toUpperCase()} Example`}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center space-x-1.5 min-h-[32px]"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <span className="text-emerald-400">✓</span>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body with horizontal scroll containment */}
      <div className="overflow-x-auto p-4 font-mono text-xs sm:text-sm leading-relaxed">
        {showLineNumbers ? (
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40">
                  <td className="pr-4 select-none text-slate-600 text-right w-8 align-top text-xs">
                    {idx + 1}
                  </td>
                  <td className="text-slate-200 whitespace-pre">
                    {line}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <pre className="text-slate-200 whitespace-pre">
            <code>{code.trim()}</code>
          </pre>
        )}
      </div>
    </div>
  );
};

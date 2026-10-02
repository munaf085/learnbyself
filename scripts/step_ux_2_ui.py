# -*- coding: utf-8 -*-
import os

def write_file(path, content):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {path}")

# Button
write_file("packages/ui/src/button.tsx", """import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 select-none';

  const variantStyles = {
    primary: 'bg-brand-600 hover:bg-brand-700 text-white shadow-subtle hover:shadow-elevated border border-brand-700/20',
    secondary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-subtle border border-slate-950/20',
    outline: 'border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 shadow-subtle',
    ghost: 'hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-transparent',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-subtle border border-emerald-700/20'
  }[variant];

  // Mobile-first touch targets: min-height 44px on md/lg for mobile tap targets
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs min-h-[36px]',
    md: 'px-4 py-2.5 text-sm min-h-[44px]',
    lg: 'px-5 py-3 text-base min-h-[48px]'
  }[size];

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center space-x-2">
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
""")

# Card
write_file("packages/ui/src/card.tsx", """import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'highlight' | 'interactive' | 'bordered';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const base = 'rounded-2xl transition-all duration-200';
  const variants = {
    default: 'bg-white border border-slate-200/80 p-5 sm:p-6 shadow-subtle',
    highlight: 'bg-gradient-to-br from-brand-50/60 to-indigo-50/20 border border-brand-200/80 p-5 sm:p-6 shadow-subtle',
    interactive: 'bg-white border border-slate-200 p-5 sm:p-6 shadow-subtle hover:shadow-elevated hover:border-brand-300 cursor-pointer transform hover:-translate-y-0.5',
    bordered: 'bg-slate-50/50 border border-slate-200 p-5 sm:p-6'
  }[variant];

  return (
    <div className={`${base} ${variants} ${className}`} {...props}>
      {children}
    </div>
  );
};
""")

# Badge
write_file("packages/ui/src/badge.tsx", """import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'green' | 'amber' | 'purple' | 'slate';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  size = 'md',
  className = ''
}) => {
  const styles = {
    blue: 'bg-indigo-50 text-brand-700 border-brand-200/80',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/80',
    purple: 'bg-purple-50 text-purple-700 border-purple-200/80',
    slate: 'bg-slate-100 text-slate-700 border-slate-200'
  }[variant];

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs'
  }[size];

  return (
    <span className={`inline-flex items-center font-medium rounded-lg border ${styles} ${sizeStyles} ${className}`}>
      {children}
    </span>
  );
};
""")

# ProgressBar
write_file("packages/ui/src/progress-bar.tsx", """import React from 'react';

export interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showPercent?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showPercent = true,
  className = ''
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`w-full ${className}`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {(label || showPercent) && (
        <div className="flex justify-between items-center text-xs text-slate-600 mb-1.5 font-medium">
          {label && <span>{label}</span>}
          {showPercent && <span className="font-semibold text-slate-800">{Math.round(clamped)}%</span>}
        </div>
      )}
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-200/50">
        <div
          className="bg-brand-600 h-1.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
""")

# CodeBlock
write_file("packages/ui/src/code-block.tsx", """"use client";

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

  const lines = code.trim().split('\\n');

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
""")

# Tabs
write_file("packages/ui/src/tabs.tsx", """"use client";

import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onChange,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');

  const handleSelect = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  return (
    <div className={`w-full overflow-x-auto no-scrollbar border-b border-slate-200 ${className}`}>
      <nav className="flex space-x-1 sm:space-x-2" role="tablist" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => handleSelect(tab.id)}
              className={`flex items-center space-x-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors min-h-[44px] ${
                isActive
                  ? 'border-brand-600 text-brand-600 bg-brand-50/30'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-normal">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
""")

# Alert
write_file("packages/ui/src/alert.tsx", """import React from 'react';

export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'tip';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  children,
  className = ''
}) => {
  const styles = {
    info: 'bg-indigo-50/70 border-brand-200 text-brand-950',
    success: 'bg-emerald-50/70 border-emerald-200 text-emerald-950',
    warning: 'bg-amber-50/70 border-amber-200 text-amber-950',
    tip: 'bg-purple-50/70 border-purple-200 text-purple-950'
  }[type];

  const icons = {
    info: '💡',
    success: '✓',
    warning: '⚠️',
    tip: '✨'
  }[type];

  return (
    <div className={`rounded-xl border p-4 sm:p-5 ${styles} ${className}`} role="alert">
      <div className="flex items-start space-x-3">
        <span className="text-xl flex-shrink-0 mt-0.5">{icons}</span>
        <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
          {title && <h5 className="font-bold text-slate-900">{title}</h5>}
          <div className="text-slate-700">{children}</div>
        </div>
      </div>
    </div>
  );
};
""")

# EmptyState
write_file("packages/ui/src/empty-state.tsx", """import React from 'react';
import { Button } from './button';

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📂',
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`text-center py-12 px-4 bg-white rounded-2xl border border-slate-200/80 shadow-subtle ${className}`}>
      <span className="text-4xl block mb-3">{icon}</span>
      <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">{description}</p>
      {actionLabel && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
""")

# Skeleton
write_file("packages/ui/src/skeleton.tsx", """import React from 'react';

export interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-slate-200/70 rounded-lg ${className}`} />
  );
};
""")

# Index exports
write_file("packages/ui/src/index.ts", """export * from './button';
export * from './card';
export * from './badge';
export * from './progress-bar';
export * from './code-block';
export * from './tabs';
export * from './alert';
export * from './empty-state';
export * from './skeleton';
""")

print("UI package updated.")

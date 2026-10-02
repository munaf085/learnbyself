import React from 'react';

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

import React from 'react';

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

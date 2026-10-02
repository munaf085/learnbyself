import React from 'react';

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

import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`text-xs ${className}`}>
      {/* Desktop view */}
      <ol className="hidden sm:flex items-center space-x-2 text-slate-500">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center space-x-2">
              {idx > 0 && <span className="text-slate-300">/</span>}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-brand-600 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={`font-semibold ${isLast ? 'text-slate-900' : 'text-slate-600'}`}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {/* Mobile condensed view */}
      {(() => {
        const parentItem = items.length > 1 ? items[items.length - 2] : undefined;
        const currentItem = items[items.length - 1];

        if (parentItem?.href) {
          return (
            <div className="sm:hidden flex items-center text-slate-600">
              <Link
                href={parentItem.href}
                className="flex items-center space-x-1 text-brand-600 font-semibold py-1 min-h-[36px]"
              >
                <span>←</span>
                <span>Back to {parentItem.label}</span>
              </Link>
            </div>
          );
        }

        return (
          <div className="sm:hidden flex items-center text-slate-600">
            <span className="font-semibold text-slate-800">{currentItem?.label || ''}</span>
          </div>
        );
      })()}
    </nav>
  );
};

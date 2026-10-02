import React from 'react';
import Link from 'next/link';
import { Button, Card } from '@learnbyself/ui';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center p-8 space-y-4 shadow-elevated">
        <span className="text-4xl block">🔍</span>
        <h2 className="text-2xl font-bold text-slate-900">Topic Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          The curriculum page or lesson you are looking for does not exist or may have been moved.
        </p>
        <div className="pt-2">
          <Link href="/">
            <Button variant="primary" size="md">
              Return to Learning Tracks →
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button, Card } from '@learnbyself/ui';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error caught:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center p-8 space-y-4 shadow-elevated">
        <span className="text-4xl block">⚠️</span>
        <h2 className="text-xl font-bold text-slate-900">Something went wrong loading this content</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          We encountered an unexpected error while preparing your learning workspace.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
          <Button variant="primary" size="md" onClick={() => reset()}>
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" size="md" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

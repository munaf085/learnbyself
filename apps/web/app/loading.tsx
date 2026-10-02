import React from 'react';
import { Skeleton } from '@learnbyself/ui';

export default function Loading() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-44 w-full rounded-2xl" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-28 w-full rounded-2xl" />
      </div>
    </div>
  );
}

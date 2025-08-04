'use client';

export const CardSkeleton = () => (
  <div className="border border-gray-200 rounded-lg p-4 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
    <div className="h-8 bg-gray-200 rounded w-full"></div>
  </div>
);

export const ProgramsSkeleton = () => (
  <div className="space-y-6">
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
  </div>
);

export const SessionsSkeleton = () => (
  <div className="space-y-4">
    <CardSkeleton />
    <CardSkeleton />
  </div>
);

export const StatSkeleton = () => (
  <div className="bg-white rounded-xl shadow p-6 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="ml-auto w-12 h-12 bg-gray-200 rounded-lg"></div>
  </div>
);
'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const WeeklyStudyChartInner = dynamic(
  () => import('./WeeklyStudyChartInner'),
  { ssr: false, loading: () => <div className="animate-pulse bg-muted rounded-xl h-52" /> }
);

export default function WeeklyStudyChart() {
  return <WeeklyStudyChartInner />;
}
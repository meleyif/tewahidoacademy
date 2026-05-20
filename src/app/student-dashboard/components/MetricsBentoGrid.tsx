'use client';

import React from 'react';
import { Flame, TrendingUp, Video, Award, Clock, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

// Grid plan: 6 cards → grid-cols-4
// Row 1: Streak (hero, spans 2 cols) + Overall Progress + Upcoming Session
// Row 2: Certificates Earned + Sacred Study Hours + Missed Session (warning)

const metrics = [
  {
    id: 'metric-streak',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2',
    hero: true,
    icon: Flame,
    iconColor: 'text-accent',
    iconBg: 'bg-accent/10',
    label: 'Learning Streak',
    value: '14',
    unit: 'days',
    trend: '+3 from last week',
    trendPositive: true,
    sub: "Keep it up — you're in the top 8% of students this month.",
    bg: 'bg-gradient-to-br from-primary/5 to-accent/5',
    border: 'border-accent/20',
  },
  {
    id: 'metric-progress',
    colSpan: 'col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1',
    hero: false,
    icon: TrendingUp,
    iconColor: 'text-positive',
    iconBg: 'bg-positive-bg',
    label: 'Overall Progress',
    value: '67',
    unit: '%',
    trend: '+12% this month',
    trendPositive: true,
    sub: 'Across 3 enrolled courses',
    bg: 'bg-card',
    border: 'border-border',
  },
  {
    id: 'metric-session',
    colSpan: 'col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1',
    hero: false,
    icon: Video,
    iconColor: 'text-info',
    iconBg: 'bg-info-bg',
    label: 'Next Live Session',
    value: '2h 14m',
    unit: '',
    trend: 'Introduction to Deggua Chants',
    trendPositive: true,
    sub: 'Today at 7:00 PM EST',
    bg: 'bg-card',
    border: 'border-border',
  },
  {
    id: 'metric-certs',
    colSpan: 'col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1',
    hero: false,
    icon: Award,
    iconColor: 'text-accent',
    iconBg: 'bg-warning-bg',
    label: 'Certificates Earned',
    value: '2',
    unit: 'of 5',
    trend: '1 in progress',
    trendPositive: true,
    sub: 'Kidasie Fundamentals complete',
    bg: 'bg-card',
    border: 'border-border',
  },
  {
    id: 'metric-hours',
    colSpan: 'col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1',
    hero: false,
    icon: Clock,
    iconColor: 'text-muted-foreground',
    iconBg: 'bg-muted',
    label: 'Sacred Study Hours',
    value: '48.5',
    unit: 'hrs',
    trend: '6.2 hrs this week',
    trendPositive: true,
    sub: 'Lifetime total across all courses',
    bg: 'bg-card',
    border: 'border-border',
  },
  {
    id: 'metric-missed',
    colSpan: 'col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1',
    hero: false,
    icon: AlertTriangle,
    iconColor: 'text-warning',
    iconBg: 'bg-warning-bg',
    label: 'Missed Session',
    value: '1',
    unit: 'recording available',
    trend: "Ge'ez Alphabet — May 9",
    trendPositive: false,
    sub: 'Watch recording to stay on track',
    bg: 'bg-warning-bg/40',
    border: 'border-warning/25',
    alert: true,
  },
];

export default function MetricsBentoGrid() {
  return (
    <section aria-label="Learning metrics">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {metrics?.map((m) => {
          const Icon = m?.icon;
          return (
            <div
              key={m?.id}
              className={`${m?.colSpan} ${m?.bg} border ${m?.border} rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all duration-200 ${m?.alert ? 'pulse-gold' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`w-9 h-9 rounded-lg ${m?.iconBg} flex items-center justify-center shrink-0`}
                >
                  <Icon size={18} className={m?.iconColor} />
                </div>
                {m?.alert && (
                  <span className="text-[10px] font-700 uppercase tracking-wider text-warning bg-warning-bg border border-warning/20 px-2 py-0.5 rounded-full">
                    Action needed
                  </span>
                )}
              </div>
              <div className="mt-3 space-y-0.5">
                <p className="text-[12px] font-600 uppercase tracking-wider text-muted-foreground">
                  {m?.label}
                </p>
                <div className="flex items-end gap-1.5">
                  <span
                    className={`tabular-nums font-800 text-foreground ${m?.hero ? 'text-4xl' : 'text-2xl'}`}
                  >
                    {m?.value}
                  </span>
                  {m?.unit && (
                    <span className="text-sm font-600 text-muted-foreground mb-0.5">{m?.unit}</span>
                  )}
                </div>
              </div>
              <div className="mt-2 space-y-0.5">
                <p
                  className={`text-xs font-600 ${m?.trendPositive ? 'text-positive' : 'text-warning'}`}
                >
                  {m?.trend}
                </p>
                <p className="text-xs text-muted-foreground leading-snug">{m?.sub}</p>
              </div>
              {m?.alert && (
                <Link
                  href="/course-detail-lesson-player"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-700 text-warning hover:underline"
                >
                  Watch recording →
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { Users, BookOpen, TrendingUp, DollarSign, Star, Clock } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const metrics = [
  {
    id: 'em-students',
    colSpan: 'col-span-1 md:col-span-2',
    hero: true,
    icon: Users,
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
    label: 'Total Enrolled Students',
    value: '247',
    unit: 'students',
    trend: '+18 this month',
    trendPositive: true,
    sub: 'Across all 4 active courses',
    bg: 'bg-gradient-to-br from-primary/5 to-accent/5',
    border: 'border-primary/20',
  },
  {
    id: 'em-courses',
    colSpan: 'col-span-1',
    hero: false,
    icon: BookOpen,
    iconColor: 'text-info',
    iconBg: 'bg-info-bg',
    label: 'Active Courses',
    value: '4',
    unit: 'published',
    trend: '1 in draft',
    trendPositive: true,
    sub: '2 new modules added this week',
    bg: 'bg-card',
    border: 'border-border',
  },
  {
    id: 'em-completion',
    colSpan: 'col-span-1',
    hero: false,
    icon: TrendingUp,
    iconColor: 'text-positive',
    iconBg: 'bg-positive-bg',
    label: 'Avg. Completion Rate',
    value: '68',
    unit: '%',
    trend: '+5% vs last month',
    trendPositive: true,
    sub: 'Students finishing all lessons',
    bg: 'bg-card',
    border: 'border-border',
  },
  {
    id: 'em-earnings',
    colSpan: 'col-span-1',
    hero: false,
    icon: DollarSign,
    iconColor: 'text-accent',
    iconBg: 'bg-warning-bg',
    label: 'Pending Earnings',
    value: '$1,240',
    unit: '',
    trend: 'Payout on June 1',
    trendPositive: true,
    sub: '70% revenue share applied',
    bg: 'bg-card',
    border: 'border-border',
  },
  {
    id: 'em-rating',
    colSpan: 'col-span-1',
    hero: false,
    icon: Star,
    iconColor: 'text-accent',
    iconBg: 'bg-warning-bg',
    label: 'Avg. Course Rating',
    value: '4.8',
    unit: '/ 5',
    trend: '94 reviews total',
    trendPositive: true,
    sub: 'Based on student feedback',
    bg: 'bg-card',
    border: 'border-border',
  },
  {
    id: 'em-hours',
    colSpan: 'col-span-1',
    hero: false,
    icon: Clock,
    iconColor: 'text-muted-foreground',
    iconBg: 'bg-muted',
    label: 'Total Watch Time',
    value: '3.2k',
    unit: 'hrs',
    trend: '+420 hrs this week',
    trendPositive: true,
    sub: 'Across all enrolled students',
    bg: 'bg-card',
    border: 'border-border',
  },
];

export default function EnrollmentMetrics() {
  return (
    <section aria-label="Enrollment metrics">
      <div className="flex items-center gap-2 mb-4">
        <Users size={16} className="text-primary" />
        <h2 className="text-base font-700 text-foreground">Enrollment Overview</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {metrics?.map((m) => {
          const Icon = m?.icon;
          return (
            <div
              key={m?.id}
              className={`${m?.colSpan} ${m?.bg} border ${m?.border} rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all duration-200`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className={`w-9 h-9 rounded-lg ${m?.iconBg} flex items-center justify-center shrink-0`}>
                  <Icon size={18} className={m?.iconColor} />
                </div>
              </div>
              <div className="mt-3 space-y-0.5">
                <p className="text-[11px] font-600 uppercase tracking-wider text-muted-foreground">
                  {m?.label}
                </p>
                <div className="flex items-end gap-1.5">
                  <span className={`tabular-nums font-800 text-foreground ${m?.hero ? 'text-4xl' : 'text-2xl'}`}>
                    {m?.value}
                  </span>
                  {m?.unit && (
                    <span className="text-sm font-600 text-muted-foreground mb-0.5">{m?.unit}</span>
                  )}
                </div>
              </div>
              <div className="mt-2 space-y-0.5">
                <p className={`text-xs font-600 ${m?.trendPositive ? 'text-positive' : 'text-warning'}`}>
                  {m?.trend}
                </p>
                <p className="text-xs text-muted-foreground leading-snug">{m?.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

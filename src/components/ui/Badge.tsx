import React from 'react';

type BadgeVariant = 'active' | 'completed' | 'locked' | 'live' | 'draft' | 'scheduled' | 'ended' | 'video' | 'pdf' | 'quiz' | 'text' | 'deacon' | 'college' | 'high' | 'middle';

const variantMap: Record<BadgeVariant, string> = {
  active: 'bg-positive-bg text-positive border-positive/20',
  completed: 'bg-positive-bg text-positive border-positive/20',
  locked: 'bg-muted text-muted-foreground border-border',
  live: 'bg-danger-bg text-danger border-danger/20',
  draft: 'bg-muted text-muted-foreground border-border',
  scheduled: 'bg-info-bg text-info border-info/20',
  ended: 'bg-muted text-muted-foreground border-border',
  video: 'bg-info-bg text-info border-info/20',
  pdf: 'bg-warning-bg text-warning border-warning/20',
  quiz: 'bg-positive-bg text-positive border-positive/20',
  text: 'bg-secondary text-secondary-foreground border-border',
  deacon: 'bg-primary/10 text-primary border-primary/20',
  college: 'bg-accent/10 text-accent border-accent/20',
  high: 'bg-info-bg text-info border-info/20',
  middle: 'bg-positive-bg text-positive border-positive/20',
};

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant, children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-600 px-2 py-0.5 rounded-full border ${variantMap[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
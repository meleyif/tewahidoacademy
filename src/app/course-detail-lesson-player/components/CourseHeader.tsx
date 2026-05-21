'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Globe, Award, BookOpen } from 'lucide-react';
import Badge from '@/components/ui/Badge';

export default function CourseHeader() {
  const [lang, setLang] = useState<'en' | 'am'>('en');
  const progress = 72;

  return (
    <div className="sticky top-0 z-30 bg-card border-b border-border shadow-card">
      <div className="px-4 py-3 max-w-screen-2xl mx-auto lg:px-6 xl:px-8">
        {/* Top row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Link
              href="/student-dashboard"
              className="flex items-center gap-1.5 text-sm font-600 text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">My Learning</span>
            </Link>
            <div className="hidden sm:block h-4 w-px bg-border" />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-sm font-700 text-foreground truncate">
                  {lang === 'en'
                    ? 'Foundations of Ethiopian Orthodox Tewahido'
                    : 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ መሠረቶች'}
                </h1>
                <Badge variant="college">College</Badge>
                <Badge variant="active">Active</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Deaconess Miriam Tadesse · 24 lessons · 3 modules
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-600 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Globe size={13} />
              {lang === 'en' ? 'EN' : 'AM'}
            </button>

            {/* Certificate progress */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-warning-bg border border-warning/20 rounded-lg">
              <Award size={13} className="text-accent" />
              <span className="text-xs font-700 text-warning tabular-nums">{progress}%</span>
              <span className="text-xs text-muted-foreground font-500">to certificate</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2.5 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <BookOpen size={11} className="text-muted-foreground" />
              <span className="text-muted-foreground font-500">17 of 24 lessons completed</span>
            </div>
            <span className="font-700 text-foreground tabular-nums">{progress}% complete</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full gradient-gold rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Course progress: ${progress}%`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

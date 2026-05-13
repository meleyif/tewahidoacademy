'use client';

import React from 'react';
import { Bell, Search, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function DashboardHeader() {
  const { isAmharic } = useLanguage();

  return (
    <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border px-6 py-4 lg:px-8 xl:px-10 2xl:px-12">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
        <div>
          <h1 className={`text-xl font-700 text-foreground ${isAmharic ? 'font-ethiopic' : ''}`}>
            {isAmharic ? 'እንኳን ደህና መጡ፣ ዮናስ ✞' : 'Good morning, Yonas ✞'}
          </h1>
          <p className={`text-sm text-muted-foreground mt-0.5 ${isAmharic ? 'font-ethiopic' : ''}`}>
            {isAmharic ? 'ከቆሙበት ቀጥሉ — ተከታታይ ጥናትዎ ንቁ ነው።' : 'Continue where you left off — your streak is active.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <Link
            href="/course-catalog"
            className={`hidden md:flex items-center gap-2 px-3 py-2 bg-muted rounded-lg border border-border text-muted-foreground text-sm w-52 cursor-pointer hover:border-primary/40 transition-colors ${isAmharic ? 'font-ethiopic' : ''}`}
          >
            <Search size={14} />
            <span className="font-500">{isAmharic ? 'ኮርሶችን ይፈልጉ…' : 'Search courses…'}</span>
            <span className="ml-auto text-xs bg-border px-1.5 py-0.5 rounded font-mono">⌘K</span>
          </Link>

          {/* Notifications */}
          <button className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary transition-colors" aria-label="View notifications">
            <Bell size={16} className="text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger" />
          </button>

          {/* Browse Courses CTA */}
          <Link
            href="/course-catalog"
            className={`hidden sm:flex items-center gap-2 px-4 py-2 gradient-primary text-primary-foreground text-sm font-700 rounded-lg hover:opacity-90 transition-all scale-click ${isAmharic ? 'font-ethiopic' : ''}`}
          >
            <BookOpen size={14} />
            {isAmharic ? 'ኮርሶችን ያስሱ' : 'Browse Courses'}
          </Link>
        </div>
      </div>
    </div>
  );
}
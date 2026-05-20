'use client';

import React, { useState, useEffect } from 'react';
import { Video, ExternalLink, Clock, Users } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

const upcomingSessions = [
  {
    id: 'session-001',
    title: 'Introduction to Deggua Chants',
    titleAm: 'ወደ ዲጋ ዝማሬዎች መግቢያ',
    course: 'Sacred Hymns: Deggua and Zimare',
    courseAm: 'ዲጋ እና ዝማሬ: ቅዱስ ዝማሬ',
    instructor: 'Memhir Girma Haile',
    scheduledAt: 'Today, 7:00 PM EST',
    durationMin: 90,
    enrolledCount: 24,
    status: 'scheduled' as const,
    isToday: true,
    minutesUntil: 134,
  },
  {
    id: 'session-002',
    title: 'The Holy Trinity — Q&A Session',
    titleAm: 'ቅድስት ሥላሴ — የጥያቄ እና መልስ ክፍለ ጊዜ',
    course: 'Foundations of Ethiopian Orthodox Tewahido',
    courseAm: 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ መሠረቶች',
    instructor: 'Deaconess Miriam Tadesse',
    scheduledAt: 'Thu, May 14 · 6:30 PM EST',
    durationMin: 60,
    enrolledCount: 31,
    status: 'scheduled' as const,
    isToday: false,
    minutesUntil: 2850,
  },
  {
    id: 'session-003',
    title: "Ge'ez Vowel Orders — Live Drill",
    titleAm: 'የግዕዝ ድምፅ ቅደም ተከተሎች — ቀጥታ ልምምድ',
    course: "Ge'ez Language for Liturgical Use",
    courseAm: 'ለቅዳሴ አገልግሎት የግዕዝ ቋንቋ',
    instructor: 'Deacon Dawit Bekele',
    scheduledAt: 'Sat, May 16 · 10:00 AM EST',
    durationMin: 45,
    enrolledCount: 18,
    status: 'scheduled' as const,
    isToday: false,
    minutesUntil: 5760,
  },
];

function CountdownTimer({ minutesUntil }: { minutesUntil: number }) {
  const [mins, setMins] = useState(minutesUntil);

  useEffect(() => {
    const interval = setInterval(() => {
      setMins((prev) => Math.max(0, prev - 1));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const h = Math.floor(mins / 60);
  const m = mins % 60;

  if (mins <= 0) return <span className="text-xs font-700 text-danger">Starting now</span>;
  if (mins < 60)
    return <span className="text-xs font-700 text-warning tabular-nums">{m}m away</span>;
  return (
    <span className="text-xs font-700 text-muted-foreground tabular-nums">
      {h}h {m}m
    </span>
  );
}

export default function UpcomingSessionsPanel() {
  const { t, isAmharic } = useLanguage();

  return (
    <section aria-label="Upcoming live sessions">
      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Video size={15} className="text-primary" />
            <h2 className={`text-sm font-700 text-foreground ${isAmharic ? 'font-ethiopic' : ''}`}>
              {t('dashboard.upcomingSessions')}
            </h2>
          </div>
          <span className="text-xs font-600 text-muted-foreground">
            {upcomingSessions.length} scheduled
          </span>
        </div>

        <div className="divide-y divide-border">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="p-4 hover:bg-secondary/40 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    {session.isToday && (
                      <span className="text-[10px] font-700 uppercase tracking-wider text-danger bg-danger-bg border border-danger/20 px-1.5 py-0.5 rounded-full">
                        Today
                      </span>
                    )}
                    <Badge variant={session.status}>
                      {session.isToday ? 'Live Soon' : 'Scheduled'}
                    </Badge>
                  </div>
                  <p
                    className={`text-sm font-700 text-foreground leading-snug ${isAmharic ? 'font-ethiopic' : ''}`}
                  >
                    {isAmharic ? session.titleAm : session.title}
                  </p>
                  <p
                    className={`text-xs text-muted-foreground mt-0.5 truncate ${isAmharic ? 'font-ethiopic' : ''}`}
                  >
                    {isAmharic ? session.courseAm : session.course}
                  </p>
                </div>
                <CountdownTimer minutesUntil={session.minutesUntil} />
              </div>

              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {session.scheduledAt}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={11} />
                  {session.enrolledCount} enrolled
                </span>
              </div>

              <div className="mt-2.5 flex items-center gap-2">
                <Link
                  href="/course-detail-lesson-player"
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-700 rounded-lg transition-all scale-click ${
                    session.isToday
                      ? 'gradient-primary text-primary-foreground hover:opacity-90'
                      : 'bg-secondary text-foreground border border-border hover:bg-muted'
                  }`}
                >
                  <ExternalLink size={11} />
                  {session.isToday ? 'Join Session' : 'View Details'}
                </Link>
                <span className="text-xs text-muted-foreground">
                  {session.durationMin} min · {session.instructor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

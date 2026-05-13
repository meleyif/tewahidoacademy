import React from 'react';
import { CheckCircle, BookOpen, Award, Video, FileText } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const activities = [
  {
    id: 'act-001',
    type: 'lesson_complete',
    icon: CheckCircle,
    iconColor: 'text-positive',
    iconBg: 'bg-positive-bg',
    title: 'Completed lesson',
    detail: 'The Nicene Creed in Tewahido Context',
    time: '2 hours ago',
    course: 'Foundations',
  },
  {
    id: 'act-002',
    type: 'quiz_passed',
    icon: BookOpen,
    iconColor: 'text-accent',
    iconBg: 'bg-warning-bg',
    title: 'Quiz passed',
    detail: 'Ge\'ez Alphabet — Module 2 Quiz · 88%',
    time: 'Yesterday',
    course: 'Ge\'ez Language',
  },
  {
    id: 'act-003',
    type: 'session_attended',
    icon: Video,
    iconColor: 'text-info',
    iconBg: 'bg-info-bg',
    title: 'Attended live session',
    detail: 'Kidasie Liturgy Overview — 90 min',
    time: 'May 9',
    course: 'Foundations',
  },
  {
    id: 'act-004',
    type: 'certificate',
    icon: Award,
    iconColor: 'text-accent',
    iconBg: 'bg-warning-bg',
    title: 'Certificate earned',
    detail: 'Kidasie Fundamentals — Verified',
    time: 'May 7',
    course: 'Foundations',
  },
  {
    id: 'act-005',
    type: 'pdf_read',
    icon: FileText,
    iconColor: 'text-muted-foreground',
    iconBg: 'bg-muted',
    title: 'Read material',
    detail: 'Anaphora of St. Cyril — PDF Handout',
    time: 'May 6',
    course: 'Foundations',
  },
];

export default function ActivityFeed() {
  return (
    <section aria-label="Recent learning activity">
      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="text-sm font-700 text-foreground">Recent Activity</h2>
        </div>

        <div className="divide-y divide-border">
          {activities?.map((act) => {
            const Icon = act?.icon;
            return (
              <div key={act?.id} className="flex items-start gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors">
                <div className={`w-7 h-7 rounded-lg ${act?.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon size={13} className={act?.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-700 text-foreground">{act?.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5 truncate">{act?.detail}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[10px] font-600 text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                      {act?.course}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{act?.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-4 py-2.5 border-t border-border">
          <button className="text-xs font-600 text-primary hover:underline w-full text-center">
            View full activity history
          </button>
        </div>
      </div>
    </section>
  );
}
'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Play, ChevronRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import AppImage from '@/components/ui/AppImage';
import { useLanguage } from '@/lib/LanguageContext';

const enrolledCourses = [
  {
    id: 'course-001',
    title: 'Foundations of Ethiopian Orthodox Tewahido',
    titleAm: 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ መሠረቶች',
    instructor: 'Deaconess Miriam Tadesse',
    thumbnail: 'https://img.rocket.new/generatedImages/rocket_gen_img_1947decad-1774811567605.png',
    thumbnailAlt: 'Open ancient religious manuscript with ornate gold text on wooden table',
    progress: 72,
    totalLessons: 24,
    completedLessons: 17,
    nextLesson: 'The Holy Trinity in Tewahido Theology',
    nextLessonAm: 'ቅድስት ሥላሴ በተዋሕዶ ሥነ-መለኮት',
    nextLessonType: 'video' as const,
    status: 'active' as const,
    group: 'college' as const,
    lastActivity: '2 hours ago',
  },
  {
    id: 'course-002',
    title: "Introduction to Ge'ez Language",
    titleAm: 'ለቅዳሴ አገልግሎት የግዕዝ ቋንቋ',
    instructor: 'Deacon Dawit Bekele',
    thumbnail: 'https://images.unsplash.com/photo-1702654555176-e9ba70115818',
    thumbnailAlt: 'Ancient Ethiopian script text carved in stone with warm golden lighting',
    progress: 38,
    totalLessons: 18,
    completedLessons: 7,
    nextLesson: 'Vowel Orders (ሀ–ሆ): Pronunciation Drills',
    nextLessonAm: 'የድምፅ ቅደም ተከተሎች (ሀ–ሆ): የአጠራር ልምምዶች',
    nextLessonType: 'quiz' as const,
    status: 'active' as const,
    group: 'deacon' as const,
    lastActivity: 'Yesterday',
  },
  {
    id: 'course-003',
    title: 'Sacred Hymns: Deggua and Zimare',
    titleAm: 'ዲጋ እና ዝማሬ: ቅዱስ ዝማሬ',
    instructor: 'Memhir Girma Haile',
    thumbnail: 'https://img.rocket.new/generatedImages/rocket_gen_img_19c629002-1767578415018.png',
    thumbnailAlt: 'Ethiopian priest in white robe holding traditional cross in church setting',
    progress: 15,
    totalLessons: 20,
    completedLessons: 3,
    nextLesson: 'Introduction to Deggua Chants — Live Session',
    nextLessonAm: 'ወደ ዲጋ ዝማሬዎች መግቢያ — ቀጥታ ክፍለ ጊዜ',
    nextLessonType: 'live' as const,
    status: 'active' as const,
    group: 'college' as const,
    lastActivity: '3 days ago',
  },
];

const lessonTypeConfig = {
  video: { label: 'Video', color: 'video' as const },
  quiz: { label: 'Quiz', color: 'quiz' as const },
  live: { label: 'Live', color: 'live' as const },
  pdf: { label: 'PDF', color: 'pdf' as const },
  text: { label: 'Text', color: 'text' as const },
};

export default function EnrolledCourses() {
  const { t, isAmharic } = useLanguage();

  return (
    <section aria-label="Enrolled courses">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-primary" />
          <h2 className={`text-base font-700 text-foreground ${isAmharic ? 'font-ethiopic' : ''}`}>
            {t('dashboard.enrolledCourses')}
          </h2>
          <span className="text-xs font-600 text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {enrolledCourses.length} {t('dashboard.active')}
          </span>
        </div>
        <Link
          href="/course-catalog"
          className="text-sm font-600 text-primary hover:underline flex items-center gap-1"
        >
          {t('dashboard.browseAll')} <ChevronRight size={14} />
        </Link>
      </div>

      <div className="space-y-3">
        {enrolledCourses.map((course) => (
          <div
            key={course.id}
            className="bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 group"
          >
            <div className="flex gap-0">
              {/* Thumbnail */}
              <div className="w-28 sm:w-36 shrink-0 relative overflow-hidden">
                <AppImage
                  src={course.thumbnail}
                  alt={course.thumbnailAlt}
                  width={144}
                  height={96}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <Badge variant={course.group}>
                        {course.group === 'deacon' ? 'Deacon Track' : 'College'}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-500">
                        {course.lastActivity}
                      </span>
                    </div>
                    <h3
                      className={`text-sm font-700 text-foreground leading-snug truncate ${isAmharic ? 'font-ethiopic' : ''}`}
                    >
                      {isAmharic ? course.titleAm : course.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{course.instructor}</p>
                  </div>

                  <Link
                    href="/course-detail-lesson-player"
                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 gradient-primary text-primary-foreground text-xs font-700 rounded-lg hover:opacity-90 transition-all scale-click"
                  >
                    <Play size={11} />
                    {t('dashboard.resume')}
                  </Link>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-500">
                      {course.completedLessons} of {course.totalLessons} lessons
                    </span>
                    <span className="font-700 tabular-nums text-foreground">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-gold rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                      role="progressbar"
                      aria-valuenow={course.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>

                {/* Next Lesson */}
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`text-xs text-muted-foreground font-500 ${isAmharic ? 'font-ethiopic' : ''}`}
                  >
                    {t('dashboard.next')}:
                  </span>
                  <Badge variant={lessonTypeConfig[course.nextLessonType].color}>
                    {lessonTypeConfig[course.nextLessonType].label}
                  </Badge>
                  <span
                    className={`text-xs text-foreground font-500 truncate ${isAmharic ? 'font-ethiopic' : ''}`}
                  >
                    {isAmharic ? course.nextLessonAm : course.nextLesson}
                  </span>
                  {course.nextLessonType === 'live' && (
                    <span className="text-xs font-700 text-danger animate-pulse">● LIVE TODAY</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

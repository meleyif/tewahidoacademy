'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  MoreVertical,
  Users,
  TrendingUp,
  Edit3,
  Trash2,
  Eye,
  Plus,
  ChevronRight,
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import AppImage from '@/components/ui/AppImage';

interface Course {
  id: string;
  title: string;
  titleAm: string;
  thumbnail: string;
  thumbnailAlt: string;
  status: 'published' | 'draft' | 'archived';
  targetGroup: 'college' | 'deacon' | 'middle' | 'high';
  enrolledCount: number;
  completionRate: number;
  moduleCount: number;
  lessonCount: number;
  lastUpdated: string;
  revenue: string;
}

const courses: Course[] = [
  {
    id: 'c-001',
    title: 'Foundations of Ethiopian Orthodox Tewahido',
    titleAm: 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ መሠረቶች',
    thumbnail: 'https://img.rocket.new/generatedImages/rocket_gen_img_1947decad-1774811567605.png',
    thumbnailAlt: 'Open ancient religious manuscript with ornate gold text on wooden table',
    status: 'published',
    targetGroup: 'college',
    enrolledCount: 98,
    completionRate: 72,
    moduleCount: 6,
    lessonCount: 24,
    lastUpdated: '2 days ago',
    revenue: '$1,960',
  },
  {
    id: 'c-002',
    title: "Ge'ez Language for Liturgical Use",
    titleAm: 'ለቅዳሴ አገልግሎት የግዕዝ ቋንቋ',
    thumbnail: 'https://images.unsplash.com/photo-1702654555176-e9ba70115818',
    thumbnailAlt: 'Ancient Ethiopian script text carved in stone with warm golden lighting',
    status: 'published',
    targetGroup: 'deacon',
    enrolledCount: 64,
    completionRate: 55,
    moduleCount: 4,
    lessonCount: 18,
    lastUpdated: '5 days ago',
    revenue: '$960',
  },
  {
    id: 'c-003',
    title: 'Sacred Hymns: Deggua and Zimare',
    titleAm: 'ዲጋ እና ዝማሬ: ቅዱስ ዝማሬ',
    thumbnail: 'https://img.rocket.new/generatedImages/rocket_gen_img_19c629002-1767578415018.png',
    thumbnailAlt: 'Ethiopian priest in white robe holding traditional cross in church setting',
    status: 'published',
    targetGroup: 'college',
    enrolledCount: 85,
    completionRate: 61,
    moduleCount: 5,
    lessonCount: 20,
    lastUpdated: '1 week ago',
    revenue: '$1,275',
  },
  {
    id: 'c-004',
    title: 'Introduction to Tewahido for Youth',
    titleAm: 'ለወጣቶች የተዋሕዶ መግቢያ',
    thumbnail: 'https://img.rocket.new/generatedImages/rocket_gen_img_1b733f700-1768930930734.png',
    thumbnailAlt: 'Young students reading religious books in a classroom setting',
    status: 'draft',
    targetGroup: 'middle',
    enrolledCount: 0,
    completionRate: 0,
    moduleCount: 3,
    lessonCount: 12,
    lastUpdated: 'Today',
    revenue: '$0',
  },
];

const statusConfig = {
  published: { label: 'Published', color: 'bg-positive-bg text-positive border-positive/20' },
  draft: { label: 'Draft', color: 'bg-muted text-muted-foreground border-border' },
  archived: { label: 'Archived', color: 'bg-warning-bg text-warning border-warning/20' },
};

interface CourseRowMenuProps {
  onClose: () => void;
}

function CourseRowMenu({ onClose }: CourseRowMenuProps) {
  return (
    <div className="absolute right-0 top-8 z-20 bg-card border border-border rounded-xl shadow-xl w-44 py-1 fade-in">
      <button
        onClick={onClose}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
      >
        <Edit3 size={14} className="text-muted-foreground" /> Edit Course
      </button>
      <button
        onClick={onClose}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
      >
        <Eye size={14} className="text-muted-foreground" /> Preview
      </button>
      <div className="border-t border-border my-1" />
      <button
        onClick={onClose}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-danger hover:bg-danger-bg transition-colors"
      >
        <Trash2 size={14} /> Archive Course
      </button>
    </div>
  );
}

export default function CourseManager() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  const filtered = courses.filter((c) => (filter === 'all' ? true : c.status === filter));

  return (
    <section aria-label="Course manager">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-primary" />
          <h2 className="text-base font-700 text-foreground">My Courses</h2>
          <span className="text-xs font-600 text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {courses.length} total
          </span>
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
          {(['all', 'published', 'draft'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-600 rounded-md transition-colors ${
                filter === f
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((course) => (
          <div
            key={course.id}
            className="bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 group"
          >
            <div className="flex gap-0">
              {/* Thumbnail */}
              <div className="w-28 sm:w-32 shrink-0 relative overflow-hidden">
                <AppImage
                  src={course.thumbnail}
                  alt={course.thumbnailAlt}
                  width={128}
                  height={90}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors" />
                <div
                  className={`absolute top-2 left-2 text-[10px] font-700 px-2 py-0.5 rounded-full border ${statusConfig[course.status].color}`}
                >
                  {statusConfig[course.status].label}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <Badge variant={course.targetGroup}>
                        {course.targetGroup === 'middle'
                          ? 'Middle School'
                          : course.targetGroup === 'high'
                            ? 'High School'
                            : course.targetGroup === 'deacon'
                              ? 'Deacon Track'
                              : 'College'}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-500">
                        Updated {course.lastUpdated}
                      </span>
                    </div>
                    <h3 className="text-sm font-700 text-foreground leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs font-ethiopic text-muted-foreground mt-0.5 truncate">
                      {course.titleAm}
                    </p>
                  </div>

                  {/* Actions Menu */}
                  <div className="relative shrink-0">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === course.id ? null : course.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
                      aria-label="Course options"
                    >
                      <MoreVertical size={14} className="text-muted-foreground" />
                    </button>
                    {openMenuId === course.id && (
                      <CourseRowMenu onClose={() => setOpenMenuId(null)} />
                    )}
                  </div>
                </div>

                {/* Stats Row */}
                <div className="mt-3 flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Users size={12} className="text-muted-foreground" />
                    <span className="text-xs font-600 text-foreground tabular-nums">
                      {course.enrolledCount}
                    </span>
                    <span className="text-xs text-muted-foreground">enrolled</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp size={12} className="text-positive" />
                    <span className="text-xs font-600 text-positive tabular-nums">
                      {course.completionRate}%
                    </span>
                    <span className="text-xs text-muted-foreground">completion</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen size={12} className="text-muted-foreground" />
                    <span className="text-xs font-600 text-foreground">
                      {course.moduleCount} modules · {course.lessonCount} lessons
                    </span>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs font-700 text-accent tabular-nums">
                      {course.revenue}
                    </span>
                  </div>
                </div>

                {/* Completion bar */}
                {course.status === 'published' && (
                  <div className="mt-2.5">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-gold rounded-full transition-all duration-500"
                        style={{ width: `${course.completionRate}%` }}
                        role="progressbar"
                        aria-valuenow={course.completionRate}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Add Course Prompt */}
        <button className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-200 group">
          <Plus size={16} className="group-hover:scale-110 transition-transform" />
          <span className="text-sm font-600">Add another course</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Lock,
  CheckCircle,
  Play,
  FileText,
  HelpCircle,
  Video,
  Circle,
  Globe,
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { useLanguage } from '@/lib/LanguageContext';

type LessonType = 'video' | 'pdf' | 'quiz' | 'text' | 'live';
type LessonStatus = 'completed' | 'in_progress' | 'not_started' | 'locked';

interface Lesson {
  id: string;
  title: string;
  titleAm: string;
  type: LessonType;
  durationMin: number;
  status: LessonStatus;
  isFreePreview: boolean;
}

interface Module {
  id: string;
  title: string;
  titleAm: string;
  lessons: Lesson[];
  isLocked: boolean;
}

const lessonTypeIcon: Record<LessonType, React.ElementType> = {
  video: Play,
  pdf: FileText,
  quiz: HelpCircle,
  text: FileText,
  live: Video,
};

const lessonTypeBadge: Record<LessonType, 'video' | 'pdf' | 'quiz' | 'text' | 'live'> = {
  video: 'video',
  pdf: 'pdf',
  quiz: 'quiz',
  text: 'text',
  live: 'live',
};

// Sequential locking: a lesson is locked if any prior lesson in the same module is not completed
function computeSequentialLocking(modules: Module[]): Module[] {
  return modules.map((mod, modIndex) => {
    if (mod.isLocked) return mod;
    // Check if previous module is fully completed
    if (modIndex > 0) {
      const prevMod = modules[modIndex - 1];
      const prevModDone = prevMod.lessons.every((l) => l.status === 'completed');
      if (!prevModDone) {
        return {
          ...mod,
          isLocked: true,
          lessons: mod.lessons.map((l) => ({ ...l, status: 'locked' as LessonStatus })),
        };
      }
    }
    // Within module: lock lessons after first non-completed
    let foundIncomplete = false;
    const lessons = mod.lessons.map((lesson) => {
      if (foundIncomplete) {
        return { ...lesson, status: 'locked' as LessonStatus };
      }
      if (lesson.status !== 'completed') {
        foundIncomplete = true;
      }
      return lesson;
    });
    return { ...mod, lessons };
  });
}

const rawModules: Module[] = [
  {
    id: 'module-001',
    title: 'Module 1: Foundations of the Faith',
    titleAm: 'ሞጁል ፩: የእምነት መሠረቶች',
    isLocked: false,
    lessons: [
      {
        id: 'lesson-001',
        title: 'Introduction to Ethiopian Orthodox Tewahido',
        titleAm: 'ወደ ተዋሕዶ ቤተ ክርስቲያን መግቢያ',
        type: 'video',
        durationMin: 18,
        status: 'completed',
        isFreePreview: true,
      },
      {
        id: 'lesson-002',
        title: 'History of the Ethiopian Church — 1st Century to Axum',
        titleAm: 'የኢትዮጵያ ቤተ ክርስቲያን ታሪክ',
        type: 'video',
        durationMin: 22,
        status: 'completed',
        isFreePreview: false,
      },
      {
        id: 'lesson-003',
        title: 'Sacred Texts: The Octateuch and Ethiopian Canon',
        titleAm: 'ቅዱሳን ጽሑፎች',
        type: 'pdf',
        durationMin: 15,
        status: 'completed',
        isFreePreview: false,
      },
      {
        id: 'lesson-004',
        title: 'Module 1 Knowledge Check',
        titleAm: 'ሞጁል ፩ ፈተና',
        type: 'quiz',
        durationMin: 10,
        status: 'completed',
        isFreePreview: false,
      },
    ],
  },
  {
    id: 'module-002',
    title: 'Module 2: Theology and Doctrine',
    titleAm: 'ሞጁል ፪: ሥነ-መለኮት እና ትምህርት',
    isLocked: false,
    lessons: [
      {
        id: 'lesson-005',
        title: 'The Nicene Creed in Tewahido Context',
        titleAm: 'የኒቂያ ጸሎተ-ሃይማኖት',
        type: 'video',
        durationMin: 25,
        status: 'completed',
        isFreePreview: false,
      },
      {
        id: 'lesson-006',
        title: 'Monophysitism vs Miaphysitism — A Clear Distinction',
        titleAm: 'ሚያፊዚቲዝም ማብራሪያ',
        type: 'text',
        durationMin: 12,
        status: 'completed',
        isFreePreview: false,
      },
      {
        id: 'lesson-007',
        title: 'The Holy Trinity in Tewahido Theology',
        titleAm: 'ቅድስት ሥላሴ',
        type: 'video',
        durationMin: 28,
        status: 'in_progress',
        isFreePreview: false,
      },
      {
        id: 'lesson-008',
        title: 'Saints, Intercession, and the Theotokos',
        titleAm: 'ቅዱሳን እና ድምፃቸው',
        type: 'video',
        durationMin: 20,
        status: 'not_started',
        isFreePreview: false,
      },
      {
        id: 'lesson-009',
        title: 'Theology Deep Dive — Live Q&A Session',
        titleAm: 'ቀጥታ ውይይት',
        type: 'live',
        durationMin: 60,
        status: 'not_started',
        isFreePreview: false,
      },
      {
        id: 'lesson-010',
        title: 'Module 2 Assessment',
        titleAm: 'ሞጁል ፪ ፈተና',
        type: 'quiz',
        durationMin: 15,
        status: 'not_started',
        isFreePreview: false,
      },
    ],
  },
  {
    id: 'module-003',
    title: 'Module 3: Liturgy and Practice',
    titleAm: 'ሞጁል ፫: ቅዳሴ እና ልምምድ',
    isLocked: false,
    lessons: [
      {
        id: 'lesson-011',
        title: 'The Kidasie: Structure and Meaning',
        titleAm: 'ቅዳሴ: አወቃቀር እና ትርጉም',
        type: 'video',
        durationMin: 30,
        status: 'not_started',
        isFreePreview: false,
      },
      {
        id: 'lesson-012',
        title: 'Anaphora of the Apostles — Full Text',
        titleAm: 'የሐዋርያት ቅዳሴ',
        type: 'pdf',
        durationMin: 20,
        status: 'not_started',
        isFreePreview: false,
      },
      {
        id: 'lesson-013',
        title: 'Fasting and Feast Days in the Ethiopic Calendar',
        titleAm: 'ጾምና ፆም ቀናት',
        type: 'text',
        durationMin: 14,
        status: 'not_started',
        isFreePreview: false,
      },
      {
        id: 'lesson-014',
        title: 'Liturgical Vestments and Sacred Objects',
        titleAm: 'ቅዱሳን ልብሶች',
        type: 'video',
        durationMin: 18,
        status: 'not_started',
        isFreePreview: false,
      },
      {
        id: 'lesson-015',
        title: 'Module 3 Final Assessment',
        titleAm: 'ሞጁል ፫ ፈተና',
        type: 'quiz',
        durationMin: 20,
        status: 'not_started',
        isFreePreview: false,
      },
    ],
  },
];

const statusIcon: Record<LessonStatus, React.ReactNode> = {
  completed: <CheckCircle size={14} className="text-positive shrink-0" />,
  in_progress: <Circle size={14} className="text-accent shrink-0 fill-accent/30" />,
  not_started: <Circle size={14} className="text-muted-foreground shrink-0" />,
  locked: <Lock size={13} className="text-muted-foreground shrink-0" />,
};

export default function CourseCurriculumSidebar() {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'module-001': false,
    'module-002': true,
    'module-003': false,
  });
  const [activeLesson, setActiveLesson] = useState('lesson-007');
  const { language, setLanguage, isAmharic } = useLanguage();

  const modules = computeSequentialLocking(rawModules);

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = modules
    .flatMap((m) => m.lessons)
    .filter((l) => l.status === 'completed').length;
  const totalCount = modules.flatMap((m) => m.lessons).length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  return (
    <aside className="w-72 xl:w-80 shrink-0 border-r border-border bg-card flex flex-col overflow-hidden">
      {/* Sidebar header */}
      <div className="px-4 py-3 border-b border-border bg-secondary/30">
        <div className="flex items-center justify-between mb-1">
          <h2 className={`text-sm font-700 text-foreground ${isAmharic ? 'font-ethiopic' : ''}`}>
            {isAmharic ? 'የኮርስ ስርዓተ ትምህርት' : 'Course Curriculum'}
          </h2>
          {/* Language toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
            className="flex items-center gap-1 text-[10px] font-700 text-accent bg-warning-bg border border-warning/20 px-2 py-0.5 rounded-full hover:bg-warning/20 transition-colors"
            title="Toggle language"
          >
            <Globe size={10} />
            {language.toUpperCase()}
          </button>
        </div>
        <p className="text-xs text-muted-foreground tabular-nums">
          {completedCount} of {totalCount} lessons completed
        </p>
        {/* Progress bar */}
        <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full gradient-gold rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <p className="text-[10px] text-muted-foreground mt-1 tabular-nums">
          {progressPct}% complete
        </p>
      </div>

      {/* Modules list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {modules.map((mod) => {
          const modCompleted = mod.lessons.filter((l) => l.status === 'completed').length;
          const isExpanded = expandedModules[mod.id];

          return (
            <div key={mod.id} className="border-b border-border last:border-b-0">
              {/* Module header */}
              <button
                onClick={() => !mod.isLocked && toggleModule(mod.id)}
                className={`w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-secondary/50 transition-colors ${
                  mod.isLocked ? 'opacity-60 cursor-not-allowed' : ''
                }`}
                disabled={mod.isLocked}
                aria-expanded={isExpanded}
              >
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs font-700 leading-snug ${mod.isLocked ? 'text-muted-foreground' : 'text-foreground'} ${isAmharic ? 'font-ethiopic' : ''}`}
                  >
                    {isAmharic ? mod.titleAm : mod.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 tabular-nums">
                    {mod.isLocked ? (
                      <span className="flex items-center gap-1">
                        <Lock size={9} />
                        {isAmharic
                          ? 'ቀዳሚ ሞጁልን ያጠናቅቁ'
                          : `Complete Module ${modules.indexOf(mod)} first`}
                      </span>
                    ) : (
                      `${modCompleted}/${mod.lessons.length} done`
                    )}
                  </p>
                </div>
                {mod.isLocked ? (
                  <Lock size={14} className="text-muted-foreground shrink-0" />
                ) : isExpanded ? (
                  <ChevronDown size={14} className="text-muted-foreground shrink-0" />
                ) : (
                  <ChevronRight size={14} className="text-muted-foreground shrink-0" />
                )}
              </button>

              {/* Lessons list */}
              {isExpanded && !mod.isLocked && (
                <div className="bg-background/50">
                  {mod.lessons.map((lesson) => {
                    const TypeIcon = lessonTypeIcon[lesson.type];
                    const isActive = lesson.id === activeLesson;
                    const isLocked = lesson.status === 'locked';

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => !isLocked && setActiveLesson(lesson.id)}
                        disabled={isLocked}
                        className={`w-full flex items-start gap-2.5 px-4 py-2.5 text-left transition-all border-l-2 ${
                          isActive
                            ? 'border-primary bg-primary/5'
                            : 'border-transparent hover:bg-secondary/40 hover:border-border'
                        } ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <div className="mt-0.5 shrink-0">{statusIcon[lesson.status]}</div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-xs leading-snug font-600 ${isActive ? 'text-primary' : isLocked ? 'text-muted-foreground' : 'text-foreground'} ${isAmharic ? 'font-ethiopic' : ''}`}
                          >
                            {isAmharic ? lesson.titleAm : lesson.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={lessonTypeBadge[lesson.type]}>
                              <TypeIcon size={9} />
                              {lesson.type === 'live' ? 'Live' : lesson.type.toUpperCase()}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground tabular-nums">
                              {lesson.durationMin} min
                            </span>
                            {lesson.isFreePreview && (
                              <span className="text-[10px] font-700 text-positive bg-positive-bg px-1.5 py-0.5 rounded-full">
                                Free
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

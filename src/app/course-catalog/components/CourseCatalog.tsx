'use client';

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, BookOpen, Users, Play, FileText, Star, Clock, Video } from 'lucide-react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Badge from '@/components/ui/Badge';
import { useLanguage } from '@/lib/LanguageContext';

type StudentGroup = 'all' | 'middle' | 'high' | 'college' | 'deacon';

interface Course {
  id: string;
  title_en: string;
  title_am: string;
  description_en: string;
  description_am: string;
  instructor: string;
  thumbnail: string;
  thumbnailAlt: string;
  target_group: StudentGroup;
  price_usd: number | null;
  totalLessons: number;
  enrolledCount: number;
  rating: number;
  durationHours: number;
  contentTypes: Array<'video' | 'pdf' | 'text' | 'quiz' | 'live'>;
  isEnrolled: boolean;
  isFeatured: boolean;
}

const COURSES: Course[] = [
{
  id: 'course-001',
  title_en: 'Foundations of Ethiopian Orthodox Tewahido',
  title_am: 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ መሠረቶች',
  description_en: 'A comprehensive introduction to the Ethiopian Orthodox Tewahido Church — its history, theology, liturgy, and spiritual practices for diaspora families.',
  description_am: 'ለዲያስፖራ ቤተሰቦች የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ታሪክ፣ ሥነ-መለኮት፣ ቅዳሴ እና መንፈሳዊ ልምምዶች ሁሉን አቀፍ መግቢያ።',
  instructor: 'Deaconess Miriam Tadesse',
  thumbnail: 'https://img.rocket.new/generatedImages/rocket_gen_img_1947decad-1774811567605.png',
  thumbnailAlt: 'Open ancient religious manuscript with ornate gold text on wooden table',
  target_group: 'college',
  price_usd: null,
  totalLessons: 24,
  enrolledCount: 312,
  rating: 4.9,
  durationHours: 14,
  contentTypes: ['video', 'pdf', 'quiz'],
  isEnrolled: true,
  isFeatured: true
},
{
  id: 'course-002',
  title_en: "Ge'ez Language for Liturgical Use",
  title_am: 'ለቅዳሴ አገልግሎት የግዕዝ ቋንቋ',
  description_en: "Master the ancient Ge'ez script and pronunciation used in Ethiopian Orthodox liturgy, prayers, and sacred texts.",
  description_am: 'በኢትዮጵያ ኦርቶዶክስ ቅዳሴ፣ ጸሎቶች እና ቅዱሳን ጽሑፎች ውስጥ ጥቅም ላይ የሚውለውን ጥንታዊ የግዕዝ ፊደልና አጠራር ይማሩ።',
  instructor: 'Deacon Dawit Bekele',
  thumbnail: 'https://images.unsplash.com/photo-1702654555176-e9ba70115818',
  thumbnailAlt: 'Ancient Ethiopian script text carved in stone with warm golden lighting',
  target_group: 'deacon',
  price_usd: 29.99,
  totalLessons: 18,
  enrolledCount: 187,
  rating: 4.8,
  durationHours: 10,
  contentTypes: ['video', 'text', 'quiz'],
  isEnrolled: true,
  isFeatured: false
},
{
  id: 'course-003',
  title_en: 'Sacred Hymns: Deggua and Zimare',
  title_am: 'ዲጋ እና ዝማሬ: ቅዱስ ዝማሬ',
  description_en: 'Learn the traditional Ethiopian Orthodox hymns — Deggua and Zimare — with audio guides, notation, and live practice sessions.',
  description_am: 'ባህላዊ የኢትዮጵያ ኦርቶዶክስ ዝማሬዎችን — ዲጋ እና ዝማሬ — በድምፅ መመሪያዎች፣ ምልክቶች እና ቀጥታ የልምምድ ክፍሎች ይማሩ።',
  instructor: 'Memhir Girma Haile',
  thumbnail: 'https://img.rocket.new/generatedImages/rocket_gen_img_19c629002-1767578415018.png',
  thumbnailAlt: 'Ethiopian priest in white robe holding traditional cross in church setting',
  target_group: 'college',
  price_usd: 19.99,
  totalLessons: 20,
  enrolledCount: 143,
  rating: 4.7,
  durationHours: 12,
  contentTypes: ['video', 'live', 'pdf'],
  isEnrolled: true,
  isFeatured: true
},
{
  id: 'course-004',
  title_en: 'Faith for Young Believers: Middle School',
  title_am: 'ለወጣት አማኞች እምነት: ሁለተኛ ደረጃ',
  description_en: 'An engaging, age-appropriate introduction to Ethiopian Orthodox faith for students aged 11–14, with games, stories, and short video lessons.',
  description_am: 'ከ11–14 ዓመት ለሆኑ ተማሪዎች ተስማሚ የኢትዮጵያ ኦርቶዶክስ እምነት መግቢያ፣ ጨዋታዎች፣ ታሪኮች እና አጭር የቪዲዮ ትምህርቶች።',
  instructor: 'Sister Hiwot Girma',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_16d28a6b3-1774194394400.png",
  thumbnailAlt: 'Young students studying together with books and colorful learning materials',
  target_group: 'middle',
  price_usd: null,
  totalLessons: 16,
  enrolledCount: 256,
  rating: 4.6,
  durationHours: 8,
  contentTypes: ['video', 'quiz', 'text'],
  isEnrolled: false,
  isFeatured: false
},
{
  id: 'course-005',
  title_en: 'Fasting, Prayer & Spiritual Discipline',
  title_am: 'ጾም፣ ጸሎት እና መንፈሳዊ ዲሲፕሊን',
  description_en: 'Understand the theology and practice of fasting in the Ethiopian Orthodox tradition — the 250+ fasting days, their meaning, and how to observe them.',
  description_am: 'በኢትዮጵያ ኦርቶዶክስ ወግ ውስጥ ያለውን የጾም ሥነ-መለኮት እና ልምምድ ይረዱ — 250+ የጾም ቀናት፣ ትርጉማቸው እና እንዴት እንደሚጠበቁ።',
  instructor: 'Deaconess Miriam Tadesse',
  thumbnail: 'https://images.unsplash.com/photo-1598520058913-745d0a55859a',
  thumbnailAlt: 'Open ancient religious manuscript with illuminated text and ornate decorations',
  target_group: 'high',
  price_usd: 14.99,
  totalLessons: 12,
  enrolledCount: 198,
  rating: 4.8,
  durationHours: 7,
  contentTypes: ['video', 'text', 'pdf'],
  isEnrolled: false,
  isFeatured: false
},
{
  id: 'course-006',
  title_en: 'Ordination Pathway: Deacon Preparation',
  title_am: 'የዲቁና ሹመት ዝግጅት',
  description_en: 'A structured curriculum for those preparing for ordination as deacons in the Ethiopian Orthodox Church — liturgy, canon law, and pastoral duties.',
  description_am: 'በኢትዮጵያ ኦርቶዶክስ ቤተ ክርስቲያን ዲቁና ለሹመት ለሚዘጋጁ ሰዎች ቅዳሴ፣ ቀኖና ሕግ እና የሐዋርያዊ ተግባራት ስርዓተ ትምህርት።',
  instructor: 'Deacon Dawit Bekele',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_18cc310e1-1767618835854.png",
  thumbnailAlt: 'Ethiopian Orthodox deacon in traditional vestments holding a ceremonial cross',
  target_group: 'deacon',
  price_usd: 49.99,
  totalLessons: 32,
  enrolledCount: 89,
  rating: 5.0,
  durationHours: 20,
  contentTypes: ['video', 'pdf', 'live', 'quiz'],
  isEnrolled: false,
  isFeatured: true
},
{
  id: 'course-007',
  title_en: 'Ethiopian Orthodox Saints & Their Lives',
  title_am: 'የኢትዮጵያ ኦርቶዶክስ ቅዱሳን እና ሕይወታቸው',
  description_en: 'Explore the lives of Ethiopian Orthodox saints — from St. Yared to Abune Tekle Haymanot — and their enduring spiritual legacy.',
  description_am: 'ቅዱስ ያሬድ ጀምሮ አቡነ ተክለ ሃይማኖት ድረስ ያሉ የኢትዮጵያ ኦርቶዶክስ ቅዱሳን ሕይወት እና ዘላቂ መንፈሳዊ ቅርሳቸውን ያስሱ።',
  instructor: 'Memhir Girma Haile',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_115551440-1766597517501.png",
  thumbnailAlt: 'Ancient Ethiopian Orthodox church interior with colorful murals and religious iconography',
  target_group: 'high',
  price_usd: null,
  totalLessons: 14,
  enrolledCount: 221,
  rating: 4.7,
  durationHours: 9,
  contentTypes: ['video', 'text'],
  isEnrolled: false,
  isFeatured: false
},
{
  id: 'course-008',
  title_en: 'The Kidasie: Understanding the Divine Liturgy',
  title_am: 'ቅዳሴ: ቅዱሱን ቅዳሴ መረዳት',
  description_en: 'A deep-dive into the Ethiopian Orthodox Divine Liturgy (Kidasie) — its structure, prayers, anaphoras, and theological significance.',
  description_am: 'የኢትዮጵያ ኦርቶዶክስ ቅዱስ ቅዳሴ (ቅዳሴ) ጥልቅ ጥናት — አወቃቀሩ፣ ጸሎቶቹ፣ ቅዳሴዎቹ እና ሥነ-መለኮታዊ ጠቀሜታው።',
  instructor: 'Deaconess Miriam Tadesse',
  thumbnail: "https://images.unsplash.com/photo-1665069186845-9078b715fe59",
  thumbnailAlt: 'Ornate Ethiopian Orthodox church altar with golden decorations and candles',
  target_group: 'college',
  price_usd: 24.99,
  totalLessons: 22,
  enrolledCount: 167,
  rating: 4.9,
  durationHours: 13,
  contentTypes: ['video', 'pdf', 'text', 'live'],
  isEnrolled: false,
  isFeatured: false
}];


const GROUP_FILTERS: {value: StudentGroup;labelKey: string;}[] = [
{ value: 'all', labelKey: 'catalog.allGroups' },
{ value: 'middle', labelKey: 'catalog.middle' },
{ value: 'high', labelKey: 'catalog.high' },
{ value: 'college', labelKey: 'catalog.college' },
{ value: 'deacon', labelKey: 'catalog.deacon' }];


const contentTypeIcon: Record<string, React.ElementType> = {
  video: Play,
  pdf: FileText,
  text: BookOpen,
  quiz: BookOpen,
  live: Video
};

function CourseCard({ course }: {course: Course;}) {
  const { t, isAmharic } = useLanguage();
  const title = isAmharic ? course.title_am : course.title_en;
  const description = isAmharic ? course.description_am : course.description_en;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 group flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        <AppImage
          src={course.thumbnail}
          alt={course.thumbnailAlt}
          width={400}
          height={176}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
        {/* Badges overlay */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5 flex-wrap">
          {course.isFeatured &&
          <span className="text-[10px] font-700 uppercase tracking-wider bg-accent text-foreground px-2 py-0.5 rounded-full">
              Featured
            </span>
          }
          {course.isEnrolled &&
          <span className="text-[10px] font-700 uppercase tracking-wider bg-positive text-white px-2 py-0.5 rounded-full">
              {t('catalog.enrolled')}
            </span>
          }
        </div>
        {/* Price badge */}
        <div className="absolute top-2.5 right-2.5">
          {course.price_usd === null ?
          <span className="text-xs font-700 bg-positive text-white px-2 py-1 rounded-lg">
              {t('catalog.free')}
            </span> :

          <span className="text-xs font-700 bg-foreground/80 text-white px-2 py-1 rounded-lg">
              ${course.price_usd}
            </span>
          }
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Badge variant={course.target_group === 'all' ? 'college' : course.target_group as any}>
              {t(`catalog.${course.target_group}`)}
            </Badge>
          </div>
          <h3 className={`text-sm font-700 text-foreground leading-snug line-clamp-2 ${isAmharic ? 'font-ethiopic' : ''}`}>
            {title}
          </h3>
          <p className={`text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed ${isAmharic ? 'font-ethiopic' : ''}`}>
            {description}
          </p>
        </div>

        {/* Instructor */}
        <p className="text-xs text-muted-foreground font-500">{course.instructor}</p>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star size={11} className="text-accent fill-accent" />
            <span className="font-700 text-foreground">{course.rating}</span>
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={11} />
            {course.totalLessons} {t('catalog.lessons')}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {course.durationHours}h
          </span>
          <span className="flex items-center gap-1">
            <Users size={11} />
            {course.enrolledCount}
          </span>
        </div>

        {/* Content types */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {course.contentTypes.map((type) =>
          <Badge key={type} variant={type as any}>
              {type.toUpperCase()}
            </Badge>
          )}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-1">
          {course.isEnrolled ?
          <Link
            href="/course-detail-lesson-player"
            className="w-full flex items-center justify-center gap-2 py-2.5 gradient-primary text-primary-foreground text-sm font-700 rounded-lg hover:opacity-90 transition-all scale-click">
            
              <Play size={13} />
              {t('dashboard.resume')}
            </Link> :

          <button className="w-full flex items-center justify-center gap-2 py-2.5 gradient-primary text-primary-foreground text-sm font-700 rounded-lg hover:opacity-90 transition-all scale-click">
              {t('catalog.enroll')}
            </button>
          }
        </div>
      </div>
    </div>);

}

export default function CourseCatalog() {
  const { t, isAmharic } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState<StudentGroup>('all');

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      const matchesGroup = activeGroup === 'all' || course.target_group === activeGroup || course.target_group === 'all';
      const query = searchQuery.toLowerCase();
      const matchesSearch =
      !query ||
      course.title_en.toLowerCase().includes(query) ||
      course.title_am.includes(query) ||
      course.instructor.toLowerCase().includes(query) ||
      course.description_en.toLowerCase().includes(query);
      return matchesGroup && matchesSearch;
    });
  }, [searchQuery, activeGroup]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-6 lg:px-8 xl:px-10">
        <div className="max-w-screen-2xl mx-auto">
          <h1 className={`text-2xl font-700 text-foreground ${isAmharic ? 'font-ethiopic' : ''}`}>
            {t('catalog.title')}
          </h1>
          <p className={`text-sm text-muted-foreground mt-1 ${isAmharic ? 'font-ethiopic' : ''}`}>
            {t('catalog.subtitle')}
          </p>

          {/* Search + Filter row */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('catalog.search')}
                className={`w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all ${isAmharic ? 'font-ethiopic' : ''}`} />
              
            </div>

            {/* Group filter */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <SlidersHorizontal size={14} className="text-muted-foreground shrink-0" />
              {GROUP_FILTERS.map((filter) =>
              <button
                key={filter.value}
                onClick={() => setActiveGroup(filter.value)}
                className={`px-3 py-1.5 text-xs font-600 rounded-lg transition-all scale-click ${
                activeGroup === filter.value ?
                'gradient-primary text-primary-foreground' :
                'bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground border border-border'} ${
                isAmharic ? 'font-ethiopic' : ''}`}>
                
                  {t(filter.labelKey)}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="px-6 py-6 lg:px-8 xl:px-10 max-w-screen-2xl mx-auto">
        {/* Results count */}
        <p className="text-xs text-muted-foreground mb-4 font-500">
          {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
        </p>

        {filteredCourses.length === 0 ?
        <div className="text-center py-20">
            <BookOpen size={40} className="text-muted-foreground mx-auto mb-3 opacity-40" />
            <p className={`text-sm text-muted-foreground ${isAmharic ? 'font-ethiopic' : ''}`}>
              {t('catalog.noResults')}
            </p>
          </div> :

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredCourses.map((course) =>
          <CourseCard key={course.id} course={course} />
          )}
          </div>
        }
      </div>
    </div>);

}
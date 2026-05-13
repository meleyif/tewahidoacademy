'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Download, MessageSquare, ThumbsUp, FileText, AlignLeft } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import QuizPlayer from './QuizPlayer';
import Badge from '@/components/ui/Badge';
import { useLanguage } from '@/lib/LanguageContext';

type LessonView = 'video' | 'quiz' | 'live' | 'pdf' | 'text';

const lessonData = {
  id: 'lesson-007',
  title: 'The Holy Trinity in Tewahido Theology',
  titleAm: 'ቅድስት ሥላሴ በተዋሕዶ ሥነ-መለኮት',
  type: 'video' as LessonView,
  durationMin: 28,
  instructor: 'Deaconess Miriam Tadesse',
  module: 'Module 2: Theology and Doctrine',
  description: `In this lesson, we explore the Ethiopian Orthodox Tewahido Church's unique theological articulation of the Holy Trinity — the Father, Son (Iyesus Kristos), and the Holy Spirit. Unlike Western Trinitarian formulations, the Tewahido tradition emphasizes the inseparable unity of the three persons while affirming the complete divine nature of Christ.

We will examine key Ge'ez theological terms, references from the Anaphora of the Apostles, and how this doctrine shapes daily liturgical practice and prayer.`,
  descriptionAm: 'ይህ ትምህርት ስለ ቅድስት ሥላሴ — አብ፣ ወልድ፣ እና መንፈስ ቅዱስ — የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ትምህርት ያብራራል። ከምዕራባዊ ሥላሴ ቀመሮች በተለየ፣ የተዋሕዶ ወግ ሦስቱ አካላት የማይነጣጠሉ አንድነት ላይ ያተኩራል።',
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  thumbnailUrl: 'https://images.unsplash.com/photo-1598520058913-745d0a55859a',
  thumbnailAlt: 'Open ancient religious manuscript with illuminated text and ornate decorations',
  // PDF content
  pdfUrl: '/assets/sample-lesson.pdf',
  pdfTitle_en: 'Trinitarian Theology — Study Notes',
  pdfTitle_am: 'ሥላሴ ሥነ-መለኮት — የጥናት ማስታወሻዎች',
  // Text content
  textContent_en: `## The Holy Trinity in Ethiopian Orthodox Tewahido Theology

The Ethiopian Orthodox Tewahido Church holds a distinctive Christological and Trinitarian theology rooted in the Council of Ephesus (431 AD) and the tradition of the Oriental Orthodox churches.

### The Three Persons

**The Father (አብ — Ab):** The first person of the Holy Trinity, the eternal source and origin of all being. In Ge'ez liturgical texts, the Father is addressed as "Egziabher Ab" (Lord Father).

**The Son (ወልድ — Weld):** Jesus Christ, the second person of the Trinity. The Tewahido Church affirms the complete divine and human nature of Christ united in one nature (Miaphysitism) — distinct from both Nestorianism and Chalcedonian Dyophysitism.

**The Holy Spirit (መንፈስ ቅዱስ — Menfes Qidus):** The third person, the life-giver and sanctifier. The Spirit proceeds from the Father alone (rejecting the Western Filioque addition).

### The Anaphora of the Apostles

The primary Eucharistic prayer of the Tewahido Church, the Anaphora of the Apostles (ቅዳሴ ሐዋርያት), opens with a profound Trinitarian doxology that encapsulates this theology in liturgical form.

### Key Ge'ez Terms

- **ሥላሴ (Silase)** — Trinity
- **አካላት (Akalat)** — Persons (of the Trinity)
- **ተዋሕዶ (Tewahido)** — Union/Unity (referring to the union of Christ's natures)
- **ቅዱስ (Qidus)** — Holy`,
  textContent_am: `## ቅድስት ሥላሴ በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ሥነ-መለኮት

የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን በ431 ዓ.ም. በኤፌሶን ጉባኤ እና በምስራቃዊ ኦርቶዶክስ አብያተ ክርስቲያናት ወግ ላይ የተመሠረተ ልዩ የክርስቶሎጂ እና ሥላሴ ሥነ-መለኮት አላት።

### ሦስቱ አካላት

**አብ:** የቅድስት ሥላሴ የመጀመሪያ አካል፣ የሁሉ ነገር ዘላለማዊ ምንጭ እና መነሻ። በግዕዝ ቅዳሴ ጽሑፎች ውስጥ አብ "እግዚአብሔር አብ" ተብሎ ይጠራል።

**ወልድ:** ኢየሱስ ክርስቶስ፣ የሥላሴ ሁለተኛ አካል። የተዋሕዶ ቤተ ክርስቲያን የክርስቶስን ሙሉ መለኮታዊ እና ሰዋዊ ተፈጥሮ በአንድ ተፈጥሮ (ሚያፊዚቲዝም) ያረጋግጣል።

**መንፈስ ቅዱስ:** ሦስተኛ አካል፣ ሕይወት ሰጪ እና ቀዳሽ። መንፈስ ከአብ ብቻ ይወጣል።`,
  resources: [
    { id: 'res-001', name: 'Trinitarian Theology — Study Notes.pdf', size: '1.2 MB' },
    { id: 'res-002', name: "Anaphora of the Apostles — Ge\'ez Text.pdf", size: '840 KB' },
  ],
  prevLesson: { id: 'lesson-006', title: 'Monophysitism vs Miaphysitism' },
  nextLesson: { id: 'lesson-008', title: 'Saints, Intercession, and the Theotokos' },
};

const tabs = [
  { id: 'overview', label_en: 'Overview', label_am: 'አጠቃላይ እይታ' },
  { id: 'resources', label_en: 'Resources', label_am: 'ሀብቶች' },
  { id: 'discussion', label_en: 'Discussion', label_am: 'ውይይት' },
];

// PDF Viewer Component
function PDFViewer({ title_en, title_am }: { title_en: string; title_am: string }) {
  const { isAmharic } = useLanguage();
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* PDF toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-2">
          <FileText size={15} className="text-accent" />
          <span className={`text-sm font-700 text-foreground ${isAmharic ? 'font-ethiopic' : ''}`}>
            {isAmharic ? title_am : title_en}
          </span>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-700 text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors scale-click">
          <Download size={12} />
          Download PDF
        </button>
      </div>
      {/* PDF embed area */}
      <div className="bg-muted/30 flex flex-col items-center justify-center py-16 px-8 gap-4">
        <div className="w-16 h-20 bg-card border-2 border-border rounded-lg flex items-center justify-center shadow-card">
          <FileText size={28} className="text-accent" />
        </div>
        <div className="text-center">
          <p className={`text-sm font-700 text-foreground ${isAmharic ? 'font-ethiopic' : ''}`}>
            {isAmharic ? title_am : title_en}
          </p>
          <p className="text-xs text-muted-foreground mt-1">PDF Document · 1.2 MB</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2 gradient-primary text-primary-foreground text-xs font-700 rounded-lg hover:opacity-90 transition-all scale-click">
            <FileText size={12} />
            Open PDF
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-secondary border border-border text-foreground text-xs font-700 rounded-lg hover:bg-muted transition-all scale-click">
            <Download size={12} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

// Text/Article Viewer Component
function TextViewer({ content_en, content_am }: { content_en: string; content_am: string }) {
  const { isAmharic } = useLanguage();
  const content = isAmharic ? content_am : content_en;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
        <AlignLeft size={15} className="text-info" />
        <span className="text-sm font-700 text-foreground">Reading Material</span>
      </div>
      <div className={`p-6 prose prose-sm max-w-none text-foreground leading-relaxed ${isAmharic ? 'font-ethiopic' : ''}`}>
        {content.split('\n').map((line, i) => {
          if (line.startsWith('## ')) {
            return <h2 key={i} className="text-lg font-700 text-foreground mt-4 mb-2">{line.replace('## ', '')}</h2>;
          }
          if (line.startsWith('### ')) {
            return <h3 key={i} className="text-base font-700 text-foreground mt-3 mb-1.5">{line.replace('### ', '')}</h3>;
          }
          if (line.startsWith('**') && line.endsWith('**')) {
            return <p key={i} className="font-700 text-foreground mt-2">{line.replace(/\*\*/g, '')}</p>;
          }
          if (line.startsWith('- **')) {
            const parts = line.replace('- **', '').split('**');
            return (
              <p key={i} className="text-sm text-muted-foreground mt-1 ml-4">
                <span className="font-700 text-foreground">{parts[0]}</span>
                {parts[1]}
              </p>
            );
          }
          if (line.trim() === '') return <div key={i} className="h-2" />;
          return <p key={i} className="text-sm text-muted-foreground leading-relaxed">{line}</p>;
        })}
      </div>
    </div>
  );
}

export default function LessonPlayerArea() {
  const [activeTab, setActiveTab] = useState('overview');
  const [lessonType] = useState<LessonView>(lessonData.type);
  const [isCompleted, setIsCompleted] = useState(false);
  const { language, setLanguage, isAmharic } = useLanguage();

  return (
    <div className="flex-1 min-w-0 overflow-y-auto scrollbar-thin bg-background">
      <div className="max-w-4xl mx-auto px-4 py-5 lg:px-8 xl:px-10 space-y-5 2xl:max-w-5xl">

        {/* Lesson Title */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="video">Video</Badge>
            <span className="text-xs text-muted-foreground font-500">{lessonData.module}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground tabular-nums">{lessonData.durationMin} min</span>
          </div>
          <h2 className={`text-xl font-700 text-foreground leading-snug ${isAmharic ? 'font-ethiopic' : ''}`}>
            {isAmharic ? lessonData.titleAm : lessonData.title}
          </h2>
          <p className="text-sm text-muted-foreground font-500">{lessonData.instructor}</p>
        </div>

        {/* Main Content Area — supports video, pdf, text, quiz, live */}
        {lessonType === 'video' && <VideoPlayer />}
        {lessonType === 'pdf' && (
          <PDFViewer title_en={lessonData.pdfTitle_en} title_am={lessonData.pdfTitle_am} />
        )}
        {lessonType === 'text' && (
          <TextViewer content_en={lessonData.textContent_en} content_am={lessonData.textContent_am} />
        )}
        {lessonType === 'quiz' && <QuizPlayer />}
        {lessonType === 'live' && (
          <div className="bg-info-bg border border-info/20 rounded-xl p-8 text-center space-y-4">
            <span className="text-4xl" aria-label="Live session">🎥</span>
            <h3 className="text-lg font-700 text-foreground">Live Session — Starting Soon</h3>
            <p className="text-sm text-muted-foreground">This is a live virtual classroom session scheduled for today at 7:00 PM EST.</p>
            <button className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-primary-foreground font-700 rounded-lg hover:opacity-90 transition-all scale-click">
              Join Zoom Session
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-sm font-600 border-b-2 transition-all ${isAmharic ? 'font-ethiopic' : ''} ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {isAmharic ? tab.label_am : tab.label_en}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-4 fade-in">
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-700 text-foreground ${isAmharic ? 'font-ethiopic' : ''}`}>
                {isAmharic ? 'ስለዚህ ትምህርት' : 'About this lesson'}
              </h3>
              <button
                onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
                className="flex items-center gap-1.5 text-xs font-600 text-muted-foreground hover:text-foreground border border-border px-2.5 py-1 rounded-lg transition-colors"
              >
                <BookOpen size={12} />
                {isAmharic ? 'View in English' : 'View in አማርኛ'}
              </button>
            </div>
            <div className={`text-sm text-muted-foreground leading-relaxed whitespace-pre-line ${isAmharic ? 'font-ethiopic' : ''}`}>
              {isAmharic ? lessonData.descriptionAm : lessonData.description}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-3 fade-in">
            <h3 className={`text-sm font-700 text-foreground ${isAmharic ? 'font-ethiopic' : ''}`}>
              {isAmharic ? 'የትምህርት ቁሳቁሶች' : 'Lesson Materials'}
            </h3>
            {lessonData.resources.map((res) => (
              <div
                key={res.id}
                className="flex items-center justify-between gap-3 p-3.5 bg-card border border-border rounded-lg hover:bg-secondary/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-warning-bg flex items-center justify-center">
                    <BookOpen size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-600 text-foreground">{res.name}</p>
                    <p className="text-xs text-muted-foreground">{res.size}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-700 text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors scale-click">
                  <Download size={12} />
                  Download
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'discussion' && (
          <div className="space-y-4 fade-in">
            <h3 className={`text-sm font-700 text-foreground ${isAmharic ? 'font-ethiopic' : ''}`}>
              {isAmharic ? 'የትምህርት ውይይት' : 'Lesson Discussion'}
            </h3>
            {[
              { id: 'disc-001', user: 'Selam Habtamu', avatar: 'SH', time: '1 day ago', text: "The distinction between Miaphysitism and Monophysitism was so clearly explained — I've been confused about this for years!", likes: 4 },
              { id: 'disc-002', user: 'Dawit Mengistu', avatar: 'DM', time: '2 days ago', text: "Could Deaconess Miriam recommend a Ge'ez source text that covers the Trinitarian doxologies used in the Kidasie?", likes: 2 },
              { id: 'disc-003', user: 'Tigist Bekele', avatar: 'TB', time: '3 days ago', text: 'Lesson 6 and 7 together really build on each other. I recommend reading the Anaphora PDF before watching this video.', likes: 7 },
            ].map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[11px] font-700 text-primary-foreground">{comment.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-700 text-foreground">{comment.user}</span>
                    <span className="text-xs text-muted-foreground">{comment.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{comment.text}</p>
                  <button className="flex items-center gap-1 mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <ThumbsUp size={12} />
                    <span className="font-500 tabular-nums">{comment.likes}</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Comment input */}
            <div className="flex gap-3 pt-2 border-t border-border">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center shrink-0">
                <span className="text-[11px] font-700 text-primary-foreground">YA</span>
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  placeholder={isAmharic ? 'ጥያቄ ይጠይቁ ወይም ሀሳብ ያካፍሉ…' : 'Ask a question or share an insight…'}
                  className={`flex-1 px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all ${isAmharic ? 'font-ethiopic' : ''}`}
                />
                <button className="flex items-center gap-1.5 px-3 py-2 gradient-primary text-primary-foreground text-xs font-700 rounded-lg hover:opacity-90 transition-all scale-click">
                  <MessageSquare size={12} />
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation: Prev / Next Lesson */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-border bg-card rounded-lg text-sm font-600 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all scale-click">
            <ChevronLeft size={15} />
            <div className="text-left hidden sm:block">
              <p className={`text-[10px] uppercase tracking-wider text-muted-foreground font-600 ${isAmharic ? 'font-ethiopic normal-case' : ''}`}>
                {isAmharic ? 'ቀዳሚ' : 'Previous'}
              </p>
              <p className="text-xs font-600 text-foreground truncate max-w-[160px]">{lessonData.prevLesson.title}</p>
            </div>
          </button>

          {/* Mark Complete */}
          <button
            onClick={() => setIsCompleted(!isCompleted)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-700 transition-all scale-click ${isAmharic ? 'font-ethiopic' : ''} ${
              isCompleted
                ? 'bg-positive-bg text-positive border border-positive/20' :'gradient-primary text-primary-foreground hover:opacity-90'
            }`}
          >
            {isCompleted
              ? (isAmharic ? '✓ ተጠናቅቋል' : '✓ Completed')
              : (isAmharic ? 'እንደ ተጠናቀቀ ምልክት አድርግ' : 'Mark as Complete')}
          </button>

          <button className="flex items-center gap-2 px-4 py-2.5 border border-border bg-card rounded-lg text-sm font-600 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all scale-click">
            <div className="text-right hidden sm:block">
              <p className={`text-[10px] uppercase tracking-wider text-muted-foreground font-600 ${isAmharic ? 'font-ethiopic normal-case' : ''}`}>
                {isAmharic ? 'ቀጣይ' : 'Next'}
              </p>
              <p className="text-xs font-600 text-foreground truncate max-w-[160px]">{lessonData.nextLesson.title}</p>
            </div>
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

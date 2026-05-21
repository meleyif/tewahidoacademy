'use client';

import React, { useState } from 'react';
import {
  Layers,
  Plus,
  ChevronDown,
  ChevronRight,
  Video,
  FileText,
  HelpCircle,
  Radio,
  Upload,
  GripVertical,
  Lock,
  Unlock,
  Trash2,
  X,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'text' | 'quiz' | 'live';
  duration: string;
  isFreePreview: boolean;
}

interface Module {
  id: string;
  title: string;
  isLocked: boolean;
  lessons: Lesson[];
  expanded: boolean;
}

const lessonTypeIcon = {
  video: Video,
  pdf: FileText,
  text: FileText,
  quiz: HelpCircle,
  live: Radio,
};

const lessonTypeColor = {
  video: 'text-info',
  pdf: 'text-warning',
  text: 'text-muted-foreground',
  quiz: 'text-positive',
  live: 'text-danger',
};

const initialModules: Module[] = [
  {
    id: 'm-001',
    title: 'Module 1: Introduction & Overview',
    isLocked: false,
    expanded: true,
    lessons: [
      {
        id: 'l-001',
        title: 'Welcome to the Course',
        type: 'video',
        duration: '8 min',
        isFreePreview: true,
      },
      {
        id: 'l-002',
        title: 'Course Materials & Resources',
        type: 'pdf',
        duration: '5 min',
        isFreePreview: false,
      },
      {
        id: 'l-003',
        title: 'Module 1 Quiz',
        type: 'quiz',
        duration: '10 min',
        isFreePreview: false,
      },
    ],
  },
  {
    id: 'm-002',
    title: 'Module 2: Core Theology',
    isLocked: false,
    expanded: false,
    lessons: [
      {
        id: 'l-004',
        title: 'The Holy Trinity in Tewahido',
        type: 'video',
        duration: '22 min',
        isFreePreview: false,
      },
      {
        id: 'l-005',
        title: 'Sacred Texts Reading',
        type: 'text',
        duration: '15 min',
        isFreePreview: false,
      },
      {
        id: 'l-006',
        title: 'Live Q&A Session',
        type: 'live',
        duration: '60 min',
        isFreePreview: false,
      },
    ],
  },
  {
    id: 'm-003',
    title: 'Module 3: Liturgical Practices',
    isLocked: true,
    expanded: false,
    lessons: [
      {
        id: 'l-007',
        title: 'Kidasie Fundamentals',
        type: 'video',
        duration: '18 min',
        isFreePreview: false,
      },
      {
        id: 'l-008',
        title: 'Practice Assessment',
        type: 'quiz',
        duration: '12 min',
        isFreePreview: false,
      },
    ],
  },
];

interface UploadLessonModalProps {
  moduleTitle: string;
  onClose: () => void;
}

function UploadLessonModal({ moduleTitle, onClose }: UploadLessonModalProps) {
  const [lessonType, setLessonType] = useState<'video' | 'pdf' | 'text' | 'quiz' | 'live'>('video');
  const [title, setTitle] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 fade-in">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-700 text-foreground">Add Lesson</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{moduleTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
            aria-label="Close"
          >
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Lesson Type */}
          <div>
            <label className="text-xs font-600 text-muted-foreground uppercase tracking-wider block mb-2">
              Content Type
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {(['video', 'pdf', 'text', 'quiz', 'live'] as const).map((t) => {
                const Icon = lessonTypeIcon[t];
                return (
                  <button
                    key={t}
                    onClick={() => setLessonType(t)}
                    className={`flex flex-col items-center gap-1 py-2.5 rounded-lg border text-xs font-600 transition-colors ${
                      lessonType === t
                        ? 'bg-primary/10 border-primary/40 text-primary'
                        : 'bg-card border-border text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    <Icon size={14} />
                    <span className="capitalize">{t}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-600 text-muted-foreground uppercase tracking-wider block mb-1.5">
              Lesson Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter lesson title…"
              className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
            />
          </div>

          {/* File Upload (for video/pdf) */}
          {(lessonType === 'video' || lessonType === 'pdf') && (
            <div>
              <label className="text-xs font-600 text-muted-foreground uppercase tracking-wider block mb-1.5">
                Upload {lessonType === 'video' ? 'Video File' : 'PDF Document'}
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                }}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                  isDragging
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/40 hover:bg-secondary/50'
                }`}
              >
                <Upload size={20} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-600 text-foreground">
                  Drop file here or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {lessonType === 'video' ? 'MP4, MOV up to 2GB' : 'PDF up to 50MB'}
                </p>
              </div>
            </div>
          )}

          {/* Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-600 text-muted-foreground uppercase tracking-wider block mb-1.5">
                Duration (min)
              </label>
              <input
                type="number"
                placeholder="15"
                min="1"
                className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border accent-primary" />
                <span className="text-sm font-500 text-foreground">Free Preview</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-600 text-muted-foreground bg-secondary border border-border rounded-lg hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-700 gradient-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all scale-click"
          >
            Add Lesson
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ModuleLessonEditor() {
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [uploadModal, setUploadModal] = useState<{ open: boolean; moduleTitle: string }>({
    open: false,
    moduleTitle: '',
  });
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [showAddModule, setShowAddModule] = useState(false);

  const toggleExpand = (id: string) => {
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, expanded: !m.expanded } : m)));
  };

  const toggleLock = (id: string) => {
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, isLocked: !m.isLocked } : m)));
  };

  const removeModule = (id: string) => {
    setModules((prev) => prev.filter((m) => m.id !== id));
  };

  const addModule = () => {
    if (!newModuleTitle.trim()) return;
    const newMod: Module = {
      id: `m-${Date.now()}`,
      title: newModuleTitle.trim(),
      isLocked: false,
      expanded: true,
      lessons: [],
    };
    setModules((prev) => [...prev, newMod]);
    setNewModuleTitle('');
    setShowAddModule(false);
  };

  return (
    <>
      <section aria-label="Module and lesson editor">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-primary" />
            <h2 className="text-base font-700 text-foreground">Modules & Lessons</h2>
            <span className="text-xs font-600 text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {modules.length} modules
            </span>
          </div>
          <button
            onClick={() => setShowAddModule(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-700 gradient-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all scale-click"
          >
            <Plus size={12} />
            Add Module
          </button>
        </div>

        <div className="space-y-2">
          {modules.map((module, idx) => (
            <div
              key={module.id}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-card"
            >
              {/* Module Header */}
              <div className="flex items-center gap-2 px-3 py-3 hover:bg-secondary/50 transition-colors">
                <GripVertical size={14} className="text-muted-foreground/40 cursor-grab shrink-0" />
                <button
                  onClick={() => toggleExpand(module.id)}
                  className="flex items-center gap-2 flex-1 min-w-0 text-left"
                >
                  {module.expanded ? (
                    <ChevronDown size={14} className="text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronRight size={14} className="text-muted-foreground shrink-0" />
                  )}
                  <span className="text-xs font-700 text-foreground truncate">{module.title}</span>
                  <span className="text-[10px] text-muted-foreground font-500 shrink-0">
                    {module.lessons.length} lessons
                  </span>
                </button>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => toggleLock(module.id)}
                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-muted transition-colors"
                    aria-label={module.isLocked ? 'Unlock module' : 'Lock module'}
                    title={
                      module.isLocked ? 'Locked — click to unlock' : 'Unlocked — click to lock'
                    }
                  >
                    {module.isLocked ? (
                      <Lock size={12} className="text-warning" />
                    ) : (
                      <Unlock size={12} className="text-muted-foreground" />
                    )}
                  </button>
                  <button
                    onClick={() => setUploadModal({ open: true, moduleTitle: module.title })}
                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-muted transition-colors"
                    aria-label="Add lesson"
                    title="Add lesson"
                  >
                    <Plus size={12} className="text-primary" />
                  </button>
                  <button
                    onClick={() => removeModule(module.id)}
                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-danger-bg transition-colors"
                    aria-label="Remove module"
                    title="Remove module"
                  >
                    <Trash2 size={12} className="text-muted-foreground hover:text-danger" />
                  </button>
                </div>
              </div>

              {/* Lessons */}
              {module.expanded && (
                <div className="border-t border-border">
                  {module.lessons.length === 0 ? (
                    <div className="px-4 py-4 text-center">
                      <p className="text-xs text-muted-foreground">No lessons yet.</p>
                      <button
                        onClick={() => setUploadModal({ open: true, moduleTitle: module.title })}
                        className="mt-2 text-xs font-600 text-primary hover:underline"
                      >
                        + Add first lesson
                      </button>
                    </div>
                  ) : (
                    module.lessons.map((lesson, lIdx) => {
                      const LessonIcon = lessonTypeIcon[lesson.type];
                      return (
                        <div
                          key={lesson.id}
                          className={`flex items-center gap-3 px-4 py-2.5 hover:bg-secondary/40 transition-colors ${
                            lIdx < module.lessons.length - 1 ? 'border-b border-border/50' : ''
                          }`}
                        >
                          <GripVertical
                            size={12}
                            className="text-muted-foreground/30 cursor-grab shrink-0"
                          />
                          <div
                            className={`w-6 h-6 rounded-md bg-muted flex items-center justify-center shrink-0`}
                          >
                            <LessonIcon size={12} className={lessonTypeColor[lesson.type]} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-600 text-foreground truncate">
                              {lesson.title}
                            </p>
                            <p className="text-[10px] text-muted-foreground">{lesson.duration}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {lesson.isFreePreview && (
                              <span className="text-[10px] font-700 text-positive bg-positive-bg border border-positive/20 px-1.5 py-0.5 rounded-full">
                                Free
                              </span>
                            )}
                            <button
                              className="w-5 h-5 flex items-center justify-center rounded hover:bg-danger-bg transition-colors"
                              aria-label="Remove lesson"
                            >
                              <Trash2
                                size={10}
                                className="text-muted-foreground hover:text-danger"
                              />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                  {/* Add lesson inline */}
                  <button
                    onClick={() => setUploadModal({ open: true, moduleTitle: module.title })}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-600 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors border-t border-border/50"
                  >
                    <Upload size={11} />
                    Upload lesson content
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Add Module Inline */}
          {showAddModule ? (
            <div className="bg-card border border-primary/30 rounded-xl p-3 shadow-card">
              <input
                type="text"
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addModule();
                  if (e.key === 'Escape') setShowAddModule(false);
                }}
                placeholder="Module title…"
                autoFocus
                className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors mb-2"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAddModule(false)}
                  className="flex-1 py-1.5 text-xs font-600 text-muted-foreground bg-secondary border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addModule}
                  className="flex-1 py-1.5 text-xs font-700 gradient-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all"
                >
                  Add Module
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddModule(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-200 group"
            >
              <Plus size={14} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-600">Add new module</span>
            </button>
          )}
        </div>
      </section>

      {uploadModal.open && (
        <UploadLessonModal
          moduleTitle={uploadModal.moduleTitle}
          onClose={() => setUploadModal({ open: false, moduleTitle: '' })}
        />
      )}
    </>
  );
}

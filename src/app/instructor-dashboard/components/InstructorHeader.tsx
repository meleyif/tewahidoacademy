'use client';

import React, { useState } from 'react';
import { Bell, Search, Plus, X } from 'lucide-react';

interface CreateCourseModalProps {
  onClose: () => void;
}

function CreateCourseModal({ onClose }: CreateCourseModalProps) {
  const [form, setForm] = useState({
    titleEn: '',
    titleAm: '',
    descriptionEn: '',
    targetGroup: 'college',
    priceUsd: '',
    status: 'draft',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6 fade-in">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-700 text-foreground">Create New Course</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors" aria-label="Close">
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-600 text-muted-foreground uppercase tracking-wider block mb-1.5">Title (English)</label>
              <input
                type="text"
                value={form.titleEn}
                onChange={e => setForm(f => ({ ...f, titleEn: e.target.value }))}
                placeholder="Course title in English"
                className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-600 text-muted-foreground uppercase tracking-wider block mb-1.5">Title (Amharic)</label>
              <input
                type="text"
                value={form.titleAm}
                onChange={e => setForm(f => ({ ...f, titleAm: e.target.value }))}
                placeholder="የኮርስ ርዕስ"
                className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground font-ethiopic focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-600 text-muted-foreground uppercase tracking-wider block mb-1.5">Description</label>
            <textarea
              value={form.descriptionEn}
              onChange={e => setForm(f => ({ ...f, descriptionEn: e.target.value }))}
              placeholder="Describe what students will learn…"
              rows={3}
              className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-600 text-muted-foreground uppercase tracking-wider block mb-1.5">Target Group</label>
              <select
                value={form.targetGroup}
                onChange={e => setForm(f => ({ ...f, targetGroup: e.target.value }))}
                className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
              >
                <option value="middle">Middle School (11–14)</option>
                <option value="high">High School (15–18)</option>
                <option value="college">College Students</option>
                <option value="deacon">Deacons (Clergy)</option>
                <option value="all">All Groups</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-600 text-muted-foreground uppercase tracking-wider block mb-1.5">Price (USD)</label>
              <input
                type="number"
                value={form.priceUsd}
                onChange={e => setForm(f => ({ ...f, priceUsd: e.target.value }))}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-600 text-muted-foreground uppercase tracking-wider block mb-1.5">Initial Status</label>
            <div className="flex gap-2">
              {['draft', 'published'].map(s => (
                <button
                  key={s}
                  onClick={() => setForm(f => ({ ...f, status: s }))}
                  className={`flex-1 py-2 text-sm font-600 rounded-lg border transition-colors ${
                    form.status === s
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-muted-foreground border-border hover:bg-secondary'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 text-sm font-600 text-muted-foreground bg-secondary border border-border rounded-lg hover:bg-muted transition-colors">
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-700 gradient-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all scale-click"
          >
            Create Course
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InstructorHeader() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border px-6 py-4 lg:px-8 xl:px-10 2xl:px-12">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-700 text-foreground">
              Instructor Studio ✞
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Deaconess Miriam Tadesse — manage your courses and track student progress.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-muted rounded-lg border border-border text-muted-foreground text-sm w-52 cursor-pointer hover:border-primary/40 transition-colors">
              <Search size={14} />
              <span className="font-500">Search courses…</span>
            </div>

            <button className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary transition-colors" aria-label="View notifications">
              <Bell size={16} className="text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger" />
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 gradient-primary text-primary-foreground text-sm font-700 rounded-lg hover:opacity-90 transition-all scale-click"
            >
              <Plus size={14} />
              New Course
            </button>
          </div>
        </div>
      </div>

      {showModal && <CreateCourseModal onClose={() => setShowModal(false)} />}
    </>
  );
}

import React from 'react';
import AppLayout from '@/components/AppLayout';
import CourseHeader from './components/CourseHeader';
import CourseCurriculumSidebar from './components/CourseCurriculumSidebar';
import LessonPlayerArea from './components/LessonPlayerArea';

export default function CourseDetailLessonPlayerPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background flex flex-col">
        <CourseHeader />
        <div className="flex flex-1 min-h-0">
          <CourseCurriculumSidebar />
          <LessonPlayerArea />
        </div>
      </div>
    </AppLayout>
  );
}
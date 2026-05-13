import React from 'react';
import AppLayout from '@/components/AppLayout';
import InstructorHeader from './components/InstructorHeader';
import EnrollmentMetrics from './components/EnrollmentMetrics';
import CourseManager from './components/CourseManager';
import ModuleLessonEditor from './components/ModuleLessonEditor';

export default function InstructorDashboardPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <InstructorHeader />
        <div className="px-6 pb-8 space-y-6 max-w-screen-2xl mx-auto lg:px-8 xl:px-10 2xl:px-12">
          <EnrollmentMetrics />
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
            <div className="xl:col-span-3">
              <CourseManager />
            </div>
            <div className="xl:col-span-2">
              <ModuleLessonEditor />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

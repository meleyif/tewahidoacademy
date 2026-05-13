import React from 'react';
import AppLayout from '@/components/AppLayout';
import DashboardHeader from './components/DashboardHeader';
import MetricsBentoGrid from './components/MetricsBentoGrid';
import EnrolledCourses from './components/EnrolledCourses';
import UpcomingSessionsPanel from './components/UpcomingSessionsPanel';
import ActivityFeed from './components/ActivityFeed';
import WeeklyStudyChart from './components/WeeklyStudyChart';

export default function StudentDashboardPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="px-6 pb-8 space-y-6 max-w-screen-2xl mx-auto lg:px-8 xl:px-10 2xl:px-12">
          <MetricsBentoGrid />
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
            <div className="lg:col-span-2 xl:col-span-3 2xl:col-span-3 space-y-5">
              <EnrolledCourses />
              <WeeklyStudyChart />
            </div>
            <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1 space-y-5">
              <UpcomingSessionsPanel />
              <ActivityFeed />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
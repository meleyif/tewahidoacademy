'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// BACKEND: GET /api/v1/progress/weekly-summary for actual study hours per day
const weeklyData = [
  { day: 'Mon', hours: 1.2, lessons: 2 },
  { day: 'Tue', hours: 0.5, lessons: 1 },
  { day: 'Wed', hours: 2.1, lessons: 3 },
  { day: 'Thu', hours: 0, lessons: 0 },
  { day: 'Fri', hours: 1.8, lessons: 2 },
  { day: 'Sat', hours: 3.4, lessons: 5 },
  { day: 'Sun', hours: 0.7, lessons: 1 },
];

const todayIndex = 4; // Friday

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const data = weeklyData.find((d) => d.day === label);
  return (
    <div className="bg-card border border-border rounded-lg shadow-modal px-3 py-2 text-xs">
      <p className="font-700 text-foreground mb-1">{label}</p>
      <p className="text-muted-foreground">
        <span className="font-600 text-foreground tabular-nums">{payload[0].value}h</span> study time
      </p>
      {data && (
        <p className="text-muted-foreground">
          <span className="font-600 text-foreground tabular-nums">{data.lessons}</span> lessons
        </p>
      )}
    </div>
  );
}

export default function WeeklyStudyChartInner() {
  const totalHours = weeklyData.reduce((sum, d) => sum + d.hours, 0).toFixed(1);
  const avgHours = (weeklyData.reduce((sum, d) => sum + d.hours, 0) / 7).toFixed(1);

  return (
    <div className="bg-card border border-border rounded-xl shadow-card p-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-sm font-700 text-foreground">Weekly Study Hours</h2>
          <p className="text-xs text-muted-foreground mt-0.5">This week · May 6–12, 2026</p>
        </div>
        <div className="flex items-center gap-4 text-right">
          <div>
            <p className="text-lg font-800 tabular-nums text-foreground">{totalHours}h</p>
            <p className="text-[10px] text-muted-foreground font-500">Total this week</p>
          </div>
          <div>
            <p className="text-lg font-800 tabular-nums text-foreground">{avgHours}h</p>
            <p className="text-[10px] text-muted-foreground font-500">Daily average</p>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={weeklyData} barSize={28} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}h`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.4 }} />
          <Bar dataKey="hours" radius={[5, 5, 0, 0]}>
            {weeklyData.map((entry, index) => (
              <Cell
                key={`cell-day-${entry.day}`}
                fill={
                  index === todayIndex
                    ? 'var(--primary)'
                    : entry.hours === 0
                    ? 'var(--muted)'
                    : 'var(--accent)'
                }
                opacity={index === todayIndex ? 1 : 0.75}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-4 mt-2 pt-2 border-t border-border">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-primary" />
          <span className="text-[11px] text-muted-foreground font-500">Today</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-accent opacity-75" />
          <span className="text-[11px] text-muted-foreground font-500">Study day</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-muted" />
          <span className="text-[11px] text-muted-foreground font-500">No activity</span>
        </div>
      </div>
    </div>
  );
}
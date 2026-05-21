import React from 'react';
import AppLogo from '@/components/ui/AppLogo';

export default function AuthBrand() {
  return (
    <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] relative overflow-hidden flex-col justify-between p-10 gradient-primary">
      {/* Cross pattern overlay */}
      <div className="absolute inset-0 cross-pattern" aria-hidden="true" />
      {/* Decorative circles */}
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/5"
        aria-hidden="true"
      />
      <div
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-black/10"
        aria-hidden="true"
      />
      {/* Top: Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <AppLogo size={40} />
        <div className="flex flex-col">
          <span className="font-800 text-lg text-primary-foreground leading-tight">
            TewahidoAcademy
          </span>
          <span className="text-sm text-white/70 leading-tight">Faith · Knowledge · Heritage</span>
        </div>
      </div>
      {/* Center: Quote */}
      <div className="relative z-10 space-y-6">
        {/* Ge'ez cross symbol */}
        <div className="w-16 h-16 flex items-center justify-center">
          <span className="text-5xl text-accent" aria-label="Ethiopian Orthodox Cross">
            ✞
          </span>
        </div>

        <blockquote className="space-y-3">
          <p className="text-2xl font-700 text-primary-foreground leading-snug">
            &quot;Learn the faith of your fathers,
            <br />
            in the language of your heart.&quot;
          </p>
          <p className="font-ethiopic text-lg text-white/80">&quot;የአባቶቻችሁን እምነት ተማሩ&quot;</p>
        </blockquote>

        <div className="space-y-3">
          {[
            { icon: '📖', text: 'Bilingual courses in English & Amharic' },
            { icon: '🎥', text: 'Live virtual classrooms with ordained instructors' },
            { icon: '🏆', text: 'Verified certificates of completion' },
            { icon: '👨‍👩‍👧', text: 'Family plans for diaspora communities' },
          ]?.map((item) => (
            <div key={`feature-${item?.text?.slice(0, 10)}`} className="flex items-center gap-3">
              <span className="text-base" aria-hidden="true">
                {item?.icon}
              </span>
              <span className="text-sm font-500 text-white/85">{item?.text}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom: Stats */}
      <div className="relative z-10 grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
        {[
          { value: '2,400+', label: 'Enrolled Students' },
          { value: '38', label: 'Active Courses' },
          { value: '14', label: 'Countries' },
        ]?.map((stat) => (
          <div key={`stat-${stat?.label}`} className="text-center">
            <p className="text-xl font-800 text-accent tabular-nums">{stat?.value}</p>
            <p className="text-xs text-white/70 font-500 mt-0.5">{stat?.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

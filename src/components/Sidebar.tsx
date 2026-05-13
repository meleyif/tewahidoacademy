'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { useLanguage } from '@/lib/LanguageContext';
import {
  BookOpen,
  LayoutDashboard,
  Video,
  Award,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  LogOut,
  Globe,
  PenSquare,
  Library,
} from 'lucide-react';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { language, setLanguage, t, isAmharic } = useLanguage();
  const pathname = usePathname();

  const navSections = [
    {
      label: 'Learning',
      items: [
        { href: '/student-dashboard', icon: LayoutDashboard, label: t('nav.myLearning'), badge: null },
        { href: '/course-catalog', icon: Library, label: t('nav.courseCatalog'), badge: null },
        { href: '/course-detail-lesson-player', icon: BookOpen, label: t('nav.courses'), badge: '3' },
        { href: '/student-dashboard', icon: Video, label: t('nav.liveSessions'), badge: '1' },
        { href: '/student-dashboard', icon: Award, label: t('nav.certificates'), badge: null },
      ],
    },
    {
      label: 'Instructor',
      items: [
        { href: '/instructor-dashboard', icon: PenSquare, label: t('nav.instructorStudio'), badge: null },
      ],
    },
    {
      label: 'Community',
      items: [
        { href: '/student-dashboard', icon: Users, label: t('nav.community'), badge: '12' },
        { href: '/student-dashboard', icon: Bell, label: t('nav.notifications'), badge: '4' },
      ],
    },
    {
      label: 'Account',
      items: [
        { href: '/student-dashboard', icon: Settings, label: t('nav.settings'), badge: null },
      ],
    },
  ];

  const isActive = (href: string) => {
    if (href === '/student-dashboard') return pathname === '/student-dashboard' || pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`relative flex flex-col border-r border-border bg-card shrink-0 sidebar-transition ${
        collapsed ? 'w-16' : 'w-60'
      } min-h-screen`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-border ${collapsed ? 'justify-center px-0' : ''}`}>
        <AppLogo size={32} />
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className={`font-bold text-sm text-foreground leading-tight truncate ${isAmharic ? 'font-ethiopic' : ''}`}>TewahidoAcademy</span>
            <span className="text-xs text-muted-foreground leading-tight">Faith Digital Platform</span>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-16 z-10 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center shadow-card hover:bg-secondary transition-colors scale-click"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? (
          <ChevronRight size={12} className="text-muted-foreground" />
        ) : (
          <ChevronLeft size={12} className="text-muted-foreground" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
        {navSections.map((section) => (
          <div key={`section-${section.label}`} className="mb-4">
            {!collapsed && (
              <p className="text-[10px] font-600 uppercase tracking-widest text-muted-foreground px-3 py-1 mb-1">
                {section.label}
              </p>
            )}
            {section.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={`nav-${item.label}`}
                  href={item.href}
                  className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all duration-150 ${
                    active
                      ? 'bg-primary/10 text-primary font-600' :'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  } ${collapsed ? 'justify-center' : ''}`}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon
                    size={18}
                    className={`shrink-0 ${active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}
                  />
                  {!collapsed && (
                    <span className={`text-sm font-500 truncate ${isAmharic ? 'font-ethiopic' : ''}`}>{item.label}</span>
                  )}
                  {item.badge && !collapsed && (
                    <span className="ml-auto text-[10px] font-700 bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 min-w-[18px] text-center leading-none">
                      {item.badge}
                    </span>
                  )}
                  {item.badge && collapsed && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
                  )}
                  {collapsed && (
                    <span className="absolute left-full ml-2 px-2 py-1 text-xs font-500 bg-foreground text-background rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom: Language + User */}
      <div className="border-t border-border p-2 space-y-1">
        {/* Language Toggle */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? `Language: ${language.toUpperCase()}` : undefined}
          aria-label="Toggle language"
        >
          <Globe size={16} className="shrink-0" />
          {!collapsed && (
            <span className={`text-sm font-500 ${isAmharic ? 'font-ethiopic' : ''}`}>
              {language === 'en' ? 'English' : 'አማርኛ'}
            </span>
          )}
          {!collapsed && (
            <span className="ml-auto text-xs font-600 text-accent bg-warning-bg px-1.5 py-0.5 rounded">
              {language.toUpperCase()}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary cursor-pointer transition-colors ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center shrink-0">
            <span className="text-xs font-700 text-primary-foreground">YA</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-600 text-foreground truncate">Yonas Alemu</span>
              <span className="text-xs text-muted-foreground truncate">College Student</span>
            </div>
          )}
          {!collapsed && (
            <LogOut size={14} className="text-muted-foreground shrink-0 hover:text-danger transition-colors" />
          )}
        </div>
      </div>
    </aside>
  );
}
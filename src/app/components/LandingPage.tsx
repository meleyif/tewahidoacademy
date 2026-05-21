import React from 'react';
import Link from 'next/link';
import { BookOpen, Video, Award, Globe } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import AppImage from '@/components/ui/AppImage';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-card border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <AppLogo size={32} />
              <span className="font-bold text-xl text-foreground hidden sm:block">
                TewahidoAcademy
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/course-catalog"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Catalog
              </Link>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/auth/register"
                className="text-sm font-bold bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors shadow-sm"
              >
                Join for Free
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white py-16 sm:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight">
                Learn the faith of your fathers, <br className="hidden lg:block" />
                in the language of your heart.
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                World-class bilingual Ethiopian Orthodox Tewahido education. Master theology,
                Ge&apos;ez, and the Divine Liturgy from ordained instructors anywhere in the world.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                <Link
                  href="/auth/register"
                  className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white text-base font-bold rounded shadow-sm hover:bg-blue-700 hover:shadow-md transition-all text-center"
                >
                  Join for Free
                </Link>
                <Link
                  href="/course-catalog"
                  className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary border border-primary text-base font-bold rounded shadow-sm hover:bg-blue-50 transition-all text-center"
                >
                  Explore Courses
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <AppImage
                  src="https://images.unsplash.com/photo-1665069186845-9078b715fe59"
                  alt="Ethiopian Orthodox Church interior"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-foreground">
                Why learn with TewahidoAcademy?
              </h2>
              <p className="text-lg text-muted-foreground mt-4">
                Designed for the global diaspora, our platform brings authentic Church teachings
                directly to your home with modern educational tools.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Globe,
                  title: 'Bilingual Learning',
                  description: 'Courses available seamlessly in both English and Amharic.',
                },
                {
                  icon: Video,
                  title: 'Live Classrooms',
                  description: 'Interactive Zoom sessions with ordained priests and deacons.',
                },
                {
                  icon: BookOpen,
                  title: 'Structured Curriculum',
                  description: "Step-by-step paths from foundational theology to advanced Ge'ez.",
                },
                {
                  icon: Award,
                  title: 'Verified Certificates',
                  description: 'Earn digital certificates to showcase your educational progress.',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-primary flex items-center justify-center mb-4">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Start your spiritual journey today</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of students across the globe connecting with their faith and heritage.
            </p>
            <Link
              href="/auth/register"
              className="inline-block px-8 py-3.5 bg-white text-primary text-base font-bold rounded shadow-sm hover:bg-gray-50 hover:shadow-md transition-all"
            >
              Sign Up for Free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <AppLogo size={24} />
            <span className="font-bold text-sm text-foreground">TewahidoAcademy</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Faith in Tewahido Digital Academy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

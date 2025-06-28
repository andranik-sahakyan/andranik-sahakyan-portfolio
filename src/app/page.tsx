'use client';

import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ResumeSection from '@/components/ResumeSection';
import ProjectsSection from '@/components/ProjectsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <div className="lg:ml-16">
        <HeroSection />
        <AboutSection />
        <ResumeSection />
        <ProjectsSection />
        <Footer />
      </div>
    </main>
  );
}

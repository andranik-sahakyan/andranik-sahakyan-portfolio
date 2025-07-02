'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Home, User, FileText, Folder, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const navItems = useMemo(() => [
    { href: '#hero', icon: Home, label: 'Home' },
    { href: '#about', icon: User, label: 'About' },
    { href: '#resume', icon: FileText, label: 'Resume' },
    { href: '#projects', icon: Folder, label: 'Projects' },
  ], []);

  useEffect(() => {
    // Clean up existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the entry with the largest intersection ratio
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, current) => 
            current.intersectionRatio > prev.intersectionRatio ? current : prev
          );
          
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        threshold: [0.1, 0.25, 0.5, 0.75],
        rootMargin: '-10% 0px -60% 0px'
      }
    );

    // Observe all sections
    const sections = navItems.map(item => item.href.substring(1));
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [navItems]);

  // Handle mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`
          fixed top-4 right-4 z-50 lg:hidden p-3 rounded-full transition-all duration-300 shadow-lg
          ${isMobileMenuOpen 
            ? 'bg-blue-400 text-white' 
            : 'bg-slate-800/40 backdrop-blur-sm text-white hover:bg-blue-400'
          }
        `}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Sidebar */}
      <nav 
        className="fixed top-0 left-0 h-full w-16 hidden lg:flex flex-col justify-center items-center p-2 space-y-4 z-40"
        role="navigation"
        aria-label="Main navigation"
      >
        {navItems.map(({ href, icon: Icon, label }) => {
          const sectionId = href.substring(1);
          const isActive = activeSection === sectionId;
          
          return (
            <div key={href} className="group relative">
              <button
                onClick={() => scrollToSection(href)}
                className={`
                  relative flex items-center justify-center h-12 w-12 rounded-full 
                  transition-all duration-300 ease-out
                  ${isActive 
                    ? 'bg-blue-400 text-white shadow-lg scale-110' 
                    : 'bg-slate-800/90 text-slate-300 hover:bg-blue-400 hover:text-white hover:shadow-xl hover:scale-105'
                  }
                `}
                aria-label={`Navigate to ${label}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={20} />
              </button>
              
              {/* Hover tooltip */}
              <div 
                className="
                  absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 
                  bg-slate-800/95 backdrop-blur-sm text-white text-sm font-medium 
                  rounded-lg whitespace-nowrap shadow-xl border border-slate-700/50
                  transition-all duration-200 ease-out pointer-events-none z-50
                  opacity-0 invisible translate-x-[-12px] scale-95
                  group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 group-hover:scale-100
                "
                role="tooltip"
              >
                {label}
                {/* Tooltip arrow */}
                <div className="absolute left-0 top-1/2 w-0 h-0 -translate-x-[6px] -translate-y-1/2 border-r-[6px] border-r-slate-800/95 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent" />
              </div>
            </div>
          );
        })}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <nav 
        className={`
          fixed top-0 left-0 h-full w-80 bg-slate-900/80 backdrop-blur-md z-40 lg:hidden
          flex flex-col justify-center p-6 space-y-3
          transform transition-transform duration-300 ease-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          shadow-2xl border-r border-slate-700/30
        `}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {navItems.map(({ href, icon: Icon, label }) => {
          const sectionId = href.substring(1);
          const isActive = activeSection === sectionId;
          
          return (
            <button
              key={href}
              onClick={() => scrollToSection(href)}
              className={`
                flex items-center h-14 px-5 rounded-xl transition-all duration-300 w-full
                ${isActive 
                  ? 'bg-blue-400 text-white shadow-lg' 
                  : 'bg-slate-800/70 text-slate-300 hover:bg-blue-400 hover:text-white hover:shadow-lg'
                }
              `}
              aria-label={`Navigate to ${label}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={20} className="mr-4 flex-shrink-0" />
              <span className="text-base font-medium">{label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default Navigation; 
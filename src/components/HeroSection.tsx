'use client';

import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { Linkedin, Github, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import GraphBackground from './GraphBackground';

const HeroSection = () => {
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: ['Software Engineer', 'Data Engineer', 'Data Scientist'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
      });

      return () => {
        typed.destroy();
      };
    }
  }, []);

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      <GraphBackground />
      
      {/* Enhanced backdrop for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-800/30 to-slate-900/50"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/20 to-transparent"></div>
      
      {/* Modern glassmorphism overlay */}
      <div className="absolute inset-0 backdrop-blur-[1px] bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.01]"></div>
      
      <div className="container mx-auto px-4 text-center text-white relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent filter drop-shadow-2xl">
            <span className="inline-block">Andranik</span>{' '}
            <span className="inline-block">Sahakyan</span>
          </h1>
          
          {/* Modern subtitle with enhanced styling */}
          <div className="relative mb-8">
            <p className="text-xl md:text-2xl text-gray-100 drop-shadow-lg font-light tracking-wide">
              I&apos;m a{' '}
              <span 
                ref={typedRef} 
                className="typed-cursor font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent filter drop-shadow-md"
              ></span>
            </p>
            
            {/* Subtle accent line */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>
          </div>
          {/* Simple social links matching footer styling */}
          <div className="flex justify-center space-x-4">
            <a 
              href="https://www.linkedin.com/in/andraniksahakyan/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Linkedin className="w-8 h-8 text-gray-300 hover:text-blue-400 transition-colors duration-300" />
            </a>
            
            <a 
              href="https://github.com/andranik-sahakyan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Github className="w-8 h-8 text-gray-300 hover:text-blue-400 transition-colors duration-300" />
            </a>
            
            <a 
              href="mailto:asahakyan81@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Mail className="w-8 h-8 text-gray-300 hover:text-blue-400 transition-colors duration-300" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 
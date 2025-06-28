'use client';

import { Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="social-links flex justify-center space-x-4 mb-6">
          <a 
            href="https://www.linkedin.com/in/andraniksahakyan/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a 
            href="https://github.com/andranik-sahakyan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <Github className="w-6 h-6" />
          </a>
          <a 
            href="mailto:asahakyan81@gmail.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
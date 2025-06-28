'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';

interface TimelineItemProps {
  title: string;
  company?: string;
  location?: string;
  period: string;
  description?: string;
  highlights?: string[];
  isLast?: boolean;
  type?: 'experience' | 'education' | 'research' | 'award';
}

const TimelineItem = ({ 
  title, 
  company, 
  location, 
  period, 
  description, 
  highlights, 
  isLast = false
}: TimelineItemProps) => {


  return (
    <motion.div 
      className={`relative group ${!isLast ? 'mb-8' : ''}`}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-20 w-0.5 h-full bg-gradient-to-b from-slate-600 to-slate-700 z-0" />
      )}
      
      {/* Timeline dot */}
      <div className="absolute left-3 top-6 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 z-10 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/30 transition-shadow duration-300">
        <div className="w-2 h-2 bg-white rounded-full" />
      </div>

      <Card className="ml-12 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 backdrop-blur-sm">
        <CardHeader className="pb-0">
          <div className="flex items-start">
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">
                {title}
              </CardTitle>
              
              {company && (
                <div className="text-blue-400 font-semibold mb-2">
                  {company}
                </div>
              )}
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  <span>{period}</span>
                </div>
                
                {location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1.5" />
                    <span>{location}</span>
                  </div>
                )}
              </div>
            </div>
            

          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          {description && (
            <p className="text-blue-300 font-medium mb-4 text-sm">
              {description}
            </p>
          )}
          
          {highlights && highlights.length > 0 && (
            <div className="space-y-3">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start group/item"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mt-2 mr-3 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200" />
                  <p className="text-gray-300 leading-relaxed group-hover/item:text-white transition-colors duration-200">
                    {highlight}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TimelineItem; 
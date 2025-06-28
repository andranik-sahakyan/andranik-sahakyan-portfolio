'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              About
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-2 flex justify-center">
              <motion.div 
                className="profile-pic-wrapper"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/assets/img/profile.jpeg"
                  alt="Andranik Sahakyan"
                  width={120}
                  height={120}
                  className="profile-pic"
                />
              </motion.div>
            </div>
            
            <div className="lg:col-span-10">
              <motion.p 
                className="text-lg text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Hi, I&apos;m Andranik. I am a highly motivated problem-solver with a strong academic background, research experience,
                and award-winning projects. I have a demonstrated ability to understand multidisciplinary concepts and develop new skills
                quickly and efficiently. Being highly curious and passionate about learning, I welcome interdisciplinary projects as
                opportunities to expand my knowledge. My primary interest is working on agentic AI;
                I am particularly interested in building neuro-symbolic AI agents, leveraging the creativity and stochasticity of large 
                language models while maintaining the robust, deterministic strengths of symbolic approaches.
                Feel free to connect with me on LinkedIn or reach out via email!
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection; 
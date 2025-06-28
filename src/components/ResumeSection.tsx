'use client';

import { motion } from 'framer-motion';
import TimelineItem from './TimelineItem';
import { GraduationCap, Briefcase, Microscope, Award, Code, Database, Cloud, Brain } from 'lucide-react';

const ResumeSection = () => {
  const education = [
    {
      title: "M.S. Computer Science",
      company: "Johns Hopkins University",
      period: "2020 - 2022",
      description: "Focus - Data Science & Cloud Computing",
      highlights: ["Relevant Coursework - Advanced AI, Large-Scale Database Systems, Data Science, Cloud Computing, Quantum Computation"]
    },
    {
      title: "B.S. Computer Science", 
      company: "University of California, Irvine",
      period: "2018 - 2020",
      description: "Focus - Intelligent Systems",
      highlights: ["Relevant Coursework - Machine Learning & Data Mining, Probabilistic Graphical Models, Reinforcement Learning, Graph Algorithms, Information Retrieval, Edge Computing"]
    }
  ];

  const experience = [
    {
      title: "Software Engineer II, AI",
      company: "FloQast, Los Angeles, CA",
      period: "December 2024 - Present",
      highlights: [
        "Designed and implemented an AWS SageMaker ML pipeline for anomaly detection in financial accounting data, training personalized models for each customer and identifying anomalies using LOF + iForest + LLMs.",
        "Full stack development building anomaly detection application, allowing accountants to create detection rules in natural language."
      ]
    },
    {
      title: "Data Engineer II",
      company: "Abbott, Los Angeles, CA",
      location: "Digital Health Engineering, Cardiac Rhythym Management R&D",
      period: "April 2023 - December 2024",
      highlights: [
        "Implemented a POC for various generative AI use cases using open source LLMs (question answering over internal documents with RAG, Text-to-SQL for querying databases in natural language, summarizing patient app logs, etc.)",
        "Designed and implemented a data lakehouse architecture POC using Databricks for large-scale, complex CRM device diagnostic data resulting in significant improvements to query performance, data storage, and access to low-level raw device data.",
        "Designed and implemented tools/libraries for efficiently streaming, parsing, and redacting data from implantable cardiac device transmissions."
      ]
    },
    {
      title: "Data Engineer I",
      company: "Abbott, Los Angeles, CA",
      location: "Digital Health Engineering, Cardiac Rhythym Management R&D",
      period: "October 2021 - April 2023",
      highlights: [
        "Developed tools and processes to decode raw device ECG data and create datasets for training machine learning models.",
        "Developed ETLs, stored procedures, and designed schemas for OLAP databases",
        "Data extraction, analysis, visualization, and reporting to support business-critical decisions, quality investigations, research/product development, and regulatory submissions."
      ]
    },
    {
      title: "Software Engineer I",
      company: "Abbott, Los Angeles, CA",
      location: "Remote Care Operations, Cardiac Rhythym Management",
      period: "March 2021 - October 2021",
      highlights: [
        "Developed automated testing pipeline for mobile applications and medical devices.",
        "Data analytics and reports for clinics and internal operations.",
        "Internal tool development."
      ]
    }
  ];

  const research = [
    {
      title: "Bioinformatics ORISE Fellow",
      company: "US Food and Drug Administration, Silver Spring, MD",
      period: "May 2018 - August 2018",
      highlights: [
        "Algorithmic detection of structural variations to discover potential off-target activity during genome editing.",
        "Analyzed Bos Taurus genome edited with TALENs.",
        "Worked with FDA's MINI-HIVE HPC cluster for NGS analysis.",
        "Documented and presented results to Dr. Simonyan's research team."
      ]
    },
    {
      title: "Bioinformatics Research Intern",
      company: "US Food and Drug Administration, Silver Spring, MD",
      period: "June 2017 - September 2017",
      highlights: [
        "Research and development of novel compression algorithms for genetic data.",
        "Developed visualization tool that creates a bitmap image representing the quality scores of a FASTQ file.",
        "Implemented a novel Monte Carlo and Simulated Annealing-inspired algorithm that groups sequences with similar quality scores for compression."
      ]
    }
  ];

  const awards = [
    {
      title: "Finalist, JHU COVID-19 Design Challenge",
      period: "2020",
      highlights: [
        "Developed a mobile application using Flutter that incentivizes social distancing by using a geolocation tracking and gamification approach to award points for staying at home and away from crowded places, which can then be redeemed for discounts on services such as food/grocery delivery.",
        "Built REST API and Admin Panel using Firebase, NodeJS, Express.",
        "Top 20 finalist out of over 230 international teams composed of scientists, physicians, researchers, etc."
      ]
    },
    {
      title: "Best Overall Entry, AT&T Mobile App Hackathon",
      period: "2017",
      highlights: [
        "Developed a mobile application that wirelessly connects to a robotic physical therapy glove and assists patients with wrist mobility impairments in completing exercises.",
        "Awarded $20,000 and 1st place out of over 1,000 national teams.",
        "Pitched project at AT&T Developer Summit in Las Vegas.",
        "Used C++ and Python for embedded device programming (Arduino/Bluetooth), Ionic for mobile web app."
      ]
    }
  ];

  const skills = {
    "Programming Languages": [
      "Python", "JavaScript", "TypeScript", "C/C++", "C#", "SQL" 
    ],
    "AI/ML Technologies": [
      "LLM", "RAG", "TensorFlow", "PyTorch", "Scikit-learn", "SageMaker"
    ],
    "Cloud & Infrastructure": [
      "AWS", "Azure", "Databricks", "Docker", "Terraform"
    ],
    "Frameworks & Libraries": [
      "React", "Next.js", "Node.js", "Express", "FastAPI", "Pandas", "NumPy"
    ],
    "Databases & Tools": [
      "PostgreSQL", "MongoDB", "Git", "Snowflake", "SQL Server", "Jupyter"
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const SectionHeader = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
    <motion.div 
      variants={sectionVariants}
      className="flex items-center mb-8 group"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/20 transition-all duration-300 mr-4">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
        {title}
      </h3>
      <div className="ml-4 flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 opacity-30" />
    </motion.div>
  );

  const SkillCategory = ({ category, skills: categorySkills, icon }: { category: string, skills: string[], icon: React.ReactNode }) => (
    <motion.div 
      variants={sectionVariants}
      className="mb-6"
    >
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white mr-3">
          {icon}
        </div>
        <h4 className="text-lg font-semibold text-gray-300">{category}</h4>
      </div>
      <motion.div 
        className="flex flex-wrap gap-2 px-6 sm:px-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {categorySkills.map((skill, index) => (
          <motion.span
            key={index}
            variants={skillItemVariants}
            className="px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-gray-300 hover:bg-slate-700/50 hover:border-blue-500/30 hover:text-white transition-all duration-300 cursor-default"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );

  return (
    <section id="resume" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
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
              Resume
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          >
            {/* Left Column */}
            <div className="space-y-16">
              {/* Professional Experience */}
              <motion.div variants={sectionVariants}>
                <SectionHeader 
                  icon={<Briefcase className="w-6 h-6" />}
                  title="Professional Experience"
                />
                <div className="space-y-6">
                  {experience.map((item, index) => (
                    <TimelineItem
                      key={index}
                      title={item.title}
                      company={item.company}
                      location={item.location}
                      period={item.period}
                      highlights={item.highlights}
                      type="experience"
                      isLast={index === experience.length - 1}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Skills & Technologies */}
              <motion.div variants={sectionVariants}>
                <SectionHeader 
                  icon={<Code className="w-6 h-6" />}
                  title="Skills & Technologies"
                />
                <div className="space-y-6">
                  <SkillCategory 
                    category="Programming Languages" 
                    skills={skills["Programming Languages"]} 
                    icon={<Code className="w-4 h-4" />}
                  />
                  <SkillCategory 
                    category="AI/ML Technologies" 
                    skills={skills["AI/ML Technologies"]} 
                    icon={<Brain className="w-4 h-4" />}
                  />
                  <SkillCategory 
                    category="Cloud & Infrastructure" 
                    skills={skills["Cloud & Infrastructure"]} 
                    icon={<Cloud className="w-4 h-4" />}
                  />
                  <SkillCategory 
                    category="Frameworks & Libraries" 
                    skills={skills["Frameworks & Libraries"]} 
                    icon={<Code className="w-4 h-4" />}
                  />
                  <SkillCategory 
                    category="Databases & Tools" 
                    skills={skills["Databases & Tools"]} 
                    icon={<Database className="w-4 h-4" />}
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-16">
              {/* Education */}
              <motion.div variants={sectionVariants}>
                <SectionHeader 
                  icon={<GraduationCap className="w-6 h-6" />}
                  title="Education"
                />
                <div className="space-y-6">
                  {education.map((item, index) => (
                    <TimelineItem
                      key={index}
                      title={item.title}
                      company={item.company}
                      period={item.period}
                      description={item.description}
                      highlights={item.highlights}
                      type="education"
                      isLast={index === education.length - 1}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Research Experience */}
              <motion.div variants={sectionVariants}>
                <SectionHeader 
                  icon={<Microscope className="w-6 h-6" />}
                  title="Research Experience"
                />
                <div className="space-y-6">
                  {research.map((item, index) => (
                    <TimelineItem
                      key={index}
                      title={item.title}
                      company={item.company}
                      period={item.period}
                      highlights={item.highlights}
                      type="research"
                      isLast={index === research.length - 1}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Awards */}
              <motion.div variants={sectionVariants}>
                <SectionHeader 
                  icon={<Award className="w-6 h-6" />}
                  title="Awards"
                />
                <div className="space-y-6">
                  {awards.map((item, index) => (
                    <TimelineItem
                      key={index}
                      title={item.title}
                      period={item.period}
                      highlights={item.highlights}
                      type="award"
                      isLast={index === awards.length - 1}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection; 
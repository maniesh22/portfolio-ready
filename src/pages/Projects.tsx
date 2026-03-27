import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageTransition } from '../shared/PageTransition';
import InViewReveal from '../shared/InViewReveal';

// --- 1. CONFIGURATION: Tech Stack Icons & Colors ---
const techConfig: Record<string, { logo: string; color: string }> = {
  "Kotlin": { 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", 
    color: "#7F52FF" 
  },
  "Jetpack Compose": { 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg", 
    color: "#4285F4" 
  },
  "Firebase": { 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", 
    color: "#FFCA28" 
  },
  "MVVM": { 
    logo: "", 
    color: "#64748b"
  },
  "Coroutines": { 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
    color: "#7F52FF" 
  },
  "Hilt": { 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    color: "#3DDC84" 
  },
  "Retrofit": { 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-plain.svg",
    color: "#3DDC84" 
  }
};

const getTechConfig = (tech: string) => techConfig[tech] || { logo: "", color: "#64748b" };

// --- Types & Data ---
interface Project {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  techStack: string[];
  githubUrl: string;
  color: string;
  icon: string;
}

const projectsData: Project[] = [
  {
    id: 'bit-media',
    title: 'Bit Media App',
    shortDesc: 'A modern Android app for browsing photos and videos using Jetpack Compose.',
    icon: '📸',
    color: '#6554F0', 
    longDesc: 'The Bit Media App is a modern and user-friendly Android application developed using Jetpack Compose and Kotlin, following the MVVM (Model-View-ViewModel) architecture. It allows users to effortlessly browse and view photos, audios, and videos from their device internal storage.',
    features: [
      'Intuitive Navigation with bottom bar switching.',
      'Dynamic UI Components using declarative syntax.',
      'Photos & Videos Grid with fluid animations.',
      'Search functionality by file name.',
      'Audio List management and playback.'
    ],
    techStack: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Coroutines'],
    githubUrl: 'https://github.com/maniesh22/Photos'
  },
  {
    id: 'jet-reader',
    title: 'JetReader',
    shortDesc: 'Dynamic book tracking application built with Firebase and Material Design 3.',
    icon: '📚',
    color: '#F59E0B', 
    longDesc: 'JetReader is a comprehensive book tracking application designed for avid readers. It allows users to track reading progress, manage their library, and search for new titles using the Google Books API. Built with a focus on clean architecture and modern Android standards.',
    features: [
      'User Authentication with Firebase.',
      'Search books via Google Books API.',
      'Track reading progress and stats.',
      'Persistent data storage with Firestore.'
    ],
    techStack: ['Kotlin', 'Firebase', 'Hilt', 'Retrofit'],
    githubUrl: 'https://github.com/maniesh22/JetReader'
  }
];

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = projectsData.find(p => p.id === selectedId);

  // Keyboard support: close modal on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedId(null);
  }, []);

  useEffect(() => {
    if (selectedId) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [selectedId, handleKeyDown]);

  return (
    <PageTransition>
      <div className='max-w-5xl mx-auto pb-20'>
        <InViewReveal direction="up">
          <h1 className='text-3xl font-bold mb-12 flex items-center gap-3'>
            <span className='text-indigo-600'>🚀</span> Projects
          </h1>
        </InViewReveal>

        {/* --- PROJECT GRID --- */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {projectsData.map((project, index) => (
            <InViewReveal key={project.id} direction="up" delay={index * 0.1}>
              <motion.div
                layoutId={`card-container-${project.id}`}
                onClick={() => setSelectedId(project.id)}
                className='bg-white dark:bg-slate-800/80 rounded-2xl p-6 cursor-pointer border border-[#e2e8f0] dark:border-[#334155] relative overflow-hidden group card-shimmer h-full'
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  borderColor: project.color,
                  boxShadow: `0 20px 40px -10px ${project.color}30`, 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ backgroundColor: project.color }}
                />

                <div className='flex justify-between items-start mb-4 relative z-10'>
                  <div className='p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl text-3xl'>
                    {project.icon}
                  </div>
                  <motion.button 
                    className='text-sm font-medium px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:text-white transition-all duration-300'
                  >
                    View Details
                  </motion.button>
                </div>

                <motion.h3 
                  layoutId={`title-${project.id}`} 
                  className='text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors'
                >
                  {project.title}
                </motion.h3>
                
                <p className='text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4'>
                  {project.shortDesc}
                </p>

                {/* Grid Tech Stack with Icons */}
                <div className='flex flex-wrap gap-2'>
                  {project.techStack.map(tech => {
                    const { logo, color } = getTechConfig(tech);
                    return (
                      <span 
                        key={tech} 
                        className='flex items-center gap-1 text-xs px-2.5 py-1 bg-slate-50 dark:bg-slate-700/50 rounded-lg font-medium border border-transparent'
                        style={{ color: color }}
                      >
                        {logo && <img src={logo} alt="" className="w-3.5 h-3.5 object-contain" loading="lazy" />}
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            </InViewReveal>
          ))}
        </div>

        {/* --- MODAL OVERLAY --- */}
        <AnimatePresence>
          {selectedId && selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-lg"
              />

              <motion.div
                layoutId={`card-container-${selectedId}`}
                className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden relative z-10 max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-100/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors z-20"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div 
                  className="h-36 flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${selectedProject.color}20, ${selectedProject.color}10)` }}
                >
                   <span className="text-6xl">{selectedProject.icon}</span>
                   <div 
                     className="absolute inset-0 opacity-30" 
                     style={{ background: `radial-gradient(circle at 70% 30%, ${selectedProject.color}30, transparent 70%)` }}
                   />
                </div>

                <div className="p-8">
                  <motion.h2 
                    layoutId={`title-${selectedId}`}
                    className="text-3xl font-bold mb-4 text-slate-900 dark:text-white"
                  >
                    {selectedProject.title}
                  </motion.h2>

                  {/* Modal Tech Stack with Icons */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.techStack.map(tech => {
                      const { logo, color } = getTechConfig(tech);
                      return (
                        <motion.span 
                          key={tech} 
                          className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border rounded-lg cursor-default bg-white dark:bg-slate-800 dark:border-slate-700 shadow-sm'
                          style={{ 
                            borderColor: `${color}40`, 
                            color: color,
                            boxShadow: `0 2px 10px -2px ${color}15`
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: `0 0 15px ${color}40`, 
                            borderColor: color,
                            backgroundColor: `${color}08`
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 12 }}
                        >
                           {logo && <img src={logo} alt="" className="w-4 h-4 object-contain" loading="lazy" />}
                           {tech}
                        </motion.span>
                      );
                    })}
                  </div>

                  <div className="space-y-6 text-slate-600 dark:text-slate-300">
                    <p className="leading-relaxed text-lg">
                      {selectedProject.longDesc}
                    </p>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, idx) => (
                          <motion.li 
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (idx * 0.08) }}
                            className="flex items-start"
                          >
                            <svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0" fill="none" stroke={selectedProject.color} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                      <motion.a 
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold shadow-lg transition-transform"
                        style={{ background: `linear-gradient(135deg, ${selectedProject.color}, ${selectedProject.color}cc)` }}
                        whileHover={{ scale: 1.05, boxShadow: `0 10px 25px -5px ${selectedProject.color}50` }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View on GitHub
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

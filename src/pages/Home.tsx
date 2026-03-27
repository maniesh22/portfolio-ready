import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ResumeCTA from '../shared/ResumeCTA'
import InViewReveal from '../shared/InViewReveal'

// --- HELPER: Spark Particle System (Optimized with RAF) ---
const SparkParticles = React.memo(() => {
  const [sparks, setSparks] = useState<{ id: number; left: string; top: string }[]>([]);
  const rafRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);

  useEffect(() => {
    const spawnInterval = 80; // ms between spawns (reduced from 60)
    const maxSparks = 10; // reduced from 15

    const tick = (time: number) => {
      if (time - lastSpawnRef.current >= spawnInterval) {
        lastSpawnRef.current = time;
        
        const duration = 1500;
        const progress = (Date.now() % duration) / duration;
        const angle = progress * Math.PI * 2;
        const radius = 50;
        const left = 50 + radius * Math.cos(angle - Math.PI / 2) + '%';
        const top = 50 + radius * Math.sin(angle - Math.PI / 2) + '%';

        setSparks(prev => [...prev.slice(-maxSparks), { id: Date.now(), left, top }]);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <AnimatePresence>
      {sparks.map(spark => (
        <motion.div
          key={spark.id}
          initial={{ left: spark.left, top: spark.top, scale: 1, opacity: 1 }}
          animate={{ top: `calc(${spark.top} + 80px)`, opacity: 0, scale: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          style={{ position: 'absolute' }}
          className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.6)] z-10"
        />
      ))}
    </AnimatePresence>
  );
});

SparkParticles.displayName = 'SparkParticles';

// --- Stagger container variants ---
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className='flex items-center justify-center min-h-[80vh]'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full'>
        
        {/* --- LEFT: Text Content (Staggered Entrance) --- */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className='space-y-6'
        >
          <motion.div variants={fadeUp}>
            <p className='text-sm font-semibold text-indigo-500 dark:text-indigo-400 tracking-widest uppercase mb-3'>
              Software Developer
            </p>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className='text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]'>
            Hi — I'm{' '}
            <span className='gradient-text-animated'>Manish</span>
            <span className='text-indigo-500'>.</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className='text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg'>
            Software developer at IBM India Software Labs. Building full‑stack apps with React, Java, and cloud native tooling.
          </motion.p>
          
          <motion.div variants={fadeUp} className='pt-2'>
            <ResumeCTA />
          </motion.div>
        </motion.div>

        {/* --- RIGHT: Floating Image with Loader --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='flex justify-center md:justify-end relative'
        >
          {/* Multiple decorative blobs */}
          <div className="absolute top-0 right-0 -z-10 w-72 h-72 bg-indigo-300/30 dark:bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 -z-10 w-56 h-56 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl" />

          <motion.div
            animate={{ y: [-12, 12, -12] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative flex items-center justify-center"
          >
            {/* Image loader spinner */}
            <AnimatePresence mode="wait">
              {!isLoaded && (
                <motion.div
                  key="loader"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
                  className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                >
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full relative">
                    <motion.div
                      className="absolute w-full h-full rounded-full"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent 0%, transparent 60%, #818cf8 100%)',
                        maskImage: 'radial-gradient(transparent 68%, black 70%)',
                        WebkitMaskImage: 'radial-gradient(transparent 68%, black 70%)',
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                    <div className="absolute inset-0 w-full h-full">
                       <SparkParticles />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* The Profile Image */}
            <motion.img
              src="https://raw.githubusercontent.com/maniesh22/me/refs/heads/main/photos/IMG_0250.JPG"
              alt="Manish Prajapati"
              onLoad={() => setIsLoaded(true)}
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white dark:border-slate-800 shadow-2xl relative z-10"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isLoaded ? 1 : 0,
                filter: isLoaded ? [
                  "drop-shadow(0 0 15px rgba(99, 102, 241, 0.2))", 
                  "drop-shadow(0 0 25px rgba(99, 102, 241, 0.5))",
                  "drop-shadow(0 0 15px rgba(99, 102, 241, 0.2))"
                ] : "none"
              }}
              transition={{
                opacity: { duration: 0.5 },
                filter: { repeat: Infinity, duration: 3, ease: "easeInOut" }
              }}
            />

            {/* Floating Badge */}
            {isLoaded && (
              <motion.div 
                className="absolute -bottom-4 -left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 z-30"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: [8, -8, 8] }} 
                transition={{ 
                  opacity: { duration: 0.5 },
                  scale: { type: "spring" },
                  y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }
                }}
              >
                <motion.span 
                  className="text-2xl block"
                  animate={{
                    filter: [
                      "drop-shadow(0 0 0px rgba(249, 115, 22, 0))",
                      "drop-shadow(0 0 12px rgba(249, 115, 22, 0.8))",
                      "drop-shadow(0 0 0px rgba(249, 115, 22, 0))"
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  🚀
                </motion.span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

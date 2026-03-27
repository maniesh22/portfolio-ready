import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import InViewReveal from '../shared/InViewReveal'

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [fileSize, setFileSize] = useState<string>('Loading size...');
  
  const email = "maniesh22.prajapati@gmail.com";
  const resumePath = `${import.meta.env.BASE_URL}Manish_Prajapati_Resume.pdf`;

  const formatBytes = useCallback((bytes: number, decimals = 1) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }, []);

  useEffect(() => {
    const fetchSize = async () => {
      try {
        const response = await fetch(resumePath, { method: 'HEAD' });
        if (response.ok) {
          const bytes = response.headers.get('Content-Length');
          if (bytes) {
            const sizeInBytes = parseInt(bytes, 10);
            setFileSize(formatBytes(sizeInBytes));
          } else {
            setFileSize('PDF Format');
          }
        }
      } catch (error) {
        setFileSize('PDF Format');
      }
    };

    fetchSize();
  }, [resumePath, formatBytes]);

  const handleEmailClick = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    window.location.href = `mailto:${email}`;
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='max-w-4xl mx-auto pb-20'>
      <InViewReveal direction="up">
        <h1 className='text-3xl font-bold mb-12 flex items-center gap-3'>
          <span className='text-indigo-600'>📬</span> Get in Touch
        </h1>
      </InViewReveal>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        
        {/* --- LEFT COLUMN: Context --- */}
        <InViewReveal direction="left" delay={0.1}>
          <div className='space-y-6'>
            <p className='text-lg text-slate-600 dark:text-slate-300 leading-relaxed'>
              I am currently open to new opportunities as a <strong className="gradient-text">Software Developer. </strong> 
              Whether you have a question about my stack, want to discuss a potential project, 
              or just want to say hi—I'll try my best to get back to you!
            </p>
            
            <div className='flex items-center gap-2 text-slate-500 dark:text-slate-400'>
               <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
               <span className="font-medium">Kochi, Kerala, India</span>
            </div>

            <div className='flex gap-4 pt-4'>
              {/* GitHub */}
              <motion.a 
                href="https://github.com/maniesh22" 
                target="_blank" 
                rel="noreferrer" 
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl hover:bg-[#2b3137] hover:text-white dark:hover:bg-[#2b3137] hover:shadow-glow-md transition-all duration-300 group'
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </motion.a>
              {/* LinkedIn */}
              <motion.a 
                href="https://linkedin.com/in/manishinprajapati" 
                target="_blank" 
                rel="noreferrer" 
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl hover:bg-[#0077b5] hover:text-white dark:hover:bg-[#0077b5] hover:shadow-[0_0_20px_rgba(0,119,181,0.5)] transition-all duration-300'
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </motion.a>
            </div>
          </div>
        </InViewReveal>

        {/* --- RIGHT COLUMN: Action Cards --- */}
        <InViewReveal direction="right" delay={0.2}>
          <div className='space-y-4 pt-4 md:pt-0'>
            
            {/* 1. Email Card */}
            <div className="relative">
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -top-12 left-0 right-0 mx-auto w-max px-4 py-2 bg-emerald-500 text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-2 z-20"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Email Copied to Clipboard!
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={handleEmailClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full text-left p-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-glow-sm hover:shadow-glow-md relative overflow-hidden group'
              >
                <div className='absolute top-0 right-0 p-4 opacity-20'>
                  <svg className="w-24 h-24 transform translate-x-4 -translate-y-4 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                
                <div className='relative z-10'>
                  <div className='text-indigo-100 text-sm font-medium mb-1'>Drop me an email</div>
                  <div className='text-xl md:text-2xl font-bold truncate tracking-tight'>{email}</div>
                  <div className='mt-2 text-xs text-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1'>
                    Click to Open Mail App
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              </motion.button>
            </div>

            {/* 2. Resume Download Card (DYNAMIC SIZE) */}
            <motion.a
              href={resumePath}
              download
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className='group flex items-center justify-between p-6 rounded-2xl glass-card card-shimmer border border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:shadow-card-hover hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400 transition-all duration-300'
            >
              <div className='flex items-center gap-4 relative z-10'>
                <div className='p-3 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 transition-colors'>
                  <svg className="w-6 h-6 text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <div className='text-left'>
                  <div className='font-bold text-slate-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors'>
                    My Resume
                  </div>
                  <div className='text-sm text-slate-500 dark:text-slate-400 group-hover:text-indigo-600/80 dark:group-hover:text-indigo-400/80 transition-colors'>
                    PDF Format • {fileSize}
                  </div>
                </div>
              </div>
              
              <motion.svg 
                className="w-5 h-5 relative z-10" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </motion.svg>
            </motion.a>

          </div>
        </InViewReveal>
      </div>
    </div>
  )
}

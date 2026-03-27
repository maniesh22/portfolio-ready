import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PageTransition } from '../shared/PageTransition'

export default function Resume() {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false)
  const resumeUrl = `${import.meta.env.BASE_URL}Manish_Prajapati_Resume.pdf`

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12 pt-32 min-h-screen flex flex-col items-center">
        
        {/* Header Section */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">My Resume</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Previewing <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-slate-700 dark:text-slate-300">Manish_Prajapati_Resume.pdf</span>
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/"
              className="px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Go Back
            </Link>
            
            <motion.a
              href={resumeUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-glow-sm hover:shadow-glow-md transition-shadow relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="relative z-10">Download PDF</span>
            </motion.a>
          </div>
        </div>

        {/* PDF Viewer Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-5xl h-[80vh] bg-white dark:bg-[#111827] rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover border border-slate-200 dark:border-slate-800 relative transition-shadow duration-500"
        >
          {/* Loading Skeleton/Spinner */}
          <AnimatePresence>
            {!isIframeLoaded && (
              <motion.div 
                exit={{ opacity: 0 }} 
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0B1120] z-20"
              >
                <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-700 border-t-indigo-600 dark:border-t-indigo-500 rounded-full animate-spin mb-4" />
                <span className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">
                  Rendering Document...
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* The PDF Object */}
          <motion.iframe 
            src={`${resumeUrl}#toolbar=0`} 
            className="w-full h-full relative z-10 bg-white"
            title="Resume PDF"
            onLoad={() => setIsIframeLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isIframeLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </div>
    </PageTransition>
  )
}

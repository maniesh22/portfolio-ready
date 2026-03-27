import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ResumeCTA() {
  return (
    <div className='flex items-center gap-4'>
      <Link to="/resume">
        <motion.div
          className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl cursor-pointer relative overflow-hidden'
          initial={{ boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0px 12px 24px rgba(79, 70, 229, 0.4)"
          }}
          whileTap={{ 
            scale: 0.95,
            boxShadow: "0px 5px 10px rgba(79, 70, 229, 0.2)"
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          style={{ willChange: 'transform' }}
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
          
          <span className="relative z-10">View Resume</span>
          <motion.svg 
            className="w-4 h-4 relative z-10" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            variants={{
              initial: { x: 0 },
              hover: { x: 4 },
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </motion.div>
      </Link>
    </div>
  )
}

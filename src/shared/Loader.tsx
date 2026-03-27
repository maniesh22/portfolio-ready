import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// --- Visual Component ---
const LoaderVisual = React.memo(() => {
  return (
    <motion.div
      key="loader"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-[#0B1120]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        className="relative w-24 h-24 md:w-32 md:h-32"
        initial={{ scale: 0.8, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.1, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-slate-900 dark:text-white"
          role="img"
          aria-label="Loading Logo"
          shapeRendering="geometricPrecision"
          initial={{ filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))" }}
          animate={{ filter: "drop-shadow(0px 0px 20px rgba(99, 102, 241, 0.8))" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Hexagon Path */}
          <motion.path
            d="M50 5 L93.3 25 V75 L50 95 L6.7 75 V25 L50 5Z"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Letter "M" */}
          <motion.text
            x="50"
            y="62"
            textAnchor="middle"
            fontFamily="'Inter', sans-serif"
            fontSize="42"
            fontWeight="bold"
            fill="currentColor"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            M
          </motion.text>
        </motion.svg>
      </motion.div>

      {/* Progress bar at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
      />
    </motion.div>
  )
})

LoaderVisual.displayName = 'LoaderVisual'

// --- Logic Component ---
interface LoaderProps {
  children: React.ReactNode
}

export const Loader: React.FC<LoaderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoaderVisual key="loader" />
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col min-h-screen"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

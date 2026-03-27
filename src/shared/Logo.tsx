import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export const Logo = React.memo(() => {
  return (
    <Link to="/" aria-label="Home">
      <motion.svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 text-slate-900 dark:text-white"
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        animate="idle"
        variants={{
          initial: { 
            scale: 1, 
            filter: "drop-shadow(0px 0px 0px rgba(99,102,241,0))" 
          },
          idle: {
            filter: [
              "drop-shadow(0px 0px 0px rgba(99,102,241,0))",
              "drop-shadow(0px 0px 12px rgba(99,102,241,0.4))",
              "drop-shadow(0px 0px 0px rgba(99,102,241,0))",
            ],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          },
          hover: { 
            scale: 1.1, 
            filter: "drop-shadow(0px 5px 15px rgba(99, 102, 241, 0.8))",
            transition: { type: "spring", stiffness: 400, damping: 17 }
          },
          tap: { 
            scale: 0.95,
            filter: "drop-shadow(0px 2px 5px rgba(79, 70, 229, 0.4))"
          }
        }}
      >
        {/* Hexagon Path */}
        <motion.path
          d="M50 5 L93.3 25 V75 L50 95 L6.7 75 V25 L50 5Z"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            initial: { pathLength: 1 },
            hover: { 
              pathLength: [1, 0, 1],
              transition: { duration: 1, ease: "easeInOut" }
            }
          }}
        />
        
        {/* The Letter M */}
        <text
          x="50"
          y="62"
          textAnchor="middle"
          fontFamily="'Inter', sans-serif"
          fontSize="42"
          fontWeight="bold"
          fill="currentColor"
          style={{ pointerEvents: 'none' }}
        >
          M
        </text>
      </motion.svg>
    </Link>
  )
})

Logo.displayName = 'Logo'

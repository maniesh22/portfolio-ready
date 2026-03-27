import { motion } from 'framer-motion';
import React from 'react';

export const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 24, scale: 0.99 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -16, scale: 0.99, filter: 'blur(4px)' }}
    transition={{
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    }}
    style={{ willChange: 'transform, opacity' }}
  >
    {children}
  </motion.div>
);

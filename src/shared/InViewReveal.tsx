import { motion } from 'framer-motion';
import React from 'react';

interface InViewRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const directionOffsets = {
  up:    { y: 40, x: 0 },
  down:  { y: -40, x: 0 },
  left:  { y: 0, x: -40 },
  right: { y: 0, x: 40 },
};

const InViewReveal: React.FC<InViewRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
}) => {
  const offset = directionOffsets[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // custom easeOutQuad
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default React.memo(InViewReveal);

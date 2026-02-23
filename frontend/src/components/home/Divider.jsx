import React from 'react';
import { motion } from 'framer-motion';

const Divider = () => {
  return (
    <motion.div 
      className="max-w-[1800px] mx-auto px-8 mt-12"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.2, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-900/30 to-transparent" />
    </motion.div>
  );
};

export default Divider;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PhilosophySection = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="max-w-[1800px] mx-auto px-8 py-20 md:py-32">
      <motion.div 
        className="flex flex-col lg:flex-row gap-12 lg:gap-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Left Column */}
        <motion.div 
          className="w-full lg:w-[42%] flex flex-col gap-8 md:gap-10"
          variants={fadeInUp}
        >
          <div className="group cursor-default">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none text-neutral-900 transition-all duration-500 group-hover:tracking-wide">
              Mind.
            </h2>
            <p className="mt-4 text-base md:text-lg text-neutral-700 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Chapter One: The psychology of wealth and financial consciousness.
            </p>
          </div>
          
          <div className="group cursor-default">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none text-neutral-900 transition-all duration-500 group-hover:tracking-wide">
              Money.
            </h2>
            <p className="mt-4 text-base md:text-lg text-neutral-700 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Chapter Two: Understanding cashflow, investments, and growth.
            </p>
          </div>
          
          <div className="group cursor-default">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none text-neutral-900 transition-all duration-500 group-hover:tracking-wide">
              Method.
            </h2>
            <p className="mt-4 text-base md:text-lg text-neutral-700 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Chapter Three: Actionable systems for lasting financial success.
            </p>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div 
          className="w-full lg:w-[58%] flex flex-col justify-center gap-8"
          variants={fadeInUp}
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-neutral-900">
            A practical system for clarity, cashflow, and control.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-neutral-700 max-w-2xl">
            The 3M Rule book presents a comprehensive philosophy that transforms how you think about money. 
            Through proven methodologies and practical insights, discover how to build sustainable wealth 
            with clarity and purpose.
          </p>
          
          <motion.button
            onClick={() => navigate('/calculator')}
            className="mt-4 px-8 py-4 bg-neutral-900 text-white font-medium tracking-wide hover:bg-neutral-800 transition-all duration-300 w-fit group overflow-hidden relative"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Try The Tools</span>
            <motion.div 
              className="absolute inset-0 bg-white/10"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PhilosophySection;

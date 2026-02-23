import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
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

  const wordSlide = {
    hidden: { opacity: 0, x: -80 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] }
    }
  };

  const stats = [
    { number: "3", label: "Chapters", subtitle: "Mind, Money, Method" },
    { number: "∞", label: "Possibilities", subtitle: "Unlock Your Potential" },
    { number: "1", label: "System", subtitle: "Transform Your Finances" },
    { number: "2026", label: "Edition", subtitle: "Fresh Insights" }
  ];

  return (
    <section className="px-8 pt-32 md:pt-40 pb-12 max-w-[1800px] mx-auto">
      {/* Full Width Main Heading */}
      <motion.h1
        className="w-full text-7xl md:text-9xl lg:text-[200px] xl:text-[240px] font-bold leading-[0.85] tracking-tight text-neutral-900"
        style={{ fontFamily: "'TASA Explorer', sans-serif" }}
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      >
        THE 3M RULE
      </motion.h1>
      
      {/* Subtitle Section */}
      <motion.div
        className="mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
      >
        <motion.div
          className="flex flex-col md:flex-row gap-4 md:gap-8 text-xl md:text-2xl font-semibold text-neutral-900"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={wordSlide} className="uppercase tracking-wide">
            Mind.
          </motion.span>
          <motion.span variants={wordSlide} className="uppercase tracking-wide">
            Money.
          </motion.span>
          <motion.span variants={wordSlide} className="uppercase tracking-wide">
            Method.
          </motion.span>
        </motion.div>
        
        <motion.p 
          className="text-base md:text-lg text-neutral-700 max-w-md leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          A groundbreaking framework for financial clarity, presented through interactive tools and timeless wisdom.
        </motion.p>
      </motion.div>

      {/* Book Features Row */}
      <motion.div
        className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: [0.19, 1, 0.22, 1] }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center md:text-left group cursor-default border-l-2 border-neutral-900/20 pl-4 hover:border-neutral-900 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-5xl md:text-6xl font-bold text-neutral-900 mb-2">
              {stat.number}
            </div>
            <div className="text-sm md:text-base text-neutral-900 font-semibold uppercase tracking-wider mb-1">
              {stat.label}
            </div>
            <div className="text-xs md:text-sm text-neutral-600">
              {stat.subtitle}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HeroSection;

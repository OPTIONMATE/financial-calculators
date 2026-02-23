import React from 'react';
import { motion } from 'framer-motion';

const ValuePropositionSection = () => {
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

  const chapters = [
    {
      title: "Chapter 1: Mind",
      description: "Build mental clarity and financial consciousness. Learn to align your mindset with your money goals through strategic thinking and intentional planning."
    },
    {
      title: "Chapter 2: Money",
      description: "Master the mechanics of wealth creation. Explore investment strategies, compound growth, and the mathematics behind building sustainable financial freedom."
    },
    {
      title: "Chapter 3: Method",
      description: "Implement proven systems and frameworks. Turn knowledge into action with practical tools designed to transform your financial trajectory."
    }
  ];

  return (
    <section className="max-w-[1800px] mx-auto px-8 py-20 md:py-32">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {chapters.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="group p-8 border border-neutral-900/10 hover:border-neutral-900/30 transition-all duration-500 hover:-translate-y-1 bg-white/30 backdrop-blur-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-6xl font-bold text-neutral-900/10 group-hover:text-neutral-900/20 transition-colors duration-500">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900 group-hover:tracking-wide transition-all duration-500">
              {item.title}
            </h3>
            <p className="text-neutral-700 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ValuePropositionSection;

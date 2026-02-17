import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logoutUser } = useAuth();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

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

  const wordSlide = {
    hidden: { opacity: 0, x: -80 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] }
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: '#f8e5d7'
      }}
    >
      {/* Noise Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/noise.webp')",
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Subtle Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-900/5" />

      {/* Minimal Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 px-8 py-6 backdrop-blur-sm bg-[#f8e5d7]/80"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <Link to="/home" className="group">
            <h1 className="text-lg font-light tracking-tight text-neutral-900 hover:text-neutral-600 transition-colors duration-300">
              THE 3M<span className="font-medium"> RULE</span>
            </h1>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/calculator"
              className="relative text-md font-medium tracking-wide text-neutral-900 hover:text-neutral-600 transition-colors duration-300 group"
            >
              Calculators
              <span className="absolute bottom-0 left-0 w-0 h-px bg-neutral-900 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <button
              onClick={handleAuthClick}
              className="relative text-md font-medium tracking-wide text-neutral-900 hover:text-neutral-600 transition-colors duration-300 group"
            >
              {isAuthenticated ? (
                <span className="flex items-center gap-2">
                  {user?.name || 'Profile'}
                </span>
              ) : (
                'Login'
              )}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-neutral-900 group-hover:w-full transition-all duration-300"></span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
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
            {[
              { number: "3", label: "Chapters", subtitle: "Mind, Money, Method" },
              { number: "∞", label: "Possibilities", subtitle: "Unlock Your Potential" },
              { number: "1", label: "System", subtitle: "Transform Your Finances" },
              { number: "2026", label: "Edition", subtitle: "Fresh Insights" }
            ].map((stat, index) => (
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

        {/* Divider */}
        <motion.div 
          className="max-w-[1800px] mx-auto px-8 mt-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-900/30 to-transparent" />
        </motion.div>

        {/* Two-Column Philosophy Section */}
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

        {/* Value Proposition Section */}
        <section className="max-w-[1800px] mx-auto px-8 py-20 md:py-32">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
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
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group p-8 border border-neutral-900/10 hover:border-neutral-900/30 transition-all duration-500  hover:-translate-y-1 bg-white/30 backdrop-blur-sm"
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

        {/* Bottom Spacing */}
        <div className="h-32" />
      </main>
    </div>
  );
};

export default Home;
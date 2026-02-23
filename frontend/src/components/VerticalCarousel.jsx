import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const VerticalCarousel = () => {
  const containerRef = useRef(null);

  // Configure scroll tracking for this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] // Animation starts when section enters viewport, ends when it leaves
  });

  // Transform scroll progress into Y position with random/varied speeds
  // Left column: moves up slowly
  const leftY = useTransform(scrollYProgress, [0, 1], [150, -80]);
  
  // Center column: moves down at medium speed
  const centerY = useTransform(scrollYProgress, [0, 1], [-120, 150]);
  
  // Right column: moves up faster
  const rightY = useTransform(scrollYProgress, [0, 1], [180, -120]);

  // Card data - 3 lengthy cards per column
  const leftCards = [
    { 
      id: 1, 
      title: "SIP Calculator", 
      description: "Systematic Investment Plans help you build wealth gradually through regular investments. Calculate your future returns based on monthly contributions, expected returns, and investment duration. Perfect for long-term wealth creation and disciplined investing.",
      color: "bg-blue-50",
      features: ["Monthly Investment", "Compound Returns", "Long-term Growth"]
    },
    { 
      id: 2, 
      title: "Lumpsum Calculator", 
      description: "Make one-time investments work harder for you. Understand how a single large investment can grow over time with compound interest. Ideal for windfalls, bonuses, or other significant amounts you want to invest wisely.",
      color: "bg-purple-50",
      features: ["One-time Investment", "Compound Interest", "Growth Projection"]
    },
    { 
      id: 3, 
      title: "EMI Calculator", 
      description: "Plan your loan repayments with precision. Calculate monthly installments for home loans, car loans, or personal loans. Understand the breakdown of principal and interest to make informed borrowing decisions.",
      color: "bg-green-50",
      features: ["Loan Planning", "Monthly EMI", "Interest Breakdown"]
    }
  ];

  const centerCards = [
    { 
      id: 4, 
      title: "Retirement Planning", 
      description: "Secure your golden years with comprehensive retirement planning. Calculate how much you need to save today to maintain your desired lifestyle tomorrow. Factor in inflation, life expectancy, and post-retirement expenses for a worry-free future.",
      color: "bg-pink-50",
      features: ["Future Planning", "Inflation Adjusted", "Lifestyle Goals"]
    },
    { 
      id: 5, 
      title: "Tax Calculator", 
      description: "Navigate India's tax landscape with confidence. Estimate your tax liability, understand deductions under various sections, and plan your investments to maximize tax savings. Stay compliant while optimizing your tax burden.",
      color: "bg-indigo-50",
      features: ["Tax Estimation", "Deduction Planning", "Save More"]
    },
    { 
      id: 6, 
      title: "Goal Planning", 
      description: "Turn your financial dreams into achievable milestones. Whether it's buying a house, funding education, or planning a vacation, calculate exactly how much to save each month to reach your goals on time.",
      color: "bg-orange-50",
      features: ["Dream Achievement", "Monthly Targets", "Timeline Planning"]
    }
  ];

  const rightCards = [
    { 
      id: 7, 
      title: "FD Calculator", 
      description: "Fixed Deposits remain a cornerstone of safe investing. Calculate maturity amounts for various tenures and interest rates. Compare different banks and choose the best option for secure, guaranteed returns on your investment.",
      color: "bg-teal-50",
      features: ["Safe Investment", "Guaranteed Returns", "Compare Rates"]
    },
    { 
      id: 8, 
      title: "PPF Calculator", 
      description: "Public Provident Fund offers tax-free returns with government backing. Calculate your PPF maturity amount, understand yearly contributions, and plan your 15-year investment journey for tax-efficient wealth creation.",
      color: "bg-yellow-50",
      features: ["Tax-free Returns", "Government Backed", "15-year Plan"]
    },
    { 
      id: 9, 
      title: "Wealth Tracker", 
      description: "Monitor your complete financial portfolio in one place. Track assets, liabilities, and net worth over time. Get insights into your financial health and make data-driven decisions to accelerate your wealth-building journey.",
      color: "bg-amber-50",
      features: ["Portfolio View", "Net Worth", "Growth Insights"]
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative py-20 md:py-32 overflow-hidden"
      
    >
      {/* Section Header */}
      <div className="max-w-[1800px] mx-auto px-8 mb-16">
        <motion.h2 
          className="text-5xl md:text-7xl font-bold text-neutral-900 mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Explore Our Tools
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl text-neutral-700 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Interactive calculators designed to simplify your financial journey.
        </motion.p>
      </div>

      {/* Three Column Carousel */}
      <div className="max-w-[1800px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* LEFT COLUMN - Moves Up Slowly */}
          <motion.div
            style={{ y: leftY }}
            className="flex flex-col gap-6"
          >
            {leftCards.map((card, index) => (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className={`${card.color} p-10 rounded-lg border border-neutral-900/10 hover:border-neutral-900/30 transition-all duration-300 cursor-pointer group min-h-[320px]`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl font-bold text-neutral-900/10 group-hover:text-neutral-900/20 transition-colors">
                    {String(card.id).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-neutral-900 mb-4 group-hover:tracking-wide transition-all duration-300">
                  {card.title}
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-6 text-base">
                  {card.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {card.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-neutral-900/5 text-neutral-800 text-sm rounded-full border border-neutral-900/10"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CENTER COLUMN - Moves Down at Medium Speed */}
          <motion.div
            style={{ y: centerY }}
            className="flex flex-col gap-6 md:mt-12"
          >
            {centerCards.map((card, index) => (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className={`${card.color} p-10 rounded-lg border border-neutral-900/10 hover:border-neutral-900/30 transition-all duration-300 cursor-pointer group min-h-[320px]`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl font-bold text-neutral-900/10 group-hover:text-neutral-900/20 transition-colors">
                    {String(card.id).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-neutral-900 mb-4 group-hover:tracking-wide transition-all duration-300">
                  {card.title}
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-6 text-base">
                  {card.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {card.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-neutral-900/5 text-neutral-800 text-sm rounded-full border border-neutral-900/10"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* RIGHT COLUMN - Moves Up Faster */}
          <motion.div
            style={{ y: rightY }}
            className="flex flex-col gap-6"
          >
            {rightCards.map((card, index) => (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className={`${card.color} p-10 rounded-lg border border-neutral-900/10 hover:border-neutral-900/30 transition-all duration-300 cursor-pointer group min-h-[320px]`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl font-bold text-neutral-900/10 group-hover:text-neutral-900/20 transition-colors">
                    {String(card.id).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-neutral-900 mb-4 group-hover:tracking-wide transition-all duration-300">
                  {card.title}
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-6 text-base">
                  {card.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {card.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-neutral-900/5 text-neutral-800 text-sm rounded-full border border-neutral-900/10"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default VerticalCarousel;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Calculator Card Component
 * Displays calculator in grid on home page
 */
const CalculatorCard = ({ calculator }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/calculator/${calculator.id}`);
  };

  // Category-based color schemes
  const getCategoryColors = (category) => {
    switch (category) {
      case 'Investment':
        return {
          badge: 'bg-blue-50 text-blue-700 border-blue-100',
          text: 'text-blue-600 group-hover:text-blue-700',
          hover: 'group-hover:from-blue-50/50 group-hover:via-cyan-50/30 group-hover:to-blue-50/50',
          line: 'from-blue-500 via-cyan-500 to-blue-500'
        };
      case 'Retirement':
        return {
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
          text: 'text-emerald-600 group-hover:text-emerald-700',
          hover: 'group-hover:from-emerald-50/50 group-hover:via-teal-50/30 group-hover:to-emerald-50/50',
          line: 'from-emerald-500 via-teal-500 to-emerald-500'
        };
      case 'Government Schemes':
        return {
          badge: 'bg-teal-50 text-teal-700 border-teal-100',
          text: 'text-teal-600 group-hover:text-teal-700',
          hover: 'group-hover:from-teal-50/50 group-hover:via-cyan-50/30 group-hover:to-teal-50/50',
          line: 'from-teal-500 via-cyan-500 to-teal-500'
        };
      default:
        return {
          badge: 'bg-blue-50 text-blue-700 border-blue-100',
          text: 'text-blue-600 group-hover:text-blue-700',
          hover: 'group-hover:from-blue-50/50 group-hover:via-cyan-50/30 group-hover:to-blue-50/50',
          line: 'from-blue-500 via-cyan-500 to-blue-500'
        };
    }
  };

  const colors = getCategoryColors(calculator.category);

  return (
    <motion.div
      onClick={handleClick}
      className="group relative bg-white rounded-2xl shadow-sm border border-neutral-200 cursor-pointer overflow-hidden transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      whileHover={{
        y: -6,
        boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(16, 185, 129, 0.08)'
      }}
    >
      {/* Subtle gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-primary-50/0 via-accent-50/0 to-primary-50/0 ${colors.hover} transition-all duration-500`} />
      
      <div className="relative p-6">
        {/* Category badge */}
        <div className="mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}>
            {calculator.category}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-neutral-900 mb-2 transition-colors duration-200">
          {calculator.name}
        </h3>
        
        <p className="text-neutral-600 text-sm leading-relaxed mb-5">
          {calculator.description}
        </p>
        
        <motion.div 
          className={`flex items-center ${colors.text} text-sm font-medium`}
          initial={{ x: 0 }}
        >
          <span className="transition-colors">Calculate Now</span>
          <motion.svg 
            className="w-4 h-4 ml-1.5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={{ x: 0 }}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 7l5 5m0 0l-5 5m5-5H6" 
            />
          </motion.svg>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${colors.line} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
    </motion.div>
  );
};

export default CalculatorCard;

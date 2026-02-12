import React from 'react';
import { motion } from 'framer-motion';
import { formatValue } from '../utils/formatter';

/**
 * Result Box Component
 * Displays calculation results in a formatted way
 */
const ResultBox = ({ result, resultFields }) => {
  if (!result) return null;

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-soft p-8 border border-neutral-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-neutral-900">Results</h3>
        <div className="h-1.5 w-1.5 rounded-full bg-accent-500 animate-pulse" />
      </div>

      <div className="space-y-3">
        {resultFields.map((field, index) => {
          const value = result.result ? result.result[field.key] : result[field.key];
          
          if (value === undefined) return null;

          const isPrimary = field.primary;
          const isHighlight = field.highlight;

          return (
            <motion.div 
              key={field.key}
              className={`group relative p-4 rounded-xl border transition-all duration-200 ${
                isPrimary 
                  ? 'bg-gradient-to-br from-primary-50 to-accent-50 border-primary-200 shadow-sm' 
                  : isHighlight
                  ? 'bg-accent-50/50 border-accent-200'
                  : 'bg-neutral-50 border-neutral-200 hover:border-primary-200'
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                ease: [0.19, 1, 0.22, 1]
              }}
              whileHover={{ 
                x: 2,
                boxShadow: isPrimary ? '0 4px 12px -2px rgba(14, 165, 233, 0.15)' : '0 2px 8px -2px rgba(0, 0, 0, 0.08)'
              }}
            >
              {/* Accent bar for primary */}
              {isPrimary && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-accent-500 rounded-l-xl" />
              )}
              
              <div className="flex justify-between items-center">
                <span className={`text-sm font-medium ${
                  isPrimary ? 'text-primary-900' : 'text-neutral-600'
                }`}>
                  {field.label}
                </span>
                <span className={`text-lg font-semibold tabular-nums ${
                  isPrimary 
                    ? 'text-primary-700' 
                    : isHighlight 
                    ? 'text-accent-700'
                    : 'text-neutral-900'
                }`}>
                  {formatValue(value, field.format, field.suffix || '')}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        className="mt-6 p-4 bg-primary-50/50 rounded-xl border border-primary-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="flex items-start space-x-2">
          <svg className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-primary-800 leading-relaxed">
            These calculations are estimates based on your inputs. Actual returns may vary based on market conditions and other factors.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultBox;

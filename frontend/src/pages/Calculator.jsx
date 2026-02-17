import React from 'react';
import { useCalculatorSearch } from '../hooks/useCalculatorSearch';
import CalculatorCard from '../components/CalculatorCard';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

/**
 * Calculator Page
 * Protected route showing all available calculators
 * Reuses existing calculator list and detail functionality
 */
const Calculator = () => {
  const {
    searchTerm,
    setSearchTerm,
    filteredCalculators,
    resetSearch,
    hasActiveSearch,
  } = useCalculatorSearch();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navbar */}
      <Navbar calculatorCount={filteredCalculators.length} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <motion.h1
          className="text-4xl font-bold text-neutral-900 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Financial Calculators
        </motion.h1>
        <motion.p
          className="text-neutral-600 mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explore our comprehensive collection of tools for smart investment planning
        </motion.p>

        {/* Search Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-soft border border-neutral-200 p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-5">
            {/* Search Bar */}
            <div>
              <label className="block text-sm font-semibold text-neutral-900 mb-3">
                Search Calculators
              </label>
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search by name, category, or keywords..."
              />
            </div>

            {/* Active Search Info */}
            {hasActiveSearch && (
              <motion.div
                className="flex items-center justify-between pt-4 border-t border-neutral-200"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-neutral-700 font-medium">
                  Found <span className="text-blue-600 font-semibold">{filteredCalculators.length}</span>{' '}
                  calculator(s) matching <span className="text-emerald-600 font-semibold">"{searchTerm}"</span>
                </p>
                <button
                  onClick={resetSearch}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Clear search
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Calculators Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filteredCalculators.length > 0 ? (
            filteredCalculators.map((calculator, index) => (
              <motion.div
                key={calculator.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <CalculatorCard calculator={calculator} />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block mb-4">
                <svg
                  className="w-16 h-16 text-neutral-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-neutral-600 font-medium">
                No calculators found matching "{searchTerm}"
              </p>
              <p className="text-neutral-500 text-sm mt-2">
                Try adjusting your search terms
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Calculator;

import React from 'react';
import { motion } from 'framer-motion';
import { useCalculatorSearch } from '../hooks/useCalculatorSearch';
import CalculatorCard from '../components/CalculatorCard';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';

/**
 * Calculator List Page
 * Main landing page with search functionality
 */
const CalculatorList = () => {
  const {
    searchTerm,
    setSearchTerm,
    filteredCalculators,
    resetSearch,
    hasActiveSearch
  } = useCalculatorSearch();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navbar */}
      <Navbar calculatorCount={filteredCalculators.length} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        
        {/* Search Section */}
        <motion.div 
          className="bg-white rounded-2xl shadow-soft border border-neutral-200 p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
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
                  Found <span className="text-blue-600 font-semibold">{filteredCalculators.length}</span> calculator(s) matching <span className="text-emerald-600 font-semibold">"{searchTerm}"</span>
                </p>
                <button
                  onClick={resetSearch}
                  className="text-sm text-teal-600 hover:text-teal-700 font-semibold transition-colors"
                >
                  Clear Search
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Results */}
        {filteredCalculators.length === 0 ? (
          // Empty State
          <motion.div 
            className="bg-white rounded-2xl shadow-soft border border-neutral-200 p-16 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 via-teal-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg 
                className="w-10 h-10 text-teal-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              No calculators found
            </h3>
            <p className="text-neutral-600 mb-6 text-sm max-w-sm mx-auto">
              We couldn't find any calculators matching your search. Try different keywords or browse all calculators.
            </p>
            <button
              onClick={resetSearch}
              className="inline-flex items-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white font-medium hover:from-blue-700 hover:to-teal-700 transition-all shadow-sm hover:shadow-md"
            >
              Clear Search
            </button>
          </motion.div>
        ) : (
          // Calculator Grid
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filteredCalculators.map((calculator, index) => (
              <motion.div
                key={calculator.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.05 * index,
                  ease: [0.19, 1, 0.22, 1]
                }}
              >
                <CalculatorCard calculator={calculator} />
              </motion.div>
            ))}
          </motion.div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="h-1 w-1 rounded-full bg-blue-500" />
            <div className="h-1 w-1 rounded-full bg-teal-500" />
            <div className="h-1 w-1 rounded-full bg-emerald-500" />
          </div>
          <p className="text-center text-neutral-600 text-sm">
            © 2024 Financial Calculators. All calculations are estimates and should not be considered as financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CalculatorList;
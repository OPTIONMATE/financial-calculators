import React from 'react';
import { useCalculatorSearch } from '../hooks/useCalculatorSearch';
import CalculatorCard from '../components/CalculatorCard';
import SearchBar from '../components/SearchBar';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-gray-900">
                Financial Calculators
              </h1>
              <p className="text-gray-500 mt-2 text-sm">
                Calculate investment returns and financial planning metrics
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="space-y-4">
            {/* Search Bar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Calculators
              </label>
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search by name, keywords..."
              />
            </div>

            {/* Active Search Info */}
            {hasActiveSearch && (
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing {filteredCalculators.length} calculator(s) matching "{searchTerm}"
                </p>
                <button
                  onClick={resetSearch}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {filteredCalculators.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-12 h-12 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <h3 className="text-base text-gray-800 mb-2">
              No calculators found
            </h3>
            <p className="text-gray-500 mb-4 text-sm">
              Try adjusting your search term
            </p>
            <button
              onClick={resetSearch}
              className="text-gray-700 text-sm"
            >
              Clear search
            </button>
          </div>
        ) : (
          // Calculator Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCalculators.map((calculator) => (
              <CalculatorCard key={calculator.id} calculator={calculator} />
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Calculator Platform. All calculations are estimates and should not be considered as financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CalculatorList;
import { useState, useMemo } from 'react';
import { CALCULATORS } from '../constants/calculators';

/**
 * Custom Hook: useCalculatorSearch
 * Handles search logic for calculators
 * 
 * @returns {Object} Search state and methods
 */
export const useCalculatorSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Filter calculators based on search term only
   * Memoized to prevent unnecessary recalculations
   */
  const filteredCalculators = useMemo(() => {
    let result = CALCULATORS;

    // Filter by search term
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(calc => {
        // Search in name
        if (calc.name.toLowerCase().includes(lowerSearch)) return true;
        
        // Search in description
        if (calc.description.toLowerCase().includes(lowerSearch)) return true;
        
        // Search in keywords if they exist
        if (calc.keywords && calc.keywords.some(kw => kw.toLowerCase().includes(lowerSearch))) {
          return true;
        }
        
        return false;
      });
    }

    return result;
  }, [searchTerm]);

  /**
   * Reset search
   */
  const resetSearch = () => {
    setSearchTerm('');
  };

  /**
   * Check if search is active
   */
  const hasActiveSearch = useMemo(() => {
    return searchTerm.trim() !== '';
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredCalculators,
    resetSearch,
    hasActiveSearch
  };
};
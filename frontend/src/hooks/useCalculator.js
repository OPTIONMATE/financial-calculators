import { useState } from 'react';
import { calculate } from '../services/calculatorApi';

/**
 * Custom Hook for Calculator Operations
 * Manages calculation state and API calls
 */
export const useCalculator = (calculatorType) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  /**
   * Perform calculation
   */
  const performCalculation = async (inputs) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await calculate(calculatorType, inputs);
      
      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.message || 'Calculation failed');
      }
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset calculator state
   */
  const reset = () => {
    setResult(null);
    setError(null);
    setLoading(false);
  };

  return {
    loading,
    error,
    result,
    performCalculation,
    reset
  };
};

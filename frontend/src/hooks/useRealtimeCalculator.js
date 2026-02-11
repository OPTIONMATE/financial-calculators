import { useState, useEffect, useCallback } from 'react';
import { calculatorFunctions } from '../utils/calculationEngine';

/**
 * Universal Real-time Calculator Hook
 * Works with ANY calculator type - just provide calculator config
 */
export const useRealtimeCalculator = (calculator) => {
  // Initialize state with default values from calculator config
  const [inputs, setInputs] = useState(() => {
    const initialInputs = {};
    calculator.fields.forEach(field => {
      if (field.defaultValue !== undefined) {
        initialInputs[field.name] = field.defaultValue;
      } else if (field.type === 'checkbox') {
        initialInputs[field.name] = false;
      } else if (field.type === 'select') {
        const options = field.options || [];
        const firstOption = options[0];
        initialInputs[field.name] = typeof firstOption === 'object' ? firstOption.value : firstOption;
      } else {
        initialInputs[field.name] = '';
      }
    });
    return initialInputs;
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Get the calculation function for this calculator type
  const calculateFunction = calculatorFunctions[calculator.id];

  // Calculate result whenever inputs change
  useEffect(() => {
    if (!calculateFunction) {
      setError(`Calculation function not found for ${calculator.id}`);
      return;
    }

    try {
      // Check if all required fields have values
      const hasAllRequiredInputs = calculator.fields
        .filter(field => !field.optional)
        .every(field => {
          const value = inputs[field.name];
          return value !== '' && value !== null && value !== undefined;
        });

      if (!hasAllRequiredInputs) {
        setResult(null);
        return;
      }

      // Prepare arguments in the correct order for the function
      const args = calculator.fields.map(field => {
        const value = inputs[field.name];
        
        // Handle different field types
        if (field.type === 'checkbox') {
          return Boolean(value);
        }
        
        if (field.type === 'number') {
          return parseFloat(value) || 0;
        }
        
        if (field.type === 'select') {
          const options = field.options || [];
          const sample = options[0];
          const isNumericOption = typeof (sample?.value ?? sample) === 'number';
          return isNumericOption ? parseFloat(value) : value;
        }
        
        return value;
      });

      // Perform calculation
      const calculationResult = calculateFunction(...args);
      setResult(calculationResult);
      setError(null);
    } catch (err) {
      console.error('Calculation error:', err);
      setError(err.message);
      setResult(null);
    }
  }, [inputs, calculateFunction, calculator.fields, calculator.id]);

  // Handle input changes
  const handleInputChange = useCallback((name, value) => {
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Reset to defaults
  const reset = useCallback(() => {
    const resetInputs = {};
    calculator.fields.forEach(field => {
      if (field.defaultValue !== undefined) {
        resetInputs[field.name] = field.defaultValue;
      } else if (field.type === 'checkbox') {
        resetInputs[field.name] = false;
      } else if (field.type === 'select') {
        const options = field.options || [];
        const firstOption = options[0];
        resetInputs[field.name] = typeof firstOption === 'object' ? firstOption.value : firstOption;
      } else {
        resetInputs[field.name] = '';
      }
    });
    setInputs(resetInputs);
  }, [calculator.fields]);

  return {
    inputs,
    result,
    error,
    handleInputChange,
    reset,
    setInputs
  };
};

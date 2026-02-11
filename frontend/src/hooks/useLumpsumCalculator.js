import { useState, useEffect, useCallback } from 'react';

/**
 * Lumpsum Calculation Logic (Frontend)
 * Formula: A = P(1 + r)^t
 * where A = Maturity amount, P = Principal, r = Annual rate (decimal), t = Time in years
 */
const calculateLumpsumFormula = (principal, annualRate, years) => {
  const rate = annualRate / 100;
  
  // Total investment (principal)
  const totalInvestment = principal;
  
  // Future value calculation with annual compounding
  const maturityAmount = principal * Math.pow(1 + rate, years);
  
  // Wealth gained
  const wealthGained = maturityAmount - totalInvestment;
  
  return {
    totalInvestment: Math.round(totalInvestment),
    wealthGained: Math.round(wealthGained),
    maturityAmount: Math.round(maturityAmount)
  };
};

/**
 * Hook for Lumpsum Calculator
 * Handles real-time calculation on slider change
 */
export const useLumpsumCalculator = (initialPrincipal = 100000, initialRate = 12, initialYears = 10) => {
  const [principal, setPrincipal] = useState(initialPrincipal);
  const [annualRate, setAnnualRate] = useState(initialRate);
  const [years, setYears] = useState(initialYears);
  const [result, setResult] = useState(null);

  // Calculate whenever inputs change
  useEffect(() => {
    const calculation = calculateLumpsumFormula(principal, annualRate, years);
    setResult(calculation);
  }, [principal, annualRate, years]);

  // Handler for input changes
  const handleInputChange = useCallback((name, value) => {
    const numValue = parseFloat(value);
    
    switch (name) {
      case 'principal':
        setPrincipal(Math.max(500, Math.min(100000000, numValue)));
        break;
      case 'annualRate':
        setAnnualRate(Math.max(0.1, Math.min(50, numValue)));
        break;
      case 'years':
        setYears(Math.max(1, Math.min(50, numValue)));
        break;
      default:
        break;
    }
  }, []);

  // Reset to defaults
  const reset = useCallback(() => {
    setPrincipal(initialPrincipal);
    setAnnualRate(initialRate);
    setYears(initialYears);
  }, [initialPrincipal, initialRate, initialYears]);

  return {
    // State
    principal,
    annualRate,
    years,
    result,
    
    // Methods
    handleInputChange,
    setPrincipal,
    setAnnualRate,
    setYears,
    reset
  };
};

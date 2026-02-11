import { useState, useEffect, useCallback } from 'react';

/**
 * SIP Calculation Logic (Frontend)
 * Formula: M = P × ((1 + i)^n - 1) / i) × (1 + i)
 * where M = Maturity amount, P = Monthly investment, i = Monthly rate, n = Total months
 */
const calculateSIPFormula = (monthlyInvestment, annualRate, years) => {
  const monthlyRate = (annualRate / 100) / 12;
  const months = years * 12;
  
  // Total investment
  const totalInvestment = monthlyInvestment * months;
  
  // Future value calculation
  let maturityAmount;
  if (monthlyRate === 0) {
    maturityAmount = totalInvestment;
  } else {
    maturityAmount = monthlyInvestment * 
      (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  }
  
  // Wealth gained
  const wealthGained = maturityAmount - totalInvestment;
  
  return {
    totalInvestment: Math.round(totalInvestment),
    wealthGained: Math.round(wealthGained),
    maturityAmount: Math.round(maturityAmount)
  };
};

/**
 * Hook for SIP Calculator
 * Handles real-time calculation on slider change
 */
export const useSIPCalculator = (initialMonthly = 25000, initialRate = 12, initialYears = 10) => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(initialMonthly);
  const [annualRate, setAnnualRate] = useState(initialRate);
  const [years, setYears] = useState(initialYears);
  const [result, setResult] = useState(null);

  // Calculate whenever inputs change
  useEffect(() => {
    const calculation = calculateSIPFormula(monthlyInvestment, annualRate, years);
    setResult(calculation);
  }, [monthlyInvestment, annualRate, years]);

  // Handler for input changes
  const handleInputChange = useCallback((name, value) => {
    const numValue = parseFloat(value);
    
    switch (name) {
      case 'monthlyInvestment':
        setMonthlyInvestment(Math.max(100, Math.min(10000000, numValue)));
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
    setMonthlyInvestment(initialMonthly);
    setAnnualRate(initialRate);
    setYears(initialYears);
  }, [initialMonthly, initialRate, initialYears]);

  return {
    // State
    monthlyInvestment,
    annualRate,
    years,
    result,
    
    // Methods
    handleInputChange,
    setMonthlyInvestment,
    setAnnualRate,
    setYears,
    reset
  };
};

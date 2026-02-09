/**
 * Formatting Utilities
 */

/**
 * Format number as Indian currency
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '₹0';
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Format number as Indian currency with 2 decimals
 */
export const formatCurrencyWithDecimals = (amount) => {
  if (amount === null || amount === undefined) return '₹0.00';

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Format number as percentage
 */
export const formatPercentage = (value) => {
  if (value === null || value === undefined) return '0%';
  return `${value}%`;
};

/**
 * Format large numbers with K, L, Cr suffixes
 */
export const formatCompact = (amount) => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(2)} K`;
  }
  return formatCurrency(amount);
};

/**
 * Format field value based on type
 */
export const formatValue = (value, format, suffix = '') => {
  switch (format) {
    case 'currency':
      return formatCurrency(value);
    case 'currency2':
      return formatCurrencyWithDecimals(value);
    case 'percentage':
      return formatPercentage(value);
    case 'text':
      return `${value}${suffix}`;
    default:
      return value;
  }
};

/**
 * Validate number input
 */
export const validateNumber = (value, min, max) => {
  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return { valid: false, error: 'Please enter a valid number' };
  }
  
  if (min !== undefined && num < min) {
    return { valid: false, error: `Value must be at least ${min}` };
  }
  
  if (max !== undefined && num > max) {
    return { valid: false, error: `Value must not exceed ${max}` };
  }
  
  return { valid: true };
};

/**
 * Validate field based on type
 */
export const validateField = (field, value) => {
  if (field.type === 'checkbox') {
    return { valid: true };
  }

  if (field.type === 'select') {
    if (value === '' || value === undefined || value === null) {
      return { valid: false, error: `Please select ${field.label}` };
    }
    return { valid: true };
  }

  if (field.type === 'date') {
    if (!value) {
      return { valid: false, error: `${field.label} is required` };
    }
    const timestamp = Date.parse(value);
    if (Number.isNaN(timestamp)) {
      return { valid: false, error: 'Please enter a valid date' };
    }
    return { valid: true };
  }

  return validateNumber(value, field.min, field.max);
};

const { body, param } = require('express-validator');

/**
 * Validation rules for different calculator types
 */
const validationRules = {
  // SIP Calculator validation
  sip: [
    body('monthlyInvestment')
      .isFloat({ min: 500 })
      .withMessage('Monthly investment must be at least ₹500'),
    body('annualRate')
      .isFloat({ min: 0.1, max: 50 })
      .withMessage('Annual return rate must be between 0.1% and 50%'),
    body('years')
      .isInt({ min: 3 })
      .withMessage('Investment period must be at least 3 years')
  ],

  // Lumpsum Calculator validation
  lumpsum: [
    body('principal')
      .isFloat({ min: 500, max: 100000000 })
      .withMessage('Principal amount must be between ₹500 and ₹10,00,00,000'),
    body('annualRate')
      .isFloat({ min: 0.1, max: 50 })
      .withMessage('Annual return rate must be between 0.1% and 50%'),
    body('years')
      .isInt({ min: 1, max: 50 })
      .withMessage('Investment period must be between 1 and 50 years')
  ],

  // SWP Calculator validation
  swp: [
    body('initialInvestment')
      .isFloat({ min: 10000, max: 100000000 })
      .withMessage('Initial investment must be between ₹10,000 and ₹10,00,00,000'),
    body('monthlyWithdrawal')
      .isFloat({ min: 100, max: 10000000 })
      .withMessage('Monthly withdrawal must be between ₹100 and ₹1,00,00,000'),
    body('annualRate')
      .isFloat({ min: 0.1, max: 50 })
      .withMessage('Annual return rate must be between 0.1% and 50%'),
    body('years')
      .isInt({ min: 1, max: 50 })
      .withMessage('Withdrawal period must be between 1 and 50 years')
  ],

  // Mutual Fund Returns Calculator validation
  mf: [
    body('principal')
      .isFloat({ min: 500, max: 100000000 })
      .withMessage('Investment amount must be between ₹500 and ₹10,00,00,000'),
    body('annualRate')
      .isFloat({ min: 0.1, max: 50 })
      .withMessage('Annual return rate must be between 0.1% and 50%'),
    body('years')
      .isInt({ min: 1, max: 50 })
      .withMessage('Investment period must be between 1 and 50 years')
  ],

  // SSY Calculator validation
  ssy: [
    body('annualDeposit')
      .isFloat({ min: 250, max: 150000 })
      .withMessage('Annual deposit must be between ₹250 and ₹1,50,000'),
    body('girlAge')
      .isInt({ min: 0, max: 10 })
      .withMessage('Girl child age must be between 0 and 10 years'),
    body('startYear')
      .isInt({ min: 2000, max: 2100 })
      .withMessage('Start period must be between 2000 and 2100')
  ],

  // PPF Calculator validation
  ppf: [
    body('annualDeposit')
      .isFloat({ min: 500, max: 150000 })
      .withMessage('Annual deposit must be between ₹500 and ₹1,50,000'),
    body('years')
      .optional()
      .isInt({ min: 15, max: 50 })
      .withMessage('Investment period must be between 15 and 50 years (in multiples of 5 after 15)')
  ],

  // EPF Calculator validation
  epf: [
    body('basicSalary')
      .isFloat({ min: 1000, max: 10000000 })
      .withMessage('Basic salary must be between ₹1,000 and ₹1,00,00,000'),
    body('age')
      .isInt({ min: 18, max: 58 })
      .withMessage('Age must be between 18 and 58 years'),
    body('employeeContributionRate')
      .isFloat({ min: 0, max: 20 })
      .withMessage('Employee contribution rate must be between 0% and 20%'),
    body('annualIncrease')
      .isFloat({ min: 0, max: 20 })
      .withMessage('Annual increase must be between 0% and 20%'),
    body('interestRate')
      .isFloat({ min: 0, max: 20 })
      .withMessage('Interest rate must be between 0% and 20%')
  ],

  // NPS Calculator validation
  nps: [
    body('monthlyInvestment')
      .isFloat({ min: 500, max: 10000000 })
      .withMessage('Monthly investment must be between ₹500 and ₹1,00,00,000'),
    body('currentAge')
      .isInt({ min: 18, max: 60 })
      .withMessage('Current age must be between 18 and 60 years'),
    body('expectedReturn')
      .isFloat({ min: 1, max: 15 })
      .withMessage('Expected return must be between 1% and 15%')
  ],

  // APY Calculator validation
  apy: [
    body('currentAge')
      .isInt({ min: 18, max: 40 })
      .withMessage('Age must be between 18 and 40 years'),
    body('pensionAmount')
      .isIn([1000, 2000, 3000, 4000, 5000])
      .withMessage('Pension amount must be 1000, 2000, 3000, 4000, or 5000')
  ],

  // Retirement Calculator validation
  retirement: [
    body('currentAge')
      .isInt({ min: 18, max: 65 })
      .withMessage('Current age must be between 18 and 65 years'),
    body('retirementAge')
      .isInt({ min: 50, max: 75 })
      .withMessage('Retirement age must be between 50 and 75 years'),
    body('lifeExpectancy')
      .isInt({ min: 65, max: 100 })
      .withMessage('Life expectancy must be between 65 and 100 years'),
    body('monthlyExpenses')
      .isFloat({ min: 1000, max: 10000000 })
      .withMessage('Monthly expenses must be between ₹1,000 and ₹1,00,00,000'),
    body('inflationRate')
      .isFloat({ min: 0, max: 20 })
      .withMessage('Inflation rate must be between 0% and 20%'),
    body('expectedReturn')
      .isFloat({ min: 1, max: 30 })
      .withMessage('Expected return must be between 1% and 30%')
  ],

  // Step-up SIP Calculator validation
  'step-up-sip': [
    body('initialMonthlyInvestment')
      .isFloat({ min: 100, max: 10000000 })
      .withMessage('Initial monthly investment must be between ₹100 and ₹1,00,00,000'),
    body('annualStepUp')
      .isFloat({ min: 1, max: 50 })
      .withMessage('Annual step-up must be between 1% and 50%'),
    body('annualRate')
      .isFloat({ min: 0.1, max: 50 })
      .withMessage('Annual return rate must be between 0.1% and 50%'),
    body('years')
      .isInt({ min: 1, max: 50 })
      .withMessage('Investment period must be between 1 and 50 years')
  ],

  // CAGR Calculator validation
  cagr: [
    body('initialValue')
      .isFloat({ min: 100, max: 1000000000 })
      .withMessage('Initial value must be between ₹100 and ₹100,00,00,000'),
    body('finalValue')
      .isFloat({ min: 100, max: 10000000000 })
      .withMessage('Final value must be between ₹100 and ₹1,000,00,00,000'),
    body('years')
      .isFloat({ min: 0.1, max: 100 })
      .withMessage('Investment period must be between 0.1 and 100 years')
  ],

  // FD Calculator validation
  fd: [
    body('principal')
      .isFloat({ min: 1000, max: 100000000 })
      .withMessage('Principal amount must be between ₹1,000 and ₹10,00,00,000'),
    body('annualRate')
      .isFloat({ min: 1, max: 15 })
      .withMessage('Interest rate must be between 1% and 15%'),
    body('years')
      .isFloat({ min: 0.25, max: 10 })
      .withMessage('Tenure must be between 3 months and 10 years'),
    body('compoundingFrequency')
      .optional()
      .isIn([1, 2, 4, 12])
      .withMessage('Compounding frequency must be 1, 2, 4, or 12')
  ],

  // RD Calculator validation
  rd: [
    body('monthlyDeposit')
      .isFloat({ min: 500, max: 1000000 })
      .withMessage('Monthly deposit must be between ₹500 and ₹10,00,000'),
    body('annualRate')
      .isFloat({ min: 1, max: 15 })
      .withMessage('Interest rate must be between 1% and 15%'),
    body('years')
      .isFloat({ min: 0.5, max: 10 })
      .withMessage('Tenure must be between 6 months and 10 years')
  ],

  // NSC Calculator validation
  nsc: [
    body('principal')
      .isFloat({ min: 1000, max: 10000000 })
      .withMessage('Investment amount must be between ₹1,000 and ₹1,00,00,000'),
    body('annualRate')
      .optional()
      .isFloat({ min: 0.1, max: 15 })
      .withMessage('Interest rate must be between 0.1% and 15%'),
    body('years')
      .optional()
      .isInt({ min: 5, max: 5 })
      .withMessage('Tenure must be 5 years')
  ],

  // Post Office MIS Calculator validation
  'postoffice-mis': [
    body('principal')
      .isFloat({ min: 1000, max: 900000 })
      .withMessage('Deposit amount must be between ₹1,000 and ₹9,00,000')
  ],

  // SCSS Calculator validation
  scss: [
    body('principal')
      .isFloat({ min: 1000, max: 1500000 })
      .withMessage('Deposit amount must be between ₹1,000 and ₹15,00,000'),
    body('annualRate')
      .optional()
      .isFloat({ min: 8.2, max: 8.2 })
      .withMessage('Interest rate must be 8.2%'),
    body('years')
      .optional()
      .isInt({ min: 5, max: 5 })
      .withMessage('Tenure must be 5 years')
  ],

  // EMI Calculator validation
  emi: [
    body('principal')
      .isFloat({ min: 10000, max: 100000000 })
      .withMessage('Loan amount must be between ₹10,000 and ₹10,00,00,000'),
    body('annualRate')
      .isFloat({ min: 1, max: 36 })
      .withMessage('Interest rate must be between 1% and 36%'),
    body('years')
      .isFloat({ min: 0.5, max: 30 })
      .withMessage('Loan tenure must be between 6 months and 30 years')
  ],

  // Home Loan EMI Calculator validation
  'home-loan-emi': [
    body('loanAmount')
      .isFloat({ min: 100000, max: 100000000 })
      .withMessage('Loan amount must be between ₹1,00,000 and ₹10,00,00,000'),
    body('annualRate')
      .isFloat({ min: 6, max: 15 })
      .withMessage('Interest rate must be between 6% and 15%'),
    body('years')
      .isInt({ min: 5, max: 30 })
      .withMessage('Loan tenure must be between 5 and 30 years')
  ],

  // Car Loan EMI Calculator validation
  'car-loan-emi': [
    body('loanAmount')
      .isFloat({ min: 50000, max: 10000000 })
      .withMessage('Loan amount must be between ₹50,000 and ₹1,00,00,000'),
    body('annualRate')
      .isFloat({ min: 1, max: 18 })
      .withMessage('Interest rate must be between 1% and 18%'),
    body('years')
      .isInt({ min: 1, max: 7 })
      .withMessage('Loan tenure must be between 1 and 7 years')
  ],

  // Flat vs Reducing Rate Calculator validation
  'flat-reducing': [
    body('principal')
      .isFloat({ min: 10000, max: 100000000 })
      .withMessage('Loan amount must be between ₹10,000 and ₹10,00,00,000'),
    body('flatRate')
      .isFloat({ min: 1, max: 30 })
      .withMessage('Flat interest rate must be between 1% and 30%'),
    body('years')
      .isInt({ min: 1, max: 360 })
      .withMessage('Loan tenure must be between 1 and 360'),
    body('tenureUnit')
      .optional()
      .isIn(['years', 'months'])
      .withMessage('Tenure unit must be "years" or "months"')
  ],

  // Simple Interest Calculator validation
  'simple-interest': [
    body('principal')
      .isFloat({ min: 100, max: 100000000 })
      .withMessage('Principal amount must be between ₹100 and ₹10,00,00,000'),
    body('annualRate')
      .isFloat({ min: 0.1, max: 36 })
      .withMessage('Interest rate must be between 0.1% and 36%'),
    body('years')
      .isFloat({ min: 0.1, max: 50 })
      .withMessage('Time period must be between 0.1 and 50 years')
  ],

  // Compound Interest Calculator validation
  'compound-interest': [
    body('principal')
      .isFloat({ min: 100, max: 100000000 })
      .withMessage('Principal amount must be between ₹100 and ₹10,00,00,000'),
    body('annualRate')
      .isFloat({ min: 0.1, max: 36 })
      .withMessage('Interest rate must be between 0.1% and 36%'),
    body('years')
      .isFloat({ min: 0.1, max: 50 })
      .withMessage('Time period must be between 0.1 and 50 years'),
    body('compoundingFrequency')
      .optional()
      .isIn([1, 2, 4, 12])
      .withMessage('Compounding frequency must be 1, 2, 4, or 12')
  ],

  // HRA Calculator validation
  hra: [
    body('basicSalary')
      .isFloat({ min: 1000, max: 10000000 })
      .withMessage('Basic salary must be between ₹1,000 and ₹1,00,00,000'),
    body('dearnessAllowance')
      .optional()
      .isFloat({ min: 0, max: 10000000 })
      .withMessage('Dearness allowance must be between ₹0 and ₹1,00,00,000'),
    body('hra')
      .isFloat({ min: 0, max: 10000000 })
      .withMessage('HRA received must be between ₹0 and ₹1,00,00,000'),
    body('rentPaid')
      .isFloat({ min: 0, max: 10000000 })
      .withMessage('Rent paid must be between ₹0 and ₹1,00,00,000'),
    body('isMetro')
      .isBoolean()
      .withMessage('Metro city status must be true or false')
  ],

  // Gratuity Calculator validation
  gratuity: [
    body('lastSalary')
      .isFloat({ min: 1000, max: 10000000 })
      .withMessage('Last drawn salary must be between ₹1,000 and ₹1,00,00,000'),
    body('yearsOfService')
      .isFloat({ min: 5, max: 50 })
      .withMessage('Years of service must be between 5 and 50 years'),
    body('monthsOfService')
      .optional()
      .isInt({ min: 0, max: 11 })
      .withMessage('Months of service must be between 0 and 11')
  ],

  // Income Tax Calculator validation
  'income-tax': [
    body('annualIncome')
      .isFloat({ min: 0, max: 100000000 })
      .withMessage('Annual income must be between ₹0 and ₹10,00,00,000'),
    body('regime')
      .optional()
      .isIn(['new', 'old'])
      .withMessage('Tax regime must be "new" or "old"')
  ],

  // TDS Calculator validation
  tds: [
    body('annualIncome')
      .isFloat({ min: 0, max: 100000000 })
      .withMessage('Annual income must be between ₹0 and ₹10,00,00,000'),
    body('standardDeduction')
      .optional()
      .isFloat({ min: 0, max: 100000 })
      .withMessage('Standard deduction must be between ₹0 and ₹1,00,000'),
    body('otherDeductions')
      .optional()
      .isFloat({ min: 0, max: 10000000 })
      .withMessage('Other deductions must be between ₹0 and ₹1,00,00,000')
  ],

  // Salary Calculator validation
  salary: [
    body('ctc')
      .isFloat({ min: 100000, max: 100000000 })
      .withMessage('CTC must be between ₹1,00,000 and ₹10,00,00,000'),
    body('bonusPercent')
      .optional()
      .isFloat({ min: 0, max: 100 })
      .withMessage('Bonus percentage must be between 0% and 100%'),
    body('monthlyProfessionalTax')
      .optional()
      .isFloat({ min: 0, max: 5000 })
      .withMessage('Monthly professional tax must be between ₹0 and ₹5,000'),
    body('monthlyEmployerPf')
      .optional()
      .isFloat({ min: 0, max: 50000 })
      .withMessage('Monthly employer PF must be between ₹0 and ₹50,000'),
    body('monthlyEmployeePf')
      .optional()
      .isFloat({ min: 0, max: 50000 })
      .withMessage('Monthly employee PF must be between ₹0 and ₹50,000'),
    body('monthlyAdditionalDeduction1')
      .optional()
      .isFloat({ min: 0, max: 100000 })
      .withMessage('Monthly additional deduction must be between ₹0 and ₹1,00,000'),
    body('monthlyAdditionalDeduction2')
      .optional()
      .isFloat({ min: 0, max: 100000 })
      .withMessage('Monthly additional deduction must be between ₹0 and ₹1,00,000')
  ],

  // GST Calculator validation
  gst: [
    body('amount')
      .isFloat({ min: 1, max: 100000000 })
      .withMessage('Amount must be between ₹1 and ₹10,00,00,000'),
    body('gstRate')
      .isIn([0, 5, 12, 18, 28])
      .withMessage('GST rate must be 0%, 5%, 12%, 18%, or 28%'),
    body('isInclusive')
      .optional()
      .isBoolean()
      .withMessage('GST inclusive flag must be true or false')
  ],

  // Inflation Calculator validation
  inflation: [
    body('currentAmount')
      .isFloat({ min: 100, max: 100000000 })
      .withMessage('Current amount must be between ₹100 and ₹10,00,00,000'),
    body('inflationRate')
      .isFloat({ min: 0, max: 20 })
      .withMessage('Inflation rate must be between 0% and 20%'),
    body('years')
      .isInt({ min: 1, max: 50 })
      .withMessage('Time period must be between 1 and 50 years')
  ],

  // Brokerage Calculator validation
  brokerage: [
    body('segment')
      .optional()
      .isIn(['equity-delivery', 'equity-intraday', 'fno'])
      .withMessage('Segment must be equity-delivery, equity-intraday, or fno'),
    body('exchange')
      .optional()
      .isIn(['NSE', 'BSE'])
      .withMessage('Exchange must be NSE or BSE'),
    body('buyPrice')
      .isFloat({ min: 0.01, max: 1000000 })
      .withMessage('Buy price must be between ₹0.01 and ₹10,00,000'),
    body('sellPrice')
      .isFloat({ min: 0.01, max: 1000000 })
      .withMessage('Sell price must be between ₹0.01 and ₹10,00,000'),
    body('quantity')
      .isInt({ min: 1, max: 1000000 })
      .withMessage('Quantity must be between 1 and 10,00,000')
  ],

  // Margin Calculator validation
  margin: [
    body('stockPrice')
      .isFloat({ min: 0.01, max: 1000000 })
      .withMessage('Stock price must be between ₹0.01 and ₹10,00,000'),
    body('quantity')
      .isInt({ min: 1, max: 1000000 })
      .withMessage('Quantity must be between 1 and 10,00,000'),
    body('leverage')
      .optional()
      .isFloat({ min: 1, max: 20 })
      .withMessage('Leverage must be between 1x and 20x')
  ],

  // Stock Average Calculator validation
  'stock-average': [
    body('quantity1')
      .isInt({ min: 1, max: 1000000 })
      .withMessage('Quantity (Lot 1) must be between 1 and 10,00,000'),
    body('price1')
      .isFloat({ min: 0.01, max: 1000000 })
      .withMessage('Price (Lot 1) must be between ₹0.01 and ₹10,00,000'),
    body('quantity2')
      .optional()
      .isInt({ min: 1, max: 1000000 })
      .withMessage('Quantity (Lot 2) must be between 1 and 10,00,000'),
    body('price2')
      .optional()
      .isFloat({ min: 0.01, max: 1000000 })
      .withMessage('Price (Lot 2) must be between ₹0.01 and ₹10,00,000'),
    body('quantity3')
      .optional()
      .isInt({ min: 1, max: 1000000 })
      .withMessage('Quantity (Lot 3) must be between 1 and 10,00,000'),
    body('price3')
      .optional()
      .isFloat({ min: 0.01, max: 1000000 })
      .withMessage('Price (Lot 3) must be between ₹0.01 and ₹10,00,000')
  ],

  // XIRR Calculator validation
  xirr: [
    body('startDate')
      .isISO8601()
      .withMessage('Start date must be a valid date'),
    body('frequency')
      .isIn(['14-days', 'monthly', 'quarterly', 'half-yearly', 'yearly'])
      .withMessage('Frequency must be 14 Days, Monthly, Quarterly, Half Yearly, or Yearly'),
    body('recurringAmount')
      .isFloat({ min: 1, max: 1000000000 })
      .withMessage('Recurring amount must be between ₹1 and ₹1,000,00,00,000'),
    body('maturityDate')
      .isISO8601()
      .withMessage('Maturity date must be a valid date'),
    body('maturityAmount')
      .isFloat({ min: 1, max: 1000000000 })
      .withMessage('Maturity amount must be between ₹1 and ₹1,000,00,00,000')
  ],

  // Loan Eligibility Calculator validation
  'loan-eligibility': [
    body('monthlyIncome')
      .isFloat({ min: 1000, max: 10000000 })
      .withMessage('Monthly income must be between ₹1,000 and ₹1,00,00,000'),
    body('existingEmi')
      .optional()
      .isFloat({ min: 0, max: 10000000 })
      .withMessage('Existing EMI must be between ₹0 and ₹1,00,00,000'),
    body('annualRate')
      .isFloat({ min: 1, max: 30 })
      .withMessage('Interest rate must be between 1% and 30%'),
    body('years')
      .isInt({ min: 1, max: 30 })
      .withMessage('Loan tenure must be between 1 and 30 years'),
    body('maxEmiRatio')
      .optional()
      .isFloat({ min: 30, max: 70 })
      .withMessage('Max EMI ratio must be between 30% and 70%')
  ]
};

/**
 * Get validation rules for specific calculator type
 */
const getValidationRules = (calculatorType) => {
  const validTypes = [
    'sip', 'lumpsum', 'swp', 'mf', 'ssy', 'ppf',
    'epf', 'nps', 'apy', 'retirement', 'step-up-sip', 'cagr',
    'fd', 'rd', 'nsc', 'postoffice-mis', 'scss',
    'emi', 'home-loan-emi', 'car-loan-emi', 'flat-reducing',
    'simple-interest', 'compound-interest',
    'hra', 'gratuity', 'income-tax', 'tds', 'salary',
    'gst', 'inflation', 'brokerage', 'margin',
    'stock-average', 'xirr', 'loan-eligibility'
  ];

  const typeValidation = [
    param('type')
      .isIn(validTypes)
      .withMessage('Invalid calculator type')
  ];

  const rules = validationRules[calculatorType] || [];
  return [...typeValidation, ...rules];
};

module.exports = { getValidationRules };

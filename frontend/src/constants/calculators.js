/**
 * Calculator Configurations
 * Centralized metadata for ALL calculators - Extended Phase 2 & 3
 */

export const CALCULATORS = [
  // ====== PHASE 1 - Original 6 Calculators ======
  {
    id: 'sip',
    name: 'SIP Calculator',
    description: 'Calculate returns from Systematic Investment Plan with monthly contributions',
    icon: '📈',
    color: 'bg-blue-500',
    category: 'Investment',
    renderMode: 'slider', // Use sliders for interactive experience
    fields: [
      {
        name: 'monthlyInvestment',
        label: 'Monthly investment',
        type: 'number',
        placeholder: '25000',
        defaultValue: 25000,
        min: 500,
        max: 10000000,
        step: 500,
        prefix: '₹',
        helpText: 'Amount you invest every month'
      },
      {
        name: 'annualRate',
        label: 'Expected return rate (p.a)',
        type: 'number',
        placeholder: '12',
        defaultValue: 12,
        min: 0.1,
        max: 50,
        step: 0.1,
        suffix: '%',
        helpText: 'Expected yearly return rate'
      },
      {
        name: 'years',
        label: 'Time period',
        type: 'number',
        placeholder: '10',
        defaultValue: 10,
        min: 3,
        max: 50,
        step: 1,
        suffix: 'Yr'
      }
    ],
    resultFields: [
      { key: 'totalInvestment', label: 'Invested amount', format: 'currency' },
      { key: 'wealthGained', label: 'Est. returns', format: 'currency', highlight: true },
      { key: 'maturityAmount', label: 'Total value', format: 'currency', primary: true }
    ]
  },
  {
    id: 'lumpsum',
    name: 'Lumpsum Calculator',
    description: 'Calculate returns from one-time investment with compound interest',
    icon: '💰',
    color: 'bg-green-500',
    category: 'Investment',
    renderMode: 'slider', // Use sliders for interactive experience
    fields: [
      {
        name: 'principal',
        label: 'Total investment',
        type: 'number',
        placeholder: '25000',
        defaultValue: 25000,
        min: 500,
        max: 100000000,
        step: 500,
        prefix: '₹',
        helpText: 'One-time investment amount'
      },
      {
        name: 'annualRate',
        label: 'Expected return rate (p.a)',
        type: 'number',
        placeholder: '12',
        defaultValue: 12,
        min: 0.1,
        max: 50,
        step: 0.1,
        suffix: '%'
      },
      {
        name: 'years',
        label: 'Time period',
        type: 'number',
        placeholder: '10',
        defaultValue: 10,
        min: 1,
        max: 50,
        step: 1,
        suffix: 'Yr'
      }
    ],
    resultFields: [
      { key: 'totalInvestment', label: 'Invested amount', format: 'currency' },
      { key: 'wealthGained', label: 'Est. returns', format: 'currency', highlight: true },
      { key: 'maturityAmount', label: 'Total value', format: 'currency', primary: true }
    ]
  },
  {
    id: 'swp',
    name: 'SWP Calculator',
    description: 'Calculate Systematic Withdrawal Plan - withdraw regularly from your investment',
    icon: '💸',
    color: 'bg-purple-500',
    category: 'Investment',
    renderMode: 'slider', // Use sliders for interactive experience
    fields: [
      {
        name: 'initialInvestment',
        label: 'Total investment',
        type: 'number',
        placeholder: '500000',
        defaultValue: 500000,
        min: 10000,
        max: 100000000,
        step: 1000,
        prefix: '₹',
        helpText: 'Starting investment amount'
      },
      {
        name: 'monthlyWithdrawal',
        label: 'Withdrawal per month',
        type: 'number',
        placeholder: '10000',
        defaultValue: 10000,
        min: 100,
        max: 10000000,
        step: 100,
        prefix: '₹',
        helpText: 'Amount to withdraw monthly'
      },
      {
        name: 'annualRate',
        label: 'Expected return rate (p.a)',
        type: 'number',
        placeholder: '8',
        defaultValue: 8,
        min: 0.1,
        max: 50,
        step: 0.1,
        suffix: '%',
        helpText: 'Expected yearly return rate'
      },
      {
        name: 'years',
        label: 'Time period',
        type: 'number',
        placeholder: '5',
        defaultValue: 5,
        min: 1,
        max: 50,
        step: 1,
        suffix: 'Yr'
      }
    ],
    resultFields: [
      { key: 'initialInvestment', label: 'Total investment', format: 'currency' },
      { key: 'totalWithdrawn', label: 'Total withdrawal', format: 'currency', highlight: true },
      { key: 'finalBalance', label: 'Final value', format: 'currency', primary: true }
    ]
  },
  {
    id: 'mf',
    name: 'MF Returns Calculator',
    description: 'Calculate mutual fund returns based on investment amount and expected return rate',
    icon: '📊',
    color: 'bg-orange-500',
    category: 'Investment',
    renderMode: 'slider',
    fields: [
      {
        name: 'principal',
        label: 'Total investment',
        type: 'number',
        placeholder: '25000',
        defaultValue: 25000,
        min: 500,
        max: 100000000,
        step: 500,
        prefix: '₹',
        helpText: 'One-time investment amount'
      },
      {
        name: 'annualRate',
        label: 'Expected return rate (p.a)',
        type: 'number',
        placeholder: '12',
        defaultValue: 12,
        min: 0.1,
        max: 50,
        step: 0.1,
        suffix: '%'
      },
      {
        name: 'years',
        label: 'Time period',
        type: 'number',
        placeholder: '10',
        defaultValue: 10,
        min: 1,
        max: 50,
        step: 1,
        suffix: 'Yr'
      }
    ],
    resultFields: [
      { key: 'totalInvestment', label: 'Invested amount', format: 'currency' },
      { key: 'wealthGained', label: 'Est. returns', format: 'currency', highlight: true },
      { key: 'maturityAmount', label: 'Total value', format: 'currency', primary: true }
    ]
  },
  {
    id: 'ssy',
    name: 'SSY Calculator',
    description: 'Sukanya Samriddhi Yojana - Government scheme for girl child education',
    icon: '👧',
    color: 'bg-pink-500',
    category: 'Government Schemes',
    renderMode: 'slider',
    fields: [
      {
        name: 'annualDeposit',
        label: 'Yearly investment',
        type: 'number',
        placeholder: '10000',
        defaultValue: 10000,
        min: 250,
        max: 150000,
        step: 250,
        prefix: '₹',
        helpText: 'Yearly deposit (₹250 - ₹1,50,000)'
      },
      {
        name: 'girlAge',
        label: "Girl's age",
        type: 'number',
        placeholder: '5',
        defaultValue: 5,
        min: 0,
        max: 10,
        step: 1,
        suffix: 'Yr',
        helpText: 'Current age (0-10 years only)'
      },
      {
        name: 'startYear',
        label: 'Start period',
        type: 'number',
        placeholder: '2021',
        defaultValue: 2021,
        min: 2000,
        max: 2100,
        step: 1
      }
    ],
    resultFields: [
      { key: 'totalInvestment', label: 'Total investment', format: 'currency' },
      { key: 'wealthGained', label: 'Total interest', format: 'currency', highlight: true },
      { key: 'maturityYear', label: 'Maturity year', format: 'text' },
      { key: 'maturityAmount', label: 'Maturity value', format: 'currency', primary: true }
    ]
  },
  {
    id: 'ppf',
    name: 'PPF Calculator',
    description: 'Public Provident Fund - Safe long-term tax-saving investment',
    icon: '🏦',
    color: 'bg-indigo-500',
    category: 'Government Schemes',
    renderMode: 'slider',
    fields: [
      {
        name: 'annualDeposit',
        label: 'Yearly investment',
        type: 'number',
        placeholder: '10000',
        defaultValue: 10000,
        min: 500,
        max: 150000,
        step: 500,
        prefix: '₹',
        helpText: 'Yearly deposit (₹500 - ₹1,50,000)'
      },
      {
        name: 'years',
        label: 'Time period (in years)',
        type: 'number',
        placeholder: '15',
        defaultValue: 15,
        min: 15,
        step: 5,
        suffix: 'Yr',
        helpText: 'Minimum 15 years, extendable by 5 years'
      },
      {
        name: 'interestRate',
        label: 'Rate of interest',
        type: 'number',
        placeholder: '7.1',
        defaultValue: 7.1,
        min: 0,
        max: 15,
        step: 0.1,
        suffix: '%',
        helpText: 'Government-notified rate (p.a)'
      }
    ],
    resultFields: [
      { key: 'totalInvestment', label: 'Invested amount', format: 'currency' },
      { key: 'wealthGained', label: 'Total interest', format: 'currency', highlight: true },
      { key: 'maturityAmount', label: 'Maturity value', format: 'currency', primary: true }
    ]
  },

  // ====== PHASE 2 - Investment & Retirement ======
  {
    id: 'epf',
    name: 'EPF Calculator',
    description: 'Employee Provident Fund calculator - Calculate retirement corpus from EPF',
    icon: '👔',
    color: 'bg-teal-500',
    category: 'Retirement',
    renderMode: 'slider',
    fields: [
      {
        name: 'basicSalary',
        label: 'Monthly salary (Basic + DA)',
        type: 'number',
        placeholder: '50000',
        defaultValue: 50000,
        min: 1000,
        max: 10000000,
        step: 1000,
        prefix: '₹',
        helpText: 'Monthly basic salary including DA'
      },
      {
        name: 'age',
        label: 'Your age',
        type: 'number',
        placeholder: '30',
        defaultValue: 30,
        min: 18,
        max: 58,
        step: 1,
        suffix: 'Yr'
      },
      {
        name: 'employeeContributionRate',
        label: 'Your contribution to EPF',
        type: 'number',
        placeholder: '12',
        defaultValue: 12,
        min: 0,
        max: 20,
        step: 0.1,
        suffix: '%'
      },
      {
        name: 'annualIncrease',
        label: 'Annual increase in salary',
        type: 'number',
        placeholder: '5',
        defaultValue: 5,
        min: 0,
        max: 20,
        step: 0.1,
        suffix: '%'
      },
      {
        name: 'interestRate',
        label: 'Rate of interest',
        type: 'number',
        placeholder: '8.25',
        defaultValue: 8.25,
        min: 0,
        max: 20,
        step: 0.01,
        suffix: '%'
      }
    ],
    resultFields: [
      { key: 'employeeContribution', label: 'Employee contribution', format: 'currency' },
      { key: 'employerContribution', label: "Employer's contribution", format: 'currency' },
      { key: 'interestEarned', label: 'Total interest earned', format: 'currency', highlight: true },
      { key: 'maturityAmount', label: 'Total maturity amount', format: 'currency', primary: true }
    ]
  },
  {
    id: 'nps',
    name: 'NPS Calculator',
    description: 'National Pension System - Plan your retirement with NPS investments',
    icon: '🏛️',
    color: 'bg-cyan-500',
    category: 'Retirement',
    renderMode: 'slider',
    fields: [
      {
        name: 'monthlyInvestment',
        label: 'Investment per month',
        type: 'number',
        placeholder: '10000',
        defaultValue: 10000,
        min: 500,
        max: 10000000,
        step: 500,
        prefix: '₹',
        helpText: 'Monthly NPS contribution'
      },
      {
        name: 'currentAge',
        label: 'Your age',
        type: 'number',
        placeholder: '20',
        defaultValue: 20,
        min: 18,
        max: 60,
        step: 1,
        suffix: 'Yr',
        helpText: 'Your current age'
      },
      {
        name: 'expectedReturn',
        label: 'Expected return (p.a)',
        type: 'number',
        placeholder: '9',
        defaultValue: 9,
        min: 1,
        max: 15,
        step: 0.1,
        suffix: '%',
        helpText: 'Expected annual return'
      }
    ],
    resultFields: [
      { key: 'totalInvestment', label: 'Total investment', format: 'currency' },
      { key: 'interestEarned', label: 'Interest earned', format: 'currency', highlight: true },
      { key: 'maturityAmount', label: 'Maturity amount', format: 'currency', primary: true },
      { key: 'minAnnuityInvestment', label: 'Min. annuity investment', format: 'currency' }
    ]
  },
  {
    id: 'apy',
    name: 'APY Calculator',
    description: 'Atal Pension Yojana - Government pension scheme with guaranteed returns',
    icon: '🎯',
    color: 'bg-violet-500',
    category: 'Retirement',
    renderMode: 'slider',
    fields: [
      {
        name: 'currentAge',
        label: 'Current Age',
        type: 'number',
        placeholder: '25',
        min: 18,
        max: 40,
        step: 1,
        suffix: 'years',
        helpText: 'Age must be 18-40 years'
      },
      {
        name: 'pensionAmount',
        label: 'Monthly Pension',
        type: 'select',
        options: [1000, 2000, 3000, 4000, 5000],
        placeholder: '3000',
        prefix: '₹',
        helpText: 'Choose pension amount'
      }
    ],
    resultFields: [
      { key: 'monthlyContribution', label: 'Monthly Contribution', format: 'currency' },
      { key: 'pensionAmount', label: 'Monthly Pension', format: 'currency', primary: true },
      { key: 'totalInvestment', label: 'Total Investment', format: 'currency' },
      { key: 'yearsToRetirement', label: 'Years to Retirement', format: 'text', suffix: ' years' }
    ]
  },
  {
    id: 'retirement',
    name: 'Retirement Calculator',
    description: 'Calculate corpus needed for comfortable retirement',
    icon: '🌴',
    color: 'bg-emerald-500',
    category: 'Retirement',
    renderMode: 'slider',
    fields: [
      {
        name: 'currentAge',
        label: 'Current Age',
        type: 'number',
        placeholder: '30',
        min: 18,
        max: 65,
        step: 1,
        suffix: 'years'
      },
      {
        name: 'retirementAge',
        label: 'Retirement Age',
        type: 'number',
        placeholder: '60',
        min: 50,
        max: 75,
        step: 1,
        suffix: 'years'
      },
      {
        name: 'lifeExpectancy',
        label: 'Life Expectancy',
        type: 'number',
        placeholder: '80',
        min: 65,
        max: 100,
        step: 1,
        suffix: 'years'
      },
      {
        name: 'monthlyExpenses',
        label: 'Current Monthly Expenses',
        type: 'number',
        placeholder: '50000',
        min: 1000,
        max: 10000000,
        step: 1000,
        prefix: '₹'
      },
      {
        name: 'inflationRate',
        label: 'Inflation Rate',
        type: 'number',
        placeholder: '6',
        min: 0,
        max: 20,
        step: 0.5,
        suffix: '%'
      },
      {
        name: 'expectedReturn',
        label: 'Expected Return',
        type: 'number',
        placeholder: '12',
        min: 1,
        max: 30,
        step: 0.5,
        suffix: '%'
      }
    ],
    resultFields: [
      { key: 'corpusRequired', label: 'Corpus Required', format: 'currency', primary: true },
      { key: 'monthlySIPRequired', label: 'Monthly SIP Required', format: 'currency', highlight: true },
      { key: 'futureMonthlyExpenses', label: 'Future Monthly Expenses', format: 'currency' },
      { key: 'yearsToRetirement', label: 'Years to Retirement', format: 'text', suffix: ' years' }
    ]
  },
  {
    id: 'step-up-sip',
    name: 'Step-Up SIP Calculator',
    description: 'SIP with annual increment - Increase your SIP amount yearly',
    icon: '📊',
    color: 'bg-rose-500',
    category: 'Investment',
    renderMode: 'slider',
    fields: [
      {
        name: 'initialMonthlyInvestment',
        label: 'Monthly investment',
        type: 'number',
        placeholder: '25000',
        defaultValue: 25000,
        min: 100,
        max: 10000000,
        step: 100,
        prefix: '₹'
      },
      {
        name: 'annualStepUp',
        label: 'Annual step up',
        type: 'number',
        placeholder: '10',
        defaultValue: 10,
        min: 1,
        max: 50,
        step: 1,
        suffix: '%',
        helpText: 'Yearly increase in SIP amount'
      },
      {
        name: 'annualRate',
        label: 'Expected return rate (p.a)',
        type: 'number',
        placeholder: '12',
        defaultValue: 12,
        min: 0.1,
        max: 50,
        step: 0.1,
        suffix: '%'
      },
      {
        name: 'years',
        label: 'Time period',
        type: 'number',
        placeholder: '10',
        defaultValue: 10,
        min: 1,
        max: 50,
        step: 1,
        suffix: 'Yr'
      }
    ],
    resultFields: [
      { key: 'totalInvestment', label: 'Invested amount', format: 'currency' },
      { key: 'wealthGained', label: 'Est. returns', format: 'currency', highlight: true },
      { key: 'maturityAmount', label: 'Total value', format: 'currency', primary: true }
    ]
  },
  {
    id: 'cagr',
    name: 'CAGR Calculator',
    description: 'Calculate Compound Annual Growth Rate of your investments',
    icon: '📈',
    color: 'bg-lime-500',
    category: 'Investment',
    renderMode: 'slider',
    fields: [
      {
        name: 'initialValue',
        label: 'Initial Value',
        type: 'number',
        placeholder: '100000',
        min: 100,
        max: 1000000000,
        step: 100,
        prefix: '₹'
      },
      {
        name: 'finalValue',
        label: 'Final Value',
        type: 'number',
        placeholder: '250000',
        min: 100,
        max: 10000000000,
        step: 100,
        prefix: '₹'
      },
      {
        name: 'years',
        label: 'Time Period',
        type: 'number',
        placeholder: '5',
        min: 0.1,
        max: 100,
        step: 0.1,
        suffix: 'years'
      }
    ],
    resultFields: [
      { key: 'cagr', label: 'CAGR', format: 'percentage', primary: true },
      { key: 'absoluteReturn', label: 'Absolute Return', format: 'currency', highlight: true },
      { key: 'totalReturnPercentage', label: 'Total Return %', format: 'percentage' }
    ]
  },

  // ====== PHASE 2 - Deposits & Savings ======
  {
    id: 'fd',
    name: 'FD Calculator',
    description: 'Fixed Deposit Calculator - Calculate FD maturity amount',
    icon: '💵',
    color: 'bg-blue-600',
    category: 'Deposits',
    renderMode: 'slider',
    fields: [
      {
        name: 'principal',
        label: 'Total investment',
        type: 'number',
        placeholder: '100000',
        defaultValue: 100000,
        min: 1000,
        max: 100000000,
        step: 1000,
        prefix: '₹'
      },
      {
        name: 'annualRate',
        label: 'Rate of interest (p.a)',
        type: 'number',
        placeholder: '6.5',
        defaultValue: 6.5,
        min: 1,
        max: 15,
        step: 0.1,
        suffix: '%'
      },
      {
        name: 'years',
        label: 'Time period',
        type: 'number',
        placeholder: '5',
        defaultValue: 5,
        min: 0.25,
        max: 10,
        step: 0.25,
        suffix: 'Years'
      }
    ],
    resultFields: [
      { key: 'principal', label: 'Invested amount', format: 'currency' },
      { key: 'interestEarned', label: 'Est. returns', format: 'currency', highlight: true },
      { key: 'maturityAmount', label: 'Total value', format: 'currency', primary: true }
    ]
  },
  {
    id: 'rd',
    name: 'RD Calculator',
    description: 'Recurring Deposit Calculator - Monthly savings with guaranteed returns',
    icon: '📅',
    color: 'bg-green-600',
    category: 'Deposits',
    renderMode: 'slider',
    fields: [
      {
        name: 'monthlyDeposit',
        label: 'Monthly investment',
        type: 'number',
        placeholder: '50000',
        defaultValue: 50000,
        min: 500,
        max: 1000000,
        step: 500,
        prefix: '₹'
      },
      {
        name: 'annualRate',
        label: 'Rate of interest (p.a)',
        type: 'number',
        placeholder: '6.5',
        defaultValue: 6.5,
        min: 1,
        max: 15,
        step: 0.1,
        suffix: '%'
      },
      {
        name: 'years',
        label: 'Time period',
        type: 'number',
        placeholder: '3',
        defaultValue: 3,
        min: 0.5,
        max: 10,
        step: 0.25,
        suffix: 'Years'
      }
    ],
    resultFields: [
      { key: 'totalInvestment', label: 'Invested amount', format: 'currency' },
      { key: 'interestEarned', label: 'Est. returns', format: 'currency', highlight: true },
      { key: 'maturityAmount', label: 'Total value', format: 'currency', primary: true }
    ]
  },
  {
    id: 'nsc',
    name: 'NSC Calculator',
    description: 'National Savings Certificate - 5-year tax saving scheme',
    icon: '📜',
    color: 'bg-yellow-600',
    category: 'Government Schemes',
    renderMode: 'slider',
    fields: [
      {
        name: 'principal',
        label: 'Amount invested',
        type: 'number',
        placeholder: '100000',
        defaultValue: 100000,
        min: 1000,
        max: 10000000,
        step: 1000,
        prefix: '₹',
        helpText: 'Minimum ₹1,000'
      },
      {
        name: 'annualRate',
        label: 'Rate of interest (p.a)',
        type: 'number',
        placeholder: '6',
        defaultValue: 6,
        min: 0.1,
        max: 15,
        step: 0.1,
        suffix: '%'
      },
      {
        name: 'years',
        label: 'Time period',
        type: 'number',
        placeholder: '5',
        defaultValue: 5,
        min: 5,
        max: 5,
        step: 1,
        suffix: 'Yr'
      }
    ],
    resultFields: [
      { key: 'principal', label: 'Principal amount', format: 'currency' },
      { key: 'interestEarned', label: 'Total interest', format: 'currency', highlight: true },
      { key: 'maturityAmount', label: 'Total amount', format: 'currency', primary: true }
    ]
  },
  {
    id: 'postoffice-mis',
    name: 'Post Office MIS Calculator',
    description: 'Monthly Income Scheme - Guaranteed monthly income from Post Office',
    icon: '📮',
    color: 'bg-red-600',
    category: 'Government Schemes',
    renderMode: 'slider', 
    fields: [
      {
        name: 'principal',
        label: 'Deposit Amount',
        type: 'number',
        placeholder: '500000',
        min: 1000,
        max: 900000,
        step: 1000,
        prefix: '₹',
        helpText: 'Maximum ₹9,00,000 (single account)'
      }
    ],
    resultFields: [
      { key: 'principal', label: 'Deposit Amount', format: 'currency' },
      { key: 'monthlyIncome', label: 'Monthly Income', format: 'currency', primary: true },
      { key: 'annualIncome', label: 'Annual Income', format: 'currency', highlight: true },
      { key: 'fiveYearIncome', label: '5-Year Income', format: 'currency' }
    ]
  },
  {
    id: 'scss',
    name: 'SCSS Calculator',
    description: 'Senior Citizen Savings Scheme - Best returns for seniors',
    icon: '👴',
    color: 'bg-amber-600',
    category: 'Government Schemes',
    renderMode: 'slider',
    fields: [
      {
        name: 'principal',
        label: 'Yearly investment',
        type: 'number',
        placeholder: '10000',
        defaultValue: 10000,
        min: 1000,
        max: 1500000,
        step: 1000,
        prefix: '₹',
        helpText: 'Maximum ₹15,00,000'
      },
      {
        name: 'years',
        label: 'Tenure',
        type: 'number',
        placeholder: '5',
        defaultValue: 5,
        min: 5,
        max: 5,
        step: 1,
        suffix: 'Yr'
      },
      {
        name: 'annualRate',
        label: 'Rate of interest',
        type: 'number',
        placeholder: '8.2',
        defaultValue: 8.2,
        min: 8.2,
        max: 8.2,
        step: 0.1,
        suffix: '%'
      }
    ],
    resultFields: [
      { key: 'quarterlyInterest', label: 'Quarterly receivable interest', format: 'currency' },
      { key: 'totalInterest', label: 'Total interest', format: 'currency', highlight: true },
      { key: 'maturityAmount', label: 'Maturity value', format: 'currency', primary: true }
    ]
  },

  // ====== PHASE 2 - Loans & EMI ======
  {
    id: 'emi',
    name: 'EMI Calculator',
    description: 'Calculate monthly EMI for any loan type',
    icon: '💳',
    color: 'bg-red-500',
    category: 'Loans',
    renderMode: 'slider',
    fields: [
      {
        name: 'principal',
        label: 'Loan amount',
        type: 'number',
        placeholder: '1000000',
        defaultValue: 1000000,
        min: 10000,
        max: 100000000,
        step: 10000,
        prefix: '₹'
      },
      {
        name: 'annualRate',
        label: 'Rate of interest (p.a)',
        type: 'number',
        placeholder: '6.5',
        defaultValue: 6.5,
        min: 1,
        max: 36,
        step: 0.1,
        suffix: '%'
      },
      {
        name: 'years',
        label: 'Loan tenure',
        type: 'number',
        placeholder: '5',
        defaultValue: 5,
        min: 0.5,
        max: 30,
        step: 0.5,
        suffix: 'Yr'
      }
    ],
    resultFields: [
      { key: 'emi', label: 'Monthly EMI', format: 'currency', primary: true },
      { key: 'principal', label: 'Principal amount', format: 'currency' },
      { key: 'totalInterest', label: 'Total interest', format: 'currency', highlight: true },
      { key: 'totalPayment', label: 'Total amount', format: 'currency' }
    ]
  },
  {
    id: 'home-loan-emi',
    name: 'Home Loan EMI Calculator',
    description: 'Calculate EMI for home loans with detailed breakup',
    icon: '🏠',
    color: 'bg-blue-700',
    category: 'Loans',
    renderMode: 'slider',
    fields: [
      {
        name: 'loanAmount',
        label: 'Loan amount',
        type: 'number',
        placeholder: '1000000',
        defaultValue: 1000000,
        min: 100000,
        max: 100000000,
        step: 100000,
        prefix: '₹'
      },
      {
        name: 'annualRate',
        label: 'Rate of interest (p.a)',
        type: 'number',
        placeholder: '6.5',
        defaultValue: 6.5,
        min: 6,
        max: 15,
        step: 0.1,
        suffix: '%'
      },
      {
        name: 'years',
        label: 'Loan tenure',
        type: 'number',
        placeholder: '5',
        defaultValue: 5,
        min: 5,
        max: 30,
        step: 1,
        suffix: 'Yr'
      }
    ],
    resultFields: [
      { key: 'emi', label: 'Monthly EMI', format: 'currency', primary: true },
      { key: 'loanAmount', label: 'Principal amount', format: 'currency' },
      { key: 'totalInterest', label: 'Total interest', format: 'currency', highlight: true },
      { key: 'totalPayment', label: 'Total amount', format: 'currency' }
    ]
  },
  {
    id: 'car-loan-emi',
    name: 'Car Loan EMI Calculator',
    description: 'Calculate EMI for car and vehicle loans',
    icon: '🚗',
    color: 'bg-gray-700',
    category: 'Loans',
    renderMode: 'slider',
    fields: [
      {
        name: 'loanAmount',
        label: 'Loan amount',
        type: 'number',
        placeholder: '1000000',
        defaultValue: 1000000,
        min: 50000,
        max: 10000000,
        step: 10000,
        prefix: '₹'
      },
      {
        name: 'annualRate',
        label: 'Rate of interest (p.a)',
        type: 'number',
        placeholder: '6.5',
        defaultValue: 6.5,
        min: 1,
        max: 18,
        step: 0.1,
        suffix: '%'
      },
      {
        name: 'years',
        label: 'Loan tenure',
        type: 'number',
        placeholder: '5',
        defaultValue: 5,
        min: 1,
        max: 7,
        step: 1,
        suffix: 'Yr'
      }
    ],
    resultFields: [
      { key: 'emi', label: 'Monthly EMI', format: 'currency', primary: true },
      { key: 'loanAmount', label: 'Principal amount', format: 'currency' },
      { key: 'totalInterest', label: 'Total interest', format: 'currency', highlight: true },
      { key: 'totalPayment', label: 'Total amount', format: 'currency' }
    ]
  },
  {
    id: 'flat-reducing',
    name: 'Flat vs Reducing Rate Calculator',
    description: 'Compare flat and reducing interest rates',
    icon: '⚖️',
    color: 'bg-purple-700',
    category: 'Loans',
    renderMode: 'slider',
    fields: [
      {
        name: 'principal',
        label: 'Loan amount',
        type: 'number',
        placeholder: '100000',
        defaultValue: 100000,
        min: 10000,
        max: 100000000,
        step: 1000,
        prefix: '₹'
      },
      {
        name: 'flatRate',
        label: 'Rate of interest (per annum)',
        type: 'number',
        placeholder: '10',
        defaultValue: 10,
        min: 1,
        max: 30,
        step: 0.1,
        suffix: '%'
      },
      {
        name: 'years',
        label: 'Loan tenure',
        type: 'number',
        placeholder: '12',
        defaultValue: 12,
        min: 1,
        max: 360,
        step: 1,
        suffix: ''
      },
      {
        name: 'tenureUnit',
        label: 'Tenure unit',
        type: 'select',
        defaultValue: 'years',
        options: [
          { value: 'years', label: 'Years' },
          { value: 'months', label: 'Months' }
        ]
      }
    ],
    resultFields: [
      { key: 'flatRateEMI', label: 'Flat monthly EMI', format: 'currency' },
      { key: 'flatRateTotalInterest', label: 'Flat total interest', format: 'currency' },
      { key: 'flatRateTotalAmount', label: 'Flat total amount', format: 'currency' },
      { key: 'reducingRateEMI', label: 'Reducing monthly EMI', format: 'currency' },
      { key: 'reducingRateTotalInterest', label: 'Reducing total interest', format: 'currency' },
      { key: 'reducingRateTotalAmount', label: 'Reducing total amount', format: 'currency' },
      { key: 'savings', label: 'Save', format: 'currency', primary: true }
    ]
  },

  // ====== PHASE 2 - Interest ======
  {
    id: 'simple-interest',
    name: 'Simple Interest Calculator',
    description: 'Calculate simple interest on principal amount',
    icon: '🧮',
    color: 'bg-slate-500',
    category: 'Interest',
    renderMode: 'slider',
    fields: [
      {
        name: 'principal',
        label: 'Principal amount',
        type: 'number',
        placeholder: '100000',
        defaultValue: 100000,
        min: 100,
        max: 100000000,
        step: 100,
        prefix: '₹'
      },
      {
        name: 'annualRate',
        label: 'Rate of interest (p.a)',
        type: 'number',
        placeholder: '6',
        defaultValue: 6,
        min: 0.1,
        max: 36,
        step: 0.1,
        suffix: '%'
      },
      {
        name: 'years',
        label: 'Time period',
        type: 'number',
        placeholder: '5',
        defaultValue: 5,
        min: 0.1,
        max: 50,
        step: 0.1,
        suffix: 'Yr'
      }
    ],
    resultFields: [
      { key: 'principal', label: 'Principal amount', format: 'currency' },
      { key: 'interest', label: 'Total interest', format: 'currency', highlight: true },
      { key: 'totalAmount', label: 'Total amount', format: 'currency', primary: true }
    ]
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    description: 'Calculate compound interest with different compounding frequencies',
    icon: '📊',
    color: 'bg-zinc-500',
    category: 'Interest',
    renderMode: 'slider',
    fields: [
      {
        name: 'principal',
        label: 'Principal amount',
        type: 'number',
        placeholder: '100000',
        defaultValue: 100000,
        min: 100,
        max: 100000000,
        step: 100,
        prefix: '₹'
      },
      {
        name: 'annualRate',
        label: 'Rate of interest (p.a)',
        type: 'number',
        placeholder: '6',
        defaultValue: 6,
        min: 0.1,
        max: 36,
        step: 0.1,
        suffix: '%'
      },
      {
        name: 'years',
        label: 'Time period',
        type: 'number',
        placeholder: '5',
        defaultValue: 5,
        min: 0.1,
        max: 50,
        step: 0.1,
        suffix: 'Yr'
      },
      {
        name: 'compoundingFrequency',
        label: 'Compounding frequency',
        type: 'select',
        defaultValue: 1,
        options: [
          { value: 1, label: 'Yearly' },
          { value: 2, label: 'Half-Yearly' },
          { value: 4, label: 'Quarterly' },
          { value: 12, label: 'Monthly' }
        ]
      }
    ],
    resultFields: [
      { key: 'principal', label: 'Principal amount', format: 'currency' },
      { key: 'compoundInterest', label: 'Total interest', format: 'currency', highlight: true },
      { key: 'totalAmount', label: 'Total amount', format: 'currency', primary: true }
    ]
  },

  // ====== PHASE 2 - Income & Salary ======
  {
    id: 'salary',
    name: 'Salary Calculator',
    description: 'Calculate take-home salary from CTC',
    icon: '💰',
    color: 'bg-green-700',
    category: 'Salary',
    renderMode: 'slider',
    fields: [
      {
        name: 'ctc',
        label: 'Cost to Company (CTC)',
        type: 'number',
        placeholder: '600000',
        defaultValue: 600000,
        min: 100000,
        max: 100000000,
        step: 10000,
        prefix: '₹',
        helpText: 'Annual CTC'
      },
      {
        name: 'bonusPercent',
        label: 'Bonus included in CTC',
        type: 'number',
        placeholder: '15',
        defaultValue: 15,
        min: 0,
        max: 100,
        step: 1,
        suffix: '%'
      },
      {
        name: 'monthlyProfessionalTax',
        label: 'Monthly professional tax',
        type: 'number',
        placeholder: '200',
        defaultValue: 200,
        min: 0,
        max: 5000,
        step: 50,
        prefix: '₹'
      },
      {
        name: 'monthlyEmployerPf',
        label: 'Monthly employer PF',
        type: 'number',
        placeholder: '1800',
        defaultValue: 1800,
        min: 0,
        max: 50000,
        step: 100,
        prefix: '₹'
      },
      {
        name: 'monthlyEmployeePf',
        label: 'Monthly employee PF',
        type: 'number',
        placeholder: '1800',
        defaultValue: 1800,
        min: 0,
        max: 50000,
        step: 100,
        prefix: '₹'
      },
      {
        name: 'monthlyAdditionalDeduction1',
        label: 'Monthly additional deduction (optional)',
        type: 'number',
        placeholder: '0',
        defaultValue: 0,
        min: 0,
        max: 100000,
        step: 100,
        prefix: '₹',
        optional: true
      },
      {
        name: 'monthlyAdditionalDeduction2',
        label: 'Monthly additional deduction (optional)',
        type: 'number',
        placeholder: '0',
        defaultValue: 0,
        min: 0,
        max: 100000,
        step: 100,
        prefix: '₹',
        optional: true
      }
    ],
    resultFields: [
      { key: 'totalMonthlyDeductions', label: 'Total Monthly Deductions', format: 'currency', highlight: true },
      { key: 'totalAnnualDeductions', label: 'Total Annual Deductions', format: 'currency' },
      { key: 'takeHomeMonthly', label: 'Take Home Monthly Salary', format: 'currency', primary: true },
      { key: 'takeHomeAnnual', label: 'Take Home Annual Salary', format: 'currency' }
    ]
  },
  {
    id: 'income-tax',
    name: 'Income Tax Calculator',
    description: 'Calculate income tax as per latest tax slabs',
    icon: '📋',
    color: 'bg-orange-700',
    category: 'Tax',
    renderMode: 'slider',
    fields: [
      {
        name: 'annualIncome',
        label: 'Annual Income',
        type: 'number',
        placeholder: '1000000',
        defaultValue: 1000000,
        min: 0,
        max: 100000000,
        step: 10000,
        prefix: '₹'
      },
      {
        name: 'regime',
        label: 'Tax Regime',
        type: 'select',
        options: [
          { value: 'new', label: 'New Regime' },
          { value: 'old', label: 'Old Regime' }
        ],
        helpText: 'Choose tax regime'
      }
    ],
    resultFields: [
      { key: 'annualIncome', label: 'Annual Income', format: 'currency' },
      { key: 'totalTax', label: 'Total Tax', format: 'currency', primary: true },
      { key: 'cess', label: 'Cess (4%)', format: 'currency' },
      { key: 'netIncome', label: 'Net Income', format: 'currency', highlight: true },
      { key: 'monthlyTax', label: 'Monthly Tax', format: 'currency' },
      { key: 'effectiveRate', label: 'Effective Tax Rate', format: 'percentage' }
    ]
  },
  {
    id: 'hra',
    name: 'HRA Calculator',
    description: 'Calculate House Rent Allowance tax exemption',
    icon: '🏘️',
    color: 'bg-sky-700',
    category: 'Tax',
    renderMode: 'slider',
    fields: [
      {
        name: 'basicSalary',
        label: 'Basic salary (p.a)',
        type: 'number',
        placeholder: '540000',
        defaultValue: 540000,
        min: 1000,
        max: 10000000,
        step: 1000,
        prefix: '₹'
      },
      {
        name: 'dearnessAllowance',
        label: 'Dearness allowance (p.a)',
        type: 'number',
        placeholder: '0',
        defaultValue: 0,
        min: 0,
        max: 10000000,
        step: 1000,
        prefix: '₹'
      },
      {
        name: 'hra',
        label: 'HRA received (p.a)',
        type: 'number',
        placeholder: '100000',
        defaultValue: 100000,
        min: 0,
        max: 10000000,
        step: 1000,
        prefix: '₹'
      },
      {
        name: 'rentPaid',
        label: 'Total rent paid (p.a)',
        type: 'number',
        placeholder: '300000',
        defaultValue: 300000,
        min: 0,
        max: 10000000,
        step: 1000,
        prefix: '₹'
      },
      {
        name: 'isMetro',
        label: 'Are you working in a metro city?',
        type: 'checkbox',
        helpText: 'Delhi, Mumbai, Kolkata, Chennai'
      }
    ],
    resultFields: [
      { key: 'exemption', label: 'Exempted HRA', format: 'currency', primary: true },
      { key: 'taxableHRA', label: 'Taxable HRA', format: 'currency', highlight: true }
    ]
  },
  {
    id: 'gratuity',
    name: 'Gratuity Calculator',
    description: 'Calculate gratuity amount as per Payment of Gratuity Act',
    icon: '🎁',
    color: 'bg-purple-600',
    category: 'Salary',
    renderMode: 'slider',
    fields: [
      {
        name: 'lastSalary',
        label: 'Monthly salary (Basic + DA)',
        type: 'number',
        placeholder: '60000',
        defaultValue: 60000,
        min: 1000,
        max: 10000000,
        step: 1000,
        prefix: '₹'
      },
      {
        name: 'yearsOfService',
        label: 'Years of service',
        type: 'number',
        placeholder: '20',
        defaultValue: 20,
        min: 5,
        max: 50,
        step: 1,
        suffix: 'Yr'
      },
      {
        name: 'monthsOfService',
        label: 'Additional months of service',
        type: 'number',
        placeholder: '0',
        defaultValue: 0,
        min: 0,
        max: 11,
        step: 1,
        suffix: 'Mo',
        helpText: '6 months or more rounds up the year'
      }
    ],
    resultFields: [
      { key: 'gratuity', label: 'Total gratuity payable', format: 'currency', primary: true }
    ]
  },
  {
    id: 'tds',
    name: 'TDS Calculator',
    description: 'Calculate Tax Deducted at Source on salary',
    icon: '📊',
    color: 'bg-indigo-700',
    category: 'Tax',
    renderMode: 'slider',
    fields: [
      {
        name: 'annualIncome',
        label: 'Annual Income',
        type: 'number',
        placeholder: '1200000',
        defaultValue: 1200000,
        min: 0,
        max: 100000000,
        step: 10000,
        prefix: '₹'
      },
      {
        name: 'standardDeduction',
        label: 'Standard Deduction',
        type: 'number',
        placeholder: '50000',
        defaultValue: 50000,
        min: 0,
        max: 100000,
        step: 1000,
        prefix: '₹',
        helpText: 'Standard deduction (₹50,000)'
      },
      {
        name: 'otherDeductions',
        label: 'Other Deductions',
        type: 'number',
        placeholder: '150000',
        defaultValue: 150000,
        min: 0,
        max: 10000000,
        step: 10000,
        prefix: '₹',
        helpText: '80C, 80D, etc.'
      }
    ],
    resultFields: [
      { key: 'annualIncome', label: 'Annual Income', format: 'currency' },
      { key: 'taxableIncome', label: 'Taxable Income', format: 'currency' },
      { key: 'monthlyTDS', label: 'Monthly TDS', format: 'currency', primary: true },
      { key: 'annualTDS', label: 'Annual TDS', format: 'currency', highlight: true }
    ]
  },

  // ====== PHASE 2 - Business & Market ======
  {
    id: 'gst',
    name: 'GST Calculator',
    description: 'Calculate GST amount - inclusive and exclusive',
    icon: '🧾',
    color: 'bg-red-600',
    category: 'Business',
    renderMode: 'slider',
    fields: [
      {
        name: 'amount',
        label: 'Original price',
        type: 'number',
        placeholder: '25000',
        defaultValue: 25000,
        min: 1,
        max: 100000000,
        step: 1,
        prefix: '₹'
      },
      {
        name: 'gstRate',
        label: 'Tax slab',
        type: 'select',
        defaultValue: 12,
        options: [0, 0.25, 3, 5, 12, 18, 28],
        suffix: '%',
        helpText: 'Select applicable GST rate'
      },
      {
        name: 'isInclusive',
        label: 'Including GST',
        type: 'checkbox',
        helpText: 'Amount includes GST'
      }
    ],
    resultFields: [
      { key: 'gstAmount', label: 'Total GST', format: 'currency', highlight: true },
      { key: 'totalAmount', label: 'Post-GST amount', format: 'currency', primary: true },
      { key: 'baseAmount', label: 'Original price', format: 'currency' }
    ]
  },
  {
    id: 'brokerage',
    name: 'Brokerage Calculator',
    description: 'Calculate total brokerage and charges for stock trading',
    icon: '📉',
    color: 'bg-blue-800',
    category: 'Trading',
    renderMode: 'slider',
    fields: [
      {
        name: 'segment',
        label: 'Segment',
        type: 'select',
        defaultValue: 'equity-delivery',
        options: [
          { value: 'equity-delivery', label: 'Equity - delivery' },
          { value: 'equity-intraday', label: 'Equity - intraday' },
          { value: 'fno', label: 'F&O' }
        ]
      },
      {
        name: 'exchange',
        label: 'Exchange',
        type: 'select',
        defaultValue: 'NSE',
        options: [
          { value: 'NSE', label: 'NSE' },
          { value: 'BSE', label: 'BSE' }
        ]
      },
      {
        name: 'buyPrice',
        label: 'Buy price per share',
        type: 'number',
        placeholder: '1000',
        defaultValue: 1000,
        min: 0.01,
        max: 1000000,
        step: 0.01,
        prefix: '₹'
      },
      {
        name: 'sellPrice',
        label: 'Sell price per share',
        type: 'number',
        placeholder: '1500',
        defaultValue: 1500,
        min: 0.01,
        max: 1000000,
        step: 0.01,
        prefix: '₹'
      },
      {
        name: 'quantity',
        label: 'Qty',
        type: 'number',
        placeholder: '50',
        defaultValue: 50,
        min: 1,
        max: 1000000,
        step: 1,
        helpText: 'Number of shares'
      }
    ],
    resultFields: [
      { key: 'turnover', label: 'Turnover', format: 'currency2' },
      { key: 'grossPnl', label: 'P&L', format: 'currency2' },
      { key: 'totalCharges', label: 'Charges', format: 'currency2', highlight: true },
      { key: 'growwCharges', label: 'Groww charges', format: 'currency2' },
      { key: 'nonGrowwCharges', label: 'Non-Groww charges', format: 'currency2' },
      { key: 'stt', label: 'Securities Transaction Tax (STT)', format: 'currency2' },
      { key: 'exchangeCharges', label: 'Exchange charges', format: 'currency2' },
      { key: 'sebiCharges', label: 'SEBI Turnover Fees', format: 'currency2' },
      { key: 'gst', label: 'GST', format: 'currency2' },
      { key: 'stampDuty', label: 'Stamp Duty', format: 'currency2' },
      { key: 'netPnl', label: 'Net P&L', format: 'currency2', primary: true }
    ]
  },
  {
    id: 'margin',
    name: 'Margin Calculator',
    description: 'Calculate margin required for intraday and F&O trading',
    icon: '📊',
    color: 'bg-violet-600',
    category: 'Trading',
    renderMode: 'slider',
    fields: [
      {
        name: 'stockPrice',
        label: 'Stock Price',
        type: 'number',
        placeholder: '1000',
        defaultValue: 1000,
        min: 0.01,
        max: 1000000,
        step: 0.01,
        prefix: '₹'
      },
      {
        name: 'quantity',
        label: 'Quantity',
        type: 'number',
        placeholder: '100',
        defaultValue: 100,
        min: 1,
        max: 1000000,
        step: 1
      },
      {
        name: 'leverage',
        label: 'Leverage',
        type: 'number',
        placeholder: '5',
        defaultValue: 5,
        min: 1,
        max: 20,
        step: 1,
        suffix: 'x',
        helpText: 'Broker leverage (e.g., 5x)'
      }
    ],
    resultFields: [
      { key: 'totalValue', label: 'Total Value', format: 'currency' },
      { key: 'marginRequired', label: 'Margin Required', format: 'currency', primary: true },
      { key: 'exposure', label: 'Exposure', format: 'currency', highlight: true },
      { key: 'leverage', label: 'Leverage', format: 'text', suffix: 'x' }
    ]
  },

  // ====== PHASE 2 - Utility ======
  {
    id: 'inflation',
    name: 'Inflation Calculator',
    description: 'Calculate impact of inflation on purchasing power',
    icon: '📉',
    color: 'bg-orange-600',
    category: 'Utility',
    renderMode: 'slider',
    fields: [
      {
        name: 'currentAmount',
        label: 'Current Cost',
        type: 'number',
        placeholder: '100000',
        defaultValue: 100000,
        min: 100,
        max: 100000000,
        step: 100,
        prefix: '₹'
      },
      {
        name: 'inflationRate',
        label: 'Rate of inflation (p.a)',
        type: 'number',
        placeholder: '6',
        defaultValue: 6,
        min: 0,
        max: 20,
        step: 0.1,
        suffix: '%'
      },
      {
        name: 'years',
        label: 'Time period',
        type: 'number',
        placeholder: '5',
        defaultValue: 5,
        min: 1,
        max: 50,
        step: 1,
        suffix: 'Yr'
      }
    ],
    resultFields: [
      { key: 'currentAmount', label: 'Current Cost', format: 'currency' },
      { key: 'valueErosion', label: 'Cost Increase', format: 'currency', highlight: true },
      { key: 'futureValue', label: 'Future Cost', format: 'currency', primary: true }
    ]
  },
  {
    id: 'stock-average',
    name: 'Stock Average Calculator',
    description: 'Calculate average price of your stock purchases',
    icon: '📊',
    color: 'bg-slate-600',
    category: 'Trading',
    renderMode: 'slider',
    fields: [
      {
        name: 'price1',
        label: 'Buy price (Share 1)',
        type: 'number',
        placeholder: '250',
        defaultValue: 250,
        min: 0.01,
        max: 1000000,
        step: 0.01,
        prefix: '₹'
      },
      {
        name: 'quantity1',
        label: 'Quantity (Share 1)',
        type: 'number',
        placeholder: '100',
        defaultValue: 100,
        min: 1,
        max: 1000000,
        step: 1
      },
      {
        name: 'price2',
        label: 'Buy price (Share 2)',
        type: 'number',
        placeholder: '275',
        defaultValue: 275,
        min: 0.01,
        max: 1000000,
        step: 0.01,
        prefix: '₹',
        optional: true
      },
      {
        name: 'quantity2',
        label: 'Quantity (Share 2)',
        type: 'number',
        placeholder: '200',
        defaultValue: 200,
        min: 1,
        max: 1000000,
        step: 1,
        optional: true
      },
      {
        name: 'price3',
        label: 'Buy price (Share 3)',
        type: 'number',
        placeholder: '0',
        defaultValue: 0,
        min: 0.01,
        max: 1000000,
        step: 0.01,
        prefix: '₹',
        optional: true
      },
      {
        name: 'quantity3',
        label: 'Quantity (Share 3)',
        type: 'number',
        placeholder: '0',
        defaultValue: 0,
        min: 1,
        max: 1000000,
        step: 1,
        optional: true
      }
    ],
    resultFields: [
      { key: 'totalQuantity', label: 'Total Shares', format: 'text' },
      { key: 'totalCost', label: 'Total Amount', format: 'currency', highlight: true },
      { key: 'averagePrice', label: 'Average Price', format: 'currency', primary: true }
    ]
  },
  {
    id: 'xirr',
    name: 'XIRR Calculator',
    description: 'Calculate extended internal rate of return for cashflows',
    icon: '📈',
    color: 'bg-emerald-700',
    category: 'Investment',
    renderMode: 'slider',
    fields: [
      {
        name: 'startDate',
        label: 'Start date',
        type: 'date'
      },
      {
        name: 'frequency',
        label: 'Investment frequency',
        type: 'select',
        options: [
          { label: '14 Days', value: '14-days' },
          { label: 'Monthly', value: 'monthly' },
          { label: 'Quarterly', value: 'quarterly' },
          { label: 'Half Yearly', value: 'half-yearly' },
          { label: 'Yearly', value: 'yearly' }
        ]
      },
      {
        name: 'recurringAmount',
        label: 'Recurring investment amount',
        type: 'number',
        placeholder: '10000',
        defaultValue: 10000,
        min: 1,
        max: 1000000000,
        step: 100,
        prefix: '₹'
      },
      {
        name: 'maturityDate',
        label: 'Maturity date',
        type: 'date'
      },
      {
        name: 'maturityAmount',
        label: 'Total maturity amount',
        type: 'number',
        placeholder: '60000',
        defaultValue: 60000,
        min: 1,
        max: 1000000000,
        step: 100,
        prefix: '₹'
      }
    ],
    resultFields: [
      { key: 'xirr', label: 'XIRR', format: 'percentage', primary: true }
    ]
  },
  {
    id: 'loan-eligibility',
    name: 'Loan Eligibility Calculator',
    description: 'Estimate eligible loan amount based on income and EMI capacity',
    icon: '🏦',
    color: 'bg-blue-800',
    category: 'Loans',
    renderMode: 'slider',
    fields: [
      {
        name: 'monthlyIncome',
        label: 'Monthly Income',
        type: 'number',
        placeholder: '80000',
        defaultValue: 80000,
        min: 1000,
        max: 10000000,
        step: 1000,
        prefix: '₹'
      },
      {
        name: 'existingEmi',
        label: 'Existing EMIs',
        type: 'number',
        placeholder: '5000',
        defaultValue: 0,
        min: 0,
        max: 10000000,
        step: 500,
        prefix: '₹',
        optional: true
      },
      {
        name: 'annualRate',
        label: 'Interest Rate',
        type: 'number',
        placeholder: '9',
        defaultValue: 9,
        min: 1,
        max: 30,
        step: 0.1,
        suffix: '%'
      },
      {
        name: 'years',
        label: 'Loan Tenure',
        type: 'number',
        placeholder: '20',
        defaultValue: 20,
        min: 1,
        max: 30,
        step: 1,
        suffix: 'years'
      },
      {
        name: 'maxEmiRatio',
        label: 'Max EMI Ratio',
        type: 'number',
        placeholder: '50',
        defaultValue: 50,
        min: 30,
        max: 70,
        step: 1,
        suffix: '%',
        optional: true
      }
    ],
    resultFields: [
      { key: 'eligibleLoanAmount', label: 'Eligible Loan Amount', format: 'currency', primary: true },
      { key: 'maxEmi', label: 'Max EMI', format: 'currency', highlight: true },
      { key: 'totalPayment', label: 'Total Payment', format: 'currency' }
    ]
  }
];

// Get calculator by ID
export const getCalculatorById = (id) => {
  return CALCULATORS.find(calc => calc.id === id);
};

// Group calculators by category
export const getCalculatorsByCategory = () => {
  const categories = {};
  CALCULATORS.forEach(calc => {
    const category = calc.category || 'Other';
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(calc);
  });
  return categories;
};

// API base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Financial Calculation Formulas
 * All calculator business logic centralized here
 */

/**
 * Calculate SIP (Systematic Investment Plan)
 * Formula: M = P × ((1 + i)^n - 1) / i) × (1 + i)
 * where M = Maturity amount, P = Monthly investment, i = Monthly rate, n = Total months
 */
const calculateSIP = (monthlyInvestment, annualRate, years) => {
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
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
 * Calculate Lumpsum Investment
 * Formula: A = P(1 + r/n)^(nt)
 * where A = Final amount, P = Principal, r = Annual rate, n = compounding frequency, t = time
 */
const calculateLumpsum = (principal, annualRate, years) => {
  const rate = annualRate / 100;
  
  // Compound annually
  const maturityAmount = principal * Math.pow(1 + rate, years);
  const wealthGained = maturityAmount - principal;
  
  return {
    totalInvestment: Math.round(principal),
    wealthGained: Math.round(wealthGained),
    maturityAmount: Math.round(maturityAmount)
  };
};

/**
 * Calculate SWP (Systematic Withdrawal Plan)
 * Formula: Future Value with monthly withdrawals
 */
const calculateSWP = (initialInvestment, monthlyWithdrawal, annualRate, years) => {
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  const months = years * 12;
  
  let balance = initialInvestment;
  let totalWithdrawn = 0;
  
  for (let i = 0; i < months; i++) {
    // Add interest for the month
    balance = balance * (1 + monthlyRate);
    // Withdraw amount
    balance = balance - monthlyWithdrawal;
    totalWithdrawn += monthlyWithdrawal;
  }
  
  return {
    initialInvestment: Math.round(initialInvestment),
    totalWithdrawn: Math.round(totalWithdrawn),
    finalBalance: Math.round(balance)
  };
};

/**
 * Calculate Mutual Fund Returns
 * Can calculate either final value from initial investment or CAGR
 */
const calculateMFReturns = (principal, annualRate, years) => {
  const rate = annualRate / 100;
  const maturityAmount = principal * Math.pow(1 + rate, years);
  const wealthGained = maturityAmount - principal;

  return {
    totalInvestment: Math.round(principal),
    wealthGained: Math.round(wealthGained),
    maturityAmount: Math.round(maturityAmount)
  };
};

/**
 * Calculate SSY (Sukanya Samriddhi Yojana)
 * Current rate: 8.2% (as of 2024), compounded yearly
 * Investment period: Until girl child turns 21 or gets married after 18
 */
const calculateSSY = (annualDeposit, girlAge, startYear) => {
  const annualRate = 8.2; // Fixed by government
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  const depositYears = 15; // Deposits allowed for 15 years
  const maturityYears = 21; // Maturity period from start year

  const depositMonths = depositYears * 12;
  const maturityMonths = maturityYears * 12;
  const monthlyDeposit = annualDeposit / 12;

  let balance = 0;
  let accruedInterest = 0;

  // Accrue interest monthly and credit yearly to mirror scheme behavior
  for (let month = 0; month < maturityMonths; month++) {
    if (month < depositMonths) {
      balance += monthlyDeposit;
    }

    accruedInterest += balance * monthlyRate;

    if ((month + 1) % 12 === 0) {
      balance += Math.round(accruedInterest);
      accruedInterest = 0;
    }
  }

  const maturityAmount = balance;
  const totalInvestment = annualDeposit * depositYears;
  const wealthGained = maturityAmount - totalInvestment;
  const maturityYear = startYear + maturityYears;

  return {
    totalInvestment: Math.round(totalInvestment),
    wealthGained: Math.round(wealthGained),
    maturityAmount: Math.round(maturityAmount),
    maturityYear,
    interestRate: annualRate,
    girlAge
  };
};

/**
 * Calculate PPF (Public Provident Fund)
 * Current rate: 7.1% (as of 2024), compounded yearly
 * Lock-in period: 15 years (can extend in blocks of 5 years)
 */
const calculatePPF = (annualDeposit, years = 15) => {
  const annualRate = 7.1; // Fixed by government
  const rate = annualRate / 100;
  
  let maturityAmount = 0;
  
  // Calculate year-by-year compound interest
  for (let i = 0; i < years; i++) {
    const yearsRemaining = years - i;
    maturityAmount += annualDeposit * Math.pow(1 + rate, yearsRemaining);
  }
  
  const totalInvestment = annualDeposit * years;
  const wealthGained = maturityAmount - totalInvestment;
  
  return {
    totalInvestment: Math.round(totalInvestment),
    wealthGained: Math.round(wealthGained),
    maturityAmount: Math.round(maturityAmount),
    interestRate: annualRate,
    tenure: years
  };
};

/**
 * Calculate EPF (Employee Provident Fund)
 * Employee contribution: 12% of basic salary
 * Employer contribution: 12% (3.67% to EPF, 8.33% to EPS)
 * Current rate: 8.25% per annum
 */
const calculateEPF = (basicSalary, age, employeeContributionRate, annualIncrease, interestRate, retirementAge = 58) => {
  const annualRate = interestRate / 100;
  const employerContributionRate = 12; // Employer contribution (EPS + EPF) as per scheme

  const years = retirementAge - age;
  const months = years * 12;

  let balance = 0;
  let totalEmployeeContribution = 0;
  let totalEmployerContribution = 0;
  let currentSalary = basicSalary;

  const monthlyRate = annualRate / 12;

  for (let month = 0; month < months; month++) {
    const employeeContribution = currentSalary * (employeeContributionRate / 100);
    const employerContribution = currentSalary * (employerContributionRate / 100);

    totalEmployeeContribution += employeeContribution;
    totalEmployerContribution += employerContribution;

    balance += employeeContribution + employerContribution;
    balance = balance * (1 + monthlyRate);

    if ((month + 1) % 12 === 0) {
      currentSalary = currentSalary * (1 + annualIncrease / 100);
    }
  }

  const totalInvestment = totalEmployeeContribution + totalEmployerContribution;
  const interestEarned = balance - totalInvestment;

  return {
    employeeContribution: Math.round(totalEmployeeContribution),
    employerContribution: Math.round(totalEmployerContribution),
    interestEarned: Math.round(interestEarned),
    maturityAmount: Math.round(balance),
    interestRate: interestRate
  };
};

/**
 * Calculate NPS (National Pension System)
 * Returns corpus at retirement
 */
const calculateNPS = (monthlyInvestment, currentAge, retirementAge, expectedReturn) => {
  const years = retirementAge - currentAge;
  const months = years * 12;
  const monthlyRate = expectedReturn / 12 / 100;
  
  let maturityAmount = 0;
  if (monthlyRate === 0) {
    maturityAmount = monthlyInvestment * months;
  } else {
    // Groww uses end-of-month contributions (ordinary annuity)
    maturityAmount = monthlyInvestment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  }
  
  const totalInvestment = monthlyInvestment * months;
  const interestEarned = maturityAmount - totalInvestment;
  const minAnnuityInvestment = maturityAmount * 0.4;
  
  return {
    totalInvestment: Math.round(totalInvestment),
    interestEarned: Math.round(interestEarned),
    maturityAmount: Math.round(maturityAmount),
    minAnnuityInvestment: Math.round(minAnnuityInvestment)
  };
};

/**
 * Calculate APY (Atal Pension Yojana)
 * Fixed pension amount: 1000, 2000, 3000, 4000, 5000
 */
const calculateAPY = (currentAge, pensionAmount) => {
  // Monthly contribution table (simplified - actual values vary by age)
  const contributionTable = {
    18: { 1000: 42, 2000: 84, 3000: 126, 4000: 168, 5000: 210 },
    25: { 1000: 76, 2000: 151, 3000: 226, 4000: 301, 5000: 376 },
    30: { 1000: 116, 2000: 231, 3000: 347, 4000: 462, 5000: 577 },
    35: { 1000: 181, 2000: 362, 3000: 543, 4000: 724, 5000: 902 },
    40: { 1000: 291, 2000: 582, 3000: 873, 4000: 1164, 5000: 1454 }
  };
  
  // Find closest age in table
  const ages = [18, 25, 30, 35, 40];
  const closestAge = ages.reduce((prev, curr) => 
    Math.abs(curr - currentAge) < Math.abs(prev - currentAge) ? curr : prev
  );
  
  const monthlyContribution = contributionTable[closestAge][pensionAmount] || 210;
  const yearsToRetirement = 60 - currentAge;
  const totalInvestment = monthlyContribution * 12 * yearsToRetirement;
  
  return {
    monthlyContribution: Math.round(monthlyContribution),
    pensionAmount: Math.round(pensionAmount),
    totalInvestment: Math.round(totalInvestment),
    yearsToRetirement
  };
};

/**
 * Calculate Retirement Corpus Required
 */
const calculateRetirement = (currentAge, retirementAge, lifeExpectancy, monthlyExpenses, inflationRate, expectedReturn) => {
  const yearsToRetirement = retirementAge - currentAge;
  const retirementYears = lifeExpectancy - retirementAge;
  
  // Future value of monthly expenses at retirement
  const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);
  
  // Annual expenses at retirement
  const annualExpensesAtRetirement = futureMonthlyExpenses * 12;
  
  // Corpus required (using present value of annuity)
  const realReturn = ((1 + expectedReturn / 100) / (1 + inflationRate / 100) - 1);
  let corpusRequired;
  
  if (realReturn <= 0) {
    corpusRequired = annualExpensesAtRetirement * retirementYears;
  } else {
    corpusRequired = annualExpensesAtRetirement * 
      ((1 - Math.pow(1 + realReturn, -retirementYears)) / realReturn);
  }
  
  // Monthly SIP required
  const monthlyRate = expectedReturn / 12 / 100;
  const months = yearsToRetirement * 12;
  let monthlySIPRequired;
  
  if (monthlyRate === 0) {
    monthlySIPRequired = corpusRequired / months;
  } else {
    monthlySIPRequired = corpusRequired * monthlyRate / 
      (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  }
  
  return {
    corpusRequired: Math.round(corpusRequired),
    monthlySIPRequired: Math.round(monthlySIPRequired),
    futureMonthlyExpenses: Math.round(futureMonthlyExpenses),
    yearsToRetirement,
    retirementYears
  };
};

/**
 * Calculate Step-Up SIP
 * SIP amount increases by a fixed percentage annually
 */
const calculateStepUpSIP = (initialMonthlyInvestment, annualStepUp, annualRate, years) => {
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  const stepUpDecimal = annualStepUp / 100;
  
  let maturityAmount = 0;
  let totalInvestment = 0;
  let currentMonthlyInvestment = initialMonthlyInvestment;
  
  for (let year = 0; year < years; year++) {
    // Calculate for this year
    for (let month = 0; month < 12; month++) {
      totalInvestment += currentMonthlyInvestment;
      const monthsRemaining = (years - year) * 12 - month;
      maturityAmount += currentMonthlyInvestment * Math.pow(1 + monthlyRate, monthsRemaining);
    }
    // Step up for next year
    currentMonthlyInvestment = currentMonthlyInvestment * (1 + stepUpDecimal);
  }
  
  const wealthGained = maturityAmount - totalInvestment;
  
  return {
    totalInvestment: Math.round(totalInvestment),
    wealthGained: Math.round(wealthGained),
    maturityAmount: Math.round(maturityAmount),
    finalMonthlyInvestment: Math.round(currentMonthlyInvestment)
  };
};

/**
 * Calculate CAGR (Compound Annual Growth Rate)
 * Formula: CAGR = (Ending Value / Beginning Value)^(1/n) - 1
 */
const calculateCAGR = (initialValue, finalValue, years) => {
  const cagr = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
  const absoluteReturn = finalValue - initialValue;
  const totalReturnPercentage = (absoluteReturn / initialValue) * 100;
  
  return {
    initialValue: Math.round(initialValue),
    finalValue: Math.round(finalValue),
    cagr: Math.round(cagr * 100) / 100,
    absoluteReturn: Math.round(absoluteReturn),
    totalReturnPercentage: Math.round(totalReturnPercentage * 100) / 100,
    years
  };
};

/**
 * Calculate XIRR (Extended Internal Rate of Return)
 * Uses Newton-Raphson method for IRR calculation
 */
const calculateXIRR = (cashflows, dates) => {
  const cashflowPairs = dates.map((date, index) => ({
    date,
    cashflow: cashflows[index]
  })).sort((a, b) => a.date - b.date);

  const orderedDates = cashflowPairs.map((entry) => entry.date);
  const orderedCashflows = cashflowPairs.map((entry) => entry.cashflow);

  const xnpv = (rate) => {
    let result = 0;
    const startDate = orderedDates[0];

    for (let i = 0; i < orderedCashflows.length; i++) {
      const daysDiff = (orderedDates[i] - startDate) / (1000 * 60 * 60 * 24);
      result += orderedCashflows[i] / Math.pow(1 + rate, daysDiff / 365);
    }
    return result;
  };

  const xnpvDerivative = (rate) => {
    let result = 0;
    const startDate = orderedDates[0];

    for (let i = 0; i < orderedCashflows.length; i++) {
      const daysDiff = (orderedDates[i] - startDate) / (1000 * 60 * 60 * 24);
      const years = daysDiff / 365;
      result -= years * orderedCashflows[i] / Math.pow(1 + rate, years + 1);
    }
    return result;
  };

  const solveWithNewton = () => {
    let rate = 0.1;
    const maxIterations = 100;
    const tolerance = 0.000001;
    let iterations = 0;

    while (iterations < maxIterations) {
      const npv = xnpv(rate);
      if (Math.abs(npv) < tolerance) {
        return { rate, converged: true };
      }

      const derivative = xnpvDerivative(rate);
      if (!Number.isFinite(derivative) || Math.abs(derivative) < 1e-12) {
        break;
      }

      const nextRate = rate - npv / derivative;
      if (!Number.isFinite(nextRate) || nextRate <= -0.999999) {
        break;
      }

      rate = nextRate;
      iterations += 1;
    }

    return { rate: Number.NaN, converged: false };
  };

  const solveWithBisection = () => {
    const tolerance = 0.000001;
    let low = -0.9999;
    let high = 1;
    let npvLow = xnpv(low);
    let npvHigh = xnpv(high);
    let attempts = 0;

    while (npvLow * npvHigh > 0 && attempts < 50) {
      high *= 2;
      npvHigh = xnpv(high);
      attempts += 1;
    }

    if (npvLow * npvHigh > 0) {
      return { rate: Number.NaN, converged: false };
    }

    for (let i = 0; i < 200; i++) {
      const mid = (low + high) / 2;
      const npvMid = xnpv(mid);

      if (Math.abs(npvMid) < tolerance) {
        return { rate: mid, converged: true };
      }

      if (npvLow * npvMid > 0) {
        low = mid;
        npvLow = npvMid;
      } else {
        high = mid;
        npvHigh = npvMid;
      }
    }

    return { rate: (low + high) / 2, converged: true };
  };

  const newtonResult = solveWithNewton();
  const solveResult = newtonResult.converged ? newtonResult : solveWithBisection();

  const totalInvested = orderedCashflows
    .filter((cf) => cf < 0)
    .reduce((sum, cf) => sum + Math.abs(cf), 0);
  const totalValue = orderedCashflows
    .filter((cf) => cf > 0)
    .reduce((sum, cf) => sum + cf, 0);

  if (!solveResult.converged || !Number.isFinite(solveResult.rate)) {
    return {
      xirr: Number.NaN,
      totalInvested: Math.round(totalInvested),
      totalValue: Math.round(totalValue),
      absoluteReturn: Math.round(totalValue - totalInvested),
      converged: false
    };
  }

  const xirr = solveResult.rate * 100;

  return {
    xirr: Math.round(xirr * 100) / 100,
    totalInvested: Math.round(totalInvested),
    totalValue: Math.round(totalValue),
    absoluteReturn: Math.round(totalValue - totalInvested),
    converged: true
  };
};

/**
 * Calculate FD (Fixed Deposit)
 * Simple and compound interest options
 */
const calculateFD = (principal, annualRate, years, compoundingFrequency = 4) => {
  const rate = annualRate / 100;
  
  // Quarterly compounding is most common
  const n = compoundingFrequency; // 1=Yearly, 4=Quarterly, 12=Monthly
  const maturityAmount = principal * Math.pow(1 + rate / n, n * years);
  const interestEarned = maturityAmount - principal;
  
  return {
    principal: Math.round(principal),
    interestEarned: Math.round(interestEarned),
    maturityAmount: Math.round(maturityAmount),
    interestRate: annualRate
  };
};

/**
 * Calculate RD (Recurring Deposit)
 * Formula: M = P × [(1 + r)^n - 1] / [1 - (1 + r)^(-1/3)]
 */
const calculateRD = (monthlyDeposit, annualRate, years) => {
  const months = Math.round(years * 12);
  const quarterlyRate = annualRate / 100 / 4;
  
  let maturityAmount = 0;
  
  // Each deposit compounds quarterly for the remaining term.
  for (let i = 0; i < months; i++) {
    const monthsRemaining = months - i;
    const quartersRemaining = monthsRemaining / 3;
    const perDepositMaturity = monthlyDeposit * Math.pow(1 + quarterlyRate, quartersRemaining);
    maturityAmount += Math.round(perDepositMaturity);
  }
  
  const totalInvestment = monthlyDeposit * months;
  const interestEarned = maturityAmount - totalInvestment;
  
  return {
    monthlyDeposit: Math.round(monthlyDeposit),
    totalInvestment: Math.round(totalInvestment),
    interestEarned: Math.round(interestEarned),
    maturityAmount: Math.round(maturityAmount),
    interestRate: annualRate
  };
};

/**
 * Calculate NSC (National Savings Certificate)
 * Fixed 5-year tenure, current rate 7.7%
 */
const calculateNSC = (principal, annualRate = 6, years = 5) => {
  const rate = annualRate / 100;
  
  const maturityAmount = principal * Math.pow(1 + rate, years);
  const interestEarned = maturityAmount - principal;
  
  return {
    principal: Math.round(principal),
    interestEarned: Math.round(interestEarned),
    maturityAmount: Math.round(maturityAmount),
    interestRate: annualRate,
    tenure: years
  };
};

/**
 * Calculate Post Office MIS (Monthly Income Scheme)
 * Current rate: 7.4% per annum, paid monthly
 */
const calculatePostOfficeMIS = (principal) => {
  const annualRate = 7.4;
  const monthlyIncome = (principal * annualRate) / 100 / 12;
  const annualIncome = monthlyIncome * 12;
  const fiveYearIncome = annualIncome * 5;
  
  return {
    principal: Math.round(principal),
    monthlyIncome: Math.round(monthlyIncome),
    annualIncome: Math.round(annualIncome),
    fiveYearIncome: Math.round(fiveYearIncome),
    interestRate: annualRate
  };
};

/**
 * Calculate SCSS (Senior Citizen Savings Scheme)
 * Current rate: 8.2%, quarterly payout
 */
const calculateSCSS = (principal, annualRate = 8.2, years = 5) => {
  const quarterlyInterest = (principal * annualRate) / 100 / 4;
  const annualInterest = quarterlyInterest * 4;
  const totalInterest = annualInterest * years;
  const maturityAmount = principal + totalInterest;
  
  return {
    principal: Math.round(principal),
    quarterlyInterest: Math.round(quarterlyInterest),
    annualInterest: Math.round(annualInterest),
    totalInterest: Math.round(totalInterest),
    maturityAmount: Math.round(maturityAmount),
    interestRate: annualRate
  };
};

/**
 * Calculate EMI (Equated Monthly Installment)
 * Formula: EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]
 */
const calculateEMI = (principal, annualRate, years) => {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  
  let emi;
  if (monthlyRate === 0) {
    emi = principal / months;
  } else {
    emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / 
          (Math.pow(1 + monthlyRate, months) - 1);
  }
  
  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;
  
  return {
    emi: Math.round(emi),
    principal: Math.round(principal),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    interestRate: annualRate
  };
};

/**
 * Calculate Home Loan EMI
 * Same as EMI but with home loan specific details
 */
const calculateHomeLoanEMI = (loanAmount, annualRate, years) => {
  const result = calculateEMI(loanAmount, annualRate, years);
  return {
    ...result,
    loanAmount: result.principal
  };
};

/**
 * Calculate Car Loan EMI
 * Same as EMI but with car loan specific details
 */
const calculateCarLoanEMI = (loanAmount, annualRate, years) => {
  const result = calculateEMI(loanAmount, annualRate, years);
  return {
    ...result,
    loanAmount: result.principal
  };
};

/**
 * Calculate Flat vs Reducing Interest Rate
 * Shows comparison between flat and reducing rate EMIs
 */
const calculateFlatReducing = (principal, annualRate, tenureValue, tenureUnit = 'years') => {
  const months = tenureUnit === 'months' ? tenureValue : tenureValue * 12;
  const years = tenureUnit === 'months' ? tenureValue / 12 : tenureValue;

  // Flat rate EMI
  const totalInterestFlat = (principal * annualRate * years) / 100;
  const totalPaymentFlat = principal + totalInterestFlat;
  const emiFlat = totalPaymentFlat / months;

  // Reducing balance EMI
  const monthlyRate = annualRate / 12 / 100;
  const emiReducing = principal * monthlyRate * Math.pow(1 + monthlyRate, months) /
                      (Math.pow(1 + monthlyRate, months) - 1);
  const totalPaymentReducing = emiReducing * months;
  const totalInterestReducing = totalPaymentReducing - principal;

  return {
    flatRateEMI: Math.round(emiFlat),
    flatRateTotalInterest: Math.round(totalInterestFlat),
    flatRateTotalAmount: Math.round(totalPaymentFlat),
    reducingRateEMI: Math.round(emiReducing),
    reducingRateTotalInterest: Math.round(totalInterestReducing),
    reducingRateTotalAmount: Math.round(totalPaymentReducing),
    savings: Math.round(totalInterestFlat - totalInterestReducing)
  };
};

/**
 * Calculate Simple Interest
 * Formula: SI = P × R × T / 100
 */
const calculateSimpleInterest = (principal, annualRate, years) => {
  const interest = (principal * annualRate * years) / 100;
  const totalAmount = principal + interest;
  
  return {
    principal: Math.round(principal),
    interest: Math.round(interest),
    totalAmount: Math.round(totalAmount),
    interestRate: annualRate,
    years
  };
};

/**
 * Calculate Compound Interest
 * Formula: A = P(1 + r/n)^(nt)
 */
const calculateCompoundInterest = (principal, annualRate, years, compoundingFrequency = 1) => {
  const rate = annualRate / 100;
  const n = compoundingFrequency; // 1=Yearly, 2=Half-yearly, 4=Quarterly, 12=Monthly
  
  const totalAmount = principal * Math.pow(1 + rate / n, n * years);
  const compoundInterest = totalAmount - principal;
  
  // Also calculate simple interest for comparison
  const simpleInterest = (principal * annualRate * years) / 100;
  const difference = compoundInterest - simpleInterest;
  
  return {
    principal: Math.round(principal),
    compoundInterest: Math.round(compoundInterest),
    totalAmount: Math.round(totalAmount),
    simpleInterest: Math.round(simpleInterest),
    additionalInterest: Math.round(difference),
    interestRate: annualRate
  };
};

/**
 * Calculate HRA (House Rent Allowance)
 * Tax exemption calculation as per Indian IT rules
 */
const calculateHRA = (basicSalary, dearnessAllowance, hra, rentPaid, isMetro) => {
  // HRA exemption is minimum of:
  // 1. Actual HRA received
  // 2. 50% of basic (metro) or 40% of basic (non-metro)
  // 3. Rent paid - 10% of basic salary
  const salaryForHra = basicSalary + dearnessAllowance;
  const metroPercent = isMetro ? 0.5 : 0.4;
  const option1 = hra;
  const option2 = salaryForHra * metroPercent;
  const option3 = Math.max(0, rentPaid - salaryForHra * 0.1);
  
  const exemption = Math.min(option1, option2, option3);
  const taxableHRA = Math.max(0, hra - exemption);
  
  return {
    exemption: Math.round(exemption),
    taxableHRA: Math.round(taxableHRA),
    rentPaid: Math.round(rentPaid),
    basicSalary: Math.round(basicSalary),
    dearnessAllowance: Math.round(dearnessAllowance)
  };
};

/**
 * Calculate Gratuity
 * Formula: (Last drawn salary × 15/26) × Years of service
 */
const calculateGratuity = (lastSalary, yearsOfService, monthsOfService = 0) => {
  const roundedYears = monthsOfService >= 6 ? yearsOfService + 1 : yearsOfService;
  const gratuity = (lastSalary * 15 * roundedYears) / 26;
  
  // Groww caps gratuity at 10 lakhs for payable amount
  const maxGratuity = 1000000;
  const finalGratuity = Math.min(gratuity, maxGratuity);
  
  return {
    gratuity: Math.round(finalGratuity),
    yearsOfService: roundedYears,
    lastSalary: Math.round(lastSalary),
    maxGratuity
  };
};

/**
 * Calculate Income Tax (Simplified for new tax regime FY 2024-25)
 */
const calculateIncomeTax = (annualIncome, regime = 'new') => {
  let tax = 0;
  
  if (regime === 'new') {
    // New tax regime slabs (FY 2024-25)
    if (annualIncome <= 300000) {
      tax = 0;
    } else if (annualIncome <= 700000) {
      tax = (annualIncome - 300000) * 0.05;
    } else if (annualIncome <= 1000000) {
      tax = 20000 + (annualIncome - 700000) * 0.10;
    } else if (annualIncome <= 1200000) {
      tax = 50000 + (annualIncome - 1000000) * 0.15;
    } else if (annualIncome <= 1500000) {
      tax = 80000 + (annualIncome - 1200000) * 0.20;
    } else {
      tax = 140000 + (annualIncome - 1500000) * 0.30;
    }
  } else {
    // Old tax regime
    if (annualIncome <= 250000) {
      tax = 0;
    } else if (annualIncome <= 500000) {
      tax = (annualIncome - 250000) * 0.05;
    } else if (annualIncome <= 1000000) {
      tax = 12500 + (annualIncome - 500000) * 0.20;
    } else {
      tax = 112500 + (annualIncome - 1000000) * 0.30;
    }
  }
  
  // Add 4% cess
  const cess = tax * 0.04;
  const totalTax = tax + cess;
  const monthlyTax = totalTax / 12;
  const netIncome = annualIncome - totalTax;
  
  return {
    annualIncome: Math.round(annualIncome),
    totalTax: Math.round(totalTax),
    cess: Math.round(cess),
    netIncome: Math.round(netIncome),
    monthlyTax: Math.round(monthlyTax),
    effectiveRate: Math.round((totalTax / annualIncome) * 10000) / 100
  };
};

/**
 * Calculate TDS (Tax Deducted at Source)
 * For salary income
 */
const calculateTDS = (annualIncome, standardDeduction = 50000, otherDeductions = 0) => {
  const taxableIncome = annualIncome - standardDeduction - otherDeductions;
  const taxResult = calculateIncomeTax(taxableIncome, 'new');
  
  const monthlyTDS = taxResult.monthlyTax;
  const annualTDS = taxResult.totalTax;
  
  return {
    annualIncome: Math.round(annualIncome),
    standardDeduction: Math.round(standardDeduction),
    otherDeductions: Math.round(otherDeductions),
    taxableIncome: Math.round(taxableIncome),
    monthlyTDS: Math.round(monthlyTDS),
    annualTDS: Math.round(annualTDS)
  };
};

/**
 * Calculate Salary Breakdown (CTC to In-hand)
 */
const calculateSalary = (
  ctc,
  bonusPercent = 0,
  monthlyProfessionalTax = 0,
  monthlyEmployerPf = 0,
  monthlyEmployeePf = 0,
  monthlyAdditionalDeduction1 = 0,
  monthlyAdditionalDeduction2 = 0
) => {
  const bonusAmount = ctc * (bonusPercent / 100);

  const monthlyDeductions =
    monthlyProfessionalTax +
    monthlyEmployerPf +
    monthlyEmployeePf +
    monthlyAdditionalDeduction1 +
    monthlyAdditionalDeduction2;

  const totalMonthlyDeductions = monthlyDeductions + (bonusAmount / 12);
  const totalAnnualDeductions = monthlyDeductions * 12 + bonusAmount;

  const takeHomeAnnual = ctc - totalAnnualDeductions;
  const takeHomeMonthly = takeHomeAnnual / 12;

  return {
    ctc: Math.round(ctc),
    totalMonthlyDeductions: Math.round(totalMonthlyDeductions),
    totalAnnualDeductions: Math.round(totalAnnualDeductions),
    takeHomeMonthly: Math.round(takeHomeMonthly),
    takeHomeAnnual: Math.round(takeHomeAnnual)
  };
};

/**
 * Calculate GST
 */
const calculateGST = (amount, gstRate, isInclusive = false) => {
  let baseAmount, gstAmount, totalAmount;
  
  if (isInclusive) {
    // Amount includes GST
    totalAmount = amount;
    baseAmount = amount / (1 + gstRate / 100);
    gstAmount = amount - baseAmount;
  } else {
    // Amount excludes GST
    baseAmount = amount;
    gstAmount = amount * (gstRate / 100);
    totalAmount = amount + gstAmount;
  }
  
  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;
  
  return {
    baseAmount: Math.round(baseAmount),
    gstAmount: Math.round(gstAmount),
    cgst: Math.round(cgst),
    sgst: Math.round(sgst),
    totalAmount: Math.round(totalAmount),
    gstRate
  };
};

/**
 * Calculate Inflation Impact
 */
const calculateInflation = (currentAmount, inflationRate, years) => {
  const futureValue = currentAmount * Math.pow(1 + inflationRate / 100, years);
  const valueErosion = futureValue - currentAmount;
  const purchasingPower = (currentAmount / futureValue) * 100;
  
  return {
    currentAmount: Math.round(currentAmount),
    futureValue: Math.round(futureValue),
    valueErosion: Math.round(valueErosion),
    purchasingPower: Math.round(purchasingPower * 100) / 100,
    inflationRate,
    years
  };
};

/**
 * Calculate Brokerage
 */
const calculateBrokerage = (buyPrice, sellPrice, quantity, segment = 'equity-delivery', exchange = 'NSE') => {
  const buyValue = buyPrice * quantity;
  const sellValue = sellPrice * quantity;
  const turnover = buyValue + sellValue;

  const round2 = (value) => Math.round(value * 100) / 100;

  // Groww brokerage: max(min(0.1% of trade value, 20), 5) per order
  const brokeragePerSide = (tradeValue) => {
    const percent = tradeValue * 0.001;
    return Math.max(Math.min(percent, 20), 5);
  };

  const buyBrokerage = brokeragePerSide(buyValue);
  const sellBrokerage = brokeragePerSide(sellValue);
  const growwCharges = buyBrokerage + sellBrokerage;

  // STT
  let stt = 0;
  if (segment === 'equity-delivery') {
    stt = turnover * 0.001;
  } else if (segment === 'equity-intraday') {
    stt = sellValue * 0.00025;
  } else {
    // F&O (approximate futures rate on sell value)
    stt = sellValue * 0.0001;
  }

  // Exchange charges
  const exchangeRate = exchange === 'BSE' ? 0.0000375 : 0.0000297;
  const exchangeCharges = turnover * exchangeRate;

  // SEBI turnover fees - 0.0001%
  const sebiCharges = turnover * 0.000001;

  // Stamp duty - 0.015% on buy side
  const stampDuty = buyValue * 0.00015;

  // GST on brokerage + exchange charges + SEBI
  const gst = (growwCharges + exchangeCharges + sebiCharges) * 0.18;

  const nonGrowwCharges = stt + exchangeCharges + sebiCharges + gst + stampDuty;
  const totalCharges = growwCharges + nonGrowwCharges;

  const grossPnl = sellValue - buyValue;
  const netPnl = grossPnl - totalCharges;

  return {
    turnover: round2(turnover),
    grossPnl: round2(grossPnl),
    totalCharges: round2(totalCharges),
    growwCharges: round2(growwCharges),
    nonGrowwCharges: round2(nonGrowwCharges),
    stt: round2(stt),
    exchangeCharges: round2(exchangeCharges),
    sebiCharges: round2(sebiCharges),
    gst: round2(gst),
    stampDuty: round2(stampDuty),
    netPnl: round2(netPnl)
  };
};

/**
 * Calculate Margin Required
 */
const calculateMargin = (stockPrice, quantity, leverage = 5) => {
  const totalValue = stockPrice * quantity;
  const marginRequired = totalValue / leverage;
  const exposure = totalValue;
  
  return {
    stockPrice: Math.round(stockPrice),
    quantity,
    totalValue: Math.round(totalValue),
    marginRequired: Math.round(marginRequired),
    leverage,
    exposure: Math.round(exposure)
  };
};

/**
 * Calculate Stock Average Price
 */
const calculateStockAverage = (purchases) => {
  // purchases = [{ quantity, price }, ...]
  let totalQuantity = 0;
  let totalCost = 0;
  
  purchases.forEach(purchase => {
    totalQuantity += purchase.quantity;
    totalCost += purchase.quantity * purchase.price;
  });
  
  const averagePrice = totalCost / totalQuantity;
  
  return {
    totalQuantity,
    totalCost: Math.round(totalCost),
    averagePrice: Math.round(averagePrice * 100) / 100
  };
};

/**
 * Calculate Loan Eligibility
 * Uses EMI affordability ratio to estimate eligible principal
 */
const calculateLoanEligibility = (monthlyIncome, existingEmi, annualRate, years, maxEmiRatio = 50) => {
  const maxEmi = Math.max(0, (monthlyIncome * (maxEmiRatio / 100)) - existingEmi);
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;

  let eligibleLoanAmount;
  if (monthlyRate === 0) {
    eligibleLoanAmount = maxEmi * months;
  } else {
    const factor = Math.pow(1 + monthlyRate, months);
    eligibleLoanAmount = maxEmi * (factor - 1) / (monthlyRate * factor);
  }

  const totalPayment = maxEmi * months;

  return {
    eligibleLoanAmount: Math.round(eligibleLoanAmount),
    maxEmi: Math.round(maxEmi),
    totalPayment: Math.round(totalPayment),
    annualRate,
    years
  };
};

module.exports = {
  calculateSIP,
  calculateLumpsum,
  calculateSWP,
  calculateMFReturns,
  calculateSSY,
  calculatePPF,
  calculateEPF,
  calculateNPS,
  calculateAPY,
  calculateRetirement,
  calculateStepUpSIP,
  calculateCAGR,
  calculateXIRR,
  calculateFD,
  calculateRD,
  calculateNSC,
  calculatePostOfficeMIS,
  calculateSCSS,
  calculateEMI,
  calculateHomeLoanEMI,
  calculateCarLoanEMI,
  calculateFlatReducing,
  calculateSimpleInterest,
  calculateCompoundInterest,
  calculateHRA,
  calculateGratuity,
  calculateIncomeTax,
  calculateTDS,
  calculateSalary,
  calculateGST,
  calculateInflation,
  calculateBrokerage,
  calculateMargin,
  calculateStockAverage,
  calculateLoanEligibility
};

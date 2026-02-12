/**
 * Frontend Calculation Engine
 * All financial calculation formulas for real-time computation
 */

/**
 * Calculate SIP (Systematic Investment Plan)
 */
export const calculateSIP = (monthlyInvestment, annualRate, years) => {
  const monthlyRate = (annualRate / 100) / 12;
  const months = years * 12;
  const totalInvestment = monthlyInvestment * months;
  
  let maturityAmount;
  if (monthlyRate === 0) {
    maturityAmount = totalInvestment;
  } else {
    maturityAmount = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  }
  
  const wealthGained = maturityAmount - totalInvestment;
  
  return {
    totalInvestment: Math.round(totalInvestment),
    wealthGained: Math.round(wealthGained),
    maturityAmount: Math.round(maturityAmount)
  };
};

/**
 * Calculate Lumpsum Investment
 */
export const calculateLumpsum = (principal, annualRate, years) => {
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
 * Calculate SWP (Systematic Withdrawal Plan)
 */
export const calculateSWP = (initialInvestment, monthlyWithdrawal, annualRate, years) => {
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  const months = years * 12;
  
  let balance = initialInvestment;
  let totalWithdrawn = 0;
  
  for (let i = 0; i < months; i++) {
    balance = balance * (1 + monthlyRate);
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
 */
export const calculateMFReturns = (principal, annualRate, years) => {
  return calculateLumpsum(principal, annualRate, years);
};

/**
 * Calculate SSY (Sukanya Samriddhi Yojana)
 */
export const calculateSSY = (annualDeposit, girlAge, startYear) => {
  const annualRate = 8.2;
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  const depositYears = 15;
  const maturityYears = 21;
  const depositMonths = depositYears * 12;
  const maturityMonths = maturityYears * 12;
  const monthlyDeposit = annualDeposit / 12;

  let balance = 0;

  for (let month = 0; month < maturityMonths; month++) {
    if (month < depositMonths) {
      balance += monthlyDeposit;
    }
    // Apply compound interest monthly
    balance = balance * (1 + monthlyRate);
  }

  const maturityAmount = balance;
  const totalInvestment = annualDeposit * depositYears;
  const wealthGained = maturityAmount - totalInvestment;
  const maturityYear = startYear + maturityYears;

  return {
    totalInvestment: Math.round(totalInvestment),
    wealthGained: Math.round(wealthGained),
    maturityAmount: Math.round(maturityAmount),
    maturityYear
  };
};

/**
 * Calculate PPF (Public Provident Fund)
 */
export const calculatePPF = (annualDeposit, years = 15) => {
  const annualRate = 7.1;
  const rate = annualRate / 100;
  
  let maturityAmount = 0;
  for (let i = 0; i < years; i++) {
    const yearsRemaining = years - i;
    maturityAmount += annualDeposit * Math.pow(1 + rate, yearsRemaining);
  }
  
  const totalInvestment = annualDeposit * years;
  const wealthGained = maturityAmount - totalInvestment;
  
  return {
    totalInvestment: Math.round(totalInvestment),
    wealthGained: Math.round(wealthGained),
    maturityAmount: Math.round(maturityAmount)
  };
};

/**
 * Calculate EPF (Employee Provident Fund)
 */
export const calculateEPF = (basicSalary, age, employeeContributionRate, annualIncrease, interestRate, retirementAge = 58) => {
  const annualRate = interestRate / 100;
  const employerContributionRate = 12;
  const years = retirementAge - age;
  const months = years * 12;
  const monthlyRate = annualRate / 12;

  let balance = 0;
  let totalEmployeeContribution = 0;
  let totalEmployerContribution = 0;
  let currentSalary = basicSalary;

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

  const interestEarned = balance - (totalEmployeeContribution + totalEmployerContribution);

  return {
    employeeContribution: Math.round(totalEmployeeContribution),
    employerContribution: Math.round(totalEmployerContribution),
    interestEarned: Math.round(interestEarned),
    maturityAmount: Math.round(balance)
  };
};

/**
 * Calculate NPS (National Pension System)
 */
export const calculateNPS = (monthlyInvestment, currentAge, expectedReturn) => {
  const retirementAge = 60;
  const years = retirementAge - currentAge;
  const months = years * 12;
  const monthlyRate = expectedReturn / 12 / 100;
  
  let maturityAmount = 0;
  if (monthlyRate === 0) {
    maturityAmount = monthlyInvestment * months;
  } else {
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
 */
export const calculateAPY = (currentAge, pensionAmount) => {
  const contributionTable = {
    18: { 1000: 42, 2000: 84, 3000: 126, 4000: 168, 5000: 210 },
    25: { 1000: 76, 2000: 151, 3000: 226, 4000: 301, 5000: 376 },
    30: { 1000: 116, 2000: 231, 3000: 347, 4000: 462, 5000: 577 },
    35: { 1000: 181, 2000: 362, 3000: 543, 4000: 724, 5000: 902 },
    40: { 1000: 291, 2000: 582, 3000: 873, 4000: 1164, 5000: 1454 }
  };
  
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
 * Calculate Retirement Corpus
 */
export const calculateRetirement = (currentAge, retirementAge, lifeExpectancy, monthlyExpenses, inflationRate, expectedReturn) => {
  const yearsToRetirement = retirementAge - currentAge;
  const retirementYears = lifeExpectancy - retirementAge;
  const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);
  const annualExpensesAtRetirement = futureMonthlyExpenses * 12;
  const realReturn = ((1 + expectedReturn / 100) / (1 + inflationRate / 100) - 1);
  
  let corpusRequired;
  if (realReturn <= 0) {
    corpusRequired = annualExpensesAtRetirement * retirementYears;
  } else {
    corpusRequired = annualExpensesAtRetirement * 
      ((1 - Math.pow(1 + realReturn, -retirementYears)) / realReturn);
  }
  
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
    yearsToRetirement
  };
};

/**
 * Calculate Step-Up SIP
 */
export const calculateStepUpSIP = (initialMonthlyInvestment, annualStepUp, annualRate, years) => {
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  const stepUpDecimal = annualStepUp / 100;
  
  let maturityAmount = 0;
  let totalInvestment = 0;
  let currentMonthlyInvestment = initialMonthlyInvestment;
  
  for (let year = 0; year < years; year++) {
    for (let month = 0; month < 12; month++) {
      totalInvestment += currentMonthlyInvestment;
      const monthsRemaining = (years - year) * 12 - month;
      maturityAmount += currentMonthlyInvestment * Math.pow(1 + monthlyRate, monthsRemaining);
    }
    currentMonthlyInvestment = currentMonthlyInvestment * (1 + stepUpDecimal);
  }
  
  const wealthGained = maturityAmount - totalInvestment;
  
  return {
    totalInvestment: Math.round(totalInvestment),
    wealthGained: Math.round(wealthGained),
    maturityAmount: Math.round(maturityAmount)
  };
};

/**
 * Calculate CAGR
 */
export const calculateCAGR = (initialValue, finalValue, years) => {
  const cagr = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
  const absoluteReturn = finalValue - initialValue;
  const totalReturnPercentage = (absoluteReturn / initialValue) * 100;
  
  return {
    cagr: Math.round(cagr * 100) / 100,
    absoluteReturn: Math.round(absoluteReturn),
    totalReturnPercentage: Math.round(totalReturnPercentage * 100) / 100
  };
};

/**
 * Calculate FD (Fixed Deposit)
 */
export const calculateFD = (principal, annualRate, years) => {
  const rate = annualRate / 100;
  const n = 4; // Quarterly compounding
  const maturityAmount = principal * Math.pow(1 + rate / n, n * years);
  const interestEarned = maturityAmount - principal;
  
  return {
    principal: Math.round(principal),
    interestEarned: Math.round(interestEarned),
    maturityAmount: Math.round(maturityAmount)
  };
};

/**
 * Calculate RD (Recurring Deposit)
 */
export const calculateRD = (monthlyDeposit, annualRate, years) => {
  const months = Math.round(years * 12);
  const quarterlyRate = annualRate / 100 / 4;
  
  let maturityAmount = 0;
  for (let i = 0; i < months; i++) {
    const monthsRemaining = months - i;
    const quartersRemaining = monthsRemaining / 3;
    const perDepositMaturity = monthlyDeposit * Math.pow(1 + quarterlyRate, quartersRemaining);
    maturityAmount += Math.round(perDepositMaturity);
  }
  
  const totalInvestment = monthlyDeposit * months;
  const interestEarned = maturityAmount - totalInvestment;
  
  return {
    totalInvestment: Math.round(totalInvestment),
    interestEarned: Math.round(interestEarned),
    maturityAmount: Math.round(maturityAmount)
  };
};

/**
 * Calculate NSC (National Savings Certificate)
 */
export const calculateNSC = (principal, annualRate, years) => {
  const rate = annualRate / 100;
  const maturityAmount = principal * Math.pow(1 + rate, years);
  const interestEarned = maturityAmount - principal;
  
  return {
    principal: Math.round(principal),
    interestEarned: Math.round(interestEarned),
    maturityAmount: Math.round(maturityAmount)
  };
};

/**
 * Calculate Post Office MIS
 */
export const calculatePostOfficeMIS = (principal) => {
  const annualRate = 7.4;
  const monthlyIncome = (principal * annualRate) / 100 / 12;
  const annualIncome = monthlyIncome * 12;
  const fiveYearIncome = annualIncome * 5;
  
  return {
    principal: Math.round(principal),
    monthlyIncome: Math.round(monthlyIncome),
    annualIncome: Math.round(annualIncome),
    fiveYearIncome: Math.round(fiveYearIncome)
  };
};

/**
 * Calculate SCSS (Senior Citizen Savings Scheme)
 */
export const calculateSCSS = (principal, annualRate, years) => {
  const quarterlyInterest = (principal * annualRate) / 100 / 4;
  const totalInterest = quarterlyInterest * 4 * years;
  const maturityAmount = principal + totalInterest;
  
  return {
    quarterlyInterest: Math.round(quarterlyInterest),
    totalInterest: Math.round(totalInterest),
    maturityAmount: Math.round(maturityAmount)
  };
};

/**
 * Calculate EMI
 */
export const calculateEMI = (principal, annualRate, years) => {
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
    totalPayment: Math.round(totalPayment)
  };
};

/**
 * Calculate Home Loan EMI
 */
export const calculateHomeLoanEMI = (loanAmount, annualRate, years) => {
  const result = calculateEMI(loanAmount, annualRate, years);
  return {
    ...result,
    loanAmount: result.principal
  };
};

/**
 * Calculate Car Loan EMI
 */
export const calculateCarLoanEMI = (loanAmount, annualRate, years) => {
  const result = calculateEMI(loanAmount, annualRate, years);
  return {
    ...result,
    loanAmount: result.principal
  };
};

/**
 * Calculate Flat vs Reducing Rate
 */
export const calculateFlatReducing = (principal, flatRate, tenureValue, tenureUnit) => {
  const months = tenureUnit === 'months' ? tenureValue : tenureValue * 12;
  const years = tenureUnit === 'months' ? tenureValue / 12 : tenureValue;

  const totalInterestFlat = (principal * flatRate * years) / 100;
  const totalPaymentFlat = principal + totalInterestFlat;
  const emiFlat = totalPaymentFlat / months;

  const monthlyRate = flatRate / 12 / 100;
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
 */
export const calculateSimpleInterest = (principal, annualRate, years) => {
  const interest = (principal * annualRate * years) / 100;
  const totalAmount = principal + interest;
  
  return {
    principal: Math.round(principal),
    interest: Math.round(interest),
    totalAmount: Math.round(totalAmount)
  };
};

/**
 * Calculate Compound Interest
 */
export const calculateCompoundInterest = (principal, annualRate, years, compoundingFrequency) => {
  const rate = annualRate / 100;
  const n = compoundingFrequency;
  const totalAmount = principal * Math.pow(1 + rate / n, n * years);
  const compoundInterest = totalAmount - principal;
  
  return {
    principal: Math.round(principal),
    compoundInterest: Math.round(compoundInterest),
    totalAmount: Math.round(totalAmount)
  };
};

/**
 * Calculate Salary
 */
export const calculateSalary = (ctc, bonusPercent, monthlyProfessionalTax, monthlyEmployerPf, monthlyEmployeePf, monthlyAdditionalDeduction1, monthlyAdditionalDeduction2) => {
  const bonusAmount = ctc * (bonusPercent / 100);
  const monthlyDeductions = monthlyProfessionalTax + monthlyEmployerPf + monthlyEmployeePf + 
                            monthlyAdditionalDeduction1 + monthlyAdditionalDeduction2;
  const totalMonthlyDeductions = monthlyDeductions + (bonusAmount / 12);
  const totalAnnualDeductions = monthlyDeductions * 12 + bonusAmount;
  const takeHomeAnnual = ctc - totalAnnualDeductions;
  const takeHomeMonthly = takeHomeAnnual / 12;

  return {
    totalMonthlyDeductions: Math.round(totalMonthlyDeductions),
    totalAnnualDeductions: Math.round(totalAnnualDeductions),
    takeHomeMonthly: Math.round(takeHomeMonthly),
    takeHomeAnnual: Math.round(takeHomeAnnual)
  };
};

/**
 * Calculate Income Tax
 */
export const calculateIncomeTax = (annualIncome, regime) => {
  let tax = 0;
  
  if (regime === 'new') {
    if (annualIncome <= 300000) tax = 0;
    else if (annualIncome <= 700000) tax = (annualIncome - 300000) * 0.05;
    else if (annualIncome <= 1000000) tax = 20000 + (annualIncome - 700000) * 0.10;
    else if (annualIncome <= 1200000) tax = 50000 + (annualIncome - 1000000) * 0.15;
    else if (annualIncome <= 1500000) tax = 80000 + (annualIncome - 1200000) * 0.20;
    else tax = 140000 + (annualIncome - 1500000) * 0.30;
  } else {
    if (annualIncome <= 250000) tax = 0;
    else if (annualIncome <= 500000) tax = (annualIncome - 250000) * 0.05;
    else if (annualIncome <= 1000000) tax = 12500 + (annualIncome - 500000) * 0.20;
    else tax = 112500 + (annualIncome - 1000000) * 0.30;
  }
  
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
 * Calculate HRA
 */
export const calculateHRA = (basicSalary, dearnessAllowance, hra, rentPaid, isMetro) => {
  const salaryForHra = basicSalary + dearnessAllowance;
  const metroPercent = isMetro ? 0.5 : 0.4;
  const option1 = hra;
  const option2 = salaryForHra * metroPercent;
  const option3 = Math.max(0, rentPaid - salaryForHra * 0.1);
  
  const exemption = Math.min(option1, option2, option3);
  const taxableHRA = Math.max(0, hra - exemption);
  
  return {
    exemption: Math.round(exemption),
    taxableHRA: Math.round(taxableHRA)
  };
};

/**
 * Calculate Gratuity
 */
export const calculateGratuity = (lastSalary, yearsOfService, monthsOfService) => {
  const roundedYears = monthsOfService >= 6 ? yearsOfService + 1 : yearsOfService;
  const gratuity = Math.min((lastSalary * 15 * roundedYears) / 26, 1000000);
  
  return {
    gratuity: Math.round(gratuity)
  };
};

/**
 * Calculate TDS
 */
export const calculateTDS = (annualIncome, standardDeduction, otherDeductions) => {
  const taxableIncome = annualIncome - standardDeduction - otherDeductions;
  const taxResult = calculateIncomeTax(taxableIncome, 'new');
  
  return {
    annualIncome: Math.round(annualIncome),
    taxableIncome: Math.round(taxableIncome),
    monthlyTDS: taxResult.monthlyTax,
    annualTDS: taxResult.totalTax
  };
};

/**
 * Calculate GST
 */
export const calculateGST = (amount, gstRate, isInclusive) => {
  let baseAmount, gstAmount, totalAmount;
  
  if (isInclusive) {
    totalAmount = amount;
    baseAmount = amount / (1 + gstRate / 100);
    gstAmount = amount - baseAmount;
  } else {
    baseAmount = amount;
    gstAmount = amount * (gstRate / 100);
    totalAmount = amount + gstAmount;
  }
  
  return {
    baseAmount: Math.round(baseAmount),
    gstAmount: Math.round(gstAmount),
    totalAmount: Math.round(totalAmount)
  };
};

/**
 * Calculate Brokerage
 */
export const calculateBrokerage = (buyPrice, sellPrice, quantity, segment, exchange) => {
  const buyValue = buyPrice * quantity;
  const sellValue = sellPrice * quantity;
  const turnover = buyValue + sellValue;
  const round2 = (value) => Math.round(value * 100) / 100;

  const brokeragePerSide = (tradeValue) => Math.max(Math.min(tradeValue * 0.001, 20), 5);
  const growwCharges = brokeragePerSide(buyValue) + brokeragePerSide(sellValue);

  let stt = 0;
  if (segment === 'equity-delivery') stt = turnover * 0.001;
  else if (segment === 'equity-intraday') stt = sellValue * 0.00025;
  else stt = sellValue * 0.0001;

  const exchangeRate = exchange === 'BSE' ? 0.0000375 : 0.0000297;
  const exchangeCharges = turnover * exchangeRate;
  const sebiCharges = turnover * 0.000001;
  const stampDuty = buyValue * 0.00015;
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
 * Calculate Margin
 */
export const calculateMargin = (stockPrice, quantity, leverage) => {
  const totalValue = stockPrice * quantity;
  const marginRequired = totalValue / leverage;
  const exposure = totalValue;
  
  return {
    totalValue: Math.round(totalValue),
    marginRequired: Math.round(marginRequired),
    exposure: Math.round(exposure),
    leverage
  };
};

/**
 * Calculate Inflation
 */
export const calculateInflation = (currentAmount, inflationRate, years) => {
  const futureValue = currentAmount * Math.pow(1 + inflationRate / 100, years);
  const valueErosion = futureValue - currentAmount;
  
  return {
    currentAmount: Math.round(currentAmount),
    futureValue: Math.round(futureValue),
    valueErosion: Math.round(valueErosion)
  };
};

/**
 * Calculate Stock Average
 */
export const calculateStockAverage = (price1, quantity1, price2, quantity2, price3, quantity3) => {
  let totalQuantity = quantity1;
  let totalCost = quantity1 * price1;
  
  if (price2 && quantity2) {
    totalQuantity += quantity2;
    totalCost += quantity2 * price2;
  }
  
  if (price3 && quantity3) {
    totalQuantity += quantity3;
    totalCost += quantity3 * price3;
  }
  
  const averagePrice = totalCost / totalQuantity;
  
  return {
    totalQuantity,
    totalCost: Math.round(totalCost),
    averagePrice: Math.round(averagePrice * 100) / 100
  };
};

/**
 * Calculate XIRR (Extended Internal Rate of Return)
 */
export const calculateXIRR = (startDate, frequency, recurringAmount, maturityDate, maturityAmount) => {
  // Generate cashflow dates based on frequency
  const cashflows = [];
  const start = new Date(startDate);
  const maturity = new Date(maturityDate);
  
  // Frequency mapping in days
  const frequencyDays = {
    '14-days': 14,
    'monthly': 30,
    'quarterly': 90,
    'half-yearly': 182,
    'yearly': 365
  };
  
  const dayIncrement = frequencyDays[frequency] || 30;
  
  // Generate investment cashflows (negative values)
  let currentDate = new Date(start);
  while (currentDate <= maturity) {
    cashflows.push({
      date: new Date(currentDate),
      amount: -recurringAmount
    });
    currentDate.setDate(currentDate.getDate() + dayIncrement);
  }
  
  // Add maturity cashflow (positive value)
  cashflows.push({
    date: new Date(maturity),
    amount: maturityAmount
  });
  
  // XIRR calculation using Newton-Raphson method
  const calculateXIRRValue = (rate, cashflows) => {
    return cashflows.reduce((sum, cf) => {
      const days = (cf.date - cashflows[0].date) / (1000 * 60 * 60 * 24);
      const years = days / 365;
      return sum + cf.amount / Math.pow(1 + rate, years);
    }, 0);
  };
  
  const calculateDerivative = (rate, cashflows) => {
    return cashflows.reduce((sum, cf) => {
      const days = (cf.date - cashflows[0].date) / (1000 * 60 * 60 * 24);
      const years = days / 365;
      return sum - (years * cf.amount) / Math.pow(1 + rate, years + 1);
    }, 0);
  };
  
  // Newton-Raphson iteration
  let guess = 0.1; // Initial guess of 10%
  let iteration = 0;
  const maxIterations = 100;
  const tolerance = 0.0000001;
  
  while (iteration < maxIterations) {
    const value = calculateXIRRValue(guess, cashflows);
    const derivative = calculateDerivative(guess, cashflows);
    
    if (Math.abs(value) < tolerance) {
      break;
    }
    
    guess = guess - value / derivative;
    iteration++;
  }
  
  const xirr = guess * 100; // Convert to percentage
  
  return {
    xirr: Math.round(xirr * 100) / 100
  };
};

/**
 * Calculate Loan Eligibility
 */
export const calculateLoanEligibility = (monthlyIncome, existingEmi, annualRate, years, maxEmiRatio) => {
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
    totalPayment: Math.round(totalPayment)
  };
};

/**
 * Calculator function mapper
 * Maps calculator IDs to their calculation functions
 */
export const calculatorFunctions = {
  sip: calculateSIP,
  lumpsum: calculateLumpsum,
  swp: calculateSWP,
  mf: calculateMFReturns,
  ssy: calculateSSY,
  ppf: calculatePPF,
  epf: calculateEPF,
  nps: calculateNPS,
  apy: calculateAPY,
  retirement: calculateRetirement,
  'step-up-sip': calculateStepUpSIP,
  cagr: calculateCAGR,
  fd: calculateFD,
  rd: calculateRD,
  nsc: calculateNSC,
  'postoffice-mis': calculatePostOfficeMIS,
  scss: calculateSCSS,
  emi: calculateEMI,
  'home-loan-emi': calculateHomeLoanEMI,
  'car-loan-emi': calculateCarLoanEMI,
  'flat-reducing': calculateFlatReducing,
  'simple-interest': calculateSimpleInterest,
  'compound-interest': calculateCompoundInterest,
  salary: calculateSalary,
  'income-tax': calculateIncomeTax,
  hra: calculateHRA,
  gratuity: calculateGratuity,
  tds: calculateTDS,
  gst: calculateGST,
  inflation: calculateInflation,
  brokerage: calculateBrokerage,
  margin: calculateMargin,
  'stock-average': calculateStockAverage,
  xirr: calculateXIRR,
  'loan-eligibility': calculateLoanEligibility
};

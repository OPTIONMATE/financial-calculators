const Calculation = require('../models/calculation.model');
const formulas = require('../utils/formulas');
const ApiError = require('../utils/ApiError');

/**
 * Calculator Service
 * Orchestrates calculation logic and database operations
 */
class CalculatorService {
  /**
   * Main calculation method
   * Routes to appropriate calculator based on type
   */
  async calculate(calculatorType, inputs) {
    let result;

    // Route to appropriate calculator
    switch (calculatorType) {
      case 'sip':
        result = this.calculateSIP(inputs);
        break;
      case 'lumpsum':
        result = this.calculateLumpsum(inputs);
        break;
      case 'swp':
        result = this.calculateSWP(inputs);
        break;
      case 'mf':
        result = this.calculateMF(inputs);
        break;
      case 'ssy':
        result = this.calculateSSY(inputs);
        break;
      case 'ppf':
        result = this.calculatePPF(inputs);
        break;
      case 'epf':
        result = this.calculateEPF(inputs);
        break;
      case 'nps':
        result = this.calculateNPS(inputs);
        break;
      case 'apy':
        result = this.calculateAPY(inputs);
        break;
      case 'retirement':
        result = this.calculateRetirement(inputs);
        break;
      case 'step-up-sip':
        result = this.calculateStepUpSIP(inputs);
        break;
      case 'cagr':
        result = this.calculateCAGR(inputs);
        break;
      case 'fd':
        result = this.calculateFD(inputs);
        break;
      case 'rd':
        result = this.calculateRD(inputs);
        break;
      case 'nsc':
        result = this.calculateNSC(inputs);
        break;
      case 'postoffice-mis':
        result = this.calculatePostOfficeMIS(inputs);
        break;
      case 'scss':
        result = this.calculateSCSS(inputs);
        break;
      case 'emi':
        result = this.calculateEMI(inputs);
        break;
      case 'home-loan-emi':
        result = this.calculateHomeLoanEMI(inputs);
        break;
      case 'car-loan-emi':
        result = this.calculateCarLoanEMI(inputs);
        break;
      case 'flat-reducing':
        result = this.calculateFlatReducing(inputs);
        break;
      case 'simple-interest':
        result = this.calculateSimpleInterest(inputs);
        break;
      case 'compound-interest':
        result = this.calculateCompoundInterest(inputs);
        break;
      case 'hra':
        result = this.calculateHRA(inputs);
        break;
      case 'gratuity':
        result = this.calculateGratuity(inputs);
        break;
      case 'income-tax':
        result = this.calculateIncomeTax(inputs);
        break;
      case 'tds':
        result = this.calculateTDS(inputs);
        break;
      case 'salary':
        result = this.calculateSalary(inputs);
        break;
      case 'gst':
        result = this.calculateGST(inputs);
        break;
      case 'inflation':
        result = this.calculateInflation(inputs);
        break;
      case 'brokerage':
        result = this.calculateBrokerage(inputs);
        break;
      case 'margin':
        result = this.calculateMargin(inputs);
        break;
      case 'stock-average':
        result = this.calculateStockAverage(inputs);
        break;
      case 'xirr':
        result = this.calculateXIRR(inputs);
        break;
      case 'loan-eligibility':
        result = this.calculateLoanEligibility(inputs);
        break;
      default:
        throw ApiError.badRequest('Invalid calculator type');
    }

    // Save calculation to database
    const calculation = await Calculation.create({
      calculatorType,
      inputs,
      result
    });

    return {
      inputs,
      result,
      calculationId: calculation._id
    };
  }

  /**
   * SIP Calculator
   */
  calculateSIP(inputs) {
    const { monthlyInvestment, annualRate, years } = inputs;
    return formulas.calculateSIP(monthlyInvestment, annualRate, years);
  }

  /**
   * Lumpsum Calculator
   */
  calculateLumpsum(inputs) {
    const { principal, annualRate, years } = inputs;
    return formulas.calculateLumpsum(principal, annualRate, years);
  }

  /**
   * SWP Calculator
   */
  calculateSWP(inputs) {
    const { initialInvestment, monthlyWithdrawal, annualRate, years } = inputs;

    return formulas.calculateSWP(initialInvestment, monthlyWithdrawal, annualRate, years);
  }

  /**
   * Mutual Fund Returns Calculator
   */
  calculateMF(inputs) {
    const { principal, annualRate, years } = inputs;
    return formulas.calculateMFReturns(principal, annualRate, years);
  }

  /**
   * SSY Calculator
   */
  calculateSSY(inputs) {
    const { annualDeposit, girlAge, startYear } = inputs;
    
    if (girlAge > 10) {
      throw ApiError.validationError('SSY account can only be opened for girls up to 10 years of age');
    }
    
    return formulas.calculateSSY(annualDeposit, girlAge, startYear);
  }

  /**
   * PPF Calculator
   */
  calculatePPF(inputs) {
    const { annualDeposit, years = 15 } = inputs;
    
    // Validate years (must be 15 or in multiples of 5 after 15)
    if (years < 15) {
      throw ApiError.validationError('PPF has a minimum lock-in period of 15 years');
    }
    
    if (years > 15 && (years - 15) % 5 !== 0) {
      throw ApiError.validationError('PPF can be extended only in blocks of 5 years after 15 years');
    }
    
    return formulas.calculatePPF(annualDeposit, years);
  }

  /** EPF Calculator */
  calculateEPF(inputs) {
    const {
      basicSalary,
      age,
      employeeContributionRate,
      annualIncrease,
      interestRate
    } = inputs;
    return formulas.calculateEPF(
      basicSalary,
      age,
      employeeContributionRate,
      annualIncrease,
      interestRate,
      58
    );
  }

  /** NPS Calculator */
  calculateNPS(inputs) {
    const { monthlyInvestment, currentAge, expectedReturn } = inputs;
    const retirementAge = 60;
    if (currentAge >= retirementAge) {
      throw ApiError.validationError('Current age must be below 60 years');
    }
    return formulas.calculateNPS(monthlyInvestment, currentAge, retirementAge, expectedReturn);
  }

  /** APY Calculator */
  calculateAPY(inputs) {
    const { currentAge, pensionAmount } = inputs;
    if (currentAge >= 40) {
      throw ApiError.validationError('APY enrollment age must be below 40 years');
    }
    return formulas.calculateAPY(currentAge, pensionAmount);
  }

  /** Retirement Calculator */
  calculateRetirement(inputs) {
    const { currentAge, retirementAge, lifeExpectancy, monthlyExpenses, inflationRate, expectedReturn } = inputs;
    if (retirementAge <= currentAge) {
      throw ApiError.validationError('Retirement age must be greater than current age');
    }
    if (lifeExpectancy <= retirementAge) {
      throw ApiError.validationError('Life expectancy must be greater than retirement age');
    }
    return formulas.calculateRetirement(currentAge, retirementAge, lifeExpectancy, monthlyExpenses, inflationRate, expectedReturn);
  }

  /** Step-up SIP Calculator */
  calculateStepUpSIP(inputs) {
    const { initialMonthlyInvestment, annualStepUp, annualRate, years } = inputs;
    return formulas.calculateStepUpSIP(initialMonthlyInvestment, annualStepUp, annualRate, years);
  }

  /** CAGR Calculator */
  calculateCAGR(inputs) {
    const { initialValue, finalValue, years } = inputs;
    if (finalValue <= initialValue) {
      throw ApiError.validationError('Final value must be greater than initial value');
    }
    return formulas.calculateCAGR(initialValue, finalValue, years);
  }

  /** FD Calculator */
  calculateFD(inputs) {
    const { principal, annualRate, years, compoundingFrequency = 4 } = inputs;
    return formulas.calculateFD(principal, annualRate, years, compoundingFrequency);
  }

  /** RD Calculator */
  calculateRD(inputs) {
    const { monthlyDeposit, annualRate, years } = inputs;
    return formulas.calculateRD(monthlyDeposit, annualRate, years);
  }

  /** NSC Calculator */
  calculateNSC(inputs) {
    const { principal, annualRate = 6, years = 5 } = inputs;
    return formulas.calculateNSC(principal, annualRate, years);
  }

  /** Post Office MIS Calculator */
  calculatePostOfficeMIS(inputs) {
    const { principal } = inputs;
    return formulas.calculatePostOfficeMIS(principal);
  }

  /** SCSS Calculator */
  calculateSCSS(inputs) {
    const { principal, annualRate = 8.2, years = 5 } = inputs;
    return formulas.calculateSCSS(principal, annualRate, years);
  }

  /** EMI Calculator */
  calculateEMI(inputs) {
    const { principal, annualRate, years } = inputs;
    return formulas.calculateEMI(principal, annualRate, years);
  }

  /** Home Loan EMI Calculator */
  calculateHomeLoanEMI(inputs) {
    const { loanAmount, annualRate, years } = inputs;
    return formulas.calculateHomeLoanEMI(loanAmount, annualRate, years);
  }

  /** Car Loan EMI Calculator */
  calculateCarLoanEMI(inputs) {
    const { loanAmount, annualRate, years } = inputs;
    return formulas.calculateCarLoanEMI(loanAmount, annualRate, years);
  }

  /** Flat vs Reducing Rate Calculator */
  calculateFlatReducing(inputs) {
    const { principal, flatRate, years, tenureUnit = 'years' } = inputs;
    return formulas.calculateFlatReducing(principal, flatRate, years, tenureUnit);
  }

  /** Simple Interest Calculator */
  calculateSimpleInterest(inputs) {
    const { principal, annualRate, years } = inputs;
    return formulas.calculateSimpleInterest(principal, annualRate, years);
  }

  /** Compound Interest Calculator */
  calculateCompoundInterest(inputs) {
    const { principal, annualRate, years, compoundingFrequency = 1 } = inputs;
    return formulas.calculateCompoundInterest(principal, annualRate, years, compoundingFrequency);
  }

  /** HRA Calculator */
  calculateHRA(inputs) {
    const { basicSalary, dearnessAllowance = 0, hra, rentPaid, isMetro } = inputs;
    return formulas.calculateHRA(basicSalary, dearnessAllowance, hra, rentPaid, isMetro);
  }

  /** Gratuity Calculator */
  calculateGratuity(inputs) {
    const { lastSalary, yearsOfService, monthsOfService = 0 } = inputs;
    if (yearsOfService < 5) {
      throw ApiError.validationError('Minimum 5 years of service required for gratuity');
    }
    return formulas.calculateGratuity(lastSalary, yearsOfService, monthsOfService);
  }

  /** Income Tax Calculator */
  calculateIncomeTax(inputs) {
    const { annualIncome, regime = 'new' } = inputs;
    return formulas.calculateIncomeTax(annualIncome, regime);
  }

  /** TDS Calculator */
  calculateTDS(inputs) {
    const { annualIncome, standardDeduction = 50000, otherDeductions = 0 } = inputs;
    return formulas.calculateTDS(annualIncome, standardDeduction, otherDeductions);
  }

  /** Salary Calculator */
  calculateSalary(inputs) {
    const {
      ctc,
      bonusPercent = 0,
      monthlyProfessionalTax = 0,
      monthlyEmployerPf = 0,
      monthlyEmployeePf = 0,
      monthlyAdditionalDeduction1 = 0,
      monthlyAdditionalDeduction2 = 0
    } = inputs;
    return formulas.calculateSalary(
      ctc,
      bonusPercent,
      monthlyProfessionalTax,
      monthlyEmployerPf,
      monthlyEmployeePf,
      monthlyAdditionalDeduction1,
      monthlyAdditionalDeduction2
    );
  }

  /** GST Calculator */
  calculateGST(inputs) {
    const { amount, gstRate, isInclusive = false } = inputs;
    return formulas.calculateGST(amount, gstRate, isInclusive);
  }

  /** Inflation Calculator */
  calculateInflation(inputs) {
    const { currentAmount, inflationRate, years } = inputs;
    return formulas.calculateInflation(currentAmount, inflationRate, years);
  }

  /** Brokerage Calculator */
  calculateBrokerage(inputs) {
    const { buyPrice, sellPrice, quantity, segment = 'equity-delivery', exchange = 'NSE' } = inputs;
    return formulas.calculateBrokerage(buyPrice, sellPrice, quantity, segment, exchange);
  }

  /** Margin Calculator */
  calculateMargin(inputs) {
    const { stockPrice, quantity, leverage = 5 } = inputs;
    return formulas.calculateMargin(stockPrice, quantity, leverage);
  }

  /** Stock Average Calculator */
  calculateStockAverage(inputs) {
    const purchases = [];
    const lots = [1, 2, 3];

    lots.forEach((index) => {
      const quantity = inputs[`quantity${index}`];
      const price = inputs[`price${index}`];

      const hasQuantity = quantity !== undefined && quantity !== null && quantity !== '';
      const hasPrice = price !== undefined && price !== null && price !== '';

      if (hasQuantity !== hasPrice) {
        throw ApiError.validationError(`Both quantity and price are required for lot ${index}`);
      }

      if (hasQuantity && hasPrice) {
        if (quantity <= 0 || price <= 0) {
          throw ApiError.validationError(`Quantity and price must be greater than zero for lot ${index}`);
        }
        purchases.push({
          quantity: Number(quantity),
          price: Number(price)
        });
      }
    });

    if (purchases.length === 0) {
      throw ApiError.validationError('At least one purchase lot is required');
    }

    return formulas.calculateStockAverage(purchases);
  }

  /** XIRR Calculator */
  calculateXIRR(inputs) {
    const {
      startDate,
      frequency,
      recurringAmount,
      maturityDate,
      maturityAmount
    } = inputs;

    const start = new Date(startDate);
    const maturity = new Date(maturityDate);

    if (Number.isNaN(start.getTime())) {
      throw ApiError.validationError('Start date must be a valid date');
    }

    if (Number.isNaN(maturity.getTime())) {
      throw ApiError.validationError('Maturity date must be a valid date');
    }

    if (start.getTime() >= maturity.getTime()) {
      throw ApiError.validationError('Maturity date must be after start date');
    }

    const addDays = (date, days) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    const addMonths = (date, months) => {
      const next = new Date(date.getTime());
      next.setUTCMonth(next.getUTCMonth() + months);
      return next;
    };

    const nextDate = (date) => {
      switch (frequency) {
        case '14-days':
          return addDays(date, 14);
        case 'monthly':
          return addMonths(date, 1);
        case 'quarterly':
          return addMonths(date, 3);
        case 'half-yearly':
          return addMonths(date, 6);
        case 'yearly':
          return addMonths(date, 12);
        default:
          return null;
      }
    };

    const firstNext = nextDate(start);
    if (!firstNext) {
      throw ApiError.validationError('Invalid investment frequency');
    }

    const cashflows = [-Number(recurringAmount)];
    const dates = [start];
    const maxPeriods = 10000;

    let current = start;
    let periods = 1;

    while (true) {
      const next = nextDate(current);
      if (!next || next.getTime() >= maturity.getTime()) {
        break;
      }

      cashflows.push(-Number(recurringAmount));
      dates.push(next);
      current = next;
      periods += 1;

      if (periods > maxPeriods) {
        throw ApiError.validationError('Investment schedule is too long for calculation');
      }
    }

    cashflows.push(Number(maturityAmount));
    dates.push(maturity);

    const result = formulas.calculateXIRR(cashflows, dates);

    if (!result.converged) {
      throw ApiError.validationError('Unable to converge on XIRR for the provided inputs');
    }

    return result;
  }

  /** Loan Eligibility Calculator */
  calculateLoanEligibility(inputs) {
    const {
      monthlyIncome,
      existingEmi = 0,
      annualRate,
      years,
      maxEmiRatio = 50
    } = inputs;

    return formulas.calculateLoanEligibility(
      Number(monthlyIncome),
      Number(existingEmi),
      Number(annualRate),
      Number(years),
      Number(maxEmiRatio)
    );
  }

  /**
   * Get calculation history by type
   */
  async getHistory(calculatorType, limit = 10) {
    const filter = calculatorType ? { calculatorType } : {};
    
    const history = await Calculation.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('-__v');
    
    return history;
  }

  /**
   * Get calculation statistics
   */
  async getStats() {
    const stats = await Calculation.aggregate([
      {
        $group: {
          _id: '$calculatorType',
          count: { $sum: 1 },
          lastUsed: { $max: '$createdAt' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    return stats;
  }
}

module.exports = new CalculatorService();

const mongoose = require('mongoose');

/**
 * Calculation Schema
 * Stores all calculator operations for analytics and history
 */
const calculationSchema = new mongoose.Schema(
  {
    calculatorType: {
      type: String,
      required: true,
      enum: [
        'sip', 'lumpsum', 'swp', 'mf', 'ssy', 'ppf',
        'epf', 'nps', 'apy', 'retirement', 'step-up-sip', 'cagr',
        'fd', 'rd', 'nsc', 'postoffice-mis', 'scss',
        'emi', 'home-loan-emi', 'car-loan-emi', 'flat-reducing',
        'simple-interest', 'compound-interest',
        'hra', 'gratuity', 'income-tax', 'tds', 'salary',
        'gst', 'inflation', 'brokerage', 'margin'
      ],
      index: true
    },
    inputs: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    result: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Index for querying by calculator type and date
calculationSchema.index({ calculatorType: 1, createdAt: -1 });

const Calculation = mongoose.model('Calculation', calculationSchema);

module.exports = Calculation;

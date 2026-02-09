const express = require('express');
const calculatorController = require('../controllers/calculator.controller');
const { getValidationRules } = require('../validators/calculator.validator');
const validate = require('../middlewares/validate.middleware');

const router = express.Router();

/**
 * Main calculation endpoint
 * POST /api/calculators/:type/calculate
 * 
 * Supported types: sip, lumpsum, swp, mf, ssy, ppf
 */
router.post(
  '/:type/calculate',
  (req, res, next) => {
    const rules = getValidationRules(req.params.type);
    // Apply validation rules dynamically
    Promise.all(rules.map(rule => rule.run(req)))
      .then(() => next())
      .catch(next);
  },
  validate,
  calculatorController.calculate
);

/**
 * Get calculation history
 * GET /api/calculators/:type/history?limit=10
 */
router.get('/:type/history', calculatorController.getHistory);

/**
 * Get usage statistics
 * GET /api/calculators/stats
 */
router.get('/stats', calculatorController.getStats);

module.exports = router;

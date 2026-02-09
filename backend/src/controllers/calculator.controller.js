const calculatorService = require('../services/calculator.service');
const ApiResponse = require('../utils/ApiResponse');

/**
 * Calculator Controller
 * Thin controller layer - delegates to service
 */
class CalculatorController {
  /**
   * Calculate - Main endpoint
   * POST /api/calculators/:type/calculate
   */
  async calculate(req, res, next) {
    try {
      const { type } = req.params;
      const inputs = req.body;

      const data = await calculatorService.calculate(type, inputs);

      res.status(200).json(ApiResponse.success(data, 'Calculation successful'));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get calculation history
   * GET /api/calculators/:type/history
   */
  async getHistory(req, res, next) {
    try {
      const { type } = req.params;
      const { limit } = req.query;

      const history = await calculatorService.getHistory(type, parseInt(limit) || 10);

      res.status(200).json(ApiResponse.success(history, 'History retrieved successfully'));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get usage statistics
   * GET /api/calculators/stats
   */
  async getStats(req, res, next) {
    try {
      const stats = await calculatorService.getStats();

      res.status(200).json(ApiResponse.success(stats, 'Statistics retrieved successfully'));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Health check endpoint
   * GET /api/health
   */
  async healthCheck(req, res) {
    res.status(200).json({
      success: true,
      message: 'Calculator API is running',
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = new CalculatorController();

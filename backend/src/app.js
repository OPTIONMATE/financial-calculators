const express = require('express');
const cors = require('cors');
const calculatorRoutes = require('./routes/calculator.routes');
const { errorHandler, notFound } = require('./middlewares/error.middleware');
const calculatorController = require('./controllers/calculator.controller');

const app = express();

/**
 * Middleware Setup
 */
// Enable CORS for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

/**
 * Routes
 */
// Health check
app.get('/api/health', calculatorController.healthCheck);

// Calculator routes
app.use('/api/calculators', calculatorRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Calculator Platform API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      calculate: 'POST /api/calculators/:type/calculate',
      history: 'GET /api/calculators/:type/history',
      stats: 'GET /api/calculators/stats'
    }
  });
});

/**
 * Error Handling
 */
// 404 handler
app.use(notFound);

// Global error handler (must be last)
app.use(errorHandler);

module.exports = app;

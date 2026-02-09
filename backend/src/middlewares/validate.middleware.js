const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

/**
 * Validation middleware
 * Checks for validation errors and formats them properly
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    const errorMessage = errorMessages.join(', ');
    
    throw ApiError.validationError(errorMessage);
  }
  
  next();
};

module.exports = validate;

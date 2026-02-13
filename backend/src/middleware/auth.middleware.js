const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/errorHandler');

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return next(new AppError('Not authorized', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    return next();
  } catch (error) {
    return next(new AppError('Invalid token', 401));
  }
};

module.exports = authMiddleware;

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { AppError, asyncHandler } = require('../utils/errorHandler');

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

const sendToken = (res, token) => {
  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt
});

const validateRegisterInput = (name, email, password) => {
  if (!name || !email || !password) {
    throw new AppError('Name, email, and password are required', 400);
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError('Invalid email format', 400);
  }
  if (password.length < 6) {
    throw new AppError('Password must be at least 6 characters', 400);
  }
};

const validateLoginInput = (email, password) => {
  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  validateRegisterInput(name, email, password);

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new AppError('Email already in use', 409);
  }

  const user = await User.create({ name, email, password });
  const token = signToken(user._id);
  sendToken(res, token);

  res.status(201).json({
    success: true,
    user: sanitizeUser(user)
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  validateLoginInput(email, password);

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = signToken(user._id);
  sendToken(res, token);

  res.status(200).json({
    success: true,
    user: sanitizeUser(user)
  });
});

const logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.status(200).json({
    success: true,
    user: sanitizeUser(user)
  });
});

module.exports = {
  register,
  login,
  logout,
  getMe
};

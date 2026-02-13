const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const User = require('../models/User');
const { AppError, asyncHandler } = require('../utils/errorHandler');

const router = express.Router();

router.get(
  '/profile',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  })
);

module.exports = router;

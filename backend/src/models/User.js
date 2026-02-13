const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      minlength: 6,
      // Optional: not required for Google OAuth users
      default: null
    },
    googleId: {
      type: String,
      sparse: true,
      // Sparse index allows multiple null values
      default: null
    },
    authProvider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local'
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function (next) {
  // Only hash password if it's provided and modified
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidate) {
  // For Google OAuth users (no password), this should not be called
  if (!this.password) {
    return false;
  }
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);

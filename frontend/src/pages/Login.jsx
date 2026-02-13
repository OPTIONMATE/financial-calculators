import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { isEmailValid, isPasswordValid, isRequired } from '../utils/validators';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, error, clearError, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    clearError();
    setFormError(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (!isRequired(form.email) || !isRequired(form.password)) {
      return 'Email and password are required.';
    }
    if (!isEmailValid(form.email)) {
      return 'Please enter a valid email address.';
    }
    if (!isPasswordValid(form.password)) {
      return 'Password must be at least 6 characters.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      await loginUser(form);
      navigate('/home');
    } catch (err) {
      // handled in context
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-emerald-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-soft border border-neutral-200 p-8">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Welcome back</h1>
        <p className="text-sm text-neutral-600 mb-6">Login to access your financial calculators</p>

        {(formError || error) && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {formError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">Or continue with</span>
          </div>
        </div>

        {/* Google Login Button */}
        <a
          href={`${import.meta.env.VITE_API_BASE_URL}/auth/google`}
          className="w-full flex items-center justify-center px-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-700 font-semibold hover:bg-neutral-50 transition-colors mb-6"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </a>

        <p className="text-sm text-neutral-600 text-center">
          Do not have an account?{' '}
          <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


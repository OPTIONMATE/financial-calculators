import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { isEmailValid, isPasswordValid, isRequired } from '../utils/validators';
import Navbar from '../components/Navbar';

const Register = () => {
  const navigate = useNavigate();
  const { registerUser, error, clearError, loading } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    clearError();
    setFormError(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (!isRequired(form.name) || !isRequired(form.email) || !isRequired(form.password)) {
      return 'Name, email, and password are required.';
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
      await registerUser(form);
      navigate('/');
    } catch (err) {
      // handled in context
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-soft border border-neutral-200 p-8">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Create account</h1>
        <p className="text-sm text-neutral-600 mb-6">Sign up to access your profile</p>

        {(formError || error) && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {formError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
              placeholder="Your name"
            />
          </div>
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
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

          <p className="text-sm text-neutral-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

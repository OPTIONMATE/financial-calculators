import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

/**
 * Navbar Component
 * Main navigation bar across all pages
 */
const Navbar = ({ calculatorCount }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { isAuthenticated, logoutUser, loading } = useAuth();

  return (
    <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-teal-500 to-emerald-500 shadow-md"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" 
                />
              </svg>
            </motion.div>
            <div>
              <h1 className="text-xl font-bold">
                Financial Calculators
              </h1>
              <p className="text-xs text-neutral-500 font-medium">
                Smart investment planning
              </p>
            </div>
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Calculator Count Badge */}
            {calculatorCount !== undefined && (
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 via-teal-50 to-emerald-50 border border-teal-100">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-neutral-700">
                  {calculatorCount} {calculatorCount === 1 ? 'Calculator' : 'Calculators'}
                </span>
              </div>
            )}

            {/* Auth Links */}
            {!loading && !isAuthenticated && (
              <div className="hidden sm:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-neutral-700 hover:text-neutral-900 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            {!loading && isAuthenticated && (
              <div className="hidden sm:flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="text-sm font-semibold text-neutral-700 hover:text-neutral-900 transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={logoutUser}
                  className="px-4 py-2 rounded-xl bg-neutral-100 text-neutral-700 text-sm font-semibold hover:bg-neutral-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Home Button (when not on home page) */}
            {!isHomePage && (
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white font-medium text-sm hover:from-blue-700 hover:to-teal-700 transition-all shadow-sm hover:shadow-md"
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                    />
                  </svg>
                  <span>Home</span>
                </motion.button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

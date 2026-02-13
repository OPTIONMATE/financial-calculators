import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';

/**
 * Home Page
 * Protected route shown after successful login
 * Displays welcome message and dashboard with user data
 */
const Home = () => {
  const { user, isAuthenticated } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-emerald-50">
      {/* Navbar - Only visible for authenticated users */}
      {isAuthenticated && <Navbar />}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Welcome Section */}
          <motion.div variants={itemVariants} className="text-center space-y-4 mb-12">
            <div className="inline-block">
              <motion.div
                className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-teal-500 to-emerald-500 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h-2v-2h2v2zm-6 0h2v2h-2v-2zm6 2h2v2h-2v-2zm-6 2h2v2h-2v-2z"
                  />
                </svg>
              </motion.div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">
              Welcome,{' '}
              <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                {user?.name || 'User'}
              </span>
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Welcome to your personal financial calculator hub. Get started by
              exploring our collection of smart investment planning tools.
            </p>
          </motion.div>

          {/* Dashboard Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Get Started Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 hover:shadow-md transition-shadow"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-neutral-900 mb-2">Get Started</h2>
              <p className="text-sm text-neutral-600 mb-4">
                Explore our collection of financial calculators designed for smart
                investment planning.
              </p>
              <a
                href="/calculator"
                className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center space-x-2"
              >
                <span>Explore Calculators</span>
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </motion.div>

            {/* Profile Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 hover:shadow-md transition-shadow"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 mb-4">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-neutral-900 mb-2">Your Profile</h2>
              <p className="text-sm text-neutral-600 mb-4">
                View and manage your account details, settings, and preferences.
              </p>
              <a
                href="/profile"
                className="text-emerald-600 font-semibold hover:text-emerald-700 inline-flex items-center space-x-2"
              >
                <span>View Profile</span>
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </motion.div>

            {/* User Info Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 hover:shadow-md transition-shadow"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 mb-4">
                <svg
                  className="w-6 h-6 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-neutral-900 mb-2">Account Info</h2>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-neutral-600">Email:</span>
                  <span className="font-medium text-neutral-900 ml-2">{user?.email}</span>
                </p>
                <p>
                  <span className="text-neutral-600">Member since:</span>
                  <span className="font-medium text-neutral-900 ml-2">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Just now'}
                  </span>
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Wide Calculator Range',
                  description: 'From SIP calculators to lump sum investments, we have it all.',
                  icon: '📊',
                },
                {
                  title: 'Real-Time Calculations',
                  description: 'Get instant results with dynamic calculations and adjustments.',
                  icon: '⚡',
                },
                {
                  title: 'Easy to Use',
                  description: 'Intuitive interface designed for everyone, no finance knowledge needed.',
                  icon: '🎯',
                },
                {
                  title: 'Secure & Private',
                  description: 'Your data is secure with JWT authentication and HTTP-only cookies.',
                  icon: '🔒',
                },
              ].map((feature, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="text-3xl flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{feature.title}</h3>
                    <p className="text-sm text-neutral-600 mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;

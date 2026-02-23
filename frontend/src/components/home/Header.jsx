import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

const Header = ({ onAuthClick }) => {
  const { isAuthenticated, user } = useAuth();

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6 backdrop-blur-sm bg-[#f8e5d7]/80"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        <Link to="/home" className="group">
          <h1 className="text-lg font-light tracking-tight text-neutral-900 hover:text-neutral-600 transition-colors duration-300">
            THE 3M<span className="font-medium"> RULE</span>
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/calculator"
            className="relative text-md font-medium tracking-wide text-neutral-900 hover:text-neutral-600 transition-colors duration-300 group"
          >
            Calculators
            <span className="absolute bottom-0 left-0 w-0 h-px bg-neutral-900 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <button
            onClick={onAuthClick}
            className="relative text-md font-medium tracking-wide text-neutral-900 hover:text-neutral-600 transition-colors duration-300 group"
          >
            {isAuthenticated ? (
              <span className="flex items-center gap-2">
                {user?.name || 'Profile'}
              </span>
            ) : (
              'Login'
            )}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-neutral-900 group-hover:w-full transition-all duration-300"></span>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

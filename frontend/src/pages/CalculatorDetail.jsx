import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCalculatorById } from '../constants/calculators';
import { useRealtimeCalculator } from '../hooks/useRealtimeCalculator';
import InputField from '../components/InputField';
import SliderField from '../components/SliderField';
import ResultBox from '../components/ResultBox';
import ErrorAlert from '../components/ErrorAlert';
import Navbar from '../components/Navbar';

/**
 * Calculator Detail Page
 * Universal calculator with real-time calculation for ALL calculator types
 * Uses sliders or input fields based on calculator.renderMode configuration
 */
const CalculatorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const calculator = getCalculatorById(id);
  
  // Use unified real-time calculator hook for ALL calculators
  const { inputs, result, error, handleInputChange, reset } = useRealtimeCalculator(calculator || { id: 'unknown', fields: [] });
  
  // Determine if this calculator should use sliders
  const useSliders = calculator?.renderMode === 'slider';

  // Category-based color schemes
  const getCategoryColors = (category) => {
    switch (category) {
      case 'Investment':
        return {
          badge: 'bg-blue-50 text-blue-700 border-blue-100',
          pulse: 'bg-blue-500'
        };
      case 'Retirement':
        return {
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
          pulse: 'bg-emerald-500'
        };
      case 'Government Schemes':
        return {
          badge: 'bg-teal-50 text-teal-700 border-teal-100',
          pulse: 'bg-teal-500'
        };
      default:
        return {
          badge: 'bg-blue-50 text-blue-700 border-blue-100',
          pulse: 'bg-blue-500'
        };
    }
  };

  const colors = calculator ? getCategoryColors(calculator.category) : { badge: 'bg-blue-50 text-blue-700 border-blue-100', pulse: 'bg-blue-500' };

  // If calculator not found
  if (!calculator) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Calculator Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-teal-600 hover:text-teal-700 font-semibold"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navbar */}
      <Navbar />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mr-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
              {calculator.category}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-1">
              {calculator.name}
            </h1>
            <p className="text-neutral-600 text-sm font-medium">{calculator.description}</p>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div 
            className="bg-white rounded-2xl shadow-soft border border-neutral-200 p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">
                {useSliders ? 'Adjust Values' : 'Enter Details'}
              </h2>
              <div className={`h-1.5 w-1.5 rounded-full ${colors.pulse} animate-pulse`} />
            </div>

            {error && (
              <ErrorAlert 
                message={error} 
                onClose={() => reset()} 
              />
            )}

            <div className="space-y-6">
              {/* Render fields dynamically based on renderMode */}
              {calculator.fields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {useSliders && field.type === 'number' ? (
                    <SliderField
                      field={field}
                      value={inputs[field.name]}
                      onChange={handleInputChange}
                      prefix={field.prefix}
                      suffix={field.suffix}
                    />
                  ) : (
                    <InputField
                      field={field}
                      value={inputs[field.name] || ''}
                      onChange={handleInputChange}
                    />
                  )}
                </motion.div>
              ))}

              {/* Reset Button */}
              <motion.button
                onClick={reset}
                className="w-full px-6 py-3 rounded-xl text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 hover:border-neutral-300 text-sm font-semibold transition-all duration-200"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Reset to Defaults
              </motion.button>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
          >
            {result ? (
              <ResultBox 
                result={result} 
                resultFields={calculator.resultFields} 
              />
            ) : (
              <div className="bg-white rounded-2xl shadow-soft border border-neutral-200 p-16 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 via-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {useSliders ? 'Adjust the sliders' : 'Enter your values'}
                </h3>
                <p className="text-neutral-600 text-sm max-w-xs mx-auto">
                  {useSliders 
                    ? 'Results will appear here instantly as you adjust the sliders' 
                    : 'Results will update in real-time as you fill the fields'
                  }
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CalculatorDetail;
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCalculatorById } from '../constants/calculators';
import { useRealtimeCalculator } from '../hooks/useRealtimeCalculator';
import InputField from '../components/InputField';
import SliderField from '../components/SliderField';
import ResultBox from '../components/ResultBox';
import ErrorAlert from '../components/ErrorAlert';

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

  // If calculator not found
  if (!calculator) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Calculator Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 mb-4"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            Back to Calculators
          </button>
          
          <div className="flex items-center">
            <div className={`text-4xl mr-4`}>{calculator.icon}</div>
            <div>
              <h1 className="text-2xl text-gray-900">
                {calculator.name}
              </h1>
              <p className="text-gray-500 text-sm mt-1">{calculator.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-lg text-gray-800 mb-6">
              {useSliders ? 'Adjust Values' : 'Enter Details'}
            </h2>

            {error && (
              <ErrorAlert 
                message={error} 
                onClose={() => reset()} 
              />
            )}

            <div className="space-y-6">
              {/* Render fields dynamically based on renderMode */}
              {calculator.fields.map((field) => (
                useSliders && field.type === 'number' ? (
                  <SliderField
                    key={field.name}
                    field={field}
                    value={inputs[field.name]}
                    onChange={handleInputChange}
                    prefix={field.prefix}
                    suffix={field.suffix}
                  />
                ) : (
                  <InputField
                    key={field.name}
                    field={field}
                    value={inputs[field.name] || ''}
                    onChange={handleInputChange}
                  />
                )
              ))}

              {/* Reset Button */}
              <button
                onClick={reset}
                className="w-full px-6 py-2 rounded-lg text-gray-700 bg-gray-200 text-sm"
              >
                Reset to Defaults
              </button>
            </div>
          </div>

          {/* Results */}
          <div>
            {result ? (
              <ResultBox 
                result={result} 
                resultFields={calculator.resultFields} 
              />
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <h3 className="text-base text-gray-800 mb-2">
                  {useSliders ? 'Adjust the sliders' : 'Enter your values'}
                </h3>
                <p className="text-gray-500 text-sm">
                  {useSliders 
                    ? 'Results will appear here instantly' 
                    : 'Results will appear here as you fill the fields'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalculatorDetail;
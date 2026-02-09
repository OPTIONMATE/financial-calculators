import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCalculatorById } from '../constants/calculators';
import { useCalculator } from '../hooks/useCalculator';
import { validateField } from '../utils/formatter';
import InputField from '../components/InputField';
import ResultBox from '../components/ResultBox';
import ErrorAlert from '../components/ErrorAlert';

/**
 * Calculator Detail Page
 * Dynamic calculator form based on calculator type
 */
const CalculatorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const calculator = getCalculatorById(id);

  // State for form inputs
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Calculator hook
  const { loading, error, result, performCalculation, reset } = useCalculator(id);

  // Initialize form data
  useEffect(() => {
    if (calculator) {
      const initialData = {};
      calculator.fields.forEach(field => {
        if (field.defaultValue !== undefined) {
          initialData[field.name] = field.defaultValue;
        } else if (field.type === 'checkbox') {
          initialData[field.name] = false;
        } else {
          initialData[field.name] = '';
        }
      });
      setFormData(initialData);
    }
  }, [calculator]);

  // Handle input change
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    calculator.fields.forEach(field => {
      const value = formData[field.name];

      if (field.optional && (value === '' || value === null || value === undefined)) {
        return;
      }

      const validation = validateField(field, value);
      if (!validation.valid) {
        newErrors[field.name] = validation.error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Convert form data to typed inputs
    const inputs = {};
    calculator.fields.forEach((field) => {
      const rawValue = formData[field.name];

      if (field.optional && (rawValue === '' || rawValue === null || rawValue === undefined)) {
        return;
      }

      if (field.type === 'checkbox') {
        inputs[field.name] = Boolean(rawValue);
        return;
      }

      if (field.type === 'select') {
        const options = field.options || [];
        const sample = options[0];
        const sampleValue = typeof sample === 'object' ? sample.value : sample;
        const isNumericOption = typeof sampleValue === 'number';

        inputs[field.name] = isNumericOption ? parseFloat(rawValue) : rawValue;
        return;
      }

      if (field.type === 'date') {
        inputs[field.name] = rawValue;
        return;
      }

      inputs[field.name] = parseFloat(rawValue);
    });

    await performCalculation(inputs);
  };

  // Handle reset
  const handleReset = () => {
    const resetData = {};
    calculator.fields.forEach(field => {
      if (field.defaultValue !== undefined) {
        resetData[field.name] = field.defaultValue;
      } else if (field.type === 'checkbox') {
        resetData[field.name] = false;
      } else {
        resetData[field.name] = '';
      }
    });
    setFormData(resetData);
    setErrors({});
    reset();
  };

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
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
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
            <div className={`text-5xl mr-4`}>{calculator.icon}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {calculator.name}
              </h1>
              <p className="text-gray-600 mt-1">{calculator.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Enter Details
            </h2>

            {error && (
              <ErrorAlert 
                message={error} 
                onClose={() => reset()} 
              />
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {calculator.fields.map((field) => (
                <InputField
                  key={field.name}
                  field={field}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  error={errors[field.name]}
                />
              ))}

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`
                    flex-1 py-3 px-6 rounded-lg font-semibold text-white
                    ${loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-primary-600 hover:bg-primary-700 active:scale-95'
                    }
                    transition-all duration-200 shadow-md hover:shadow-lg
                  `}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg 
                        className="animate-spin h-5 w-5 mr-2" 
                        viewBox="0 0 24 24"
                      >
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                          fill="none"
                        />
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Calculating...
                    </span>
                  ) : (
                    'Calculate'
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                >
                  Reset
                </button>
              </div>
            </form>

            {/* Info Box */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start">
                <svg 
                  className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" 
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
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">
                    About This Calculator
                  </h4>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    {calculator.description}. All calculations use standard financial formulas 
                    and are provided for estimation purposes only.
                  </p>
                </div>
              </div>
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
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg 
                    className="w-12 h-12 text-gray-400" 
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
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-gray-600 text-sm">
                  Fill in the details on the left and click Calculate to see your results
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

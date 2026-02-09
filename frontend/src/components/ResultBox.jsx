import React from 'react';
import { formatValue } from '../utils/formatter';

/**
 * Result Box Component
 * Displays calculation results in a formatted way
 */
const ResultBox = ({ result, resultFields }) => {
  if (!result) return null;

  return (
    <div className="bg-gradient-to-br from-primary-50 to-white rounded-xl shadow-lg p-6 border border-primary-100">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Calculation Results</h3>
      </div>

      <div className="space-y-4">
        {resultFields.map((field) => {
          const value = result.result[field.key];
          
          if (value === undefined) return null;

          return (
            <div 
              key={field.key}
              className={`
                p-4 rounded-lg
                ${field.primary ? 'bg-success-50 border-2 border-success-500' : ''}
                ${field.highlight ? 'bg-primary-50' : ''}
                ${!field.primary && !field.highlight ? 'bg-gray-50' : ''}
              `}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  {field.label}
                </span>
                <span 
                  className={`
                    text-lg font-bold
                    ${field.primary ? 'text-success-600 text-2xl' : ''}
                    ${field.highlight ? 'text-primary-600' : ''}
                    ${!field.primary && !field.highlight ? 'text-gray-800' : ''}
                  `}
                >
                  {formatValue(value, field.format, field.suffix || '')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start">
          <svg 
            className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" 
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
          <p className="text-xs text-blue-700">
            These calculations are based on the inputs provided and assume consistent returns. 
            Actual returns may vary based on market conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultBox;

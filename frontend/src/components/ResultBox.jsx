import React from 'react';
import { formatValue } from '../utils/formatter';

/**
 * Result Box Component
 * Displays calculation results in a formatted way
 */
const ResultBox = ({ result, resultFields }) => {
  if (!result) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg text-gray-800 mb-6">Calculation Results</h3>

      <div className="space-y-4">
        {resultFields.map((field) => {
          // Handle both formats: result.result (backend API) and result directly (frontend calculations)
          const value = result.result ? result.result[field.key] : result[field.key];
          
          if (value === undefined) return null;

          return (
            <div 
              key={field.key}
              className={`p-3 rounded border ${field.primary ? 'bg-gray-100 border-gray-300' : 'bg-gray-50 border-gray-200'}`}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {field.label}
                </span>
                <span className={`text-base ${field.primary ? 'text-gray-900' : 'text-gray-800'}`}>
                  {formatValue(value, field.format, field.suffix || '')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-3 bg-gray-50 rounded border border-gray-200">
        <p className="text-xs text-gray-600">
          These calculations are estimates based on the inputs provided. Actual returns may vary based on market conditions.
        </p>
      </div>
    </div>
  );
};

export default ResultBox;

import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Calculator Card Component
 * Displays calculator in grid on home page
 */
const CalculatorCard = ({ calculator }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/calculator/${calculator.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow border border-gray-200 cursor-pointer overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-lg text-gray-800 mb-2">
          {calculator.name}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {calculator.description}
        </p>
        
        <div className="flex items-center text-gray-700 text-sm">
          Calculate Now
          <svg 
            className="w-4 h-4 ml-1" 
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
        </div>
      </div>
    </div>
  );
};

export default CalculatorCard;

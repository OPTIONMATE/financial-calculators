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
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      <div className={`${calculator.color} h-2`}></div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl">{calculator.icon}</div>
          <div className={`w-12 h-12 ${calculator.color} bg-opacity-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <svg 
              className={`w-6 h-6 text-${calculator.color.replace('bg-', '')}`}
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
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
          {calculator.name}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {calculator.description}
        </p>
        
        <div className="flex items-center text-primary-600 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
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

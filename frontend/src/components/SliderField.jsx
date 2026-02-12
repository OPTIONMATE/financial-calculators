import React from 'react';
import { motion } from 'framer-motion';

/**
 * Slider Field Component
 * Displays an interactive slider with label and value display
 */
const SliderField = ({ 
  field, 
  value, 
  onChange, 
  label, 
  prefix = '', 
  suffix = '' 
}) => {
  const [inputValue, setInputValue] = React.useState(value);

  // Sync input when value prop changes (e.g., from slider drag)
  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSliderChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setInputValue(newValue);
    onChange(field.name, newValue);
  };

  const handleInputChange = (e) => {
    let newValue = e.target.value;
    
    // Allow empty input while typing
    if (newValue === '') {
      setInputValue('');
      return;
    }

    newValue = parseFloat(newValue);
    
    // Allow any number to be typed, but send constrained value to parent
    if (!isNaN(newValue)) {
      setInputValue(newValue);
      
      // Validate and constrain for calculation
      const min = field.min || 0;
      const max = field.max || 100;
      const constrainedValue = Math.max(min, Math.min(max, newValue));
      onChange(field.name, constrainedValue);
    }
  };

  const handleInputBlur = () => {
    if (inputValue === '') {
      setInputValue(value);
    }
  };

  // Check if value is within valid range
  const isOutOfRange = () => {
    if (inputValue === '') return false;
    const min = field.min || 0;
    const max = field.max || 100;
    return inputValue < min || inputValue > max;
  };

  // Format display value for label
  const displayValue = typeof value === 'number' ? value : 0;
  let formattedDisplay = displayValue.toString();
  
  if (field.type === 'currency-slider' || prefix === '₹') {
    formattedDisplay = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(displayValue);
  } else if (suffix === '%' || field.suffix === '%') {
    formattedDisplay = `${displayValue.toFixed(field.step < 1 ? 1 : 0)}%`;
  } else if (suffix === 'Yr' || field.suffix === 'Yr') {
    formattedDisplay = `${Math.round(displayValue)} years`;
  }

  const min = field.min || 0;
  const max = field.max || 100;
  const step = field.step || 1;

  return (
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-baseline">
        <label 
          htmlFor={field.name}
          className="block text-base font-semibold text-neutral-900"
        >
          {label || field.label}
        </label>
        <div className="flex items-center gap-2">
          {isOutOfRange() && (
            <motion.div 
              className="text-amber-500 text-xl" 
              title={`Value must be between ${min} and ${max}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              ⚠️
            </motion.div>
          )}
          <motion.input
            type="number"
            value={inputValue === '' ? '' : inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            min={min}
            max={max}
            step={step}
            className={`w-28 px-3 py-2 text-base border-2 text-neutral-900 font-semibold rounded-lg focus:outline-none text-right focus:border-primary-500 hover:border-neutral-300 transition-all duration-200 ${
              isOutOfRange() ? 'border-amber-400 bg-amber-50' : 'border-neutral-200 bg-white'
            }`}
            placeholder="0"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.15 }}
          />
          <span className="text-base text-neutral-600 font-medium min-w-fit">
            {suffix || prefix || ''}
          </span>
        </div>
      </div>

      <motion.div 
        className="relative"
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.2 }}
      >
        <input
          id={field.name}
          type="range"
          min={min}
          max={max}
          step={step}
          value={displayValue}
          onChange={handleSliderChange}
          className="w-full h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #0EA5E9 0%, #10B981 ${((displayValue - min) / (max - min)) * 100}%, #E5E5E5 ${((displayValue - min) / (max - min)) * 100}%, #E5E5E5 100%)`
          }}
        />
      </motion.div>

      <div className="flex justify-between text-xs text-neutral-500 font-medium">
        <span>
          {prefix || ''}{min}
          {suffix || field.suffix || ''}
        </span>
        <span>
          {prefix || ''}{max}
          {suffix || field.suffix || ''}
        </span>
      </div>

      {field.helpText && (
        <p className="text-sm text-neutral-600 mt-2 font-medium">
          {field.helpText}
        </p>
      )}

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0EA5E9 0%, #10B981 100%);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(14, 165, 233, 0.3);
          transition: all 0.2s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          background: linear-gradient(135deg, #0284C7 0%, #059669 100%);
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.4);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0EA5E9 0%, #10B981 100%);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(14, 165, 233, 0.3);
          transition: all 0.2s ease;
        }

        .slider::-moz-range-thumb:hover {
          background: linear-gradient(135deg, #0284C7 0%, #059669 100%);
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.4);
        }

        .slider::-moz-range-track {
          background: transparent;
          border: none;
        }

        .slider::-moz-range-progress {
          background: linear-gradient(90deg, #0EA5E9 0%, #10B981 100%);
          height: 8px;
        }
      `}</style>
    </motion.div>
  );
};

export default SliderField;

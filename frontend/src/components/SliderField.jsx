import React from 'react';

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
    <div className="space-y-3">
      <div className="flex justify-between items-baseline">
        <label 
          htmlFor={field.name}
          className="block text-base text-gray-800"
        >
          {label || field.label}
        </label>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="number"
              value={inputValue === '' ? '' : inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              min={min}
              max={max}
              step={step}
              className="w-28 px-3 py-2 text-base border border-gray-300 text-gray-700 rounded-lg focus:outline-none text-right focus:border-gray-400"
              placeholder="0"
            />
            {isOutOfRange() && (
              <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" title="Value outside valid range (will be adjusted)">
                ⚠️
              </div>
            )}
          </div>
          <span className="text-base text-gray-700 min-w-fit">
            {suffix || prefix || ''}
          </span>
        </div>
      </div>

      <div className="relative">
        <input
          id={field.name}
          type="range"
          min={min}
          max={max}
          step={step}
          value={displayValue}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #6b7280 0%, #6b7280 ${((displayValue - min) / (max - min)) * 100}%, #e5e7eb ${((displayValue - min) / (max - min)) * 100}%, #e5e7eb 100%)`
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500">
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
        <p className="text-sm text-gray-500 mt-2">
          {field.helpText}
        </p>
      )}

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #6b7280;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #6b7280;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-track {
          background: transparent;
          border: none;
        }

        .slider::-moz-range-progress {
          background: #6b7280;
          height: 8px;
        }
      `}</style>
    </div>
  );
};

export default SliderField;

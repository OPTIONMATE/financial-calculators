import React from 'react';

/**
 * Input Field Component
 * Reusable input with label, validation, and formatting
 */
const InputField = ({ 
  field, 
  value, 
  onChange, 
  error 
}) => {
  const {
    name,
    label,
    type,
    placeholder,
    min,
    max,
    step,
    prefix,
    suffix,
    helpText
  } = field;

  const isCheckbox = type === 'checkbox';
  const isSelect = type === 'select';

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-base text-gray-800">
        {label}
      </label>
      
      <div className="relative">
        {prefix && !isCheckbox && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            {prefix}
          </span>
        )}

        {isSelect ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            className={`
              w-full px-4 py-2 rounded border bg-white text-sm
              ${prefix ? 'pl-8' : ''}
              ${suffix ? 'pr-20' : ''}
              ${error ? 'border-red-400' : 'border-gray-300'}
              focus:outline-none focus:border-gray-400
            `}
          >
            <option value="">Select an option</option>
            {(field.options || []).map((option) => {
              const optionValue = typeof option === 'object' ? option.value : option;
              const optionLabel = typeof option === 'object' ? option.label : option;

              return (
                <option key={String(optionValue)} value={optionValue}>
                  {optionLabel}
                </option>
              );
            })}
          </select>
        ) : isCheckbox ? (
          <div className="flex items-center gap-3 py-2">
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={Boolean(value)}
              onChange={(e) => onChange(name, e.target.checked)}
              className="h-5 w-5 rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">Yes</span>
          </div>
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            className={`
              w-full px-4 py-2 rounded border text-sm
              ${prefix ? 'pl-8' : ''}
              ${suffix ? 'pr-20' : ''}
              ${error ? 'border-red-400' : 'border-gray-300'}
              focus:outline-none focus:border-gray-400
            `}
          />
        )}
        
        {suffix && !isCheckbox && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
            {suffix}
          </span>
        )}
      </div>
      
      {helpText && !error && (
        <p className="text-xs text-gray-500">{helpText}</p>
      )}
      
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default InputField;

import React from 'react';
import { motion } from 'framer-motion';

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
      <label htmlFor={name} className="block text-base font-semibold text-neutral-900">
        {label}
      </label>
      
      <div className="relative">
        {prefix && !isCheckbox && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-sm font-medium">
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
              w-full px-4 py-3 rounded-xl border-2 bg-white text-sm font-medium appearance-none
              ${prefix ? 'pl-8' : ''}
              ${suffix ? 'pr-20' : ''}
              ${error ? 'border-red-400 bg-red-50' : 'border-neutral-200 hover:border-neutral-300 focus:border-primary-500'}
              focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200
              text-neutral-900
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
          <motion.div 
            className="flex items-center gap-3 py-2"
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={Boolean(value)}
              onChange={(e) => onChange(name, e.target.checked)}
              className="h-5 w-5 rounded-md border-2 border-neutral-300 text-primary-600 focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-0 cursor-pointer transition-all"
            />
            <label htmlFor={name} className="text-sm text-neutral-700 font-medium cursor-pointer">
              Yes
            </label>
          </motion.div>
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
              w-full px-4 py-3 rounded-xl border-2 text-sm font-medium
              ${prefix ? 'pl-8' : ''}
              ${suffix ? 'pr-20' : ''}
              ${error ? 'border-red-400 bg-red-50' : 'border-neutral-200 hover:border-neutral-300 focus:border-primary-500'}
              focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200
              text-neutral-900 placeholder-neutral-400
            `}
          />
        )}
        
        {suffix && !isCheckbox && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 text-sm font-medium">
            {suffix}
          </span>
        )}
      </div>
      
      {helpText && !error && (
        <p className="text-xs text-neutral-600 font-medium">{helpText}</p>
      )}
      
      {error && (
        <motion.p 
          className="text-xs text-red-600 font-medium flex items-center gap-1"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default InputField;

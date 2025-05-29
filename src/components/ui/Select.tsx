import React, { forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  onChange?: (value: string) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  options,
  error,
  helperText,
  className = '',
  fullWidth = false,
  onChange,
  ...props
}, ref) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label 
          htmlFor={props.id} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`
          block w-full pl-3 pr-10 py-2 text-base 
          border-gray-300 dark:border-gray-600 
          rounded-md shadow-sm 
          focus:outline-none focus:ring-blue-500 focus:border-blue-500 
          dark:bg-gray-700 dark:text-white
          ${error ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : ''}
          ${className}
        `}
        onChange={handleChange}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={props.id ? `${props.id}-error` : undefined}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400" id={props.id ? `${props.id}-error` : undefined}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
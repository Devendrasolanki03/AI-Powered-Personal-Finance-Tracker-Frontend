import { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

const Input = forwardRef(({
    label,
    error,
    icon: Icon,
    type = 'text',
    placeholder,
    className = '',
    ...props
}, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-dark-300 mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
                        <Icon className="w-5 h-5" />
                    </div>
                )}
                <input
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    className={`
            w-full px-4 py-2.5 ${Icon ? 'pl-10' : ''}
            bg-dark-800 border border-dark-700
            rounded-lg text-dark-100 placeholder-dark-500
            focus:outline-none focus:ring-2 focus:ring-ai-500 focus:border-transparent
            transition-all duration-200
            ${error ? 'border-danger-500 focus:ring-danger-500' : ''}
            ${className}
          `}
                    {...props}
                />
                {error && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-danger-500">
                        <AlertCircle className="w-5 h-5" />
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-danger-500">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
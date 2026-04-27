import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'xs';
  children: React.ReactNode;
}

const variantMap = {
  primary: 'bg-purple-600 hover:bg-purple-700 text-white border border-purple-600',
  secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-600 border border-transparent',
  danger: 'bg-red-600 hover:bg-red-700 text-white border border-red-600',
};

const sizeMap = {
  xs: 'text-xs px-2 py-1 rounded',
  sm: 'text-xs px-3 py-1.5 rounded-md',
  md: 'text-sm px-4 py-2 rounded-lg',
};

export function Button({ variant = 'secondary', size = 'sm', children, className = '', ...rest }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantMap[variant]} ${sizeMap[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

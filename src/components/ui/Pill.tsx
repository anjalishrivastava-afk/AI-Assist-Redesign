import React from 'react';

interface PillProps {
  children: React.ReactNode;
  color?: 'green' | 'amber' | 'red' | 'purple' | 'blue' | 'gray';
  size?: 'sm' | 'xs';
  className?: string;
}

const colorMap = {
  green: 'bg-green-50 text-green-700 border border-green-200',
  amber: 'bg-amber-50 text-amber-700 border border-amber-200',
  red: 'bg-red-50 text-red-700 border border-red-200',
  purple: 'bg-purple-50 text-purple-700 border border-purple-200',
  blue: 'bg-blue-50 text-blue-700 border border-blue-200',
  gray: 'bg-gray-100 text-gray-600 border border-gray-200',
};

export function Pill({ children, color = 'gray', size = 'sm', className = '' }: PillProps) {
  const sizeClass = size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClass} ${colorMap[color]} ${className}`}>
      {children}
    </span>
  );
}

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CollapsibleSectionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  headerRight?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  sticky?: boolean;
}

export function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
  headerRight,
  className = '',
  bodyClassName = '',
  sticky = false,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`border-b border-gray-100 last:border-b-0 ${className}`}>
      <div
        className={`flex items-center justify-between px-4 py-2.5 cursor-pointer select-none hover:bg-gray-50 transition-colors ${sticky ? 'sticky top-0 bg-white z-10 border-b border-gray-100' : 'bg-white'}`}
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          {open ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
          {title}
        </div>
        {headerRight && (
          <div onClick={e => e.stopPropagation()}>
            {headerRight}
          </div>
        )}
      </div>
      {open && (
        <div className={bodyClassName}>
          {children}
        </div>
      )}
    </div>
  );
}

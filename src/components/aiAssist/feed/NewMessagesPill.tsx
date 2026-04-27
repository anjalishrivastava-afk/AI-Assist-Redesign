import React from 'react';
import { ArrowDown } from 'lucide-react';

interface NewMessagesPillProps {
  onClick: () => void;
}

export function NewMessagesPill({ onClick }: NewMessagesPillProps) {
  return (
    <div className="flex justify-center py-1.5 bg-white border-t border-gray-100">
      <button
        onClick={onClick}
        className="flex items-center gap-1.5 px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full shadow-md hover:bg-purple-700 transition-colors animate-fadeIn"
      >
        <ArrowDown className="w-3 h-3" />
        New messages
      </button>
    </div>
  );
}

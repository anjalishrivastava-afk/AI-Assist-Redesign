import React from 'react';
import type { Mode } from '../../hooks/useMode';

interface ModeToggleProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Demo mode</span>
      <div className="flex items-center bg-gray-100 rounded-full p-0.5 gap-0">
        <button
          onClick={() => onChange('voice')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            mode === 'voice'
              ? 'bg-white text-red-600 shadow-sm border border-gray-200'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          🎙 Voice
        </button>
        <button
          onClick={() => onChange('chat')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            mode === 'chat'
              ? 'bg-white text-green-600 shadow-sm border border-gray-200'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          💬 Chat
        </button>
      </div>
    </div>
  );
}

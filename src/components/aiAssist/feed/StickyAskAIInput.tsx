import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface StickyAskAIInputProps {
  onSubmit: (question: string) => void;
}

export function StickyAskAIInput({ onSubmit }: StickyAskAIInputProps) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = () => {
    const q = value.trim();
    if (!q) return;
    onSubmit(q);
    setValue('');
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="shrink-0 border-t border-gray-200 bg-white px-3 py-2.5">
      <div className="flex items-center gap-1 mb-1.5">
        <Sparkles className="w-3 h-3 text-purple-500" />
        <span className="text-[10px] font-semibold text-purple-600 uppercase tracking-wide">Ask AI</span>
        <span className="text-[9px] text-gray-400 ml-1">· Private, not shown to customer</span>
      </div>
      <div
        className={`flex items-center gap-2 border rounded-xl bg-white px-3 py-2 transition-all ${
          focused
            ? 'border-purple-400 ring-2 ring-purple-100 shadow-sm'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Ask AI a question (private)..."
          className="flex-1 text-xs bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="w-6 h-6 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-40 flex items-center justify-center transition-colors shrink-0"
        >
          <Send className="w-3 h-3 text-white" />
        </button>
      </div>
    </div>
  );
}

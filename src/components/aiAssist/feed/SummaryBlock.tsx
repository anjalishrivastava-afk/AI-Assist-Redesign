import React from 'react';
import { Sparkles } from 'lucide-react';

interface SummaryBlockProps {
  text: string;
  summarizedCount: number;
  timestamp: string;
}

export function SummaryBlock({ text, summarizedCount, timestamp }: SummaryBlockProps) {
  return (
    <div className="mx-3 my-2 rounded-lg bg-purple-50 border border-purple-200 border-l-2 border-l-purple-500 px-3 py-2.5 animate-fadeIn">
      <div className="flex items-center gap-1.5 mb-1.5">
        <Sparkles className="w-3 h-3 text-purple-500 shrink-0" />
        <span className="text-[10px] font-semibold text-purple-600 uppercase tracking-wide">
          AI summary of {summarizedCount} messages
        </span>
        <span className="ml-auto text-[10px] text-gray-400 font-mono">{timestamp}</span>
      </div>
      <p className="text-xs text-purple-800 leading-relaxed">{text}</p>
    </div>
  );
}

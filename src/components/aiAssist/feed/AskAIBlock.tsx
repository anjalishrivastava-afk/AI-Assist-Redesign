import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Skeleton } from '../../ui/Skeleton';

interface AskAIBlockProps {
  question: string;
  answer?: string;
  source?: string;
  loading: boolean;
}

export function AskAIBlock({ question, answer, source, loading }: AskAIBlockProps) {
  return (
    <div className="mx-3 my-2 space-y-1.5 animate-fadeIn">
      {/* Private label */}
      <div className="flex items-center justify-center">
        <span className="text-[9px] font-medium text-purple-400 uppercase tracking-widest px-2 py-0.5 bg-purple-50 rounded-full border border-purple-100">
          Private — only visible to you
        </span>
      </div>

      {/* Question block (right-aligned) */}
      <div className="flex justify-end">
        <div className="max-w-[85%] bg-indigo-600 rounded-2xl rounded-tr-sm px-3 py-2.5">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-semibold text-indigo-200 uppercase tracking-wide">You asked</span>
          </div>
          <p className="text-xs text-white leading-relaxed">{question}</p>
        </div>
      </div>

      {/* Answer block (left-aligned) */}
      {loading ? (
        <div className="flex justify-start">
          <div className="flex items-center gap-2 px-3 py-2.5 bg-purple-50 border border-purple-200 rounded-2xl rounded-tl-sm max-w-[85%]">
            <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
              <Sparkles className="w-3 h-3 text-purple-500" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Loader2 className="w-3 h-3 text-purple-400 animate-spin ml-1" />
          </div>
        </div>
      ) : answer ? (
        <div className="flex justify-start">
          <div className="max-w-[85%] bg-purple-50 border border-purple-100 rounded-2xl rounded-tl-sm px-3 py-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-4 h-4 rounded-full bg-purple-200 flex items-center justify-center shrink-0">
                <Sparkles className="w-2.5 h-2.5 text-purple-600" />
              </div>
              <span className="text-[10px] font-semibold text-purple-600 uppercase tracking-wide">AI</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">{answer}</p>
            {source && (
              <div className="flex items-center gap-1 mt-2 pt-1.5 border-t border-purple-100">
                <span className="text-[10px] text-gray-400">Source:</span>
                <span className="text-[10px] text-purple-500 font-medium">{source}</span>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

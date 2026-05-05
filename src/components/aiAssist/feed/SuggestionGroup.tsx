import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SuggestionCard } from '../SuggestionCard';
import { suggestionsById } from '../../../mocks/suggestions';
import type { Mode } from '../../../hooks/useMode';

interface SuggestionGroupProps {
  suggestionIds: string[];
  mode: Mode;
  onInsert?: (text: string) => void;
}

export function SuggestionGroup({ suggestionIds, mode, onInsert }: SuggestionGroupProps) {
  const [collapsed, setCollapsed] = useState(false);
  const validSuggestions = suggestionIds
    .map(id => suggestionsById[id])
    .filter(Boolean);

  if (!validSuggestions.length) return null;

  return (
    <div className="flex gap-0 ml-4 mb-1 animate-fadeIn">
      {/* Vertical connecting line */}
      <div className="flex flex-col items-center w-5 shrink-0 pt-1">
        <div className="w-px flex-1 bg-purple-200" style={{ minHeight: '16px' }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-4 pb-2">
        <button
          onClick={() => setCollapsed(c => !c)}
          className="flex items-center gap-1.5 mb-2 group"
        >
          <span className="text-[10px] font-semibold text-purple-600">
            💡 {validSuggestions.length} suggested {validSuggestions.length === 1 ? 'reply' : 'replies'} for this message
          </span>
          {collapsed
            ? <ChevronDown className="w-3 h-3 text-purple-400 group-hover:text-purple-600" />
            : <ChevronUp className="w-3 h-3 text-purple-400 group-hover:text-purple-600" />
          }
        </button>

        {!collapsed && (
          <div className="space-y-2">
            {validSuggestions.map(s => (
              <SuggestionCard key={s.id} suggestion={s} mode={mode} onInsert={onInsert} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

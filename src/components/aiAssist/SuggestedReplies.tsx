// DEPRECATED: replaced by inline SuggestionGroup in v2 redesign
// @ts-nocheck
import React, { useState } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { CollapsibleSection } from '../ui/CollapsibleSection';
import { SuggestionCard } from './SuggestionCard';
import { SuggestionSkeleton } from '../ui/Skeleton';
import { suggestions } from '../../mocks/suggestions';
import type { Mode } from '../../hooks/useMode';

interface SuggestedRepliesProps {
  mode: Mode;
  onInsert?: (text: string) => void;
}

export function SuggestedReplies({ mode, onInsert }: SuggestedRepliesProps) {
  const [loading, setLoading] = useState(false);

  const filtered = suggestions.filter(s => s.mode === mode);

  const handleRegenerate = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  };

  const headerRight = (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-400">{filtered.length} suggestions</span>
      <button
        onClick={handleRegenerate}
        className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-medium"
      >
        <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
        Regenerate
      </button>
    </div>
  );

  return (
    <CollapsibleSection
      title={<span className="flex items-center gap-1.5"><Lightbulb className="w-3.5 h-3.5 text-amber-500" /><span>Suggestions</span></span>}
      headerRight={headerRight}
      bodyClassName="px-3 pb-3 pt-2 space-y-2"
    >
      {loading
        ? Array.from({ length: 3 }).map((_, i) => <SuggestionSkeleton key={i} />)
        : filtered.map(s => (
          <SuggestionCard key={s.id} suggestion={s} mode={mode} onInsert={onInsert} />
        ))
      }
    </CollapsibleSection>
  );
}

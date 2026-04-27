import React from 'react';
import type { Confidence } from '../../mocks/suggestions';

const config: Record<Confidence, { dot: string; text: string; bg: string }> = {
  High: { dot: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50 border-green-200' },
  Med: { dot: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  Low: { dot: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50 border-red-200' },
};

interface ConfidenceBadgeProps {
  confidence: Confidence;
}

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  const c = config[confidence];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full border ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {confidence}
    </span>
  );
}

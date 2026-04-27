import React from 'react';
import { FileText, Ticket, Users, Shield } from 'lucide-react';
import type { SuggestionSource } from '../../mocks/suggestions';

const iconMap = {
  kb: FileText,
  ticket: Ticket,
  crm: Users,
  policy: Shield,
};

interface SourceChipProps {
  source: SuggestionSource;
}

export function SourceChip({ source }: SourceChipProps) {
  const Icon = iconMap[source.type];
  return (
    <span
      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200"
      title={`Ref: ${source.ref}`}
    >
      <Icon className="w-3 h-3" />
      {source.label}
    </span>
  );
}

import React from 'react';
import { Chip } from '@exotel-npm-dev/signal-design-system';
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
    <Chip
      size="small"
      variant="outlined"
      icon={<Icon size={14} aria-hidden />}
      label={source.label}
      title={`Ref: ${source.ref}`}
      sx={{ height: 24 }}
    />
  );
}

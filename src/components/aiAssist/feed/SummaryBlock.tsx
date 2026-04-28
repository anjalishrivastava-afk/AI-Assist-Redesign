import React from 'react';
import { Card, CardContent, Typography, Stack } from '@exotel-npm-dev/signal-design-system';

interface SummaryBlockProps {
  text: string;
  summarizedCount: number;
  timestamp: string;
}

export function SummaryBlock({ text, summarizedCount, timestamp }: SummaryBlockProps) {
  return (
    <Card variant="outlined" sx={{ borderLeft: 3, borderLeftColor: 'primary.main', bgcolor: 'action.hover' }}>
      <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1} sx={{ mb: 1 }}>
          <Typography variant="caption" fontWeight={600} color="text.secondary">
            Summary · {summarizedCount} messages
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>
            {timestamp}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.5 }}>
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}

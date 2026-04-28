import React from 'react';
import { Chip, Stack, Typography } from '@exotel-npm-dev/signal-design-system';
import type { Confidence } from '../../mocks/suggestions';

const chipColor: Record<Confidence, 'success' | 'default' | 'warning'> = {
  High: 'success',
  Med: 'default',
  Low: 'warning',
};

const labelText: Record<Confidence, string> = {
  High: 'High',
  Med: 'Medium',
  Low: 'Low',
};

interface ConfidenceBadgeProps {
  confidence: Confidence;
}

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  return (
    <Chip
      size="small"
      variant="outlined"
      color={chipColor[confidence]}
      label={
        <Stack direction="row" spacing={0.75} alignItems="center" component="span">
          <Typography variant="caption" fontWeight={400} component="span">
            Confidence
          </Typography>
          <Typography variant="caption" fontWeight={600} component="span">
            {labelText[confidence]}
          </Typography>
        </Stack>
      }
      sx={{ height: 24, '& .MuiChip-label': { px: 1 } }}
    />
  );
}

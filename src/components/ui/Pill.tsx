import React from 'react';
import { Chip } from '@exotel-npm-dev/signal-design-system';

interface PillProps {
  children: React.ReactNode;
  color?: 'green' | 'amber' | 'red' | 'accent' | 'blue' | 'gray';
  size?: 'sm' | 'xs';
}

const chipColor: Record<NonNullable<PillProps['color']>, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  green: 'success',
  amber: 'warning',
  red: 'error',
  accent: 'primary',
  blue: 'info',
  gray: 'default',
};

export function Pill({ children, color = 'gray', size = 'sm' }: PillProps) {
  return (
    <Chip
      label={children}
      size={size === 'xs' ? 'small' : 'small'}
      variant="outlined"
      color={chipColor[color]}
      sx={{ height: size === 'xs' ? 22 : 26, fontWeight: 600, '& .MuiChip-label': { px: 1, typography: 'caption' } }}
    />
  );
}

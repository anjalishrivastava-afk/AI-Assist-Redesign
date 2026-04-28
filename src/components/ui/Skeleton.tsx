import React from 'react';
import { Card, CardContent, Skeleton as MuiSkeleton, Stack } from '@exotel-npm-dev/signal-design-system';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  variant?: 'text' | 'rectangular' | 'rounded';
}

export function Skeleton({ width = '100%', height = 16, variant = 'rounded' }: SkeletonProps) {
  return <MuiSkeleton variant={variant} width={width} height={height} animation="wave" />;
}

export function SuggestionSkeleton() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1}>
            <Skeleton width={80} height={20} />
            <Skeleton width={112} height={20} />
          </Stack>
          <Skeleton height={16} />
          <Skeleton height={16} width="83%" />
          <Stack direction="row" spacing={1} sx={{ pt: 0.5 }}>
            <Skeleton width={80} height={32} />
            <Skeleton width={96} height={32} />
            <Skeleton width={64} height={32} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@exotel-npm-dev/signal-design-system';

export type MessageCardAlign = 'start' | 'end';

export interface MessageCardProps {
  /** Line above body, e.g. "Customer · 2:14 PM" */
  caption: string;
  children: React.ReactNode;
  /** Horizontal alignment in a column flex parent */
  align?: MessageCardAlign;
  /** Emphasize customer / inbound edge */
  accentStart?: boolean;
}

/**
 * Compact message surface for chat + assist transcript (Card + Typography).
 */
export function MessageCard({ caption, children, align = 'start', accentStart }: MessageCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        alignSelf: align === 'end' ? 'flex-end' : 'flex-start',
        maxWidth: 'min(100%, 28rem)',
        width: '100%',
        ...(accentStart ? { borderLeft: 3, borderLeftColor: 'primary.main' } : {}),
      }}
    >
      <CardContent sx={{ py: 1.25, px: 2, '&:last-child': { pb: 1.25 } }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
          {caption}
        </Typography>
        <Typography variant="body2" color="text.primary" component="div" sx={{ lineHeight: 1.5 }}>
          {children}
        </Typography>
      </CardContent>
    </Card>
  );
}

export interface VoiceTranscriptCardProps {
  timestamp: string;
  speaker: string;
  isAgent: boolean;
  isLatestCustomer: boolean;
  children: React.ReactNode;
}

/** Voice transcript row: time column + speaker + body */
export function VoiceTranscriptCard({
  timestamp,
  speaker,
  isAgent,
  isLatestCustomer,
  children,
}: VoiceTranscriptCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        ...(!isAgent && isLatestCustomer ? { borderLeft: 3, borderLeftColor: 'primary.main' } : {}),
      }}
    >
      <CardContent sx={{ py: 1.25, px: 2, '&:last-child': { pb: 1.25 } }}>
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums', width: 44, flexShrink: 0, pt: 0.25 }}
          >
            {timestamp}
          </Typography>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="caption"
              fontWeight={600}
              color={isAgent ? 'primary.main' : 'text.secondary'}
              sx={{ display: 'block', mb: 0.5 }}
            >
              {speaker}
            </Typography>
            <Typography variant="body2" color="text.primary" component="div" sx={{ lineHeight: 1.5 }}>
              {children}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

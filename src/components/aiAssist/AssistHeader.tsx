import React from 'react';
import { Info, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@exotel-npm-dev/signal-design-system';
import type { Mode } from '../../hooks/useMode';
import type { SentimentReading } from '../../mocks/sentiment';
import type { InteractionState } from '../../hooks/useInteractionState';

interface AssistHeaderProps {
  mode: Mode;
  callDuration: string;
  sentiment: SentimentReading[];
  interactionState: InteractionState;
}

function Sparkline({ data }: { data: SentimentReading[] }) {
  const theme = useTheme();
  const w = 56;
  const h = 16;
  const min = -1;
  const max = 1;
  if (data.length < 2) return null;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((d.score - min) / (max - min)) * h;
    return `${x},${y}`;
  });
  const lastScore = data[data.length - 1]?.score ?? 0;
  const stroke = lastScore < -0.3 ? theme.palette.warning.main : theme.palette.text.disabled;

  return (
    <Box component="svg" width={w} height={h} sx={{ flexShrink: 0 }} aria-hidden>
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={stroke}
        strokeWidth={1}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Box>
  );
}

export function AssistHeader({ mode, callDuration, sentiment, interactionState }: AssistHeaderProps) {
  const first = sentiment[0];
  const last = sentiment[sentiment.length - 1];
  const trendChanged = first?.label !== last?.label;

  const statusChip =
    interactionState === 'ended' ? (
      <Chip size="small" variant="outlined" icon={<CheckCircle size={14} aria-hidden />} label={`${mode === 'voice' ? 'Call ended' : 'Resolved'} · ${callDuration}`} />
    ) : mode === 'voice' ? (
      <Chip size="small" variant="outlined" icon={<Phone size={14} aria-hidden />} label={`Live · ${callDuration}`} />
    ) : (
      <Chip size="small" variant="outlined" icon={<MessageSquare size={14} aria-hidden />} label="Active chat" />
    );

  return (
    <Box component="header" sx={{ flexShrink: 0, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper', px: 2, py: 2 }}>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            AI Assist
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
            Transcript, suggestions, and disposition
          </Typography>
        </Box>
        <Box sx={{ flexShrink: 0 }}>{statusChip}</Box>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 0 }}>
          <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ flexShrink: 0 }}>
            Sentiment
          </Typography>
          <Typography variant="caption" color="text.primary" noWrap>
            {first?.label ?? '—'}
            {trendChanged ? ` → ${last?.label}` : ''}
          </Typography>
          <Tooltip title="Estimated from the customer's recent messages." arrow placement="top">
            <IconButton size="small" aria-label="Sentiment help" sx={{ flexShrink: 0 }}>
              <Info size={14} aria-hidden />
            </IconButton>
          </Tooltip>
        </Stack>
        <Sparkline data={sentiment} />
      </Stack>

      <Stack direction="row" spacing={0.25} sx={{ mt: 1, height: 4, borderRadius: 0.5, overflow: 'hidden', bgcolor: 'action.hover' }} aria-hidden>
        {sentiment.map((_, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              bgcolor: 'text.disabled',
              opacity: 0.35 + (i / Math.max(sentiment.length, 1)) * 0.55,
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}

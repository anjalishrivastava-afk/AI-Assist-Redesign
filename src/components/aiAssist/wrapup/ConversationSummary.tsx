import React, { useState } from 'react';
import { MessageSquare, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@exotel-npm-dev/signal-design-system';
import type { TranscriptTurn } from '../../../mocks/voiceTranscript';
import type { ChatTurn } from '../../../mocks/chatTranscript';
import type { SentimentReading } from '../../../mocks/sentiment';
import type { Mode } from '../../../hooks/useMode';

function PiiTextInline({ text }: { text: string }) {
  const parts = text.split(/(\*{4} \[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\*{4} \[([^\]]+)\]$/);
        if (match) {
          return (
            <Box
              key={i}
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                border: 1,
                borderColor: 'divider',
                bgcolor: 'action.hover',
                color: 'text.secondary',
                typography: 'caption',
                px: 0.5,
                py: 0.25,
                borderRadius: 0.5,
                fontFamily: 'monospace',
                mx: 0.25,
                verticalAlign: 'baseline',
              }}
            >
              <Lock size={12} aria-hidden />
              [redacted]
            </Box>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

interface ConversationSummaryProps {
  mode: Mode;
  voiceTurns: TranscriptTurn[];
  chatTurns: ChatTurn[];
  sentiment: SentimentReading[];
  summary: string;
  callDuration: string;
}

export function ConversationSummary({ mode, voiceTurns, chatTurns, sentiment, summary, callDuration }: ConversationSummaryProps) {
  const [expanded, setExpanded] = useState(false);

  const turns = mode === 'voice' ? voiceTurns : chatTurns;
  const finalSentiment = sentiment[sentiment.length - 1];
  const msgCount = turns.filter(t =>
    mode === 'voice'
      ? (t as TranscriptTurn).speaker !== 'System'
      : true,
  ).length;

  return (
    <Box sx={{ p: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>
            Conversation summary
          </Typography>

          <Stack direction="row" flexWrap="wrap" alignItems="center" columnGap={1.5} rowGap={0.5} sx={{ mb: 1.5 }}>
            <Stack direction="row" alignItems="center" spacing={0.75}>
              <MessageSquare size={14} aria-hidden />
              <Typography variant="caption" color="text.secondary">
                {msgCount} messages
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.disabled">
              ·
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {callDuration}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              ·
            </Typography>
            <Typography variant="caption" fontWeight={600} color="text.secondary">
              {finalSentiment?.label ?? 'Neutral'}
            </Typography>
          </Stack>

          <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.6 }}>
            {summary}
          </Typography>

          <Button fullWidth variant="outlined" size="small" onClick={() => setExpanded(e => !e)} sx={{ mt: 2, textTransform: 'none' }}>
            <Stack direction="row" spacing={0.5} alignItems="center" component="span">
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {expanded ? 'Hide transcript' : 'Show full transcript'}
            </Stack>
          </Button>

          {expanded ? (
            <Card variant="outlined" sx={{ mt: 1.5, bgcolor: 'action.hover' }}>
              <Box sx={{ maxHeight: 256, overflow: 'auto' }}>
                {mode === 'voice'
                  ? voiceTurns.map(t => {
                    if (t.speaker === 'System') {
                      return (
                        <Box key={t.id} sx={{ px: 1.5, py: 1 }}>
                          <Typography variant="caption" color="text.secondary" align="center" display="block">
                            {t.text}
                          </Typography>
                        </Box>
                      );
                    }
                    if (t.isAISummary) {
                      return (
                        <Box key={t.id} sx={{ mx: 1, my: 1, px: 1.5, py: 1, borderRadius: 1, border: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                          <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Summary · {t.summarizedCount} messages
                          </Typography>
                          <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                            {t.text}
                          </Typography>
                        </Box>
                      );
                    }
                    return (
                      <Stack key={t.id} direction="row" spacing={1} sx={{ px: 1.5, py: 1, borderBottom: 1, borderColor: 'divider', typography: 'caption' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace', width: 40, flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
                          {t.timestamp}
                        </Typography>
                        <Typography variant="caption" fontWeight={700} color={t.speaker === 'Agent' ? 'primary.main' : 'text.secondary'} sx={{ width: 56, flexShrink: 0 }}>
                          {t.speaker}
                        </Typography>
                        <Typography variant="caption" color="text.primary" sx={{ lineHeight: 1.5 }}>
                          <PiiTextInline text={t.text} />
                        </Typography>
                      </Stack>
                    );
                  })
                  : chatTurns.map(t => (
                    <Stack
                      key={t.id}
                      direction="row"
                      spacing={1}
                      sx={{
                        px: 1.5,
                        py: 1,
                        borderBottom: 1,
                        borderColor: 'divider',
                        typography: 'caption',
                        bgcolor: t.sender === 'agent' ? 'background.paper' : 'transparent',
                      }}
                    >
                      <Typography variant="caption" fontWeight={700} color={t.sender === 'agent' ? 'primary.main' : 'text.secondary'} sx={{ width: 56, flexShrink: 0 }}>
                        {t.sender === 'agent' ? 'Agent' : 'Customer'}
                      </Typography>
                      <Typography variant="caption" color="text.primary" sx={{ lineHeight: 1.5 }}>
                        <PiiTextInline text={t.text} />
                      </Typography>
                    </Stack>
                  ))}
              </Box>
              <Divider />
              <Button fullWidth size="small" onClick={() => setExpanded(false)} sx={{ textTransform: 'none', borderRadius: 0 }}>
                <Stack direction="row" spacing={0.5} alignItems="center" component="span">
                  <ChevronUp size={14} />
                  Collapse
                </Stack>
              </Button>
            </Card>
          ) : null}
        </CardContent>
      </Card>
    </Box>
  );
}

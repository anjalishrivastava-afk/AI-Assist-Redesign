import React from 'react';
import { Lock } from '@phosphor-icons/react';
import { Box, Typography } from '@exotel-npm-dev/signal-design-system';
import { MessageCard, VoiceTranscriptCard } from '../../ds/MessageCard';
import { SummaryBlock } from './SummaryBlock';
import type { TranscriptTurn } from '../../../mocks/voiceTranscript';
import type { ChatTurn } from '../../../mocks/chatTranscript';

function PiiText({ text }: { text: string }) {
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
                gap: 0.25,
                mx: 0.25,
                px: 0.5,
                py: 0.25,
                borderRadius: 0.5,
                border: 1,
                borderColor: 'divider',
                bgcolor: 'grey.100',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                verticalAlign: 'baseline',
              }}
            >
              <Lock size={12} />
              **** [{match[1]}]
            </Box>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

interface VoiceMessageProps {
  turn: TranscriptTurn;
  isLatest: boolean;
}

function VoiceMessage({ turn, isLatest }: VoiceMessageProps) {
  if (turn.isAISummary) {
    return (
      <SummaryBlock
        text={turn.text}
        summarizedCount={turn.summarizedCount ?? 0}
        timestamp={turn.timestamp}
      />
    );
  }

  if (turn.speaker === 'System') {
    return (
      <Box sx={{ py: 0.5, px: 1 }}>
        <Typography variant="caption" color="text.secondary" align="center" display="block">
          {turn.text}
        </Typography>
      </Box>
    );
  }

  const isAgent = turn.speaker === 'Agent';

  return (
    <VoiceTranscriptCard
      timestamp={turn.timestamp}
      speaker={turn.speaker}
      isAgent={isAgent}
      isLatestCustomer={!isAgent && isLatest}
    >
      <PiiText text={turn.text} />
    </VoiceTranscriptCard>
  );
}

interface ChatMessageProps {
  turn: ChatTurn;
}

function ChatMessage({ turn }: ChatMessageProps) {
  const isAgent = turn.sender === 'agent';
  return (
    <MessageCard
      caption={isAgent ? `You · ${turn.timestamp}` : `Customer · ${turn.timestamp}`}
      align={isAgent ? 'end' : 'start'}
      accentStart={!isAgent}
    >
      {turn.piiMasked ? <PiiText text={turn.text} /> : turn.text}
    </MessageCard>
  );
}

type TranscriptMessageProps =
  | { mode: 'voice'; turn: TranscriptTurn; isLatest?: boolean }
  | { mode: 'chat'; turn: ChatTurn; isLatest?: boolean };

export function TranscriptMessage(props: TranscriptMessageProps) {
  if (props.mode === 'voice') {
    return <VoiceMessage turn={props.turn} isLatest={props.isLatest ?? false} />;
  }
  return <ChatMessage turn={props.turn} />;
}

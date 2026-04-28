import React from 'react';
import { Box, Stack } from '@exotel-npm-dev/signal-design-system';
import { ConversationSummary } from './wrapup/ConversationSummary';
import { AutoDisposition } from './AutoDisposition';
import { voiceTranscript } from '../../mocks/voiceTranscript';
import { chatTranscript } from '../../mocks/chatTranscript';
import { voiceSentiment, chatSentiment } from '../../mocks/sentiment';
import { dispositionData, chatDispositionData } from '../../mocks/disposition';
import type { Mode } from '../../hooks/useMode';

interface WrapUpViewProps {
  mode: Mode;
  callDuration: string;
  onSaveDisposition: () => void;
}

export function WrapUpView({ mode, callDuration, onSaveDisposition }: WrapUpViewProps) {
  const sentiment = mode === 'voice' ? voiceSentiment : chatSentiment;
  const data = mode === 'voice' ? dispositionData : chatDispositionData;

  return (
    <Stack sx={{ flex: 1, minHeight: 0, overflow: 'auto', bgcolor: 'grey.100' }}>
      <ConversationSummary
        mode={mode}
        voiceTurns={voiceTranscript}
        chatTurns={chatTranscript}
        sentiment={sentiment}
        summary={data.mockCallSummary}
        callDuration={callDuration}
      />
      <Box sx={{ borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <AutoDisposition mode={mode} isActive={false} onSave={onSaveDisposition} />
      </Box>
    </Stack>
  );
}

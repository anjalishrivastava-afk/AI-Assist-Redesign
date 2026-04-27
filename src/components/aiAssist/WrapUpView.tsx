import React from 'react';
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
    <div className="flex-1 overflow-y-auto">
      <ConversationSummary
        mode={mode}
        voiceTurns={voiceTranscript}
        chatTurns={chatTranscript}
        sentiment={sentiment}
        summary={data.mockCallSummary}
        callDuration={callDuration}
      />
      <div className="border-t border-gray-100">
        <AutoDisposition mode={mode} isActive={false} onSave={onSaveDisposition} />
      </div>
    </div>
  );
}

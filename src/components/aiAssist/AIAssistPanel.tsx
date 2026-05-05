// DEPRECATED: replaced by AIAssistContainer + LiveWorkspace + WrapUpView in v2 redesign
// @ts-nocheck
import React from 'react';
import { AssistHeader } from './AssistHeader';
import { LiveTranscript } from './LiveTranscript';
import { SuggestedReplies } from './SuggestedReplies';
import { AutoDisposition } from './AutoDisposition';
import { AskAI } from './AskAI';
import { voiceTranscript } from '../../mocks/voiceTranscript';
import { chatTranscript } from '../../mocks/chatTranscript';
import { voiceSentiment, chatSentiment } from '../../mocks/sentiment';
import { useStreamingTranscript } from '../../hooks/useStreamingTranscript';
import type { Mode } from '../../hooks/useMode';

interface AIAssistPanelProps {
  mode: Mode;
  callDuration: string;
  onInsert?: (text: string) => void;
  onSaveDisposition: () => void;
}

export function AIAssistPanel({ mode, callDuration, onInsert, onSaveDisposition }: AIAssistPanelProps) {
  const { visibleTurns, latestId, isDone, replay } = useStreamingTranscript(voiceTranscript, 3000);
  const sentiment = mode === 'voice' ? voiceSentiment : chatSentiment;

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200 overflow-hidden">
      <AssistHeader mode={mode} callDuration={callDuration} sentiment={sentiment} />
      <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
        <LiveTranscript
          mode={mode}
          voiceTurns={mode === 'voice' ? visibleTurns : []}
          chatTurns={mode === 'chat' ? chatTranscript : []}
          latestVoiceId={latestId}
          isDone={isDone}
          onReplay={replay}
        />
        <SuggestedReplies mode={mode} onInsert={onInsert} />
        <AutoDisposition mode={mode} isActive={true} onSave={onSaveDisposition} />
        <AskAI />
      </div>
    </div>
  );
}

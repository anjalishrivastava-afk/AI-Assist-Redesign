import React, { useState, useEffect } from 'react';
import { AssistHeader } from './AssistHeader';
import { LiveWorkspace } from './LiveWorkspace';
import { WrapUpView } from './WrapUpView';
import { voiceSentiment, chatSentiment } from '../../mocks/sentiment';
import { useStreamingTranscript } from '../../hooks/useStreamingTranscript';
import { voiceTranscript } from '../../mocks/voiceTranscript';
import type { Mode } from '../../hooks/useMode';
import type { InteractionState } from '../../hooks/useInteractionState';

interface AIAssistContainerProps {
  mode: Mode;
  callDuration: string;
  interactionState: InteractionState;
  onInsert?: (text: string) => void;
  onSaveDisposition: () => void;
}

export function AIAssistContainer({
  mode,
  callDuration,
  interactionState,
  onInsert,
  onSaveDisposition,
}: AIAssistContainerProps) {
  // Fade transition state
  const [displayedState, setDisplayedState] = useState<InteractionState>(interactionState);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (interactionState === displayedState) return;
    setOpacity(0);
    const t = setTimeout(() => {
      setDisplayedState(interactionState);
      setOpacity(1);
    }, 200);
    return () => clearTimeout(t);
  }, [interactionState, displayedState]);

  const { visibleTurns, latestId } = useStreamingTranscript(voiceTranscript, 3000);
  const sentiment = mode === 'voice' ? voiceSentiment : chatSentiment;

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200 overflow-hidden">
      <AssistHeader
        mode={mode}
        callDuration={callDuration}
        sentiment={sentiment}
        interactionState={interactionState}
      />
      <div
        className="flex-1 flex flex-col min-h-0 transition-opacity"
        style={{ opacity, transitionDuration: '200ms' }}
      >
        {displayedState === 'active' ? (
          <LiveWorkspace
            mode={mode}
            voiceTurns={visibleTurns}
            latestVoiceId={latestId}
            onInsert={onInsert}
          />
        ) : (
          <WrapUpView
            mode={mode}
            callDuration={callDuration}
            onSaveDisposition={onSaveDisposition}
          />
        )}
      </div>
    </div>
  );
}

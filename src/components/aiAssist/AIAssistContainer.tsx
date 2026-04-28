import React, { useState, useEffect } from 'react';
import { Box } from '@exotel-npm-dev/signal-design-system';
import { AssistHeader } from './AssistHeader';
import { AssistTabbedPanel } from './AssistTabbedPanel';
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
  const [displayedState, setDisplayedState] = useState<InteractionState>(interactionState);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (interactionState === displayedState) return;
    setOpacity(0);
    const t = setTimeout(() => {
      setDisplayedState(interactionState);
      setOpacity(1);
    }, 150);
    return () => clearTimeout(t);
  }, [interactionState, displayedState]);

  const { visibleTurns, latestId } = useStreamingTranscript(voiceTranscript, 3000);
  const sentiment = mode === 'voice' ? voiceSentiment : chatSentiment;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0, bgcolor: 'background.paper' }}>
      <AssistHeader
        mode={mode}
        callDuration={callDuration}
        sentiment={sentiment}
        interactionState={interactionState}
      />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          opacity,
          transition: 'opacity 150ms ease',
        }}
      >
        {displayedState === 'active' ? (
          <AssistTabbedPanel
            mode={mode}
            voiceTurns={visibleTurns}
            latestVoiceId={latestId}
            onInsert={onInsert}
            onSaveDisposition={onSaveDisposition}
          />
        ) : (
          <WrapUpView
            mode={mode}
            callDuration={callDuration}
            onSaveDisposition={onSaveDisposition}
          />
        )}
      </Box>
    </Box>
  );
}

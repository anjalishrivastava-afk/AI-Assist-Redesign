import { useState, useCallback } from 'react';

export type InteractionState = 'active' | 'ended';

export function useInteractionState() {
  const [interactionState, setInteractionState] = useState<InteractionState>('active');

  const endInteraction = useCallback(() => setInteractionState('ended'), []);
  const resumeInteraction = useCallback(() => setInteractionState('active'), []);

  return { interactionState, endInteraction, resumeInteraction };
}

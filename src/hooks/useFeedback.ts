import { useState } from 'react';

export type FeedbackReason = 'inaccurate' | 'off-topic' | 'language-mismatch' | 'other';

export interface SuggestionFeedback {
  vote: 'up' | 'down' | null;
  reason?: FeedbackReason;
  comment?: string;
  submittedAt?: number;
}

export function useFeedback(initial?: SuggestionFeedback) {
  const [feedback, setFeedback] = useState<SuggestionFeedback>(
    initial ?? { vote: null },
  );
  return { feedback, setFeedback };
}

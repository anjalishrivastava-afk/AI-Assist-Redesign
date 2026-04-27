import { useState, useEffect, useRef, useCallback } from 'react';
import type { TranscriptTurn } from '../mocks/voiceTranscript';

export function useStreamingTranscript(fullTranscript: TranscriptTurn[], intervalMs = 3000) {
  const [visibleCount, setVisibleCount] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startStreaming = useCallback(() => {
    setVisibleCount(1);
    setIsRunning(true);
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    if (visibleCount >= fullTranscript.length) {
      setIsRunning(false);
      return;
    }

    intervalRef.current = setInterval(() => {
      setVisibleCount(prev => {
        if (prev >= fullTranscript.length) {
          setIsRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, intervalMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, visibleCount, fullTranscript.length, intervalMs]);

  const isDone = visibleCount >= fullTranscript.length;

  return {
    visibleTurns: fullTranscript.slice(0, visibleCount),
    isDone,
    replay: startStreaming,
    latestId: fullTranscript[visibleCount - 1]?.id,
  };
}

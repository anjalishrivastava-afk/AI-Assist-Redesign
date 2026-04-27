import { useState, useEffect } from 'react';

export function useCallTimer(initialSeconds = 383) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

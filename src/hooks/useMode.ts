import { useState } from 'react';

export type Mode = 'voice' | 'chat';

export function useMode(initial: Mode = 'voice') {
  const [mode, setMode] = useState<Mode>(initial);
  return { mode, setMode };
}

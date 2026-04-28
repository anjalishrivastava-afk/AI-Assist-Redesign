import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Stack, Typography } from '@exotel-npm-dev/signal-design-system';
import { StickyComposerBar } from '../../ds/StickyComposerBar';

interface StickyAskAIInputProps {
  onSubmit: (question: string) => void;
}

export function StickyAskAIInput({ onSubmit }: StickyAskAIInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    const q = value.trim();
    if (!q) return;
    onSubmit(q);
    setValue('');
  };

  return (
    <StickyComposerBar
      value={value}
      onChange={setValue}
      onSubmit={handleSubmit}
      placeholder="Ask a question…"
      ariaLabel="Ask AI — not visible to customer"
      submitLabel="Send"
      submitStartIcon={<Send size={16} aria-hidden />}
      disabledSubmit={!value.trim()}
      header={
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" fontWeight={600} color="text.secondary">
            Ask AI
          </Typography>
          <Typography variant="caption" color="text.disabled">
            Not visible to customer
          </Typography>
        </Stack>
      }
      onKeyDown={e => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSubmit();
        }
      }}
    />
  );
}

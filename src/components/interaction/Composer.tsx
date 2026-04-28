import React, { useState, useEffect } from 'react';
import { PaperPlaneTilt, Paperclip, Smiley } from '@phosphor-icons/react';
import { IconButton } from '@exotel-npm-dev/signal-design-system';
import { StickyComposerBar } from '../ds/StickyComposerBar';

interface ComposerProps {
  insertText?: string;
  onClearInsert?: () => void;
}

export function Composer({ insertText, onClearInsert }: ComposerProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (insertText) {
      const clean = insertText.startsWith('[Edit] ') ? insertText.slice(7) : insertText;
      setValue(clean);
      onClearInsert?.();
    }
  }, [insertText, onClearInsert]);

  const handleSend = () => {
    if (!value.trim()) return;
    setValue('');
  };

  return (
    <StickyComposerBar
      value={value}
      onChange={setValue}
      onSubmit={handleSend}
      multiline
      multilineLabel="Message"
      ariaLabel="Compose message to customer"
      minRows={3}
      placeholder="Type a message…"
      helperHint="⌘ Enter to send"
      disabledSubmit={!value.trim()}
      showAccessoryIcons
      accessoryIcons={
        <>
          <IconButton size="small" aria-label="Attach file" color="default">
            <Paperclip size={18} aria-hidden />
          </IconButton>
          <IconButton size="small" aria-label="Emoji" color="default">
            <Smiley size={18} aria-hidden />
          </IconButton>
        </>
      }
      submitLabel="Send"
      submitStartIcon={<PaperPlaneTilt size={18} aria-hidden />}
      onKeyDown={e => {
        if (e.key === 'Enter' && e.metaKey) handleSend();
      }}
    />
  );
}

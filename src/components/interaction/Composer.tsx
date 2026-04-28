import React, { useState, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
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
            <Paperclip size={18} />
          </IconButton>
          <IconButton size="small" aria-label="Emoji" color="default">
            <Smile size={18} />
          </IconButton>
        </>
      }
      submitLabel="Send"
      submitStartIcon={<Send size={18} aria-hidden />}
      onKeyDown={e => {
        if (e.key === 'Enter' && e.metaKey) handleSend();
      }}
    />
  );
}

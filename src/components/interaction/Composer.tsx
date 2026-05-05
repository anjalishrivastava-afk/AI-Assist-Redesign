import React, { useState, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

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
    <div className="border-t border-gray-200 bg-white p-3">
      <div className="flex flex-col gap-2 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-purple-300 focus-within:border-purple-300 transition-all">
        <textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Type a message..."
          rows={3}
          className="w-full px-4 pt-3 pb-1 text-sm text-gray-700 resize-none focus:outline-none bg-white placeholder:text-gray-400"
          onKeyDown={e => {
            if (e.key === 'Enter' && e.metaKey) handleSend();
          }}
        />
        <div className="flex items-center justify-between px-3 pb-2.5">
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              <Smile className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!value.trim()}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white rounded-lg transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            Send
          </button>
        </div>
      </div>
      <p className="text-[10px] text-gray-400 mt-1.5 text-right">⌘ + Enter to send</p>
    </div>
  );
}

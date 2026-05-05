// DEPRECATED: replaced by StickyAskAIInput + AskAIBlock in v2 redesign
// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, Loader2 } from 'lucide-react';
import { CollapsibleSection } from '../ui/CollapsibleSection';
import { aiChatHistory, mockAIResponses } from '../../mocks/aiChat';
import type { AIChatMessage } from '../../mocks/aiChat';

function getMockResponse(question: string): { text: string; source: string } {
  const lower = question.toLowerCase();
  for (const mock of mockAIResponses) {
    if (mock.keywords.some(k => lower.includes(k))) {
      return { text: mock.response, source: mock.source };
    }
  }
  return {
    text: 'I don\'t have specific data for that query. Please check the CRM or contact your team lead.',
    source: 'AI Assist (no source matched)',
  };
}

export function AskAI() {
  const [messages, setMessages] = useState<AIChatMessage[]>(aiChatHistory);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expanded) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  }, [messages, expanded]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    const question = input.trim();
    setInput('');
    setMessages(prev => [
      ...prev,
      { id: `q${Date.now()}`, role: 'user', text: question, timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) },
    ]);
    setLoading(true);
    setTimeout(() => {
      const resp = getMockResponse(question);
      setMessages(prev => [
        ...prev,
        {
          id: `a${Date.now()}`,
          role: 'assistant',
          text: resp.text,
          source: resp.source,
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setLoading(false);
    }, 800);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <CollapsibleSection
      title={<span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-purple-500" /><span>Ask AI</span></span>}
      defaultOpen={false}
      bodyClassName="flex flex-col"
    >
      {/* Chat history */}
      <div
        className="overflow-y-auto px-3 py-2 space-y-2 bg-gray-50"
        style={{ maxHeight: expanded ? '280px' : '180px' }}
        onFocus={() => setExpanded(true)}
      >
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center">
                    <Sparkles className="w-2.5 h-2.5 text-purple-600" />
                  </div>
                  <span className="text-[10px] text-purple-600 font-semibold">AI Assist</span>
                </div>
              )}
              <div
                className={`px-3 py-2 rounded-xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-sm'
                    : 'bg-white border border-purple-100 text-gray-700 rounded-tl-sm shadow-sm'
                }`}
              >
                {msg.text}
              </div>
              {msg.source && (
                <div className="flex items-center gap-1 mt-1 ml-1">
                  <span className="text-[10px] text-gray-400">Source:</span>
                  <span className="text-[10px] text-purple-500 font-medium">{msg.source}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-purple-100 rounded-xl text-xs text-gray-500 shadow-sm">
              <Loader2 className="w-3 h-3 text-purple-500 animate-spin" />
              Looking that up...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-t border-gray-100 bg-white">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => setExpanded(true)}
          placeholder="Ask AI a question about this customer..."
          className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-300 bg-gray-50"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="w-8 h-8 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-40 flex items-center justify-center transition-colors"
        >
          <Send className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
    </CollapsibleSection>
  );
}

import React, { useState, useMemo } from 'react';
import { TranscriptMessage } from './feed/TranscriptMessage';
import { SuggestionGroup } from './feed/SuggestionGroup';
import { AskAIBlock } from './feed/AskAIBlock';
import { StickyAskAIInput } from './feed/StickyAskAIInput';
import { NewMessagesPill } from './feed/NewMessagesPill';
import { aiChatHistory, mockAIResponses } from '../../mocks/aiChat';
import { chatTranscript } from '../../mocks/chatTranscript';
import { useAutoScroll } from '../../hooks/useAutoScroll';
import type { FeedItem } from './feed/feedTypes';
import type { TranscriptTurn } from '../../mocks/voiceTranscript';
import type { ChatTurn } from '../../mocks/chatTranscript';
import type { Mode } from '../../hooks/useMode';

interface AskAIEntry {
  id: string;
  question: string;
  answer?: string;
  source?: string;
  loading: boolean;
}

function getMockResponse(question: string): { text: string; source: string } {
  const lower = question.toLowerCase();
  for (const mock of mockAIResponses) {
    if (mock.keywords.some(k => lower.includes(k))) {
      return { text: mock.response, source: mock.source };
    }
  }
  return {
    text: "I don't have specific data for that query. Please check the CRM or contact your team lead.",
    source: 'AI Assist (no source matched)',
  };
}

function buildFeed(
  turns: (TranscriptTurn | ChatTurn)[],
  mode: Mode,
  dynamicQAs: AskAIEntry[],
  latestId: string | undefined,
): FeedItem[] {
  const items: FeedItem[] = [];
  const preseeded = [
    {
      id: 'preseeded-0',
      question: aiChatHistory[0].text,
      answer: aiChatHistory[1].text,
      source: aiChatHistory[1].source,
    },
    {
      id: 'preseeded-1',
      question: aiChatHistory[2].text,
      answer: aiChatHistory[3].text,
      source: aiChatHistory[3].source,
    },
  ];

  for (let i = 0; i < turns.length; i++) {
    const turn = turns[i];

    if (mode === 'voice') {
      items.push({ kind: 'voice-turn', id: turn.id, turn: turn as TranscriptTurn });
    } else {
      items.push({ kind: 'chat-turn', id: turn.id, turn: turn as ChatTurn });
    }

    // Inject pre-seeded Q&A exchanges at natural breakpoints
    if (i === 2 && turns.length > 2) {
      items.push({ kind: 'ask-ai', id: preseeded[0].id, question: preseeded[0].question, answer: preseeded[0].answer, source: preseeded[0].source, loading: false });
    }
    if (i === 4 && turns.length > 4) {
      items.push({ kind: 'ask-ai', id: preseeded[1].id, question: preseeded[1].question, answer: preseeded[1].answer, source: preseeded[1].source, loading: false });
    }

    // Add inline suggestion group for customer messages with suggestions
    const isCustomer = mode === 'voice'
      ? (turn as TranscriptTurn).speaker === 'Customer'
      : (turn as ChatTurn).sender === 'customer';
    const suggestionIds = (turn as TranscriptTurn & ChatTurn).suggestionIds;

    if (isCustomer && suggestionIds?.length) {
      items.push({ kind: 'suggestion-group', id: `sg-${turn.id}`, messageId: turn.id, suggestionIds });
    }
  }

  // Append dynamic Ask AI exchanges at the end
  for (const qa of dynamicQAs) {
    items.push({ kind: 'ask-ai', id: qa.id, question: qa.question, answer: qa.answer, source: qa.source, loading: qa.loading });
  }

  return items;
}

interface LiveWorkspaceProps {
  mode: Mode;
  voiceTurns: TranscriptTurn[];
  latestVoiceId?: string;
  onInsert?: (text: string) => void;
}

export function LiveWorkspace({ mode, voiceTurns, latestVoiceId, onInsert }: LiveWorkspaceProps) {
  const [dynamicQAs, setDynamicQAs] = useState<AskAIEntry[]>([]);

  const turns: (TranscriptTurn | ChatTurn)[] = mode === 'voice' ? voiceTurns : chatTranscript;

  const feed = useMemo(
    () => buildFeed(turns, mode, dynamicQAs, latestVoiceId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [turns.length, mode, dynamicQAs],
  );

  const { containerRef, bottomRef, hasScrolledUp, scrollToBottom, handleScroll } = useAutoScroll(feed.length);

  const handleAskAI = (question: string) => {
    const id = `dq-${Date.now()}`;
    setDynamicQAs(prev => [...prev, { id, question, loading: true }]);

    setTimeout(() => {
      const resp = getMockResponse(question);
      setDynamicQAs(prev =>
        prev.map(q => q.id === id ? { ...q, answer: resp.text, source: resp.source, loading: false } : q),
      );
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Scrollable feed */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto py-2"
      >
        {feed.map(item => {
          if (item.kind === 'voice-turn') {
            return (
              <TranscriptMessage
                key={item.id}
                mode="voice"
                turn={item.turn}
                isLatest={item.turn.id === latestVoiceId}
              />
            );
          }
          if (item.kind === 'chat-turn') {
            return <TranscriptMessage key={item.id} mode="chat" turn={item.turn} />;
          }
          if (item.kind === 'suggestion-group') {
            return (
              <SuggestionGroup
                key={item.id}
                suggestionIds={item.suggestionIds}
                mode={mode}
                onInsert={onInsert}
              />
            );
          }
          if (item.kind === 'ask-ai') {
            return (
              <AskAIBlock
                key={item.id}
                question={item.question}
                answer={item.answer}
                source={item.source}
                loading={item.loading}
              />
            );
          }
          return null;
        })}
        <div ref={bottomRef} className="h-2" />
      </div>

      {hasScrolledUp && <NewMessagesPill onClick={scrollToBottom} />}

      <StickyAskAIInput onSubmit={handleAskAI} />
    </div>
  );
}

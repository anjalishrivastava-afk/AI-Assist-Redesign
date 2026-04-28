import React, { useState, useMemo } from 'react';
import { Box, Stack } from '@exotel-npm-dev/signal-design-system';
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
    source: 'AI Assist',
  };
}

function buildFeed(
  turns: (TranscriptTurn | ChatTurn)[],
  mode: Mode,
  dynamicQAs: AskAIEntry[],
  _latestId: string | undefined,
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

    if (i === 2 && turns.length > 2) {
      items.push({ kind: 'ask-ai', id: preseeded[0].id, question: preseeded[0].question, answer: preseeded[0].answer, source: preseeded[0].source, loading: false });
    }
    if (i === 4 && turns.length > 4) {
      items.push({ kind: 'ask-ai', id: preseeded[1].id, question: preseeded[1].question, answer: preseeded[1].answer, source: preseeded[1].source, loading: false });
    }

    const isCustomer = mode === 'voice'
      ? (turn as TranscriptTurn).speaker === 'Customer'
      : (turn as ChatTurn).sender === 'customer';
    const suggestionIds = (turn as TranscriptTurn & ChatTurn).suggestionIds;

    if (isCustomer && suggestionIds?.length) {
      items.push({ kind: 'suggestion-group', id: `sg-${turn.id}`, messageId: turn.id, suggestionIds });
    }
  }

  for (const qa of dynamicQAs) {
    items.push({ kind: 'ask-ai', id: qa.id, question: qa.question, answer: qa.answer, source: qa.source, loading: qa.loading });
  }

  return items;
}

export type LiveFeedFilter = 'full' | 'transcript';

interface LiveWorkspaceProps {
  mode: Mode;
  voiceTurns: TranscriptTurn[];
  latestVoiceId?: string;
  onInsert?: (text: string) => void;
  /** `transcript` hides inline suggestions and Ask AI blocks */
  feedFilter?: LiveFeedFilter;
  hideAskAI?: boolean;
}

export function LiveWorkspace({
  mode,
  voiceTurns,
  latestVoiceId,
  onInsert,
  feedFilter = 'full',
  hideAskAI = false,
}: LiveWorkspaceProps) {
  const [dynamicQAs, setDynamicQAs] = useState<AskAIEntry[]>([]);

  const turns: (TranscriptTurn | ChatTurn)[] = mode === 'voice' ? voiceTurns : chatTranscript;

  const feed = useMemo(
    () => buildFeed(turns, mode, dynamicQAs, latestVoiceId),
    [turns.length, mode, dynamicQAs],
  );

  const visibleFeed = useMemo(() => {
    if (feedFilter === 'transcript') {
      return feed.filter(i => i.kind === 'voice-turn' || i.kind === 'chat-turn');
    }
    return feed;
  }, [feed, feedFilter]);

  const { containerRef, bottomRef, hasScrolledUp, scrollToBottom, handleScroll } = useAutoScroll(visibleFeed.length);

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
    <Stack sx={{ flex: 1, minHeight: 0, bgcolor: 'grey.100' }}>
      <Box
        ref={containerRef}
        onScroll={handleScroll}
        sx={{ flex: 1, overflowY: 'auto', px: 2, py: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
      >
        {visibleFeed.map(item => {
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
        <Box ref={bottomRef} sx={{ height: 8, flexShrink: 0 }} />
      </Box>

      {hasScrolledUp && <NewMessagesPill onClick={scrollToBottom} />}

      {!hideAskAI && <StickyAskAIInput onSubmit={handleAskAI} />}
    </Stack>
  );
}

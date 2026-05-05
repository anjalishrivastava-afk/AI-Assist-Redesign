import React from 'react';
import { Lock } from 'lucide-react';
import { SummaryBlock } from './SummaryBlock';
import type { TranscriptTurn } from '../../../mocks/voiceTranscript';
import type { ChatTurn } from '../../../mocks/chatTranscript';

function PiiText({ text }: { text: string }) {
  const parts = text.split(/(\*{4} \[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\*{4} \[([^\]]+)\]$/);
        if (match) {
          return (
            <span key={i} className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-1.5 py-0.5 rounded font-mono mx-0.5 align-baseline">
              <Lock className="w-2.5 h-2.5 text-amber-500 shrink-0" />
              ****
              <span className="text-amber-600 font-sans not-italic">[{match[1]}]</span>
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

interface VoiceMessageProps {
  turn: TranscriptTurn;
  isLatest: boolean;
}

function VoiceMessage({ turn, isLatest }: VoiceMessageProps) {
  if (turn.isAISummary) {
    return (
      <SummaryBlock
        text={turn.text}
        summarizedCount={turn.summarizedCount ?? 0}
        timestamp={turn.timestamp}
      />
    );
  }

  if (turn.speaker === 'System') {
    return (
      <div className="px-4 py-1 my-0.5">
        <p className="text-[10px] text-gray-400 text-center italic">{turn.text}</p>
      </div>
    );
  }

  const isAgent = turn.speaker === 'Agent';

  return (
    <div
      className={`flex gap-2.5 px-4 py-1.5 animate-fadeIn transition-all ${
        isLatest && !isAgent
          ? 'bg-purple-50/40 ring-1 ring-inset ring-purple-100 rounded-lg mx-2'
          : ''
      }`}
    >
      <span className="text-[10px] text-gray-400 font-mono mt-0.5 w-10 shrink-0 pt-[2px]">{turn.timestamp}</span>
      <div className="flex-1 min-w-0">
        <span className={`text-[10px] font-semibold uppercase tracking-wide mr-2 ${isAgent ? 'text-blue-600' : 'text-gray-500'}`}>
          {turn.speaker}
        </span>
        <span className="text-xs text-gray-700 leading-relaxed">
          <PiiText text={turn.text} />
        </span>
      </div>
    </div>
  );
}

interface ChatMessageProps {
  turn: ChatTurn;
}

function ChatMessage({ turn }: ChatMessageProps) {
  const isAgent = turn.sender === 'agent';
  return (
    <div className={`flex ${isAgent ? 'justify-end' : 'justify-start'} px-4 py-1 animate-fadeIn`}>
      <div className={`max-w-[82%] flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}>
        {!isAgent && (
          <span className="text-[10px] text-gray-400 mb-0.5 ml-1">Customer · {turn.timestamp}</span>
        )}
        <div
          className={`px-3 py-2 rounded-2xl text-xs leading-relaxed ${
            isAgent
              ? 'bg-white border border-gray-200 text-gray-700 rounded-tr-sm'
              : 'bg-gray-100 text-gray-800 rounded-tl-sm'
          }`}
        >
          {turn.piiMasked ? <PiiText text={turn.text} /> : turn.text}
        </div>
        {isAgent && (
          <span className="text-[10px] text-gray-400 mt-0.5 mr-1">You · {turn.timestamp}</span>
        )}
      </div>
    </div>
  );
}

type TranscriptMessageProps =
  | { mode: 'voice'; turn: TranscriptTurn; isLatest?: boolean }
  | { mode: 'chat'; turn: ChatTurn; isLatest?: boolean };

export function TranscriptMessage(props: TranscriptMessageProps) {
  if (props.mode === 'voice') {
    return <VoiceMessage turn={props.turn} isLatest={props.isLatest ?? false} />;
  }
  return <ChatMessage turn={props.turn} />;
}

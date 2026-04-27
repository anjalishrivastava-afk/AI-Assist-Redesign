// DEPRECATED: replaced by LiveWorkspace in v2 redesign
// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { Lock, Sparkles, RotateCcw, Search } from 'lucide-react';
import { CollapsibleSection } from '../ui/CollapsibleSection';
import type { TranscriptTurn } from '../../mocks/voiceTranscript';
import type { ChatTurn } from '../../mocks/chatTranscript';
import type { Mode } from '../../hooks/useMode';

interface LiveTranscriptProps {
  mode: Mode;
  voiceTurns: TranscriptTurn[];
  chatTurns: ChatTurn[];
  latestVoiceId?: string;
  isDone: boolean;
  onReplay: () => void;
}

function PiiText({ text }: { text: string }) {
  const parts = text.split(/(\*{4} \[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\*{4} \[([^\]]+)\]$/);
        if (match) {
          return (
            <span key={i} className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-1.5 py-0.5 rounded font-mono mx-0.5">
              <Lock className="w-2.5 h-2.5 text-amber-500" />
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

function VoiceTurnRow({ turn, isLatest }: { turn: TranscriptTurn; isLatest: boolean }) {
  if (turn.isAISummary) {
    return (
      <div className="flex gap-3 py-2 px-3 bg-purple-50 border-l-2 border-purple-400 rounded-r-lg animate-fadeIn mx-1 my-1">
        <span className="text-[10px] text-gray-400 font-mono mt-0.5 w-10 shrink-0">{turn.timestamp}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3 h-3 text-purple-500" />
            <span className="text-[10px] font-semibold text-purple-600 uppercase tracking-wide">
              AI summary of {turn.summarizedCount} messages
            </span>
          </div>
          <p className="text-xs text-purple-800 leading-relaxed">{turn.text}</p>
        </div>
      </div>
    );
  }

  if (turn.speaker === 'System') {
    return (
      <div className="px-3 py-1 my-0.5">
        <p className="text-[10px] text-gray-400 text-center italic">{turn.text}</p>
      </div>
    );
  }

  const isAgent = turn.speaker === 'Agent';
  return (
    <div
      className={`flex gap-2.5 py-1.5 px-3 animate-fadeIn ${isLatest ? 'ring-1 ring-purple-200 rounded-lg bg-purple-50/30' : ''}`}
      style={isLatest ? { animation: 'pulse-border 2s ease-out' } : {}}
    >
      <span className="text-[10px] text-gray-400 font-mono mt-0.5 w-10 shrink-0">{turn.timestamp}</span>
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

function ChatTurnRow({ turn }: { turn: ChatTurn }) {
  const isAgent = turn.sender === 'agent';
  return (
    <div className={`flex ${isAgent ? 'justify-end' : 'justify-start'} px-3 py-1 animate-fadeIn`}>
      <div className={`max-w-[80%] ${isAgent ? 'items-end' : 'items-start'} flex flex-col`}>
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
          {turn.piiMasked ? <PiiText text={turn.text} /> : <span>{turn.text}</span>}
        </div>
        {isAgent && (
          <span className="text-[10px] text-gray-400 mt-0.5 mr-1">Agent · {turn.timestamp}</span>
        )}
      </div>
    </div>
  );
}

export function LiveTranscript({ mode, voiceTurns, chatTurns, latestVoiceId, isDone, onReplay }: LiveTranscriptProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [speakerFilter, setSpeakerFilter] = useState<'All' | 'Customer' | 'Agent'>('All');

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [voiceTurns.length, chatTurns.length]);

  const filteredVoice = voiceTurns.filter(t => {
    if (speakerFilter !== 'All' && t.speaker !== speakerFilter && !t.isAISummary && t.speaker !== 'System') return false;
    if (search && !t.text.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const filteredChat = chatTurns.filter(t => {
    if (speakerFilter === 'Customer' && t.sender !== 'customer') return false;
    if (speakerFilter === 'Agent' && t.sender !== 'agent') return false;
    if (search && !t.text.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const headerRight = (
    <div className="flex items-center gap-2">
      {mode === 'voice' && isDone && (
        <button
          onClick={onReplay}
          className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-medium"
        >
          <RotateCcw className="w-3 h-3" />
          Replay
        </button>
      )}
      {mode === 'voice' && !isDone && (
        <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Live
        </span>
      )}
    </div>
  );

  return (
    <CollapsibleSection
      title={<span className="flex items-center gap-1.5">📝 <span>Transcript</span></span>}
      headerRight={headerRight}
      bodyClassName="flex flex-col"
    >
      {/* Filter bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 bg-gray-50">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search transcript..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-6 pr-2 py-1 text-xs border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-purple-300"
          />
        </div>
        <div className="flex rounded-md border border-gray-200 bg-white overflow-hidden">
          {(['All', 'Customer', 'Agent'] as const).map(s => (
            <button
              key={s}
              onClick={() => setSpeakerFilter(s)}
              className={`text-[10px] px-2 py-1 font-medium transition-colors ${
                speakerFilter === s ? 'bg-purple-600 text-white' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Transcript body */}
      <div className="overflow-y-auto max-h-56 py-1">
        {mode === 'voice'
          ? filteredVoice.map(t => (
            <VoiceTurnRow key={t.id} turn={t} isLatest={t.id === latestVoiceId && !t.isAISummary} />
          ))
          : filteredChat.map(t => (
            <ChatTurnRow key={t.id} turn={t} />
          ))
        }
        <div ref={bottomRef} />
      </div>
    </CollapsibleSection>
  );
}

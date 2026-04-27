import React, { useState } from 'react';
import { MessageSquare, ChevronDown, ChevronUp, Sparkles, Lock } from 'lucide-react';
import type { TranscriptTurn } from '../../../mocks/voiceTranscript';
import type { ChatTurn } from '../../../mocks/chatTranscript';
import type { SentimentReading } from '../../../mocks/sentiment';
import type { Mode } from '../../../hooks/useMode';

function PiiTextInline({ text }: { text: string }) {
  const parts = text.split(/(\*{4} \[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\*{4} \[([^\]]+)\]$/);
        if (match) {
          return (
            <span key={i} className="inline-flex items-center gap-0.5 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] px-1 py-0.5 rounded font-mono mx-0.5 align-baseline">
              <Lock className="w-2 h-2 shrink-0" />
              [redacted]
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

const sentimentEmoji: Record<string, string> = {
  Happy: '😊', Satisfied: '🙂', Neutral: '😐', Frustrated: '😟', Angry: '😠',
};

interface ConversationSummaryProps {
  mode: Mode;
  voiceTurns: TranscriptTurn[];
  chatTurns: ChatTurn[];
  sentiment: SentimentReading[];
  summary: string;
  callDuration: string;
}

export function ConversationSummary({ mode, voiceTurns, chatTurns, sentiment, summary, callDuration }: ConversationSummaryProps) {
  const [expanded, setExpanded] = useState(false);

  const turns = mode === 'voice' ? voiceTurns : chatTurns;
  const finalSentiment = sentiment[sentiment.length - 1];
  const msgCount = turns.filter(t =>
    mode === 'voice'
      ? (t as TranscriptTurn).speaker !== 'System'
      : true
  ).length;

  return (
    <div className="mx-3 mt-3 mb-2 border border-purple-200 rounded-xl bg-purple-50/60 overflow-hidden">
      {/* Summary header */}
      <div className="px-3 pt-3 pb-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
            <Sparkles className="w-3 h-3 text-purple-500" />
          </div>
          <span className="text-xs font-semibold text-purple-700">Conversation Summary</span>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-600">{msgCount} messages</span>
          </div>
          <span className="text-gray-300">·</span>
          <span className="text-xs text-gray-600">{callDuration}</span>
          <span className="text-gray-300">·</span>
          <div className="flex items-center gap-1">
            <span className="text-sm">{sentimentEmoji[finalSentiment?.label ?? 'Neutral']}</span>
            <span className={`text-xs font-medium ${
              finalSentiment?.label === 'Angry' ? 'text-red-600'
              : finalSentiment?.label === 'Frustrated' ? 'text-amber-600'
              : 'text-gray-600'
            }`}>
              {finalSentiment?.label ?? 'Neutral'}
            </span>
          </div>
        </div>

        {/* AI summary text */}
        <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
      </div>

      {/* Expand button */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-center gap-1.5 py-2 border-t border-purple-200 text-xs text-purple-600 hover:bg-purple-100 transition-colors font-medium"
      >
        {expanded ? (
          <><ChevronUp className="w-3.5 h-3.5" />Collapse transcript</>
        ) : (
          <><ChevronDown className="w-3.5 h-3.5" />Expand full transcript</>
        )}
      </button>

      {/* Expanded transcript */}
      {expanded && (
        <div className="border-t border-purple-200 max-h-64 overflow-y-auto bg-white">
          {mode === 'voice'
            ? voiceTurns.map(t => {
              if (t.speaker === 'System') {
                return (
                  <div key={t.id} className="px-3 py-1">
                    <p className="text-[10px] text-gray-400 italic text-center">{t.text}</p>
                  </div>
                );
              }
              if (t.isAISummary) {
                return (
                  <div key={t.id} className="mx-2 my-1 px-3 py-2 bg-purple-50 rounded-lg border-l-2 border-purple-400">
                    <div className="flex items-center gap-1 mb-0.5">
                      <Sparkles className="w-2.5 h-2.5 text-purple-500" />
                      <span className="text-[9px] font-semibold text-purple-600 uppercase tracking-wide">AI summary of {t.summarizedCount} messages</span>
                    </div>
                    <p className="text-[10px] text-purple-800">{t.text}</p>
                  </div>
                );
              }
              return (
                <div key={t.id} className="flex gap-2 px-3 py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-[10px] font-mono text-gray-400 w-10 shrink-0 pt-px">{t.timestamp}</span>
                  <span className={`text-[10px] font-semibold w-14 shrink-0 pt-px ${t.speaker === 'Agent' ? 'text-blue-600' : 'text-gray-500'}`}>{t.speaker}</span>
                  <span className="text-[10px] text-gray-600 leading-relaxed">
                    <PiiTextInline text={t.text} />
                  </span>
                </div>
              );
            })
            : chatTurns.map(t => (
              <div key={t.id} className={`flex gap-2 px-3 py-1.5 border-b border-gray-50 last:border-0 ${t.sender === 'agent' ? 'bg-gray-50/50' : ''}`}>
                <span className={`text-[10px] font-semibold w-14 shrink-0 pt-px ${t.sender === 'agent' ? 'text-blue-600' : 'text-gray-500'}`}>
                  {t.sender === 'agent' ? 'Agent' : 'Customer'}
                </span>
                <span className="text-[10px] text-gray-600 leading-relaxed">
                  <PiiTextInline text={t.text} />
                </span>
              </div>
            ))
          }
          <button
            onClick={() => setExpanded(false)}
            className="w-full flex items-center justify-center gap-1 py-2 text-[10px] text-purple-600 hover:bg-purple-50 transition-colors border-t border-purple-100"
          >
            <ChevronUp className="w-3 h-3" />Collapse
          </button>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Sparkles, Info, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import type { Mode } from '../../hooks/useMode';
import type { SentimentReading } from '../../mocks/sentiment';
import type { InteractionState } from '../../hooks/useInteractionState';

interface AssistHeaderProps {
  mode: Mode;
  callDuration: string;
  sentiment: SentimentReading[];
  interactionState: InteractionState;
}

const sentimentEmoji: Record<string, string> = {
  Happy: '😊',
  Satisfied: '🙂',
  Neutral: '😐',
  Frustrated: '😟',
  Angry: '😠',
};

const sentimentDotColor: Record<string, string> = {
  Happy: 'bg-green-400',
  Satisfied: 'bg-green-300',
  Neutral: 'bg-gray-400',
  Frustrated: 'bg-amber-400',
  Angry: 'bg-red-500',
};

function Sparkline({ data }: { data: SentimentReading[] }) {
  const w = 60;
  const h = 20;
  const min = -1, max = 1;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((d.score - min) / (max - min)) * h;
    return `${x},${y}`;
  });

  const lastScore = data[data.length - 1]?.score ?? 0;
  const lineColor = lastScore < -0.3 ? '#F59E0B' : '#6B7280';

  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={lineColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {data.map((d, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - ((d.score - min) / (max - min)) * h;
        return i === data.length - 1 ? (
          <circle key={i} cx={x} cy={y} r="2.5" fill={lineColor} />
        ) : null;
      })}
    </svg>
  );
}

export function AssistHeader({ mode, callDuration, sentiment, interactionState }: AssistHeaderProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const first = sentiment[0];
  const last = sentiment[sentiment.length - 1];
  const trendChanged = first?.label !== last?.label;

  return (
    <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      {/* Top row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <span className="font-semibold text-gray-900 text-sm">AI Assist</span>
        </div>
        <div className="flex items-center gap-1.5">
          {interactionState === 'ended' ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
              <CheckCircle className="w-3 h-3 text-green-500" />
              {mode === 'voice' ? 'Call ended' : 'Chat resolved'} · {callDuration}
            </span>
          ) : mode === 'voice' ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <Phone className="w-3 h-3" />
              Live Call · {callDuration}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <MessageSquare className="w-3 h-3" />
              Chat
            </span>
          )}
        </div>
      </div>

      {/* Sentiment row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Sentiment</span>
          <div className="flex items-center gap-1 text-sm">
            <span>{sentimentEmoji[first?.label ?? 'Neutral']}</span>
            <span className="text-gray-300 text-xs">→</span>
            {trendChanged && (
              <span className={`text-xs font-medium ${last?.label === 'Angry' ? 'text-red-600' : last?.label === 'Frustrated' ? 'text-amber-600' : 'text-gray-600'}`}>
                {sentimentEmoji[last?.label ?? 'Neutral']} {last?.label}
              </span>
            )}
            {!trendChanged && (
              <span className="text-xs font-medium text-gray-600">{last?.label}</span>
            )}
          </div>
          <div className="relative ml-1">
            <button
              className="text-gray-400 hover:text-gray-600"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Info className="w-3 h-3" />
            </button>
            {showTooltip && (
              <div className="absolute left-5 top-0 z-50 w-52 text-xs bg-gray-900 text-white rounded-lg px-3 py-2 shadow-lg pointer-events-none">
                Sentiment is computed from the customer's last 3 messages
              </div>
            )}
          </div>
        </div>
        <Sparkline data={sentiment} />
      </div>

      {/* Sentiment bar */}
      <div className="mt-1.5 flex gap-0.5 h-1">
        {sentiment.map((s, i) => (
          <div
            key={i}
            className={`flex-1 rounded-full ${sentimentDotColor[s.label]}`}
            style={{ opacity: 0.4 + (i / sentiment.length) * 0.6 }}
          />
        ))}
      </div>
    </div>
  );
}

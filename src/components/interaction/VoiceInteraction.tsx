import React, { useState } from 'react';
import { Mic, MicOff, Pause, Play, PhoneForwarded, Users, PhoneOff, Phone } from 'lucide-react';
import { inboxItems } from '../../mocks/inbox';

interface VoiceInteractionProps {
  callDuration: string;
  onEndCall: () => void;
}

export function VoiceInteraction({ callDuration, onEndCall }: VoiceInteractionProps) {
  const [muted, setMuted] = useState(false);
  const [onHold, setOnHold] = useState(false);

  const caller = inboxItems.find(i => i.type === 'voice' && i.isActive)!;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50 gap-8">
      {/* Caller card */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-semibold shadow-lg"
            style={{ backgroundColor: caller.avatarColor }}
          >
            {caller.avatarInitials}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-white flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">{caller.customerName}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{caller.phone}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{caller.queue}</span>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs font-mono text-gray-600 font-medium">{callDuration}</span>
          </div>
        </div>

        {onHold && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-sm text-amber-700 font-medium flex items-center gap-2">
            <Pause className="w-4 h-4" />
            Customer is on hold
          </div>
        )}
      </div>

      {/* Call controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMuted(m => !m)}
          className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl border transition-all ${
            muted ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          <span className="text-[10px] font-medium">{muted ? 'Unmute' : 'Mute'}</span>
        </button>

        <button
          onClick={() => setOnHold(h => !h)}
          className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl border transition-all ${
            onHold ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          {onHold ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          <span className="text-[10px] font-medium">{onHold ? 'Resume' : 'Hold'}</span>
        </button>

        <button className="flex flex-col items-center gap-1.5 p-4 rounded-2xl border bg-white border-gray-200 text-gray-600 hover:bg-gray-50 transition-all">
          <PhoneForwarded className="w-5 h-5" />
          <span className="text-[10px] font-medium">Transfer</span>
        </button>

        <button className="flex flex-col items-center gap-1.5 p-4 rounded-2xl border bg-white border-gray-200 text-gray-600 hover:bg-gray-50 transition-all">
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-medium">Conference</span>
        </button>
      </div>

      {/* End call */}
      <button
        onClick={onEndCall}
        className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-semibold shadow-md transition-colors"
      >
        <PhoneOff className="w-5 h-5" />
        End Call
      </button>

      <div className="flex items-center gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <Phone className="w-3 h-3" />
          <span>Recording active</span>
        </div>
        <span>·</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span>Good connection</span>
        </div>
      </div>
    </div>
  );
}

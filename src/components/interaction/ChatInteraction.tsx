import React from 'react';
import { MessageSquare, Mail, Globe, CheckCircle } from 'lucide-react';
import { chatTranscript } from '../../mocks/chatTranscript';
import { inboxItems } from '../../mocks/inbox';
import { Composer } from './Composer';
import type { ChatChannel } from '../../mocks/chatTranscript';

const channelIcon = {
  WhatsApp: MessageSquare,
  Email: Mail,
  Web: Globe,
};

const channelColor = {
  WhatsApp: 'bg-green-50 text-green-700 border-green-200',
  Email: 'bg-blue-50 text-blue-700 border-blue-200',
  Web: 'bg-gray-50 text-gray-600 border-gray-200',
};

interface ChatInteractionProps {
  insertText?: string;
  onClearInsert?: () => void;
  onResolve: () => void;
}

export function ChatInteraction({ insertText, onClearInsert, onResolve }: ChatInteractionProps) {
  const customer = inboxItems.find(i => i.type === 'chat' && i.channel === 'WhatsApp')!;
  const channel: ChatChannel = 'WhatsApp';
  const ChannelIcon = channelIcon[channel];

  return (
    <div className="flex-1 flex flex-col bg-white min-h-0">
      {/* Chat header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold"
            style={{ backgroundColor: customer.avatarColor }}
          >
            {customer.avatarInitials}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{customer.customerName}</p>
            <p className="text-xs text-gray-500">{customer.lastMessage?.slice(0, 40)}...</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-medium ${channelColor[channel]}`}>
            <ChannelIcon className="w-3 h-3" />
            {channel}
          </span>
          <button
            onClick={onResolve}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Resolve
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-gray-50">
        {chatTranscript.map(msg => {
          const isAgent = msg.sender === 'agent';
          return (
            <div key={msg.id} className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[72%] flex flex-col">
                {!isAgent && (
                  <span className="text-[10px] text-gray-400 mb-1 ml-1">{customer.customerName} · {msg.timestamp}</span>
                )}
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isAgent
                      ? 'bg-white border border-gray-200 text-gray-700 rounded-tr-sm shadow-sm'
                      : 'bg-white text-gray-800 rounded-tl-sm shadow-sm border border-gray-100'
                  }`}
                >
                  {msg.text}
                </div>
                {isAgent && (
                  <span className="text-[10px] text-gray-400 mt-1 mr-1 text-right">You · {msg.timestamp}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Composer insertText={insertText} onClearInsert={onClearInsert} />
    </div>
  );
}

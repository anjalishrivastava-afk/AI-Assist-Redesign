import React from 'react';
import { Phone, MessageSquare, Mail, Globe, Clock } from 'lucide-react';
import { inboxItems } from '../../mocks/inbox';
import type { InboxItem } from '../../mocks/inbox';

const channelIcon = {
  WhatsApp: MessageSquare,
  Email: Mail,
  Web: Globe,
};

function InboxRow({ item, active }: { item: InboxItem; active: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-3 cursor-pointer transition-colors rounded-lg mx-2 mb-0.5 ${
        active
          ? 'bg-purple-50 border border-purple-200'
          : 'hover:bg-gray-50 border border-transparent'
      }`}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold"
          style={{ backgroundColor: item.avatarColor }}
        >
          {item.avatarInitials}
        </div>
        {item.type === 'voice' && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-red-100 border border-white flex items-center justify-center">
            <Phone className="w-2 h-2 text-red-600" />
          </div>
        )}
        {item.type === 'chat' && item.channel && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white border border-gray-200 flex items-center justify-center">
            {React.createElement(channelIcon[item.channel], { className: 'w-2 h-2 text-gray-500' })}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-semibold truncate ${active ? 'text-purple-800' : 'text-gray-800'}`}>
            {item.customerName}
          </span>
          {item.type === 'voice' && (
            <span className="text-[10px] font-mono text-red-500 font-semibold">{item.callDuration}</span>
          )}
          {item.type === 'chat' && item.timestamp && (
            <span className="text-[10px] text-gray-400">{item.timestamp}</span>
          )}
        </div>

        <div className="flex items-center justify-between mt-0.5">
          {item.type === 'voice' ? (
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] text-gray-500 truncate">{item.queue}</span>
            </div>
          ) : (
            <p className="text-[10px] text-gray-500 truncate max-w-[140px]">{item.lastMessage}</p>
          )}
          {item.unreadCount && item.unreadCount > 0 ? (
            <span className="ml-1 min-w-[16px] h-4 px-1 rounded-full bg-purple-600 text-white text-[9px] font-bold flex items-center justify-center">
              {item.unreadCount}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function InboxSidebar() {
  const voice = inboxItems.filter(i => i.type === 'voice');
  const chat = inboxItems.filter(i => i.type === 'chat');

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-800">Interactions</h2>
        <p className="text-[10px] text-gray-400 mt-0.5">{inboxItems.length} active</p>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {/* Voice section */}
        <div className="px-3 py-1.5">
          <div className="flex items-center gap-1.5 px-1 mb-1.5">
            <Phone className="w-3 h-3 text-red-500" />
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Live Calls</span>
            <span className="ml-auto text-[10px] text-red-500 font-semibold">{voice.length}</span>
          </div>
        </div>
        {voice.map(item => (
          <InboxRow key={item.id} item={item} active={!!item.isActive} />
        ))}

        {/* Chat section */}
        <div className="px-3 py-1.5 mt-2">
          <div className="flex items-center gap-1.5 px-1 mb-1.5">
            <MessageSquare className="w-3 h-3 text-blue-500" />
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Chats</span>
            <span className="ml-auto text-[10px] text-blue-500 font-semibold">{chat.length}</span>
          </div>
        </div>
        {chat.map(item => (
          <InboxRow key={item.id} item={item} active={false} />
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center gap-2 text-[10px] text-gray-400">
          <Clock className="w-3 h-3" />
          <span>Updated just now</span>
        </div>
      </div>
    </div>
  );
}

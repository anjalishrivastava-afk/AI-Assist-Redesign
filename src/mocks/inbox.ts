export type InboxItemType = 'voice' | 'chat';
export type ChatChannel = 'WhatsApp' | 'Email' | 'Web';

export interface InboxItem {
  id: string;
  type: InboxItemType;
  customerName: string;
  avatarInitials: string;
  avatarColor: string;
  // Voice fields
  phone?: string;
  queue?: string;
  callDuration?: string;
  // Chat fields
  channel?: ChatChannel;
  lastMessage?: string;
  unreadCount?: number;
  timestamp?: string;
  isActive?: boolean;
}

export const inboxItems: InboxItem[] = [
  {
    id: 'i1',
    type: 'voice',
    customerName: 'Rajesh Kumar',
    avatarInitials: 'RK',
    avatarColor: '#6366F1',
    phone: '+91 98765 43210',
    queue: 'Cards & Payments',
    callDuration: '06:23',
    isActive: true,
  },
  {
    id: 'i2',
    type: 'voice',
    customerName: 'Meera Iyer',
    avatarInitials: 'MI',
    avatarColor: '#0EA5E9',
    phone: '+91 91234 56789',
    queue: 'General Banking',
    callDuration: '02:11',
  },
  {
    id: 'i3',
    type: 'chat',
    customerName: 'Ananya Sharma',
    avatarInitials: 'AS',
    avatarColor: '#10B981',
    channel: 'WhatsApp',
    lastMessage: 'So another 2-4 days more? That\'s really inconvenient...',
    unreadCount: 2,
    timestamp: '2:21 PM',
  },
  {
    id: 'i4',
    type: 'chat',
    customerName: 'Suresh Menon',
    avatarInitials: 'SM',
    avatarColor: '#F59E0B',
    channel: 'Email',
    lastMessage: 'Regarding my loan statement for March 2025...',
    unreadCount: 0,
    timestamp: '1:45 PM',
  },
  {
    id: 'i5',
    type: 'chat',
    customerName: 'Pooja Nair',
    avatarInitials: 'PN',
    avatarColor: '#EC4899',
    channel: 'Web',
    lastMessage: 'I cannot login to my net banking account.',
    unreadCount: 1,
    timestamp: '1:10 PM',
  },
];

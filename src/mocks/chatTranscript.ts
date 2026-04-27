export type ChatChannel = 'WhatsApp' | 'Email' | 'Web';

export interface ChatTurn {
  id: string;
  sender: 'customer' | 'agent';
  text: string;
  timestamp: string;
  channel: ChatChannel;
  piiMasked?: boolean;
  suggestionIds?: string[];
}

export const chatTranscript: ChatTurn[] = [
  {
    id: 'c1',
    sender: 'customer',
    text: 'Hi, I raised a refund request for order #ORD-29341 three days ago but haven\'t received any update. Can you help?',
    timestamp: '2:14 PM',
    channel: 'WhatsApp',
    suggestionIds: ['cs1', 'cs2'],
  },
  {
    id: 'c2',
    sender: 'agent',
    text: 'Hello! Thank you for reaching out. I\'m happy to help you with your refund request. Let me pull up the details for order #ORD-29341.',
    timestamp: '2:15 PM',
    channel: 'WhatsApp',
  },
  {
    id: 'c3',
    sender: 'customer',
    text: 'Sure, my registered email is ****@****.com [email] and phone is **** [phone number]. Please check quickly.',
    timestamp: '2:15 PM',
    channel: 'WhatsApp',
    piiMasked: true,
  },
  {
    id: 'c4',
    sender: 'agent',
    text: 'Thank you, I\'ve verified your account. I can see the refund request was submitted on April 24th for ₹1,499. It\'s currently in "Processing" status.',
    timestamp: '2:16 PM',
    channel: 'WhatsApp',
  },
  {
    id: 'c5',
    sender: 'customer',
    text: 'Three days is a lot. When will I actually get the money? I\'ve had issues with refunds before — last time it took 2 weeks.',
    timestamp: '2:17 PM',
    channel: 'WhatsApp',
    suggestionIds: ['cs2', 'cs3'],
  },
  {
    id: 'c6',
    sender: 'agent',
    text: 'I completely understand your frustration, and I apologize for the previous delay you experienced. Refunds typically take 5–7 business days from the request date.',
    timestamp: '2:18 PM',
    channel: 'WhatsApp',
  },
  {
    id: 'c7',
    sender: 'customer',
    text: 'So another 2-4 days more? That\'s really inconvenient. Is there any way to expedite this? I need that money.',
    timestamp: '2:19 PM',
    channel: 'WhatsApp',
    suggestionIds: ['cs1'],
  },
  {
    id: 'c8',
    sender: 'agent',
    text: 'I\'ve flagged your request for priority processing. Given you\'ve had a previous delay, I\'m also applying a ₹100 goodwill credit to your account.',
    timestamp: '2:20 PM',
    channel: 'WhatsApp',
  },
  {
    id: 'c9',
    sender: 'customer',
    text: 'Okay, fine. But if I don\'t get it by Wednesday I\'m filing a complaint with the consumer forum. Please note that.',
    timestamp: '2:21 PM',
    channel: 'WhatsApp',
    suggestionIds: ['cs2'],
  },
  {
    id: 'c10',
    sender: 'agent',
    text: 'I\'ve noted your escalation intent. Your refund reference is REF-88912. I\'ll also trigger an SMS update when the refund is processed — you should see it no later than Wednesday EOD.',
    timestamp: '2:22 PM',
    channel: 'WhatsApp',
  },
];

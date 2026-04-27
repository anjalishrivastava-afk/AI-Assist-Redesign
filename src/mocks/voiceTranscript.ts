export type Speaker = 'Customer' | 'Agent' | 'System';

export interface TranscriptTurn {
  id: string;
  speaker: Speaker;
  text: string;
  timestamp: string;
  piiMasked?: boolean;
  isAISummary?: boolean;
  summarizedCount?: number;
  suggestionIds?: string[];
}

export const voiceTranscript: TranscriptTurn[] = [
  {
    id: 'v1',
    speaker: 'System',
    text: 'Call connected. Customer calling from +91-98765-XXXXX.',
    timestamp: '10:42',
  },
  {
    id: 'v2',
    speaker: 'Agent',
    text: 'Hello, thank you for calling ExoBank customer care. This is Priya speaking, how may I help you today?',
    timestamp: '10:42',
  },
  {
    id: 'v3',
    speaker: 'Customer',
    text: 'Haan, mujhe ek problem hai. Mera card kuch din pehle block ho gaya aur maine request bhi di thi naya card ke liye — woh abhi tak nahi aaya.',
    timestamp: '10:43',
    suggestionIds: ['vs1', 'vs2'],
  },
  {
    id: 'v4',
    speaker: 'Agent',
    text: 'I understand your concern. Can you please share your registered card details so I can look up the request?',
    timestamp: '10:43',
  },
  {
    id: 'v5',
    speaker: 'Customer',
    text: 'Haan, mera card number **** [card number] hai, last four digits 4821.',
    timestamp: '10:44',
    piiMasked: true,
  },
  {
    id: 'v6-summary',
    speaker: 'System',
    text: 'Agent verified customer identity via OTP and confirmed account details. Customer reported card replacement request submitted 8 days ago (Ref: REQ-7823). Agent found dispatch was delayed due to courier partner outage on April 19th.',
    timestamp: '10:46',
    isAISummary: true,
    summarizedCount: 4,
  },
  {
    id: 'v7',
    speaker: 'Customer',
    text: 'Aur OTP **** [OTP] aaya tha mujhe tab — wahi diya tha meine. Ab kab tak milega mujhe card?',
    timestamp: '10:47',
    piiMasked: true,
    suggestionIds: ['vs1', 'vs3'],
  },
  {
    id: 'v8',
    speaker: 'Agent',
    text: 'I sincerely apologize for the delay. As per our records, your card has been re-dispatched today via Blue Dart. You should receive it within 2 to 3 business days. I am also raising a complaint for the earlier delay and you will receive ₹200 cashback as goodwill.',
    timestamp: '10:48',
  },
];

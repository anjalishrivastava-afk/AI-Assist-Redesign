export type Confidence = 'High' | 'Med' | 'Low';
export type SourceType = 'kb' | 'ticket' | 'crm' | 'policy';

export interface SuggestionSource {
  type: SourceType;
  label: string;
  ref: string;
}

export interface Suggestion {
  id: string;
  text: string;
  confidence: Confidence;
  source: SuggestionSource;
  reasoning: string;
  mode?: 'voice' | 'chat'; // retained for deprecated SuggestedReplies compat
}

// Primary v2 export: flat indexed object
export const suggestionsById: Record<string, Suggestion> = {
  vs1: {
    id: 'vs1',
    text: 'Your replacement card has been re-dispatched today via Blue Dart. You will receive it within 2–3 business days. Tracking details will be sent to your registered mobile.',
    confidence: 'High',
    source: { type: 'kb', label: 'Card Dispatch SOP v4.1', ref: 'KB-1042' },
    reasoning: 'Customer asked about card delivery ETA; matches re-dispatch resolution flow',
    mode: 'voice',
  },
  vs2: {
    id: 'vs2',
    text: 'As a goodwill gesture for the inconvenience, ₹200 cashback will be credited to your account within 24 hours. You will receive an SMS confirmation shortly.',
    confidence: 'Med',
    source: { type: 'policy', label: 'Goodwill Policy v2.3', ref: 'POL-0087' },
    reasoning: 'Delay exceeded 7 days; policy triggers goodwill up to ₹200',
    mode: 'voice',
  },
  vs3: {
    id: 'vs3',
    text: 'I can escalate this to our logistics team to ensure priority delivery. However, I should note this may not guarantee a specific date.',
    confidence: 'Low',
    source: { type: 'ticket', label: 'Similar ticket #4892', ref: 'TKT-4892' },
    reasoning: 'Escalation path used in similar case but outcome was inconsistent',
    mode: 'voice',
  },
  cs1: {
    id: 'cs1',
    text: 'Your refund of ₹1,499 for order #ORD-29341 has been flagged for priority processing. You\'ll receive an SMS once it\'s credited — expected by Wednesday EOD at the latest.',
    confidence: 'High',
    source: { type: 'crm', label: 'CRM: Customer history', ref: 'CRM-USR-5512' },
    reasoning: 'Customer has Gold status and prior refund delay; priority processing auto-eligible',
    mode: 'chat',
  },
  cs2: {
    id: 'cs2',
    text: 'I\'ve noted your escalation intent and logged it against this ticket. Our supervisor team will review if the refund isn\'t processed by your stated deadline.',
    confidence: 'Med',
    source: { type: 'policy', label: 'Refund Policy v2.3', ref: 'POL-0023' },
    reasoning: 'Customer mentioned consumer forum — standard escalation acknowledgement applies',
    mode: 'chat',
  },
  cs3: {
    id: 'cs3',
    text: 'We can process an instant refund to your wallet as a one-time exception, instead of waiting for the bank transfer cycle.',
    confidence: 'Low',
    source: { type: 'ticket', label: 'Similar ticket #5104', ref: 'TKT-5104' },
    reasoning: 'Instant wallet refunds were piloted in Q1 but approval process is unclear post-pilot',
    mode: 'chat',
  },
};

// Backwards-compat array for deprecated SuggestedReplies component
export const suggestions: Suggestion[] = Object.values(suggestionsById);

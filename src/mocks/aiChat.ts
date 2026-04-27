export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  source?: string;
  timestamp: string;
}

export const aiChatHistory: AIChatMessage[] = [
  {
    id: 'aic1',
    role: 'user',
    text: "What's this customer's refund history?",
    timestamp: '10:44',
  },
  {
    id: 'aic2',
    role: 'assistant',
    text: '3 refunds in last 12 months, total ₹4,200. Last refund was 23 days ago for ₹1,499 (Order #ORD-26871). All refunds were processed within SLA.',
    source: 'CRM — Transaction History',
    timestamp: '10:44',
  },
  {
    id: 'aic3',
    role: 'user',
    text: 'Is this customer eligible for premium support?',
    timestamp: '10:45',
  },
  {
    id: 'aic4',
    role: 'assistant',
    text: 'Yes — Gold tier since Mar 2024. Eligible for priority routing, dedicated callbacks, and goodwill credits up to ₹500 per quarter.',
    source: 'Account DB — Loyalty Tiers',
    timestamp: '10:45',
  },
];

export const mockAIResponses: Array<{ keywords: string[]; response: string; source: string }> = [
  {
    keywords: ['balance', 'account'],
    response: 'Current account balance: ₹42,315. Last transaction: ₹1,200 debit on Apr 26 (UPI). No pending holds.',
    source: 'CRM — Account Summary',
  },
  {
    keywords: ['card', 'block', 'freeze'],
    response: 'Card ending 4821 was blocked on Apr 19 via IVR self-service. Replacement requested same day. No unauthorized transactions detected.',
    source: 'Card Management System',
  },
  {
    keywords: ['loan', 'emi', 'outstanding'],
    response: 'No active loans. 1 closed personal loan (₹2L, closed Mar 2024). EMI history: all payments on time.',
    source: 'Loan Management DB',
  },
  {
    keywords: ['complaint', 'escalation', 'grievance'],
    response: '2 previous complaints in 18 months. Last complaint (Mar 2025) — resolved in 3 days. No open escalations.',
    source: 'CRM — Complaint Tracker',
  },
];

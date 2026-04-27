export interface DispositionData {
  disposition: string;
  subDisposition: string;
  notes: string;
  mockCallSummary: string;
  dispositionOptions: Array<{ value: string; label: string; aiReasoning?: string }>;
  subDispositionOptions: Array<{ value: string; label: string; aiReasoning?: string }>;
}

export const dispositionData: DispositionData = {
  disposition: 'Others',
  subDisposition: 'Courier / Logistics Issue',
  mockCallSummary: 'Rajesh Kumar called regarding a delayed card replacement (Req #REQ-7823, raised Apr 19). Dispatch had stalled due to a Blue Dart courier outage. Card re-dispatched today; ₹200 goodwill cashback applied. Customer satisfied and acknowledged resolution.',
  notes: `Customer called regarding delayed card replacement (Req #REQ-7823, submitted Apr 19). Dispatch was delayed due to courier outage. Card re-dispatched today via Blue Dart. Goodwill cashback of ₹200 applied to account. Customer acknowledged resolution and confirmed receipt of reference number.`,
  dispositionOptions: [
    {
      value: 'Resolved',
      label: 'Resolved',
      aiReasoning: 'Customer acknowledged resolution and confirmed details',
    },
    {
      value: 'Others',
      label: 'Others',
      aiReasoning: 'Call involved logistics issue not covered by standard resolution codes',
    },
    {
      value: 'Escalated',
      label: 'Escalated',
      aiReasoning: 'Customer expressed frustration but did not escalate',
    },
    { value: 'Callback', label: 'Callback Requested' },
    { value: 'Unresolved', label: 'Unresolved' },
  ],
  subDispositionOptions: [
    {
      value: 'Courier / Logistics Issue',
      label: 'Courier / Logistics Issue',
      aiReasoning: 'Card dispatch delay caused by Blue Dart outage on Apr 19',
    },
    {
      value: 'Card Replacement',
      label: 'Card Replacement',
      aiReasoning: 'Primary issue is card replacement delivery',
    },
    {
      value: 'Foreign Language',
      label: 'Foreign Language',
      aiReasoning: 'Customer used Hindi during call',
    },
    { value: 'Account Inquiry', label: 'Account Inquiry' },
    { value: 'Payment Issue', label: 'Payment Issue' },
  ],
};

export const chatDispositionData: DispositionData = {
  disposition: 'Resolved',
  subDisposition: 'Refund Processing',
  mockCallSummary: 'Ananya Sharma queried refund status for order #ORD-29341 (₹1,499). Refund flagged for priority processing; ₹100 goodwill credit applied. Customer warned of consumer forum escalation if not resolved by Wednesday. Ref: REF-88912.',
  notes: `Customer queried status of refund for order #ORD-29341 (₹1,499, requested Apr 24). Refund in processing state — flagged for priority. ₹100 goodwill credit applied due to previous delay. Customer noted escalation intent if not received by Wednesday. Ticket REF-88912 raised. SMS notification configured.`,
  dispositionOptions: [
    {
      value: 'Resolved',
      label: 'Resolved',
      aiReasoning: 'Refund priority flagged and communication committed',
    },
    {
      value: 'Escalated',
      label: 'Escalated',
      aiReasoning: 'Customer mentioned consumer forum escalation',
    },
    {
      value: 'Others',
      label: 'Others',
      aiReasoning: 'Does not fit standard resolved or escalated cleanly',
    },
    { value: 'Callback', label: 'Callback Requested' },
    { value: 'Unresolved', label: 'Unresolved' },
  ],
  subDispositionOptions: [
    {
      value: 'Refund Processing',
      label: 'Refund Processing',
      aiReasoning: 'Core issue is refund delay for specific order',
    },
    {
      value: 'Order Issue',
      label: 'Order Issue',
      aiReasoning: 'Related to a specific order',
    },
    { value: 'Goodwill Gesture', label: 'Goodwill Gesture' },
    { value: 'Payment Issue', label: 'Payment Issue' },
    { value: 'Account Inquiry', label: 'Account Inquiry' },
  ],
};

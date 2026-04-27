import type { TranscriptTurn } from '../../../mocks/voiceTranscript';
import type { ChatTurn } from '../../../mocks/chatTranscript';

export type FeedItem =
  | { kind: 'voice-turn'; id: string; turn: TranscriptTurn }
  | { kind: 'chat-turn'; id: string; turn: ChatTurn }
  | { kind: 'suggestion-group'; id: string; messageId: string; suggestionIds: string[] }
  | { kind: 'ask-ai'; id: string; question: string; answer?: string; source?: string; loading: boolean };

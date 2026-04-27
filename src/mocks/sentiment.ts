export type SentimentLabel = 'Happy' | 'Satisfied' | 'Neutral' | 'Frustrated' | 'Angry';

export interface SentimentReading {
  time: string;
  score: number; // -1.0 to 1.0
  label: SentimentLabel;
}

export const voiceSentiment: SentimentReading[] = [
  { time: '10:42', score: 0.1, label: 'Neutral' },
  { time: '10:43', score: -0.2, label: 'Neutral' },
  { time: '10:44', score: -0.4, label: 'Frustrated' },
  { time: '10:46', score: -0.5, label: 'Frustrated' },
  { time: '10:48', score: -0.1, label: 'Neutral' },
];

export const chatSentiment: SentimentReading[] = [
  { time: '2:14', score: 0.2, label: 'Neutral' },
  { time: '2:15', score: 0.0, label: 'Neutral' },
  { time: '2:17', score: -0.35, label: 'Frustrated' },
  { time: '2:19', score: -0.55, label: 'Frustrated' },
  { time: '2:21', score: -0.7, label: 'Angry' },
];

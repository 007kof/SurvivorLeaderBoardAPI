export type TimeRange = 'day' | 'week' | 'month' | 'year' | 'forever';

export interface ScoreEntry {
  username: string;
  score: number;
  timestamp: string;
}

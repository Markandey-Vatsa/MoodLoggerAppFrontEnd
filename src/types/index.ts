export enum Sentiment {
  HAPPY = 'HAPPY',
  SAD = 'SAD',
  ANGRY = 'ANGRY',
  ANXIOUS = 'ANXIOUS'
}

export interface JournalEntry {
  id?: string;
  title: string;
  content: string;
  date?: string;
  sentiment?: Sentiment;
}

export interface User {
  id?: string;
  userName: string;
  password?: string;
  email?: string;
  sentimentAnalysis?: boolean;
  journalEntries?: JournalEntry[];
  roles?: string[];
}

export interface AuthResponse {
  token?: string;
  user?: User;
}

export interface WeatherResponse {
  current: {
    feelsLike: number;
    temperature: number;
    description: string;
  };
}

export interface QuoteResponse {
  quote: string;
  author?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

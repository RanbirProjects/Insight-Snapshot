
export interface InsightResult {
  summary: string;
  themes: string[];
  signal: string;
  prompts: string[];
  risk?: string;
}

export type AppState = 'idle' | 'loading' | 'success' | 'error';

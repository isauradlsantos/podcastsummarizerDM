export interface PodcastEpisode {
  id: string;
  title: string;
  duration: number;
  audioUrl: string;
  fileSize?: number;
}

export interface TranscriptSegment {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  speaker?: string;
  confidence?: number;
}

export interface Summary {
  overview: string;
  keyPoints: string[];
  wordCount: number;
}

export interface Highlight {
  id: string;
  timestamp: number;
  title: string;
  description: string;
  formattedTime: string;
}

export interface ProcessingState {
  stage: 'idle' | 'uploading' | 'transcribing' | 'summarizing' | 'completed' | 'error';
  progress: number;
  message: string;
  error?: string;
}

export interface PodcastData {
  episode: PodcastEpisode;
  transcript: TranscriptSegment[];
  summary: Summary;
  highlights: Highlight[];
  fullTranscript: string;
}
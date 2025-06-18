import { PodcastEpisode, TranscriptSegment, Summary, Highlight } from '../types';

// Mock API functions - replace with real API calls in production
export async function transcribeAudio(audioUrl: string): Promise<TranscriptSegment[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Mock transcript data
  return [
    {
      id: '1',
      startTime: 0,
      endTime: 30,
      text: "Welcome to the Tech Trends podcast. Today we're discussing the future of artificial intelligence and its impact on modern business.",
      speaker: 'Host',
      confidence: 0.95
    },
    {
      id: '2',
      startTime: 30,
      endTime: 75,
      text: "AI is revolutionizing how companies operate, from customer service automation to predictive analytics. The key is understanding which tools provide real value versus just hype.",
      speaker: 'Host',
      confidence: 0.92
    },
    {
      id: '3',
      startTime: 75,
      endTime: 120,
      text: "One of the most significant developments is the rise of large language models. These systems can understand context, generate human-like text, and even write code.",
      speaker: 'Guest',
      confidence: 0.94
    },
    {
      id: '4',
      startTime: 120,
      endTime: 180,
      text: "However, we must also consider the ethical implications. AI systems can perpetuate biases, and there are concerns about job displacement and privacy.",
      speaker: 'Guest',
      confidence: 0.89
    },
    {
      id: '5',
      startTime: 180,
      endTime: 240,
      text: "The future of work will likely involve human-AI collaboration rather than replacement. Companies that invest in training their workforce will have a competitive advantage.",
      speaker: 'Host',
      confidence: 0.96
    }
  ];
}

export async function generateSummary(transcriptSegments: TranscriptSegment[]): Promise<Summary> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    overview: "This episode explores the future of artificial intelligence in business, covering both opportunities and challenges. The discussion highlights how AI is revolutionizing operations through automation and analytics, while emphasizing the importance of ethical considerations and human-AI collaboration in the evolving workplace.",
    keyPoints: [
      "AI is transforming business operations through automation and predictive analytics",
      "Large language models represent a significant breakthrough in AI capabilities",
      "Ethical implications include bias, job displacement, and privacy concerns",
      "The future involves human-AI collaboration rather than replacement",
      "Workforce training is crucial for competitive advantage"
    ],
    wordCount: 87
  };
}

export async function extractHighlights(transcriptSegments: TranscriptSegment[]): Promise<Highlight[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return [
    {
      id: '1',
      timestamp: 75,
      title: "AI Language Models Breakthrough",
      description: "Discussion of large language models and their capabilities in understanding context and generating human-like content.",
      formattedTime: "1:15"
    },
    {
      id: '2',
      timestamp: 120,
      title: "Ethical AI Considerations",
      description: "Important concerns about AI bias, job displacement, and privacy implications that businesses must address.",
      formattedTime: "2:00"
    },
    {
      id: '3',
      timestamp: 180,
      title: "Future of Human-AI Collaboration",
      description: "Insights on how the workplace will evolve with AI as a collaborative tool rather than a replacement.",
      formattedTime: "3:00"
    }
  ];
}

export function validateAudioUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.toLowerCase();
    return pathname.endsWith('.mp3') || pathname.endsWith('.wav') || pathname.endsWith('.m4a') || pathname.includes('rss');
  } catch {
    return false;
  }
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatFileSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}